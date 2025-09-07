# Guía de Uso: Extensión MCP Playwright en VS Code

## 🎯 Configuración Actual Detectada

Basándome en tu screenshot, tienes configurado:
- **Nombre**: playwright
- **Tipo**: stdio
- **Comando**: npx
- **Argumentos**: @playwright/mcptest

## 🚀 Cómo Usar la Extensión MCP

### 1. **Activar el Servidor MCP**
```bash
# En la terminal de VS Code
npx @playwright/mcptest
```

### 2. **Comandos Disponibles en VS Code**

#### **Palette de Comandos (Ctrl+Shift+P)**
- `MCP: Connect to Server` - Conectar al servidor MCP
- `MCP: Disconnect from Server` - Desconectar del servidor
- `MCP: List Available Tools` - Ver herramientas disponibles
- `MCP: Execute Tool` - Ejecutar herramienta específica

#### **Herramientas MCP Disponibles**
- `playwright_navigate` - Navegar a URL
- `playwright_click` - Hacer click en elemento
- `playwright_fill` - Llenar campos de formulario
- `playwright_screenshot` - Tomar captura de pantalla
- `playwright_get_text` - Obtener texto de elemento
- `playwright_wait_for_selector` - Esperar por selector

### 3. **Integración con tu Proyecto**

#### **Usar MCP desde VS Code Terminal**
```bash
# Conectar y probar herramientas básicas
npx @playwright/mcptest

# En otra terminal, ejecutar tus tests MCP
npm run test:mcp-basic
```

#### **Debugging con MCP**
1. Abrir **Command Palette** (`Ctrl+Shift+P`)
2. Ejecutar `MCP: Connect to Server`
3. Usar `MCP: Execute Tool` para probar comandos individuales
4. Ver logs en el panel de salida

### 4. **Flujo de Trabajo Recomendado**

#### **Desarrollo de Tests**
1. **Conectar MCP**: `Ctrl+Shift+P` → `MCP: Connect to Server`
2. **Probar comandos**: Usar `MCP: Execute Tool` para validar selectores
3. **Escribir tests**: Usar los comandos validados en tus archivos `.test.ts`
4. **Ejecutar tests**: `npm run test:mcp-basic`

#### **Debugging de Selectores**
```javascript
// En VS Code, usar MCP para probar selectores antes de escribir el test
// Command Palette → MCP: Execute Tool → playwright_click
// Selector: "#input-email"
// Luego usar en tu test:
await mcpClient.click('#input-email');
```

### 5. **Comandos VS Code Personalizados**

#### **Tasks Configuradas** (Ctrl+Shift+P → Tasks: Run Task)
- `MCP: Start Playwright Server` - Iniciar servidor MCP
- `MCP: Run Basic Tests` - Ejecutar tests básicos
- `MCP: Run AI Integration Tests` - Ejecutar tests con AI

### 6. **Integración con tu Sistema AI**

#### **Usar MCP + AI para Debugging**
```typescript
// 1. Usar MCP para obtener DOM
const pageContent = await mcpClient.getText('body');

// 2. Usar tu AI para analizar
const analysis = await geminiClient.analyzePageStructure(
    pageContent, 
    currentUrl
);

// 3. Probar selectores sugeridos por AI usando MCP
for (const selector of analysis.suggestedSelectors) {
    try {
        await mcpClient.click(selector);
        console.log(`✅ Selector funciona: ${selector}`);
        break;
    } catch (error) {
        console.log(`❌ Selector falla: ${selector}`);
    }
}
```

### 7. **Shortcuts y Tips**

#### **Atajos de Teclado Útiles**
- `Ctrl+Shift+P` → `MCP:` - Ver todos los comandos MCP
- `Ctrl+`` ` - Abrir terminal integrada para comandos npm
- `F5` - Ejecutar debugging de tests

#### **Logs y Debugging**
- **Panel de Salida**: Ver logs de MCP en tiempo real
- **Terminal**: Ejecutar comandos MCP directamente
- **Debug Console**: Ver respuestas detalladas de herramientas MCP

### 8. **Ejemplos Prácticos**

#### **Ejemplo 1: Validar Formulario**
```bash
# En Command Palette
MCP: Execute Tool
Tool: playwright_navigate
Arguments: {"url": "https://ecommerce-playground.lambdatest.io/index.php?route=account/login"}

MCP: Execute Tool  
Tool: playwright_fill
Arguments: {"selector": "#input-email", "text": "test@example.com"}

MCP: Execute Tool
Tool: playwright_screenshot
Arguments: {"path": "./debug-form.png"}
```

#### **Ejemplo 2: Debug de Selectores Rotos**
```bash
# Probar selector original
MCP: Execute Tool
Tool: playwright_click
Arguments: {"selector": "#boton-incorrecto"}
# Si falla, usar AI para generar alternativas

# Probar selectores alternativos
MCP: Execute Tool
Tool: playwright_click  
Arguments: {"selector": "button[type='submit']"}
```

### 9. **Troubleshooting**

#### **Problemas Comunes**
- **Servidor no conecta**: Verificar que `npx @playwright/mcptest` esté ejecutándose
- **Herramientas no aparecen**: Reiniciar VS Code y reconectar MCP
- **Timeouts**: Ajustar `PLAYWRIGHT_TIMEOUT` en configuración

#### **Logs de Debug**
```json
// En .vscode/settings.json
{
  "mcp.enableLogging": true,
  "mcp.logLevel": "debug"
}
```

### 10. **Integración con Tests Existentes**

Tu proyecto ya tiene tests configurados. Usa MCP para:
1. **Prototipar** nuevos tests interactivamente
2. **Debuggear** selectores problemáticos  
3. **Validar** elementos antes de escribir código
4. **Generar** screenshots para documentación

## 🎉 Flujo Completo Recomendado

1. **Abrir VS Code** en tu proyecto
2. **Iniciar MCP**: `Ctrl+Shift+P` → `MCP: Connect to Server`
3. **Probar herramientas**: `MCP: Execute Tool` para validar
4. **Escribir tests**: Usar comandos validados en archivos `.test.ts`
5. **Ejecutar**: `npm run test:mcp-basic`
6. **Debuggear**: Usar MCP para investigar fallos
7. **Iterar**: Repetir el proceso

¡La extensión MCP te permite tener un flujo de desarrollo mucho más interactivo y eficiente!