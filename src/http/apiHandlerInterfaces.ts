export interface ICreateCompany {
    companyName: string;
    location:string;
    adminEmail:string;
    fullName:string;
    password:string;
}

export interface IRegisterCompanySuccessResponse {
    success: boolean,
    message: string,
    token: string
}