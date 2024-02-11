require('dotenv').config()
const axios = require('axios')
const agent = require('./agentPix')

const production = true

const getToken = async () => {

    const data = JSON.stringify({ grant_type: 'client_credentials' })

    const auth = Buffer.from(`${production? process.env.GN_CLIENT_ID_PROD : process.env.GN_CLIENT_ID_HOMO}:${production? process.env.GN_CLIENT_SECRET_PROD : process.env.GN_CLIENT_SECRET_HOMO}`).toString('base64')

    const response = await axios({
        method: 'POST',
        url: `${production? process.env.GN_ENDPOINT_PROD : process.env.GN_ENDPOINT_HOMO}/oauth/token`,
        headers: {
            Authorization: `Basic ${auth}`,
            'Content-type': 'application/json'
        },
        httpsAgent: agent,
        data: data
    })

    return response.data.access_token

}

module.exports = getToken