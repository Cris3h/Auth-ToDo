const express = require("express");
const cors = require("cors");
const morgan = require('morgan');
const router = require("./routes");
const server = express();

const PORT = process.env.PORT ?? 8000;

server.use(cors({
  origin: 'https://auth-to-do-client.vercel.app',
  credentials: true,
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'authorization',
  ],
}));
server.use(express.json());
server.use(morgan('dev'));


server.use('/', router);

server.use((err, req, res, next) => {
  res.status(err.statusCode || 500).send({
    error: true,
    message: err.message
  });
});

server.listen(PORT, () => console.log(`server running at port ${PORT}`));
