
export interface IinitialAuthValue {
    token: string | null;
    expirationTime: number | null;
    fullName: string | null;
}

export interface IhandleLoginPayload {
    token: string;
    expirationTime: number;
}