const express = require('express');
const cors = require('cors');
const { logError, errorHandle, boomErrorHandle } = require('./middlewares/errorHandler');
const routerApi = require('./routes');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())

const whitelist = ['http://localhost:8080', 'https://myapp.co'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  }
}

app.use(cors(options))

app.get('/', (req, res)=> {
  res.send('Hola este es mi server en express')
});

app.get('/nueva-ruta', (req, res)=> {
  res.send('Hola este es mi nueva ruta')
});

routerApi(app)

app.use(logError)
app.use(boomErrorHandle)
app.use(errorHandle)


app.listen(port, ()=>{
  console.log('Mi port ' + port)
});
