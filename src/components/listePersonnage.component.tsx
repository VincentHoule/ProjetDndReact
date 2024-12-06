import axios from 'axios'
import Personnage from './personnage.component';
import { useContext, useEffect, useState } from 'react';
import { ListeContext } from '../contexts/listePersonnage.context';
import { FormattedMessage } from 'react-intl';
import { IPersonnage } from '../models/iPersonnage.model';
import { useCookies } from "react-cookie"

/**
 * Fonction qui affiche un message de chargement
 * @returns Un message de chargement
 */
export function AfficherChargement() {
  return (
    <div className="flex flex-col h-full min-h-screen px-32 pt-16 mx-10 bg-slate-800">
      <h1><FormattedMessage id="liste.chargement" /></h1>
    </div>
  );
}

/**
 * Fonction qui affiche une liste de personnage
 * @param listePersonnage la liste de personnage
 * @returns la liste de personnage
 */
export function AfficherListe(listePersonnage: IPersonnage[]) {
  return (
    <>
      {
        listePersonnage.length == 0 ?
          <div className="flex flex-col h-full min-h-screen px-32 pt-16 mx-10 bg-slate-800">
            <h1><FormattedMessage id="liste.aucun_personnage"/></h1>
          </div> :
          listePersonnage && listePersonnage.map((personnage) => {
            return (
              <Personnage key={personnage._id as string} personnage={personnage} />

            );
          })}
    </>
  );
}

/**
 * Fonction qui va chercher les personnages dans la BD
 * @returns La base de la liste
 */
export function ListePersonnage() {
  const [biscuit, _] = useCookies(['authorization'])

  const { listePersonnage, setPersonnages } = useContext(ListeContext)
  const [enChargement, setEnChargement] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      axios.get('https://projet-dnd.netlify.app/api/personnage', { headers: { Authorization: `Bearer ${biscuit.authorization}` } }).then((response) => {
        setPersonnages(response.data.perso)
        setEnChargement(false);
      }).catch(() => {

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

