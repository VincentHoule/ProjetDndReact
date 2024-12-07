import { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { LangueContext } from "../contexts/langue.context";
import { FormattedMessage } from 'react-intl';
import { useCookies } from "react-cookie";


/**
 * Gestion de la topBar
 */
function TopBar() {
    const {local, setLocal } = useContext(LangueContext)
    const [biscuit, _, removeBiscuit] = useCookies(['authorization'])
    const navigate = useNavigate()
    /**
     * Bouton pour changer de langue
     */
    function GererLangue() {
        if (local == "en") {
            return (
                <button onClick={() => setLocal("fr")} className="p-3 text-lg text-center text-white transition-all rounded-none bg-slate-800 hover:bg-slate-500 rounded-t-2xl hover:text-slate-200">
                    Français</button>
            );
        }
        else if (local == "fr") {
            return (
                <button onClick={() => setLocal("en")} className="p-3 text-lg text-center text-white transition-all rounded-none bg-slate-800 hover:bg-slate-500 rounded-t-2xl hover:text-slate-200">
                    English</button>
            );

        }
    }
    return (
        <div className="h-full bg-blue-400">
            <h1 className=""><FormattedMessage id="topBar.titre" /></h1>

            <div className="grid grid-cols-5 grid-rows-1 pt-10 mx-10 gap-9">
                {(biscuit.authorization != undefined) &&
                    <>
                        <button onClick={() => navigate("/liste")} className="p-3 text-lg text-center text-white transition-all rounded-none bg-slate-800 hover:bg-slate-500 rounded-t-2xl hover:text-slate-200">
                            <FormattedMessage id="topBar.liste" />
                        </button>
                        <button onClick={() => navigate("/ajouter")} className="p-3 text-lg text-center text-white transition-all rounded-none bg-slate-800 hover:bg-slate-500 rounded-t-2xl hover:text-slate-200">
                            <FormattedMessage id="topBar.ajouter" />
                        </button>
                        <button onClick={() => navigate("/recherche")} className="p-3 text-lg text-center text-white transition-all rounded-none bg-slate-800 hover:bg-slate-500 rounded-t-2xl hover:text-slate-200">
                            <FormattedMessage id="topBar.recherche" />
                        </button>
                        <button onClick={() => { removeBiscuit("authorization"); navigate("") }} className="p-3 text-lg text-center text-white transition-all rounded-none bg-slate-800 hover:bg-slate-500 rounded-t-2xl hover:text-slate-200">
                            <FormattedMessage id="topBar.deconnexion" />
                        </button>
                    </>}
                {GererLangue()}

            </div>
            <Outlet />
        </div>

    );
}

export default TopBar;