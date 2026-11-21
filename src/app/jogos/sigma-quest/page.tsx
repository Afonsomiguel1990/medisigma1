import type { Metadata } from 'next';
import SigmaQuest from './sigma-quest';

const title = 'Sigma Quest';
const description = 'Explora cinco locais de trabalho, descobre os Riscos e regista o teu resultado no top 10 da Medisigma.';

export const metadata: Metadata = {
  title, description,
  alternates: { canonical: '/jogos/sigma-quest/' },
  openGraph: { title, description, url: '/jogos/sigma-quest/' },
};

export default function SigmaQuestPage() {
  return <SigmaQuest />;
}
