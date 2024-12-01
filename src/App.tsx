
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
import ConnectionProvider from "./contexts/connectionContext"


function App() {
  const { local, messages } = useContext(LangueContext)

  return (
    <IntlProvider locale={local} messages={messages}>
      <ConnectionProvider>
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
      </ConnectionProvider>
    </IntlProvider>


  )
}

export default App;