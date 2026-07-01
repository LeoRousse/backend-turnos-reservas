# Backend Turnos y Reservas

Proyecto Node.js con sintaxis ESM para un sistema de gestión de turnos y reservas. Incluye un gestor de servicios (`ServiceManager`) que maneja los datos en memoria y valida los campos requeridos.

## Estructura del proyecto

- `src/`
  - `config/env.config.js` — carga y valida variables de entorno
  - `managers/ServiceManager.js` — lógica de servicios con métodos CRUD
  - `data/services.json` — almacenamiento local de ejemplo
  - `app.js` — punto de entrada de la aplicación
- `package.json`
- `.env.example`
- `.gitignore`
- `README.md`

## Instalación

1. Instalar dependencias:

```bash
npm install
```

2. Crear `.env` basado en `.env.example`:

```bash
cp .env.example .env
```

3. Completar `.env` con los valores necesarios.

## Ejecución

```bash
npm start
```

## Variables de entorno necesarias

En `.env` deben estar definidas las siguientes variables:

```env
PORT=8080
NODE_ENV=development
```

En `.env.example` sólo se mantienen las claves sin valores:

```env
PORT=
NODE_ENV=
```

> No subir el archivo `.env` al repositorio.

## Recurso `services`

El gestor de servicios usa la clase `ServiceManager` en `src/managers/ServiceManager.js`. Cada servicio tiene esta forma:

```js
{
  id,
  name,
  description,
  duration,
  price,
  category,
  available
}
```

### Métodos disponibles

- `getServices()` — devuelve todos los servicios.
- `getServiceById(id)` — devuelve el servicio por `id` o `null` si no existe.
- `addService(serviceData)` — agrega un servicio validado; el `id` se genera automáticamente.
- `updateService(id, updatedData)` — actualiza un servicio existente; no permite modificar el `id`.
- `deleteService(id)` — elimina un servicio; devuelve el servicio eliminado o `null` si no existe.

### Ejemplos de uso

```js
import { ServiceManager } from './src/managers/ServiceManager.js';

const manager = new ServiceManager();

const nuevoServicio = manager.addService({
  name: 'Consulta general',
  description: 'Atención médica general',
  duration: 45,
  price: 3000,
  category: 'salud',
  available: true,
});

console.log('Servicio agregado:', nuevoServicio);

const todos = manager.getServices();
console.log('Todos los servicios:', todos);

const servicio = manager.getServiceById(nuevoServicio.id);
console.log('Servicio por id:', servicio);

const actualizado = manager.updateService(nuevoServicio.id, {
  price: 3500,
  available: false,
});
console.log('Servicio actualizado:', actualizado);

const eliminado = manager.deleteService(nuevoServicio.id);
console.log('Servicio eliminado:', eliminado);
```

## Notas

- `src/config/env.config.js` valida al iniciar que `PORT` y `NODE_ENV` existan.
- Si falta alguna variable requerida, la aplicación falla con un mensaje claro.
