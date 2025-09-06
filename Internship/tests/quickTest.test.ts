import { test, expect } from '../ai-healing/playwrightExtensions';

test.describe('Prueba Rápida del Sistema AI Self-Healing', () => {
    
    test('Test básico - verificar que el sistema funciona', async ({ selfHealingPage }) => {
        console.log('🚀 Iniciando test de verificación del sistema AI...');
        
        await selfHealingPage.goto('https://ecommerce-playground.lambdatest.io/index.php?route=account/login');
        
        // Probar con un locator correcto primero
        console.log('📍 Probando locator correcto...');
        const emailField = await selfHealingPage.findElementWithHealing({
            originalLocator: "//div[@class='form-group-wrong']//div[@class='col-lg-8']//input[@name='email-field'][@placeholder='Enter your email here']",
            description: "",
            elementType: 'input'
        });
        
        if (emailField) {
            console.log('✅ Locator correcto funcionó');
            await emailField.fill('test@example.com');
        } else {
            console.log('❌ Error: No se encontró el campo de email');
        }
        
        // Ahora probar con un locator incorrecto para activar AI
        console.log('🤖 Probando locator incorrecto para activar AI...');
        const passwordField = await selfHealingPage.findElementWithHealing({
            originalLocator: "//input[@id='WRONG-PASSWORD-ID']", // Locator intencionalmente incorrecto
            description: "Campo de contraseña para hacer login",
            elementType: 'input'
        });
        
        if (passwordField) {
            console.log('✅ AI encontró el campo de contraseña!');
            await passwordField.fill('password123');
        } else {
            console.log('❌ AI no pudo encontrar el campo de contraseña');
        }
        
        // Mostrar estadísticas
        const stats = selfHealingPage.healingStats();
        console.log('📊 Estadísticas del sistema:', JSON.stringify(stats, null, 2));
        
        // Verificar que al menos un elemento fue encontrado
        expect(emailField || passwordField).toBeTruthy();
    });

    test('Test de configuración - verificar API key', async ({ selfHealingPage }) => {
        console.log('🔑 Verificando configuración de API key...');
        
        const apiKey = process.env.GEMINI_API_KEY;
        console.log('API Key configurada:', apiKey ? '✅ Sí' : '❌ No');
        
        if (!apiKey) {
            console.log('💡 Tip: Configura GEMINI_API_KEY en tu archivo .env');
        }
        
        expect(apiKey).toBeTruthy();
    });
});