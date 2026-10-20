import { DiagonalArrow } from '../components/Icons'
import { solutions } from '../data/pages'
import { Breadcrumb, ButtonLink, ClosingCTA, PageLead } from '../components/UI'
export function ServicesPage(){
 return <main id="principal" className="inner-page"><div className="wide"><Breadcrumb current="Soluções"/></div><section className="catalog-hero wide"><PageLead label="Soluções Estruturart" title={'O seu próximo passo.\nA nossa estrutura.'} description="Do recebimento de uma venda ao planejamento de um novo investimento. Conheça as soluções que conectam a operação financeira da sua empresa."/><span className="catalog-mark"><DiagonalArrow/></span></section><section className="catalog wide" aria-label="Todas as soluções">{solutions.map((s,i)=><article className="catalog-card service-card" key={s.slug}><span className="feature-index">{String(i+1).padStart(2,'0')}<span>{s.category}</span></span><h2>{s.name}</h2><p>{s.description}</p><ButtonLink to={'/'+s.slug} light>Conhecer solução</ButtonLink></article>)}</section><ClosingCTA/></main>
}
