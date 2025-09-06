import * as dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

export interface AIHealingConfig {
    geminiApiKey: string;
    enabled: boolean;
    maxRetries: number;
    timeout: number;
    logPath: string;
    domSnapshotSize: number;
}

export const defaultConfig: AIHealingConfig = {
    geminiApiKey: process.env.GEMINI_API_KEY || '',
    enabled: true,
    maxRetries: 5,
    timeout: 5000,
    logPath: './ai-healing/healing-log.json',
    domSnapshotSize: 10000 // Límite de caracteres para el snapshot del DOM
};

export function validateConfig(config: AIHealingConfig): void {
    if (!config.geminiApiKey) {
        throw new Error('GEMINI_API_KEY es requerida para el sistema de autocurado');
    }
    
    if (config.maxRetries < 1 || config.maxRetries > 10) {
        throw new Error('maxRetries debe estar entre 1 y 10');
    }
    
    if (config.timeout < 1000) {
        throw new Error('timeout debe ser al menos 1000ms');
    }
}