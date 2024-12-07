import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { VerifNom, BaliseErreur, VerifClasse, VerifRace, VerifNiveau, VerifPv, VerifArme, VerifStats, VerifDate } from "./messageVerification.component";
import { ListeContext } from "../contexts/listePersonnage.context";
import { PopUpEchec, PopUpReussite } from "./popUp.component";
import { FormattedMessage, useIntl } from "react-intl";
import { useCookies } from "react-cookie";
import { AfficherChargement } from "./listePersonnage.component";

/**
 * Gestion de la page modifier
 */
function Modifier() {
    const { listePersonnage, setPersonnages } = useContext(ListeContext)
    const [biscuit, _] = useCookies(['authorization'])

    const intl = useIntl()

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
    const [echec, setEchec] = useState(false)

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
    const [messageErreurDate, setMessageErreurDate] = useState("")

    // Pour envoyer la liste des noms à la vérification du nom
    useEffect(() => {
        setTimeout(() => {
            axios.get('https://projet-dnd.netlify.app/api/personnage', { headers: { Authorization: `Bearer ${biscuit.authorization}` } }).then((response) => {
                setPersonnages(response.data.perso)

            });
        }, 300)

    }, [])

    // Remplir avec les informations du personnage
    useEffect(() => {
        setTimeout(() => {
            axios.get(`https://projet-dnd.netlify.app/api/personnage/un/${id}`, { headers: { Authorization: `Bearer ${biscuit.authorization}` } }).then((response) => {
                setPersonnageDemo(response.data.perso)
                setModifiePersonnage(response.data.perso)
                setNomInitial(response.data.perso.nom)
                setEnChargement(false);
            });
        }, 300)

    }, [])

    /**
     * Fonction qui modifier le personnage dans la bd
     */
    function ModifierPersonnage() {
        setEchec(false)
        setReussite(false)

        // Vérification des champs et affichage des erreurs
        setMessageErreurNom(TraduireMessage(VerifNom(personnageDemo.nom, listePersonnage, "")))
        setMessageErreurClasse(TraduireMessage(VerifClasse(personnageDemo.classe)))
        setMessageErreurRace(TraduireMessage(VerifRace(personnageDemo.race)))
        setMessageErreurNiveau(TraduireMessage(VerifNiveau(personnageDemo.niveau)))
        setMessageErreurPv(TraduireMessage(VerifPv(personnageDemo.pv)))
        setMessageErreurArme1(TraduireMessage(VerifArme(personnageDemo.armes[0])))
        setMessageErreurArme2(TraduireMessage(VerifArme(personnageDemo.armes[1])))
        setMessageErreurArme3(TraduireMessage(VerifArme(personnageDemo.armes[2])))
        setMessageErreurStats(TraduireMessage(VerifStats(personnageDemo.stats)))
        setMessageErreurDate(TraduireMessage(VerifDate(personnageDemo.creation)))

        // Vérifier si les champs sont invalide
        if (messageErreurNom == "" && messageErreurClasse == "" && messageErreurNiveau == ""
            && messageErreurRace == "" && messageErreurPv == "" && messageErreurArme1 == ""
            && messageErreurArme2 == "" && messageErreurArme3 == "" && messageErreurStats == ""
        ) {
            // Requête de modification
            axios.put("https://projet-dnd.netlify.app/api/personnage/update", { perso: modifiePersonnage },
                { headers: { Authorization: `Bearer ${biscuit.authorization}` } }).then(() => {
                    setAffiche(true)
                    setReussite(true)
                })
                .catch(() => {
                    setEchec(true)

                })
        }
        else {
            setEchec(true)
        }
    }

    /**
     * Morceau de formulaire pour une arme
     * @param index l'arme dans le tableau
     * @returns morceau de formulaire
     */
    const AjouterArme = (index: number) => {
        return (

            <div onChange={() => {

                // Validation des champs
                if (index == 1)
                    setMessageErreurArme1(TraduireMessage(VerifArme(modifiePersonnage.armes[index])))
                if (index == 2)
                    setMessageErreurArme2(TraduireMessage(VerifArme(modifiePersonnage.armes[index])))
                if (index == 3)
                    setMessageErreurArme3(TraduireMessage(VerifArme(modifiePersonnage.armes[index])))

            }}>
                <label><FormattedMessage id="liste.nom" /> :</label>
                <input defaultValue={modifiePersonnage.armes[index].nom} onChange={(e) => { personnageDemo.armes[index].nom = e.target.value; setModifiePersonnage(personnageDemo) }}></input>
                <label><FormattedMessage id="form.de" /> :</label>
                <input defaultValue={modifiePersonnage.armes[index].de} onChange={(e) => { personnageDemo.armes[index].de = e.target.value; setModifiePersonnage(personnageDemo) }}></input>
                <label><FormattedMessage id="form.type" /> :</label>
                <input defaultValue={modifiePersonnage.armes[index].degat} onChange={(e) => { personnageDemo.armes[index].degat = e.target.value; setModifiePersonnage(personnageDemo) }}></input>
                {/* Affichage des messages d'erreur pour les armes */}
                {index == 1 && BaliseErreur(messageErreurArme1)}
                {index == 2 && BaliseErreur(messageErreurArme2)}
                {index == 3 && BaliseErreur(messageErreurArme3)}
            </div>
        );
    }

    /**
     * Fonction qui traduit les messages d'erreur d'un champ
     * @param messageErreurs tableau des messages d'erreur
     * @returns les messages traduits
     */
    function TraduireMessage(messageErreurs: string[]) {
        var message = ""

        if (messageErreurs.length != 0) {
            (messageErreurs && messageErreurs.map((erreur) => {
                message += intl.formatMessage({ id: erreur })
            }))
        }
        return message;

    }

    if (enChargement) {
        return (
            AfficherChargement()
        );
    }
    else {
        return (
            <div className="flex flex-col h-full min-h-screen px-32 pt-16 mx-10 bg-slate-800">

                {/** Section Message de confirmation */}
                {affiche && reussite ?
                    <div onClick={() => setReussite(false)}>
                        {PopUpReussite(intl.formatMessage({id: "form.reussit_modif"}))}
                    </div>

                    : null}
                {affiche && echec &&
                    <div onClick={() => setEchec(false)}>
                        {PopUpEchec(intl.formatMessage({id: "form.echec_modif"}))}
                    </div>
                }

                {/** Section Nom */}
                <label><FormattedMessage id="liste.nom" /></label>
                <input defaultValue={modifiePersonnage.nom} onChange={(e) => {
                    personnageDemo.nom = e.target.value;
                    setModifiePersonnage(personnageDemo);
                    setMessageErreurNom(TraduireMessage(VerifNom(modifiePersonnage.nom, listePersonnage, nomInitial)))
                }} ></input>
                {BaliseErreur(messageErreurNom)}

                {/** Section Classe */}
                <label><FormattedMessage id="liste.classe" /></label>
                <select defaultValue={modifiePersonnage.classe} onChange={(e) => {
                    personnageDemo.classe = e.currentTarget.value;
                    setModifiePersonnage(personnageDemo);
                    setMessageErreurClasse(TraduireMessage(VerifClasse(modifiePersonnage.classe)));
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

                {/** Section Race */}
                <label><FormattedMessage id="liste.race" /> :</label>
                <input defaultValue={modifiePersonnage.race} onChange={(e) => {
                    personnageDemo.race = e.target.value;
                    setModifiePersonnage(personnageDemo);
                    setMessageErreurRace(TraduireMessage(VerifRace(modifiePersonnage.race)))
                }}></input>
                {BaliseErreur(messageErreurRace)}

                {/** Section Niveau */}
                <label><FormattedMessage id="liste.niveau" /> :</label>
                <input defaultValue={modifiePersonnage.niveau} onChange={(e) => {
                    personnageDemo.niveau = parseInt(e.target.value);
                    setModifiePersonnage(personnageDemo)
                    setMessageErreurNiveau(TraduireMessage(VerifNiveau(modifiePersonnage.niveau)))
                }}></input>
                {BaliseErreur(messageErreurNiveau)}

                {/** Section Pv */}
                <label><FormattedMessage id="form.pv" /> :</label>
                <input defaultValue={modifiePersonnage.pv} onChange={(e) => {
                    personnageDemo.pv = parseInt(e.target.value);
                    setModifiePersonnage(personnageDemo);
                    setMessageErreurPv(TraduireMessage(VerifPv(modifiePersonnage.pv)))
                }}></input>
                {BaliseErreur(messageErreurPv)}

                {/** Section Armes */}
                <div>
                    <label><FormattedMessage id="form.armes" /> :</label>
                    {AjouterArme(0)}
                    {AjouterArme(1)}
                    {AjouterArme(2)}
                </div>

                {/** Section Statistique */}
                <div onChange={() => {
                    setMessageErreurStats(TraduireMessage(VerifStats(modifiePersonnage.stats)))
                }} className="flex flex-col">
                    <b><FormattedMessage id="form.statistique" /> :</b>
                    <label><FormattedMessage id="form.force" /> :</label>
                    <input defaultValue={modifiePersonnage.stats.force} onChange={(e) => { personnageDemo.stats.force = parseInt(e.target.value); setModifiePersonnage(personnageDemo) }}></input>
                    <label><FormattedMessage id="form.dex" /> :</label>
                    <input defaultValue={modifiePersonnage.stats.dexterite} onChange={(e) => { personnageDemo.stats.dexterite = parseInt(e.target.value); setModifiePersonnage(personnageDemo) }}></input>
                    <label><FormattedMessage id="form.consti" /> :</label>
                    <input defaultValue={modifiePersonnage.stats.constitution} onChange={(e) => { personnageDemo.stats.constitution = parseInt(e.target.value); setModifiePersonnage(personnageDemo) }}></input>
                    <label><FormattedMessage id="form.intel" /> :</label>
                    <input defaultValue={modifiePersonnage.stats.intelligence} onChange={(e) => { personnageDemo.stats.intelligence = parseInt(e.target.value); setModifiePersonnage(personnageDemo) }}></input>
                    <label><FormattedMessage id="form.sage" /> :</label>
                    <input defaultValue={modifiePersonnage.stats.sagesse} onChange={(e) => { personnageDemo.stats.sagesse = parseInt(e.target.value); setModifiePersonnage(personnageDemo) }}></input>
                    <label><FormattedMessage id="form.charisme" /> :</label>
                    <input defaultValue={modifiePersonnage.stats.charisme} onChange={(e) => { personnageDemo.stats.charisme = parseInt(e.target.value); setModifiePersonnage(personnageDemo) }}></input>
                    {BaliseErreur(messageErreurStats)}
                </div>

                {/** Section Création */}
                <label><FormattedMessage id="form.date_creation" /></label>
                <input type="date" defaultValue={new Date().toISOString().split('T')[0]} max={new Date().toISOString().split('T')[0]} onChange={(e) => { personnageDemo.creation = new Date(e.target.value); setModifiePersonnage(personnageDemo) }}></input>
                {BaliseErreur(messageErreurDate)}

                {/** Section Mort */}
                <div>
                    <label><FormattedMessage id="liste.mort" /> :</label>
                    <input type="checkbox" defaultValue={0} onChange={(e) => {
                        personnageDemo.mort = Boolean(e.target.value);
                        setModifiePersonnage(personnageDemo);
                        setMessageErreurDate(TraduireMessage(VerifDate(modifiePersonnage.creation)))
                    }}></input>
                </div>

                <button onClick={() => ModifierPersonnage()}><FormattedMessage id="liste.modifier" /></button>
            </div>
        );
    }

}

export default Modifier;