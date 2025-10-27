# Guía de Contribución

¡Gracias por tu interés en contribuir a este proyecto! 🎉

## 📋 Cómo Contribuir

### 1. Fork y Clone

```bash
# Fork el repositorio en GitHub, luego:
git clone https://github.com/TU-USUARIO/Practice_CI-CD.git
cd Practice_CI-CD
npm install
```

### 2. Crear una Rama

```bash
git checkout -b feature/mi-nueva-caracteristica
```

### 3. Hacer Cambios

- Escribe código claro y bien documentado
- Mantén el estilo de código consistente
- Agrega tests para nuevas funcionalidades
- Asegúrate de que todos los tests pasen

### 4. Verificar Calidad

```bash
# Ejecutar linting
npm run lint

# Ejecutar tests
npm test

# Verificar cobertura
npm run test:coverage
```

### 5. Commit

```bash
git add .
git commit -m "feat: descripción clara del cambio"
```

### Convenciones de Commits

- `feat:` Nueva funcionalidad
- `fix:` Corrección de bugs
- `docs:` Cambios en documentación
- `style:` Cambios de formato
- `refactor:` Refactorización de código
- `test:` Agregar o modificar tests
- `chore:` Tareas de mantenimiento

### 6. Push y Pull Request

```bash
git push origin feature/mi-nueva-caracteristica
```

Luego crea un Pull Request en GitHub.

## ✅ Checklist de PR

- [ ] El código pasa todos los tests
- [ ] La cobertura de tests se mantiene o mejora
- [ ] El código pasa el linting sin errores
- [ ] La documentación está actualizada
- [ ] Los commits siguen las convenciones
- [ ] El PR tiene una descripción clara

## 🐛 Reportar Bugs

Usa el sistema de Issues de GitHub e incluye:

1. Descripción del bug
2. Pasos para reproducirlo
3. Comportamiento esperado vs actual
4. Versión de Node.js y sistema operativo
5. Screenshots si aplica

## 💡 Sugerir Funcionalidades

1. Revisa si ya existe un issue similar
2. Crea un nuevo issue con etiqueta `enhancement`
3. Describe claramente la funcionalidad
4. Explica por qué sería útil

## 📝 Estándares de Código

### JavaScript

- Usa 2 espacios para indentación
- Usa comillas dobles para strings
- Siempre usa punto y coma
- Nombres de variables en camelCase
- Nombres de constantes en UPPER_SNAKE_CASE

### Tests

- Nombra los tests descriptivamente
- Usa `describe` para agrupar tests relacionados
- Cada test debe probar una sola cosa
- Usa `beforeEach` y `afterEach` cuando sea apropiado

## 🔧 Configuración del Entorno

### Variables de Entorno

Copia `.env.example` a `.env` y configura:

```env
PORT=3000
NODE_ENV=development
```

### Herramientas Recomendadas

- **VS Code** con extensiones:
  - ESLint
  - Prettier
  - GitLens
  - Jest Runner

## 🚀 Proceso de Release

1. Los maintainers revisarán tu PR
2. Se pueden solicitar cambios
3. Una vez aprobado, se hará merge a `main`
4. El CI/CD automáticamente desplegará los cambios

## 📞 Contacto

Si tienes preguntas, abre un issue o contacta a los maintainers.

---

**¡Gracias por contribuir!** 🙌
