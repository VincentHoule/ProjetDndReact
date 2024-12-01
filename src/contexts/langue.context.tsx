import { useState, createContext } from 'react';

import Francais from '../langs/fr.json';
import Anglais from '../langs/en.json';


export type LangueContexteType = {
    messages: typeof Francais;
    local: string;
    setLocal: (local: string) => void;
}


export const LangueContext = createContext<LangueContexteType>({
    messages: Francais,
    local: "fr",
    setLocal: () => {}
})



export default function LangueProvider(props: any) {
    const [messages, setMessages] = useState(Francais);
    const [local, setLocal] = useState("fr");

    function AttribuerLangue(langue: string)
    {
        setMessages(local === 'fr' ? Francais : Anglais)
        setLocal(langue)
    }

    const values = {
        messages,
        local,
        setLocal : AttribuerLangue,
    };
    return (
        <LangueContext.Provider value={values}>
            {props.children}
        </LangueContext.Provider>

    );
}