
import { useMutation } from '@tanstack/react-query'
import apiClient from '../apiClient'
import { UserData } from '../types/UserInfo'














export const useDataMutation = () =>
    useMutation({
      mutationFn: async ({
        firstName, 
          lastName, 
          email, 
          phone, 
          zipcode, 
          leadID
      }: {
        firstName:string, 
          lastName:string, 
          email:string, 
          phone:number, 
          zipcode:string, 
          leadID:string
      }) =>
        (
          await apiClient.post<UserData>(`api/leads/medicareAdvantageForm`, {
            firstName, 
          lastName, 
          email, 
          phone, 
          zipcode, 
          leadID
          })
        ).data,
    })




    export const affordableCareActDataMutation = () =>
      useMutation({
        mutationFn: async ({
            name, 
            email, 
            phone, 
            zipcode, 
            leadID
        }: {
            name:string, 
            email:string, 
            phone:number, 
            zipcode:string, 
            leadID:string
        }) =>
          (
            await apiClient.post<UserData>(`api/leads/affordableCareActForm`, {
            name, 
            email, 
            phone, 
            zipcode, 
            leadID
            })
          ).data,
      })
  
  
  





      export const finalExpenseDataMutation = () =>
        useMutation({
          mutationFn: async ({
              name, 
              email, 
              phone, 
              zipcode, 
              leadID
          }: {
              name:string, 
              email:string, 
              phone:number, 
              zipcode:string, 
              leadID:string
          }) =>
            (
              await apiClient.post<UserData>(`api/leads/finalExpenseForm`, {
              name, 
              email, 
              phone, 
              zipcode, 
              leadID
              })
            ).data,
        })
    