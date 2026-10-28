import './AppScreens.css'

/** Official app captures supplied by the client; balances are already masked at source. */
export function AppScreens({compact=false,className=''}:{compact?:boolean;className?:string}){
 return <div className={`app-art official-app${compact?' official-app--compact':''} ${className}`}>
  <div className="app-screen app-screen-back"><img src="/images/app-acesso.webp" alt="Tela de acesso do aplicativo Estruturart Capital" width="591" height="1280" loading="lazy"/></div>
  <div className="app-screen app-screen-front"><img src="/images/app-conta.webp" alt="Aplicativo Estruturart Capital com Pix, transferências, pagamentos e extrato; valores e dados da conta ocultados" width="591" height="1280" loading="lazy"/></div>
  {!compact&&<><span className="app-tag tag-info"><span aria-hidden="true">◷</span> Informação na hora</span><span className="app-tag tag-tap"><img src="/images/tap.svg" alt=""/>Antecipação a um toque</span></>}
 </div>
}
