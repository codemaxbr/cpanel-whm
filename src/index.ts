import {Client} from "./client";
import {result} from "lodash";

const client = new Client({
    serverUrl: 'https://server.vipreseller30ssd.com:2087',
    remoteAccessKey: '8B3ZY6T5E0OK5LQU314CDH1ZXW6ZZNEB',
    username: 'easymail',
})

client.getAccount('codemax.com.br').then(result => {
    console.log(result)
})

//client.listAccounts().then(result => {
//    console.log(result)
//})

//client.terminateAccount('codemax').then(result => {
//    console.log(result)
//}).catch(err => {
//    console.log('Erro', err)
//})