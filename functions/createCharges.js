require('dotenv').config()
const axios = require('axios')
const agent = require('./agentPix')

const production = true

const createCharges = async(accessToken, chargesData)=>{

    const data = JSON.stringify(chargesData);

    const result = await axios({
        method: 'POST',
        url: `${production? process.env.GN_ENDPOINT_PROD : process.env.GN_ENDPOINT_HOMO}/v2/cob`,
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-type': 'application/json'
        },
        httpsAgent: agent,
        data: data
    })

    return result.data
}

module.exports = createCharges