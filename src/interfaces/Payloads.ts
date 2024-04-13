export interface CreateAccount {
    username: string,
    domain: string,
    password: string,
    plan: string
}

export interface CreatePackage {
    name: string,
    quota: string,
    bwlimit: string,
}