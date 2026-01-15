import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Module1_Fundamentals from './pages/modules/Module1_Fundamentals'
import Module2_IPAddressing from './pages/modules/Module2_IPAddressing'
import Module3_Routing from './pages/modules/Module3_Routing'
import Module4_Protocols from './pages/modules/Module4_Protocols'
import Module5_Security from './pages/modules/Module5_Security'
import Module6_Wireless from './pages/modules/Module6_Wireless'
import Module7_Troubleshooting from './pages/modules/Module7_Troubleshooting'
import Playground from './pages/Playground'
import CheatSheet from './pages/CheatSheet'
import Glossary from './pages/Glossary'

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/module/1" element={<Module1_Fundamentals />} />
          <Route path="/module/2" element={<Module2_IPAddressing />} />
          <Route path="/module/3" element={<Module3_Routing />} />
          <Route path="/module/4" element={<Module4_Protocols />} />
          <Route path="/module/5" element={<Module5_Security />} />
          <Route path="/module/6" element={<Module6_Wireless />} />
          <Route path="/module/7" element={<Module7_Troubleshooting />} />
          <Route path="/playground" element={<Playground />} />
          <Route path="/cheatsheet" element={<CheatSheet />} />
          <Route path="/glossary" element={<Glossary />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
