
export type IArme = {
    nom: string;
    de: string;
    degat: string;
    _id?:string;
  }
  
  // Interface des statistiquess
  export type IStat = {
    force: number;
    dexterite: number;
    constitution: number;
    intelligence: number;
    sagesse: number;
    charisme: number;
    _id?: string;
  }

  export type IPersonnage = {
    nom: string;
    classe: string;
    race: string;
    niveau: number;
    pv: number;
    armes: Array<IArme>;
    stats: IStat;
    creation: Date;
    mort: boolean;
    _id?: string;
  }

  export type IPersonnageLogin = {
    nom : string,
    mtp : string
  }