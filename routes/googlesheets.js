const router = require('express').Router();
const postSheetsData = require('../functions/postSheetsData')
const updateSheets = require('../functions/updateSheets')
const deleteSheets = require('../functions/deleteSheets')

//Rota que permite criar um pedido ainda com status de "Aguardando pagamento."
router.post('/googleSheets', async (req, res) => {

    try {

        const data = req.body;

        await postSheetsData(data);

        return res.status(200).send("Dados inseridos com sucesso.");

    } catch (error) {

        console.error("Erro ao tentar criar registro" + error.message)
        return res.status(500).send("Erro ao inserir dados na planilha");

    }

});

//Rota que permite alterar um pedido ainda com status de "Aguardando pagamento."
router.put('/googleSheets/:orderId', async (req, res) => {

    try {
        
        const orderId = req.params.orderId;

        const updateStatusResponse = await updateSheets(orderId);

        return res.status(200).json(updateStatusResponse);

    } catch (error) {

        console.error("Erro ao tentar atualizar status:", error.message);
        return res.status(500).json({ error: `Erro ao atualizar status na planilha: ${error.message}` });

    }

});

// Rota que permite excluir um pedido ainda com status de "Aguardando pagamento."
router.delete('/googleSheets/:orderId', async (req, res) => {

    try {
        
        const orderId = req.params.orderId;
        await deleteSheets(orderId)

        res.status(200).send("Registro excluído!")

    } catch (error) {

        console.error("Erro ao tentar excluir registro:", error.message);
        res.status(500).send("Erro ao tentar excluir o registro.");
        
    }

});

module.exports = router
