import API from "./api";
import WHMOptions from "./interfaces/WHMOptions";
import {
    Account, AccountCreated, Package
} from "./interfaces/Schemas";
import {CreateAccount, CreatePackage} from "./interfaces/Payloads";
import {includes} from "lodash";

export class Client {
    public api: API
    protected options: WHMOptions

    constructor(options: WHMOptions) {
        this.api = new API(options)
        this.options = options
    }

    async checkConnection() {
        try {
            const response = await this.api.get('listaccts')
            return response.metadata.result === 1
        } catch (e) {
            return false
        }
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

    async listAccountsSuspended() {
        try {
            const response = await this.api.get('listsuspended')
            return response.data
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

    async suspendAccount(user: string) {
        try {
            const response = await this.api.get('suspendacct', {user})
            return {
                status: true,
                message: response.metadata.reason
            }
        } catch (e) {
            console.log('Error', e)
        }
    }

    async unsuspendAccount(user: string) {
        try {
            const response = await this.api.get('unsuspendacct', {user})
            return {
                status: true,
                message: response.metadata.reason
            }
        } catch (e) {
            console.log('Error', e)
        }
    }

    async listPackages(): Promise<Package[]> {
        try {
            const response = await this.api.get('listpkgs')
            const packages = response.data.pkg
            const plans = []

            packages.map(item => {
                plans.push({
                    name: item.name,
                    max_passenger_apps: item.MAXPASSENGERAPPS,
                    max_team_users: item.MAX_TEAM_USERS,
                    quota: item.QUOTA,
                    cpmod: item.CPMOD,
                    has_shell: item.HASSHELL,
                    maxaddons: item.MAXADDON,
                    bwlimit: item.BWLIMIT,
                    maxlst: item.MAXLST,
                    maxftp: item.MAXFTP,
                    max_emailacct_quota: item.MAX_EMAILACCT_QUOTA,
                    maxpark: item.MAXPARK,
                    max_email_per_hour: item.MAX_EMAIL_PER_HOUR,
                    digestauth: item.DIGESTAUTH,
                    ip: item.IP,
                    maxsql: item.MAXSQL,
                    lang: item.LANG,
                    maxpop: item.MAXPOP,
                    max_defer_fail_percentage: item.MAX_DEFER_FAIL_PERCENTAGE,
                    feature_list: item.FEATURELIST,
                    maxsub: item.MAXSUB,
                    cgi: item.CGI,
                    package_extensions: item._PACKAGE_EXTENSIONS,
                })
            })

            return plans
        } catch (e) {
            console.log('Error', e)
        }
    }

    async createPackage(options: CreatePackage) {
        try {
            options['language'] = 'pt_br'
            if (options && options.bwlimit && options.quota && options.name) {
                const response = await this.api.get('addpkg', options)
                return {
                    status: true,
                    message: `Plano "${options.name}" criado com sucesso.`
                }
            }
        } catch (e) {
            console.log('Error', e)
        }
    }

    async updatePackage(options: CreatePackage) {
        try {
            options['language'] = 'pt_br'
            if (options && options.bwlimit && options.quota && options.name) {
                const response = await this.api.get('editpkg', options)
                return {
                    status: true,
                    message: `Plano "${options.name}" alterado com sucesso.`
                }
            }
        } catch (e) {
            console.log('Error', e)
        }
    }

    async deletePackage(pkgname: string) {
        try {
            pkgname = this.options.username +'_'+ pkgname
            const response = await this.api.get('killpkg', {pkgname})
            return {
                status: true,
                message: response.metadata.reason
            }
        } catch (e) {
            console.log('Error', e)
        }
    }

    async getPackage(pkgname: string): Promise<Package> {
        try {
            const pkg = this.options.username +'_'+ pkgname
            const response = await this.api.get('getpkginfo', {pkg})
            const item = response.data.pkg
            return {
                name: pkgname,
                max_passenger_apps: item.MAXPASSENGERAPPS,
                max_team_users: item.MAX_TEAM_USERS,
                quota: item.QUOTA,
                cpmod: item.CPMOD,
                has_shell: item.HASSHELL,
                maxaddons: item.MAXADDON,
                bwlimit: item.BWLIMIT,
                maxlst: item.MAXLST,
                maxftp: item.MAXFTP,
                max_emailacct_quota: item.MAX_EMAILACCT_QUOTA,
                maxpark: item.MAXPARK,
                max_email_per_hour: item.MAX_EMAIL_PER_HOUR,
                digestauth: item.DIGESTAUTH,
                ip: item.IP,
                maxsql: item.MAXSQL,
                lang: item.LANG,
                maxpop: item.MAXPOP,
                max_defer_fail_percentage: item.MAX_DEFER_FAIL_PERCENTAGE,
                feature_list: item.FEATURELIST,
                maxsub: item.MAXSUB,
                cgi: item.CGI,
                package_extensions: item._PACKAGE_EXTENSIONS,
            }
        } catch (e) {
            console.log('Error', e)
        }
    }
}