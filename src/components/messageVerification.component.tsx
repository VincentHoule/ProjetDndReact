import { IArme, IStat } from "../models/iPersonnage.model";
import { IPersonnage } from "../models/iPersonnage.model";




export function BaliseErreur(messageErreur: string) {
    if (messageErreur != "") {
        return (
            <div className="p-2 text-sm text-red-400 bg-gray-800 rounded-lg">
                <span className="italic font-medium">{messageErreur}</span>
            </div>
        );
    }
}


export function VerifNom(nom: string, listePersonnage : IPersonnage[], nomInitial : string) {
    var messageErreur = ""
    if (nom.length <= 0 || nom == "") {
        messageErreur += "Le nom doit être d'au moins 1 caractère."
    }

    {listePersonnage && listePersonnage.map((personnage) => {
            if (personnage.nom == nom && nom != nomInitial) {
                messageErreur = `Votre nom doit être unique et ${nom} est déjà utilisé.`
            }
        })
    }

    return messageErreur;


}

export function VerifClasse(classe: string) {
    var messageErreur = ""
    const regex = new RegExp("^(Guerrier)|(Barde)|(Barbare)|(Ensorceleur)|(Clerc)|(Paladin)|(Occultiste)|(Roublard)|(Moine)|(Rodeur)|(Magicien)|(Artificier)|(Druide)$")

    if (!regex.test(classe)) {
        messageErreur += "Votre classe n'existe pas."
    }


    return messageErreur;
}

export function VerifRace(race: String) {
    var messageErreur = ""

    if (race.length <= 0 || race == "") {
        messageErreur += "La race doit être d'au moins 1 caractère."
    }
    return messageErreur;
}

export function VerifNiveau(niveau: number) {
    var messageErreur = ""

    if (niveau < 1 && niveau > 20) {
        messageErreur += "Le niveau doit être entre 1 et 20."
    }

    return messageErreur;
}

export function VerifPv(pv: number) {
    var messageErreur = ""

    if (pv < 1) {
        messageErreur += "Votre nombre de point de vie doit être au minimum 1."
    }

    return messageErreur;
}

export function VerifArme(arme: IArme) {
    var messageErreur = ""
    const regex = new RegExp("^[0-9]{1,}d[4,6,8,10,12]{1,}$")
    if (arme.de != "" || arme.degat != "" || arme.nom != "") {

        if (arme.de.length > 20 && arme.de.length < 1) {
            messageErreur += "Le dé de dégât de l'arme ne peut pas dépasser 20 caractère et en avoir au moins 1."
        }

        if (regex.test(arme.de)) {
            messageErreur += "L'arme n'a pas le bon format pour les dés de dégât qui est par exemple 1d12, 1d8, 2d6, 1d4."
        }

        if (arme.degat.length > 20 && arme.degat.length < 1) {
            messageErreur += "Le type de dégât de l'arme ne peut pas dépasser 20 caractère et en avoir au moins 1."
        }

        if (arme.nom.length > 20 && arme.nom.length < 1) {
            messageErreur += "Le nom de l'arme ne peut pas dépasser 20 caractère et en avoir au moins 1."
        }
    }


    return messageErreur;
}

export function VerifStats(stats: IStat) {
    var messageErreur = ""
    console.log(stats.force)
    if (stats.force > 30 || stats.force < 1) {
        messageErreur += "La force ne peut pas dépenser 30 ou être en-dessous de 1."
    }
    if (stats.dexterite > 30 || stats.dexterite < 1) {
        messageErreur += "La dextérité ne peut pas dépenser 30 ou être en-dessous de 1."
    }
    if (stats.constitution > 30 || stats.constitution < 1) {
        messageErreur += "La constitution ne peut pas dépenser 30 ou être en-dessous de 1."
    }
    if (stats.intelligence > 30 || stats.intelligence < 1) {
        messageErreur += "L'intelligence ne peut pas dépenser 30 ou être en-dessous de 1."
    }
    if (stats.sagesse > 30 || stats.sagesse < 1) {
        messageErreur += "La sagesse ne peut pas dépenser 30 ou être en-dessous de 1."
    }
    if (stats.charisme > 30 || stats.charisme < 1) {
        messageErreur += "Le charisme ne peut pas dépenser 30 ou être en-dessous de 1."
    }

    return messageErreur;
}
