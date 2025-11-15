import { QueryClient } from "@tanstack/react-query";
import type { ICreateCompany, IRegisterCompanySuccessResponse } from "./apiHandlerInterfaces";

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
