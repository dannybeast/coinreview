const ws = require('ws');

const wss = new ws.Server({
    port: 5000
},()=> console.log('Started 5000'))