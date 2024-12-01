import axios from "axios";
import { IPersonnage } from "../models/iPersonnage.model";
import { FormattedMessage } from "react-intl";

interface IFiche {
    personnage: IPersonnage;
    key : string
}



export default function Personnage(props: IFiche) {


    function SupprimerPersonnage(_id: string) {
        if (_id != '') {
            axios.delete(`https://projet-dnd.netlify.app/api/personnage/delete/${_id}`).then((response) => {
                // pop-up confirmation
            }).catch((e) => {
                // pop-ip d'erreur
            })
        }
        else {
            // pop-up d'erreur
        }

    }

    return (
        <div className='px-2 pt-5 mt-5 border-4 rounded-lg shadow-md border-slate-400 shadow-slate-500 bg-slate-700'>
            <h1>
                {props.personnage.nom}
            </h1>
            <a href={`/modifier/${props.personnage._id}`}><FormattedMessage id="liste.modifier"/></a>
            <button onClick={() => SupprimerPersonnage(props.personnage._id ? props.personnage._id : '')}>
                <FormattedMessage id="liste.supprimer" />
            </button>
            <div className="flex flex-row gap-2">
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