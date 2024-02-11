const express = require('express');
const router = express.Router();

const getToken = require('../functions/getTokenPix')
const createCharges = require('../functions/createCharges')
const getLoc = require('../functions/getLoc')

router.post('/cobpix', async (req, res) => {

    const { cpf, nome, original} = req.body

    try {

        const accessToken= await getToken()

        const chargesData = {

            calendario: {
                expiracao: 3600,
            },
            devedor: {
                cpf,
                nome
            },
            valor: {
                original
            },
            chave: process.env.CHAVE_PIX,
            solicitacaoPagador: 'Cobrança do produto de mercado'
        }

        const cobranca = await createCharges(accessToken, chargesData)
        const qrcode = await getLoc(accessToken, cobranca.loc.id)

        res.status(200).json({ imagemQrcode: qrcode.imagemQrcode, txid: cobranca.txid });


    } catch (error) {

        console.log(error)

    }
    
});

module.exports = router;
