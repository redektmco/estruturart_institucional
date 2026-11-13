import { useState } from 'react'
import type { FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Arrow } from './UI'
import { productNames } from '../data/pages'

const WEBHOOK_URL = 'https://n8n-production-470e.up.railway.app/webhook/df99b0e7-ff76-4aa4-9de6-c24cadb63033'
type Status = 'idle' | 'sending' | 'success' | 'error'

export function ContactSection() {
  const [params] = useSearchParams()
  const requested = params.get('produto') || ''
  return <ContactForm key={requested} requested={requested}/>
}
function ContactForm({requested}:{requested:string}) {
  const [product,setProduct] = useState(productNames.includes(requested) ? requested : '')
  const [status,setStatus] = useState<Status>('idle')
  async function submit(event:FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'sending') return
    const form = event.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())
    // Campo isca (anti-spam): se vier preenchido, finge sucesso e não envia.
    if (data.website) {setStatus('success');return}
    setStatus('sending')
    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          nome: data.nome, empresa: data.empresa, email: data.email, cnpj: data.cnpj,
          produto: data.produto, faturamento: data.faturamento,
          pagina: window.location.href, origem: document.referrer || '',
          enviado_em: new Date().toISOString(),
        }),
      })
      if (!response.ok) throw new Error(String(response.status))
      form.reset()
      setProduct('')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }
  return (
<section className="contact content" id="contato" aria-labelledby="contact-title">
        <form onSubmit={submit} onChange={() => status !== 'sending' && setStatus('idle')}>
          <div className="form-row"><label><span>Nome</span><input name="nome" placeholder="Nome" autoComplete="name" required maxLength={100} /></label><label><span>Empresa</span><input name="empresa" placeholder="Empresa" autoComplete="organization" required maxLength={150} /></label></div>
          <label><span>Email</span><input type="email" name="email" placeholder="Email" autoComplete="email" required maxLength={254} /></label>
          <div className="form-row"><label><span>CNPJ</span><input name="cnpj" placeholder="CNPJ" inputMode="numeric" maxLength={18} pattern="([0-9]{14}|[0-9]{2}\.[0-9]{3}\.[0-9]{3}/[0-9]{4}-[0-9]{2})" title="Informe 14 números ou use o formato 00.000.000/0000-00" required /></label><label><span>Produto de interesse</span><select name="produto" value={product} onChange={e => setProduct(e.target.value)} required><option value="" disabled>Produto de interesse</option>{productNames.map(name => <option key={name}>{name}</option>)}</select></label></div>
          <label><span>Faturamento mensal aproximado</span><select name="faturamento" required defaultValue=""><option value="" disabled>Faturamento mensal aproximado</option><option>Até R$ 50 mil</option><option>De R$ 50 mil a R$ 100 mil</option><option>De R$ 100 mil a R$ 500 mil</option><option>Acima de R$ 500 mil</option></select></label>
          <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{position:'absolute',left:'-9999px',width:1,height:1,opacity:0}} />
          <button className="cta" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Enviando...' : 'Solicitar contato'}<Arrow /></button>
          {status === 'success' && <p className="form-feedback" role="status">Solicitação enviada! Nossa equipe entrará em contato em breve.</p>}
          {status === 'error' && <p className="form-feedback" role="alert">Não foi possível enviar agora. Tente novamente ou fale conosco pelo WhatsApp ou email.</p>}
        </form>
        <div className="contact-copy"><h2 id="contact-title">Fale com um<br />especialista</h2><p>Informe os dados. Nossa equipe retorna com uma proposta adequada ao porte e ao momento da sua empresa.</p></div>
      </section>
  )
}
