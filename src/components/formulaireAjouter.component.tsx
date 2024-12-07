import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { VerifNom, BaliseErreur, VerifClasse, VerifRace, VerifNiveau, VerifPv, VerifArme, VerifStats, VerifDate } from "./messageVerification.component";
import { ListeContext } from "../contexts/listePersonnage.context";
import { PopUpEchec, PopUpReussite } from "./popUp.component";
import { FormattedMessage, useIntl } from "react-intl";
import { useCookies } from "react-cookie";
function Ajouter() {
    const { listePersonnage, setPersonnages } = useContext(ListeContext)

    // cookies
    const [biscuit, _] = useCookies(['authorization'])

    // traduction pour les messages d'erreur
    const intl = useIntl()

    const [personnageDemo, setPersonnageDemo] = useState({
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
            force: 8,
            dexterite: 8,
            constitution: 8,
            intelligence: 8,
            sagesse: 8,
            charisme: 8
        },
        creation: new Date(Date.parse("2023-08-08T08:24:00.000Z")),
        mort: false
    });

    // Afficher le pop up de réussite de la requête
    const [reussite, setReussite] = useState(false)
    const [echec, setEchec] = useState(false)

    // Hook des messages d'erreur
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

    useEffect(() => {
        setTimeout(() => {
            axios.get('https://projet-dnd.netlify.app/api/personnage', { headers: { Authorization: `Bearer ${biscuit.authorization}` } }).then((response) => {
                setPersonnages(response.data.perso)

            });
        }, 300)

    }, [])

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

    /**
     * Fonction qui ajoute un personnage dans la bd
     */
    function AjouterPersonnage() {

        setEchec(false)
        setReussite(false)

        // validation des champs
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
            // Ajouter un personnage
            axios.post("https://projet-dnd.netlify.app/api/personnage/add", { perso: personnageDemo }, 
                { headers: { Authorization: `Bearer ${biscuit.authorization}` } }).then(() => {
                setReussite(true)
            })
                .catch((e) => {
                    console.log(e)
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
            <>
                <div onChange={() => {

                    // Validation des champs
                    if (index == 0)
                        setMessageErreurArme1(TraduireMessage(VerifArme(personnageDemo.armes[index])))
                    if (index == 1)
                        setMessageErreurArme2(TraduireMessage(VerifArme(personnageDemo.armes[index])))
                    if (index == 2)
                        setMessageErreurArme3(TraduireMessage(VerifArme(personnageDemo.armes[index])))

                }}>
                    <label><FormattedMessage id="liste.nom" /> :</label>
                    <input onChange={(e) => { personnageDemo.armes[index].nom = e.target.value; setPersonnageDemo(personnageDemo) }}></input>
                    <label><FormattedMessage id="form.de" /> :</label>
                    <input onChange={(e) => { personnageDemo.armes[index].de = e.target.value; setPersonnageDemo(personnageDemo) }}></input>
                    <label><FormattedMessage id="form.type" /> :</label>
                    <input onChange={(e) => { personnageDemo.armes[index].degat = e.target.value; setPersonnageDemo(personnageDemo) }}></input>
                    {/* Affichage des messages d'erreur pour les armes */}
                    {index == 0 ? BaliseErreur(messageErreurArme1) : null}
                    {index == 1 ? BaliseErreur(messageErreurArme2) : null}
                    {index == 2 ? BaliseErreur(messageErreurArme3) : null}
                </div>

            </>
        );
    }

    return (
        <div onChange={() => { setPersonnageDemo(personnageDemo) }} className="flex flex-col h-full min-h-screen px-32 pt-16 mx-10 bg-slate-800">
           
           {/** Section Message de confirmation */}
            {reussite &&
                <div onClick={() => setReussite(false)}>
                    {PopUpReussite(intl.formatMessage({id: "form.reussit_ajout"}))}
                </div>
            }

            {echec &&
                <div onClick={() => setEchec(false)}>
                    {PopUpEchec(intl.formatMessage({id: "form.echec_ajout"}))}
                </div>
            }

            {/** Section Nom */}
            <label><FormattedMessage id="liste.nom" /></label>
            <input onChange={(e) => {
                personnageDemo.nom = e.target.value;
                setPersonnageDemo(personnageDemo);
                setMessageErreurNom(TraduireMessage(VerifNom(personnageDemo.nom, listePersonnage, "")))
            }} ></input>
            {BaliseErreur(messageErreurNom)}

            {/** Section Classe */}
            <label><FormattedMessage id="liste.classe" /></label>
            <select onChange={(e) => {
                personnageDemo.classe = e.currentTarget.value;
                setPersonnageDemo(personnageDemo);
                setMessageErreurClasse(TraduireMessage(VerifClasse(personnageDemo.classe)))
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
            <input onChange={(e) => {
                personnageDemo.race = e.target.value;
                setPersonnageDemo(personnageDemo);
                setMessageErreurRace(TraduireMessage(VerifRace(personnageDemo.race)))
            }}></input>
            {BaliseErreur(messageErreurRace)}

            {/** Section Niveau */}
            <label><FormattedMessage id="liste.niveau" /> :</label>
            <input onChange={(e) => {
                personnageDemo.niveau = parseInt(e.target.value);
                setPersonnageDemo(personnageDemo)
                setMessageErreurNiveau(TraduireMessage(VerifNiveau(personnageDemo.niveau)))
            }}></input>
            {BaliseErreur(messageErreurNiveau)}

            {/** Section Pv */}
            <label><FormattedMessage id="form.pv" /> :</label>
            <input onChange={(e) => {
                personnageDemo.pv = parseInt(e.target.value);
                setPersonnageDemo(personnageDemo);
                setMessageErreurPv(TraduireMessage(VerifPv(personnageDemo.pv)))
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
                setMessageErreurStats(TraduireMessage(VerifStats(personnageDemo.stats)))
            }} className="flex flex-col">
                <b><FormattedMessage id="form.statistique" /> :</b>
                <label><FormattedMessage id="form.force" /> :</label>
                <input defaultValue={8} onChange={(e) => { personnageDemo.stats.force = parseInt(e.target.value); setPersonnageDemo(personnageDemo) }}></input>
                <label><FormattedMessage id="form.dex" /> :</label>
                <input defaultValue={8} onChange={(e) => { personnageDemo.stats.dexterite = parseInt(e.target.value); setPersonnageDemo(personnageDemo) }}></input>
                <label><FormattedMessage id="form.consti" /> :</label>
                <input defaultValue={8} onChange={(e) => { personnageDemo.stats.constitution = parseInt(e.target.value); setPersonnageDemo(personnageDemo) }}></input>
                <label><FormattedMessage id="form.intel" /> :</label>
                <input defaultValue={8} onChange={(e) => { personnageDemo.stats.intelligence = parseInt(e.target.value); setPersonnageDemo(personnageDemo) }}></input>
                <label><FormattedMessage id="form.sage" /> :</label>
                <input defaultValue={8} onChange={(e) => { personnageDemo.stats.sagesse = parseInt(e.target.value); setPersonnageDemo(personnageDemo) }}></input>
                <label><FormattedMessage id="form.charisme" /> :</label>
                <input defaultValue={8} onChange={(e) => { personnageDemo.stats.charisme = parseInt(e.target.value); setPersonnageDemo(personnageDemo) }}></input>
                {BaliseErreur(messageErreurStats)}

            </div>

            {/** Section Date de création */}
            <label><FormattedMessage id="form.date_creation" /></label>
            <input type="date" defaultValue={new Date().toISOString().split('T')[0]} max={new Date().toISOString().split('T')[0]} onChange={(e) => { personnageDemo.creation = new Date(e.target.value); setPersonnageDemo(personnageDemo) }}></input>
            {BaliseErreur(messageErreurDate)}

            {/** Section Mort */}
            <div>
                <label><FormattedMessage id="liste.mort" /> :</label>
                <input type="checkbox" defaultValue={0} onChange={(e) => {
                    personnageDemo.mort = Boolean(e.target.value);
                    setPersonnageDemo(personnageDemo);
                    setMessageErreurDate(TraduireMessage(VerifDate(personnageDemo.creation)))
                }}></input>
            </div>

            <button onClick={() => AjouterPersonnage()}><FormattedMessage id="form.creer" /></button>
        </div>
    );
}



export default Ajouter;