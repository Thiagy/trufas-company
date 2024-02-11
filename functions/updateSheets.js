const accessGoogleSheet = require('./accessGoogleSheets');
const getSheets = require('./getSheets');

async function updateSheets(orderId) {

    try {

        const sheets = await accessGoogleSheet();
        const currentData = await getSheets();

        const rowIndex = currentData.findIndex(row => row[0] === orderId);

        if (rowIndex !== -1) {
            currentData[rowIndex][7] = "Pago com pix"; 

            const sheetsUpdate = await sheets.spreadsheets.values.update({
                spreadsheetId: '1XVeKtMLqcUZn39eDKH2gXDorLJgcS55XWlRkERSDR38',
                range: `page-trufas!H${rowIndex + 1}`, 
                valueInputOption: "USER_ENTERED",
                resource: {
                    values: [[currentData[rowIndex][7]]]
                }
            });

            if (sheetsUpdate.data.updatedCells > 0) {

                return { message: "Status atualizado com sucesso." }

            } else {

                throw new Error("Falha ao atualizar status na planilha.")

            }

        } else {

            throw new Error("Registro não encontrado.");

        }

    } catch (error) {

        throw new Error(`Erro ao atualizar status na planilha: ${error.message}`)

    }

}

module.exports = updateSheets;
