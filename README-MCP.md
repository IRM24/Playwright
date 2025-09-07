# Playwright MCP Integration

Este documento describe la integración de Playwright MCP en el proyecto para mejorar las capacidades de testing con AI.

## 🚀 Roadmap de Instalación y Configuración

### Fase 1: Instalación Básica ✅
- [x] Instalar `playwright-mcp` y `@modelcontextprotocol/sdk`
- [x] Crear configuración básica de MCP
- [x] Implementar cliente MCP personalizado

### Fase 2: Tests de Verificación ✅
- [x] Tests básicos de conexión MCP
- [x] Tests de navegación y interacción
- [x] Tests de manejo de errores
- [x] Tests de rendimiento

### Fase 3: Integración con AI ✅
- [x] Combinar MCP con sistema AI existente
- [x] Tests de autocurado inteligente
- [x] Generación de reportes con AI

### Fase 4: Herramientas de Desarrollo ✅
- [x] Test runner personalizado
- [x] Scripts de automatización
- [x] Configuración de npm scripts

## 📁 Estructura de Archivos

```
Internship/
├── mcp-config/
│   └── playwright-mcp-config.json    # Configuración MCP
├── mcp-integration/
│   ├── mcpClient.ts                  # Cliente MCP personalizado
│   └── mcpTestRunner.ts              # Runner de tests
├── tests/
│   ├── mcp-basic.test.ts             # Tests básicos
│   ├── mcp-ai-integration.test.ts    # Integración con AI
│   └── mcp-performance.test.ts       # Tests de rendimiento
├── scripts/
│   └── run-mcp-tests.ts              # Script de ejecución
└── test-results/                     # Resultados y screenshots
```

## 🛠️ Comandos Disponibles

### Instalación y Setup
```bash
npm run mcp:setup          # Instalar dependencias y crear directorios
```

### Ejecución de Tests
```bash
npm run test:mcp           # Todos los tests MCP
npm run test:mcp-basic     # Solo tests básicos
npm run test:mcp-ai        # Solo integración con AI
npm run test:mcp-performance # Solo tests de rendimiento
npm run mcp:runner         # Ejecutar test runner personalizado
```

## 🧪 Tests Implementados

### Tests Básicos (`mcp-basic.test.ts`)
- **MCP-001**: Verificación de conexión y herramientas
- **MCP-002**: Navegación básica
- **MCP-003**: Interacción con formularios
- **MCP-004**: Manejo de errores

### Tests de Integración AI (`mcp-ai-integration.test.ts`)
- **MCP-AI-001**: Análisis de página con AI
- **MCP-AI-002**: Autocurado inteligente
- **MCP-AI-003**: Reportes inteligentes

### Tests de Rendimiento (`mcp-performance.test.ts`)
- **MCP-PERF-001**: Métricas de tiempo de respuesta
- **MCP-PERF-002**: Pruebas de estrés
- **MCP-PERF-003**: Comparación con Playwright nativo

## 🔧 Configuración

### Variables de Entorno Requeridas
```bash
GEMINI_API_KEY=tu_api_key_aqui    # Para integración con AI (opcional)
```

### Configuración MCP
El archivo `mcp-config/playwright-mcp-config.json` contiene:
- Configuración de servidores MCP
- Herramientas habilitadas
- Variables de entorno específicas

## 📊 Características Principales

### Cliente MCP Personalizado
- Conexión automática a playwright-mcp
- Métodos de conveniencia para operaciones comunes
- Manejo robusto de errores
- Logging detallado

### Integración con AI Existente
- Combina MCP con el sistema de self-healing actual
- Análisis inteligente de páginas web
- Generación automática de selectores alternativos
- Reportes enriquecidos con AI

### Test Runner Avanzado
- Ejecución automatizada de suites de tests
- Métricas de rendimiento detalladas
- Generación de reportes JSON
- Cleanup automático de recursos

## 🎯 Casos de Uso

### 1. Testing Tradicional Mejorado
```typescript
const mcpClient = new PlaywrightMCPClient();
await mcpClient.connect();
await mcpClient.navigate('https://example.com');
await mcpClient.fill('#email', 'test@example.com');
await mcpClient.click('#submit');
```

### 2. Autocurado con AI
```typescript
// Si un selector falla, AI genera alternativas automáticamente
const alternatives = await geminiClient.generateAlternativeLocators(
    '#selector-roto',
    domContent,
    'Descripción del elemento',
    pageUrl
);
```

### 3. Análisis Inteligente
```typescript
const analysis = await geminiClient.analyzePageStructure(
    pageContent,
    pageUrl
);
// Obtiene elementos interactivos, formularios, navegación, etc.
```

## 🚦 Próximos Pasos

1. **Ejecutar tests básicos**: `npm run test:mcp-basic`
2. **Verificar integración AI**: `npm run test:mcp-ai`
3. **Evaluar rendimiento**: `npm run test:mcp-performance`
4. **Revisar reportes**: Verificar archivos en `test-results/`

## 🐛 Troubleshooting

### Error de Conexión MCP
- Verificar que `playwright-mcp` esté instalado correctamente
- Comprobar que no hay conflictos de puertos
- Revisar logs de conexión en la consola

### Tests de AI Fallan
- Verificar que `GEMINI_API_KEY` esté configurada
- Comprobar conectividad a internet
- Revisar límites de API de Gemini

### Problemas de Rendimiento
- Ajustar timeouts en configuración MCP
- Verificar recursos del sistema
- Revisar logs de rendimiento detallados

## 📚 Referencias

- [Playwright MCP GitHub](https://github.com/microsoft/playwright-mcp)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [Documentación Playwright](https://playwright.dev/)