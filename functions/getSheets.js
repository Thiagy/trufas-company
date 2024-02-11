const accessGoogleSheet = require('./accessGoogleSheets');

async function getSheets(){

    const sheets = await accessGoogleSheet();

    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: '1XVeKtMLqcUZn39eDKH2gXDorLJgcS55XWlRkERSDR38',
        range: `page-trufas!A:I`,
    });

    const currentData = response.data.values || [];

    return currentData
}

module.exports = getSheets