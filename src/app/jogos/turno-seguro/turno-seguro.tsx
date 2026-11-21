'use client';

import { useCallback, useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react';
import {
  actionLabel, COLUMNS, completedTasks, isMissionComplete, missionHint, MISSIONS, remainingSeconds,
  ROWS, TASK_POINTS, TILE, type Command,
} from '@/lib/turno-seguro/game';
import { drawMission, drawPortrait, SPRITE_URL } from '@/lib/turno-seguro/draw';
import { normalizeInitials, validInitials, type RecordEntry } from '@/lib/turno-seguro/record';
import { RECORDS_URL, useTurn } from './use-turn';
import styles from './turno-seguro.module.css';

const controls = [
  { direction: 'up', icon: '▲', label: 'Cima', key: 'ArrowUp' },
  { direction: 'left', icon: '◀', label: 'Esquerda', key: 'ArrowLeft' },
  { direction: 'right', icon: '▶', label: 'Direita', key: 'ArrowRight' },
  { direction: 'down', icon: '▼', label: 'Baixo', key: 'ArrowDown' },
] as const;

function keyCommand(key: string): Command | undefined {
  return key === ' ' ? 'act' : controls.find((control) => control.key === key)?.direction;
}

const formatScore = (points: number) => String(points).padStart(4, '0');

type Board = { state: 'loading' | 'error' } | { state: 'ready'; records: RecordEntry[] };

export default function TurnoSeguro() {
  const game = useTurn();
  const consoleRef = useRef<HTMLDivElement>(null);
  const nextButton = useRef<HTMLButtonElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const portrait = useRef<HTMLCanvasElement>(null);
  const [sheet, setSheet] = useState<HTMLImageElement | null>(null);
  const [assetError, setAssetError] = useState(false);
  const [board, setBoard] = useState<Board>({ state: 'loading' });
  const [initials, setInitials] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState('');
  const { mission, phase } = game;
  const room = MISSIONS[mission.index];
  const playing = phase === 'playing';
  const solved = completedTasks(mission);
  const missionAtEnd = mission.index === MISSIONS.length - 1;

  const refreshRecords = useCallback(async () => {
    try {
      const response = await fetch(RECORDS_URL, { signal: AbortSignal.timeout(5000) });
      if (!response.ok) throw new Error('Records unavailable');
      const { records } = await response.json() as { records: RecordEntry[] };
      setBoard({ state: 'ready', records });
    } catch {
      setBoard({ state: 'error' });
    }
  }, []);

  useEffect(() => {
    const image = new Image();
    image.onload = () => setSheet(image);
    image.onerror = () => setAssetError(true);
    image.src = SPRITE_URL;

    return () => {
      image.onload = null;
      image.onerror = null;
    };
  }, []);

  useEffect(() => { void refreshRecords(); }, [refreshRecords]);

  useEffect(() => {
    if (canvas.current && sheet) drawMission(canvas.current, sheet, mission, playing);
  }, [sheet, mission, playing]);

  useEffect(() => {
    if (phase === 'briefing' && portrait.current && sheet && room.mentor) {
      drawPortrait(portrait.current, sheet, room.mentor.sprite);
    }
  }, [phase, room.mentor, sheet]);

  useEffect(() => {
    if (phase === 'briefing' || phase === 'playing') {
      consoleRef.current?.scrollIntoView({ block: 'start', behavior: 'instant' });
    }
    if (phase === 'playing') consoleRef.current?.focus({ preventScroll: true });
    if (phase === 'briefing' || phase === 'debrief') nextButton.current?.focus({ preventScroll: true });
  }, [phase]);

  async function start() {
    setInitials('');
    setSaved(false);
    setSaveError('');
    await game.start();
  }

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!game.token || saving || saved) return;

    const canonicalInitials = normalizeInitials(initials);
    if (!validInitials(canonicalInitials)) {
      setSaveError('Escreve três letras.');
      return;
    }
    setSaving(true);
    setSaveError('');
    try {
      const response = await fetch(RECORDS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: game.token, initials: canonicalInitials, actions: game.actions.current }),
        signal: AbortSignal.timeout(6000),
      });
      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.error || 'A gravação falhou. Tenta novamente.');
      }
      setSaved(true);
      void refreshRecords();
    } catch (error) {
      setSaveError(error instanceof Error && error.name === 'Error'
        ? error.message : 'A gravação falhou. Tenta novamente.');
    } finally {
      setSaving(false);
    }
  }

  function keyDown(event: KeyboardEvent) {
    if (!playing || event.ctrlKey || event.altKey || event.metaKey) return;
    const command = keyCommand(event.key);
    if (!command) return;
    event.preventDefault();
    if (!event.repeat) game.command(command, command !== 'act');
  }

  function keyUp(event: KeyboardEvent) {
    const direction = keyCommand(event.key);
    if (direction && direction !== 'act') game.release(direction);
  }

  const points = game.total + (playing ? solved * TASK_POINTS : 0);
  const clock = remainingSeconds(mission);
  const target = playing ? actionLabel(mission) : undefined;

  return (
    <main className={styles.arcade}>
      <div className={styles.content}>
        <header className={styles.heading}>
          <h1>Turno Seguro</h1>
          <p>Fala com a equipa, segue os sinais no mapa e completa as três missões do turno.</p>
        </header>

        <div className={styles.station}>
          <div
            aria-label="Consola do Turno Seguro"
            className={styles.console}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) game.release();
            }}
            onKeyDown={keyDown}
            onKeyUp={keyUp}
            ref={consoleRef}
            tabIndex={-1}
          >
            <div className={styles.deviceHeader}>
              <span>Medisigma</span>
              <span className={styles.power} aria-hidden="true" />
            </div>

            <div className={styles.bezel}>
              <div className={styles.hud}>
                <span className={styles.room}><span>{mission.index + 1}/{MISSIONS.length}</span> {room.room}</span>
                <span className={styles.stat}>Pontos <strong>{formatScore(points)}</strong></span>
                <span className={styles.stat}>Tempo <strong>{String(clock).padStart(2, '0')}</strong></span>
              </div>

              <div className={styles.screen}>
                <canvas ref={canvas} width={COLUMNS * TILE} height={ROWS * TILE} aria-hidden="true" />
                {phase !== 'playing' && phase !== 'briefing' && (
                  <div className={styles.shade}>
                    <div className={styles.panel}>
                      {(phase === 'home' || phase === 'starting') && (
                        <>
                          <p className={styles.screenTitle}>Entra na oficina</p>
                          <p>Usa as setas para andar e Ação junto de um alvo.</p>
                          {assetError
                            ? <button className={styles.primary} onClick={() => window.location.reload()}>Recarregar jogo</button>
                            : <button className={styles.primary} disabled={!sheet || phase === 'starting'} onClick={start}>
                              {phase === 'starting' ? 'A preparar…' : 'Começar turno'}
                            </button>}
                        </>
                      )}
                      {phase === 'debrief' && (
                        <>
                          <h2 className={styles.screenTitle}>{isMissionComplete(mission) ? 'Missão cumprida' : 'Tempo esgotado'}</h2>
                          <p>{solved} de {room.tasks.length} tarefas feitas · +{game.scores[mission.index]} pontos</p>
                          <button
                            ref={nextButton}
                            className={styles.primary}
                            onClick={() => missionAtEnd ? game.finish() : game.brief(mission.index + 1)}
                          >
                            {missionAtEnd ? 'Ver resultado' : 'Próxima missão'}
                          </button>
                        </>
                      )}
                      {phase === 'finished' && (
                        <>
                          <h2 className={styles.screenTitle}>Fim do turno</h2>
                          <p className={styles.finalScore}>{formatScore(game.total)} <span>pontos</span></p>
                          <button className={styles.primary} disabled={saving} onClick={start}>Jogar outra vez</button>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {playing && (
                <div className={styles.status}>
                  <div className={styles.objective}>
                    <span className={styles.marker} aria-hidden="true" />
                    <span aria-live="polite">{missionHint(mission)}</span>
                    <span className={styles.progress} aria-label={`${solved} de ${room.tasks.length} tarefas`}>{solved}/{room.tasks.length}</span>
                  </div>
                  <div className={styles.context}>{target ? `Ação · ${target}` : 'Segue as marcas amarelas no mapa.'}</div>
                </div>
              )}
            </div>

            {phase === 'briefing' && room.mentor ? (
              <div className={styles.dialogue}>
                <canvas
                  className={styles.portrait} ref={portrait}
                  width={TILE} height={TILE} aria-hidden="true"
                />
                <div>
                  <h2>{room.title}</h2>
                  <p className={styles.speaker}><strong>{room.mentor.name}</strong> · {room.mentor.role}</p>
                  <p>{room.instruction}</p>
                  <button ref={nextButton} className={styles.primary} onClick={game.play}>Aceitar missão</button>
                </div>
              </div>
            ) : phase === 'finished' ? (
              <div className={styles.scoreForm}>
                {game.token ? (
                  <form onSubmit={save}>
                    <label htmlFor="turno-iniciais">As tuas iniciais</label>
                    <div>
                      <input
                        id="turno-iniciais" name="initials" type="text" maxLength={3}
                        value={initials} onChange={(event) => setInitials(normalizeInitials(event.target.value).slice(0, 3))}
                        autoComplete="off" autoCapitalize="characters" spellCheck={false}
                        placeholder="ABC" aria-describedby="turno-score-help" disabled={saving || saved}
                      />
                      <button className={styles.save} type="submit" disabled={saving || saved}>
                        {saving ? 'A guardar…' : 'Guardar resultado'}
                      </button>
                    </div>
                    <p id="turno-score-help">As iniciais ficam visíveis se entrares no Top 10.</p>
                    {saved && <p className={styles.formMessage} role="status">Resultado guardado.</p>}
                    {saveError && <p className={styles.formMessage} role="alert">{saveError}</p>}
                  </form>
                ) : <p>O quadro estava indisponível ao iniciar. O teu resultado ficou neste navegador.</p>}
              </div>
            ) : (
              <div className={styles.controls} aria-label="Comandos do jogo">
                <div className={styles.dpad}>
                  {controls.map(({ direction, icon, label, key }) => (
                    <button
                      key={direction}
                      className={styles[direction]}
                      type="button"
                      aria-label={label}
                      aria-keyshortcuts={key}
                      disabled={!playing}
                      onPointerDown={(event) => {
                        event.currentTarget.setPointerCapture(event.pointerId);
                        game.command(direction, true);
                      }}
                      onPointerUp={() => game.release(direction)}
                      onPointerCancel={() => game.release(direction)}
                      onLostPointerCapture={() => game.release(direction)}
                      onClick={(event) => { if (event.detail === 0) game.command(direction); }}
                    >
                      <span aria-hidden="true">{icon}</span>
                    </button>
                  ))}
                </div>
                <div className={styles.actionControl}>
                  <button
                    type="button" aria-label="Ação" aria-keyshortcuts="Space"
                    className={target ? styles.actionReady : undefined}
                    disabled={!playing} onClick={() => game.command('act')}
                  >A</button>
                  <span>Ação</span>
                </div>
              </div>
            )}
          </div>

          <aside className={styles.records} aria-labelledby="turno-recordes">
            <div className={styles.boardHeading}>
              <h2 id="turno-recordes">Recordes</h2>
              <span>Top 10 de sempre</span>
            </div>
            {board.state === 'loading' && <p className={styles.boardMessage}>A carregar os recordes…</p>}
            {board.state === 'error' && (
              <div className={styles.boardMessage}>
                <p>O quadro está indisponível.</p>
                <button onClick={() => { setBoard({ state: 'loading' }); void refreshRecords(); }}>Tentar novamente</button>
              </div>
            )}
            {board.state === 'ready' && (board.records.length ? (
              <table className={styles.ranking}>
                <thead><tr><th scope="col">Pos.</th><th scope="col">Iniciais</th><th scope="col">Pontos</th></tr></thead>
                <tbody>
                  {board.records.map((record, index) => (
                    <tr key={index}>
                      <td>{String(index + 1).padStart(2, '0')}</td>
                      <td>{record.initials}</td>
                      <td>{formatScore(record.points)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : <p className={styles.boardMessage}>Ainda ninguém guardou um resultado.</p>)}

            <div className={styles.personal}>
              <span>O teu recorde neste navegador</span>
              <strong>{game.best === null ? '••••' : formatScore(game.best)}</strong>
            </div>
            <p className={styles.keyboard}>No teclado, usa as setas para mover e Espaço para agir.</p>
          </aside>
        </div>
      </div>
    </main>
  );
}
