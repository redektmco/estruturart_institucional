import { AppScreens } from '../components/AppScreens'
import { BrandGallery } from '../components/BrandGallery'
import { DiagonalArrow } from '../components/Icons'
import { image } from '../data/assets'
import { Link } from 'react-router-dom'
import type { Solution } from '../data/pages'
import { findSolution } from '../data/pages'
import { Breadcrumb, ButtonLink, ClosingCTA, FAQ, PageLead } from '../components/UI'
export function SolutionPage({ solution:s }: {solution:Solution}) {
  return <main id="principal" className="inner-page solution-page">
    <div className="wide"><Breadcrumb current={s.name} parent={{name:'Soluções',to:'/servicos'}}/></div>
    <section className="inner-hero wide"><PageLead label={s.category} title={s.headline} description={s.description}><ButtonLink to={`/contato?produto=${encodeURIComponent(s.name)}`}>Solicitar condições</ButtonLink><a className="text-link" href="#como-funciona">Entenda como funciona <span aria-hidden="true">↓</span></a></PageLead><div className={`inner-visual visual-${s.slug}`}><img src={image(s.image)} alt={s.alt} width="1280" height="960" fetchPriority="high"/><span className="image-caption"><span className="status-dot"/>{s.name}</span></div></section>
    <section className="split-intro content"><div><span className="eyebrow">Pensado para o seu negócio</span><h2>{s.introTitle}</h2></div><p>{s.intro}</p></section>
    <section className="feature-section wide" aria-label={`Vantagens de ${s.name}`}><div className="feature-grid">{s.benefits.map(([title,text],i)=><article className="service-card feature-card" key={title}><span className="feature-index">0{i+1}<DiagonalArrow/></span><h3>{title}</h3><p>{text}</p></article>)}</div></section>
    <section className="how-section content" id="como-funciona"><div className="section-heading"><span className="eyebrow">Do primeiro contato ao próximo passo</span><h2>Um caminho claro.<br/>Do início ao fim.</h2></div><ol className="step-list">{s.steps.map(([title,text],i)=><li key={title}><span className="step-number">0{i+1}</span><div><h3>{title}</h3><p>{text}</p></div><span className="step-arrow"><DiagonalArrow/></span></li>)}</ol><p className="conditions-note">Disponibilidade, requisitos, custos e prazos estão sujeitos à análise e às condições da operação. Consulte a proposta antes de contratar.</p></section>
    <section className="solution-bridge wide"><div className="bridge-image">{['estruturart-pay','conta-digital-pj'].includes(s.slug)?<AppScreens compact/>:<img src={image('historia')} alt="Assessores conversando com clientes sobre o planejamento financeiro" width="1600" height="1067" loading="lazy"/>}</div><div><span className="eyebrow">Uma estrutura. Mais possibilidades.</span><h2>Seu negócio não<br/>para em um produto.</h2><p>Conheça outras soluções do grupo e encontre a combinação que acompanha o momento da sua empresa.</p><div className="related-links">{s.related.map(slug=>{const related=findSolution(slug);return related&&<Link to={'/'+slug} key={slug}>{related.name}<DiagonalArrow/></Link>})}</div></div></section>
    {s.slug==='estruturart-pay'&&<BrandGallery kind="pay"/>}
    <ClosingCTA name={s.name}/><FAQ items={s.faqs}/>
  </main>
}
