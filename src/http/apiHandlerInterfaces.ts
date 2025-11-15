export interface ICreateCompany {
    companyName: string;
    location:string;
    adminEmail:string;
    fullName:string;
    password:string;
}

export interface IRegisterCompanySuccessResponse {
    sucess: boolean,
    message: string,
    token: string
}