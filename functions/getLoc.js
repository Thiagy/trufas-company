require('dotenv').config()
const axios = require('axios')
const agent = require('./agentPix')

const production = true

const getLoc = async(accessToken, locId)=>{

    const result = await axios({
        method: 'GET',
        url: `${production? process.env.GN_ENDPOINT_PROD : process.env.GN_ENDPOINT_HOMO}/v2/loc/${locId}/qrcode`,
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-type': 'application/json'
        },
        httpsAgent: agent,
        
    })

    return result.data
}

module.exports = getLoc