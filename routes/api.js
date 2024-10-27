const express = require('express');
const router = express.Router();
const googleService = require('../services/googleService');

// Endpoint para guardar datos en Google Sheets
router.post('/guardar-datos', async (req, res) => {
    const { spreadsheetId, range, values } = req.body;

    // Validación de datos
    if (!spreadsheetId || !range || !Array.isArray(values)) {
        return res.status(400).json({ error: 'Datos inválidos: spreadsheetId, range y values son requeridos.' });
    }

    console.log(req.body);

    try {
        const updatedCells = await googleService.updateDataToSheet(spreadsheetId, range, values);
        res.status(200).json({ message: `${updatedCells} celdas actualizadas.` });
    } catch (error) {
        console.error('Error al guardar datos:', error);
        res.status(500).json({ error: 'Error al guardar datos en Google Sheets.' });
    }
});

module.exports = router;
