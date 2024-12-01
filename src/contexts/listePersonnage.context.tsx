import React, { useState } from 'react';
import { IPersonnage } from '../models/iPersonnage.model';


export type listeContextType = {
    listePersonnage: IPersonnage[];
    setPersonnages: (perso: IPersonnage[]) => void;
};

const listeVide: IPersonnage[] = []

export const ListeContext = React.createContext<listeContextType>({
    listePersonnage: listeVide,
    setPersonnages: () => { },
});

export default function ListeProvider(props: any) {
    const [listePersonnage, setPersonnages] = useState(listeVide);

    const values = {
        listePersonnage,
        setPersonnages
    };
    return (
        <ListeContext.Provider value={values}>
            {props.children}
        </ListeContext.Provider>
    );
}