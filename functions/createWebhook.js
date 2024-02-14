require('dotenv').config()
const axios = require('axios')
const agent = require('./agentPix')

const production = true

const createWebHook = async ()=>{

    try {

        const accessToken = await getToken()

        const data = JSON.stringify({
            webhookUrl: 'https://api-trufas-company.thiagosoftwareengineer.shop/webhook/pix'
        });

        const result = await axios({
            method: 'PUT',
            url: `${production? process.env.GN_ENDPOINT_PROD : process.env.GN_ENDPOINT_HOMO}/v2/webhook/${process.env.CHAVE_PIX}`,
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-type': 'application/json'
            },
            httpsAgent: agent,
            data: data
        })

        return result.data

    } catch (error) {

        console.log(error)

    }
    
}

module.exports = createWebHook