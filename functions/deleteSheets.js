const accessGoogleSheet = require('./accessGoogleSheets');
const getSheets = require('./getSheets')

async function deleteSheets(orderId) {
    
    const sheets = await accessGoogleSheet();

    const currentData = await getSheets();

    const rowIndex = currentData.findIndex(row => row[0] === orderId);

    if (rowIndex !== -1) {
        
        currentData.splice(rowIndex, 1);

        const range = 'page-trufas!A:I';
        const resource = {
            values: currentData,
        };

        await sheets.spreadsheets.values.clear({
            spreadsheetId: '1XVeKtMLqcUZn39eDKH2gXDorLJgcS55XWlRkERSDR38',
            range,
        });

        await sheets.spreadsheets.values.update({
            spreadsheetId: '1XVeKtMLqcUZn39eDKH2gXDorLJgcS55XWlRkERSDR38',
            range,
            valueInputOption: 'USER_ENTERED',
            resource,
        });

    } 

}

module.exports = deleteSheets