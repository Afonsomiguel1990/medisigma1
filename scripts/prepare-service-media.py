"""Prepare approved website media locally. Originals are opened read-only.

Requires Python/Pillow, ffmpeg and libheif's heif-convert for the HEIC photographs.
Usage: python scripts/prepare-service-media.py SOURCE_FOLDER --heif-convert EXE
"""
import argparse
import hashlib
import io
import json
import re
import subprocess
from pathlib import Path
from PIL import Image, ImageOps

parser = argparse.ArgumentParser()
parser.add_argument('source', type=Path)
parser.add_argument('--heif-convert', required=True)
args = parser.parse_args()
root = Path(__file__).resolve().parents[1]
output = root / 'public/media/servicos'
scratch = root / '.media-build'
output.mkdir(parents=True, exist_ok=True)
scratch.mkdir(exist_ok=True)

videos = [
    ('sofalca-ruido', 'Sofalca - Medição de Ruido.mp4', 17.6),
    ('herdade-amarela', 'ST - Herdade Amarela.mp4', 1.5),
    ('seguranca-alimentar', 'SA - O que não vez .mp4', 6.7),
    ('benfica-abrantes', 'Medicina Desportiva - Benfica de Abrantes.mp4', 9.2),
    ('ramiro', 'RamIro - Entrevista.mp4', 143.2),
]
photos = [
    ('avaliacao-ruido-sofalca', 'IMG_2932.heic'),
    ('medicao-ruido-industria', 'WhatsApp Image 2026-08-17 at 13.47.37 (1).jpeg'),
    ('tecnica-seguranca-alimentar', 'Captura de ecrã 2026-09-08, às 11.49.27.png'),
    ('avaliacao-medicina-desportiva', 'Captura de ecrã 2026-09-08, às 11.50.21.png'),
    ('manutencao-extintores-viatura', 'IMG_2962.heic'),
    ('equipamento-manutencao-extintores', 'IMG_2958.heic'),
    ('instalacao-sinaletica', 'IMG_2979.heic'),
    ('tecnico-controlo-pragas', 'Captura de ecrã 2026-09-08, às 11.46.59.png'),
]

def run(command):
    result = subprocess.run(command, capture_output=True)
    if result.returncode:
        raise RuntimeError(result.stderr.decode(errors='replace')[-4000:])
    return result.stdout

def digest(path):
    with path.open('rb') as f:
        return hashlib.file_digest(f, 'sha256').hexdigest()

manifest = []
for media_id, filename, frame in videos:
    source = args.source / filename
    target = output / f'{media_id}.mp4'
    if not target.exists():
        partial = scratch / f'{media_id}.partial.mp4'
        run(['ffmpeg', '-y', '-v', 'error', '-i', str(source), '-map', '0:v:0', '-map', '0:a:0',
             '-vf', 'scale=720:1280,setsar=1', '-c:v', 'libx264', '-preset', 'medium', '-crf', '24',
             '-maxrate', '1800k', '-bufsize', '3600k', '-pix_fmt', 'yuv420p', '-threads', '4',
             '-c:a', 'aac', '-b:a', '96k', '-movflags', '+faststart', '-map_metadata', '-1', str(partial)])
        partial.replace(target)
    image_bytes = run(['ffmpeg', '-v', 'error', '-ss', str(frame), '-i', str(source),
                       '-frames:v', '1', '-vf', 'scale=720:1280', '-f', 'image2pipe', '-vcodec', 'png', 'pipe:1'])
    Image.open(io.BytesIO(image_bytes)).convert('RGB').save(output / f'{media_id}-capa.webp', quality=82)
    wav = scratch / f'{media_id}.wav'
    if not wav.exists():
        run(['ffmpeg', '-v', 'error', '-i', str(source), '-vn', '-ac', '1', '-ar', '16000', '-c:a', 'pcm_s16le', str(wav)])
    probe = subprocess.run(['ffmpeg', '-hide_banner', '-i', str(target)], capture_output=True).stderr.decode(errors='replace')
    clock = re.search(r'Duration: (\d+):(\d+):(\d+\.\d+)', probe)
    video_stream = re.search(r'Video: (\w+).*?, (\d{3,4})x(\d{3,4})', probe)
    audio_stream = re.search(r'Audio: (\w+)', probe)
    if not (clock and video_stream and audio_stream):
        raise RuntimeError(f'Cannot read media properties for {target.name}')
    duration = int(clock[1]) * 3600 + int(clock[2]) * 60 + float(clock[3])
    streams = [{'codec_type': 'video', 'codec_name': video_stream[1], 'width': int(video_stream[2]), 'height': int(video_stream[3])}, {'codec_type': 'audio', 'codec_name': audio_stream[1]}]
    manifest.append({'id': media_id, 'source': filename, 'sourceSha256': digest(source),
                     'output': target.name, 'bytes': target.stat().st_size, 'sha256': digest(target),
                     'posterTimestamp': frame, 'duration': duration, 'streams': streams})
    print(f'Prepared video {media_id}: {target.stat().st_size / 1024 / 1024:.2f} MiB', flush=True)

for media_id, filename in photos:
    source = args.source / 'FOTOS' / filename
    readable = source
    if source.suffix.lower() == '.heic':
        readable = scratch / (source.stem + '.jpg')
        if not readable.exists():
            run([args.heif_convert, '-q', '95', str(source), str(readable)])
    image = ImageOps.exif_transpose(Image.open(readable)).convert('RGB')
    # Show the working surface, excluding the documents mounted above it.
    crop = None
    if media_id == 'equipamento-manutencao-extintores':
        crop = (round(image.width * .52), round(image.height * .52), image.width, round(image.height * .86))
        image = image.crop(crop)
    image.thumbnail((1200, 1600), Image.Resampling.LANCZOS)
    target = output / f'{media_id}.webp'
    image.save(target, quality=82, method=6)
    manifest.append({'id': media_id, 'source': 'FOTOS/' + filename, 'sourceSha256': digest(source),
                     'output': target.name, 'bytes': target.stat().st_size, 'sha256': digest(target),
                     'width': image.width, 'height': image.height, 'crop': crop})
    print(f'Prepared photograph {media_id}: {image.width}x{image.height}', flush=True)

(root / 'docs').mkdir(exist_ok=True)
(root / 'docs/service-media-manifest.json').write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + '\n', encoding='utf-8')
