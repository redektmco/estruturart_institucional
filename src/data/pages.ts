export type Solution = {
  slug: string; name: string; category: string; headline: string; description: string; image: string; alt: string;
  introTitle: string; intro: string; benefits: [string, string][]; steps: [string, string][];
  faqs: [string, string][]; related: string[];
}
export const solutions: Solution[] = [
  {
    slug:'antecipacao-de-recebiveis',name:'Antecipação de Recebíveis',category:'Recebíveis',headline:'O que você vendeu.\nDisponível antes.',image:'recebiveis',alt:'Empresário revisando relatórios financeiros ao lado do notebook',
    description:'Transforme vendas no cartão e duplicatas em capital de giro. Seu negócio continua no ritmo de hoje, sem esperar o vencimento dos recebíveis.',
    introTitle:'Seu dinheiro tem\num novo tempo.',intro:'A distância entre vender e receber não precisa limitar a próxima decisão da sua empresa. A antecipação permite acessar o valor das vendas a prazo, conforme a análise e as condições da operação.',
    benefits:[['Cartão e duplicatas','Possibilidades de antecipação para diferentes carteiras de recebíveis.'],['Mais fôlego para o caixa','Recursos para organizar pagamentos, recompor estoque e aproveitar oportunidades.'],['Uma estrutura próxima','Acompanhamento especializado para entender os recebíveis e o momento do negócio.']],
    steps:[['Conte sobre a operação','Apresente as informações da empresa e o perfil dos recebíveis que pretende antecipar.'],['Receba uma análise','A equipe avalia a carteira, os documentos e as condições adequadas à operação.'],['Escolha com clareza','Confira valores, custos e prazos na proposta antes de decidir pela contratação.']],
    faqs:[['Quais recebíveis podem ser antecipados?','Recebíveis de vendas no cartão e duplicatas podem ser avaliados. A elegibilidade depende da análise da carteira.'],['Preciso antecipar todas as minhas vendas?','A composição da operação depende do perfil da carteira e das condições apresentadas. Consulte as possibilidades com um especialista.'],['Qual é o custo da antecipação?','Os custos variam conforme o prazo e as características dos recebíveis. As condições são informadas antes da contratação.']],related:['capital-de-giro','conta-digital-pj'],
  },
  {
    slug:'conta-digital-pj',name:'Conta Digital PJ',category:'Conta e gestão',headline:'Toda a sua operação.\nUma única conta.',image:'conta-cartao',alt:'Cartão oficial Estruturart Capital com chip, aproximação e bandeira Mastercard',
    description:'Pix, transferências, pagamentos e extratos em uma plataforma para o dia a dia financeiro da sua empresa.',
    introTitle:'Menos caminhos.\nMais controle.',intro:'Centralizar a movimentação ajuda a acompanhar o que entra, o que sai e o que vem pela frente. A conta digital PJ reúne os recursos essenciais para operar com mais organização.',
    benefits:[['Movimente o negócio','Pix, transferências e pagamentos para acompanhar o ritmo da empresa.'],['Enxergue cada movimento','Extratos e informações para manter a rotina financeira sob controle.'],['Conecte suas soluções','Uma estrutura que aproxima a conta, os recebíveis e os meios de pagamento.']],
    steps:[['Apresente sua empresa','Converse com a equipe sobre o perfil e as necessidades da operação.'],['Confira os requisitos','Receba orientação sobre os documentos e as condições para abertura.'],['Organize sua rotina','Com a conta habilitada, acompanhe suas movimentações na plataforma.']],
    faqs:[['A conta é destinada a empresas?','Sim. A proposta da conta digital PJ é atender a rotina financeira de pessoas jurídicas, conforme os requisitos de abertura.'],['O que posso fazer na conta?','A solução reúne Pix, transferências, pagamentos e extratos. Confirme os recursos disponíveis nas condições da sua conta.'],['Existe uma solução para operações com proteção adicional?','A conta escrow atende operações que exigem regras específicas de movimentação e liberação de recursos.']],related:['conta-escrow','estruturart-pay'],
  },
  {
    slug:'conta-escrow',name:'Conta Escrow',category:'Conta e proteção',headline:'Cada operação.\nSuas próprias regras.',image:'conta-escrow',alt:'Executiva assinando o contrato de uma operação em reunião',
    description:'Uma conta para operações que exigem condições específicas de movimentação e proteção adicional na liberação de recursos.',
    introTitle:'Confiança também\né uma estrutura.',intro:'Em algumas negociações, o momento de liberar os recursos é tão importante quanto o valor. A conta escrow permite organizar essa movimentação conforme as condições definidas para a operação.',
    benefits:[['Condições definidas','Regras de liberação estabelecidas de acordo com os documentos da operação.'],['Recursos organizados','Uma estrutura dedicada à movimentação prevista para a negociação.'],['Orientação especializada','Apoio para entender a aplicabilidade da solução ao contexto da empresa.']],
    steps:[['Explique a negociação','Apresente as partes envolvidas e a finalidade da movimentação.'],['Defina as condições','A equipe orienta a documentação e as regras aplicáveis à conta.'],['Acompanhe a operação','Movimente os recursos conforme as condições formalizadas.']],
    faqs:[['Quando faz sentido usar uma conta escrow?','Quando a negociação exige condições específicas para a liberação de recursos entre as partes. A aplicação deve ser avaliada para cada operação.'],['Como são definidas as regras de liberação?','As regras são previstas na documentação da operação, conforme a estrutura acordada entre as partes.'],['Como conhecer os custos?','Solicite uma análise para receber uma proposta adequada à finalidade e às características da operação.']],related:['conta-digital-pj','operacoes-estruturadas'],
  },
  {
    slug:'securitizadora',name:'Estruturart Securitizadora',category:'Estruturação de capital',headline:'Recebíveis que abrem\nnovas possibilidades.',image:'securitizadora',alt:'Profissionais analisando os documentos de uma carteira de recebíveis',
    description:'Transforme carteiras de recebíveis em novas fontes de capital, com governança e segurança documental.',
    introTitle:'Uma nova perspectiva\npara sua carteira.',intro:'A securitização conecta ativos e uma estrutura financeira adequada às características da operação. O ponto de partida é entender a carteira, seus documentos e o objetivo da empresa.',
    benefits:[['Estrutura sob medida','Análise das características da carteira e da necessidade de capital.'],['Governança no processo','Organização das etapas e da documentação que sustentam a operação.'],['Capital com propósito','Uma alternativa a ser avaliada dentro do planejamento financeiro da empresa.']],
    steps:[['Conhecemos a carteira','A equipe avalia os recebíveis, sua origem e a finalidade da operação.'],['Estruturamos a proposta','Os documentos e as condições são organizados conforme o perfil da carteira.'],['Acompanhamos o processo','A empresa recebe orientação ao longo das etapas da estruturação.']],
    faqs:[['Toda carteira pode ser securitizada?','A viabilidade depende da análise dos recebíveis, da documentação e das características da operação.'],['Quais documentos são necessários?','Os requisitos são definidos durante a análise. A equipe informa a documentação adequada ao caso.'],['Securitização é a mesma coisa que antecipação?','São estruturas diferentes. A solução adequada depende da finalidade, da carteira e das condições da operação.']],related:['operacoes-estruturadas','antecipacao-de-recebiveis'],
  },
  {
    slug:'estruturart-pay',name:'Estruturart Pay',category:'Meios de pagamento',headline:'Cada venda conta.\nCada detalhe também.',image:'pay-terminal',alt:'Maquininha oficial Estruturart Pay com identidade laranja e teclado de pagamentos',
    description:'Máquinas próprias, condições ajustadas ao volume do negócio e informações de vendas em tempo real no aplicativo.',
    introTitle:'Da venda ao caixa.\nTudo mais próximo.',intro:'Seu negócio precisa vender, acompanhar os resultados e planejar os próximos passos. A Estruturart Pay conecta os meios de pagamento à estrutura financeira do grupo.',
    benefits:[['Venda com praticidade','Uma solução de pagamento para o atendimento do seu negócio.'],['Acompanhe em tempo real','Informações de vendas e movimentações pelo aplicativo.'],['Antecipe quando fizer sentido','Avalie a antecipação de vendas parceladas dentro da estrutura do grupo.']],
    steps:[['Conte como você vende','Informe o perfil do negócio e o volume aproximado de transações.'],['Conheça as condições','Receba uma proposta com os recursos e as condições da solução.'],['Acompanhe cada venda','Com a solução habilitada, consulte as informações pelo aplicativo.']],
    faqs:[['Quais formas de pagamento são aceitas?','Consulte a equipe para confirmar bandeiras e modalidades disponíveis na solução escolhida.'],['Existem custos de adesão ou mensalidade?','Os custos dependem da solução e das condições da proposta. Confirme os valores antes de contratar.'],['Posso antecipar vendas parceladas?','Sim. As possibilidades de antecipação são avaliadas conforme as condições e a análise da operação.']],related:['antecipacao-de-recebiveis','conta-digital-pj'],
  },
  {
    slug:'capital-de-giro',name:'Capital de giro',category:'Crédito para empresas',headline:'Fôlego para hoje.\nEspaço para crescer.',image:'capital-de-giro',alt:'Empreendedora conferindo pedidos no estoque da empresa',
    description:'Soluções para fortalecer o caixa, organizar o ciclo financeiro e atender às necessidades do seu negócio.',
    introTitle:'O próximo passo\ncomeça no caixa.',intro:'Entre pagar fornecedores, manter o estoque e receber pelas vendas, cada empresa tem seu próprio ciclo. Entender essa dinâmica é o primeiro passo para avaliar uma solução de capital de giro.',
    benefits:[['Rotina em equilíbrio','Recursos alinhados às necessidades do ciclo financeiro do negócio.'],['Oportunidades no radar','Avalie alternativas para apoiar o planejamento e a expansão da empresa.'],['Análise próxima','Orientação para comparar as condições adequadas ao porte da operação.']],
    steps:[['Mapeamos a necessidade','Compartilhe o objetivo, o perfil da empresa e o momento do caixa.'],['Avaliamos alternativas','A equipe analisa informações e possibilidades adequadas ao cenário.'],['Você decide o próximo passo','Confira custos, prazos e requisitos apresentados na proposta.']],
    faqs:[['Para que serve o capital de giro?','Para apoiar as necessidades da operação, como pagamentos, estoque e o equilíbrio entre entradas e saídas.'],['A aprovação é automática?','Não. As possibilidades dependem de análise e dos requisitos de cada solução.'],['Quais são as taxas e os prazos?','As condições variam conforme a análise e a modalidade. Solicite uma proposta para conhecer os detalhes.']],related:['fco-empresarial','antecipacao-de-recebiveis'],
  },
  {
    slug:'fco-empresarial',name:'FCO Empresarial',category:'Financiamento empresarial',headline:'Seu projeto merece\num próximo capítulo.',image:'fco-empresarial',alt:'Executivos de uma indústria analisando os documentos de um projeto',
    description:'Conheça as possibilidades do FCO Empresarial para projetos de indústria, infraestrutura, turismo, comércio e serviços.',
    introTitle:'Planejamento para\numa nova dimensão.',intro:'O programa oferece condições diferenciadas de financiamento. A viabilidade de cada projeto depende das regras vigentes, do enquadramento e da análise da operação.',
    benefits:[['Diversos setores','Possibilidades para indústria, infraestrutura, turismo, comércio e serviços.'],['Visão de longo prazo','Avalie condições e prazos dentro do planejamento de investimento da empresa.'],['Projeto bem estruturado','Orientação para compreender requisitos e organizar as informações do negócio.']],
    steps:[['Apresente o projeto','Informe o setor, a finalidade e as características do investimento.'],['Confira o enquadramento','A equipe orienta a verificação das regras e dos requisitos aplicáveis.'],['Organize a proposta','Reúna a documentação necessária para a análise do financiamento.']],
    faqs:[['Quais empresas podem participar?','O enquadramento depende das regras vigentes do programa e das características da empresa e do projeto.'],['As condições são iguais para todos os projetos?','Não. Prazos, taxas e requisitos dependem das regras aplicáveis e da análise da operação.'],['Por onde começar?','Apresente o projeto a um especialista para entender as possibilidades e os documentos necessários.']],related:['capital-de-giro','operacoes-estruturadas'],
  },
  {
    slug:'operacoes-estruturadas',name:'Operações estruturadas',category:'Soluções sob medida',headline:'Sua empresa é única.\nA estrutura também.',image:'operacoes-estruturadas',alt:'Especialistas discutindo uma estrutura financeira',
    description:'Uma visão integrada de recebíveis, documentação e necessidades de capital para desenhar o caminho da operação.',
    introTitle:'Antes da solução,\na compreensão.',intro:'Operações com características específicas pedem uma análise que vá além de um produto isolado. A estrutura parte do objetivo da empresa e conecta os recursos adequados a esse contexto.',
    benefits:[['Visão integrada','Análise do objetivo, da carteira e do momento financeiro da empresa.'],['Documentação organizada','Atenção aos documentos e às condições que sustentam a operação.'],['Acompanhamento próximo','Orientação especializada durante as etapas da estruturação.']],
    steps:[['Entendemos o cenário','Conhecemos a necessidade de capital e as particularidades da operação.'],['Conectamos possibilidades','Avaliamos os recursos e as estruturas aplicáveis ao objetivo.'],['Organizamos o caminho','Apresentamos as condições e as etapas para uma decisão informada.']],
    faqs:[['Existe uma estrutura padrão?','Não. A proposta depende do objetivo, da documentação e das características da operação.'],['Quais soluções podem ser consideradas?','As alternativas são avaliadas conforme o caso, podendo envolver recebíveis, securitização e recursos de conta.'],['Como solicitar uma análise?','Compartilhe as informações da empresa e descreva o objetivo para iniciar a conversa com a equipe.']],related:['securitizadora','conta-escrow'],
  },
]
export const findSolution = (slug: string) => solutions.find(item => item.slug === slug)
export const productNames = [...solutions.map(s => s.name), 'Estruturart Golden']
export const homeProductRoutes: Record<string,string> = {antecipacao:'antecipacao-de-recebiveis',conta:'conta-digital-pj',securitizadora:'securitizadora',pay:'estruturart-pay'}
export const homeServiceRoutes: Record<string,string> = {'Capital de giro':'capital-de-giro','FCO Empresarial':'fco-empresarial','Conta Escrow':'conta-escrow','Operações estruturadas':'operacoes-estruturadas'}
export const extraRoutes = ['servicos','golden','quem-somos','nossa-historia','premiacoes','na-midia','contato','acesso','politica-de-privacidade','termos-de-uso']
export const allPaths = ['/',...solutions.map(s => '/'+s.slug),...extraRoutes.map(s => '/'+s)]
export const routeMeta: Record<string,{title:string;description:string}> = {
 '/':{title:'Estruturart — Soluções financeiras para sua empresa',description:'Antecipação de recebíveis, conta digital PJ, securitização e meios de pagamento em uma única estrutura.'},
 ...Object.fromEntries(solutions.map(s=>['/'+s.slug,{title:s.name+' | Estruturart',description:s.description}])),
 '/servicos':{title:'Soluções para empresas | Estruturart',description:'Conheça as soluções de capital, recebíveis, conta digital e meios de pagamento da Estruturart.'},
 '/golden':{title:'Estruturart Golden | O ativo digital do grupo',description:'Conheça a frente de ativos digitais do ecossistema Estruturart.'},
 '/quem-somos':{title:'Quem somos | Estruturart',description:'Conheça o grupo Estruturart e a trajetória iniciada em 2000.'},
 '/nossa-historia':{title:'Nossa história | Estruturart',description:'Uma trajetória iniciada em 2000, antes da transformação digital da rotina financeira.'},
 '/premiacoes':{title:'Premiações | Estruturart',description:'Espaço dedicado ao reconhecimento e à trajetória da Estruturart.'},
 '/na-midia':{title:'Estruturart na mídia',description:'Espaço dedicado a notícias, entrevistas e conteúdos sobre a Estruturart.'},
 '/contato':{title:'Fale com um especialista | Estruturart',description:'Conheça os canais de atendimento e conte sobre as necessidades da sua empresa.'},
 '/acesso':{title:'Acessar plataforma | Estruturart',description:'Encontre as áreas de acesso de conta digital, antecipação e Estruturart Pay.'},
 '/politica-de-privacidade':{title:'Política de Privacidade | Estruturart',description:'Informações sobre dados, navegação e privacidade nesta versão do site.'},
 '/termos-de-uso':{title:'Termos de Uso | Estruturart',description:'Conheça a finalidade e os limites desta versão do site institucional.'},
}
