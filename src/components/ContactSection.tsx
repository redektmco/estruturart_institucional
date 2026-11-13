import { useState } from 'react'
import type { FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Arrow } from './UI'
import { productNames } from '../data/pages'
import { links } from '../data/links'

declare global {
  interface Window {
    // definido no <head> do index.html: gclid/utm_* guardados por 90 dias
    getTracking?: () => Record<string, string>
    dataLayer?: Record<string, unknown>[]
  }
}
const trackingKeys = ['gclid','utm_source','utm_medium','utm_campaign','utm_term'] as const

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
  // Valores iniciais dos campos ocultos (o script do <head> pode ter rodado antes do form montar).
  const [tracking] = useState(() => window.getTracking?.() ?? {})
  async function submit(event:FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'sending') return
    const form = event.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())
    // Campo isca (anti-spam): se vier preenchido, finge sucesso e não envia.
    if (data.website) {setStatus('success');return}
    const email = String(data.email || '')
    const whatsappDigits = String(data.whatsapp || '').replace(/\D/g, '')
    const telefone = '+55' + whatsappDigits.replace(/^55(?=\d{10,11}$)/, '') // formato +5531999999999
    const produto = String(data.produto || '')
    const faturamento = String(data.faturamento || '')
    setStatus('sending')
    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          nome: data.nome, empresa: data.empresa, email: data.email,
          whatsapp: whatsappDigits, cnpj: data.cnpj,
          produto: data.produto, faturamento: data.faturamento,
          form_origem: 'institucional',
          pagina: window.location.href, origem: document.referrer || '',
          enviado_em: new Date().toISOString(),
          // gclid e UTMs: garante o valor mesmo se os campos ocultos não foram preenchidos a tempo
          ...Object.fromEntries(trackingKeys.map(k => [k, data[k] || ''])),
          ...window.getTracking?.(),
        }),
      })
      if (!response.ok) throw new Error(String(response.status))
      form.reset()
      setProduct('')
      setStatus('success')
      // Conversão: dispara junto com a mensagem de sucesso (a tag do Google Ads é configurada no GTM)
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({
        event: 'lead_enviado',
        form_origem: 'institucional',
        user_data: {
          email: email,
          phone_number: telefone,
        },
        lead_faturamento: faturamento,
        lead_produto: produto,
      })
    } catch {
      setStatus('error')
    }
  }
  return (
<section className="contact content" id="contato" aria-labelledby="contact-title">
        <form onSubmit={submit} onChange={() => status !== 'sending' && setStatus('idle')}>
          <div className="form-row"><label><span>Nome</span><input name="nome" placeholder="Nome" autoComplete="name" required maxLength={100} /></label><label><span>Empresa</span><input name="empresa" placeholder="Empresa" autoComplete="organization" required maxLength={150} /></label></div>
          <div className="form-row"><label><span>Email</span><input type="email" name="email" placeholder="Email" autoComplete="email" required maxLength={254} /></label><label><span>WhatsApp</span><input type="tel" name="whatsapp" placeholder="WhatsApp com DDD" autoComplete="tel" inputMode="tel" maxLength={20} pattern="\(?[0-9]{2}\)?\s?(9\s?)?[0-9]{4}-?[0-9]{4}" title="Informe o WhatsApp com DDD, ex.: (31) 99999-9999" required /></label></div>
          <div className="form-row"><label><span>CNPJ</span><input name="cnpj" placeholder="CNPJ" inputMode="numeric" maxLength={18} pattern="([0-9]{14}|[0-9]{2}\.[0-9]{3}\.[0-9]{3}/[0-9]{4}-[0-9]{2})" title="Informe 14 números ou use o formato 00.000.000/0000-00" required /></label><label><span>Produto de interesse</span><select name="produto" value={product} onChange={e => setProduct(e.target.value)} required><option value="" disabled>Produto de interesse</option>{productNames.map(name => <option key={name}>{name}</option>)}</select></label></div>
          <label><span>Faturamento mensal aproximado</span><select name="faturamento" required defaultValue=""><option value="" disabled>Faturamento mensal aproximado</option><option>Até R$ 50 mil</option><option>De R$ 50 mil a R$ 100 mil</option><option>De R$ 100 mil a R$ 500 mil</option><option>Acima de R$ 500 mil</option></select></label>
          {trackingKeys.map(k => <input key={k} type="hidden" name={k} defaultValue={tracking[k] || ''} />)}
          <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{position:'absolute',left:'-9999px',width:1,height:1,opacity:0}} />
          <button className="cta" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Enviando...' : 'Solicitar contato'}<Arrow /></button>
          <p className="form-note">Ao enviar, você concorda com a <a href={links.privacy} target="_blank" rel="noopener noreferrer">Política de Privacidade</a>.</p>
          {status === 'success' && <p className="form-feedback" role="status">Solicitação enviada! Nossa equipe entrará em contato em breve.</p>}
          {status === 'error' && <p className="form-feedback" role="alert">Não foi possível enviar agora. Tente novamente ou fale conosco pelo WhatsApp ou email.</p>}
        </form>
        <div className="contact-copy"><h2 id="contact-title">Fale com um<br />especialista</h2><p>Informe os dados. Nossa equipe retorna com uma proposta adequada ao porte e ao momento da sua empresa.</p></div>
      </section>
  )
}
