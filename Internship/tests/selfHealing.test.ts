import { test, expect } from '../ai-healing/playwrightExtensions';

test.describe('Ejemplo de Tests con Self-Healing', () => {
    
    test('Login con autocurado de locators', async ({ selfHealingPage }) => {
        await selfHealingPage.goto('https://ecommerce-playground.lambdatest.io/index.php?route=account/login');
        
        // Usar self-healing para encontrar el campo de email
        const emailField = await selfHealingPage.findElementWithHealing({
            originalLocator: "//input[@id='input-email']",
            description: "Campo de entrada para email/correo electrónico",
            elementType: 'input'
        });
        
        if (emailField) {
            await emailField.fill('test@example.com');
        }
        
        // Usar self-healing para encontrar el campo de contraseña
        const passwordField = await selfHealingPage.findElementWithHealing({
            originalLocator: "//input[@id='input-password']",
            description: "Campo de entrada para contraseña",
            elementType: 'input'
        });
        
        if (passwordField) {
            await passwordField.fill('password123');
        }
        
        // Usar self-healing para encontrar el botón de login
        const loginButton = await selfHealingPage.findElementWithHealing({
            originalLocator: "//input[@value='Login']",
            description: "Botón para iniciar sesión o hacer login",
            elementType: 'button'
        });
        
        if (loginButton) {
            await loginButton.click();
        }
        
        // Mostrar estadísticas de curado
        console.log('📊 Estadísticas de Self-Healing:', selfHealingPage.healingStats());
    });

    test('Navegación con autocurado', async ({ selfHealingPage }) => {
        await selfHealingPage.goto('https://ecommerce-playground.lambdatest.io/');
        
        // Buscar el menú de cuenta con self-healing
        const accountMenu = await selfHealingPage.findElementWithHealing({
            originalLocator: "//a[@role='button']//span[@class='title'][normalize-space()='My account']",
            description: "Menú desplegable de mi cuenta",
            elementType: 'button'
        });
        
        if (accountMenu) {
            await accountMenu.hover();
        }
        
        // Buscar el link de registro
        const registerLink = await selfHealingPage.findElementWithHealing({
            originalLocator: "//a[contains(text(), 'Register')]",
            description: "Enlace para registrarse o crear cuenta",
            elementType: 'link'
        });
        
        if (registerLink) {
            await registerLink.click();
        }
        
        // Verificar que llegamos a la página de registro
        await expect(selfHealingPage).toHaveURL(/register/);
    });

    test('Formulario de registro con self-healing', async ({ selfHealingPage }) => {
        await selfHealingPage.goto('https://ecommerce-playground.lambdatest.io/index.php?route=account/register');
        
        const formFields = [
            {
                originalLocator: "//input[@id='input-firstname']",
                description: "Campo para nombre",
                value: "Juan",
                elementType: 'input' as const
            },
            {
                originalLocator: "//input[@id='input-lastname']",
                description: "Campo para apellido",
                value: "Pérez",
                elementType: 'input' as const
            },
            {
                originalLocator: "//input[@id='input-email']",
                description: "Campo para email",
                value: "juan.perez@example.com",
                elementType: 'input' as const
            },
            {
                originalLocator: "//input[@id='input-telephone']",
                description: "Campo para teléfono",
                value: "123456789",
                elementType: 'input' as const
            }
        ];
        
        // Llenar todos los campos usando self-healing
        for (const field of formFields) {
            const element = await selfHealingPage.findElementWithHealing({
                originalLocator: field.originalLocator,
                description: field.description,
                elementType: field.elementType
            });
            
            if (element) {
                await element.fill(field.value);
            }
        }
        
        // Mostrar estadísticas finales
        const stats = selfHealingPage.healingStats();
        console.log('📈 Estadísticas finales de Self-Healing:', stats);
        
        // Verificar que el sistema funcionó correctamente
        if (stats.totalAttempts > 0) {
            console.log(`✨ Self-healing activado ${stats.totalAttempts} veces con ${stats.successRate} de éxito`);
        }
    });
});