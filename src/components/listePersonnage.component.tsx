import axios from 'axios'
import Personnage from './personnage.component';
import { useContext, useEffect, useState } from 'react';
import { ListeContext } from '../contexts/listePersonnage.context';
import { FormattedMessage } from 'react-intl';
import { IPersonnage } from '../models/iPersonnage.model';
import { ConnectionContext } from '../contexts/connectionContext';

export function AfficherChargement() {
  return (
    <div className="flex flex-col h-full min-h-screen px-32 pt-16 mx-10 bg-slate-800">
      <h1><FormattedMessage id="liste.chargement" /></h1>
    </div>
  );
}

export function AfficherListe(listePersonnage : IPersonnage[]) {
  return (
    <>
      {
        listePersonnage.length == 0 ?
          <div className="flex flex-col h-full min-h-screen px-32 pt-16 mx-10 bg-slate-800">
            <h1>Aucun personnage trouvé.</h1>
          </div> :
          listePersonnage && listePersonnage.map((personnage) => {
            return (
                <Personnage key={personnage._id as string} personnage={personnage} />

            );
          })}
    </>
  );
}

export function ListePersonnage() {
  const {authorization} = useContext(ConnectionContext)
  const {listePersonnage, setPersonnages } = useContext(ListeContext)
  const [enChargement, setEnChargement] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      axios.get('https://projet-dnd.netlify.app/api/personnage', { headers : { Authorization: `Bearer ${authorization}`}}).then((response) => {
        setPersonnages(response.data.perso)
        setEnChargement(false);
      });
    }, 1000)

  }, [])

  return (
    <div className="h-full min-h-screen px-16 pt-16 mx-10 bg-slate-800">
      <span className='text-xl'><FormattedMessage id="liste.titre" /></span>
      {enChargement ? AfficherChargement() : AfficherListe(listePersonnage)}

    </div>
  );
}

