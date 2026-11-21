'use client';

import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { normalizeLetters, type QuestRecord } from '@/lib/sigma-quest/record';
import { RECORDS_URL } from './use-quest';
import { formatTime } from './use-quest-clock';
import styles from './sigma-quest.module.css';

export const formatPoints = (value: number) => value.toLocaleString('pt-PT');
type Board = { records: QuestRecord[]; failed: boolean; loaded: boolean };

export function useRecords() {
  const [board, setBoard] = useState<Board>({ records: [], failed: false, loaded: false });
  const refresh = useCallback(async () => {
    try {
      const response = await fetch(RECORDS_URL, { cache: 'no-store', signal: AbortSignal.timeout(5000) });
      if (!response.ok) throw new Error();
      const data = await response.json() as { records: QuestRecord[] };
      setBoard({ records: data.records, failed: false, loaded: true });
    } catch {
      setBoard(previous => ({ ...previous, failed: true, loaded: true }));
    }
  }, []);
  useEffect(() => { void refresh(); }, [refresh]);
  return { board, refresh };
}

export function Records({ board, refresh }: { board: Board; refresh: () => void }) {
  const { records, failed, loaded } = board;
  if (!loaded) return <p className={styles.small}>A carregar os recordes…</p>;
  return (
    <>
      {records.length > 0 && (
        <table className={styles.recordTable}>
          <thead><tr><th scope="col">Pos.</th><th scope="col">Letras</th><th scope="col">Pontos</th><th scope="col">Tempo</th></tr></thead>
          <tbody>{records.map((row, i) => (
            <tr key={row.letters}>
              <td>{String(i + 1).padStart(2, '0')}</td><td>{row.letters}</td><td>{formatPoints(row.points)}</td><td>{formatTime(row.elapsed_ms)}</td>
            </tr>
          ))}</tbody>
        </table>
      )}
      {failed ? (
        <div className={styles.boardStatus}><p>O top 10 está temporariamente indisponível.</p><button className={styles.secondary} onClick={refresh}>Atualizar</button></div>
      ) : records.length === 0 ? <p className={styles.small}>O primeiro recorde está por escrever.</p> : null}
    </>
  );
}

export function ScoreForm({ token, moves, letters, publish }: {
  token: string | null; moves: string; letters?: string;
  publish: (letters: string, token: string) => void;
}) {
  const [value, setValue] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!token || busy) return;
    const signature = normalizeLetters(value);
    if (!signature) { setMessage('Escreve exatamente quatro letras de A a Z.'); return; }
    setBusy(true);
    setMessage('');
    try {
      const response = await fetch(RECORDS_URL, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, moves, letters: signature }), signal: AbortSignal.timeout(7000),
      });
      const data = await response.json();
      if (!response.ok) {
        setMessage(typeof data.error === 'string' ? data.error : 'Tenta publicar novamente daqui a pouco.');
        return;
      }
      publish(signature, token);
    } catch {
      setMessage('A pontuação está guardada neste dispositivo. Tenta publicar novamente.');
    } finally {
      setBusy(false);
    }
  }
  if (letters) return <p role="status" className={styles.signed}>Resultado publicado com <strong>{letters}</strong>.</p>;
  if (!token) return <p className={styles.small}>O resultado desta partida ficou guardado neste dispositivo.</p>;
  return (
    <form className={styles.scoreForm} onSubmit={submit} noValidate>
      <label htmlFor="quest-signature">As tuas quatro letras para o top 10</label>
      <p id="quest-signature-help">Vão ficar públicas juntamente com a pontuação.</p>
      <div className={styles.signRow}>
        <input id="quest-signature" name="letters" value={value} maxLength={4} autoComplete="off"
          autoCapitalize="characters" spellCheck={false} placeholder="ABCD" disabled={busy}
          aria-describedby="quest-signature-help" aria-invalid={Boolean(message)}
          onChange={event => { setValue(event.target.value); setMessage(''); }} />
        <button className={styles.primary} disabled={busy}>{busy ? 'A publicar…' : 'Publicar no top 10'}</button>
      </div>
      {message && <p className={styles.formError} role="alert">{message}</p>}
    </form>
  );
}
