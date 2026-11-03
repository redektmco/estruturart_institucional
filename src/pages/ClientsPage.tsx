import { clients } from '../data/clients'
import { Breadcrumb, ClosingCTA, PageLead } from '../components/UI'

export function ClientsPage() {
  return <main id="principal" className="inner-page clients-page">
    <div className="wide"><Breadcrumb current="Clientes"/></div>
    <section className="editorial-hero content">
      <PageLead label="Clientes Estruturart" title={'Relações que constroem\na nossa história.'} description="Cada empresa traz um contexto, um desafio e um próximo passo. Conheça algumas das marcas que fazem parte da trajetória da Estruturart Capital."/>
    </section>
    <section className="clients-section wide" aria-labelledby="client-references-title">
      <div className="section-heading"><span className="eyebrow">Experiência compartilhada</span><h2 id="client-references-title">Empresas de diferentes setores.<br/>Uma trajetória de confiança.</h2></div>
      <ul className="clients-grid">{clients.map(client => <li key={client.image}><img src={client.image} alt={client.name} width="200" height="110" loading="lazy"/></li>)}</ul>
    </section>
    <ClosingCTA/>
  </main>
}
