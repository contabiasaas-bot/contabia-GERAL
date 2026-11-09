import React, { useState } from 'react';
import { Upload, FileText, CheckCircle2, ShieldAlert, Building2, TrendingUp, Users, ArrowUpRight } from 'lucide-react';

export function Dashboard() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
      {/* Top Navbar */}
      <header className="bg-slate-800 border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg text-white">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">Portal Contábil Multi-Tenant</h1>
              <p className="text-xs text-slate-400">Escritório Ativo — Gestão Inteligente</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-2 h-2 mr-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
              Sistema Operacional
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Conciliação Bancária</p>
                <h3 className="text-2xl font-bold text-emerald-400 mt-1">100%</h3>
              </div>
              <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-400">
                <CheckCircle2 className="w-6 h-6" />
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-4 flex items-center">
              <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400 mr-1" />
              Lançamentos validados sem divergência
            </p>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Auditoria IA</p>
                <h3 className="text-2xl font-bold text-blue-400 mt-1">Seguro</h3>
              </div>
              <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400">
                <ShieldAlert className="w-6 h-6" />
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-4">Nenhum risco contábil detetado no último lote.</p>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Documentos Ativos</p>
                <h3 className="text-2xl font-bold text-purple-400 mt-1">0 Lotes</h3>
              </div>
              <div className="p-3 bg-purple-500/10 rounded-lg text-purple-400">
                <FileText className="w-6 h-6" />
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-4">Pronto para novos uploads e conciliações.</p>
          </div>
        </div>

        {/* Upload Section */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-xl">
          <h2 className="text-lg font-semibold text-slate-100 mb-4 flex items-center">
            <Upload className="w-5 h-5 mr-2 text-blue-400" />
            Upload de Arquivos Contábeis
          </h2>
          
          <div className="border-2 border-dashed border-slate-600 rounded-xl p-8 text-center hover:border-blue-500 transition-colors bg-slate-900/50">
            <Upload className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <p className="text-sm font-medium text-slate-200 mb-1">
              Arraste ficheiros de notas ou extratos aqui, ou clique abaixo
            </p>
            <p className="text-xs text-slate-400 mb-4">Suporta formato OFX, PDF, XML e CSV</p>
            
            <label className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg cursor-pointer transition-colors shadow-lg">
              <span>Selecionar Arquivo</span>
              <input 
                type="file" 
                className="hidden" 
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} 
              />
            </label>
            {selectedFile && (
              <p className="text-xs text-emerald-400 mt-3 font-medium">
                Arquivo selecionado: {selectedFile.name}
              </p>
            )}
          </div>
        </div>

        {/* Documents Table Section */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl shadow-xl overflow-hidden">
          <div className="p-6 border-b border-slate-700">
            <h2 className="text-lg font-semibold text-slate-100">Documentos da Empresa</h2>
            <p className="text-xs text-slate-400 mt-0.5">Histórico de lotes enviados e status de auditoria</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900/60 text-slate-400 text-xs uppercase tracking-wider border-b border-slate-700">
                  <th className="py-3 px-6 font-semibold">Nome do Arquivo</th>
                  <th className="py-3 px-6 font-semibold">Tipo</th>
                  <th className="py-3 px-6 font-semibold">Status</th>
                  <th className="py-3 px-6 font-semibold text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700 text-sm">
                <tr>
                  <td colSpan={4} className="py-8 text-center text-slate-400">
                    Nenhum documento enviado ainda.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
}
