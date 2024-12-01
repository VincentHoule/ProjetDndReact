import React, { useState } from 'react';
import { IPersonnageLogin } from '../models/iPersonnage.model';


export type ConnectionContextType = {
    compte: string;
    authorization: string;
    setCompte: (nom: string) => void;
    setAuthorization : (authorization : string) => void;
};



export const ConnectionContext = React.createContext<ConnectionContextType>({
    compte: "",
    authorization: "",
    setCompte: () => {},
    setAuthorization: () => { }
});

export default function ConnectionProvider(props: any) {
    const [compte, setCompte] = useState("")
    const [authorization, setAuthorization] = useState("")
    const values = {
        compte,
        authorization,
        setCompte,
        setAuthorization
    };
    return (
        <ConnectionContext.Provider value={values}>
            {props.children}
        </ConnectionContext.Provider>
    );
}