
import { BrowserRouter } from "react-router-dom"

import ListeProvider from "./contexts/listePersonnage.context"
import { Routes } from "react-router-dom"
import { Route } from "react-router-dom"
import TopBar from "./components/topBar.component"
import Ajouter from "./components/formulaireAjouter.component"
import { ListePersonnage } from "./components/listePersonnage.component"
import Modifier from "./components/formulaireModifier.component"
import { IntlProvider } from "react-intl"
import { useContext } from "react"
import { LangueContext } from "./contexts/langue.context"
import { Recherche } from "./components/recherche.component"
import Connection from "./components/formulaireConnection.component"
import { useCookies } from "react-cookie"


function App() {
  // cookies
  const { local, messages } = useContext(LangueContext)
  const [biscuit, _, removeBiscuit] = useCookies(['authorization'])
  
  return (
    <IntlProvider locale={local} messages={messages}>
      <BrowserRouter>
          <ListeProvider>
            <Routes>
              <Route path="/" element={<TopBar />}>
                <Route index element={<Connection />} />
                <Route path="/ajouter" element={<Ajouter />} />
                <Route path="/modifier/:id" element={<Modifier />} />
                <Route path="recherche" element={<Recherche />} />
                <Route path="/liste" element={<ListePersonnage />} />
              </Route>
            </Routes>
          </ListeProvider>
      </BrowserRouter>
    </IntlProvider >


  )
}

export default App;