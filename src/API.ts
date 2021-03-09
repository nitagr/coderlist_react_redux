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

export type UserState = {
    users: User[]
}
  
export type UserAction = {
    type: string
    payload: User
}

export type DispatchType = (args: UserAction) => UserAction
  