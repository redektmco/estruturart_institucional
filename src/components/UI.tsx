import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

export function Arrow() { return <span className="arrow" aria-hidden="true">→</span> }
export function ButtonLink({ children, to='/contato', light=false, onClick }: { children:ReactNode; to?:string; light?:boolean; onClick?:()=>void }) {
  return <Link className={`cta${light?' cta-light':''}`} to={to} onClick={onClick}>{children}<Arrow /></Link>
}
export function Breadcrumb({ current, parent }: {current:string; parent?:{name:string;to:string}}) {
  return <nav className="breadcrumb" aria-label="Caminho da página"><Link to="/">Início</Link><span aria-hidden="true">/</span>{parent&&<><Link to={parent.to}>{parent.name}</Link><span aria-hidden="true">/</span></>}<span aria-current="page">{current}</span></nav>
}
export function PageLead({ label,title,description,children }: {label:string;title:string;description:string;children?:ReactNode}) {
  return <div className="page-lead"><span className="eyebrow">{label}</span><h1 tabIndex={-1}>{title}</h1><p>{description}</p>{children}</div>
}
export function ClosingCTA({ name }: {name?:string}) {
  return <section className="closing-cta wide"><div><span className="eyebrow">O próximo passo é uma conversa.</span><h2>Vamos encontrar<br/>o seu caminho?</h2></div><ButtonLink to={name?`/contato?produto=${encodeURIComponent(name)}`:'/contato'}>Falar com um especialista</ButtonLink></section>
}
export function FAQ({ items,title='Perguntas frequentes' }: { items:[string,string][];title?:string }) {
  return <section className="faq dark inner-faq"><div className="wide"><span className="eyebrow">Respostas para seguir em frente</span><h2>{title}</h2><div className="faq-list">{items.map(([q,a])=><details key={q}><summary>{q}<span className="faq-toggle" aria-hidden="true">+</span></summary><p>{a}</p></details>)}</div></div></section>
}
