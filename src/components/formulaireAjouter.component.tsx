import { useState } from "react";
import { IPersonnage } from "../models/iPersonnage.model";
import axios from "axios";
import { FormattedMessage } from "react-intl";





function Ajouter() {

    function AjouterPersonnage() {
        axios.post("https://projet-dnd.netlify.app/api/personnage/add", { perso: perso }).then((response) => {
            console.log(response)
        })
            .catch((e) => {
                console.log(e)
                console.log(perso)
            })
    }


    const AjouterArme = (index: number) => {
        return (
            <>
                <div>
                    <label><FormattedMessage id="liste.nom"/> :</label>
                    <input onChange={(e) => { personnageDemo.armes[index].nom= e.target.value; setModifiePersonnage(personnageDemo)}}></input>
                    <label><FormattedMessage id="form.de"/> :</label>
                    <input onChange={(e) => { personnageDemo.armes[index].de= e.target.value; setModifiePersonnage(personnageDemo)}}></input>
                    <label><FormattedMessage id="form.type"/> :</label>
                    <input onChange={(e) => { personnageDemo.armes[index].degat= e.target.value; setModifiePersonnage(personnageDemo)}}></input>
                </div>
            </>
        );
    }


    const personnageDemo: IPersonnage = {
        nom: "",
        race: "",
        classe: "Barbare",
        niveau: 0,
        pv: 0,
        armes: [
            {
                nom: "",
                de: "",
                degat: ""
            },
            {
                nom: "",
                de: "",
                degat: ""
            },
            {
                nom: "",
                de: "",
                degat: ""
            }
        ],
        stats: {
            force: 0,
            dexterite: 0,
            constitution: 0,
            intelligence: 0,
            sagesse: 0,
            charisme: 0
        },
        creation: new Date(Date.parse("2023-08-08T08:24:00.000Z")),
        mort: false
    };
    const [perso, setModifiePersonnage] = useState(personnageDemo)


    return (
        <div className="flex flex-col h-full min-h-screen px-32 pt-16 mx-10 bg-slate-800">
            <label><FormattedMessage id="liste.nom"/></label>
            <input type="texte" onChange={(e) => { personnageDemo.nom = e.target.value; setModifiePersonnage(personnageDemo) }} ></input>
            <label><FormattedMessage id="liste.classe"/></label>
            <select defaultValue={"Barbare"} onSelect={(e) => { personnageDemo.classe = e.currentTarget.value; setModifiePersonnage(personnageDemo) }} >
                <option value="Barbare">Barbare</option>
                <option value="Moine">Moine</option>
                <option value="Magicien">Magicien</option>
                <option value="Occultiste">Occultiste</option>
                <option value="Druide">Druide</option>
                <option value="Paladin">Paladin</option>
                <option value="Guerrier">Guerrier</option>
                <option value="Barde">Barde</option>
                <option value="Cleric">Cleric</option>
                <option value="Ensorceleur">Ensorceleur</option>
                <option value="Rodeur">Rodeur</option>
                <option value="Roublard">Roublard</option>
            </select>
            <label><FormattedMessage id="liste.race"/> :</label>
            <input onChange={(e) => { personnageDemo.race = e.target.value; setModifiePersonnage(personnageDemo) }}></input>
            <label><FormattedMessage id="liste.niveau"/> :</label>
            <input type="number" onChange={(e) => { personnageDemo.niveau = parseInt(e.target.value); setModifiePersonnage(personnageDemo) }}></input>
            <label><FormattedMessage id="liste.pv"/> :</label>
            <input type="number" onChange={(e) => { personnageDemo.pv = parseInt(e.target.value); setModifiePersonnage(personnageDemo) }}></input>
            <div>
                <label>Armes :</label>
                {AjouterArme(0)}
                {AjouterArme(1)}
                {AjouterArme(2)}
            </div>

            <div className="flex flex-col">
                <b>Statistique :</b>
                <label><FormattedMessage id="form.force"/> :</label>
                <input type="number" onChange={(e) => { personnageDemo.stats.force = parseInt(e.target.value); setModifiePersonnage(personnageDemo) }}></input>
                <label><FormattedMessage id="form.dex"/> :</label>
                <input type="number" onChange={(e) => { personnageDemo.stats.dexterite = parseInt(e.target.value); setModifiePersonnage(personnageDemo) }}></input>
                <label><FormattedMessage id="form.consti"/> :</label>
                <input type="number" onChange={(e) => { personnageDemo.stats.constitution = parseInt(e.target.value); setModifiePersonnage(personnageDemo) }}></input>
                <label><FormattedMessage id="form.intel"/> :</label>
                <input type="number" onChange={(e) => { personnageDemo.stats.intelligence = parseInt(e.target.value); setModifiePersonnage(personnageDemo) }}></input>
                <label><FormattedMessage id="form.sage"/> :</label>
                <input type="number" onChange={(e) => { personnageDemo.stats.sagesse = parseInt(e.target.value); setModifiePersonnage(personnageDemo) }}></input>
                <label><FormattedMessage id="form.charisme"/> :</label>
                <input type="number" onChange={(e) => { personnageDemo.stats.charisme = parseInt(e.target.value); setModifiePersonnage(personnageDemo) }}></input>
                <label><FormattedMessage id="form.mort"/> :</label>
                <input type="checkbox" defaultValue={0} onChange={(e) => { personnageDemo.mort = true; setModifiePersonnage(personnageDemo) }}></input>
            </div>
            <button onClick={() => AjouterPersonnage()}><FormattedMessage id="form.creer"/></button>

        </div>
    );
}

export default Ajouter;