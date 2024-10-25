const googleService = require('../services/googleService');

const dataController = {
  async fetchData(req, res) {
    try {
      const spreadsheetId = 'your_spreadsheet_id';
      const range = 'Sheet1!A1:D5';
      const data = await googleService.getDataFromSheet(spreadsheetId, range);
      res.status(200).json({ data });
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).send('Error fetching data from Google Sheets');
    }
  },
};

module.exports = dataController;
