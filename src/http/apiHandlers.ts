import { QueryClient } from "@tanstack/react-query";
import type { ICreateCompany, IRegisterCompanySuccessResponse } from "./apiHandlerInterfaces";
import type { ICreateTeam } from "@/components/my-components/componentsinerfaces";
import { getTokenFromLocalStorage } from "@/helpers/authentication";

const baseURL = "http://localhost:3000";


export const queryClient = new QueryClient({
  
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

export const registerCompanyHandler = async (createCompanyData: ICreateCompany)=>{
    const response = await fetch(`${baseURL}/api/authentication/register-company`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createCompanyData)
    })

    if(!response.ok){
      let error:  Error | any = new Error("Error while registring company.")
      error.code = response.status
      error.info = await response.json()
      throw error;
    }

    let data: IRegisterCompanySuccessResponse = await response.json()
    return data 
  }
  
export const createTeamHandler = async (createTeamData: ICreateTeam)=> {
    const token = getTokenFromLocalStorage();
    if(!token){
      let error:  Error | any = new Error("Error while creating team. No token found.")
        // error.code = response.status
        // error.info = await response.json()
        throw error;
    }
    const response = await fetch(`${baseURL}/api/admin/create-team`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(createTeamData)
      })

      if(!response.ok){
        let error:  Error | any = new Error("Error while creating team")
        error.code = response.status
        error.info = await response.json()
        throw error;
      }

    let data: IRegisterCompanySuccessResponse = await response.json()
    return data 
  }

