import { modelOptions, prop, getModelForClass } from '@typegoose/typegoose';

@modelOptions({ schemaOptions: { timestamps: true } })
export class AffordableCareData {
  public _id?: string;
  
  @prop({ required: true })
  public name!: string;
  
  @prop({ required: true, unique: true })
  public email!: string;
  
  @prop({ required: true })
  public phone!: number;
  
  @prop({ required: true })
  public zip!: string;
  
  @prop({ required: true })
  public leadID!: string;
}



export const AffordableCareModel = getModelForClass(AffordableCareData);
