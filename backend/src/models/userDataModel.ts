import { modelOptions, prop, getModelForClass } from '@typegoose/typegoose';

@modelOptions({ schemaOptions: { timestamps: true } })
export class MedicareAdvantageData {
  public _id?: string;
  
  @prop({ required: true })
  public firstName!: string;
  
  @prop({ required: true })
  public lastName!: string;
  
  @prop({ required: true })
  public email!: string;
  
  @prop({ required: true })
  public phone!: number;
  
  @prop({ required: true })
  public zip!: string;
  
  @prop({ required: true })
  public leadID!: string;
}

export const MedicareAdvantageModel = getModelForClass(MedicareAdvantageData);
