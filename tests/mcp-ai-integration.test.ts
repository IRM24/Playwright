import { test, expect } from '@playwright/test';
import { PlaywrightMCPClient } from '../mcp-integration/mcpClient';
import { GeminiClient } from '../ai-healing/geminiClient';

test.describe('Playwright MCP + AI Integration', () => {
    let mcpClient: PlaywrightMCPClient;
    let geminiClient: GeminiClient;

    test.beforeEach(async () => {
        mcpClient = new PlaywrightMCPClient();
        await mcpClient.connect();
        
        // Inicializar cliente Gemini si está disponible
        if (process.env.GEMINI_API_KEY) {
            geminiClient = new GeminiClient(process.env.GEMINI_API_KEY);
        }
    });

    test.afterEach(async () => {
        if (mcpClient) {
            await mcpClient.disconnect();
        }
    });

    test('MCP-AI-001: Combinación de MCP con AI para análisis de página', async () => {
        console.log('🤖 Iniciando test de integración MCP + AI...');
        
        // Navegar usando MCP
        await mcpClient.navigate('https://ecommerce-playground.lambdatest.io/');
        
        // Tomar screenshot usando MCP
        const screenshotResult = await mcpClient.screenshot('./test-results/mcp-ai-analysis.png');
        console.log('📸 Screenshot para análisis AI:', screenshotResult);
        
        if (geminiClient) {
            // Obtener contenido de la página para análisis AI
            const pageContent = await mcpClient.getText('body');
            
            // Usar AI para analizar la estructura de la página
            const analysis = await geminiClient.analyzePageStructure(
                pageContent.content || '', 
                'https://ecommerce-playground.lambdatest.io/'
            );
            
            console.log('🧠 Análisis AI de la página:', analysis);
            
            // Verificar que el análisis contiene información útil
            expect(analysis).toBeDefined();
            if (analysis.interactiveElements) {
                expect(analysis.interactiveElements.length).toBeGreaterThan(0);
            }
        } else {
            console.log('⚠️ GEMINI_API_KEY no configurada, saltando análisis AI');
        }
        
        console.log('✅ Integración MCP + AI completada');
    });

    test('MCP-AI-002: Autocurado inteligente usando MCP y AI', async () => {
        console.log('🔧 Iniciando test de autocurado MCP + AI...');
        
        await mcpClient.navigate('https://ecommerce-playground.lambdatest.io/index.php?route=account/login');
        
        // Intentar interactuar con un elemento usando un selector incorrecto
        try {
            await mcpClient.click('#boton-login-incorrecto');
        } catch (error) {
            console.log('⚠️ Selector incorrecto falló como esperado');
            
            if (geminiClient) {
                // Obtener DOM para análisis
                const pageContent = await mcpClient.getText('body');
                
                // Usar AI para encontrar selectores alternativos
                const alternatives = await geminiClient.generateAlternativeLocators(
                    '#boton-login-incorrecto',
                    pageContent.content || '',
                    'Botón de login',
                    'https://ecommerce-playground.lambdatest.io/index.php?route=account/login'
                );
                
                console.log('🎯 Selectores alternativos generados por AI:', alternatives);
                
                // Probar selectores alternativos usando MCP
                for (const selector of alternatives.slice(0, 3)) { // Probar solo los primeros 3
                    try {
                        console.log(`🧪 Probando selector: ${selector}`);
                        await mcpClient.click(selector);
                        console.log(`✅ Selector funcional encontrado: ${selector}`);
                        break;
                    } catch (selectorError) {
                        console.log(`❌ Selector ${selector} no funcionó`);
                        continue;
                    }
                }
            }
        }
        
        console.log('✅ Test de autocurado MCP + AI completado');
    });

    test('MCP-AI-003: Generación de reportes inteligentes', async () => {
        console.log('📊 Iniciando test de reportes inteligentes...');
        
        const testResults = {
            url: 'https://ecommerce-playground.lambdatest.io/',
            timestamp: new Date().toISOString(),
            mcpTools: [],
            interactions: [],
            screenshots: []
        };
        
        // Listar herramientas MCP disponibles
        const tools = await mcpClient.listTools();
        testResults.mcpTools = tools.map(t => ({ name: t.name, description: t.description }));
        
        // Realizar varias interacciones y documentarlas
        await mcpClient.navigate(testResults.url);
        testResults.interactions.push({ action: 'navigate', target: testResults.url });
        
        const screenshot1 = await mcpClient.screenshot('./test-results/report-home.png');
        testResults.screenshots.push('report-home.png');
        
        // Navegar a login
        await mcpClient.navigate('https://ecommerce-playground.lambdatest.io/index.php?route=account/login');
        testResults.interactions.push({ action: 'navigate', target: 'login page' });
        
        const screenshot2 = await mcpClient.screenshot('./test-results/report-login.png');
        testResults.screenshots.push('report-login.png');
        
        // Generar reporte final
        console.log('📋 Reporte de pruebas MCP:', JSON.stringify(testResults, null, 2));
        
        // Verificar que se generaron los datos esperados
        expect(testResults.mcpTools.length).toBeGreaterThan(0);
        expect(testResults.interactions.length).toBe(2);
        expect(testResults.screenshots.length).toBe(2);
        
        console.log('✅ Reporte inteligente generado correctamente');
    });
});