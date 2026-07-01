// src/server.js
import { env } from './config/env.config.js';
import { app } from './app.js';

console.log('Aplicación inicializada');
console.log(`Nombre de la app: ${app.name}`);
console.log(`Versión: ${app.version}`);
console.log(`Estado inicial: ${app.status}`);
console.log(`Entorno: ${env.nodeEnv}`);
console.log(`Puerto configurado: ${env.port}`);

const run = async () => {
  const servicioDemo = await app.serviceManager.addService({
    name: 'Consulta general',
    description: 'Atención de 45 minutos para consultas médicas generales',
    duration: 45,
    price: 3000,
    category: 'salud',
    available: true,
  });

  console.log('Servicio agregado:', servicioDemo);

  const todosLosServicios = app.serviceManager.getServices();
  console.log('Servicios actuales:', todosLosServicios);

  const servicioPorId = app.serviceManager.getServiceById(servicioDemo.id);
  console.log('Servicio por id:', servicioPorId);

  const servicioActualizado = await app.serviceManager.updateService(servicioDemo.id, {
    price: 3500,
    available: false,
  });
  console.log('Servicio actualizado:', servicioActualizado);

  const servicioEliminado = await app.serviceManager.deleteService(servicioDemo.id);
  console.log('Servicio eliminado:', servicioEliminado);
};

run();
