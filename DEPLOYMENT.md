# Guía de Deployment

Esta guía explica cómo desplegar la aplicación en diferentes entornos.

## 📦 Prerrequisitos

- Node.js 18+ instalado
- npm 9+ instalado
- Acceso al servidor (para deployment manual)
- Cuenta de GitHub (para CI/CD automático)

## 🚀 Deployment en DigitalOcean (Automático con GitHub Actions)

### 1. Preparar el Servidor

```bash
# Conectarse al droplet
ssh usuario@tu-droplet-ip

# Instalar Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Instalar PM2
sudo npm install -g pm2

# Crear directorio de la aplicación
mkdir -p /home/usuario/mi-app
cd /home/usuario/mi-app
```

### 2. Configurar GitHub Secrets

En GitHub, ve a: `Settings > Secrets and variables > Actions`

Agrega los siguientes secrets:

- `SSH_PRIVATE_KEY`: Tu clave privada SSH
- `SSH_HOST`: IP de tu droplet
- `SSH_PORT`: Puerto SSH (normalmente 22)
- `SSH_USER`: Usuario SSH
- `APP_DIR`: Ruta de la app (ej: `/home/usuario/mi-app`)

### 3. Generar SSH Key

```bash
# En tu máquina local
ssh-keygen -t ed25519 -C "github-actions"

# Copiar clave pública al servidor
ssh-copy-id -i ~/.ssh/id_ed25519.pub usuario@tu-droplet-ip

# Copiar clave privada a GitHub Secrets
cat ~/.ssh/id_ed25519
```

### 4. Configurar Variables de Entorno en el Servidor

```bash
# En el servidor
cd /home/usuario/mi-app
nano .env
```

Agregar:

```env
PORT=3000
NODE_ENV=production
LOG_LEVEL=info
```

### 5. Deploy Automático

Cada push a `main` activará el workflow de CI/CD:

1. ✅ Tests se ejecutan
2. ✅ Código se despliega al servidor
3. ✅ PM2 reinicia la aplicación

## 🐳 Deployment con Docker

### Local

```bash
# Construir imagen
docker build -t mi-app:latest .

# Ejecutar contenedor
docker run -p 3000:3000 --env-file .env mi-app:latest
```

### Docker Compose

Crear `docker-compose.yml`:

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - PORT=3000
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "node", "-e", "require('http').get('http://localhost:3000/health')"]
      interval: 30s
      timeout: 3s
      retries: 3
```

Ejecutar:

```bash
docker-compose up -d
```

## 🔧 Deployment Manual

### 1. Preparar el Código

```bash
# En tu máquina local
git clone https://github.com/AlexiP18/Practice_CI-CD.git
cd Practice_CI-CD
npm install --production
```

### 2. Transferir al Servidor

```bash
# Comprimir archivos
tar -czf app.tar.gz .

# Transferir al servidor
scp app.tar.gz usuario@tu-servidor:/home/usuario/

# En el servidor
cd /home/usuario
tar -xzf app.tar.gz
npm install --production
```

### 3. Iniciar con PM2

```bash
# Iniciar la aplicación
pm2 start src/server.js --name mi-app

# Configurar para inicio automático
pm2 startup
pm2 save
```

## 📊 Monitoreo

### PM2 Dashboard

```bash
# Ver estado de la aplicación
pm2 status

# Ver logs en tiempo real
pm2 logs mi-app

# Monitorear recursos
pm2 monit
```

### Health Check

```bash
# Verificar que la app esté respondiendo
curl http://localhost:3000/health
```

## 🔄 Actualizar la Aplicación

### Con CI/CD (Automático)

```bash
# En tu máquina local
git add .
git commit -m "feat: nueva funcionalidad"
git push origin main
# El CI/CD se encarga del resto
```

### Manual

```bash
# En el servidor
cd /home/usuario/mi-app
git pull
npm install
pm2 restart mi-app
```

## 🛡️ Seguridad

### Nginx como Reverse Proxy

```nginx
server {
    listen 80;
    server_name tu-dominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### SSL con Let's Encrypt

```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d tu-dominio.com
```

### Firewall

```bash
# Permitir solo puertos necesarios
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

## 🔍 Troubleshooting

### La aplicación no inicia

```bash
# Verificar logs
pm2 logs mi-app --lines 100

# Verificar puerto en uso
sudo lsof -i :3000

# Reiniciar PM2
pm2 restart mi-app
```

### Problemas de permisos

```bash
# Cambiar propietario
sudo chown -R usuario:usuario /home/usuario/mi-app

# Verificar permisos
ls -la /home/usuario/mi-app
```

### High memory usage

```bash
# Reiniciar la aplicación
pm2 restart mi-app

# Ver uso de memoria
pm2 monit

# Limpiar logs antiguos
pm2 flush
```

## 📈 Escalamiento

### Cluster Mode con PM2

```bash
pm2 start src/server.js -i max --name mi-app
```

### Load Balancer

Usa Nginx o un load balancer de tu proveedor cloud para distribuir tráfico entre múltiples instancias.

## 📝 Checklist de Deployment

- [ ] Variables de entorno configuradas
- [ ] SSL/HTTPS configurado
- [ ] Firewall configurado
- [ ] Monitoring configurado
- [ ] Backups configurados
- [ ] CI/CD probado
- [ ] Health checks funcionando
- [ ] Logs configurados
- [ ] PM2 configurado para auto-restart
- [ ] Dominio configurado (DNS)

---

Para más información, consulta el [README](README.md) o abre un [issue](https://github.com/AlexiP18/Practice_CI-CD/issues).
