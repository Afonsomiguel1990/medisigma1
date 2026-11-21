'use client';

import { useEffect, useRef } from 'react';
import { AREAS, type Point } from '@/lib/sigma-quest/world';
import { cameraFor, drawAtlas, drawEncounter, drawRiskIcon, drawWordmark, drawWorld, TILE, type Camera } from '@/lib/sigma-quest/pixel-art';
import type { Quest } from '@/lib/sigma-quest/game';
import type { ZoneId } from '@/lib/sigma-quest/cases';
import styles from './sigma-quest.module.css';

export function QuestTitle() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => { if (ref.current) drawWordmark(ref.current); }, []);
  return <h1 className={styles.title}><span>Sigma Quest</span><canvas ref={ref} width={127} height={17} aria-hidden="true" /></h1>;
}

export function Atlas({ quest }: { quest: Quest }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => { if (ref.current) drawAtlas(ref.current, quest); }, [quest]);
  return <canvas ref={ref} className={styles.atlas} width={152} height={100} aria-hidden="true" />;
}

export function RiskIcon({ zone, done }: { zone: ZoneId; done: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => { if (ref.current) drawRiskIcon(ref.current, zone, done); }, [zone, done]);
  return <canvas ref={ref} width={38} height={34} className={styles.riskIcon} aria-hidden="true" />;
}

export function QuestScreen({ quest, halted, onTap }: { quest: Quest; halted: boolean; onTap: (at: Point) => void }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const latest = useRef(quest);
  const camera = useRef<Camera | null>(null);
  const previous = useRef({ position: quest.position, area: quest.area });
  useEffect(() => { latest.current = quest; }, [quest]);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const narrow = window.matchMedia('(max-width: 700px)');
    const still = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0, lastPaint = 0, movedAt = 0;
    let target = latest.current.position;
    let from = target;
    function paint(now: number) {
      const next = latest.current;
      const movingRoom = previous.current.area === next.area;
      if (target !== next.position || !movingRoom) {
        from = movingRoom ? previous.current.position : next.position;
        target = next.position;
        movedAt = now;
      }
      const motion = !halted && !still.matches;
      const tween = motion ? Math.min(1, (now - movedAt) / 68) : 1;
      if (now - lastPaint >= (tween < 1 ? 30 : 85) || !lastPaint) {
        const map = next.scene.type === 'map' || next.scene.type === 'note';
        if (map) {
          const position = { x: from.x + (target.x - from.x) * tween, y: from.y + (target.y - from.y) * tween };
          const view = cameraFor(AREAS[next.area], position, narrow.matches);
          camera.current = view;
          drawWorld(canvas!, next, motion ? now : 0, view, position, tween < 1);
        } else {
          camera.current = null;
          drawEncounter(canvas!, next, motion ? now : 0, narrow.matches);
        }
        lastPaint = now;
      }
      previous.current = { position: target, area: next.area };
      frame = requestAnimationFrame(paint);
    }
    frame = requestAnimationFrame(paint);
    return () => cancelAnimationFrame(frame);
  }, [halted]);

  return (
    <div className={styles.screenFrame}>
      <canvas ref={ref} className={styles.screen} width={416} height={224} aria-hidden="true"
        onClick={(event) => {
          const view = camera.current;
          if (!view || halted) return;
          const bounds = event.currentTarget.getBoundingClientRect();
          onTap({
            x: Math.floor(((event.clientX - bounds.left) / bounds.width * view.width + view.left) / TILE),
            y: Math.floor(((event.clientY - bounds.top) / bounds.height * view.height + view.top) / TILE),
          });
        }}
      />
    </div>
  );
}
