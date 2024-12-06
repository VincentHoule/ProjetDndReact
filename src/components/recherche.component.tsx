import { useState, useContext } from "react";
import { FormattedMessage } from "react-intl";
import { ListeContext } from "../contexts/listePersonnage.context";
import axios from "axios";
import { AfficherChargement, AfficherListe } from "./listePersonnage.component";
import { useCookies } from "react-cookie";

/**
 * Fonction de gestion de recherche
 */
export function Recherche() {
    const [biscuit, _, removeBiscuit] = useCookies(['authorization'])
    const [classeChoisie, setClasseChoisie] = useState("Barbare")
    const [min, setMin] = useState(1)
    const [max, setMax] = useState(1)
    const [modeRecherche, setModeRecherche] = useState("classe")
    const [affiche, setAffiche] = useState(false)
    const [chargement, setChargement] = useState(true)
    const { listePersonnage, setPersonnages } = useContext(ListeContext)

    /**
     * Gestion du type de recherche
     * - Par classe
     * - Par mode
     */
    function RechercherParMode() {
        setAffiche(true)
        setChargement(true)

        // Rechercher par classe
        if (modeRecherche == "classe") {
            setTimeout(() => {
                axios.get(`https://projet-dnd.netlify.app/api/personnage/classe/${classeChoisie}`, { headers: { Authorization: `Bearer ${biscuit.authorization}` } }).then((response) => {
                    setPersonnages(response.data.perso)
                    setChargement(false)
                })
            }), 300
        }
        // Rechercher par intervalle de niveau
        else if (modeRecherche == "niveau") {
            setTimeout(() => {
                axios.get(`https://projet-dnd.netlify.app/api/personnage/niveau/`,
                    {
                        params: {
                            min: min,
                            max: max
                        }, headers: {
                            Authorization: `Bearer ${biscuit.authorization}`
                        }
                    }
                ).then((response) => {
                    setPersonnages(response.data.perso)
                    setChargement(false)

                })
            }, 300)
        }
    }

    return (
        <div className="flex flex-col h-full min-h-screen px-32 pt-16 mx-10 bg-slate-800">
            <h2><FormattedMessage id="recherche.mode_recherche" /></h2>

            {/** Sélection du mode de recherche */}
            <div className="flex flex-row">
                <div className="flex flex-col">
                    <button className={`w-48 mt-2 ${modeRecherche == "classe" ? "border-blue-400" : ""}`}
                        onClick={() => {
                            setModeRecherche("classe");
                            setAffiche(false)
                        }}><FormattedMessage id="recherche.mode_classe" /></button>
                    <button className={`w-48 mt-2 ${modeRecherche == "niveau" ? "border-blue-400" : ""}`}
                        onClick={() => {
                            setModeRecherche("niveau");
                            setAffiche(false)
                        }}><FormattedMessage id="recherche.mode_niveau" /></button>
                </div>

                {/** Affichage du mode de recherche */}
                {modeRecherche == "classe" ?
                    <div className="ml-5">
                        <label><FormattedMessage id="liste.classe" /></label>
                        <select className="w-48 m-5" defaultValue={"Barbare"} onChange={(e) => { setClasseChoisie(e.currentTarget.value) }} >
                            <option value="Barbare">Barbare</option>
                            <option value="Moine">Moine</option>
                            <option value="Magicien">Magicien</option>
                            <option value="Occultiste">Occultiste</option>
                            <option value="Druide">Druide</option>
                            <option value="Paladin">Paladin</option>
                            <option value="Guerrier">Guerrier</option>
                            <option value="Barde">Barde</option>
                            <option value="Clerc">Clerc</option>
                            <option value="Ensorceleur">Ensorceleur</option>
                            <option value="Rodeur">Rodeur</option>
                            <option value="Roublard">Roublard</option>
                        </select>
                    </div> :
                    <div className="ml-5">
                        <label className="text-center">Min</label>
                        <input className="w-10 m-5" defaultValue={1} min={1} max={20} type="number" onChange={(e) => setMin(parseInt(e.target.value))}></input>
                        <label>Max</label>
                        <input className="w-10 m-5" defaultValue={1} min={1} max={20} type="number" onChange={(e) => setMax(parseInt(e.target.value))}></input>
                    </div>
                }
            </div>

            <button className="w-48 mt-5" onClick={() => RechercherParMode()}><FormattedMessage id="recherche.recherche" /></button>

            {/** Affichage du résulatat de recherche */}
            {affiche ?
                <div className="mt-5">
                    {chargement ? AfficherChargement() : AfficherListe(listePersonnage)}
                </div> :
                <div className="flex flex-col h-full min-h-screen px-32 pt-16 mx-10 bg-slate-800">
                    <h1 className="mt-5"><FormattedMessage id="recherche.selectionner_recherche" /></h1>
                </div>
            }
        </div>
    );
}