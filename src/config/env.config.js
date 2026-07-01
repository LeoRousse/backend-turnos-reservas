// src/config/env.config.js

import dotenv from 'dotenv';

const result = dotenv.config();

if (result.error) {
  throw new Error('No se pudo cargar el archivo .env. Asegúrate de que exista en el directorio raíz.');
}

const requiredEnv = ['PORT', 'NODE_ENV'];
const missing = requiredEnv.filter((key) => !process.env[key]);

if (missing.length > 0) {
  throw new Error(`Variables de entorno faltantes: ${missing.join(', ')}. Define estas variables en tu .env o en el entorno de ejecución.`);
}

export const env = {
  port: Number(process.env.PORT),
  nodeEnv: process.env.NODE_ENV,
};

export const isDevelopment = env.nodeEnv === 'development';
