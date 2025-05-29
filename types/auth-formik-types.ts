export interface registerTypes{
    email: string,
    password: string,
    name: string,
    desiredJobTitle: string,
    aboutMe: string
}

export type loginTypes = Omit<registerTypes, 'name' | 'aboutMe' | 'desiredJobTitle'>
