import './BrandGallery.css'
const galleries={
 pay:{label:'Materiais oficiais Estruturart Pay',title:'A Estruturart Pay de perto.',photos:[{src:'pay-equipamentos-studio',alt:'Conjunto de maquininhas com a identidade Estruturart Pay, em suas embalagens',caption:'Equipamentos Estruturart Pay',width:1448,height:1086},{src:'pay-terminal-real-sem-nome',alt:'Foto da maquininha Estruturart Pay com tela, teclado e área de aproximação',caption:'A identidade da marca em cada detalhe.',width:1086,height:1448}]},
 golden:{label:'Identidade Golden',title:'Uma identidade própria.\nEm cada detalhe.',photos:[{src:'golden-oficial-studio',alt:'Moeda dourada com o símbolo Estruturart e a inscrição Estruturart Golden ESG',caption:'Estruturart Golden',width:1254,height:1254},{src:'golden-detalhe-studio',alt:'Detalhes do relevo e da identidade Estruturart Golden na moeda dourada',caption:'O símbolo do grupo, em outra perspectiva.',width:1254,height:1254}]},
}
export function BrandGallery({kind}:{kind:keyof typeof galleries}){
 const gallery=galleries[kind]
 return <section className={`brand-gallery brand-gallery--${kind} wide`} aria-label={gallery.label}><div className="section-heading"><span className="eyebrow">{gallery.label}</span><h2>{gallery.title}</h2></div><div className="brand-gallery-grid">{gallery.photos.map(photo=><figure key={photo.src}><img src={`/images/${photo.src}.webp`} alt={photo.alt} width={photo.width} height={photo.height} loading="lazy"/><figcaption>{photo.caption}</figcaption></figure>)}</div></section>
}
