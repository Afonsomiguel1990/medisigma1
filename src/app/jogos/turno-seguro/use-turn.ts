'use client';

import { useEffect, useRef, useState } from 'react';
import {
  isMissionOver, MAX_SCORE, missionPoints, startMission, stepMission, TICK_MS,
  type Command, type Direction, type TurnAction,
} from '@/lib/turno-seguro/game';

type Phase = 'home' | 'starting' | 'briefing' | 'playing' | 'debrief' | 'finished';
export const RECORDS_URL = '/api/jogos/turno-seguro/recordes/';
const RUNS_URL = '/api/jogos/turno-seguro/partidas/';
const BEST_KEY = 'medisigma-turno-seguro-best-v1';

export function useTurn() {
  const [phase, setPhase] = useState<Phase>('home');
  const [mission, setMission] = useState(() => startMission(0));
  const [scores, setScores] = useState<number[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [best, setBest] = useState<number | null>(null);
  const activeMission = useRef(mission);
  const actions = useRef<TurnAction[]>([]);
  const pending = useRef<Command | null>(null);
  const held = useRef<Direction | null>(null);

  useEffect(() => {
    try {
      const value = localStorage.getItem(BEST_KEY);
      if (value && /^\d+$/.test(value) && Number(value) <= MAX_SCORE) setBest(Number(value));
    } catch {
      // The browser can restrict storage. The turn still runs in memory.
    }
  }, []);

  useEffect(() => {
    if (phase !== 'playing') return;

    let frame = 0;
    let lastTickAt = performance.now();
    function resetInput() {
      pending.current = null;
      held.current = null;
      lastTickAt = performance.now();
    }
    function advance(now: number) {
      const previous = activeMission.current;
      if (document.hidden || now - lastTickAt > 1000) lastTickAt = now;
      while (now - lastTickAt >= TICK_MS) {
        const state = activeMission.current;
        const command = pending.current ?? held.current ?? undefined;
        pending.current = null;
        if (command) actions.current.push([state.index, state.tick, command]);
        const next = stepMission(state, command);
        activeMission.current = next;
        lastTickAt += TICK_MS;
        if (isMissionOver(next)) {
          setMission(next);
          setScores((points) => [...points, missionPoints(next)]);
          setPhase('debrief');
          return;
        }
      }
      if (previous !== activeMission.current) setMission(activeMission.current);
      frame = requestAnimationFrame(advance);
    }

    document.addEventListener('visibilitychange', resetInput);
    frame = requestAnimationFrame(advance);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('visibilitychange', resetInput);
      resetInput();
    };
  }, [phase]);

  function brief(index: number) {
    const next = startMission(index);
    activeMission.current = next;
    setMission(next);
    setPhase('briefing');
  }

  async function start() {
    setPhase('starting');
    setScores([]);
    setToken(null);
    actions.current = [];
    try {
      const response = await fetch(RUNS_URL, { method: 'POST', signal: AbortSignal.timeout(4500) });
      if (response.ok) {
        const body = await response.json();
        if (typeof body.token === 'string') setToken(body.token);
      }
    } catch {
      // Local play is available when the score service fails.
    }
    brief(0);
  }

  function command(next: Command, hold = false) {
    if (phase !== 'playing') return;
    pending.current = next;
    if (hold && next !== 'act') held.current = next;
  }

  function release(direction?: Direction) {
    if (!direction || held.current === direction) held.current = null;
  }

  const total = scores.reduce((sum, points) => sum + points, 0);
  function finish() {
    const updatedBest = Math.max(total, best ?? 0);
    setBest(updatedBest);
    try {
      localStorage.setItem(BEST_KEY, String(updatedBest));
    } catch {
      // Keep the record in memory for this visit.
    }
    setPhase('finished');
  }

  return {
    phase, mission, scores, total, best, token, actions,
    start, brief, finish, command, release,
    play: () => setPhase('playing'),
  };
}
