import { useContext, useState } from "react";
import { ConnectionContext } from "../contexts/connectionContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";



function Connection() {
    const {authorization, setCompte, setAuthorization } = useContext(ConnectionContext)
    const [nom, setNom] = useState("");
    const [mtp, setMtp] = useState("");
    const navigate = useNavigate()
    function Connecter() {
        
        axios.post("https://projet-dnd.netlify.app/api/generatetoken",
            {
                persologin: {
                    nom: nom,
                    classe: mtp
                }
            }
        ).then((response) => {
            setAuthorization(response.data.token)
            console.log(authorization)
            setCompte(nom)
            navigate("/liste")


        }).catch((e) => {
            console.log(e)
        })   
    }

    return (
        <div>
            <label>Nom :</label>
            <input onInput={(e) => setNom(e.currentTarget.value)} />
            <label>Mot de passe :</label>
            <input onInput={(e) => setMtp(e.currentTarget.value)} />
            <button onClick={() => Connecter()}>Connection</button>
        </div>
    );
}

export default Connection;