import { useMutation } from '@tanstack/react-query'
import apiClient from '../apiClient'
import { UserInfo,UserData } from '../types/UserInfo'


export const useSigninMutation = () =>
  useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string
      password: string
    }) =>
      (
        await apiClient.post<UserInfo>(`api/users/signin`, {
          email,
          password,
        })
      ).data,
  })

  export const useSignupMutation = () =>
  useMutation({
    mutationFn: async ({
      name,
      email,
      password,
      leadID
    }: {
      name: string
      email: string
      password: string
      leadID:string
    }) =>
      (
        await apiClient.post<UserInfo>(`api/users/signup`, {
          name,
          email,
          password,
          leadID
        })
      ).data,
  })























    