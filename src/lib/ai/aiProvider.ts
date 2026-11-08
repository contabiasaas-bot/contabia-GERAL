export interface AIAnalysisResult {
  extractedData: Record<string, any>;
  confidenceScore: number;
  suggestions: string[];
}

export interface AIProvider {
  analyzeDocument(fileText: string, documentType: string): Promise<AIAnalysisResult>;
  auditEntries(entries: any[]): Promise<{ riskLevel: 'low' | 'medium' | 'high'; observations: string[] }>;
}

// Implementação base ou Mock para testes iniciais
export class OpenAIAdapter implements AIProvider {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async analyzeDocument(fileText: string, documentType: string): Promise<AIAnalysisResult> {
    // Aqui entrará a chamada real à API da OpenAI/Anthropic
    return {
      extractedData: { type: documentType, rawLength: fileText.length },
      confidenceScore: 0.95,
      suggestions: ["Documento processado com sucesso via IA."]
    };
  }

  async auditEntries(entries: any[]) {
    return {
      riskLevel: 'low' as const,
      observations: ["Nenhuma anomalia detectada nos lançamentos recentes."]
    };
  }
}
