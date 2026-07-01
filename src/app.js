import { ServiceManager } from './managers/ServiceManager.js';

export const serviceManager = await ServiceManager.create();

export const app = {
  name: 'Sistema Backend de Turnos y Reservas',
  version: '1.0.0',
  status: 'initial setup',
  serviceManager,
};
