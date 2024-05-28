
import express, { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'


import { LeadModel,UserLead } from '../models/leadModel'
import { MedicareAdvantageData,MedicareAdvantageModel } from '../models/userDataModel'
import { FinalExpenseData,FinalExpenseModel } from '../models/finalExpenseModel'

import { AffordableCareData,AffordableCareModel } from '../models/affordableCareModel'




export const leadRouter = express.Router()







leadRouter.get(
    '/leadID/:leadID',
    asyncHandler(async (req: Request, res: Response) => {
  
        
    
      const { leadID } = req.params;
  
    if (!leadID) {
      res.status(400).send({ message: 'leadID is required' });
      return;
    }
  
    try {
      // Check if the leadID already exists in the database
      const existingLead = await LeadModel.findOne({ leadID });
      if (existingLead) {
        res.status(400).send({ message: 'leadID already exists' });
        return;
      }
  
      // Create a new UserLead  
      const newLead = new LeadModel({ leadID });
      await newLead.save(); 
  
      res.status(201).send({ message: 'UserLead created successfully', lead: newLead });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Internal server error' });
    }
  
  
    } 
  
  ));
  
  
  
  
  
  
  

  
  
  
  
  
  leadRouter.post(
    '/medicareAdvantageForm',
    asyncHandler(async (req: Request, res: Response) => {
  
  try{
      const medicareAdvantageForm = await MedicareAdvantageModel.create({
          firstName: req.body.firstName,
          lastName:req.body.lastName,
          email: req.body.email,
          phone:req.body.phone,
          zip:req.body.zipcode,
          leadID:req.body.leadID
         
        } as MedicareAdvantageData)
  
        console.log(medicareAdvantageForm)
  
  
  
    res.status(200).json(req.body)
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal server error' });
      }
     
    
    })
  ) 


  

leadRouter.post(
    '/affordableCareActForm',
    asyncHandler(async (req: Request, res: Response) => {
  try {
      console.log(req.body)
  
      const medicareAdvantageForm = await AffordableCareModel.create({
         name:req.body.name,
         email:req.body.email,
         phone:req.body.phone,
         zip:req.body.zipcode,
         leadID:req.body.leadID
         
        } as AffordableCareData)
  
        console.log(medicareAdvantageForm)
  
  
  
    res.status(200).json(req.body)
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal server error' });
      }
     
    
    })
  ) 
  
  
  
  
  
  
  
  
  
  
  
leadRouter.post(
    '/finalExpenseForm',
    asyncHandler(async (req: Request, res: Response) => {
   console.log(req.body)
  
      const finalExpenseForm = await FinalExpenseModel.create({
         name:req.body.name,
         email:req.body.email,
         phone:req.body.phone, 
         zip:req.body.zipcode,
         leadID:req.body.leadID
         
        } as FinalExpenseData)
  
       
  
  
  
    res.status(200).json(req.body)
     
    
    })
  ) 
  
  
  
  