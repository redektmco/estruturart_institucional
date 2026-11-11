import { contact } from '../data/contact'
import { SocialIcon } from './Icons'
import { image } from '../data/assets'
import { useLayoutEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { Arrow } from './UI'
import { useSiteMotion } from '../useSiteMotion'
import { routeMeta } from '../data/pages'
import { links } from '../data/links'

const nav = [['/estruturart-pay','Estruturart Pay'],['/conta-digital-pj','Conta Digital PJ'],['/servicos','Serviços'],['/antecipacao-de-recebiveis','Antecipação de Recebíveis'],['/securitizadora','Securitizadora'],['/golden','Estruturart Golden'],['/quem-somos','Quem Somos'],['/clientes','Clientes'],['/premiacoes','Premiações']]
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
    <div><h2>Institucional</h2><Link to="/quem-somos">Quem Somos</Link><Link to="/clientes">Clientes</Link><Link to="/nossa-historia">Nossa História</Link><Link to="/premiacoes">Premiações</Link><Link to="/na-midia">Estruturart na Mídia</Link><a href={links.privacy} target="_blank" rel="noopener noreferrer">Política de Privacidade</a><a href={links.terms} target="_blank" rel="noopener noreferrer">Termo de Uso</a></div>
    <div><h2>Produtos</h2><Link to="/antecipacao-de-recebiveis">Antecipação de Recebíveis</Link><Link to="/conta-digital-pj">Conta Digital PJ</Link><Link to="/conta-escrow">Conta Escrow</Link><Link to="/securitizadora">Estruturart Securitizadora</Link><Link to="/estruturart-pay">Estruturart Pay</Link><Link to="/golden">Estruturart Golden</Link></div>
    <div><h2>Acesso</h2><Link to="/acesso#conta">Acessar Conta</Link><Link to="/acesso#antecipacao">Plataforma de Antecipação</Link><Link to="/acesso#pay">Plataforma Estruturart Pay</Link><Link to="/contato">Fale com um especialista</Link></div>
    <div className="footer-contact"><h2>Contato</h2><a href={`mailto:${contact.email}`}>{contact.email}</a><a href={contact.phoneHref}>{contact.phone}</a><a href={contact.whatsappHref} target="_blank" rel="noopener noreferrer">WhatsApp</a><p>{contact.address}</p><p>Horário de atendimento: {contact.hours}</p></div>
  </div><div className="footer-brand"><Link to="/" aria-label="Voltar ao início"><img src={image('logo-light')} alt="Estruturart Capital" width="132" height="44"/></Link><div className="socials" aria-label="Redes sociais">{['X','Instagram','YouTube','LinkedIn','Facebook'].map((s,i)=><Link to={`/contato?canal=${s.toLowerCase()}`} key={s} aria-label={`${s} — canal em breve`}><SocialIcon index={i}/></Link>)}</div></div><div className="footer-bottom"><p>© 2026 Estruturart. Todos os direitos reservados.</p><a href={links.privacy} target="_blank" rel="noopener noreferrer">Política de Privacidade</a><span aria-hidden="true">|</span><a href={links.terms} target="_blank" rel="noopener noreferrer">Termo de Uso</a></div></div></footer>
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
function WhatsAppButton() {
  return <a className="whatsapp-float" href={contact.whatsappHref} target="_blank" rel="noopener noreferrer" aria-label="Fale com a Estruturart pelo WhatsApp (abre em nova aba)"><svg width="30" height="30" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true"><path d="M16.04 3C8.86 3 3.03 8.82 3.03 16c0 2.3.6 4.53 1.74 6.5L3 29l6.68-1.75A12.96 12.96 0 0 0 16.04 29C23.2 29 29 23.18 29 16S23.2 3 16.04 3Zm0 23.8c-1.98 0-3.92-.53-5.61-1.53l-.4-.24-3.97 1.04 1.06-3.86-.26-.4A10.76 10.76 0 0 1 5.22 16c0-5.96 4.85-10.8 10.82-10.8 5.96 0 10.8 4.84 10.8 10.8 0 5.97-4.84 10.8-10.8 10.8Zm5.93-8.09c-.33-.16-1.93-.95-2.23-1.06-.3-.11-.52-.16-.73.16-.22.33-.84 1.06-1.03 1.28-.19.22-.38.24-.7.08-.33-.16-1.38-.51-2.62-1.62-.97-.86-1.62-1.93-1.81-2.25-.19-.33-.02-.5.14-.66.15-.15.33-.38.49-.57.16-.19.22-.33.33-.54.1-.22.05-.41-.03-.57-.08-.16-.73-1.77-1-2.42-.27-.64-.54-.55-.73-.56h-.63c-.22 0-.57.08-.87.41-.3.33-1.14 1.11-1.14 2.71 0 1.6 1.16 3.14 1.33 3.36.16.22 2.29 3.5 5.55 4.9.78.34 1.38.54 1.85.69.78.25 1.49.21 2.05.13.63-.09 1.93-.79 2.2-1.55.27-.76.27-1.41.19-1.55-.08-.13-.3-.21-.62-.37Z"/></svg></a>
}
export function SiteLayout() {
  const location=useLocation()
  return <><Header key={location.pathname}/><Outlet/><Footer/><WhatsAppButton/><RouteEffects/></>
}
