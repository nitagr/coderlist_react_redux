export interface User {
    id: number,
    name: string,
    email: string,
    countryCode: string,
    mobile: string,
    gender: string,
    profile: string,
    tech: string,
}

export interface SaveUserBody {
    name: string,
    gender: string,
    email:string,
    mobile: string,
    technologies: string,
    profile: string,
}

export interface UserData {
    _id: string,
    name: string,
    gender: string,
    email: string,
    mobile: string,
    technologies: string,
    profile: string,
}

export type UserState = {
    users: User[]
}
  
export type UserAction = {
    type: string
    payload: User
}

export type DispatchType = (args: UserAction) => UserAction
  