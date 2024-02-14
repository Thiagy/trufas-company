const path = require('path')
const fs = require('fs')
const https = require('https')
const createWebHook = require('./functions/createWebhook')


const options = {
    // tls
    key: fs.readFileSync(' /etc/letsencrypt/live/api-trufas-company.thiagosoftwareengineer.shop/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/api-trufas-company.thiagosoftwareengineer.shop/fullchain.pem'),
    // mtls
    ca: fs.readFileSync(path.join(__dirname, './ca-gerencianet.crt')),
    minVersion: 'TLSv1.2',
    requestCert: true,
    rejectUnauthorized: false
    // ok
};



const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();

app.use(cors())
const googleSheet = require('./routes/googlesheets');
const pix = require('./routes/pix');

app.use(bodyParser.json());

app.use('/', googleSheet);
app.use('/', pix);

const server = https.createServer(options, app)

server.listen(443, ()=>{
    console.log("Server running...")
    console.log("creating webhook for pix")
    createWebHook().then(()=>{

        console.log("webhook created.")

    })
})

//app.listen(8000, () => { console.log(`Rodando servidor trufas na porta: ${8000}`)});
