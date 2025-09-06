import { validateConfig, defaultConfig } from './config';

async function globalSetup() {
  console.log('🤖 Inicializando sistema de Self-Healing con AI...');
  
  try {
    // Validar configuración
    validateConfig(defaultConfig);
    console.log('✅ Configuración de AI validada correctamente');
    
    // Verificar conectividad con Gemini (opcional)
    if (defaultConfig.geminiApiKey) {
      console.log('🔑 API Key de Gemini configurada');
    }
    
    console.log('🚀 Sistema de Self-Healing listo para usar');
  } catch (error) {
    console.error('❌ Error en configuración de Self-Healing:', error);
    console.log('💡 Tip: Asegúrate de configurar GEMINI_API_KEY en tu archivo .env');
  }
}

export default globalSetup;