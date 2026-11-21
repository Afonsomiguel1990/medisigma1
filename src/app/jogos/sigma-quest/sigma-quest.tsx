'use client';

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { ZONES, ZONE_IDS, type ZoneId } from '@/lib/sigma-quest/cases';
import {
  availablePoints, canDoExtra, completedExtras, completedZones, evidenceCount,
  MAX_SCORE, newQuest, recommendedEntity, totalPoints, turnContent, type Quest, type QuestAction,
} from '@/lib/sigma-quest/game';
import { AREAS, entityInReach, type Entity, type Move } from '@/lib/sigma-quest/world';
import { Atlas, QuestScreen, QuestTitle, RiskIcon } from './quest-screen';
import { formatPoints, Records, ScoreForm, useRecords } from './quest-records';
import { useQuest } from './use-quest';
import { formatTime, useQuestClock } from './use-quest-clock';
import styles from './sigma-quest.module.css';

const menuTabs = { map: 'Mapa', dex: 'Riscodex', local: 'Neste local', pause: 'Pausa' } as const;
type Panel = keyof typeof menuTabs;
const directions: { move: Move; label: string; glyph: string }[] = [
  { move: 'n', label: 'Andar para cima', glyph: '▴' }, { move: 'w', label: 'Andar para a esquerda', glyph: '◂' },
  { move: 'e', label: 'Andar para a direita', glyph: '▸' }, { move: 's', label: 'Andar para baixo', glyph: '▾' },
];
const movementKeys: Record<string, Move> = { ArrowUp: 'n', ArrowDown: 's', ArrowLeft: 'w', ArrowRight: 'e', w: 'n', s: 's', a: 'w', d: 'e' };
const preview = newQuest(1);
const scoreLines = [
  ['Missões concluídas', 'missions'], ['Decisões e inspeção', 'decisions'], ['Pistas observadas', 'clues'],
  ['Desafios extra', 'extras'], ['Sequências', 'streak'], ['Iniciativa', 'initiative'],
] as const;

function ZoneList({ quest, select }: { quest: Quest; select: (zone: ZoneId) => void }) {
  return (
    <ul className={styles.zoneList}>
      {ZONE_IDS.map(id => {
        const zone = ZONES[id], progress = quest.progress[id];
        return (
          <li key={id}>
            <button type="button" onClick={() => select(id)} className={styles.zoneItem}
              aria-label={zone.name + ', ' + (progress.completed ? 'Risco registado' : 'Risco por descobrir')}>
              <RiskIcon zone={id} done={progress.completed} />
              <span><strong>{zone.name}</strong><small>{progress.completed ? zone.risk : 'Por explorar'}</small></span>
              <span className={styles.zoneMark} aria-hidden="true">{progress.extra ? '✦' : progress.completed ? '✓' : '›'}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

function MenuWindow({ panel, select, close, children }: {
  panel: Panel; select: (value: Panel) => void; close: () => void; children: ReactNode;
}) {
  const back = useRef<HTMLButtonElement>(null);
  useEffect(() => { back.current?.focus({ preventScroll: true }); }, []);
  return (
    <section className={styles.menuWindow} aria-label="Menu do jogo" id="quest-menu">
      <div className={styles.menuHeader}>
        <nav aria-label="Secções do menu" className={styles.menuTabs}>
          {(Object.keys(menuTabs) as Panel[]).map(key => (
            <button type="button" key={key} aria-pressed={panel === key} onClick={() => select(key)}>{menuTabs[key]}</button>
          ))}
        </nav>
        <button ref={back} className={styles.menuBack} type="button" onClick={close}>Voltar ao jogo <span aria-hidden="true">↵</span></button>
      </div>
      <div className={styles.menuBody} key={panel}>{children}</div>
    </section>
  );
}

function actionLabel(target: Entity, quest?: Quest) {
  switch (target.kind) {
    case 'door': return 'Entrar · ' + target.name;
    case 'intro':
    case 'mentor':
    case 'inspector': return 'Falar com ' + target.name;
    case 'evidence': return target.index === 0 ? 'Ler o folheto na parede' : 'Observar · ' + target.name;
    case 'risk': return quest?.area === 'office' && quest.leftStressauro ? 'Falar com Stressauro' : 'Enfrentar ' + target.name;
    case 'extra': return 'Desafio · ' + target.name;
    case 'exit': return 'Voltar ao bairro';
  }
}

function freshTarget(quest: Quest, target: Entity): boolean {
  if (target.kind === 'intro') return !quest.introduced;
  if (target.kind === 'inspector') return completedZones(quest) === ZONE_IDS.length;
  if (target.kind === 'door') return !quest.progress[target.zone].completed;
  if (quest.area === 'hub') return true;
  const progress = quest.progress[quest.area];
  if (target.kind === 'mentor') return !progress.briefing;
  if (target.kind === 'evidence') return !(progress.clues & (1 << target.index));
  if (target.kind === 'risk') return !progress.completed || (quest.area === 'office' && quest.leftStressauro && !quest.score.initiative);
  if (target.kind === 'extra') return canDoExtra(progress);
  return true;
}

function LocalRoutes({ quest, go }: { quest: Quest; go: (target: Entity) => void }) {
  const progress = quest.area === 'hub' ? null : quest.progress[quest.area];
  const places = AREAS[quest.area].objects.filter(place => place.kind !== 'door');
  return (
    <ul className={styles.localRoutes}>
      {places.map(place => {
        const known = progress && place.kind === 'evidence' && Boolean(progress.clues & (1 << place.index));
        const resolved = progress && place.kind === 'risk' && progress.completed;
        const extra = progress && place.kind === 'extra';
        const caption = known ? 'Observada' : resolved ? 'Resolvido' :
          extra ? (progress.extra ? 'Concluído' : canDoExtra(progress) ? 'Disponível' : 'Por desbloquear') : null;
        return (
          <li key={place.id}>
            <button type="button" onClick={() => go(place)}><strong>{resolved && !(quest.area === 'office' && quest.leftStressauro) ? place.name : actionLabel(place, quest)}</strong>{caption && <small>{caption}</small>}</button>
          </li>
        );
      })}
    </ul>
  );
}

function Help({ quest, walking, notice }: { quest: Quest; walking: string | null; notice: string }) {
  const progress = quest.area !== 'hub' ? quest.progress[quest.area] : null;
  return (
    <div className={styles.dialogue} aria-live="polite">
      <div className={styles.sceneMeta}><span className={styles.bullet} />{notice ? 'Caderneta' : 'Objetivo'}</div>
      <p>{notice || (walking ? 'A caminho · ' + walking : quest.area === 'hub' ?
        (quest.introduced ? 'Escolhe um dos edifícios ou segue o objetivo sugerido.' : 'Fala com a Helena para receberes a tua primeira missão.') :
        (progress?.completed ? (canDoExtra(progress) ? 'Risco registado. Há um desafio extra neste edifício.' : 'Risco registado. Podes continuar a explorar ou voltar ao bairro.') :
          'Fala com a equipa ou lê o folheto na parede para aprenderes o básico.'))}</p>
    </div>
  );
}

function FieldGuide({ zone }: { zone: ZoneId }) {
  const subject = ZONES[zone];
  return (
    <section className={styles.fieldGuide} aria-labelledby="quest-field-guide">
      <h3 id="quest-field-guide">Ficha de bolso · {subject.name}</h3>
      <dl>
        {subject.guide.map(tip => (
          <div key={tip.title}><dt>{tip.title}</dt><dd>{tip.text}</dd></div>
        ))}
      </dl>
    </section>
  );
}

function CampaignScene({ quest, act, openGuide }: {
  quest: Quest; act: (action: QuestAction) => void; openGuide: (zone: ZoneId) => void;
}) {
  const scene = quest.scene;
  if (scene.type === 'note') return (
    <div className={styles.dialogue} aria-live="polite">
      <div className={styles.sceneMeta}><span className={styles.bullet} />{scene.heading}
        {scene.award && <strong className={styles.award}>+{scene.award} pts</strong>}</div>
      <p>{scene.text}</p>
      {scene.guide && <FieldGuide zone={scene.guide} />}
      <button type="button" className={styles.primary} onClick={() => act('c')}>Continuar <span aria-hidden="true">↵</span></button>
    </div>
  );
  if (scene.type === 'review') {
    const left = ZONE_IDS.length - completedExtras(quest);
    return (
      <div className={styles.dialogue}>
        <div className={styles.sceneMeta}><span className={styles.bullet} />Inês · Inspetora na história</div>
        <p>Já tens os cinco Riscos. Vou apresentar-te cinco situações novas. Podes consultar as fichas durante a inspeção. {left > 0 && 'Se quiseres fazer mais pontos nos desafios extra, volta ao mapa antes de começar.'}</p>
        <div className={styles.buttonRow}>
          <button type="button" className={styles.primary} onClick={() => act('c')}>Começar a inspeção</button>
          <button type="button" className={styles.secondary} onClick={() => act('b')}>Voltar ao mapa</button>
        </div>
      </div>
    );
  }
  if (scene.type !== 'choice' && scene.type !== 'reaction') return null;
  const { turn } = scene, { zone, round } = turn.challenge;
  const inspection = round === 'inspection';
  const heading = inspection ? 'Inspeção · ' + Math.min(5, quest.inspected + Number(scene.type === 'choice' || scene.choice.result !== 'best')) + ' / 5' :
    round === 'extra' ? 'Desafio extra · ' + ZONES[zone].name :
    ZONES[zone].risk + ' · Turno ' + (round === 'first' ? '1' : '2') + ' / 2';
  if (scene.type === 'choice') {
    const content = turnContent(quest.seed, turn);
    return (
      <div className={styles.dialogue}>
        <div className={styles.sceneMeta}><span className={styles.bullet} />{heading}<strong className={styles.award}>Até {availablePoints(turn)} pts</strong></div>
        <p aria-live="polite">{content.prompt}</p>
        <button type="button" className={styles.guideLink} onClick={() => openGuide(zone)}>Consultar ficha de bolso</button>
        <div className={styles.choices}>
          {content.choices.map(({ label }, index) => (
            <button key={label} type="button" className={styles.choice} aria-keyshortcuts={String(index + 1)}
              onClick={() => act(String(index + 1) as QuestAction)}><span aria-hidden="true">{index + 1}</span>{label}</button>
          ))}
        </div>
      </div>
    );
  }
  const right = scene.choice.result === 'best';
  return (
    <div className={styles.dialogue} aria-live="polite">
      <div className={styles.sceneMeta}><span className={styles.bullet} />
        {right ? (round === 'second' ? 'Risco registado no Riscodex' : 'Boa decisão') :
          scene.choice.result === 'partial' ? 'Ajuda, mas falta um passo' : 'O risco mantém-se'}
        {right && <strong className={styles.award}>+{scene.awarded} pts{scene.combo > 0 && ' · +' + scene.combo + ' sequência'}</strong>}
      </div>
      <p>{scene.choice.reaction}</p>
      {round === 'second' && right && <p className={styles.small}>{ZONES[zone].resolution}</p>}
      <button type="button" className={styles.primary} onClick={() => act('c')}>
        {right ? (inspection && quest.inspected === 5 ? 'Ver o resultado' : 'Continuar') : 'Tentar outra vez'} <span aria-hidden="true">↵</span>
      </button>
    </div>
  );
}

export default function SigmaQuest() {
  const play = useQuest();
  const { session, ready, starting, walking, notice, start, act, cancel, tap, travelToZone, walkTo, markPublished, markGuideRead } = play;
  const { board, refresh } = useRecords();
  const [panel, setPanel] = useState<Panel | null>(null);
  const [dex, setDex] = useState<ZoneId | null>(null);
  const [reset, setReset] = useState(false);
  const game = useRef<HTMLElement>(null);
  const quest = session?.quest ?? preview;
  const area = AREAS[quest.area];
  const count = completedZones(quest);
  const inMap = quest.scene.type === 'map';
  const nearby = inMap && entityInReach(area, quest.position, quest.facing);
  const goal = nearby && freshTarget(quest, nearby) ? nearby : recommendedEntity(quest);
  const finish = quest.scene.type === 'finish';
  const sessionSeed = session?.save.seed;
  const firstZone = quest.scene.type === 'choice' && quest.scene.turn.challenge.round === 'first' ? quest.scene.turn.challenge.zone : null;
  const introZone = firstZone && !session?.save.guidesRead?.includes(firstZone) ? firstZone : null;
  const readingGuide = Boolean(introZone || (quest.scene.type === 'note' && quest.scene.guide));
  const clock = useQuestClock(session?.save.token ?? null, Boolean(panel) || readingGuide, finish ? session?.save.moves : undefined);
  const points = clock.result?.points ?? totalPoints(quest.score);

  useEffect(() => {
    if (sessionSeed && !panel) {
      game.current?.focus({ preventScroll: true });
      if (quest.scene.type !== 'map') game.current?.scrollIntoView({ block: 'nearest', behavior: 'instant' });
    }
  }, [sessionSeed, panel, quest.scene.type, introZone]);

  function open(next: Panel) {
    cancel(); setReset(false); setDex(null); setPanel(next);
  }
  function openGuide(zone: ZoneId) {
    open('dex');
    setDex(zone);
  }
  function close() {
    if (panel === 'dex' && dex) markGuideRead(dex);
    setPanel(null);
  }
  function sceneAction(input: QuestAction) {
    if (input === 'c' && quest.scene.type === 'note' && quest.scene.guide) markGuideRead(quest.scene.guide);
    act(input);
  }
  function primary() {
    if (walking) { cancel(); return; }
    if (inMap) walkTo(goal);
    else sceneAction('c');
  }
  function keyboard(event: KeyboardEvent<HTMLElement>) {
    if (event.altKey || event.ctrlKey || event.metaKey || event.target instanceof HTMLInputElement) return;
    const key = event.key;
    if (key === 'Escape' && (session || panel)) {
      event.preventDefault();
      if (panel) close();
      else open('pause');
      return;
    }
    if (!session || panel) return;
    if (introZone) {
      if (!event.repeat && (key === 'Enter' || key === ' ') &&
        !(event.target instanceof HTMLElement && event.target.closest('button,a'))) {
        event.preventDefault();
        markGuideRead(introZone);
      }
      return;
    }
    const move = movementKeys[key];
    if (move && inMap) {
      event.preventDefault();
      act(move);
    } else if (/^[1-4]$/.test(key) && quest.scene.type === 'choice') {
      event.preventDefault();
      act(key as QuestAction);
    } else if (!event.repeat && (key === 'Enter' || key === ' ' || key === 'z') &&
      (key === 'z' || !(event.target instanceof HTMLElement && event.target.closest('button,a')))) {
      event.preventDefault();
      primary();
    }
  }
  function follow(place: Entity) { close(); walkTo(place); }
  function enterZone(zone: ZoneId) { close(); travelToZone(zone); }
  const currentZone = quest.area === 'hub' ? null : quest.area;
  const currentProgress = currentZone ? quest.progress[currentZone] : null;
  const selectedZone = dex && ZONES[dex];

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <div className={styles.layout}>
          <section ref={game} tabIndex={-1} onKeyDown={keyboard} className={styles.console} aria-label="Aventura Sigma Quest">
            <header className={styles.consoleHeader}>
              <QuestTitle />
              <button className={styles.menuTrigger} type="button" aria-expanded={!!panel} aria-controls={panel ? 'quest-menu' : undefined}
                onClick={() => panel ? close() : open('map')}><span aria-hidden="true">☰</span> Menu</button>
            </header>
            <div className={styles.hud}>
              <span className={styles.location}><i aria-hidden="true" />{area.name}</span>
              <div className={styles.stats}>
                {currentProgress && <span>Pistas <b>{evidenceCount(currentProgress)}/2</b></span>}
                <span>Riscos <b>{count}/5</b></span>
                <span>Pontos <b>{formatPoints(points)}</b></span>
                {session?.save.token && <span className={styles.time}>Tempo <b>{formatTime(clock.elapsedMs)}</b></span>}
              </div>
            </div>
            {!panel && <div className={styles.scene}>
              <QuestScreen quest={quest} halted={!session || !!panel} onTap={tap} />
              {!session && (
                <div className={styles.startOverlay}>
                  <div>
                    <h2>Um dia na Medisigma</h2>
                    <button type="button" className={styles.primary} disabled={!ready || starting} onClick={() => void start()}>
                      {starting ? 'A preparar o turno…' : 'Começar o turno'} <span aria-hidden="true">▸</span>
                    </button>
                    <small>Cerca de 10 min</small>
                  </div>
                </div>
              )}
            </div>}
            {session && !panel && inMap && (
              <>
                <Help quest={quest} walking={walking} notice={notice} />
                <div className={styles.controls}>
                  <div className={styles.pad} aria-label="Comandos de movimento">
                    {directions.map(({ move, label, glyph }) => <button type="button" key={move}
                      data-direction={move} aria-label={label} onClick={() => act(move)}>{glyph}</button>)}
                  </div>
                  <small className={styles.keyboard}>Setas para andar<br />Enter para interagir</small>
                  <button type="button" className={styles.action} onClick={primary}>
                    <span className={styles.aKey} aria-hidden="true">A</span>{walking ? 'Parar' : actionLabel(goal, quest)}
                  </button>
                </div>
              </>
            )}
            {session && !panel && !inMap && !finish && (
              introZone ? (
                <div className={styles.dialogue}>
                  <div className={styles.sceneMeta}><span className={styles.bullet} />Antes do encontro</div>
                  <p>A equipa deixou-te uma ficha com o básico para este local.</p>
                  <FieldGuide zone={introZone} />
                  <button type="button" className={styles.primary} onClick={() => markGuideRead(introZone)}>Ir para o encontro</button>
                </div>
              ) : <CampaignScene quest={quest} act={sceneAction} openGuide={openGuide} />
            )}
            {session && !panel && finish && (
              <div className={styles.finish}>
                <div className={styles.finishHead}>
                  <div><p className={styles.small}>Inspeção concluída</p><h2>{formatPoints(points)} pontos</h2>
                    <p>{quest.firstTries} de {quest.answered} decisões à primeira · Melhor sequência de {quest.longest}</p></div>
                  <button className={styles.secondary} type="button" onClick={() => open('pause')}>Novo turno</button>
                </div>
                <dl className={styles.scoreLines}>
                  {scoreLines.filter(([, key]) => key !== 'initiative' || quest.score.initiative > 0)
                    .map(([label, key]) => <div key={key}><dt>{label}</dt><dd>{formatPoints(quest.score[key])} pts</dd></div>)}
                  {clock.result && <div><dt>Tempo ativo · {formatTime(clock.result.elapsedMs)}</dt><dd>{clock.result.timePoints} pts</dd></div>}
                </dl>
                {clock.result || !session.save.token ? (
                  <ScoreForm key={session.save.seed} token={session.save.token} moves={session.save.moves} letters={session.save.letters}
                    publish={(letters, token) => { markPublished(letters, token); void refresh(); }} />
                ) : clock.error ? (
                  <div className={styles.buttonRow}><p role="alert">{clock.error}</p>
                    <button className={styles.secondary} onClick={clock.retry}>Voltar a confirmar</button></div>
                ) : <p className={styles.small} role="status">A confirmar o bónus de tempo…</p>}
              </div>
            )}
            {panel && <MenuWindow panel={panel} select={open} close={close}>
              {panel === 'map' && (
                <>
                  <Atlas quest={quest} />
                  <p className={styles.small}>O quadrado laranja mostra onde estás. {session && inMap ? 'Escolhe um edifício para caminhar até lá.' : 'Podes escolher um destino quando estiveres a explorar.'}</p>
                  <ul className={styles.travel}>
                    {ZONE_IDS.map(zone => (
                      <li key={zone}>
                        <button className={styles.secondary} type="button" onClick={() => enterZone(zone)}
                          disabled={!session || !inMap || quest.area === zone}>
                          <strong>{ZONES[zone].name}</strong><small>{quest.area === zone ? 'Estás aqui' : quest.progress[zone].completed ? 'Risco registado' : 'Visitar'}</small>
                        </button>
                      </li>
                    ))}
                  </ul>
                  {session && inMap && quest.area === 'hub' && (
                    <button type="button" className={styles.secondary}
                      onClick={() => {
                        const inspector = AREAS.hub.objects.find(object => object.kind === 'inspector');
                        if (inspector) follow(inspector);
                      }}>{count === 5 ? 'Ir à inspeção' : 'Falar com a Inês'}</button>
                  )}
                </>
              )}
              {panel === 'local' && (
                <>
                  <h2>{area.name}</h2>
                  {currentZone && (
                    <button type="button" className={styles.guideLink} onClick={() => openGuide(currentZone)}>Consultar ficha de bolso</button>
                  )}
                  {session && inMap ? <LocalRoutes quest={quest} go={follow} /> : <p>Os destinos estão disponíveis quando estiveres no mapa.</p>}
                </>
              )}
              {panel === 'dex' && (
                dex && selectedZone ? (
                  <div className={styles.entry}>
                    <FieldGuide zone={dex} />
                    <RiskIcon zone={dex} done={quest.progress[dex].completed} />
                    <p className={styles.small}>{selectedZone.name} · {evidenceCount(quest.progress[dex])}/2 pistas</p>
                    <h3>{quest.progress[dex].completed ? selectedZone.risk : 'Risco por descobrir'}</h3>
                    {quest.progress[dex].completed ? (
                      <><p>{selectedZone.dex}</p><p><a href={selectedZone.service.href} target="_blank" rel="noopener noreferrer">{selectedZone.service.label} na Medisigma ↗</a></p></>
                    ) : <p>Fala com a equipa e resolve o encontro neste local para registar a ficha.</p>}
                    <ul className={styles.evidence}>
                      {selectedZone.evidence.map((clue, i) => (
                            <li key={clue.label}><strong>{i === 0 ? 'Folheto na parede' : clue.label}</strong><span>{quest.progress[dex].clues & 1 << i ? clue.text : 'Por observar no mapa.'}</span></li>
                      ))}
                    </ul>
                    <div className={styles.buttonRow}>
                      <button className={styles.secondary} type="button" onClick={() => setDex(null)}>Todas as fichas</button>
                      {session && inMap && quest.area !== dex && <button className={styles.primary} type="button" onClick={() => enterZone(dex)}>Visitar {selectedZone.name}</button>}
                    </div>
                  </div>
                ) : <ZoneList quest={quest} select={setDex} />
              )}
              {panel === 'pause' && (
                <>
                  {reset ? <p>Queres começar um turno novo? O progresso desta partida será substituído.</p> :
                  <><h2>Turno em pausa</h2><p>O cronómetro fica em pausa no menu e nas fichas de bolso. O progresso fica guardado neste navegador.</p>
                      <p>Ganhas um ponto de tempo por cada dois segundos que sobram até aos 14 minutos de jogo ativo.</p>
                      <p>O folheto e a outra pista de cada sala valem 25 pontos cada. Depois do encontro, as duas desbloqueiam um desafio extra. As decisões à primeira aumentam a sequência. A pontuação máxima é de {formatPoints(MAX_SCORE)} pontos.</p></>}
                  <div className={styles.buttonRow}>
                    <button type="button" className={styles.secondary} disabled={starting} onClick={() => {
                      if (session && !reset && !finish) { setReset(true); return; }
                      close(); void start();
                    }}>{reset || finish || !session ? 'Começar novo turno' : 'Novo turno'}</button>
                  </div>
                </>
              )}
            </MenuWindow>}
          </section>
          <aside className={styles.records} aria-labelledby="quest-top-title">
            <div className={styles.notebookHead}><h2 id="quest-top-title">Top 10</h2><span>De sempre</span></div>
            <Records board={board} refresh={refresh} />
          </aside>
        </div>
      </div>
    </main>
  );
}
