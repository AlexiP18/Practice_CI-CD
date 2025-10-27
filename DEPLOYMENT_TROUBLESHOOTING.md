# 🔧 Troubleshooting de Despliegue

## Problema: Los estilos no se cargan en producción

### ✅ Solución aplicada:

**1. Configuración de Helmet actualizada**
- Agregado `https://cdn.jsdelivr.net` a `scriptSrc` para Chart.js
- Agregado `https://cdnjs.cloudflare.com` a `scriptSrc` para Font Awesome
- Agregado `connectSrc: ["'self'"]` para peticiones AJAX

**2. Verificar en DigitalOcean**

Después de hacer `git push origin main`, verifica:

```bash
# Conéctate a tu servidor
ssh root@TU_IP_DIGITAL_OCEAN

# Ve al directorio del proyecto
cd /ruta/a/tu/proyecto

# Verifica que los archivos públicos existen
ls -la public/

# Deberías ver:
# - styles.css
# - app.js
# - index.html (si aplica)

# Reinicia PM2 (si usas PM2)
pm2 restart all
pm2 logs --lines 50

# O reinicia tu servicio (si usas systemd)
sudo systemctl restart tu-servicio
```

### 🔍 Diagnóstico adicional:

**1. Verifica en el navegador (consola F12):**

Si ves errores tipo:
- `Failed to load resource: net::ERR_BLOCKED_BY_CLIENT`
- `Content Security Policy directive: ...`

**Solución:** Ya corregido en `src/app.js` con Helmet CSP actualizado.

**2. Verifica las rutas:**

Las rutas deben ser **absolutas** con `/`:
```html
✅ CORRECTO: <link rel="stylesheet" href="/styles.css">
❌ INCORRECTO: <link rel="stylesheet" href="styles.css">
```

**3. Verifica que Express sirva archivos estáticos:**

En `src/app.js` debe estar:
```javascript
app.use(express.static(path.join(__dirname, "../public")));
```

**4. Verifica orden del middleware:**

El orden correcto es:
```javascript
1. Helmet (seguridad)
2. CORS
3. Body parsers (express.json, express.urlencoded)
4. express.static ← IMPORTANTE: antes de las rutas
5. Request logger
6. Routes (/api/*, /health, etc.)
7. 404 handler
8. Error handler
```

### 🌐 Verificación en producción:

Accede a tu servidor y verifica estos endpoints:

```bash
# Verifica que el servidor responde
curl http://TU_IP:3000/health

# Verifica que sirve los estilos
curl http://TU_IP:3000/styles.css

# Debería retornar el contenido CSS completo

# Verifica que sirve el JavaScript
curl http://TU_IP:3000/app.js

# Debería retornar el código JavaScript
```

### 📝 Checklist post-despliegue:

- [ ] `git push origin main` ejecutado
- [ ] GitHub Actions completó exitosamente
- [ ] Servidor reiniciado en DigitalOcean
- [ ] `/health` endpoint responde
- [ ] `/styles.css` se carga (verifica en Network tab)
- [ ] `/app.js` se carga
- [ ] Chart.js CDN se carga
- [ ] Font Awesome CDN se carga
- [ ] Consola del navegador sin errores

### 🚀 Comandos rápidos para desplegar el fix:

```bash
# En tu máquina local
git add src/app.js
git commit -m "fix: update Helmet CSP to allow Chart.js CDN"
git push origin main

# Espera a que GitHub Actions complete
# Luego en tu servidor DigitalOcean
ssh root@TU_IP
pm2 restart all
pm2 logs --lines 20
```

### 🔗 URLs importantes:

- **Dashboard:** `http://TU_IP:3000`
- **API Health:** `http://TU_IP:3000/health`
- **API Info:** `http://TU_IP:3000/api-info`
- **API Users:** `http://TU_IP:3000/api/users`

### 📊 Verificar logs en DigitalOcean:

```bash
# Ver logs de PM2
pm2 logs

# Ver logs específicos de la app
pm2 logs mi-app --lines 100

# Ver errores
pm2 logs --err

# Si usas systemd
journalctl -u tu-servicio -n 100 -f
```

### 🎯 Problema específico: CSP bloqueando recursos

Si ves en la consola:
```
Refused to load the script 'https://cdn.jsdelivr.net/...' because it violates the following Content Security Policy directive...
```

**Ya está resuelto** en la nueva configuración de Helmet en `src/app.js`.

### 💡 Tips adicionales:

1. **Cache del navegador:** Haz Ctrl+Shift+R (hard refresh) para limpiar cache
2. **CDN offline:** Si Chart.js CDN falla, considera usar una versión local en `public/libs/`
3. **HTTPS:** Si tu servidor usa HTTPS, asegúrate de que los CDN también usen HTTPS (ya lo hacen)
4. **Firewall:** Verifica que el puerto 3000 esté abierto en DigitalOcean

### 🔄 Proceso completo de despliegue:

```bash
# 1. Local: Hacer cambios y commit
git add .
git commit -m "fix: tu mensaje"
git push origin main

# 2. GitHub Actions se ejecuta automáticamente
# Espera a que termine (verifica en GitHub > Actions)

# 3. SSH a DigitalOcean
ssh root@TU_IP

# 4. Navega al directorio del proyecto
cd /path/to/project

# 5. Verifica que los cambios llegaron
git log -1
git status

# 6. Si usas PM2
pm2 restart all
pm2 save

# 7. Verifica en el navegador
# Abre http://TU_IP:3000 y refresca (Ctrl+Shift+R)
```

---

**Última actualización:** 26 de octubre de 2025
**Estado:** ✅ Resuelto - Helmet CSP actualizado con CDNs necesarios
