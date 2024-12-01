import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { VerifNom, BaliseErreur, VerifClasse, VerifRace, VerifNiveau, VerifPv, VerifArme, VerifStats } from "./MessageVerification.component";
import { ListeContext } from "../contexts/listePersonnage.context";
import { PopUpReussite } from "./popUp.component";

function Modifier() {
    const { listePersonnage, setPersonnages } = useContext(ListeContext)

    const { id } = useParams();
    const [enChargement, setEnChargement] = useState(true);
    const [personnageDemo, setPersonnageDemo] = useState({
        _id: "",
        nom: "",
        race: "",
        classe: "",
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
    });
    const [modifiePersonnage, setModifiePersonnage] = useState(personnageDemo)

    // Garder le nom initial, car le nom doit être unique
    const [nomInitial, setNomInitial] = useState("")

    // Afficher le pop up de réussite de la requête
    const [affiche, setAffiche] = useState(false)
    const [reussite, setReussite] = useState(false)

    // Hook des message d'erreur
    const [messageErreurNom, setMessageErreurNom] = useState("");
    const [messageErreurClasse, setMessageErreurClasse] = useState("");
    const [messageErreurRace, setMessageErreurRace] = useState("");
    const [messageErreurNiveau, setMessageErreurNiveau] = useState("");
    const [messageErreurPv, setMessageErreurPv] = useState("");
    const [messageErreurArme1, setMessageErreurArme1] = useState("");
    const [messageErreurArme2, setMessageErreurArme2] = useState("");
    const [messageErreurArme3, setMessageErreurArme3] = useState("");
    const [messageErreurStats, setMessageErreurStats] = useState("");

    // Pour envoyer la liste des noms à la vérification du nom
    useEffect(() => {
        setTimeout(() => {
            axios.get('https://projet-dnd.netlify.app/api/personnage').then((response) => {
                setPersonnages(response.data.perso)

            });
        }, 300)

    }, [])

    // Remplir avec les informations du personnage
    useEffect(() => {
        setTimeout(() => {
            axios.get(`https://projet-dnd.netlify.app/api/personnage/un/${id}`).then((response) => {
                setPersonnageDemo(response.data.perso)
                setModifiePersonnage(response.data.perso)
                setNomInitial(response.data.perso.nom)
                setEnChargement(false);
            });
        }, 300)

    }, [])
    function ModifierPersonnage() {
        // Vérifier si les champs sont invalide
        if (messageErreurNom == "" && messageErreurClasse == "" && messageErreurNiveau == ""
            && messageErreurRace == "" && messageErreurPv == "" && messageErreurArme1 == ""
            && messageErreurArme2 == "" && messageErreurArme3 == "" && messageErreurStats == ""
        ) {
            
            axios.put("https://projet-dnd.netlify.app/api/personnage/update", { perso: modifiePersonnage }).then(() => {
                setAffiche(true)
                setReussite(true)
            })
                .catch((e) => {
                    console.log(e)
                    console.log(modifiePersonnage)
                })
        }


    }

    const AjouterArme = (index: number) => {

        return (
            <>
                <div onInput={() => {

                    if (index == 1)
                        setMessageErreurArme1(VerifArme(modifiePersonnage.armes[index]));
                    if (index == 2)
                        setMessageErreurArme2(VerifArme(modifiePersonnage.armes[index]));
                    if (index == 3)
                        setMessageErreurArme3(VerifArme(modifiePersonnage.armes[index]))

                }}>
                    <label>Nom :</label>
                    <input defaultValue={modifiePersonnage.armes[index].nom} onChange={(e) => { personnageDemo.armes[index].nom = e.target.value; setModifiePersonnage(personnageDemo) }}></input>
                    <label>De :</label>
                    <input defaultValue={modifiePersonnage.armes[index].de} onChange={(e) => { personnageDemo.armes[index].de = e.target.value; setModifiePersonnage(personnageDemo) }}></input>
                    <label>Dégât :</label>
                    <input defaultValue={modifiePersonnage.armes[index].degat} onChange={(e) => { personnageDemo.armes[index].degat = e.target.value; setModifiePersonnage(personnageDemo) }}></input>
                    {index == 1 ? BaliseErreur(messageErreurArme1) : null}
                    {index == 2 ? BaliseErreur(messageErreurArme2) : null}
                    {index == 3 ? BaliseErreur(messageErreurArme3) : null}
                </div>

            </>
        );
    }

    if (enChargement) {
        return (
            <div className="flex flex-col h-full min-h-screen px-32 pt-16 mx-10 bg-slate-800 rounded-tr-3xl">
                <h1>Chargement ...</h1>
            </div>
        );
    }
    else {
        return (
            <div className="flex flex-col h-full min-h-screen px-32 pt-16 mx-10 bg-slate-800">
                {affiche && reussite ? PopUpReussite("Le personnage a été modifier avec success"): null}
                <label>Nom :</label>
                <input defaultValue={modifiePersonnage.nom} onChange={(e) => {
                    personnageDemo.nom = e.target.value;
                    setModifiePersonnage(personnageDemo);
                    setMessageErreurNom(VerifNom(modifiePersonnage.nom, listePersonnage, nomInitial))
                }} ></input>
                {BaliseErreur(messageErreurNom)}

                <label>Classe :</label>
                <select defaultValue={modifiePersonnage.classe} onChange={(e) => {
                    personnageDemo.classe = e.currentTarget.value;
                    setModifiePersonnage(personnageDemo);
                    setMessageErreurClasse(VerifClasse(modifiePersonnage.classe));
                    console.log(e.currentTarget.value)
                }} >
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
                    <option value="Artificier">Artificier</option>
                </select>
                {BaliseErreur(messageErreurClasse)}

                <label>Race :</label>
                <input defaultValue={modifiePersonnage.race} onChange={(e) => {
                    personnageDemo.race = e.target.value;
                    setModifiePersonnage(personnageDemo);
                    setMessageErreurRace(VerifRace(modifiePersonnage.race))
                }}></input>
                {BaliseErreur(messageErreurRace)}

                <label>Niveau :</label>
                <input defaultValue={modifiePersonnage.niveau} onChange={(e) => {
                    personnageDemo.niveau = parseInt(e.target.value);
                    setModifiePersonnage(personnageDemo)
                    setMessageErreurNiveau(VerifNiveau(modifiePersonnage.niveau))
                }}></input>
                {BaliseErreur(messageErreurNiveau)}

                <label>Pv :</label>
                <input defaultValue={modifiePersonnage.pv} onChange={(e) => {
                    personnageDemo.pv = parseInt(e.target.value);
                    setModifiePersonnage(personnageDemo);
                    setMessageErreurPv(VerifPv(modifiePersonnage.pv))
                }}></input>
                {BaliseErreur(messageErreurPv)}

                <div>
                    <label>Armes :</label>
                    {AjouterArme(0)}
                    {AjouterArme(1)}
                    {AjouterArme(2)}
                </div>

                <div onInputCapture={() => {
                    setMessageErreurStats(VerifStats(modifiePersonnage.stats))
                }} className="flex flex-col">
                    <b>Statistique :</b>
                    <label>Force :</label>
                    <input defaultValue={modifiePersonnage.stats.force} onChange={(e) => { personnageDemo.stats.force = parseInt(e.target.value); setModifiePersonnage(personnageDemo) }}></input>
                    <label>Dextérité :</label>
                    <input defaultValue={modifiePersonnage.stats.dexterite} onChange={(e) => { personnageDemo.stats.dexterite = parseInt(e.target.value); setModifiePersonnage(personnageDemo) }}></input>
                    <label>Constitution :</label>
                    <input defaultValue={modifiePersonnage.stats.constitution} onChange={(e) => { personnageDemo.stats.constitution = parseInt(e.target.value); setModifiePersonnage(personnageDemo) }}></input>
                    <label>Intelligence :</label>
                    <input defaultValue={modifiePersonnage.stats.intelligence} onChange={(e) => { personnageDemo.stats.intelligence = parseInt(e.target.value); setModifiePersonnage(personnageDemo) }}></input>
                    <label>Sagesse :</label>
                    <input defaultValue={modifiePersonnage.stats.sagesse} onChange={(e) => { personnageDemo.stats.sagesse = parseInt(e.target.value); setModifiePersonnage(personnageDemo) }}></input>
                    <label>Charisme :</label>
                    <input defaultValue={modifiePersonnage.stats.charisme} onChange={(e) => { personnageDemo.stats.charisme = parseInt(e.target.value); setModifiePersonnage(personnageDemo) }}></input>
                    {BaliseErreur(messageErreurStats)}
                </div>
                <button onClick={() => ModifierPersonnage()}>Modifier</button>
            </div>
        );
    }

}

export default Modifier;