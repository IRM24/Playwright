import { test, expect } from '@playwright/test';
import { PlaywrightMCPClient } from '../mcp-integration/mcpClient';

test.describe('Playwright MCP - Pruebas de Rendimiento', () => {
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

    test('MCP-PERF-001: Medir tiempo de respuesta de herramientas MCP', async () => {
        console.log('⏱️ Iniciando test de rendimiento MCP...');
        
        const performanceMetrics = {
            listTools: 0,
            navigate: 0,
            click: 0,
            fill: 0,
            screenshot: 0
        };

        // Medir tiempo de listado de herramientas
        const startListTools = Date.now();
        await mcpClient.listTools();
        performanceMetrics.listTools = Date.now() - startListTools;

        // Medir tiempo de navegación
        const startNavigate = Date.now();
        await mcpClient.navigate('https://ecommerce-playground.lambdatest.io/');
        performanceMetrics.navigate = Date.now() - startNavigate;

        // Navegar a página de login para las siguientes pruebas
        await mcpClient.navigate('https://ecommerce-playground.lambdatest.io/index.php?route=account/login');

        // Medir tiempo de llenado de campo
        const startFill = Date.now();
        await mcpClient.fill('#input-email', 'performance@test.com');
        performanceMetrics.fill = Date.now() - startFill;

        // Medir tiempo de screenshot
        const startScreenshot = Date.now();
        await mcpClient.screenshot('./test-results/performance-test.png');
        performanceMetrics.screenshot = Date.now() - startScreenshot;

        console.log('📊 Métricas de rendimiento MCP:', performanceMetrics);

        // Verificar que los tiempos están dentro de rangos aceptables
        expect(performanceMetrics.listTools).toBeLessThan(5000); // 5 segundos max
        expect(performanceMetrics.navigate).toBeLessThan(10000); // 10 segundos max
        expect(performanceMetrics.fill).toBeLessThan(3000); // 3 segundos max
        expect(performanceMetrics.screenshot).toBeLessThan(5000); // 5 segundos max

        console.log('✅ Pruebas de rendimiento MCP completadas');
    });

    test('MCP-PERF-002: Prueba de estrés con múltiples operaciones', async () => {
        console.log('🔥 Iniciando prueba de estrés MCP...');
        
        const operations = [];
        const startTime = Date.now();

        // Realizar múltiples operaciones en secuencia
        for (let i = 0; i < 5; i++) {
            const opStart = Date.now();
            
            await mcpClient.navigate(`https://ecommerce-playground.lambdatest.io/?test=${i}`);
            await mcpClient.screenshot(`./test-results/stress-test-${i}.png`);
            
            const opTime = Date.now() - opStart;
            operations.push({ iteration: i, time: opTime });
            
            console.log(`🔄 Operación ${i + 1}/5 completada en ${opTime}ms`);
        }

        const totalTime = Date.now() - startTime;
        const avgTime = operations.reduce((sum, op) => sum + op.time, 0) / operations.length;

        console.log(`⏱️ Tiempo total: ${totalTime}ms`);
        console.log(`📊 Tiempo promedio por operación: ${avgTime}ms`);
        console.log('📈 Detalles por operación:', operations);

        // Verificar que el rendimiento se mantiene estable
        expect(totalTime).toBeLessThan(60000); // 1 minuto max para todas las operaciones
        expect(avgTime).toBeLessThan(12000); // 12 segundos promedio max

        console.log('✅ Prueba de estrés MCP completada');
    });

    test('MCP-PERF-003: Comparación MCP vs Playwright nativo', async () => {
        console.log('⚖️ Iniciando comparación MCP vs Playwright nativo...');
        
        // Esta prueba requiere acceso a una página Playwright nativa para comparar
        // Por ahora, solo documentamos los tiempos de MCP
        const mcpMetrics = {
            operations: [],
            totalTime: 0
        };

        const startTime = Date.now();

        // Operaciones usando MCP
        const ops = [
            () => mcpClient.navigate('https://ecommerce-playground.lambdatest.io/'),
            () => mcpClient.fill('#search', 'laptop'),
            () => mcpClient.screenshot('./test-results/comparison-mcp.png')
        ];

        for (let i = 0; i < ops.length; i++) {
            const opStart = Date.now();
            await ops[i]();
            const opTime = Date.now() - opStart;
            mcpMetrics.operations.push({ operation: i, time: opTime });
        }

        mcpMetrics.totalTime = Date.now() - startTime;

        console.log('📊 Métricas MCP:', mcpMetrics);
        console.log('💡 Para comparación completa, ejecutar tests nativos de Playwright en paralelo');

        // Verificar que MCP mantiene rendimiento aceptable
        expect(mcpMetrics.totalTime).toBeLessThan(30000); // 30 segundos max

        console.log('✅ Comparación de rendimiento documentada');
    });
});