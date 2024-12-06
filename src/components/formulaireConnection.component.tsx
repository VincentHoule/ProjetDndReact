import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { useCookies } from "react-cookie"
import axios from "axios";
import { PopUpEchec } from "./popUp.component";

/**
 * Gestion de la connection
 */
function Connection() {
    const [nom, setNom] = useState("");
    const [mtp, setMtp] = useState("");
    const [_, setBiscuit, removeBiscuit] = useCookies(['authorization'])


    const navigate = useNavigate()

    /**
     * Appel à l'appel à l'api pour le token
     */
    function Connecter() {

        axios.post("https://projet-dnd.netlify.app/api/generatetoken",
            {
                persologin: {
                    nom: nom,
                    mdp: mtp
                }
            }
        ).then((response) => {
            console.log(response)
            if (response.data.token != "") {
                setBiscuit('authorization', response.data.token)
                navigate("/liste")

            }
            else{
                removeBiscuit('authorization')
            }

        }).catch((e) => {
            PopUpEchec("La connection a échoué avec la base de donnée")
        })

    }

    return (
        <div className="flex flex-col h-full min-h-screen px-16 pt-16 mx-10 bg-slate-800">
            <label><FormattedMessage id="liste.nom" /> :</label>
            <input onInput={(e) => setNom(e.currentTarget.value)} />
            <label><FormattedMessage id="connection.mot_de_passe" /> :</label>
            <input onInput={(e) => setMtp(e.currentTarget.value)} />
            <button className="mt-5" onClick={() => Connecter()}><FormattedMessage id="connection.connection" /></button>
        </div>
    );
}

export default Connection;