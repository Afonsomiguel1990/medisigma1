'use client';

import { useEffect, useRef, useState } from 'react';
import type { QuestClock, QuestResult } from '@/lib/sigma-quest/record';

const clockUrl = '/api/jogos/sigma-quest/tempo/';

export function formatTime(elapsedMs: number) {
  const seconds = Math.floor(elapsedMs / 1000);
  return String(Math.floor(seconds / 60)).padStart(2, '0') + ':' + String(seconds % 60).padStart(2, '0');
}

async function updateClock(token: string, action: 'pause' | 'resume' | 'finish', moves?: string, keepalive = false) {
  const response = await fetch(clockUrl, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, cache: 'no-store', keepalive,
    body: JSON.stringify({ token, action, ...(moves === undefined ? {} : { moves }) }),
    signal: AbortSignal.timeout(6500),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error ?? 'O cronómetro está temporariamente indisponível.');
  return data as QuestClock | QuestResult;
}

export function useQuestClock(token: string | null, menuOpen: boolean, finishMoves?: string) {
  const [visible, setVisible] = useState(true);
  const [revision, setRevision] = useState(0);
  const [snapshot, setSnapshot] = useState<{ token: string; data: QuestClock | QuestResult; readAt: number } | null>(null);
  const [error, setError] = useState('');
  const [beat, setBeat] = useState(0);
  const queue = useRef(Promise.resolve());
  const paused = menuOpen || !visible;
  const current = snapshot?.token === token ? snapshot : null;
  const action = finishMoves !== undefined ? 'finish' : paused ? 'pause' : 'resume';

  useEffect(() => {
    const visibility = () => setVisible(!document.hidden);
    visibility();
    document.addEventListener('visibilitychange', visibility);
    return () => document.removeEventListener('visibilitychange', visibility);
  }, []);

  useEffect(() => {
    if (!token || finishMoves !== undefined) return;
    const pauseOnExit = () => { void updateClock(token, 'pause', undefined, true).catch(() => {}); };
    window.addEventListener('pagehide', pauseOnExit);
    return () => window.removeEventListener('pagehide', pauseOnExit);
  }, [token, finishMoves]);

  useEffect(() => {
    if (!token) return;
    let superseded = false;
    setError('');
    queue.current = queue.current.then(async () => {
      if (superseded) return;
      try {
        const data = await updateClock(token, action, finishMoves, action === 'pause');
        if (!superseded) setSnapshot({ token, data, readAt: performance.now() });
      } catch (failure) {
        if (!superseded && action === 'finish') {
          setError(failure instanceof Error && failure.name === 'Error' ? failure.message : 'O cronómetro está temporariamente indisponível.');
        }
      }
    });
    return () => { superseded = true; };
  }, [token, action, finishMoves, revision]);

  const running = Boolean(current?.data.running && !paused && finishMoves === undefined);
  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => setBeat(performance.now()), 250);
    return () => window.clearInterval(id);
  }, [running]);

  const elapsedMs = current ? current.data.elapsedMs + (current.data.running ? Math.max(0, beat - current.readAt) : 0) : 0;
  const result = current?.data.finished && 'timePoints' in current.data ? current.data : null;
  return { elapsedMs, result, error, retry: () => setRevision(value => value + 1) };
}
