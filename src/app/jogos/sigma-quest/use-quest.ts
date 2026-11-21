'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { applyAction, MAX_EVENTS, newQuest, QUEST_VERSION, replayQuest, type Quest, type QuestAction } from '@/lib/sigma-quest/game';
import { AREAS, entityInReach, findPath, type Entity, type Point } from '@/lib/sigma-quest/world';
import { ZONE_IDS, type ZoneId } from '@/lib/sigma-quest/cases';

export const RECORDS_URL = '/api/jogos/sigma-quest/recordes/';
const runsUrl = '/api/jogos/sigma-quest/partidas/';
const storageKey = 'medisigma-sigma-quest-v' + QUEST_VERSION;
const STEP_MS = 62;

type Save = { version: number; seed: number; token: string | null; moves: string; letters?: string; guidesRead?: ZoneId[] };
type Session = { save: Save; quest: Quest };

function read(): Session | null {
  try {
    const save = JSON.parse(localStorage.getItem(storageKey) ?? 'null') as Save | null;
    if (!save || save.version !== QUEST_VERSION || (save.token !== null && typeof save.token !== 'string')) return null;
    const quest = replayQuest(save.seed, save.moves);
    const storedGuides = save.guidesRead;
    const guidesRead = Array.isArray(storedGuides) ? ZONE_IDS.filter(zone => storedGuides.includes(zone)) : undefined;
    return quest && { save: { ...save, guidesRead }, quest };
  } catch {
    return null;
  }
}

function store(save: Save) {
  try { localStorage.setItem(storageKey, JSON.stringify(save)); } catch { /* Gameplay also works without storage. */ }
}

export function useQuest() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  const [starting, setStarting] = useState(false);
  const [walking, setWalking] = useState<string | null>(null);
  const [notice, setNotice] = useState('');
  const current = useRef<Session | null>(null);
  const timer = useRef<number | undefined>(undefined);
  const route = useRef(0);
  const opening = useRef(false);

  const update = useCallback((next: Session | null) => {
    current.current = next;
    setSession(next);
    if (next) store(next.save);
  }, []);

  const cancel = useCallback(() => {
    window.clearTimeout(timer.current);
    route.current += 1;
    setWalking(null);
  }, []);

  useEffect(() => {
    update(read());
    setReady(true);
    function stopWhenHidden() { if (document.hidden) cancel(); }
    document.addEventListener('visibilitychange', stopWhenHidden);
    return () => {
      document.removeEventListener('visibilitychange', stopWhenHidden);
      window.clearTimeout(timer.current);
      route.current += 1;
    };
  }, [cancel, update]);

  const start = useCallback(async () => {
    if (opening.current) return;
    opening.current = true;
    cancel();
    setNotice('');
    setStarting(true);
    let seed = (crypto.getRandomValues(new Uint32Array(1))[0] >>> 1) || 1;
    let token: string | null = null;
    try {
      const response = await fetch(runsUrl, { method: 'POST', cache: 'no-store', signal: AbortSignal.timeout(8_000) });
      if (response.ok) {
        const issued = await response.json();
        if (Number.isSafeInteger(issued.seed) && issued.seed > 0 && issued.seed <= 0x7fffffff && typeof issued.token === 'string') {
          seed = issued.seed;
          token = issued.token;
        }
      }
    } catch { /* Continue with a local campaign when the records service is unavailable. */ }
    update({ quest: newQuest(seed), save: { version: QUEST_VERSION, seed, token, moves: '' } });
    setStarting(false);
    opening.current = false;
    if (!token) setNotice('Partida local. Podes jogar e guardar o progresso neste dispositivo.');
  }, [cancel, update]);

  const action = useCallback((input: QuestAction) => {
    const running = current.current;
    if (!running) return false;
    if (running.save.moves.length >= MAX_EVENTS) {
      setNotice('Esta partida atingiu o limite de jogadas. Podes começar outro turno na pausa.');
      return false;
    }
    const quest = applyAction(running.quest, input);
    if (quest === running.quest) return false;
    setNotice('');
    update({ quest, save: { ...running.save, moves: running.save.moves + input } });
    return true;
  }, [update]);

  const markPublished = useCallback((letters: string, token: string) => {
    const running = current.current;
    if (running?.save.token === token) update({ ...running, save: { ...running.save, letters } });
  }, [update]);

  const markGuideRead = useCallback((zone: ZoneId) => {
    const running = current.current;
    if (!running || running.save.guidesRead?.includes(zone)) return;
    const guidesRead = [...(running.save.guidesRead ?? []), zone];
    update({ ...running, save: { ...running.save, guidesRead } });
  }, [update]);

  const walk = useCallback((to: Point, target?: Entity, after?: () => void) => {
    cancel();
    const quest = current.current?.quest;
    if (!quest || quest.scene.type !== 'map') return;
    const map = AREAS[quest.area];
    const near = entityInReach(map, quest.position, quest.facing);
    const path = target && near?.id === target.id ? [] : findPath(map, quest.position, to, target, quest.facing);
    if (!path) return;
    const moves = path;
    const revision = route.current;
    if (path.length) setWalking(target ? target.name : 'destino');
    let index = 0;
    function step() {
      if (route.current !== revision) return;
      if (index < moves.length) {
        if (!action(moves[index++])) { cancel(); return; }
        timer.current = window.setTimeout(step, STEP_MS);
        return;
      }
      setWalking(null);
      const latest = current.current?.quest;
      if (target && latest && entityInReach(map, latest.position, latest.facing)?.id === target.id && action('a')) after?.();
    }
    step();
  }, [action, cancel]);

  const act = useCallback((input: QuestAction) => {
    cancel();
    action(input);
  }, [action, cancel]);

  const travelToZone = useCallback((zone: ZoneId) => {
    const enter = () => {
      const door = AREAS.hub.objects.find(object => object.id === zone);
      if (door) walk(door.at, door);
    };
    const quest = current.current?.quest;
    if (!quest || quest.area === zone || quest.scene.type !== 'map') return;
    if (quest.area === 'hub') { enter(); return; }
    const exit = AREAS[quest.area].objects.find(object => object.kind === 'exit');
    if (exit) walk(exit.at, exit, enter);
  }, [walk]);

  const walkTo = useCallback((target: Entity) => walk(target.at, target), [walk]);

  const tap = useCallback((point: Point) => {
    const quest = current.current?.quest;
    if (!quest || quest.scene.type !== 'map') return;
    const object = AREAS[quest.area].objects.find(object => object.at.x === point.x && object.at.y === point.y);
    walk(point, object);
  }, [walk]);

  return { session, ready, starting, walking, notice, start, act, cancel, tap, travelToZone, walkTo, markPublished, markGuideRead };
}
