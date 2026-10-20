import { useState } from 'react'
import type { FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Arrow } from './UI'
import { productNames } from '../data/pages'

export function ContactSection() {
  const [params] = useSearchParams()
  const requested = params.get('produto') || ''
  return <ContactForm key={requested} requested={requested}/>
}
function ContactForm({requested}:{requested:string}) {
  const [product,setProduct] = useState(productNames.includes(requested) ? requested : '')
  const [feedback,setFeedback] = useState(false)
  function submit(event:FormEvent<HTMLFormElement>) {event.preventDefault();setFeedback(true)}
  return (
<section className="contact content" id="contato" aria-labelledby="contact-title">
        <form onSubmit={submit} onChange={() => setFeedback(false)}>
          <div className="form-row"><label><span>Nome</span><input name="nome" placeholder="Nome" autoComplete="name" required maxLength={100} /></label><label><span>Empresa</span><input name="empresa" placeholder="Empresa" autoComplete="organization" required maxLength={150} /></label></div>
          <label><span>Email</span><input type="email" name="email" placeholder="Email" autoComplete="email" required maxLength={254} /></label>
          <div className="form-row"><label><span>CNPJ</span><input name="cnpj" placeholder="CNPJ" inputMode="numeric" maxLength={18} pattern="([0-9]{14}|[0-9]{2}\.[0-9]{3}\.[0-9]{3}/[0-9]{4}-[0-9]{2})" title="Informe 14 números ou use o formato 00.000.000/0000-00" required /></label><label><span>Produto de interesse</span><select name="produto" value={product} onChange={e => setProduct(e.target.value)} required><option value="" disabled>Produto de interesse</option>{productNames.map(name => <option key={name}>{name}</option>)}</select></label></div>
          <label><span>Faturamento mensal aproximado</span><select name="faturamento" required defaultValue=""><option value="" disabled>Faturamento mensal aproximado</option><option>Até R$ 50 mil</option><option>De R$ 50 mil a R$ 100 mil</option><option>De R$ 100 mil a R$ 500 mil</option><option>Acima de R$ 500 mil</option></select></label>
          <button className="cta" type="submit">Solicitar contato<Arrow /></button>
          <p className="form-note">Formulário demonstrativo. Nenhum dado será enviado.</p>
          {feedback && <p className="form-feedback" role="status">Dados validados. O envio de solicitações estará disponível em breve. Seus dados não foram enviados ou armazenados.</p>}
        </form>
        <div className="contact-copy"><h2 id="contact-title">Fale com um<br />especialista</h2><p>Informe os dados. Nossa equipe retorna com uma proposta adequada ao porte e ao momento da sua empresa.</p></div>
      </section>
  )
}
