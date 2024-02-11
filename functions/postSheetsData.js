const formatDate = require('./formatDate')
const accessGoogleSheet = require('./accessGoogleSheets');
const getSheets = require('./getSheets')
const { v4: uuidv4 } = require('uuid');

async function postSheetsData(values1) {

    try {

        const sheets = await accessGoogleSheet();
        const currentData= await getSheets()

        const values = [

            [
                values1.orderId,
                values1.userName,
                values1.phone,
                values1.products.map(product => `${product.name} (${product.quantity} x ${product.unitPrice})`).join(", "),
                values1.quantity,
                values1.subtotal,
                values1.total,
                values1.status,
                formatDate(new Date()),
            ]

        ]

        const lastRowIndex = currentData.length + 1;

        await sheets.spreadsheets.values.update({
            spreadsheetId: '1XVeKtMLqcUZn39eDKH2gXDorLJgcS55XWlRkERSDR38',
            range: `page-trufas!A${lastRowIndex}:I${lastRowIndex}`,
            valueInputOption: "USER_ENTERED",
            resource: {
                values
            }
        })

    } catch (error) {
        
        console.error("Erro ao inserir dados na planilha:", error.message);
        
    }

}

module.exports = postSheetsData
