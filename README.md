# 🚀 Mi App CI/CD - Proyecto de Ejemplo Completo

![CI/CD](https://github.com/AlexiP18/Practice_CI-CD/workflows/CI/CD%20Node.js%20con%20DigitalOcean/badge.svg)
![Node Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)

Una aplicación Node.js/Express completa con CI/CD implementado usando GitHub Actions y deployment a DigitalOcean. Este proyecto sirve como ejemplo profesional de las mejores prácticas en desarrollo, testing y deployment automatizado.

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Uso](#-uso)
- [Testing](#-testing)
- [Docker](#-docker)
- [CI/CD](#-cicd)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [API Endpoints](#-api-endpoints)
- [Variables de Entorno](#-variables-de-entorno)
- [Contribución](#-contribución)
- [Licencia](#-licencia)

## ✨ Características

- ✅ **API RESTful** con Express.js
- ✅ **Testing Completo** con Jest y Supertest (89.81% coverage)
- ✅ **Logging Profesional** con Winston
- ✅ **Seguridad** con Helmet y CORS
- ✅ **Linting** con ESLint
- ✅ **Containerización** con Docker
- ✅ **CI/CD** con GitHub Actions
- ✅ **Health Checks** para monitoreo
- ✅ **Manejo de Errores** centralizado
- ✅ **Hot Reload** en desarrollo con Nodemon

## 🛠 Tecnologías

- **Runtime:** Node.js 18+
- **Framework:** Express.js
- **Testing:** Jest + Supertest
- **Logging:** Winston
- **Seguridad:** Helmet, CORS
- **Linting:** ESLint
- **CI/CD:** GitHub Actions
- **Deployment:** DigitalOcean (PM2)
- **Containerización:** Docker

## 📦 Requisitos Previos

- Node.js >= 18.0.0
- npm >= 9.0.0
- Git
- Docker (opcional)

## 🚀 Instalación

1. **Clonar el repositorio:**
```bash
git clone https://github.com/AlexiP18/Practice_CI-CD.git
cd Practice_CI-CD
```

2. **Instalar dependencias:**
```bash
npm install
```

3. **Configurar variables de entorno:**
```bash
cp .env.example .env
# Editar .env con tus configuraciones
```

4. **Crear directorios necesarios:**
```bash
mkdir -p logs
```

## 💻 Uso

### Desarrollo
```bash
npm run dev
```
Inicia el servidor con nodemon en modo desarrollo (hot reload activado).

**Endpoints disponibles:**
- 🌐 **Root:** http://localhost:3000
- 🩺 **Health Check:** http://localhost:3000/health
- � **API Users:** http://localhost:3000/api/users
- 👋 **API Hello:** http://localhost:3000/api/hello

### Producción
```bash
npm start
```
Inicia el servidor en modo producción.

### Verificar Health
```bash
curl http://localhost:3000/health
```

## 🧪 Testing

```bash
# Ejecutar todos los tests
npm test

# Tests en modo watch
npm run test:watch

# Tests con cobertura
npm run test:coverage
```

### Cobertura de Tests
El proyecto mantiene un mínimo de 70% de cobertura en:
- Branches
- Functions
- Lines
- Statements

## 🐳 Docker

### Construir imagen
```bash
npm run docker:build
```

### Ejecutar contenedor
```bash
npm run docker:run
```

### Manual
```bash
# Construir
docker build -t mi-app:latest .

# Ejecutar
docker run -p 3000:3000 --env-file .env mi-app:latest
```

## 🔄 CI/CD

El proyecto usa GitHub Actions para CI/CD automatizado:

### Pipeline de CI
- ✅ Checkout del código
- ✅ Setup de Node.js (matriz: v18, v20)
- ✅ Instalación de dependencias
- ✅ Linting con ESLint
- ✅ Tests con cobertura
- ✅ Upload de cobertura a Codecov (opcional)

### Pipeline de CD
- ✅ Deploy automático a DigitalOcean
- ✅ SSH seguro con keys
- ✅ Pull del código actualizado
- ✅ Instalación de dependencias
- ✅ Restart con PM2

### Secrets Requeridos en GitHub
- `SSH_PRIVATE_KEY`: Clave privada SSH
- `SSH_HOST`: IP del servidor
- `SSH_PORT`: Puerto SSH
- `SSH_USER`: Usuario SSH
- `APP_DIR`: Directorio de la app en servidor

## 📁 Estructura del Proyecto

```
.
├── .github/
│   └── workflows/
│       └── ci-cd.yml          # GitHub Actions workflow
├── src/
│   ├── config/
│   │   └── logger.js          # Configuración de Winston
│   ├── middleware/
│   │   ├── errorHandler.js    # Manejo de errores
│   │   └── requestLogger.js   # Logging de requests
│   ├── routes/
│   │   ├── index.js           # Router principal
│   │   ├── hello.routes.js    # Rutas de saludo
│   │   └── user.routes.js     # Rutas de usuarios
│   ├── app.js                 # Configuración de Express
│   ├── index.js               # Punto de entrada alternativo
│   └── server.js              # Servidor HTTP
├── test/
│   ├── app.test.js            # Tests de integración
│   ├── health.test.js         # Tests de health/root
│   ├── hello.routes.test.js   # Tests de rutas hello
│   └── user.routes.test.js    # Tests de rutas users
├── logs/                      # Logs de la aplicación
├── .dockerignore              # Archivos ignorados por Docker
├── .env.example               # Ejemplo de variables de entorno
├── .eslintrc.json             # Configuración de ESLint
├── .gitignore                 # Archivos ignorados por Git
├── Dockerfile                 # Configuración de Docker
├── jest.config.js             # Configuración de Jest
├── package.json               # Dependencias y scripts
└── README.md                  # Este archivo
```

## 🌐 API Endpoints

### Health & Info
- `GET /` - Información de la API
- `GET /health` - Health check

### Hello
- `GET /api/hello` - Saludo genérico
- `GET /api/hello/:name` - Saludo personalizado

### Users (CRUD Completo)
- `GET /api/users` - Listar todos los usuarios
- `GET /api/users/:id` - Obtener usuario por ID
- `POST /api/users` - Crear nuevo usuario
- `PUT /api/users/:id` - Actualizar usuario
- `DELETE /api/users/:id` - Eliminar usuario

### Ejemplos de Uso

```bash
# Health check
curl http://localhost:3000/health

# Saludo
curl http://localhost:3000/api/hello/Alexis

# Listar usuarios
curl http://localhost:3000/api/users

# Crear usuario
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Juan","email":"juan@example.com"}'

# Actualizar usuario
curl -X PUT http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Juan Actualizado"}'

# Eliminar usuario
curl -X DELETE http://localhost:3000/api/users/1
```

## 🔐 Variables de Entorno

Crea un archivo `.env` basado en `.env.example`:

```env
# Server
PORT=3000
NODE_ENV=development

# Logging
LOG_LEVEL=info

# CORS
ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.com
```

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea tu feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Guidelines
- Mantén la cobertura de tests >=70%
- Sigue las reglas de ESLint
- Documenta cambios significativos
- Actualiza el README si es necesario

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👤 Autor

**AlexiP18**
- GitHub: [@AlexiP18](https://github.com/AlexiP18)

## 🙏 Agradecimientos

- Express.js por el framework
- Jest por el testing framework
- GitHub Actions por el CI/CD
- DigitalOcean por el hosting

---

⭐ Si este proyecto te fue útil, considera darle una estrella en GitHub!
