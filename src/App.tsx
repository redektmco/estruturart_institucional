import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './HomePage'
import { SiteLayout } from './components/SiteLayout'
import { SolutionPage } from './pages/SolutionPage'
import { ServicesPage } from './pages/ServicesPage'
import { AboutPage, GoldenPage, HistoryPage, RecognitionPage } from './pages/InstitutionalPages'
import { AccessPage, ContactPage, LegalPage, NotFoundPage } from './pages/SupportPages'
import { solutions } from './data/pages'
import './pages.css'

export default function App(){return <BrowserRouter><Routes><Route element={<SiteLayout/>}>
  <Route index element={<HomePage/>}/>
  {solutions.map(solution=><Route path={solution.slug} key={solution.slug} element={<SolutionPage solution={solution}/>}/>)}
  <Route path="servicos" element={<ServicesPage/>}/>
  <Route path="golden" element={<GoldenPage/>}/>
  <Route path="quem-somos" element={<AboutPage/>}/>
  <Route path="nossa-historia" element={<HistoryPage/>}/>
  <Route path="premiacoes" element={<RecognitionPage/>}/>
  <Route path="na-midia" element={<RecognitionPage media/>}/>
  <Route path="contato" element={<ContactPage/>}/>
  <Route path="acesso" element={<AccessPage/>}/>
  <Route path="politica-de-privacidade" element={<LegalPage privacy/>}/>
  <Route path="termos-de-uso" element={<LegalPage/>}/>
  <Route path="*" element={<NotFoundPage/>}/>
</Route></Routes></BrowserRouter>}
