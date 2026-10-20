import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ContactSection } from './components/ContactSection'
import { homeProductRoutes, homeServiceRoutes } from './data/pages'
import './App.css'
import './motion.css'

const image = (name: string) => `/images/${name}.webp`
const products = [
  { id: 'antecipacao', name: 'Antecipação de Recebíveis', description: 'O valor das vendas no cartão ou em duplicatas, disponível antes do vencimento. Capital de giro sem contratar dívida.', image: 'recebiveis', alt: 'Empresário organizando as finanças com calculadora e notebook', detail: 'Transforme suas vendas a prazo em recursos para o presente. Conheça as possibilidades de antecipação de recebíveis de cartão e duplicatas, de acordo com o perfil da sua empresa.' },
  { id: 'conta', name: 'Conta Digital PJ', description: 'Pix, transferências, pagamentos e extratos em uma única plataforma. Inclui conta escrow para operações que exigem proteção adicional.', image: 'conta', alt: 'Empresária consultando o celular em seu estabelecimento', detail: 'Centralize a movimentação financeira da sua empresa. Consulte nossa equipe sobre a conta digital PJ e a conta escrow, destinada a operações com condições específicas de liberação de recursos.' },
  { id: 'securitizadora', name: 'Estruturart Securitizadora', description: 'Operações estruturadas que convertem carteiras de recebíveis em novas fontes de capital, com governança e segurança documental.', image: 'securitizadora', alt: 'Empresários analisando uma operação financeira em uma reunião', detail: 'Uma estrutura para conectar sua carteira de recebíveis a novas possibilidades de capital. Nossa equipe orienta a análise da carteira, a documentação e a estruturação da operação.' },
  { id: 'pay', name: 'Estruturart Pay', description: 'Máquinas próprias, taxas ajustadas ao volume do negócio e acompanhamento das vendas em tempo real pelo aplicativo.', image: 'pay', alt: 'Cliente fazendo um pagamento por aproximação na maquininha', detail: 'Acompanhe suas vendas e movimentações em uma única experiência. Solicite uma proposta para conhecer as condições das máquinas e os recursos disponíveis para o seu negócio.' },
]
const services = [
  { name: 'Capital de giro', text: 'Oferecemos as melhores opções de Capital de Giro para fortalecer o caixa, impulsionar o crescimento e atender às necessidades do seu negócio.' },
  { name: 'FCO Empresarial', text: 'Com taxas reduzidas, prazos estendidos e condições diferenciadas, o programa atende os setores de indústria, infraestrutura, turismo, comércio e serviços.' },
  { name: 'Conta Escrow', text: 'Proteção adicional para operações que precisam de uma conta com condições específicas para a movimentação e liberação dos recursos.' },
  { name: 'Operações estruturadas', text: 'Soluções que conectam a carteira de recebíveis da sua empresa a novas fontes de capital, com governança e segurança documental.' },
]
const faqs = [
  ['Como falo com um especialista?', 'Preencha o formulário de contato com as informações da sua empresa e o produto de interesse. Nesta versão demonstrativa, o envio ainda não está disponível.'],
  ['Quais formas de pagamento a maquininha aceita?', 'Consulte nossa equipe para confirmar as bandeiras, modalidades e meios de pagamento disponíveis na solução escolhida.'],
  ['Em quanto tempo o valor das vendas entra na conta?', 'O prazo depende da modalidade de venda e das condições contratadas. Os prazos aplicáveis serão informados na sua proposta.'],
  ['Quais são as taxas?', 'As condições são ajustadas ao volume e ao perfil da operação. Solicite uma proposta para conhecer as taxas aplicáveis à sua empresa.'],
  ['Posso antecipar as vendas parceladas?', 'Sim. As vendas parceladas podem ser antecipadas dentro da estrutura do grupo, mediante análise e condições da operação.'],
  ['A maquininha tem custo de adesão ou mensalidade?', 'Os custos dependem da solução e das condições da proposta. Consulte nossa equipe para confirmar valores antes da contratação.'],
  ['Que tipos de recebíveis posso antecipar?', 'O grupo trabalha com recebíveis de vendas no cartão e duplicatas. A elegibilidade da carteira é avaliada conforme o perfil da operação.'],
  ['Como funciona a análise?', 'A equipe avalia as informações da empresa, os documentos e as características dos recebíveis para definir uma estrutura adequada ao negócio.'],
  ['Quanto custa a operação?', 'O custo varia conforme a modalidade, o prazo e as características da operação. Os valores e condições são apresentados na proposta, antes da contratação.'],
]
function Arrow() { return <span className="arrow" aria-hidden="true">→</span> }
function CTA({ children, href = '/contato', onClick, light = false }: { children: React.ReactNode, href?: string, onClick?: () => void, light?: boolean }) {
  return <Link className={`cta${light ? ' cta-light' : ''}`} to={href} onClick={onClick}>{children}<Arrow /></Link>
}
function HomePage() {
  const [servicePage, setServicePage] = useState(0)
  const [serviceChanging, setServiceChanging] = useState(false)
  const serviceStage = useRef<HTMLDivElement>(null)
  async function changeServicePage(next: number) {
    if (next === servicePage || serviceChanging) return
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { setServicePage(next); return }
    setServiceChanging(true)
    const cards = [...(serviceStage.current?.querySelectorAll<HTMLElement>('.service-card') || [])]
    const exits = cards.map((card, index) => card.animate([
      { opacity: 1, filter: 'blur(0px)', transform: 'translate3d(0,0,0) scale(1)' },
      { opacity: 0, filter: 'blur(10px)', transform: 'translate3d(0,-24px,0) scale(.96)' },
    ], { duration: 280, delay: index * 65, easing: 'cubic-bezier(.4,0,1,1)', fill: 'forwards' }))
    await Promise.all(exits.map(animation => animation.finished.catch(() => {})))
    setServicePage(next)
    setServiceChanging(false)
    requestAnimationFrame(() => exits.forEach(animation => animation.cancel()))
  }
  return <>
    <main id="principal">
      <section className="hero content" id="inicio" aria-labelledby="hero-title">
        <div className="hero-art"><img src={image('cards')} alt="Cartões Estruturart Capital em preto e laranja" width="855" height="968" fetchPriority="high" /></div>
        <div className="hero-copy"><h1 id="hero-title">Estruturart Pay</h1><p>Antecipação de recebíveis, conta digital PJ, securitização e meios de pagamento próprios, reunidos sob a mesma governança.</p><CTA href="/quem-somos">Conhecer o grupo</CTA></div>
      </section>
      <div className="products content">
        {products.map((p, i) => <section className={`product ${i % 2 ? 'reverse' : ''}`} id={p.id} key={p.id} aria-labelledby={`${p.id}-title`}>
          <div className="product-copy"><h2 id={`${p.id}-title`}>{p.name}</h2><p>{p.description}</p><CTA href={`/${homeProductRoutes[p.id]}`}>Ver mais</CTA></div>
          <img className="product-image" src={image(p.image)} alt={p.alt} width="760" height="428" loading="lazy" />
        </section>)}
      </div>
      <section className="golden wide" id="golden" aria-labelledby="golden-title">
        <img src={image('golden')} alt="Moedas douradas do ativo digital Golden" width="680" height="382" loading="lazy" />
        <h2 id="golden-title">Estruturart Golden</h2><p>O ativo digital do grupo tem site próprio.</p>
        <CTA href="/golden">Conhecer a Golden</CTA>
      </section>
      <section className="services wide" id="servicos" aria-labelledby="services-title">
        <h2 id="services-title">Nossos<br />serviços</h2>
        <div className="services-body"><div className="service-cards" ref={serviceStage} aria-live="polite" aria-busy={serviceChanging}>
          {services.slice(servicePage * 2, servicePage * 2 + 2).map(s => <article className="service-card" key={s.name}><h3>{s.name}</h3><p>{s.text}</p><CTA light href={`/${homeServiceRoutes[s.name]}`}>Ver mais</CTA></article>)}
        </div><div className="slider-controls" aria-label="Páginas de serviços">{[0, 1].map(n => <button key={n} className={servicePage === n ? 'active' : ''} aria-label={`Mostrar serviços ${n * 2 + 1} e ${n * 2 + 2}`} aria-pressed={servicePage === n} disabled={serviceChanging} onClick={() => void changeServicePage(n)} />)}</div></div>
      </section>
      <section className="history content" id="historia" aria-labelledby="history-title">
        <div><h2 id="history-title">Uma história que<br />começou antes<br />do digital.</h2><p>A Estruturart foi fundada em 2000 e construiu, ao longo de 26 anos, uma base de clientes, premiações e presença na imprensa. Essa trajetória sustenta cada operação que o grupo estrutura hoje.</p></div>
        <div className="founder"><div className="founder-orange" /><div className="founder-black" /><img src={image('founder')} alt="Representante da Estruturart, de braços cruzados, usando um terno azul" width="1086" height="1448" loading="lazy" /></div>
      </section>
      <section className="app-section content" aria-labelledby="app-title">
        <div className="app-art"><img className="phones" src={image('app')} alt="Aplicativo Estruturart em dois celulares" width="1055" height="1491" loading="lazy" /><img className="coin" src={image('coin')} alt="" width="180" height="180" loading="lazy" /><span className="app-tag tag-info"><span aria-hidden="true">◷</span> Informação na hora</span><span className="app-tag tag-tap"><img src="/images/tap.svg" alt="" />Antecipação a um toque</span></div>
        <div className="app-copy"><h2 id="app-title">A operação<br />inteira na<br />palma da mão.</h2><CTA href="/contato?produto=Estruturart%20Pay">Solicitar condições</CTA></div>
      </section>
      <section className="benefits content" aria-label="Vantagens do aplicativo">
        <div className="benefits-list">{[
          ['Venda registrada, informação na hora', 'Cada transação aparece no aplicativo em tempo real, com relatórios completos de vendas e movimentações.'],
          ['Antecipação a um toque', 'As vendas parceladas podem ser antecipadas dentro da própria estrutura do grupo, sem intermediários.'],
          ['Condições ajustadas ao seu volume', 'Taxas definidas conforme o porte da operação, com atendimento especializado do início ao fim.'],
        ].map(([title, text], i) => <article key={title}><span className="benefit-number">0{i + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
        <img className="benefits-image" src={image('app-detail')} alt="Cliente acompanhando sua operação no aplicativo Estruturart" width="1374" height="1145" loading="lazy" />
      </section>
      <ContactSection />
      <section className="faq dark" id="faq" aria-labelledby="faq-title"><div className="wide"><h2 id="faq-title">FAQ</h2><div className="faq-list">{faqs.map(([q, a]) => <details key={q}><summary>{q}<span className="faq-toggle" aria-hidden="true">+</span></summary><p>{a}</p></details>)}</div></div></section>
    </main>

  </>
}
export default HomePage
