import {Client} from "./client";
import {result} from "lodash";

const client = new Client({
    serverUrl: 'https://server.vipreseller30ssd.com:2087',
    remoteAccessKey: '8B3ZY6T5E0OK5LQU314CDH1ZXW6ZZNEB',
    username: 'easymail',
})

// client.listPackages().then(result => {
//    console.log(result)
// })

client.getPackage('Essencial').then(result => {
    console.log(result)
})

// var plan = {
//     name: 'Teste',
//     quota: '1000',
//     bwlimit: 'unlimited'
// }
// client.updatePackage(plan).then(result => {
//     console.log(result)
// })

//client.checkConnection().then(result => {
//    console.log('success', result)
//})

//client.listAccounts().then(result => {
//   console.log(result)
//})

//client.unsuspendAccount('codemax').then(result => {
//    console.log(result)
//}).catch(err => {
//    console.log('Erro', err)
//})