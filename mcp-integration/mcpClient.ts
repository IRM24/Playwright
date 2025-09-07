import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

export class PlaywrightMCPClient {
    private client: Client;
    private transport: StdioClientTransport;
    private isConnected: boolean = false;

    constructor() {
        // Inicializar el transporte para comunicarse con playwright-mcp
        this.transport = new StdioClientTransport({
            command: 'npx',
            args: ['playwright-mcp'],
            env: {
                ...process.env,
                PLAYWRIGHT_HEADLESS: 'false',
                PLAYWRIGHT_TIMEOUT: '30000'
            }
        });

        this.client = new Client({
            name: 'playwright-test-client',
            version: '1.0.0'
        }, {
            capabilities: {
                tools: {}
            }
        });
    }

    async connect(): Promise<void> {
        if (this.isConnected) return;

        try {
            await this.client.connect(this.transport);
            this.isConnected = true;
            console.log('✅ Conectado a Playwright MCP');
        } catch (error) {
            console.error('❌ Error conectando a Playwright MCP:', error);
            throw error;
        }
    }

    async disconnect(): Promise<void> {
        if (!this.isConnected) return;

        try {
            await this.client.close();
            this.isConnected = false;
            console.log('🔌 Desconectado de Playwright MCP');
        } catch (error) {
            console.error('❌ Error desconectando:', error);
        }
    }

    async listTools(): Promise<any[]> {
        if (!this.isConnected) {
            throw new Error('Cliente no conectado. Llama a connect() primero.');
        }

        try {
            const response = await this.client.listTools();
            return response.tools || [];
        } catch (error) {
            console.error('❌ Error listando herramientas:', error);
            throw error;
        }
    }

    async callTool(name: string, arguments_: Record<string, any>): Promise<any> {
        if (!this.isConnected) {
            throw new Error('Cliente no conectado. Llama a connect() primero.');
        }

        try {
            console.log(`🔧 Ejecutando herramienta: ${name}`, arguments_);
            const response = await this.client.callTool({
                name,
                arguments: arguments_
            });
            
            console.log(`✅ Resultado de ${name}:`, response);
            return response;
        } catch (error) {
            console.error(`❌ Error ejecutando ${name}:`, error);
            throw error;
        }
    }

    // Métodos de conveniencia para operaciones comunes de Playwright
    async navigate(url: string): Promise<any> {
        return await this.callTool('playwright_navigate', { url });
    }

    async click(selector: string): Promise<any> {
        return await this.callTool('playwright_click', { selector });
    }

    async fill(selector: string, text: string): Promise<any> {
        return await this.callTool('playwright_fill', { selector, text });
    }

    async screenshot(path?: string): Promise<any> {
        return await this.callTool('playwright_screenshot', { path });
    }

    async getText(selector: string): Promise<any> {
        return await this.callTool('playwright_get_text', { selector });
    }

    async waitForSelector(selector: string, timeout: number = 5000): Promise<any> {
        return await this.callTool('playwright_wait_for_selector', { 
            selector, 
            timeout 
        });
    }
}