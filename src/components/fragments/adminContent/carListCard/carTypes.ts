export interface CarProps{
    id:string;
    model:string;
    type:string;
    image?:string;
    rentPerDay:number;
    startRent?:Date;
    finishRent?:Date;
    createdAt?:Date;
    updatedAt?:Date;
    deletedAt?:Date;
}