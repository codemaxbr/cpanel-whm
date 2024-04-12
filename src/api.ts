import * as http from 'request'
import {merge} from "lodash";
import Utils from "./utils";
import WHMOptions from "./interfaces/WHMOptions";

http.defaults({
    encoding: 'utf-8',
    json: true
})

export default class API {
    private defaultOptions: any = {
        apiType: 'json-api',
        version: 1
    }

    constructor(private options: WHMOptions) {
        merge(this.options, this.defaultOptions)
    }

    get(action: string, query?: string | any): Promise<any> {
        if (query && typeof query != "string") query = Utils.objectToQs(query)

        let requestOptions: any = {
            url: this.options.serverUrl +'/'+ this.options.apiType +'/'+ action +'?api.version='+ this.options.version +'&'+ query,
            headers: {
                Authorization: 'WHM ' + this.options.username + ':' + this.options.remoteAccessKey
            }
        }

        return new Promise<any>((resolve, reject) => {
            http.get(requestOptions, (err, res, body) => {
                body = JSON.parse(body)

                if (err) {
                    console.log('Error')
                    reject({error: err})
                } else if (!body.metadata?.result) {
                    reject({error: body.metadata.reason})
                } else {
                    resolve(body)
                }
            })
        })
    }
}