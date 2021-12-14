import { SocketInit } from "./utils/Socket.io";
import http from 'http'; 
import { Server, Socket } from "socket.io";
import express, { Request, Response, NextFunction } from "express";
import { config } from "dotenv";
config()

const routes = require('./routes')
const app = express();
const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

new SocketInit(io);

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(function(req: Request, res: Response, next: NextFunction) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-type,Accept,x-access-token,X-Key"
  );
  if (req.method == "OPTIONS") {
    res.status(200).end();
  } else {
    next();
  }
});

routes(app);

module.exports = server;