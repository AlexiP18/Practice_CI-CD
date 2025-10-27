# 📊 Gráficos del Dashboard

La aplicación ahora incluye **4 gráficos interactivos en tiempo real** usando **Chart.js**:

## 🎯 Gráficos Disponibles

### 1. **Server Uptime History** 📈
- **Tipo:** Gráfico de línea
- **Descripción:** Muestra el historial del tiempo de actividad del servidor
- **Actualización:** Cada 5 segundos
- **Color:** Azul gradiente
- **Datos:** Últimos 10 puntos de datos

### 2. **User Activity** 🥧
- **Tipo:** Gráfico de dona (Doughnut)
- **Descripción:** Distribución de usuarios activos, totales y sesiones de invitados
- **Actualización:** Dinámica basada en actividad
- **Colores:** 
  - Verde: Usuarios activos
  - Azul: Total de usuarios
  - Naranja: Sesiones de invitados

### 3. **API Requests** 📊
- **Tipo:** Gráfico de barras
- **Descripción:** Contador de peticiones por método HTTP
- **Métodos:** GET, POST, PUT, DELETE
- **Actualización:** En tiempo real con cada petición
- **Colores:**
  - Azul: GET
  - Verde: POST
  - Naranja: PUT
  - Rojo: DELETE

### 4. **Response Times** ⚡
- **Tipo:** Gráfico de línea
- **Descripción:** Tiempos de respuesta del servidor en milisegundos
- **Rango:** 20-100ms (simulado)
- **Actualización:** Cada 5 segundos
- **Color:** Verde gradiente

## 🔄 Actualizaciones Automáticas

### Dashboard Principal
- **Estadísticas:** Cada 30 segundos
- **Gráficos:** Cada 5 segundos para sensación más dinámica

### Datos en Tiempo Real
Los gráficos se actualizan automáticamente con:
- ✅ Uptime incremental
- ✅ Contadores de peticiones API
- ✅ Tiempos de respuesta simulados
- ✅ Actividad de usuarios

## 🎨 Características de Diseño

### Responsive
- ✅ **Desktop:** 2 gráficos por fila
- ✅ **Tablet:** 2 gráficos por fila
- ✅ **Mobile:** 1 gráfico por fila (stack vertical)

### Interactividad
- 🖱️ **Hover:** Información detallada al pasar el mouse
- 📱 **Touch:** Compatible con dispositivos táctiles
- 🔍 **Zoom:** Los gráficos se adaptan al contenedor
- 💫 **Animaciones:** Transiciones suaves en las actualizaciones

### Efectos Visuales
- ✨ Elevación en hover (transform: translateY(-5px))
- 💡 Sombras dinámicas
- 🌈 Gradientes de colores
- 📐 Bordes redondeados (16px)

## 🛠️ Tecnología Utilizada

### Chart.js v4.4.0
```html
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
```

### Configuración de Charts
```javascript
// Ejemplo de configuración
{
    type: 'line',
    data: { ... },
    options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: { display: true }
        },
        scales: {
            y: { beginAtZero: true }
        }
    }
}
```

## 📦 Archivos Modificados

### HTML
- `public/index.html` - Agregado CDN de Chart.js y canvas para gráficos

### CSS
- `public/styles.css` - Estilos para `.chart-card` y `.charts-grid`

### JavaScript
- `public/app.js` - Lógica de inicialización y actualización de gráficos

## 🚀 Cómo Ver los Gráficos

1. **Inicia el servidor:**
```bash
npm run dev
```

2. **Abre el navegador:**
```
http://localhost:3000
```

3. **Navega al Dashboard:**
- Los gráficos se cargan automáticamente en la sección "Dashboard"
- Espera 5-30 segundos para ver las actualizaciones en tiempo real

## 🎯 Casos de Uso

### Monitoreo en Tiempo Real
- Ver el estado del servidor de un vistazo
- Identificar patrones de uso de la API
- Detectar problemas de rendimiento

### Presentaciones y Demos
- Dashboard profesional para mostrar en reuniones
- Visualización atractiva de métricas
- Perfecto para portfolios

### Análisis de Datos
- Historial de uptime
- Distribución de peticiones HTTP
- Métricas de rendimiento

## 💡 Próximas Mejoras Sugeridas

- [ ] Agregar gráfico de memoria/CPU usage
- [ ] Histórico de errores por endpoint
- [ ] Gráfico de usuarios conectados en tiempo real
- [ ] Export de gráficos a PDF/PNG
- [ ] Dashboard personalizable (drag & drop)
- [ ] Selección de rango de fechas
- [ ] Comparación de métricas (día/semana/mes)

## 🎨 Personalización

### Cambiar Colores
Edita las variables en `public/app.js`:
```javascript
const chartColors = {
    primary: 'rgba(102, 126, 234, 1)',
    success: 'rgba(16, 185, 129, 1)',
    // ... más colores
};
```

### Ajustar Intervalo de Actualización
```javascript
// Dashboard general (actualmente 30s)
setInterval(() => { ... }, 30000);

// Gráficos dinámicos (actualmente 5s)
setInterval(() => { ... }, 5000);
```

### Agregar Nuevos Gráficos
1. Agregar `<canvas>` en `index.html`
2. Crear instancia de Chart en `initializeCharts()`
3. Agregar lógica de actualización en `updateChartsData()`

---

## 📸 Vista Previa

Los gráficos incluyen:
- 📊 Visualización moderna y profesional
- 🎨 Colores consistentes con el tema de la app
- ⚡ Rendimiento optimizado
- 📱 100% responsive

**¡Disfruta de tu nuevo dashboard con gráficos en tiempo real!** 🚀
