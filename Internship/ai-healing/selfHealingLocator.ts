import { Page, Locator } from '@playwright/test';
import { GeminiClient } from './geminiClient';
import * as fs from 'fs-extra';
import * as path from 'path';

export interface LocatorConfig {
    originalLocator: string;
    description: string;
    elementType: 'button' | 'input' | 'link' | 'text' | 'generic';
    timeout?: number;
}

export interface HealingResult {
    success: boolean;
    workingLocator?: string;
    originalLocator: string;
    attempts: string[];
    pageUrl: string;
    timestamp: Date;
}

export class SelfHealingLocator {
    private geminiClient: GeminiClient;
    private healingHistory: HealingResult[] = [];
    private healingLogPath: string;

    constructor(geminiApiKey: string, logPath: string = './ai-healing/healing-log.json') {
        this.geminiClient = new GeminiClient(geminiApiKey);
        this.healingLogPath = logPath;
        this.loadHealingHistory();
    }

    async findElement(page: Page, config: LocatorConfig): Promise<Locator | null> {
        const { originalLocator, description, elementType, timeout = 5000 } = config;
        
        try {
            // Intentar con el locator original primero
            const originalElement = page.locator(originalLocator);
            await originalElement.waitFor({ timeout: timeout });
            return originalElement;
        } catch (error) {
            console.log(`🔍 Locator original falló: ${originalLocator}`);
            console.log(`🤖 Iniciando proceso de autocurado con AI...`);
            
            return await this.healLocator(page, config);
        }
    }

    private async healLocator(page: Page, config: LocatorConfig): Promise<Locator | null> {
        const { originalLocator, description, elementType } = config;
        const pageUrl = page.url();
        
        // Obtener snapshot del DOM
        const domSnapshot = await this.getDOMSnapshot(page);
        
        // Generar locators alternativos usando AI
        const alternativeLocators = await this.geminiClient.generateAlternativeLocators(
            originalLocator,
            domSnapshot,
            description,
            pageUrl
        );

        console.log(`🎯 AI generó ${alternativeLocators.length} locators alternativos`);

        const attempts: string[] = [];
        
        // Probar cada locator alternativo
        for (const locator of alternativeLocators) {
            attempts.push(locator);
            
            try {
                console.log(`🧪 Probando: ${locator}`);
                const element = page.locator(locator);
                await element.waitFor({ timeout: 2000 });
                
                // Verificar que el elemento es del tipo correcto
                if (await this.validateElementType(element, elementType)) {
                    console.log(`✅ Locator funcional encontrado: ${locator}`);
                    
                    // Guardar resultado exitoso
                    const healingResult: HealingResult = {
                        success: true,
                        workingLocator: locator,
                        originalLocator,
                        attempts,
                        pageUrl,
                        timestamp: new Date()
                    };
                    
                    this.saveHealingResult(healingResult);
                    return element;
                }
            } catch (error) {
                console.log(`❌ Falló: ${locator}`);
                continue;
            }
        }

        // Si no se encontró ningún locator funcional
        console.log(`🚫 No se pudo curar el locator: ${originalLocator}`);
        
        const healingResult: HealingResult = {
            success: false,
            originalLocator,
            attempts,
            pageUrl,
            timestamp: new Date()
        };
        
        this.saveHealingResult(healingResult);
        return null;
    }

    private async getDOMSnapshot(page: Page): Promise<string> {
        // Obtener HTML de elementos interactivos principales
        const domSnapshot = await page.evaluate(() => {
            const interactiveSelectors = [
                'button', 'input', 'a', 'select', 'textarea',
                '[role="button"]', '[role="link"]', '[role="textbox"]',
                '[data-testid]', '[data-test]', '[data-cy]',
                '.btn', '.button', '.link', '.input'
            ];
            
            let html = '';
            interactiveSelectors.forEach(selector => {
                const elements = document.querySelectorAll(selector);
                elements.forEach(el => {
                    html += el.outerHTML + '\n';
                });
            });
            
            return html;
        });
        
        return domSnapshot;
    }

    private async validateElementType(element: Locator, expectedType: string): Promise<boolean> {
        try {
            const tagName = await element.evaluate(el => el.tagName.toLowerCase());
            const role = await element.getAttribute('role');
            const type = await element.getAttribute('type');
            
            switch (expectedType) {
                case 'button':
                    return tagName === 'button' || 
                           role === 'button' || 
                           type === 'submit' ||
                           type === 'button';
                case 'input':
                    return tagName === 'input' || 
                           tagName === 'textarea' ||
                           role === 'textbox';
                case 'link':
                    return tagName === 'a' || role === 'link';
                default:
                    return true; // Para elementos genéricos, aceptar cualquiera
            }
        } catch (error) {
            return false;
        }
    }

    private saveHealingResult(result: HealingResult): void {
        this.healingHistory.push(result);
        
        // Mantener solo los últimos 100 resultados
        if (this.healingHistory.length > 100) {
            this.healingHistory = this.healingHistory.slice(-100);
        }
        
        // Guardar en archivo
        fs.ensureDirSync(path.dirname(this.healingLogPath));
        fs.writeJsonSync(this.healingLogPath, this.healingHistory, { spaces: 2 });
    }

    private loadHealingHistory(): void {
        try {
            if (fs.existsSync(this.healingLogPath)) {
                this.healingHistory = fs.readJsonSync(this.healingLogPath);
            }
        } catch (error) {
            console.log('No se pudo cargar el historial de curado, iniciando nuevo');
            this.healingHistory = [];
        }
    }

    getHealingStats(): any {
        const total = this.healingHistory.length;
        const successful = this.healingHistory.filter(h => h.success).length;
        const successRate = total > 0 ? (successful / total * 100).toFixed(2) : '0';
        
        return {
            totalAttempts: total,
            successfulHealing: successful,
            successRate: `${successRate}%`,
            recentResults: this.healingHistory.slice(-10)
        };
    }
}