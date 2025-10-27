# Ejemplos de Uso de la API

Esta guía proporciona ejemplos prácticos de cómo usar todos los endpoints de la API.

## 🔧 Configuración Inicial

### Usando curl

Todos los ejemplos usan `curl`. Asegúrate de tener curl instalado:

```bash
# Windows (PowerShell)
curl --version

# Si no está instalado, descarga desde: https://curl.se/windows/
```

### URL Base

```
http://localhost:3000
```

## 📍 Endpoints

### 1. Health Check

Verifica que la API esté funcionando.

**Request:**
```bash
curl http://localhost:3000/health
```

**Response:**
```json
{
  "ok": true,
  "status": "healthy",
  "timestamp": "2025-10-26T22:30:00.000Z",
  "uptime": 123.456
}
```

---

### 2. Root / Info

Obtiene información general de la API.

**Request:**
```bash
curl http://localhost:3000/
```

**Response:**
```json
{
  "ok": true,
  "message": "Mi App CI/CD - API funcionando correctamente",
  "version": "1.0.0",
  "endpoints": {
    "health": "/health",
    "api": "/api"
  }
}
```

---

### 3. Saludo Simple

**Request:**
```bash
curl http://localhost:3000/api/hello
```

**Response:**
```json
{
  "ok": true,
  "message": "¡Hola DevOps!"
}
```

---

### 4. Saludo Personalizado

**Request:**
```bash
curl http://localhost:3000/api/hello/Alexis
```

**Response:**
```json
{
  "ok": true,
  "message": "¡Hola Alexis!"
}
```

---

## 👥 CRUD de Usuarios

### 5. Listar Todos los Usuarios

**Request:**
```bash
curl http://localhost:3000/api/users
```

**Response:**
```json
{
  "ok": true,
  "count": 2,
  "users": [
    {
      "id": 1,
      "name": "Juan Pérez",
      "email": "juan@example.com"
    },
    {
      "id": 2,
      "name": "María García",
      "email": "maria@example.com"
    }
  ]
}
```

---

### 6. Obtener Usuario por ID

**Request:**
```bash
curl http://localhost:3000/api/users/1
```

**Response (Éxito):**
```json
{
  "ok": true,
  "user": {
    "id": 1,
    "name": "Juan Pérez",
    "email": "juan@example.com"
  }
}
```

**Response (Usuario no encontrado):**
```json
{
  "ok": false,
  "error": "Usuario no encontrado"
}
```

---

### 7. Crear Nuevo Usuario

**Request:**
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Carlos López\",\"email\":\"carlos@example.com\"}"
```

**Response (Éxito):**
```json
{
  "ok": true,
  "message": "Usuario creado exitosamente",
  "user": {
    "id": 3,
    "name": "Carlos López",
    "email": "carlos@example.com"
  }
}
```

**Response (Error - Faltan datos):**
```json
{
  "ok": false,
  "error": "Nombre y email son requeridos"
}
```

---

### 8. Actualizar Usuario

**Request (Actualizar nombre):**
```bash
curl -X PUT http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Juan Pérez Actualizado\"}"
```

**Request (Actualizar email):**
```bash
curl -X PUT http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"juan.nuevo@example.com\"}"
```

**Request (Actualizar ambos):**
```bash
curl -X PUT http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Juan Pérez V2\",\"email\":\"juan.v2@example.com\"}"
```

**Response (Éxito):**
```json
{
  "ok": true,
  "message": "Usuario actualizado exitosamente",
  "user": {
    "id": 1,
    "name": "Juan Pérez V2",
    "email": "juan.v2@example.com"
  }
}
```

---

### 9. Eliminar Usuario

**Request:**
```bash
curl -X DELETE http://localhost:3000/api/users/2
```

**Response (Éxito):**
```json
{
  "ok": true,
  "message": "Usuario eliminado exitosamente"
}
```

**Response (Usuario no encontrado):**
```json
{
  "ok": false,
  "error": "Usuario no encontrado"
}
```

---

## 🔄 Ejemplos Completos de Flujos

### Flujo 1: Crear y Verificar Usuario

```bash
# 1. Crear usuario
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Test User\",\"email\":\"test@example.com\"}"

# 2. Listar todos los usuarios para verificar
curl http://localhost:3000/api/users

# 3. Obtener el usuario específico (asumiendo ID 3)
curl http://localhost:3000/api/users/3
```

### Flujo 2: Actualizar y Eliminar

```bash
# 1. Actualizar usuario
curl -X PUT http://localhost:3000/api/users/3 \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Test User Updated\"}"

# 2. Verificar actualización
curl http://localhost:3000/api/users/3

# 3. Eliminar usuario
curl -X DELETE http://localhost:3000/api/users/3

# 4. Intentar obtener usuario eliminado (debe dar 404)
curl http://localhost:3000/api/users/3
```

---

## 🐛 Manejo de Errores

### Error 404 - Endpoint no encontrado

**Request:**
```bash
curl http://localhost:3000/api/inexistente
```

**Response:**
```json
{
  "ok": false,
  "error": "Endpoint no encontrado"
}
```

### Error 400 - Datos inválidos

**Request:**
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Solo Nombre\"}"
```

**Response:**
```json
{
  "ok": false,
  "error": "Nombre y email son requeridos"
}
```

---

## 📝 Usando PowerShell (Windows)

Si prefieres usar PowerShell en lugar de curl:

### GET Request
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/users" -Method Get
```

### POST Request
```powershell
$body = @{
    name = "Nuevo Usuario"
    email = "nuevo@example.com"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/users" `
  -Method Post `
  -Body $body `
  -ContentType "application/json"
```

### PUT Request
```powershell
$body = @{
    name = "Usuario Actualizado"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/users/1" `
  -Method Put `
  -Body $body `
  -ContentType "application/json"
```

### DELETE Request
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/users/1" -Method Delete
```

---

## 🧪 Testing con Postman

### Importar Colección

Puedes crear una colección en Postman con estos endpoints:

1. Abre Postman
2. Crea una nueva colección llamada "Mi App CI/CD"
3. Agrega los siguientes requests:

#### Health Check
- **Method:** GET
- **URL:** `http://localhost:3000/health`

#### Get All Users
- **Method:** GET
- **URL:** `http://localhost:3000/api/users`

#### Create User
- **Method:** POST
- **URL:** `http://localhost:3000/api/users`
- **Body (JSON):**
  ```json
  {
    "name": "Test User",
    "email": "test@example.com"
  }
  ```

#### Update User
- **Method:** PUT
- **URL:** `http://localhost:3000/api/users/1`
- **Body (JSON):**
  ```json
  {
    "name": "Updated Name"
  }
  ```

#### Delete User
- **Method:** DELETE
- **URL:** `http://localhost:3000/api/users/1`

---

## 📊 Respuestas Comunes

### Formato de Respuesta Exitosa
```json
{
  "ok": true,
  "message": "Mensaje descriptivo",
  "data": { }
}
```

### Formato de Respuesta con Error
```json
{
  "ok": false,
  "error": "Descripción del error"
}
```

---

## 🔍 Tips y Trucos

### Pretty Print JSON (curl)
```bash
curl http://localhost:3000/api/users | python -m json.tool
```

### Ver Headers de Respuesta
```bash
curl -i http://localhost:3000/health
```

### Guardar Respuesta en Archivo
```bash
curl http://localhost:3000/api/users > users.json
```

### Modo Verbose (ver detalles de la request)
```bash
curl -v http://localhost:3000/health
```

---

Para más información, consulta el [README](README.md) principal del proyecto.
