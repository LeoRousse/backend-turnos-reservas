// src/routes/services.router.js

import { Router } from 'express';

export function createServicesRouter(serviceManager) {
  const router = Router();

  router.get('/', (req, res) => {
    let services = serviceManager.getServices();

    const { category, available } = req.query;
    if (category) {
      services = services.filter((service) => service.category === category);
    }

    if (available !== undefined) {
      const availableBool = available === 'true';
      services = services.filter((service) => service.available === availableBool);
    }

    return res.json(services);
  });

  router.get('/:sid', (req, res) => {
    const service = serviceManager.getServiceById(req.params.sid);
    if (!service) {
      return res.status(404).json({ error: 'Servicio no encontrado' });
    }
    return res.json(service);
  });

  router.post('/', async (req, res) => {
    try {
      const service = await serviceManager.addService(req.body);
      return res.status(201).json(service);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  });

  router.put('/:sid', async (req, res) => {
    try {
      const updatedService = await serviceManager.updateService(req.params.sid, req.body);
      if (!updatedService) {
        return res.status(404).json({ error: 'Servicio no encontrado' });
      }
      return res.json(updatedService);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  });

  router.delete('/:sid', async (req, res) => {
    try {
      const deletedService = await serviceManager.deleteService(req.params.sid);
      if (!deletedService) {
        return res.status(404).json({ error: 'Servicio no encontrado' });
      }
      return res.json(deletedService);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  });

  return router;
}
