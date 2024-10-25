const { google } = require('googleapis');
require('dotenv').config();

let authClient = null;

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  },
  projectId: process.env.GOOGLE_PROJECT_ID,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const googleService = {
  async authenticate() {
    if (!authClient) {
      authClient = await auth.getClient();
    }
    return authClient;
  },

  async getDataFromSheet(spreadsheetId, range) {
    const authClient = await this.authenticate();
    const sheets = google.sheets({ version: 'v4', auth: authClient });

    const request = {
      spreadsheetId,
      range,
      auth: authClient,
    };

    const response = await sheets.spreadsheets.values.get(request);
    return response.data.values;
  },

  async updateDataToSheet(spreadsheetId, range, values) {
    const authClient = await this.authenticate();
    const sheets = google.sheets({ version: 'v4', auth: authClient });

    const request = {
      spreadsheetId,
      range,
      valueInputOption: 'RAW',
      requestBody: {
        values,
      },
      auth: authClient,
    };

    const response = await sheets.spreadsheets.values.update(request);
    return response.data.updatedCells;
  }
};

module.exports = googleService;
