import { PlaywrightMCPClient } from './mcpClient';

export class MCPTestRunner {
    private client: PlaywrightMCPClient;
    private testResults: any[] = [];

    constructor() {
        this.client = new PlaywrightMCPClient();
    }

    async initialize(): Promise<void> {
        console.log('🚀 Inicializando MCP Test Runner...');
        await this.client.connect();
        
        // Verificar herramientas disponibles
        const tools = await this.client.listTools();
        console.log(`🛠️ ${tools.length} herramientas MCP disponibles:`, tools.map(t => t.name));
    }

    async runBasicTests(): Promise<void> {
        console.log('🧪 Ejecutando tests básicos de MCP...');
        
        const tests = [
            {
                name: 'Navegación básica',
                action: async () => {
                    return await this.client.navigate('https://ecommerce-playground.lambdatest.io/');
                }
            },
            {
                name: 'Captura de pantalla',
                action: async () => {
                    return await this.client.screenshot('./test-results/runner-basic.png');
                }
            },
            {
                name: 'Obtener texto',
                action: async () => {
                    return await this.client.getText('title');
                }
            }
        ];

        for (const test of tests) {
            try {
                console.log(`▶️ Ejecutando: ${test.name}`);
                const startTime = Date.now();
                const result = await test.action();
                const duration = Date.now() - startTime;
                
                this.testResults.push({
                    name: test.name,
                    status: 'PASSED',
                    duration,
                    result
                });
                
                console.log(`✅ ${test.name} - PASSED (${duration}ms)`);
            } catch (error) {
                this.testResults.push({
                    name: test.name,
                    status: 'FAILED',
                    error: error.message
                });
                
                console.log(`❌ ${test.name} - FAILED: ${error.message}`);
            }
        }
    }

    async runInteractionTests(): Promise<void> {
        console.log('🎯 Ejecutando tests de interacción...');
        
        // Navegar a página de login
        await this.client.navigate('https://ecommerce-playground.lambdatest.io/index.php?route=account/login');
        
        const interactionTests = [
            {
                name: 'Llenar campo email',
                action: async () => {
                    return await this.client.fill('#input-email', 'runner@test.com');
                }
            },
            {
                name: 'Llenar campo password',
                action: async () => {
                    return await this.client.fill('#input-password', 'testpassword');
                }
            },
            {
                name: 'Screenshot del formulario',
                action: async () => {
                    return await this.client.screenshot('./test-results/runner-form.png');
                }
            }
        ];

        for (const test of interactionTests) {
            try {
                console.log(`▶️ Ejecutando: ${test.name}`);
                const startTime = Date.now();
                const result = await test.action();
                const duration = Date.now() - startTime;
                
                this.testResults.push({
                    name: test.name,
                    status: 'PASSED',
                    duration,
                    result
                });
                
                console.log(`✅ ${test.name} - PASSED (${duration}ms)`);
            } catch (error) {
                this.testResults.push({
                    name: test.name,
                    status: 'FAILED',
                    error: error.message
                });
                
                console.log(`❌ ${test.name} - FAILED: ${error.message}`);
            }
        }
    }

    async generateReport(): Promise<void> {
        console.log('📊 Generando reporte de resultados...');
        
        const summary = {
            totalTests: this.testResults.length,
            passed: this.testResults.filter(t => t.status === 'PASSED').length,
            failed: this.testResults.filter(t => t.status === 'FAILED').length,
            totalDuration: this.testResults
                .filter(t => t.duration)
                .reduce((sum, t) => sum + t.duration, 0),
            timestamp: new Date().toISOString(),
            results: this.testResults
        };

        console.log('📋 Resumen de ejecución:');
        console.log(`   Total: ${summary.totalTests}`);
        console.log(`   ✅ Pasaron: ${summary.passed}`);
        console.log(`   ❌ Fallaron: ${summary.failed}`);
        console.log(`   ⏱️ Tiempo total: ${summary.totalDuration}ms`);
        console.log(`   📅 Timestamp: ${summary.timestamp}`);

        // Guardar reporte en archivo JSON
        const fs = require('fs');
        fs.writeFileSync('./test-results/mcp-runner-report.json', JSON.stringify(summary, null, 2));
        console.log('💾 Reporte guardado en: ./test-results/mcp-runner-report.json');
    }

    async cleanup(): Promise<void> {
        console.log('🧹 Limpiando recursos...');
        await this.client.disconnect();
        console.log('✅ Cleanup completado');
    }

    async runAll(): Promise<void> {
        try {
            await this.initialize();
            await this.runBasicTests();
            await this.runInteractionTests();
            await this.generateReport();
        } catch (error) {
            console.error('💥 Error durante la ejecución:', error);
        } finally {
            await this.cleanup();
        }
    }
}

// Script para ejecutar directamente
if (require.main === module) {
    const runner = new MCPTestRunner();
    runner.runAll().catch(console.error);
}