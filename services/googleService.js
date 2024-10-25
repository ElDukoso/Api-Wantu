const { google } = require('googleapis');
const sheets = google.sheets('v4');
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
      return authClient; // Retorna el cliente autenticado
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

  async appendDataToSheet(spreadsheetId, range, values) {
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

      const response = await sheets.spreadsheets.values.append(request);
      return response.data.updatedCells;
  },

  async downloadExcel(selectedSheets) {
      // Implementa aquí la lógica para descargar las hojas como Excel
      // Asegúrate de reutilizar el cliente autenticado
  }
};

async function appendDataToSheet(spreadsheetId, range, values) {
  const authClient = await auth.getClient();
  const request = {
      spreadsheetId,
      range,
      valueInputOption: 'RAW',
      resource: {
          values: [values],
      },
      auth: authClient,
  };

  try {
      const response = await sheets.spreadsheets.values.append(request);
      console.log(`${response.data.updates.updatedCells} cells appended.`);
  } catch (error) {
      console.error('Error appending data to Google Sheets:', error);
      throw new Error('Failed to append data to Google Sheets');
  }
}

googleService.appendDataToSheet = appendDataToSheet;

module.exports = googleService;
