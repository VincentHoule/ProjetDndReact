import axios from "axios";
import { IPersonnage } from "../models/iPersonnage.model";
import { FormattedMessage, FormattedDate } from "react-intl";
import { PopUpEchec, PopUpReussite } from "./popUp.component";
import { useCookies } from "react-cookie";
import { useState } from "react";

interface IFiche {
    personnage: IPersonnage;
    key: string
}



export default function Personnage(props: IFiche) {
    const [biscuit, _, removeBiscuit] = useCookies(['authorization'])
    const [afficheConfirme, setAfficheConfirme] = useState(false)

    /**
     * Fonction qui demande une confirmation avant la suppression.
     * @param _id id du personnage a supprimé
     */
    function BaliseConfirmation(_id: string) {
        return (
            <div className="rounded-lg">
                <span><FormattedMessage id="liste.supprime_confirme"/></span>
                <div>
                    <button onClick={() => { SupprimerPersonnage(_id); setAfficheConfirme(false) }}><FormattedMessage id="liste.oui"/></button>
                    <button onClick={() => setAfficheConfirme(false)}><FormattedMessage id="liste.non"/></button>
                </div>
            </div>
        );
    }

    /**
     * Fonction qui gere la suppression d'un personnage
     * @param _id _id du personnage a supprimé
     */
    function SupprimerPersonnage(_id: string) {
        if (_id != '') {
            axios.delete(`https://projet-dnd.netlify.app/api/personnage/delete/${_id}`, { headers: { Authorization: `Bearer ${biscuit.authorization}` } }).then(() => {
                PopUpReussite("La suppression a été effectué.")
            }).catch(() => {
                PopUpEchec("La suppression a échoué.")
            })
        }
        else {
            PopUpEchec("La suppression a échoué.")
        }

    }


    return (
        <div className='px-2 pt-5 pb-5 mt-5 mb-5 border-4 rounded-lg shadow-md pb-15 border-slate-400 shadow-slate-500 bg-slate-700'>
            {afficheConfirme &&
                (BaliseConfirmation(props.personnage._id ? props.personnage._id : ''))
            }
            <h1>
                {props.personnage.nom}
            </h1>
            <a href={`/modifier/${props.personnage._id}`}><FormattedMessage id="liste.modifier" /></a>
            <button className="mx-5" onClick={() => setAfficheConfirme(true)}>
                <FormattedMessage id="liste.supprimer" />
            </button>
            <div className="flex flex-row gap-2">
                <div className="flex flex-col gap-2">
                    <span>Information</span>
                    <span><FormattedMessage id="liste.classe" />: {props.personnage.classe}</span>
                    <span><FormattedMessage id="liste.race" />: {props.personnage.race}</span>
                    <span><FormattedMessage id="liste.niveau" />: {props.personnage.niveau}</span>
                    <span><FormattedMessage id="form.pv" />: {props.personnage.pv}</span>
                    <span><FormattedMessage id="form.date_creation" />: <FormattedDate
                        value={props.personnage.creation}
                        year="numeric"
                        month="long"
                        day="2-digit"
                    /></span>

                </div>
                <div className="flex flex-col gap-2">
                    <span className="text-xl"><FormattedMessage id="form.armes" /></span>
                    {props.personnage.armes &&
                        props.personnage.armes.map((arme) => {
                            return (
                                <>
                                    <div className="flex flex-col">
                                        <span><FormattedMessage id="liste.nom" />: {arme.nom}</span>
                                        <span><FormattedMessage id="form.de" />: {arme.de}</span>
                                        <span><FormattedMessage id="form.type" />: {arme.degat}</span>
                                    </div>
                                </>
                            );
                        }
                        )}
                </div>
                <div className="flex flex-col gap-0.5">
                    <span className="text-xl">
                        <FormattedMessage id="form.statistique" />
                    </span>
                    <span>
                        <FormattedMessage id="form.force" />
                        :{props.personnage.stats.force}
                    </span>
                    <span>
                        <FormattedMessage id="form.dex" />
                        :{props.personnage.stats.dexterite}
                    </span>
                    <span>
                        <FormattedMessage id="form.consti" />
                        :{props.personnage.stats.constitution}
                    </span>
                    <span>
                        <FormattedMessage id="form.intel" />
                        :{props.personnage.stats.intelligence}
                    </span>
                    <span>
                        <FormattedMessage id="form.sage" />
                        :{props.personnage.stats.sagesse}
                    </span>
                    <span>
                        <FormattedMessage id="form.charisme" />
                        :{props.personnage.stats.charisme}
                    </span>
                </div>
            </div>
        </div>

    );
}