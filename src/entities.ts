export interface User{
    _id?:any;
    name:string;
    address:string;
    listEmprunt:string;
    listAnnonce:string;
}
export interface Annonce{
    _id?:any;
    name: string;
    description:string;
    comment:string;
    status:string;
    type: string;
}
export interface Emprunt{
    _id?:any;
    accepted:boolean;
    rendu:boolean;
    duration:string;
    user: {
        _id:any;
        name:string;
    }
}