const app = require('./app');
require('dotenv').config();

app.listen(process.env.PORT, () => {
  console.log('El servidor esta corriendo en el puerto; ', process.env.PORT)
});
