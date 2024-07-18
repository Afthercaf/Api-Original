import { config } from "dotenv";
config();

export const database = {
  
  host: "34.72.68.189",
  user: "root",
  password: "gen@4509",
  database: "TiendaPrueba",
  waitForConnections: true,
  connectionLimit: 10, // Límite de conexiones en el pool
  queueLimit: 0
  
};

export const port =  4000;

export const SECRET = 'some secret key';