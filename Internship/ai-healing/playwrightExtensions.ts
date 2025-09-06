import { Page, test as baseTest } from '@playwright/test';
import { SelfHealingLocator, LocatorConfig } from './selfHealingLocator';
import * as dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

// Extender el contexto de test para incluir self-healing
type SelfHealingFixtures = {
    selfHealingPage: Page & {
        findElementWithHealing: (config: LocatorConfig) => Promise<any>;
        healingStats: () => any;
    };
};

export const test = baseTest.extend<SelfHealingFixtures>({
    selfHealingPage: async ({ page }, use) => {
        // Obtener API key desde variables de entorno
        const geminiApiKey = process.env.GEMINI_API_KEY;
        if (!geminiApiKey) {
            throw new Error('GEMINI_API_KEY no está configurada en las variables de entorno');
        }

        const selfHealing = new SelfHealingLocator(geminiApiKey);

        // Extender la página con funcionalidad de self-healing
        const enhancedPage = page as Page & {
            findElementWithHealing: (config: LocatorConfig) => Promise<any>;
            healingStats: () => any;
        };

        enhancedPage.findElementWithHealing = async (config: LocatorConfig) => {
            return await selfHealing.findElement(page, config);
        };

        enhancedPage.healingStats = () => {
            return selfHealing.getHealingStats();
        };

        await use(enhancedPage);
    },
});

export { expect } from '@playwright/test';