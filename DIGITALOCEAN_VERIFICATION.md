# 🔍 Comandos de Verificación para DigitalOcean

Ejecuta estos comandos **EN TU SERVIDOR de DigitalOcean** (vía SSH):

## 1️⃣ Conectarse al servidor

```bash
ssh root@TU_IP_DIGITAL_OCEAN
```

## 2️⃣ Navegar al directorio del proyecto

```bash
cd /ruta/a/tu/proyecto
# O si está en /root:
cd ~/Practice_CI-CD
# O si está en /var/www:
cd /var/www/Practice_CI-CD
```

## 3️⃣ Verificar que los archivos existen

```bash
# Ver archivos en public/
ls -la public/

# Debería mostrar:
# - app.js
# - index.html
# - styles.css    ← ESTE ES IMPORTANTE
```

## 4️⃣ Si styles.css NO existe, hacer pull

```bash
# Ver último commit
git log -1 --oneline

# Si no es el último commit (1b82f2a), hacer pull
git pull origin main

# Verificar de nuevo
ls -la public/
```

## 5️⃣ Verificar que git tiene el archivo

```bash
git ls-files public/

# Debería mostrar:
# public/app.js
# public/index.html
# public/styles.css    ← DEBE APARECER
```

## 6️⃣ Reiniciar el servicio

### Si usas PM2:
```bash
pm2 restart all
pm2 logs --lines 20
```

### Si usas systemd:
```bash
sudo systemctl restart tu-servicio
sudo systemctl status tu-servicio
```

### Si usas node directamente:
```bash
# Detener el proceso actual (Ctrl+C)
# Luego reiniciar:
npm start
```

## 7️⃣ Verificar que el servidor sirve los archivos

```bash
# Verificar health
curl http://localhost:3000/health

# Verificar que sirve styles.css
curl http://localhost:3000/styles.css | head -20

# Debería mostrar el CSS completo
```

## 8️⃣ Verificar headers HTTP

```bash
curl -I http://localhost:3000/styles.css

# Debería mostrar:
# HTTP/1.1 200 OK
# Content-Type: text/css; charset=UTF-8
```

## 9️⃣ Test desde tu máquina local

```bash
# Desde tu computadora local (PowerShell):
curl http://TU_IP:3000/styles.css

# Debería retornar el CSS completo
```

## 🔟 Si aún no funciona, revisar permisos

```bash
# Verificar permisos de archivos
ls -la public/

# Debería mostrar algo como:
# -rw-r--r-- 1 usuario grupo 10449 Oct 26 23:24 styles.css

# Si los permisos están mal, corregirlos:
chmod 644 public/styles.css
chmod 644 public/app.js
chmod 644 public/index.html
```

---

## 🚨 Problemas comunes y soluciones:

### Problema 1: "styles.css no existe en el servidor"
**Solución:**
```bash
git pull origin main
pm2 restart all
```

### Problema 2: "El archivo existe pero retorna 404"
**Solución:** Verificar que Express esté configurado correctamente
```bash
grep "express.static" src/app.js
# Debería mostrar: app.use(express.static(path.join(__dirname, "../public")));
```

### Problema 3: "El archivo existe pero el navegador no lo carga"
**Solución:** 
1. Limpiar cache del navegador: `Ctrl+Shift+R`
2. Verificar en Network tab de DevTools (F12)
3. Verificar que no haya Nginx/Apache en medio

### Problema 4: "Tengo Nginx como proxy"
**Solución:** Verificar configuración de Nginx
```bash
# Ver configuración de Nginx
cat /etc/nginx/sites-available/default

# Debería tener algo como:
# location / {
#     proxy_pass http://localhost:3000;
# }

# Reiniciar Nginx después de verificar
sudo systemctl restart nginx
```

---

## 📊 Verificación completa (script automático)

Si creaste el archivo `verify-deployment.sh`, ejecútalo:

```bash
# Dar permisos de ejecución
chmod +x verify-deployment.sh

# Ejecutar
./verify-deployment.sh
```

---

## 🎯 Checklist final:

- [ ] Conectado a servidor DigitalOcean vía SSH
- [ ] Navegado al directorio del proyecto
- [ ] Ejecutado `git pull origin main`
- [ ] Verificado que `public/styles.css` existe
- [ ] Verificado que tiene contenido (`cat public/styles.css | wc -l`)
- [ ] Reiniciado servicio (PM2/systemd/node)
- [ ] Verificado `curl http://localhost:3000/styles.css`
- [ ] Verificado desde navegador con `Ctrl+Shift+R`
- [ ] Revisado Network tab en DevTools (F12)

---

## 💡 Información adicional necesaria:

**Para ayudarte mejor, necesito saber:**

1. ¿Cómo está ejecutándose tu app en DigitalOcean?
   - [ ] PM2
   - [ ] Systemd service
   - [ ] Node directamente
   - [ ] Docker
   - [ ] Otro: ___________

2. ¿Tienes Nginx o Apache configurado?
   - [ ] Sí, tengo Nginx
   - [ ] Sí, tengo Apache
   - [ ] No, acceso directo al puerto 3000

3. ¿En qué ruta está el proyecto?
   - Ejemplo: `/root/Practice_CI-CD` o `/var/www/Practice_CI-CD`

---

**Ejecuta los comandos y compárteme el resultado para ayudarte a resolver el problema.** 🔧
