import { test as baseTest, expect } from '@playwright/test';
import { test as healingTest } from '../ai-healing/playwrightExtensions';

// Comparación entre test tradicional y con self-healing
baseTest.describe('Comparación: Tradicional vs Self-Healing', () => {
    
    baseTest('Test tradicional - puede fallar si cambian los locators', async ({ page }) => {
        await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=account/login');
        
        // Estos locators pueden fallar si la página cambia
        await page.fill("//input[@id='input-email']", 'test@example.com');
        await page.fill("//input[@id='input-password']", 'password123');
        await page.click("//input[@value='Login']");
    });
});

healingTest.describe('Test con Self-Healing - más resistente a cambios', () => {
    
    healingTest('Test con autocurado - se adapta automáticamente', async ({ selfHealingPage }) => {
        await selfHealingPage.goto('https://ecommerce-playground.lambdatest.io/index.php?route=account/login');
        
        // Estos elementos se encontrarán automáticamente aunque cambien los locators
        const emailField = await selfHealingPage.findElementWithHealing({
            originalLocator: "//input[@id='input-email-WRONG']", // Locator intencionalmente incorrecto
            description: "Campo de email para login",
            elementType: 'input'
        });
        
        const passwordField = await selfHealingPage.findElementWithHealing({
            originalLocator: "//input[@id='input-password-WRONG']", // Locator intencionalmente incorrecto
            description: "Campo de contraseña para login",
            elementType: 'input'
        });
        
        const loginButton = await selfHealingPage.findElementWithHealing({
            originalLocator: "//input[@value='Login-WRONG']", // Locator intencionalmente incorrecto
            description: "Botón de login o iniciar sesión",
            elementType: 'button'
        });
        
        // El sistema debería encontrar los elementos correctos automáticamente
        if (emailField) await emailField.fill('test@example.com');
        if (passwordField) await passwordField.fill('password123');
        if (loginButton) await loginButton.click();
        
        // Mostrar qué tan bien funcionó el sistema
        const stats = selfHealingPage.healingStats();
        console.log('🎯 Resultados del autocurado:', stats);
    });
});