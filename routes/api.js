const express = require('express');
const router = express.Router();
const googleService = require('../services/googleService'); // Asegúrate de que la ruta sea correcta

// Endpoint para guardar datos en Google Sheets

router.post('/guardar-datos', async (req, res) => {
    const { spreadsheetId, range, values } = req.body;

    // Validación de datos
    if (!spreadsheetId || !range || !Array.isArray(values)) {
        return res.status(400).json({ error: 'Datos inválidos: spreadsheetId, range y values son requeridos.' });
    }

    console.log(req.body);

    try {
        const updatedCells = await googleService.appendDataToSheet(spreadsheetId, range, values);
        res.status(200).json({ message: `${updatedCells} celdas actualizadas.` });
    } catch (error) {
        console.error('Error al guardar datos:', error);
        res.status(500).json({ error: 'Error al guardar datos en Google Sheets.' });
    }
});


router.get('/descargar-datos', async (req, res) => {
    const { selectedSheets } = req.query; // Recibe las hojas seleccionadas desde el cliente
    try {
        // Aquí implementa la lógica para descargar los datos, puede ser un CSV o Excel
        // Por simplicidad, no se implementa en este ejemplo
        res.status(200).json({ message: 'Descarga de hojas seleccionadas completada.' });
    } catch (error) {
        console.error('Error al descargar datos:', error);
        res.status(500).json({ error: 'Error al descargar datos de Google Sheets.' });
    }
});

module.exports = router;
