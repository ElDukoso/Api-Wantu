const { validationResult } = require('express-validator');

const validateFields = (req, res, next) => {
    const errors = [];
    // Verifica si req.body es un array o un objeto
    const items = Array.isArray(req.body) ? req.body : [req.body];

    items.forEach((item, index) => {
        const result = validationResult(item);
        if (!result.isEmpty()) {
            errors.push({
                index,
                errors: result.mapped()
            });
        }
    });

    if (errors.length > 0) {
        return res.status(400).json({
            ok: false,
            errors
        });
    }

    next();
};

module.exports = validateFields;
