#!/usr/bin/env ts-node

import { MCPTestRunner } from '../mcp-integration/mcpTestRunner';

async function main() {
    console.log('🎬 Iniciando ejecución de tests MCP...');
    console.log('=' .repeat(50));
    
    const runner = new MCPTestRunner();
    
    try {
        await runner.runAll();
        console.log('=' .repeat(50));
        console.log('🎉 Ejecución de tests MCP completada exitosamente!');
    } catch (error) {
        console.error('💥 Error en la ejecución:', error);
        process.exit(1);
    }
}

if (require.main === module) {
    main();
}