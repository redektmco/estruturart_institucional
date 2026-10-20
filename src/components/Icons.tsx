export function DiagonalArrow(){return <svg className="diagonal-arrow" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
export function SocialIcon({index}:{index:number}){
 const paths=[
  <path key="x" d="m4 4 16 16M20 4 4 20M8 4H4l12 16h4L8 4Z"/>,
  <g key="instagram"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none"/></g>,
  <g key="youtube"><rect x="2" y="5" width="20" height="14" rx="4"/><path d="m10 9 6 3-6 3V9Z"/></g>,
  <g key="linkedin"><path d="M5 10v10M5 5v.2M10 20V10h4v2c2-4 6-2 6 1v7M14 12v8"/><circle cx="5" cy="5" r="1"/></g>,
  <path key="facebook" d="M14 21v-8h3l.5-4H14V7c0-1 .5-2 2-2h2V2h-3c-4 0-5 2-5 5v2H7v4h3v8"/>,
 ]
 return <svg className="social-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[index]}</svg>
}
