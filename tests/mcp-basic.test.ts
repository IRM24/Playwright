import { test, expect } from '@playwright/test';
import { PlaywrightMCPClient } from '../mcp-integration/mcpClient';

test.describe('Playwright MCP - Pruebas Básicas', () => {
    let mcpClient: PlaywrightMCPClient;

    test.beforeEach(async () => {
        mcpClient = new PlaywrightMCPClient();
        await mcpClient.connect();
    });

    test.afterEach(async () => {
        if (mcpClient) {
            await mcpClient.disconnect();
        }
    });

    test('MCP-001: Verificar conexión y listar herramientas disponibles', async () => {
        console.log('🧪 Iniciando test de conexión MCP...');
        
        // Listar herramientas disponibles
        const tools = await mcpClient.listTools();
        console.log('🛠️ Herramientas disponibles:', tools.map(t => t.name));
        
        // Verificar que tenemos las herramientas básicas
        const toolNames = tools.map(t => t.name);
        expect(toolNames).toContain('playwright_navigate');
        expect(toolNames).toContain('playwright_click');
        expect(toolNames).toContain('playwright_fill');
        
        console.log('✅ Conexión MCP verificada correctamente');
    });

    test('MCP-002: Navegación básica usando MCP', async () => {
        console.log('🧪 Iniciando test de navegación MCP...');
        
        // Navegar usando MCP
        const navResult = await mcpClient.navigate('https://ecommerce-playground.lambdatest.io/');
        console.log('🌐 Resultado de navegación:', navResult);
        
        // Tomar screenshot para verificar
        const screenshotResult = await mcpClient.screenshot('./test-results/mcp-navigation.png');
        console.log('📸 Screenshot tomado:', screenshotResult);
        
        console.log('✅ Navegación MCP completada');
    });

    test('MCP-003: Interacción con formularios usando MCP', async () => {
        console.log('🧪 Iniciando test de formularios MCP...');
        
        // Navegar a página de login
        await mcpClient.navigate('https://ecommerce-playground.lambdatest.io/index.php?route=account/login');
        
        // Llenar formulario usando MCP
        await mcpClient.fill('#input-email', 'test@example.com');
        await mcpClient.fill('#input-password', 'password123');
        
        // Obtener texto de un elemento
        const emailValue = await mcpClient.getText('#input-email');
        console.log('📧 Valor del email:', emailValue);
        
        // Tomar screenshot del formulario lleno
        await mcpClient.screenshot('./test-results/mcp-form-filled.png');
        
        console.log('✅ Interacción con formularios MCP completada');
    });

    test('MCP-004: Manejo de errores y recuperación', async () => {
        console.log('🧪 Iniciando test de manejo de errores MCP...');
        
        try {
            // Intentar hacer click en un elemento que no existe
            await mcpClient.click('#elemento-inexistente');
        } catch (error) {
            console.log('⚠️ Error esperado capturado:', error.message);
            expect(error).toBeDefined();
        }
        
        // Verificar que el cliente sigue funcionando después del error
        const tools = await mcpClient.listTools();
        expect(tools.length).toBeGreaterThan(0);
        
        console.log('✅ Manejo de errores MCP verificado');
    });
});