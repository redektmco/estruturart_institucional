// Reuse the approved campaign photograph without regenerating the card.
// The SVG viewport shows the product area, preserving its original pixels.
export function CardPhoto({ className = '' }: { className?: string }) {
  return <svg className={`official-card-photo ${className}`} viewBox="1200 235 570 428" role="img" aria-label="Cartão preto Estruturart Capital com lateral laranja no bolso de uma calça jeans">
    <image href="/images/hero-cartao.webp" width="1920" height="1080"/>
  </svg>
}
