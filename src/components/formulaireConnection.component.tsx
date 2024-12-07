import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";
import { useCookies } from "react-cookie"
import axios from "axios";
import { PopUpEchec } from "./popUp.component";
import { BaliseErreur } from "./messageVerification.component";


/**
 * Gestion de la connexion
 */
function Connexion() {
    const [nom, setNom] = useState("");
    const [mtp, setMtp] = useState("");
    const [_, setBiscuit, removeBiscuit] = useCookies(['authorization'])
    const [messageErreur, setMessageErreur] = useState("")
    
    const intl = useIntl()
    const navigate = useNavigate()

    /**
     * Appel à l'appel à l'api pour le token
     */
    function Connecter() {
        setMessageErreur("")
        axios.post("https://projet-dnd.netlify.app/api/generatetoken",
            {
                persologin: {
                    nom: nom,
                    mdp: mtp
                }
            }
        ).then((response) => {
            if (response.data.token != "") {
                setBiscuit('authorization', response.data.token)
                navigate("/liste")

            }
            else{
                removeBiscuit('authorization')
                setMessageErreur(intl.formatMessage({id: "connexion.message_erreur"}))
            }

        }).catch(() => {
            PopUpEchec(intl.formatMessage({id:"connexion.bd_erreur"}))
        })

    }

    return (
        <div className="flex flex-col h-full min-h-screen px-16 pt-16 mx-10 bg-slate-800">
            <label><FormattedMessage id="liste.nom" /> :</label>
            <input onInput={(e) => setNom(e.currentTarget.value)} />
            <label><FormattedMessage id="connexion.mot_de_passe" /> :</label>
            <input onInput={(e) => setMtp(e.currentTarget.value)} />
            {BaliseErreur(messageErreur)}
            <button className="mt-5" onClick={() => Connecter()}><FormattedMessage id="connexion.connexion" /></button>
        </div>
    );
}

export default Connexion;