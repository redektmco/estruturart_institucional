import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Arrow } from './UI'

const slides = [
  {
    id: 'cartoes',
    title: ['Seu negócio não nasceu', 'para ser comum.'],
    description: 'Mais praticidade, autonomia e soluções financeiras que acompanham a evolução da sua empresa.',
    cta: 'Conheça nossas soluções',
    href: '/#solucoes',
    image: '/images/hero.webp',
    mobileImage: '/images/hero-modelo-mobile.webp',
    alt: 'Modelo de óculos finos, argolas e blazer segurando o cartão Estruturart Capital',
    width: 1672,
    height: 941,
  },
  {
    id: 'conta-digital',
    title: ['Sua empresa no controle.', 'De onde estiver.'],
    description: 'Uma conta digital PJ pensada para simplificar sua rotina financeira e dar mais espaço ao que realmente importa: seu negócio.',
    cta: 'Abra sua conta',
    href: '/contato?produto=Conta%20Digital%20PJ',
    image: '/images/hero-celular.webp',
    mobileImage: '/images/hero-celular-mobile.webp',
    alt: 'Conta digital Estruturart Capital no celular e cartão nas mãos de uma cliente',
    width: 1672,
    height: 941,
  },
  {
    id: 'cartao-bolso',
    title: ['Menos burocracia.', 'Mais negócio.'],
    description: 'A praticidade de uma conta digital PJ com soluções que acompanham o ritmo de quem empreende.',
    cta: 'Descubra a Estruturart',
    href: '/quem-somos',
    image: '/images/hero-cartao.webp',
    mobileImage: '/images/hero-cartao-mobile.webp',
    alt: 'Cartão Estruturart Capital no bolso de uma calça jeans. A conta digital que descomplica o seu negócio.',
    width: 1920,
    height: 1080,
  },
]

function Chevron({ previous = false }: { previous?: boolean }) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={previous ? 'm14 6-6 6 6 6' : 'm10 6 6 6-6 6'} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

export function HeroCarousel() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const slide = slides[active]

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const respectPreference = () => { if (preference.matches) setPaused(true) }
    preference.addEventListener('change', respectPreference)
    return () => preference.removeEventListener('change', respectPreference)
  }, [])

  useEffect(() => {
    if (paused || hovered || focused) return
    let timer: ReturnType<typeof setTimeout> | undefined
    const schedule = () => {
      clearTimeout(timer)
      if (!document.hidden) timer = setTimeout(() => setActive(index => (index + 1) % slides.length), 8000)
    }
    schedule()
    document.addEventListener('visibilitychange', schedule)
    return () => {
      clearTimeout(timer)
      document.removeEventListener('visibilitychange', schedule)
    }
  }, [active, paused, hovered, focused])

  const move = (direction: number) => setActive(index => (index + direction + slides.length) % slides.length)

  return <section
    className={`hero hero-${slide.id}`}
    id="inicio"
    aria-label="Destaques Estruturart"
    aria-roledescription="carrossel"
    onMouseEnter={() => setHovered(true)}
    onMouseLeave={() => setHovered(false)}
    onFocusCapture={() => setFocused(true)}
    onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false) }}
  >
    <div className="hero-photos" aria-hidden="true">
      {slides.map((item, index) => <picture
        key={item.image}
        className={`hero-photo${item.image === slide.image ? ' is-active' : ''}`}
      >
        <source media="(max-width: 760px)" srcSet={item.mobileImage} width="960" height="800" />
        <img
          src={item.image}
          alt=""
          width={item.width}
          height={item.height}
          fetchPriority={index === 0 ? 'high' : 'low'}
          loading="eager"
        />
      </picture>)}
    </div>
    <div className="hero-content" aria-live={paused || hovered || focused ? 'polite' : 'off'} aria-atomic="true">
      <div className="hero-copy" key={slide.id} role="group" aria-roledescription="slide" aria-label={`${active + 1} de ${slides.length}`}>
        <span className="sr-only">{slide.alt}</span>
        <h1 id="hero-title">{slide.title.map((line, index) => <span key={line}>{index > 0 && ' '}{line}</span>)}</h1>
        <p>{slide.description}</p>
        <Link className="cta" to={slide.href}>{slide.cta}<Arrow /></Link>
      </div>
    </div>
    <div className="hero-controls">
      <div className="hero-pagination" role="group" aria-label="Escolher destaque">
        {slides.map((item, index) => <button
          key={item.id}
          type="button"
          className={`hero-dot${active === index ? ' is-active' : ''}`}
          aria-label={`Ir para o slide ${index + 1}: ${item.title.join(' ')}`}
          aria-current={active === index ? 'true' : undefined}
          onClick={() => setActive(index)}
        ><span /></button>)}
      </div>
      <span className="hero-count" aria-hidden="true">{String(active + 1).padStart(2, '0')}<span> / {String(slides.length).padStart(2, '0')}</span></span>
      <div className="hero-actions" role="group" aria-label="Controles do carrossel">
        <button className="hero-control hero-pause" type="button" onClick={() => setPaused(value => !value)} aria-label={paused ? 'Retomar troca automática dos slides' : 'Pausar troca automática dos slides'}>
          {paused ? <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m9 5 11 7-11 7V5Z" /></svg> : <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6 5h4v14H6zm8 0h4v14h-4z" /></svg>}
        </button>
        <button className="hero-control" type="button" onClick={() => move(-1)} aria-label="Slide anterior"><Chevron previous /></button>
        <button className="hero-control" type="button" onClick={() => move(1)} aria-label="Próximo slide"><Chevron /></button>
      </div>
    </div>
  </section>
}
