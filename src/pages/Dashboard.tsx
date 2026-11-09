import React, { useState } from 'react';
import { 
  Building2, Users, Building, Search, FileText, CheckCircle2, ShieldAlert, 
  Upload, CreditCard, DollarSign, Bell, Download, UserCheck, ShieldCheck, 
  Bot, MessageSquare, Calendar, HelpCircle, ChevronRight, Lock, Trash2, Edit, Plus
} from 'lucide-react';

export function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [activeSubTab, setActiveSubTab] = useState('cnpj-overview');
  const [selectedClient, setSelectedClient] = useState('12.345.678/0001-90 - Empresa Exemplo Ltda');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-600 selection:text-white overflow-hidden">
      
      {/* Sidebar Principal Lateral */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between shrink-0">
        <div>
          {/* Logo & Header Escritório */}
          <div className="p-4 border-b border-slate-800 flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-xl text-white shadow-lg shadow-blue-500/20">
              <Building2 className="w-5 h-5" />
            </div>
            <div className="overflow-hidden">
              <h1 className="text-sm font-bold text-white truncate">ContabilCore SaaS</h1>
              <p className="text-xs text-slate-400 truncate">Escritório Modelo Ltda</p>
            </div>
          </div>

          {/* Busca Global de Clientes / CNPJ */}
          <div className="p-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
              <input 
                type="text" 
                placeholder="Buscar Cliente ou CNPJ..." 
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Menus Principais */}
          <nav className="px-2 py-2 space-y-1 text-xs font-medium">
            <button 
              onClick={() => setActiveTab('overview')} 
              className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${activeTab === 'overview' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}
            >
              <Building2 className="w-4 h-4 mr-2.5" /> Visão Geral & CNPJ
            </button>
            <button 
              onClick={() => setActiveTab('offices')} 
              className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${activeTab === 'offices' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}
            >
              <Building className="w-4 h-4 mr-2.5" /> Gestão de Escritórios
            </button>
            <button 
              onClick={() => setActiveTab('users')} 
              className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${activeTab === 'users' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}
            >
              <Users className="w-4 h-4 mr-2.5" /> Usuários e Acessos
            </button>
            <button 
              onClick={() => setActiveTab('ai-audit')} 
              className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${activeTab === 'ai-audit' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}
            >
              <ShieldAlert className="w-4 h-4 mr-2.5 text-amber-400" /> Auditoria por IA
            </button>
            <button 
              onClick={() => setActiveTab('ai-chat')} 
              className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${activeTab === 'ai-chat' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}
            >
              <MessageSquare className="w-4 h-4 mr-2.5 text-blue-400" /> Chat com IA Própria
            </button>
            <button 
              onClick={() => setActiveTab('calendar')} 
              className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${activeTab === 'calendar' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}
            >
              <Calendar className="w-4 h-4 mr-2.5" /> Calendário Fiscal
            </button>
            <button 
              onClick={() => setActiveTab('subscriptions')} 
              className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${activeTab === 'subscriptions' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}
            >
              <CreditCard className="w-4 h-4 mr-2.5" /> Cobrança de Assinatura
            </button>
            <button 
              onClick={() => setActiveTab('receivables')} 
              className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${activeTab === 'receivables' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}
            >
              <DollarSign className="w-4 h-4 mr-2.5" /> Honorários & Contas
            </button>
            <button 
              onClick={() => setActiveTab('payroll')} 
              className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${activeTab === 'payroll' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}
            >
              <UserCheck className="w-4 h-4 mr-2.5" /> Folha e Pró-labore
            </button>
          </nav>
        </div>

        {/* Footer do Menu */}
        <div className="p-3 border-t border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center"><ShieldCheck className="w-3.5 h-3.5 mr-1 text-emerald-400" /> LGPD Ativo</span>
            <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded">v2.4</span>
          </div>
        </div>
      </aside>

      {/* Conteúdo Principal */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Topbar Superior */}
        <header className="h-14 bg-slate-900 border-b border-slate-800 px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <span className="text-xs text-slate-400">Empresa Selecionada:</span>
            <select 
              value={selectedClient} 
              onChange={(e) => setSelectedClient(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1 text-xs text-slate-200 font-semibold focus:outline-none"
            >
              <option>12.345.678/0001-90 - Empresa Exemplo Ltda</option>
              <option>98.765.432/0001-10 - Comercio de Bebidas SA</option>
              <option>45.123.890/0001-55 - Tech Solutions Serviços</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-lg border border-slate-700">
              <Bell className="w-4 h-4" />
            </button>
            <div className="flex items-center space-x-2 pl-2 border-l border-slate-800">
              <div className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center font-bold text-xs">AD</div>
              <span className="text-xs font-medium text-slate-200">Admin Escritório</span>
            </div>
          </div>
        </header>

        {/* Área Principal de Trabalho */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* ABA 1: VISÃO GERAL DO CNPJ E SUABAS DE GESTÃO */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Abas Secundárias do CNPJ */}
              <div className="flex border-b border-slate-800 space-x-2 overflow-x-auto text-xs font-medium pb-1">
                <button 
                  onClick={() => setActiveSubTab('cnpj-overview')}
                  className={`px-4 py-2 rounded-t-lg transition-colors border-b-2 ${activeSubTab === 'cnpj-overview' ? 'border-blue-500 text-blue-400 bg-slate-900/60' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
                >
                  Visão Geral & Cadastro
                </button>
                <button 
                  onClick={() => setActiveSubTab('docs')}
                  className={`px-4 py-2 rounded-t-lg transition-colors border-b-2 ${activeSubTab === 'docs' ? 'border-blue-500 text-blue-400 bg-slate-900/60' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
                >
                  Documentos & IA
                </button>
                <button 
                  onClick={() => setActiveSubTab('reconciliation')}
                  className={`px-4 py-2 rounded-t-lg transition-colors border-b-2 ${activeSubTab === 'reconciliation' ? 'border-blue-500 text-blue-400 bg-slate-900/60' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
                >
                  Conciliação Bancária
                </button>
                <button 
                  onClick={() => setActiveSubTab('invoices')}
                  className={`px-4 py-2 rounded-t-lg transition-colors border-b-2 ${activeSubTab === 'invoices' ? 'border-blue-500 text-blue-400 bg-slate-900/60' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
                >
                  Notas Fiscais & Lançamentos
                </button>
                <button 
                  onClick={() => setActiveSubTab('chart-accounts')}
                  className={`px-4 py-2 rounded-t-lg transition-colors border-b-2 ${activeSubTab === 'chart-accounts' ? 'border-blue-500 text-blue-400 bg-slate-900/60' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
                >
                  Plano de Contas
                </button>
                <button 
                  onClick={() => setActiveSubTab('reports')}
                  className={`px-4 py-2 rounded-t-lg transition-colors border-b-2 ${activeSubTab === 'reports' ? 'border-blue-500 text-blue-400 bg-slate-900/60' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
                >
                  Relatórios Contábeis (DRE/Balanço)
                </button>
              </div>

              {/* Sub-aba: Visão Geral do CNPJ */}
              {activeSubTab === 'cnpj-overview' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                      <p className="text-xs text-slate-400">Conciliação do Mês</p>
                      <h3 className="text-3xl font-extrabold text-emerald-400 mt-1">100%</h3>
                      <p className="text-xs text-slate-400 mt-2">Sem divergências pendentes.</p>
                    </div>
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                      <p className="text-xs text-slate-400">Status de Auditoria</p>
                      <h3 className="text-3xl font-extrabold text-blue-400 mt-1">Regular</h3>
                      <p className="text-xs text-slate-400 mt-2">Validação automática aprovada.</p>
                    </div>
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                      <p className="text-xs text-slate-400">Faturamento Acumulado</p>
                      <h3 className="text-3xl font-extrabold text-purple-400 mt-1">R$ 145.800,00</h3>
                      <p className="text-xs text-slate-400 mt-2">Competência Atual</p>
                    </div>
                  </div>

                  {/* Cadastro Editável com Busca CNPJ na Receita */}
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                      <h2 className="text-sm font-bold text-white">Dados Cadastrais da Empresa (Consulta Receita)</h2>
                      <button className="flex items-center text-xs bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg transition-colors">
                        <Edit className="w-3.5 h-3.5 mr-1" /> Editar Dados
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div>
                        <label className="text-slate-400 block mb-1">Razão Social</label>
                        <input type="text" value="Empresa Exemplo Ltda" readOnly className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200" />
                      </div>
                      <div>
                        <label className="text-slate-400 block mb-1">CNPJ</label>
                        <input type="text" value="12.345.678/0001-90" readOnly className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200" />
                      </div>
                      <div>
                        <label className="text-slate-400 block mb-1">Atividade Principal (CNAE)</label>
                        <input type="text" value="6201-5/01 - Desenvolvimento de Programas de Computador" readOnly className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200" />
                      </div>
                      <div>
                        <label className="text-slate-400 block mb-1">E-mail / Telefone</label>
                        <input type="text" value="contato@empresaexemplo.com | (11) 98888-7777" readOnly className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Sub-aba: Documentos & IA */}
              {activeSubTab === 'docs' && (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl space-y-6">
                  <h2 className="text-base font-bold text-white flex items-center">
                    <Upload className="w-5 h-5 mr-2 text-blue-400" /> Upload de Arquivos (PDF, OFX, XML, CSV ou Foto)
                  </h2>
                  <div className="border-2 border-dashed border-slate-700 rounded-xl p-10 text-center hover:border-blue-500 transition-all bg-slate-950/50">
                    <Upload className="w-12 h-12 text-slate-500 mx-auto mb-3" />
                    <p className="text-sm font-semibold text-slate-200 mb-1">Arraste seus documentos contábeis aqui</p>
                    <p className="text-xs text-slate-400 mb-6">A IA irá processar os lançamentos sem efetivar nada sem sua confirmação.</p>
                    <label className="inline-flex items-center px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl cursor-pointer">
                      <span>Selecionar Documento</span>
                      <input type="file" className="hidden" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} />
                    </label>
                    {selectedFile && <p className="text-xs text-emerald-400 mt-4">Arquivo pronto: {selectedFile.name}</p>}
                  </div>
                </div>
              )}

              {/* Sub-aba: Conciliação Bancária */}
              {activeSubTab === 'reconciliation' && (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                    <h2 className="text-sm font-bold text-white">Relatório de Conciliação e Divergências</h2>
                    <span className="text-xs bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20">Validação Humana Solicitada</span>
                  </div>
                  <p className="text-xs text-slate-400">A IA nunca lança dados sozinha. Confirme as conciliações abaixo:</p>
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-950 text-slate-400 border-b border-slate-800">
                        <th className="p-3">Data</th>
                        <th className="p-3">Descrição Extrato</th>
                        <th className="p-3">Valor</th>
                        <th className="p-3">Status IA</th>
                        <th className="p-3 text-right">Ação</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      <tr>
                        <td className="p-3">05/11/2026</td>
                        <td className="p-3">PGTO FORNECEDOR XYZ</td>
                        <td className="p-3 text-red-400">- R$ 4.500,00</td>
                        <td className="p-3"><span className="bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded">Nota Encontrada</span></td>
                        <td className="p-3 text-right">
                          <button className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded">Confirmar Lançamento</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {/* Sub-aba: Relatórios Contábeis */}
              {activeSubTab === 'reports' && (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                    <h2 className="text-sm font-bold text-white">Relatórios Financeiros e Livros Contábeis</h2>
                    <div className="flex space-x-2">
                      <button className="bg-slate-800 text-xs px-3 py-1.5 rounded-lg border border-slate-700">Exportar Excel</button>
                      <button className="bg-blue-600 text-xs px-3 py-1.5 rounded-lg text-white">Imprimir PDF</button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                    <button className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-left hover:border-blue-500">
                      <FileText className="w-5 h-5 text-blue-400 mb-2" />
                      <p className="font-bold text-white">DRE Demonstrativo</p>
                      <p className="text-[10px] text-slate-400">Resultado do Exercício</p>
                    </button>
                    <button className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-left hover:border-blue-500">
                      <FileText className="w-5 h-5 text-purple-400 mb-2" />
                      <p className="font-bold text-white">Balanço Patrimonial</p>
                      <p className="text-[10px] text-slate-400">Ativo / Passivo</p>
                    </button>
                    <button className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-left hover:border-blue-500">
                      <FileText className="w-5 h-5 text-emerald-400 mb-2" />
                      <p className="font-bold text-white">Fluxo de Caixa</p>
                      <p className="text-[10px] text-slate-400">Entradas e Saídas</p>
                    </button>
                    <button className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-left hover:border-blue-500">
                      <FileText className="w-5 h-5 text-amber-400 mb-2" />
                      <p className="font-bold text-white">Livro Diário / Razão</p>
                      <p className="text-[10px] text-slate-400">Escrituração Completa</p>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ABA 2: AUDITORIA POR IA */}
          {activeTab === 'ai-audit' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h2 className="text-base font-bold text-white flex items-center">
                <ShieldAlert className="w-5 h-5 mr-2 text-amber-400" /> Módulo de Auditoria Automatizada por IA
              </h2>
              <p className="text-xs text-slate-400">Detecção proativa de erros, inconsistências de saldo e duplicidades.</p>
              <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs text-amber-300">
                ⚠️ Nenhuma divergência crítica encontrada nos últimos 150 lançamentos analisados.
              </div>
            </div>
          )}

          {/* ABA 3: CHAT COM IA PRÓPRIA */}
          {activeTab === 'ai-chat' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col h-[500px]">
              <h2 className="text-base font-bold text-white mb-4 flex items-center">
                <Bot className="w-5 h-5 mr-2 text-blue-400" /> Assistente IA Contábil Própria
              </h2>
              <div className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-4 overflow-y-auto text-xs space-y-3">
                <div className="bg-blue-600/20 text-blue-200 p-3 rounded-lg max-w-md">
                  Olá! Sou a IA auditora do seu escritório. Como posso ajudar com os lançamentos de hoje?
                </div>
              </div>
              <div className="mt-4 flex space-x-2">
                <input type="text" placeholder="Pergunte sobre impostos, conciliações ou leis contábeis..." className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-xs focus:outline-none" />
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-semibold">Enviar</button>
              </div>
            </div>
          )}

          {/* ABA 4: CALENDÁRIO FISCAL */}
          {activeTab === 'calendar' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h2 className="text-base font-bold text-white flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-purple-400" /> Calendário de Obrigações Fiscais
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
                  <span className="text-xs bg-red-500/10 text-red-400 px-2 py-0.5 rounded">Dia 15</span>
                  <p className="font-bold text-white mt-2">Vencimento DAS / Simples Nacional</p>
                </div>
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
                  <span className="text-xs bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded">Dia 20</span>
                  <p className="font-bold text-white mt-2">Entrega DCTFWeb & EFD-Reinf</p>
                </div>
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
                  <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded">Dia 30</span>
                  <p className="font-bold text-white mt-2">Fechamento do Balancete Mensal</p>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
