import API from "./api";
import WHMOptions from "./interfaces/WHMOptions";
import {
    Account, AccountCreated
} from "./interfaces/Schemas";
import {CreateAccount} from "./interfaces/Payloads";

export class Client {
    private api: API
    protected options: WHMOptions

    constructor(options: WHMOptions) {
        this.api = new API(options)
        this.options = options
    }

    async getAccount(domain: string): Promise<Account>{
        try {
            const response = await this.api.get('accountsummary', {domain})
            return response.data.acct[0]
        } catch (e) {
            console.log('Error', e)
        }
    }

    async listAccounts(): Promise<Account[]> {
        try {
            const response = await this.api.get('listaccts')
            return response.data.acct
        } catch (e) {
            console.log('Error', e)
        }
    }

    async createAccount(options: CreateAccount): Promise<AccountCreated>{
        try {
            const plan = options.plan
            options.plan = this.options.username +'_'+ options.plan
            const response = await this.api.get('createacct', options)
            return {
                domain: options.domain,
                ip: response.data.ip,
                package: plan,
                username: options.username,
                password: options.password,
                nameservers: [
                    {
                        nameserver: response.data.nameserver,
                        entry: response.data.nameserverentry,
                        a: response.data.nameservera
                    },
                    {
                        nameserver: response.data.nameserver2,
                        entry: response.data.nameserverentry2,
                        a: response.data.nameservera2
                    },
                    {
                        nameserver: response.data.nameserver3,
                        entry: response.data.nameserverentry3,
                        a: response.data.nameservera3
                    },
                    {
                        nameserver: response.data.nameserver4,
                        entry: response.data.nameserverentry4,
                        a: response.data.nameservera4
                    },
                ]
            }
        } catch (e) {
            console.log('Error', e)
        }
    }

    async terminateAccount(username: string) {
        try {
            const response = await this.api.get('removeacct', {username})
            return {
                status: true,
                message: response.metadata.reason
            }
        } catch (e) {
            console.log('Error', e)
        }
    }
}