import { SocialIcon } from './Icons'
import { image } from '../data/assets'
import { useLayoutEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { Arrow } from './UI'
import { useSiteMotion } from '../useSiteMotion'
import { routeMeta } from '../data/pages'

const nav = [['/estruturart-pay','Estruturart Pay'],['/conta-digital-pj','Conta Digital PJ'],['/servicos','Serviços'],['/antecipacao-de-recebiveis','Antecipação de Recebíveis'],['/securitizadora','Securitizadora'],['/golden','Golden'],['/quem-somos','Quem Somos']]
export function Header() {
  const [menu,setMenu]=useState(false)
  const location=useLocation()
  return <><a className="skip-link" href="#principal">Pular para o conteúdo</a><header className="header">
    <Link to="/" className="brand" aria-label="Estruturart — início" onClick={()=>setMenu(false)}><img src={image('logo')} alt="Estruturart Capital" width="132" height="44"/></Link>
    <button className="menu-toggle" aria-expanded={menu} aria-controls="navigation" onClick={()=>setMenu(!menu)} aria-label={menu?'Fechar menu':'Abrir menu'}>{menu?'✕':'☰'}</button>
    <nav id="navigation" aria-label="Navegação principal" className={menu?'navigation is-open':'navigation'} onClick={()=>setMenu(false)} key={location.pathname}>{nav.map(([to,label])=><NavLink key={to} to={to}>{label}</NavLink>)}</nav>
    <Link className="platform" to="/acesso" onClick={()=>setMenu(false)}>Acessar Plataforma<Arrow/></Link>
  </header></>
}
export function Footer() {
  return <footer className="footer dark"><div className="wide"><div className="footer-columns">
    <div><h2>Institucional</h2><Link to="/quem-somos">Quem Somos</Link><Link to="/nossa-historia">Nossa História</Link><Link to="/premiacoes">Premiações</Link><Link to="/na-midia">Estruturart na Mídia</Link></div>
    <div><h2>Produtos</h2><Link to="/antecipacao-de-recebiveis">Antecipação de Recebíveis</Link><Link to="/conta-digital-pj">Conta Digital PJ</Link><Link to="/conta-escrow">Conta Escrow</Link><Link to="/securitizadora">Estruturart Securitizadora</Link><Link to="/estruturart-pay">Estruturart Pay</Link><Link to="/golden">Estruturart Golden</Link></div>
    <div><h2>Acesso</h2><Link to="/acesso#conta">Acessar Conta</Link><Link to="/acesso#antecipacao">Plataforma de Antecipação</Link><Link to="/acesso#pay">Plataforma Estruturart Pay</Link><Link to="/contato">Fale com um especialista</Link></div>
    <div className="footer-contact"><h2>Contato</h2><p>[E-mail comercial — confirmar]</p><p>[Telefone / WhatsApp — confirmar]</p><p>[Endereço completo — confirmar]</p><p>Horário de atendimento: [confirmar]</p></div>
  </div><div className="footer-brand"><Link to="/" aria-label="Voltar ao início"><img src={image('logo-light')} alt="Estruturart Capital" width="132" height="44"/></Link><div className="socials" aria-label="Redes sociais">{['X','Instagram','YouTube','LinkedIn','Facebook'].map((s,i)=><Link to={`/contato?canal=${s.toLowerCase()}`} key={s} aria-label={`${s} — canal em breve`}><SocialIcon index={i}/></Link>)}</div></div><div className="footer-bottom"><p>© 2026 Estruturart. Todos os direitos reservados.</p><Link to="/politica-de-privacidade">Política de Privacidade</Link><span aria-hidden="true">|</span><Link to="/termos-de-uso">Termos de Uso</Link></div></div></footer>
}
function RouteEffects() {
  const {pathname,hash}=useLocation()
  useSiteMotion(pathname)
  useLayoutEffect(()=>{
    const meta=routeMeta[pathname.replace(/\/$/,'')||'/']||{title:'Página não encontrada | Estruturart',description:'Este endereço não está disponível.'}
    document.title=meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content',meta.description)
    for(const [property,content] of [['og:title',meta.title],['og:description',meta.description],['og:url','https://estruturart-institucional.vercel.app'+pathname]]) document.querySelector(`meta[property="${property}"]`)?.setAttribute('content',content)
    const canonical=document.querySelector('link[rel="canonical"]')||document.head.appendChild(Object.assign(document.createElement('link'),{rel:'canonical'}))
    canonical.setAttribute('href','https://estruturart-institucional.vercel.app'+(pathname.replace(/\/$/,'')||'/'))
    if(hash){let id=hash.slice(1);try{id=decodeURIComponent(id)}catch{/* Preserve malformed fragments without interrupting navigation. */}requestAnimationFrame(()=>document.getElementById(id)?.scrollIntoView({behavior:'instant'}))}
    else window.scrollTo({top:0,behavior:'instant'})
    const heading=document.querySelector<HTMLElement>('main h1')
    if(heading&&!hash){const main=document.querySelector('main');if(main){if(!heading.id)heading.id='page-title';main.setAttribute('aria-labelledby',heading.id);main.tabIndex=-1;main.focus({preventScroll:true})}}
  },[pathname,hash])
  return null
}
export function SiteLayout() {
  const location=useLocation()
  return <><Header key={location.pathname}/><Outlet/><Footer/><RouteEffects/></>
}
