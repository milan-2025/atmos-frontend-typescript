export const handleLocalStorageLogin = (token: string, expirtionTime:number) =>{
    localStorage.setItem("token",token);
    localStorage.setItem("expirationTime",expirtionTime.toString());
}

export const getTokenFromLocalStorage = () =>{
    if(localStorage.getItem("token")){
        return localStorage.getItem("token") as string
    }
    return null;
}

export const getExpirationTimeFromLocalStorage = () =>{
    if(localStorage.getItem("expirationTime")){
        return parseInt(localStorage.getItem("expirationTime") as string)
    }
    return null
}

export const isTokenExpired = ()=>{
    const expirationTime  = getExpirationTimeFromLocalStorage()
    if(expirationTime){
        return expirationTime  < new Date().getTime();
    }
    return false;
}

export const getRemainingExpirationTime = () =>{
    const currentTime = new Date().getTime();
    const expirationTime = getExpirationTimeFromLocalStorage();
    if(expirationTime){
        const remaningTime = expirationTime - currentTime;
        if(remaningTime <=0){
            return 0;
        }
        return remaningTime;
    }
    return 0;
}

export const handleLocalStorageLogout = ()=>{

    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
}