#!/bin/bash
# Script de verificación para DigitalOcean

echo "🔍 Verificando despliegue en DigitalOcean..."
echo ""

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 1. Verificar directorio actual
echo -e "${YELLOW}1. Directorio actual:${NC}"
pwd
echo ""

# 2. Verificar última versión del código
echo -e "${YELLOW}2. Último commit:${NC}"
git log -1 --oneline
echo ""

# 3. Verificar archivos public/
echo -e "${YELLOW}3. Archivos en public/:${NC}"
if [ -d "public" ]; then
    ls -lah public/
    echo ""
    
    # Verificar archivos específicos
    if [ -f "public/styles.css" ]; then
        echo -e "${GREEN}✅ styles.css existe${NC} ($(wc -l < public/styles.css) líneas)"
    else
        echo -e "${RED}❌ styles.css NO EXISTE${NC}"
    fi
    
    if [ -f "public/app.js" ]; then
        echo -e "${GREEN}✅ app.js existe${NC} ($(wc -l < public/app.js) líneas)"
    else
        echo -e "${RED}❌ app.js NO EXISTE${NC}"
    fi
    
    if [ -f "public/index.html" ]; then
        echo -e "${GREEN}✅ index.html existe${NC} ($(wc -l < public/index.html) líneas)"
    else
        echo -e "${RED}❌ index.html NO EXISTE${NC}"
    fi
else
    echo -e "${RED}❌ Directorio public/ NO EXISTE${NC}"
fi
echo ""

# 4. Verificar que git tenga los archivos
echo -e "${YELLOW}4. Archivos trackeados por git en public/:${NC}"
git ls-files public/
echo ""

# 5. Verificar proceso Node.js
echo -e "${YELLOW}5. Procesos Node.js/PM2:${NC}"
if command -v pm2 &> /dev/null; then
    pm2 list
else
    ps aux | grep node | grep -v grep
fi
echo ""

# 6. Verificar puerto 3000
echo -e "${YELLOW}6. Procesos en puerto 3000:${NC}"
lsof -i :3000 2>/dev/null || netstat -tlnp 2>/dev/null | grep :3000 || echo "No se puede verificar (requiere permisos)"
echo ""

# 7. Test HTTP local
echo -e "${YELLOW}7. Test HTTP local:${NC}"
echo "GET /health:"
curl -s http://localhost:3000/health | jq . 2>/dev/null || curl -s http://localhost:3000/health
echo ""
echo ""

echo "GET /styles.css (primeras 3 líneas):"
curl -s http://localhost:3000/styles.css | head -3
echo ""
echo ""

# 8. Verificar headers de respuesta
echo -e "${YELLOW}8. Headers de /styles.css:${NC}"
curl -I http://localhost:3000/styles.css
echo ""

# 9. Verificar configuración de Express
echo -e "${YELLOW}9. Configuración en src/app.js:${NC}"
grep -A2 "express.static" src/app.js || echo "No se encontró express.static"
echo ""

# 10. Verificar variables de entorno
echo -e "${YELLOW}10. Variables de entorno:${NC}"
echo "NODE_ENV: ${NODE_ENV:-'no definida'}"
echo "PORT: ${PORT:-'no definida (usa 3000 por defecto)'}"
echo ""

echo -e "${GREEN}✅ Verificación completada${NC}"
echo ""
echo "📝 Si styles.css existe pero no se carga en el navegador:"
echo "   1. Verifica que PM2 esté usando el código más reciente (pm2 restart all)"
echo "   2. Limpia cache del navegador (Ctrl+Shift+R)"
echo "   3. Verifica firewall/nginx si aplica"
echo "   4. Revisa logs: pm2 logs --lines 50"
