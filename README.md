# cpanel-whm
SDK cPanel/WHM for Node.js

This is a library that allows you to remotely control your web hosting server that is running cPanel.

This library is built for personal use. If you would like to use it and there is a missing feature, please submit an issue on the Github repo and I will do my best to add it.

To install via npm `npm install cpanel-whm`

To install via yarn `yarn add cpanel-whm`

## Usage
### JavaScript
```javascript
var WHM = require('cpanel-whm');
var cPanel = new WHM.Client({
    serverUrl: 'https://myserver.com:2087',
    remoteAccessKey: 'remoteAccessKeyHere',
    username: 'resellerOrRootUser'
});

cPanel.createAccount({
    username: 'myuser',
    password: 'mySecurePassword!',
    plan: 'Pro',
    domain: 'clientdomain.com'
}).then(
    function(success){ 
        console.log(success);
        // do something with data
    },
    function(error) {
        console.error(error);
        // do something with data
    }
);

```

### Typescript
```typescript
import { Client, WHMOptions } from 'cpanel-whm';

const cPanelOptions: WHMOptions = {
   serverUrl: 'https://myserver.com:2087',
   remoteAccessKey: 'remoteAccessKeyHere',
   username: 'resellerOrRootUser'
};

const cPanel: Client = new Client(cPanelOptions);

cPanel.createAccount({
           username: 'myuser',
           password: 'mySecurePassword!',
           plan: 'Pro',
           domain: 'clientdomain.com'
       }).then(
           success => { 
               console.log(success);
               // do something with data
           },
           error => {
               console.error(error);
               // do something with data
           }
       );
```