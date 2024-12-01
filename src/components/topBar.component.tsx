import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { LangueContext } from "../contexts/langue.context";
import { FormattedMessage } from 'react-intl';

function TopBar() {
    const { local, setLocal } = useContext(LangueContext);

    function GererLangue() {
        if (local == "en") {
            return (
                <button onClick={() => setLocal("fr")} className="p-3 text-lg text-center text-white transition-all rounded-none bg-slate-800 hover:bg-slate-500 rounded-t-2xl hover:text-slate-200">
                    Français</button>
            );
        }
        else {
            return (
                <button onClick={() => setLocal("en")} className="p-3 text-lg text-center text-white transition-all rounded-none bg-slate-800 hover:bg-slate-500 rounded-t-2xl hover:text-slate-200">
                    English</button>
            );

        }
    }

    return (
        <div className="h-full bg-blue-400">
            <div className="grid grid-cols-5 grid-rows-1 pt-10 mx-10 gap-9">
                <h1 className=""><FormattedMessage id="topBar.titre" /></h1>
                <a href="/liste" className="p-3 text-lg text-center text-white transition-all bg-slate-800 hover:bg-slate-500 rounded-t-2xl hover:text-slate-200">
                    <FormattedMessage id="topBar.liste" />
                </a>
                <a href="/ajouter" className="p-3 text-lg text-center text-white transition-all bg-slate-800 hover:bg-slate-500 rounded-t-2xl hover:text-slate-200">
                    <FormattedMessage id="topBar.ajouter" />
                </a>
                <a href="/recherche" className="p-3 text-lg text-center text-white transition-all bg-slate-800 hover:bg-slate-500 rounded-t-2xl hover:text-slate-200">
                    Recherche
                </a>
                {GererLangue()}

            </div>
            <Outlet />
        </div>




    );
}

export default TopBar;