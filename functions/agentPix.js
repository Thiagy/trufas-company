require('dotenv').config()

const https = require('https')
const path = require('path')
const fs = require('fs')

const production = true

const pathCert = path.join(__dirname, `../certs/${ production? process.env.GN_CERT_PROD : process.env.GN_CERT_HOMO}`)
const certificado = fs.readFileSync(pathCert)

const agent = new https.Agent({
    pfx: certificado,
    passphrase: ''
})

module.exports = agent