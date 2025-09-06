import { GoogleGenerativeAI } from '@google/generative-ai';

export class GeminiClient {
    private genAI: GoogleGenerativeAI;
    private model: any;

    constructor(apiKey: string) {
        this.genAI = new GoogleGenerativeAI(apiKey);
        this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    }

    async generateAlternativeLocators(
        originalLocator: string,
        domSnapshot: string,
        elementDescription: string,
        pageUrl: string
    ): Promise<string[]> {
        const prompt = `
        Analiza el siguiente DOM HTML y encuentra locators alternativos para un elemento que no se puede encontrar.

        INFORMACIÓN DEL CONTEXTO:
        - URL de la página: ${pageUrl}
        - Locator original que falló: ${originalLocator}
        - Descripción del elemento: ${elementDescription}

        DOM HTML (fragmento relevante):
        ${domSnapshot}

        INSTRUCCIONES:
        1. Analiza el DOM y encuentra elementos similares al que se busca
        2. Genera 5-8 locators alternativos usando diferentes estrategias:
           - XPath con texto
           - CSS selectors
           - Atributos data-*
           - Clases CSS
           - IDs
           - Combinaciones de atributos
        3. Ordena los locators por probabilidad de éxito (más específicos primero)
        4. Evita locators que dependan de posiciones numéricas específicas

        FORMATO DE RESPUESTA:
        Devuelve SOLO un array JSON de strings con los locators, ejemplo:
        ["//button[contains(text(), 'Login')]", "#login-btn", ".login-button", "[data-testid='login']"]

        No incluyas explicaciones adicionales, solo el array JSON.
        `;

        try {
            const result = await this.model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();
            
            // Extraer el array JSON de la respuesta
            const jsonMatch = text.match(/\[.*\]/s);
            if (jsonMatch) {
                return JSON.parse(jsonMatch[0]);
            }
            
            return [];
        } catch (error) {
            console.error('Error generando locators alternativos:', error);
            return [];
        }
    }

    async analyzePageStructure(domSnapshot: string, pageUrl: string): Promise<any> {
        const prompt = `
        Analiza la estructura de esta página web y proporciona información útil para testing.

        URL: ${pageUrl}
        DOM HTML:
        ${domSnapshot}

        Proporciona un análisis en formato JSON con:
        1. Elementos interactivos principales (botones, links, inputs)
        2. Formularios detectados
        3. Navegación principal
        4. Elementos únicos identificables

        Formato de respuesta JSON:
        {
            "interactiveElements": [],
            "forms": [],
            "navigation": [],
            "uniqueElements": []
        }
        `;

        try {
            const result = await this.model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();
            
            const jsonMatch = text.match(/\{.*\}/s);
            if (jsonMatch) {
                return JSON.parse(jsonMatch[0]);
            }
            
            return {};
        } catch (error) {
            console.error('Error analizando estructura de página:', error);
            return {};
        }
    }
}