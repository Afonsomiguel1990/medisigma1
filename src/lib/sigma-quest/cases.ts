export const ZONE_IDS = ['office', 'factory', 'kitchen', 'hotel', 'warehouse'] as const;
export type ZoneId = typeof ZONE_IDS[number];

export type Choice = { label: string; reaction: string; result: 'best' | 'partial' | 'wrong' };
export type Decision = { prompt: string; choices: readonly [Choice, Choice, Choice, Choice] };
type FieldTip = { title: string; text: string };

export type Zone = {
  name: string;
  risk: string;
  colour: string;
  mentor: string;
  briefing: string;
  guide: readonly FieldTip[];
  evidence: readonly [{ label: string; text: string }, { label: string; text: string }];
  first: readonly [Decision, Decision];
  second: Decision;
  extra: { label: string; question: Decision };
  inspection: Decision;
  resolution: string;
  dex: string;
  service: { label: string; href: string };
};

const best = (label: string, reaction: string): Choice => ({ label, reaction, result: 'best' });
const partial = (label: string, reaction: string): Choice => ({ label, reaction, result: 'partial' });
const wrong = (label: string, reaction: string): Choice => ({ label, reaction, result: 'wrong' });
const decision = (prompt: string, ...choices: Decision['choices']): Decision => ({ prompt, choices });

export const ZONES: Record<ZoneId, Zone> = {
  office: {
    name: 'Escritório', risk: 'Stressauro', colour: '#e4b467', mentor: 'Marta · Chefe de equipa',
    briefing: 'O Stressauro cresce com cada pedido urgente. Vê o folheto e o posto da Leonor.',
    guide: [
      { title: 'Quando tudo parece urgente', text: 'Em equipa, combinem o que sai hoje, o que pode esperar e quem ajuda. Se chegar um pedido urgente, decidam que tarefa sai da lista.' },
      { title: 'Quando as ordens chocam', text: 'Junta quem deu ordens diferentes. Acordem o que fazer primeiro e quem decide se voltarem a discordar.' },
      { title: 'O posto de trabalho', text: 'Põe o ecrã de frente para trabalhares com o pescoço direito. Ajusta a cadeira à pessoa.' },
    ],
    evidence: [
      { label: 'Quadro de tarefas', text: 'Quatro tarefas têm a mesma hora de entrega. Numa delas, duas equipas deram instruções diferentes à Leonor.' },
      { label: 'Posto da Leonor', text: 'O monitor está muito de lado. Para olhar para o ecrã, a Leonor tem de manter o pescoço virado.' },
    ],
    first: [
      decision('Chegaram quatro pedidos urgentes ao mesmo tempo. A Leonor está a tentar fazê-los todos. O que pode a equipa combinar já?',
        best('Definir prioridades em conjunto', 'A equipa separa o que tem de sair hoje e distribui o resto. A pilha do Stressauro encolhe.'),
        partial('Fazer uma pausa e voltar', 'A pausa ajuda a recuperar. Quando voltarem, os quatro pedidos continuam em cima da mesma pessoa.'),
        wrong('Aceitar todos os prazos', 'A Leonor fica com o mesmo volume de trabalho e ainda menos margem para pedir ajuda.'),
        wrong('Pedir que trabalhe mais depressa', 'A pressão aumenta. A equipa ainda precisa de decidir o que pode esperar.')),
      decision('Duas equipas deram instruções diferentes à Leonor para o mesmo trabalho. Como podes resolver o conflito agora?',
        best('Reunir as duas equipas', 'As equipas combinam uma prioridade e quem decide se houver novo conflito. A Leonor fica com uma instrução clara.'),
        partial('Registar as duas instruções', 'O registo ajuda a mostrar o conflito. Falta juntar quem pode alinhar a decisão.'),
        wrong('Escolher o pedido mais recente', 'A ordem de chegada não resolve a contradição. A outra equipa continua à espera de um resultado diferente.'),
        wrong('Tentar cumprir ambas em segredo', 'O conflito reaparece assim que for preciso entregar. E a carga fica toda com a Leonor.')),
    ],
    second: decision('A Leonor consulta o monitor o dia todo com o pescoço virado. Que mudança resolve diretamente o que observaste?',
      best('Reposicionar monitor e cadeira', 'Com o ecrã de frente e a cadeira ajustada, a Leonor trabalha com o pescoço direito.'),
      partial('Programar lembretes de pausa', 'Variar de posição é útil. O monitor continua de lado quando a Leonor volta ao posto.'),
      wrong('Aumentar o tamanho da letra', 'O texto fica maior, mas o ecrã continua fora da posição de trabalho.'),
      wrong('Pedir-lhe que aguente até sexta', 'O posto mantém a mesma exigência o dia inteiro. Há um ajuste físico simples a experimentar.')),
    extra: { label: 'Pedido de última hora', question: decision('A equipa já combinou as prioridades. Chega um novo pedido que tem mesmo de sair hoje. Como evitas voltar à mesma confusão?',
      best('Acordar o que sai da lista', 'A equipa muda o plano à vista de todos. O novo pedido tem espaço porque outra tarefa fica para amanhã.'),
      partial('Anotar o pedido num quadro', 'O pedido fica visível. O quadro precisa ainda de dizer o que muda nas entregas de hoje.'),
      wrong('Acrescentar a tarefa a cada lista', 'Toda a gente ganha trabalho e ninguém fica responsável por decidir o que adiar.'),
      wrong('Manter todos os prazos', 'Entrou trabalho novo numa agenda que já estava cheia. É preciso decidir o que muda.')) },
    inspection: decision('Na receção de um hotel, duas pessoas recebem ordens incompatíveis sobre a mesma fila. Qual é o primeiro ajuste à organização?',
      best('Combinar uma regra e quem decide', 'Uma prioridade comum dá às duas pessoas uma forma clara de resolver o próximo conflito.'),
      partial('Registar o incidente', 'O registo ajuda a investigar. A fila já precisa de um critério partilhado.'),
      wrong('Deixar cada pessoa seguir a sua ordem', 'A mesma fila fica sujeita a duas regras.'),
      wrong('Pedir à equipa para acelerar', 'Acelerar não esclarece a regra que os dois devem seguir.')),
    resolution: 'No quadro, uma tarefa já passou para amanhã.',
    dex: 'O Stressauro cresce com exigências incompatíveis e pouca margem para decidir. A Medisigma avalia riscos psicossociais e ajuda as equipas a definir medidas de prevenção.',
    service: { label: 'Psicologia no Trabalho', href: '/servicos/psicologia/' },
  },
  factory: {
    name: 'Fábrica', risk: 'Engreneco', colour: '#99c2cc', mentor: 'João · Operador',
    briefing: 'Aqui cruzamo-nos com empilhadores. Vê o folheto de acesso e o registo junto às máquinas.',
    guide: [
      { title: 'Caminhos para pessoas', text: 'O percurso pedonal é o caminho marcado para pessoas, separado dos empilhadores. Se estiver bloqueado, para e pede outro percurso seguro.' },
      { title: 'Máquina com uma proteção solta', text: 'Mantém a distância e avisa logo a pessoa responsável. A equipa com formação trata da intervenção.' },
      { title: 'O sinal indica a proteção', text: 'A proteção auditiva é para os ouvidos. Confirma com a equipa se podes entrar e usa a proteção indicada no sinal.' },
    ],
    evidence: [
      { label: 'Sinal de acesso', text: 'A linha no chão leva ao percurso pedonal. Para a zona assinalada junto às máquinas, confirma a autorização e a proteção indicada.' },
      { label: 'Registo de anomalias', text: 'Quando se deteta uma proteção danificada, a equipa comunica a situação à chefia e segue o procedimento de segurança.' },
    ],
    first: [
      decision('Vês uma proteção solta numa máquina em funcionamento. És estagiário e estás fora da zona marcada. Qual é a primeira reação?',
        best('Manter distância e alertar já', 'O João recebe o aviso e aciona o procedimento da fábrica. A equipa responsável assegura a intervenção.'),
        partial('Anotar a localização', 'Identificar a máquina é útil. O registo, sozinho, deixa a equipa sem aviso enquanto a situação continua.'),
        wrong('Chegar perto para ver melhor', 'Aproximar-te da máquina acrescenta exposição antes de alguém responsável avaliar a anomalia.'),
        wrong('Ajustar a proteção à mão', 'Intervir numa máquina em funcionamento expõe-te às partes móveis. A equipa responsável trata da ocorrência.')),
      decision('O caminho mais curto cruza uma zona de empilhadores. O percurso para peões contorna a área. Como chegas ao posto?',
        best('Seguir o percurso pedonal', 'A marcação separa a tua deslocação da rota das cargas. O Engreneco perde uma engrenagem.'),
        partial('Perguntar onde é o posto', 'Pedir orientação ajuda. Para lá chegar, já sabes qual é o caminho preparado para peões.'),
        wrong('Cruzar pelo caminho mais curto', 'Esse corredor foi reservado à circulação das cargas. Usa a passagem destinada a peões.'),
        wrong('Passar atrás do empilhador', 'A manobra ainda pode mudar. Mantém-te no percurso pedonal.')),
    ],
    second: decision('A zona seguinte tem um sinal de proteção auditiva obrigatória. Trouxeste luvas. Como te preparas para entrar?',
      best('Confirmar acesso e proteção indicada', 'O João confirma que podes entrar e mostra-te a proteção auditiva prevista para este posto.'),
      partial('Ler o registo de anomalias', 'É um documento útil para outro momento. O sinal já identifica o que tens de confirmar à entrada.'),
      wrong('Entrar apenas com as luvas', 'As luvas protegem as mãos. O sinal deste local pede proteção para o ruído.'),
      wrong('Tapar os ouvidos e atravessar', 'Tapar os ouvidos com as mãos não substitui a proteção indicada para a zona.')),
    extra: { label: 'Travessia bloqueada', question: decision('Uma palete bloqueia o percurso pedonal e há cargas a circular ao lado. Que decisão te permite continuar em segurança?',
      best('Parar e pedir percurso alternativo', 'A equipa sinaliza o bloqueio e indica outra passagem pedonal. O percurso volta a ficar separado do tráfego.'),
      partial('Fotografar a palete para o registo', 'O registo ajuda a corrigir a origem do problema. Ainda precisas de um trajeto seguro para passar.'),
      wrong('Usar a faixa de cargas', 'A faixa está em uso. O desvio tem de manter os peões fora dela.'),
      wrong('Passar por cima da palete', 'Subir à carga pode causar uma queda. A equipa pode indicar outro percurso.')) },
    inspection: decision('Na lavandaria do hotel, uma tampa de proteção ficou solta numa máquina. Não tens formação para a reparar. O que fazes primeiro?',
      best('Afastar-te e avisar a equipa', 'A equipa responsável pode assegurar a máquina e seguir o procedimento antes de voltar a utilizá-la.'),
      partial('Apontar o número da máquina', 'O número ajuda a identificar a situação. Falta avisar quem pode intervir.'),
      wrong('Voltar a encaixar a tampa', 'A intervenção numa máquina cabe a quem tem formação e segue o procedimento previsto.'),
      wrong('Pedir que continuem a usar', 'O problema continua enquanto a máquina estiver em serviço.')),
    resolution: 'O Engreneco perde a última engrenagem.',
    dex: 'Percursos claros, proteções e comunicação evitam exposições desnecessárias. A Medisigma avalia os riscos profissionais e ajuda a preparar medidas de prevenção.',
    service: { label: 'Segurança no Trabalho', href: '/servicos/seguranca-no-trabalho/' },
  },
  kitchen: {
    name: 'Cozinha', risk: 'Baratona', colour: '#e7a28c', mentor: 'Sofia · Responsável de cozinha',
    briefing: 'A Baratona deixou marcas nas caixas. Vê o folheto e a folha de receção.',
    guide: [
      { title: 'Embalagem suspeita', text: 'Marcas de roedura podem indicar pragas. Separa e identifica o produto para ninguém o usar. Avisa quem gere a cozinha.' },
      { title: 'O lote é um código', text: 'O lote é o código de um grupo de produtos. Regista o produto, o lote, a hora e o que viste.' },
      { title: 'O que é o plano HACCP', text: 'É o plano que diz o que verificar à chegada dos alimentos. Se faltar um controlo, consulta o plano e retém a entrega. Isso significa sinalizá-la e deixá-la à parte até a responsável a verificar.' },
    ],
    evidence: [
      { label: 'Embalagem roída', text: 'A caixa tem um rasgo irregular e marcas junto à base. Há mais stock em redor que a equipa deve verificar.' },
      { label: 'Folha de receção', text: 'A folha liga cada ocorrência aos produtos, ao lote e à hora. Para saber o que verificar, a Sofia consulta o plano HACCP.' },
    ],
    first: [
      decision('Uma embalagem no armazém tem marcas de roedura. A caixa ainda está ao lado dos restantes alimentos. Que ação vem primeiro?',
        best('Separar a caixa e avisar a Sofia', 'A caixa fica fora da utilização. A Sofia pode verificar os produtos próximos e aplicar o procedimento da cozinha.'),
        partial('Anotar a marca para mais tarde', 'O registo será útil. Primeiro, impede que alguém use a caixa enquanto a situação é avaliada.'),
        wrong('Usar o conteúdo que parece intacto', 'A aparência não esclarece se o produto foi afetado. A responsável deve avaliar o lote.'),
        wrong('Mudar a caixa para outra prateleira', 'Mudar de lugar sem identificar o problema mantém a caixa disponível para utilização.')),
      decision('Aparecem indícios de praga junto a embalagens de alimentos. Chegas antes da preparação do almoço. Que ação reduz já o risco?',
        best('Isolar o stock afetado e comunicar', 'A Sofia retira o stock da utilização e desencadeia a verificação dos produtos e do local.'),
        partial('Marcar uma visita de controlo', 'O controlo especializado é útil. Antes da visita, a equipa ainda precisa de impedir o uso do stock afetado.'),
        wrong('Limpar as marcas e seguir', 'A limpeza, por si só, não permite investigar o que aconteceu nem avaliar os alimentos próximos.'),
        wrong('Aplicar produto junto dos alimentos', 'Uma intervenção precisa de ser preparada pela equipa responsável para proteger os alimentos e o espaço.')),
    ],
    second: decision('A caixa já está separada. Que informação ajuda a Sofia a localizar outros produtos da mesma entrega e a decidir o que fazer?',
      best('Produto, lote, hora e ocorrência', 'A Sofia liga o incidente à entrega e consegue verificar as embalagens relacionadas.'),
      partial('Apenas uma fotografia da prateleira', 'A fotografia mostra o local. Falta identificar os produtos a verificar e quando chegaram.'),
      wrong('Apenas o preço de compra', 'O preço permite fazer contas, mas não permite identificar o lote nem a ocorrência.'),
      wrong('Apagar a receção para a repetir', 'Apagar o registo perde a ligação à entrega original.')),
    extra: { label: 'Entrega sem confirmação', question: decision('Chega uma encomenda refrigerada. O controlo obrigatório na receção ficou por fazer e ninguém confirma as condições da entrega. O que fazes?',
      best('Sinalizar, reter e consultar o plano', 'A entrega espera pela verificação prevista. A Sofia decide de acordo com o plano de autocontrolo e regista o resultado.'),
      partial('Guardar uma foto da etiqueta', 'A etiqueta identifica a encomenda. A verificação das condições de receção continua por fazer.'),
      wrong('Aceitar porque o carro parece frio', 'A aparência do veículo não substitui o controlo previsto para os alimentos.'),
      wrong('Preencher o registo por estimativa', 'Um valor inventado impede a equipa de avaliar a ocorrência.')) },
    inspection: decision('Num café, aparece uma embalagem danificada que parece ter sido roída. Como evitas que siga para o serviço?',
      best('Separar, identificar e comunicar', 'O produto fica fora do serviço e a responsável consegue investigar a ocorrência e verificar os produtos próximos.'),
      partial('Tirar uma fotografia', 'A foto ajuda a documentar. O produto ainda precisa de ficar identificado e fora do stock utilizável.'),
      wrong('Usar apenas a parte que parece boa', 'A aparência não permite avaliar o risco de utilização.'),
      wrong('Pôr tudo numa caixa nova', 'Mudar de embalagem pode perder a identificação do produto e não resolve a ocorrência.')),
    resolution: 'A caixa fica na zona assinalada. A Baratona perde o esconderijo.',
    dex: 'Indícios de praga exigem proteger os alimentos e registar o que aconteceu. A Medisigma ajuda a preparar e verificar planos HACCP e procedimentos de autocontrolo.',
    service: { label: 'Segurança Alimentar e HACCP', href: '/servicos/seguranca-alimentar/' },
  },
  hotel: {
    name: 'Hotel', risk: 'Legionela', colour: '#a9c9a4', mentor: 'Lina · Manutenção',
    briefing: 'Antes de reabrirmos a ala Nascente, compara o folheto com a ficha de manutenção.',
    guide: [
      { title: 'A aparência da água engana', text: 'Mesmo com água límpida, confirma no plano quais são as verificações exigidas antes da reabertura.' },
      { title: 'Ler a ficha certa', text: 'A ficha tem de ser da mesma ala e do mesmo equipamento. Se faltar uma verificação ou dois registos não baterem certo, pede confirmação à manutenção antes de abrir.' },
      { title: 'Deixar um aviso útil', text: 'No aviso, indica a ala, o equipamento e a verificação em falta.' },
    ],
    evidence: [
      { label: 'Plano da ala', text: 'A ala Nascente esteve fechada para obras. A reabertura tem verificações previstas no plano de prevenção da instalação.' },
      { label: 'Ficha de manutenção', text: 'O campo da última verificação está em branco. A ficha identifica a ala, o equipamento e quem deve confirmar o estado.' },
    ],
    first: [
      decision('Querem reabrir a ala Nascente. A última verificação da instalação de água está por confirmar. Como encaminhas a situação?',
        best('Avisar a Lina antes de reabrir', 'A Lina consulta o plano e confirma com a equipa responsável o que falta verificar antes de libertar a ala.'),
        partial('Voltar a folhear as fichas', 'Procurar o registo ajuda. A abertura está prestes a acontecer e o responsável precisa já de saber que a verificação está por confirmar.'),
        wrong('Abrir porque a água está límpida', 'A aparência da água não permite confirmar que as verificações previstas foram feitas.'),
        wrong('Preencher a ficha com a data de hoje', 'Uma data sem verificação esconde a lacuna e impede uma decisão informada.')),
      decision('A equipa recebe dois registos diferentes para o mesmo equipamento. Um indica revisão feita e outro deixa o campo em branco. Qual é o passo a dar?',
        best('Reportar a divergência à Lina', 'A Lina identifica o equipamento, confirma a intervenção e corrige o estado com evidência.'),
        partial('Guardar os dois registos', 'Preservar o histórico ajuda. Falta comunicar a divergência para alguém a poder resolver.'),
        wrong('Ficar com o registo mais otimista', 'Escolher um registo pelo resultado pode ocultar uma verificação em falta.'),
        wrong('Ver se a água cheira bem', 'O cheiro não esclarece qual dos registos está correto.')),
    ],
    second: decision('A Lina vai verificar a ocorrência com outra equipa. O que convém deixar na ficha para chegarem ao local certo?',
      best('Ala, equipamento e verificação em falta', 'A equipa sabe onde atuar e qual é a informação que precisa de confirmar.'),
      partial('Apenas «água por verificar»', 'Indica o tema, mas a equipa ainda não sabe qual é o equipamento nem em que ala deve procurar.'),
      wrong('Uma opinião sobre o aspeto da água', 'A inspeção visual não substitui a identificação do equipamento ou a verificação em falta.'),
      wrong('Apenas o nome do hotel', 'O hotel tem várias alas e sistemas. A equipa precisa de saber exatamente qual é o ponto em causa.')),
    extra: { label: 'Ficha trocada', question: decision('A verificação está assinada, mas refere-se à ala Poente. A equipa prepara a reabertura da ala Nascente. Como lês este registo?',
      best('A verificação é de outra ala', 'Correto. A Lina procura a evidência da Nascente antes de dar a reabertura como confirmada.'),
      partial('Confirmar que está assinado', 'A assinatura confirma quem registou a intervenção. Ainda é preciso verificar a que ala corresponde.'),
      wrong('Validar as duas alas com a mesma ficha', 'A ficha identifica apenas o equipamento da ala Poente.'),
      wrong('Copiar a data para a outra ala', 'Copiar a data criaria um registo de uma ação por confirmar.')) },
    inspection: decision('No balneário de uma fábrica, há uma verificação de água prevista antes de voltar a usar o espaço. Na ficha, o campo está vazio. Como procedes?',
      best('Pedir confirmação à manutenção', 'A equipa verifica o estado previsto no plano e decide quando o balneário pode voltar ao serviço.'),
      partial('Assinalar que o campo está em branco', 'Marcar a lacuna é o começo. A manutenção tem de receber o aviso antes de o espaço voltar ao serviço.'),
      wrong('Libertar o espaço se cheirar bem', 'O cheiro não permite confirmar que a verificação foi efetuada.'),
      wrong('Copiar a verificação do outro balneário', 'O registo tem de corresponder ao equipamento da zona em causa.')),
    resolution: 'A ala fica sinalizada até a manutenção confirmar a verificação.',
    dex: 'A prevenção de Legionella passa pelo acompanhamento dos sistemas de água. A Medisigma ajuda a avaliar a instalação e a organizar o plano, a monitorização e os registos.',
    service: { label: 'Prevenção e controlo de Legionella', href: '/servicos/legionella/' },
  },
  warehouse: {
    name: 'Armazém', risk: 'Foguinho', colour: '#e68d63', mentor: 'Rita · Técnica de segurança',
    briefing: 'Vamos ensaiar a evacuação. Vê onde fica o alarme e onde a equipa se reúne.',
    guide: [
      { title: 'O alarme avisa toda a gente', text: 'Se detetares fumo no simulacro, dá o alarme. A equipa com formação assume a intervenção.' },
      { title: 'Onde termina a saída', text: 'Segue a saída assinalada até ao ponto de encontro, onde a equipa confirma quem saiu. Os pertences podem esperar.' },
      { title: 'Preparar o caminho', text: 'Se vires caixas a tapar uma saída antes do simulacro, avisa. A equipa liberta o caminho e combina onde arrumar as caixas.' },
    ],
    evidence: [
      { label: 'Planta de emergência', text: 'A planta mostra a saída sinalizada e o ponto de encontro na praça, junto à bandeira.' },
      { label: 'Alarme do corredor', text: 'O botão pertence ao simulacro. A tua função na cena é dar o alarme e seguir as indicações de evacuação da equipa.' },
    ],
    first: [
      decision('No simulacro aparece fumo junto ao quadro elétrico. O alarme está ao teu lado e ainda ninguém foi avisado. Qual é a tua primeira ação?',
        best('Dar o alarme', 'As pessoas ouvem o aviso e iniciam a evacuação. A equipa com função de intervenção assume a ocorrência.'),
        partial('Consultar a planta de emergência', 'A planta ajuda a preparar a saída. Neste momento, as pessoas do outro lado da porta ainda precisam de ser avisadas.'),
        wrong('Aproximar-te do quadro elétrico', 'Aproximar-te atrasa o alarme e coloca-te junto do fumo. O teu papel no simulacro é avisar e evacuar.'),
        wrong('Ir buscar um extintor', 'No simulacro, a equipa de intervenção trata dos meios. A tua primeira tarefa é avisar as pessoas.')),
      decision('No exercício, a Rita aponta fumo numa zona de carga. Está combinado que és tu a dar o alarme quando o detetares. O botão está ao lado. Que fazes?',
        best('Dar o alarme pelo botão próximo', 'A equipa recebe o sinal e segue o plano do simulacro.'),
        partial('Avisar apenas a pessoa mais próxima', 'Essa pessoa ouve-te. O sinal do edifício serve para avisar também quem está noutras divisões.'),
        wrong('Esperar até alguém confirmar', 'O exercício dá-te a responsabilidade de avisar quando detetas o sinal.'),
        wrong('Sair pelo portão sem avisar', 'As pessoas noutras zonas ficam sem sinal para começar a evacuação.')),
    ],
    second: decision('O alarme tocou. A saída sinalizada junto a ti está livre. Um colega quer esperar no cais para buscar a mochila. Onde deves acompanhá-lo?',
      best('Ao ponto de encontro assinalado', 'A equipa consegue confirmar quem saiu quando todos se reúnem no sítio combinado.'),
      partial('Apenas até à porta da rua', 'Sair é o primeiro passo. A equipa só consegue fazer a verificação quando chegarem ao ponto de encontro.'),
      wrong('Ao cacifo pela mochila', 'Voltar para buscar objetos atrasa a saída e contraria o exercício.'),
      wrong('Ao cais para terminar a descarga', 'O objetivo agora é reunir a equipa no local combinado no plano.')),
    extra: { label: 'Caixas no corredor', question: decision('Antes do próximo simulacro, vês caixas a bloquear uma saída. Que medida permite corrigir o problema e evitar que se repita?',
      best('Avisar, desimpedir e definir arrumação', 'A equipa confirma que a passagem ficou livre e combina onde depositar as próximas caixas.'),
      partial('Mudar as caixas de sítio uma vez', 'A passagem fica livre agora. Ainda falta combinar onde colocar as próximas caixas para o problema não voltar.'),
      wrong('Deixar a saída para objetos leves', 'Mesmo caixas leves podem dificultar a passagem no momento da evacuação.'),
      wrong('Tapar a sinalização daquela saída', 'A saída precisa de estar acessível e reconhecível dentro do plano do edifício.')) },
    inspection: decision('Num hotel, o alarme já tocou e o caminho assinalado está livre. Uma hóspede quer voltar ao quarto pela mala. Para onde a acompanhas?',
      best('Ao ponto de encontro', 'A hóspede segue o trajeto de evacuação e a equipa consegue confirmar que saiu.'),
      partial('À porta de entrada', 'Chegar à rua é parte do trajeto. Falta completar o percurso até ao ponto de encontro.'),
      wrong('Ao quarto para ir mais depressa', 'Ir buscar a mala implica voltar para dentro do edifício durante a evacuação.'),
      wrong('À garagem, pelo carro', 'A garagem não é o local onde a equipa vai confirmar quem saiu.')),
    resolution: 'A Rita dá por terminado o simulacro.',
    dex: 'O Foguinho é vencido quando cada pessoa sabe o que fazer. A Medisigma ajuda a preparar medidas de autoproteção, planos de emergência e formação da equipa.',
    service: { label: 'Segurança Contra Incêndios', href: '/servicos/seguranca-incendios/' },
  },
};
