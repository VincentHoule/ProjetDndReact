import { IArme, IStat } from "../models/iPersonnage.model";
import { IPersonnage } from "../models/iPersonnage.model";



/**
 * Fonction qui affiche une baliste d'erreur sous les champs
 * @param messageErreur le message a afficher
 * @returns une baliste d'erreur sous les champs
 */
export function BaliseErreur(messageErreur: string) {
    if (messageErreur != "") {
        return (
            <div className="p-2 text-sm text-red-400 bg-gray-800 rounded-lg">
                <span className="italic font-medium">{messageErreur}</span>
            </div>
        );
    }
}

/**
 * Fonction qui valide le champ nom
 * le nom doit être unique
 * @param nom le nom a valider
 * @param listePersonnage la liste des personnages
 * @param nomInitial le nom initiale
 * @returns une liste de message d'erreur
 */
export function VerifNom(nom: string, listePersonnage : IPersonnage[], nomInitial : string) : string[] {

    var messageErreur: string[] = []
    if (nom.length < 1 || nom == "") {
        messageErreur.push("message_verif.nom_caractere")
    }

    {listePersonnage && listePersonnage.map((personnage) => {
            if (personnage.nom == nom && nom != nomInitial) {
                messageErreur.push("message_verif.nom_utilise");
            }
        })
    }
    return messageErreur;
}

/**
 * Fonction qui valide le champ classe
 * @param classe la classe a validé.
 * @returns une liste de message d'erreur
 */
export function VerifClasse(classe: string) {
    var messageErreur: string[] = []
    const regex = new RegExp("^(Guerrier)|(Barde)|(Barbare)|(Ensorceleur)|(Clerc)|(Paladin)|(Occultiste)|(Roublard)|(Moine)|(Rodeur)|(Magicien)|(Artificier)|(Druide)$")

    if (!regex.test(classe)) {
        messageErreur.push("message_verif.classe_existe")
    }
    return messageErreur;
}

/**
 * Fonction qui valide le champ race
 * @param race la race a validé
 * @returns une liste de message d'erreur
 */
export function VerifRace(race: String) {
    var messageErreur: string[] = []

    if (race.length < 1 || race == "") {
        messageErreur.push("message_verif.race_caractere")
    }
    return messageErreur;
}

/**
 * Fonction qui valide le champ niveau
 * @param niveau le niveau a validé
 * @returns une liste de message d'erreur
 */
export function VerifNiveau(niveau: number) {
    var messageErreur: string[] = []

    if (niveau < 1 && niveau > 20 || isNaN(niveau)) {
        messageErreur.push("message_verif.niveau_interval")
    }

    return messageErreur;
}

/**
 * Fonction qui valide le champ niveau
 * @param pv les pv a validé
 * @returns une liste de message d'erreur
 */
export function VerifPv(pv: number) {
    var messageErreur: string[] = []

    if (pv < 1 || isNaN(pv)) {
        messageErreur.push("message_verif.pv_minimum")
    }

    return messageErreur;
}

/**
 * Fonction qui valide les champs des armes
 * @param arme une arme a valid.
 * @returns une liste de message d'erreur
 */
export function VerifArme(arme: IArme) {
    var messageErreur: string[] = []
    const regex = new RegExp("^[0-9]{1,}d[4,6,8,10,12]{1,}$")
    if (arme.de != "" || arme.degat != "" || arme.nom != "") {

        if (arme.de.length > 20 || arme.de.length < 1) {
            messageErreur.push("message_verif.de_caractere")
        }

        if (!regex.test(arme.de)) {
            messageErreur.push("message_verif.de_format")
        }

        if (arme.degat.length > 20 || arme.degat.length < 1) {
            messageErreur.push("message_verif.degat_caractere")
        }

        if (arme.nom.length > 20 || arme.nom.length < 1 || arme.nom == "") {
            messageErreur.push("message_verif.arme_nom_caractere")
        }
    }

    return messageErreur;
}

/**
 * Fonction qui valide les champs des stats
 * @param stats les statistiques a validé
 * @returns une liste de message d'erreur
 */
export function VerifStats(stats: IStat) {
    var messageErreur: string[] = []
    if (stats.force > 30 || stats.force < 1 || isNaN(stats.force)) {
        messageErreur.push("message_verif.force_interval")
    }
    if (stats.dexterite > 30 || stats.dexterite < 1 || isNaN(stats.dexterite)) {
        messageErreur.push("message_verif.dex_interval")
    }
    if (stats.constitution > 30 || stats.constitution < 1 || isNaN(stats.constitution)) {
        messageErreur.push("message_verif.const_interval")
    }
    if (stats.intelligence > 30 || stats.intelligence < 1 || isNaN(stats.intelligence)) {
        messageErreur.push("message_verif.intel_interval")
    }
    if (stats.sagesse > 30 || stats.sagesse < 1 || isNaN(stats.sagesse)) {
        messageErreur.push("message_verif.sage_interval")
    }
    if (stats.charisme > 30 || stats.charisme < 1 || isNaN(stats.charisme)) {
        messageErreur.push("message_verif.charisme_interval")
    }

    return messageErreur;
}

/**
 * Fonction qui valide le champs date
 * @param date date a validé
 * @returns une liste de message d'erreur
 */
export function VerifDate(date: Date)
{
    var messageErreur :string[] =[]

    if(date > new Date())
    {
        messageErreur.push("message_verif.date_future")
    }
    return messageErreur;
}



