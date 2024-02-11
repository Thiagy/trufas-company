require('dotenv').config();
const { google } = require('googleapis');
const credenciais = require('../credenciais.json');

async function accessGoogleSheet() {

    const auth = new google.auth.GoogleAuth({
        credentials: {
            client_email: process.env.EMAIL_GOOGLE_API,
            private_key: credenciais.private_key
        },
        scopes: ["https://www.googleapis.com/auth/spreadsheets"]
    });

    const sheets = google.sheets({ version: 'v4', auth });

    return sheets

}

module.exports = accessGoogleSheet
