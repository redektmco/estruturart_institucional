# Estruturart — site institucional

Implementação em React, TypeScript e Vite baseada no arquivo `DESKTOP.pdf` fornecido pelo usuário, com a escala revisada a partir das referências do Inter e do Itaú Personnalité: textos de 14 a 17px, títulos de seção de 28 a 46px e um único grid de 1240px. O layout mobile adapta a composição desktop, pois não foi fornecido um frame mobile.

## Imagens e fonte

Todas as imagens ficam em WebP em `public/images`.

- `hero.webp`: foto original da campanha, com a modelo de óculos finos, argolas e blazer segurando o cartão Estruturart Capital, restaurada no primeiro banner.
- `hero-celular.webp` e `hero-cartao.webp`: artes fornecidas em `pictures`, convertidas para WebP para os banners de conta digital no celular e cartão no bolso.
- As variantes `hero-modelo-mobile.webp`, `hero-celular-mobile.webp` e `hero-cartao-mobile.webp` usam recortes próprios de 960 × 800 px, preservando os produtos inteiros. Até 760 px, o hero seleciona essas imagens com `<picture>` e coloca a foto acima da copy; no desktop, as artes são exibidas inteiras, alinhadas à direita, com o texto à esquerda.
- `founder.webp`, `app.webp` e `logo.webp`: extraídas do PDF original. `logo-light.webp` é a versão do logo para fundos escuros, gerada a partir de `logo.webp`.
- `recebiveis`, `capital-de-giro`, `fco-empresarial`, `conta`, `conta-escrow`, `securitizadora`, `operacoes-estruturadas`, `pay`, `app-detail`, `historia` e `golden`: fotos reais (sem IA) do banco Freepik, baixadas pela conta Premium da agência, recortadas em 4:3 e com tratamento de cor leve e uniforme.

A fonte Inter é servida pelo próprio site via `@fontsource-variable/inter`, sem depender de serviços externos.

## Desenvolvimento

Requer Node.js 24 e npm 11.

```sh
cd /workspace/estruturart_institucional
npm ci --cache /workspace/.npm-cache --no-audit --no-fund
npm run dev -- --host 0.0.0.0 --port 5173 --strictPort
```

## Validação e produção

```sh
npm run lint
npm run build
npm run preview -- --host 0.0.0.0 --port 4173 --strictPort
```

O build é gerado em `dist/` e pode ser servido como site estático. Não são necessários backend, banco de dados ou segredos para esta versão.

## Comportamento

- Navegação por âncoras e menu mobile com estado acessível.
- Detalhes dos produtos em modal com fechamento por Escape, clique fora e botão.
- Carrossel de serviços e FAQ expansível.
- Formulário com campos obrigatórios, validação de email e formato de CNPJ, e seleção do produto a partir dos CTAs.
- Nenhum dado do formulário é enviado ou armazenado; o sucesso da validação informa explicitamente que se trata de uma demonstração.
- Links externos, redes sociais, dados de contato e documentos legais permanecem como placeholders, conforme solicitado. Não há URLs ou credenciais fictícias.

## Antes da publicação comercial

Substituir os placeholders pelos links e contatos oficiais, aprovar os textos institucionais, os documentos legais e as respostas do FAQ; integrar o formulário ao serviço de atendimento com política de privacidade adequada. A validação de CNPJ atual verifica apenas o formato, sem consulta cadastral ou cálculo dos dígitos verificadores.

## Referência

Figma: https://www.figma.com/design/f4gpYefn50GMr2OY8zESVZ/ESTRUART-SITE?node-id=181-368

A referência visual utilizada na implementação é o PDF desktop enviado no chat.

## Deploy na Vercel

A configuração `vercel.json` define o framework Vite, instalação com `npm ci`, build com `npm run build` e saída em `dist`. O arquivo `.vercelignore` exclui dependências locais, saída gerada, metadados Git e arquivos de variáveis do upload.

O deploy a partir do ambiente em nuvem exige acesso HTTPS a `api.vercel.com` e autenticação da Vercel. Configure `VERCEL_TOKEN` como segredo nas configurações do ambiente, nunca no código ou no chat. A credencial é exclusiva do processo de publicação; o site não precisa dela em runtime.

O projeto ainda contém os placeholders solicitados e o formulário demonstrativo. Publicar o site não ativa o envio de contatos.

No sandbox, a CLI da Vercel deve usar diretórios graváveis via `XDG_DATA_HOME=/workspace/.vercel-cli/data`, `XDG_CACHE_HOME=/workspace/.vercel-cli/cache` e `XDG_CONFIG_HOME=/workspace/.vercel-cli/config`, preservando o diretório pessoal do sistema. CLI instalada e verificada: Vercel 64.5.0. O estado de autenticação verificado foi desconectado.

## Publicação atual

Site: https://estruturart-institucional.vercel.app

Projeto Vercel: `estruturart-institucional`, vinculado ao repositório `redektmco/estruturart_institucional`. Os pushes na branch `main` acionam o deploy de produção automaticamente na Vercel. A configuração local de vínculo fica em `.vercel/project.json` (ignorada pelo Git). As publicações iniciais foram feitas via API; para atualizações atuais, use o fluxo automático pelo GitHub.

## Animações

A camada `src/useSiteMotion.ts` usa IntersectionObserver e Web Animations API para entradas com blur, fade e stagger. `src/motion.css` reúne microinterações, flutuação das ilustrações, brilho dos cards e resposta 3D ao cursor. O carrossel anima a saída e a entrada dos cards, sem avanço automático. Não há novas dependências ou wrappers de layout. Os efeitos respeitam `prefers-reduced-motion`, inclusive quando a preferência muda com a página aberta; elementos são revelados ao receber foco. Animações contínuas das ilustrações pausam fora da tela.

O hero usa `src/components/HeroCarousel.tsx`, com moldura retangular arredondada e três slides: exclusividade dos cartões, experiência digital no celular e praticidade do cartão no bolso. Cada arte possui título, descrição e CTA próprios. A troca automática ocorre a cada oito segundos, com pausa explícita, setas e seleção direta por indicadores. O avanço também pausa durante hover, foco nos controles e quando a aba fica oculta. A preferência por movimento reduzido inicia o carrossel pausado. As chamadas levam, na ordem, à seção Soluções, ao contato com Conta Digital PJ selecionada e à página Quem somos. As três imagens são carregadas antecipadamente para estarem disponíveis ao trocar de slide.

## Páginas internas

A aplicação usa React Router e mantém o layout compartilhado de cabeçalho e rodapé. As rotas são:

- `/`: início.
- `/estruturart-pay`, `/antecipacao-de-recebiveis`, `/conta-digital-pj`, `/conta-escrow`, `/securitizadora`, `/capital-de-giro`, `/fco-empresarial`, `/operacoes-estruturadas`: páginas próprias de soluções.
- `/servicos`, `/golden`: catálogo e apresentação da Golden.
- `/quem-somos`, `/nossa-historia`, `/premiacoes`, `/na-midia`: institucional.
- `/contato`, `/acesso`: contato e orientação sobre plataformas.
- `/politica-de-privacidade`, `/termos-de-uso`: documentos da versão demonstrativa.

`src/data/pages.ts` centraliza conteúdo e metadados. Cada solução possui descrição, benefícios, etapas, perguntas frequentes e indicações relacionadas próprias. Os links da home agora abrem as páginas correspondentes. A escolha de produto é transmitida ao contato por query string.

O build executa `scripts/generate-pages.mjs` com Node.js 24, gerando um `index.html` por rota, com título, descrição, canonical e Open Graph próprios; também gera sitemap, robots e documento 404. Os documentos gerados carregam a aplicação React; não são prerenderização do conteúdo do corpo. Não remova essa etapa ao publicar os arquivos estáticos, pois ela permite abrir e recarregar cada rota diretamente.

### Referências e pendências editoriais

O usuário solicitou o uso de `estruturart.com.br` e `estruturartcapital.com.br` como referências. O proxy de rede retornou HTTP 403 para ambos, inclusive os domínios com www. A liberação foi salva no rascunho do ambiente, mas o acesso ainda não estava efetivo durante a implementação inicial das páginas.

Até a consulta dos sites ser possível, os conteúdos das soluções partem do PDF e dos materiais já aprovados no chat. O inventário de páginas das referências ainda não foi confirmado. Não foram inventados prêmios, notícias, números de clientes, nomes de instituições parceiras, taxas ou prazos. Premiações e mídia possuem páginas prontas visualmente, com estado editorial “em atualização”. Contatos, URLs de plataformas e site dedicado da Golden seguem como placeholders conforme orientação anterior do usuário. As páginas legais descrevem a versão demonstrativa; não substituem documentos oficiais.

## Contatos oficiais

Os dados fornecidos pelo usuário estão centralizados em `src/data/contact.ts` e são compartilhados pelo rodapé e pela página de contato. Email: estruturart@estruturart.com.br. Telefone: (31) 3995-3906. Endereço: Rua Paraíba, 550 - 9° andar - Savassi - Belo Horizonte/MG. Atendimento: segunda a sexta, das 8h às 18h. Email e telefone têm links de ação. O formulário continua demonstrativo; não foi solicitada integração de envio.

## Materiais oficiais recebidos via Dropbox

O arquivo original da pasta compartilhada foi baixado integralmente para `/workspace/dropbox-estruturart/originais.zip` (cerca de 220 MB); os arquivos extraídos ficam fora do checkout, em `/workspace/dropbox-estruturart/extraidos`. O ZIP contém versões de logotipos, peças editáveis, fotos de cartão e maquininhas, imagens da Golden e capturas do aplicativo.

O site usa oito versões otimizadas em WebP desses materiais, totalizando aproximadamente 872 KiB, em `public/images`. A origem, os hashes e as dimensões estão registrados em `docs/brand-media.json`. Não são enviados ao site os arquivos editáveis, ZIPs aninhados, metadados do macOS e duplicatas de exportação.

- **Conta Digital PJ:** foto do cartão Estruturart Capital na home e na página da solução, com recorte que preserva o cartão inteiro.
- **Estruturart Pay:** foto dos equipamentos na home, visual oficial do terminal no topo da página e galeria com as fotos do presskit.
- **Aplicativo:** capturas oficiais de acesso e da conta dentro de molduras responsivas na home e nas páginas de Conta Digital PJ e Pay. Valores e identificadores da conta já estão ocultados nas imagens originais; essa ocultação foi preservada. A captura do painel desktop não foi publicada.
- **Golden:** imagens com a identidade Estruturart Golden na home, no destaque da página e em uma galeria de detalhes.

Os banners do hero, as imagens das outras soluções e o layout aprovado foram preservados. Os originais permanecem disponíveis na máquina; apenas os arquivos otimizados e o manifesto de origem entram no repositório.
