require("dotenv").config();
const express = require("express");
const { SerialPort, ReadlineParser } = require("serialport");
const nocache = require("nocache");
const app = express();
const port = new SerialPort({ path: process.env.COM, baudRate: 115200 });
const parser = new ReadlineParser();

port.pipe(parser);
parser.on("data", console.log);

app.use(nocache());
app.get("/api/send", (req, res) => {
  if (!req.query.protocol) return res.status(400).send("no protocol specified");
  if (!req.query.command) return res.status(400).send("no command specified");
  req.query.protocol = req.query.protocol.toUpperCase();
  if (["SAMSUNG", "NEC"].indexOf(req.query.protocol) == -1)
    return res.status(400).send("unknown protocol");
  port.write(`${req.query.protocol.toUpperCase()};${req.query.command}\n`);
  res.status(200).send("ok");
});
app.use(express.static("web"));

app.listen(8084);
