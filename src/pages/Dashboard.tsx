import React, { useState } from 'react';
import { 
  Building2, Users, Building, Search, FileText, CheckCircle2, ShieldAlert, 
  Upload, CreditCard, DollarSign, Bell, UserCheck, ShieldCheck, 
  Bot, MessageSquare, Calendar, Lock, Trash2, Edit, Plus, Key, LogOut, Save, Download, FileSpreadsheet, AlertTriangle, Calculator, FileCheck
} from 'lucide-react';

export function Dashboard() {
  // Autenticação
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [userRole, setUserRole] = useState<'superadmin' | 'office' | 'client'>('office');

  // Navegação
  const [activeTab, setActiveTab] = useState('overview');
  const [activeSubTab, setActiveSubTab] = useState('cnpj-overview');
  const [selectedClient, setSelectedClient] = useState('12.345.678/0001-90 - Empresa Exemplo Ltda');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Config de IA do Escritório
  const [aiApiKey, setAiApiKey] = useState('');
  const [aiProvider, setAiProvider] = useState('openai');
  const [keySaved, setKeySaved] = useState(false);

  // Dados Mockados para Demonstração Completa
  const [officesList, setOfficesList] = useState([
    { id: 1, name: 'Escritório Contábil Alpha', email: 'contato@alpha.com', cnpj: '00.123.456/0001-00', plan: 'Enterprise (Licenciado)' },
    { id: 2, name: 'Beta Soluções Fiscais', email: 'adm@beta.com', cnpj: '11.987.654/0001-99', plan: 'Profissional (Licenciado)' }
  ]);

  const [usersList, setUsersList] = useState([
    { id: 1, name: 'João Contador', email: 'joao@escritorio.com', role: 'Contador Responsável', status: 'Ativo' },
    { id: 2, name: 'Maria Fiscal', email: 'maria@escritorio.com', role: 'Analista Fiscal', status: 'Ativo' },
    { id: 3, name: 'Empresa Exemplo', email: 'contato@empresaexemplo.com', role: 'Cliente CNPJ', status: 'Ativo' }
  ]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginEmail.toLowerCase().includes('admin') || loginEmail.toLowerCase().includes('vendedora')) {
      setUserRole('superadmin');
      setActiveTab('super-admin');
    } else if (loginEmail.toLowerCase().includes('cliente')) {
      setUserRole('client');
      setActiveTab('overview');
    } else {
      setUserRole('office');
      setActiveTab('overview');
    }
    setIsLoggedIn(true);
  };

  const handleSaveApiKey = (e: React.FormEvent) => {
    e.preventDefault();
    setKeySaved(true);
    setTimeout(() => setKeySaved(false), 3000);
  };

  // 1. TELA DE LOGIN RESTRIÇÃO TOTAL
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 font-sans text-slate-100">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 max-w-md w-full shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-blue-600 rounded-xl mx-auto flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
              <Building2 className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold text-white">ContabilCore SaaS</h1>
            <p className="text-xs text-slate-400">Portal de Gestão Contábil Inteligente</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="text-slate-400 block mb-1">E-mail de Acesso Autorizado</label>
              <input 
                type="email" 
                required
                placeholder="seu.email@escritorio.com" 
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">Senha</label>
              <input 
                type="password" 
                required
                placeholder="••••••••" 
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-blue-500"
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-xl transition-all shadow-lg shadow-blue-600/30 text-sm"
            >
              Entrar no Sistema
            </button>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <p className="font-semibold text-slate-300">Credenciais para Teste:</p>
              <p>• <b className="text-amber-400">Vendedora (Super Admin):</b> digite "admin" no e-mail</p>
              <p>• <b className="text-blue-400">Escritório Contábil:</b> digite qualquer e-mail de escritório</p>
              <p>• <b className="text-emerald-400">Cliente CNPJ:</b> digite "cliente" no e-mail</p>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // 2. PAINEL PRINCIPAL LOGADO
  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-600 selection:text-white overflow-hidden">
      
      {/* Sidebar Lateral */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between shrink-0">
        <div>
          <div className="p-4 border-b border-slate-800 flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-xl text-white shadow-lg shadow-blue-500/20">
              <Building2 className="w-5 h-5" />
            </div>
            <div className="overflow-hidden">
              <h1 className="text-sm font-bold text-white truncate">ContabilCore SaaS</h1>
              <p className="text-xs text-slate-400 truncate">
                {userRole === 'superadmin' ? 'Painel Vendedora (Master)' : userRole === 'client' ? 'Portal da Empresa' : 'Painel da Contabilidade'}
              </p>
            </div>
          </div>

          {userRole !== 'client' && (
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
          )}

          {/* MENU LATERAL CORRIGIDO E INTEGRADO */}
          <nav className="px-2 py-2 space-y-1 text-xs font-medium">
            {userRole === 'superadmin' && (
              <button 
                onClick={() => setActiveTab('super-admin')} 
                className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${activeTab === 'super-admin' ? 'bg-amber-600 text-white font-semibold' : 'text-amber-400 hover:bg-slate-800'}`}
              >
                <Building className="w-4 h-4 mr-2.5" /> Gestão de Escritórios
              </button>
            )}

            <button 
              onClick={() => setActiveTab('overview')} 
              className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${activeTab === 'overview' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}
            >
              <Building2 className="w-4 h-4 mr-2.5" /> {userRole === 'client' ? 'Meu Espaço CNPJ' : 'Visão Geral & CNPJ'}
            </button>

            {userRole !== 'client' && (
              <>
                <button 
                  onClick={() => setActiveTab('users')} 
                  className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${activeTab === 'users' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}
                >
                  <Users className="w-4 h-4 mr-2.5" /> Usuários e Acessos
                </button>
                <button 
                  onClick={() => setActiveTab('ai-config')} 
                  className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${activeTab === 'ai-config' ? 'bg-blue-600 text-white font-semibold' : 'text-amber-400 hover:bg-slate-800'}`}
                >
                  <Key className="w-4 h-4 mr-2.5" /> Configurar API de IA
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
                  <Bot className="w-4 h-4 mr-2.5 text-blue-400" /> Chat com IA Própria
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
              </>
            )}
          </nav>
        </div>

        <div className="p-3 border-t border-slate-800 flex items-center justify-between">
          <span className="text-[10px] text-emerald-400 flex items-center"><ShieldCheck className="w-3.5 h-3.5 mr-1" /> LGPD Ativo</span>
          <button onClick={() => setIsLoggedIn(false)} className="text-slate-400 hover:text-red-400 text-xs flex items-center">
            <LogOut className="w-3.5 h-3.5 mr-1" /> Sair
          </button>
        </div>
      </aside>

      {/* Conteúdo Central */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Topbar */}
        <header className="h-14 bg-slate-900 border-b border-slate-800 px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <span className="text-xs text-slate-400">Cliente Selecionado:</span>
            {userRole === 'client' ? (
              <span className="text-xs font-bold text-blue-400">12.345.678/0001-90 - Empresa Exemplo Ltda</span>
            ) : (
              <select 
                value={selectedClient} 
                onChange={(e) => setSelectedClient(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1 text-xs text-slate-200 font-semibold focus:outline-none"
              >
                <option>12.345.678/0001-90 - Empresa Exemplo Ltda</option>
                <option>98.765.432/0001-10 - Comércio de Bebidas SA</option>
                <option>45.123.890/0001-55 - Tech Solutions Serviços</option>
              </select>
            )}
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-lg border border-slate-700">
              <Bell className="w-4 h-4" />
            </button>
            <div className="flex items-center space-x-2 pl-2 border-l border-slate-800">
              <div className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center font-bold text-xs">
                {userRole === 'superadmin' ? 'SA' : userRole === 'client' ? 'CLI' : 'ESC'}
              </div>
              <span className="text-xs font-medium text-slate-200">
                {userRole === 'superadmin' ? 'Vendedora (SaaS Master)' : userRole === 'client' ? 'Cliente CNPJ' : 'Escritório Contábil'}
              </span>
            </div>
          </div>
        </header>

        {/* ÁREA INTERATIVA DAS ABAS RENDERIZADAS */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* 1. VISÃO GERAL & CNPJ (COM AS 6 SUB-ABAS TOTALMENTE FUNCIONAIS) */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="flex border-b border-slate-800 space-x-2 overflow-x-auto text-xs font-medium pb-1">
                <button onClick={() => setActiveSubTab('cnpj-overview')} className={`px-4 py-2 rounded-t-lg transition-colors border-b-2 ${activeSubTab === 'cnpj-overview' ? 'border-blue-500 text-blue-400 bg-slate-900/60 font-bold' : 'border-transparent text-slate-400 hover:text-slate-200'}`}>Visão Geral & Cadastro</button>
                <button onClick={() => setActiveSubTab('docs')} className={`px-4 py-2 rounded-t-lg transition-colors border-b-2 ${activeSubTab === 'docs' ? 'border-blue-500 text-blue-400 bg-slate-900/60 font-bold' : 'border-transparent text-slate-400 hover:text-slate-200'}`}>Documentos & IA</button>
                <button onClick={() => setActiveSubTab('reconciliation')} className={`px-4 py-2 rounded-t-lg transition-colors border-b-2 ${activeSubTab === 'reconciliation' ? 'border-blue-500 text-blue-400 bg-slate-900/60 font-bold' : 'border-transparent text-slate-400 hover:text-slate-200'}`}>Conciliação Bancária</button>
                <button onClick={() => setActiveSubTab('invoices')} className={`px-4 py-2 rounded-t-lg transition-colors border-b-2 ${activeSubTab === 'invoices' ? 'border-blue-500 text-blue-400 bg-slate-900/60 font-bold' : 'border-transparent text-slate-400 hover:text-slate-200'}`}>Notas Fiscais & Lançamentos</button>
                <button onClick={() => setActiveSubTab('chart-accounts')} className={`px-4 py-2 rounded-t-lg transition-colors border-b-2 ${activeSubTab === 'chart-accounts' ? 'border-blue-500 text-blue-400 bg-slate-900/60 font-bold' : 'border-transparent text-slate-400 hover:text-slate-200'}`}>Plano de Contas</button>
                <button onClick={() => setActiveSubTab('reports')} className={`px-4 py-2 rounded-t-lg transition-colors border-b-2 ${activeSubTab === 'reports' ? 'border-blue-500 text-blue-400 bg-slate-900/60 font-bold' : 'border-transparent text-slate-400 hover:text-slate-200'}`}>Relatórios (DRE/Balanço)</button>
              </div>

              {/* Sub-aba 1.1: Visão Geral e Cadastro Receita */}
              {activeSubTab === 'cnpj-overview' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                      <p className="text-xs text-slate-400">Conciliação Automática</p>
                      <h3 className="text-3xl font-extrabold text-emerald-400 mt-1">100%</h3>
                      <p className="text-xs text-slate-400 mt-2">Sem divergências pendentes no extrato.</p>
                    </div>
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                      <p className="text-xs text-slate-400">Status de Auditoria IA</p>
                      <h3 className="text-3xl font-extrabold text-blue-400 mt-1">Aprovado</h3>
                      <p className="text-xs text-slate-400 mt-2">Sem impostos ou guias duplicadas.</p>
                    </div>
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                      <p className="text-xs text-slate-400">Faturamento Acumulado</p>
                      <h3 className="text-3xl font-extrabold text-purple-400 mt-1">R$ 145.800,00</h3>
                      <p className="text-xs text-slate-400 mt-2">Competência Atual</p>
                    </div>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                      <h2 className="text-sm font-bold text-white">Dados Cadastrais (Consulta Receita Federal Automática)</h2>
                      <button className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-3 py-1.5 rounded-lg">Atualizar Receita</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div>
                        <label className="text-slate-400 block mb-1">Razão Social</label>
                        <input type="text" defaultValue="Empresa Exemplo Ltda" className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200" />
                      </div>
                      <div>
                        <label className="text-slate-400 block mb-1">CNPJ</label>
                        <input type="text" defaultValue="12.345.678/0001-90" className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200" />
                      </div>
                      <div>
                        <label className="text-slate-400 block mb-1">Atividade Principal (CNAE)</label>
                        <input type="text" defaultValue="6201-5/01 - Desenvolvimento de Software" className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200" />
                      </div>
                      <div>
                        <label className="text-slate-400 block mb-1">Endereço Completo</label>
                        <input type="text" defaultValue="Av. Paulista, 1000 - São Paulo/SP" className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Sub-aba 1.2: Documentos & IA */}
              {activeSubTab === 'docs' && (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl space-y-6">
                  <h2 className="text-base font-bold text-white flex items-center">
                    <Upload className="w-5 h-5 mr-2 text-blue-400" /> Upload de Arquivos (PDF, OFX, XML, CSV ou Foto)
                  </h2>
                  <div className="border-2 border-dashed border-slate-700 rounded-xl p-10 text-center hover:border-blue-500 transition-all bg-slate-950/50">
                    <Upload className="w-12 h-12 text-slate-500 mx-auto mb-3" />
                    <p className="text-sm font-semibold text-slate-200 mb-1">Arraste seus comprovantes ou notas fiscais aqui</p>
                    <p className="text-xs text-slate-400 mb-4">A IA lê o conteúdo e sugere a conciliação bancária automaticamente.</p>
                    <label className="inline-flex items-center px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl cursor-pointer">
                      <span>Selecionar Arquivo</span>
                      <input type="file" className="hidden" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} />
                    </label>
                    {selectedFile && <p className="text-xs text-emerald-400 mt-4">Arquivo pronto: {selectedFile.name}</p>}
                  </div>
                </div>
              )}

              {/* Sub-aba 1.3: Conciliação Bancária */}
              {activeSubTab === 'reconciliation' && (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                    <h2 className="text-sm font-bold text-white">Conciliação Bancária Automática</h2>
                    <span className="text-xs bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20">Validação Humana Ativa</span>
                  </div>
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-950 text-slate-400 border-b border-slate-800">
                        <th className="p-3">Data</th>
                        <th className="p-3">Descrição no Extrato</th>
                        <th className="p-3">Valor</th>
                        <th className="p-3">Sugestão IA</th>
                        <th className="p-3 text-right">Ação Contábil</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      <tr>
                        <td className="p-3">05/11/2026</td>
                        <td className="p-3">TED RECEBIDA CLIENTE ABC</td>
                        <td className="p-3 text-emerald-400">+ R$ 12.500,00</td>
                        <td className="p-3"><span className="bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded">Venda de Serviços</span></td>
                        <td className="p-3 text-right"><button className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded">Confirmar Lançamento</button></td>
                      </tr>
                      <tr>
                        <td className="p-3">06/11/2026</td>
                        <td className="p-3">PAGTO FORNECEDOR XYZ</td>
                        <td className="p-3 text-red-400">- R$ 3.200,00</td>
                        <td className="p-3"><span className="bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded">Nota Fiscal Vinculada</span></td>
                        <td className="p-3 text-right"><button className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded">Confirmar Lançamento</button></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {/* Sub-aba 1.4: Notas Fiscais e Lançamentos */}
              {activeSubTab === 'invoices' && (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                    <h2 className="text-sm font-bold text-white">Notas Fiscais Emitidas & Importação SEFAZ</h2>
                    <button className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs flex items-center"><Plus className="w-3.5 h-3.5 mr-1" /> Importar XML/SEFAZ</button>
                  </div>
                  <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs space-y-2">
                    <div className="flex justify-between text-slate-300">
                      <span>NF-e nº 00459 - Cliente Serviços SP</span>
                      <span className="text-emerald-400 font-bold">R$ 8.500,00</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Sub-aba 1.5: Plano de Contas */}
              {activeSubTab === 'chart-accounts' && (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
                  <h2 className="text-sm font-bold text-white">Plano de Contas Estruturado</h2>
                  <div className="text-xs space-y-2 text-slate-300">
                    <p className="font-bold text-blue-400">📁 1. ATIVO</p>
                    <p className="pl-4">1.1.1 Caixa Geral</p>
                    <p className="pl-4">1.1.2 Bancos Conta Movimento</p>
                    <p className="font-bold text-purple-400">📁 2. PASSIVO</p>
                    <p className="pl-4">2.1.1 Fornecedores Nacionais</p>
                    <p className="pl-4">2.1.2 Impostos a Recolher (Simples/DAS)</p>
                  </div>
                </div>
              )}

              {/* Sub-aba 1.6: Relatórios Contábeis (DRE, Balanço, Razonete) */}
              {activeSubTab === 'reports' && (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                    <div>
                      <h2 className="text-base font-bold text-white">Relatórios Financeiros Automatizados</h2>
                      <p className="text-xs text-slate-400">DRE, Balanço Patrimonial, Razonete e Livro Caixa prontos para exportação</p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="bg-slate-800 hover:bg-slate-700 text-xs px-3 py-2 rounded-xl border border-slate-700 flex items-center">
                        <FileSpreadsheet className="w-4 h-4 mr-1 text-emerald-400" /> Exportar Excel
                      </button>
                      <button className="bg-blue-600 hover:bg-blue-500 text-xs px-3 py-2 rounded-xl text-white flex items-center">
                        <Download className="w-4 h-4 mr-1" /> Imprimir PDF
                      </button>
                    </div>
                  </div>

                  {/* Demonstração de DRE Automatizada */}
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs space-y-2">
                    <h3 className="font-bold text-blue-400 mb-2">Demonstração do Resultado do Exercício (DRE)</h3>
                    <div className="flex justify-between border-b border-slate-900 pb-1">
                      <span className="text-slate-300">(+) Receita Bruta de Vendas/Serviços</span>
                      <span className="font-bold text-emerald-400">R$ 145.800,00</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-900 pb-1 text-slate-400">
                      <span>(-) Impostos Faturados (Simples Nacional)</span>
                      <span className="text-red-400">- R$ 8.748,00</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-900 pb-1 font-semibold text-slate-200">
                      <span>(=) Receita Líquida</span>
                      <span>R$ 137.052,00</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-900 pb-1 text-slate-400">
                      <span>(-) Despesas Operacionais e Pró-labore</span>
                      <span className="text-red-400">- R$ 42.100,00</span>
                    </div>
                    <div className="flex justify-between pt-2 text-sm font-extrabold text-emerald-400">
                      <span>(=) LUCRO LÍQUIDO DO PERÍODO</span>
                      <span>R$ 94.952,00</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 2. PAINEL VENDEDORA (SUPER ADMIN MASTER) */}
          {activeTab === 'super-admin' && userRole === 'superadmin' && (
            <div className="space-y-6">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
                <h2 className="text-base font-bold text-amber-400 flex items-center">
                  <Building className="w-5 h-5 mr-2" /> Painel da Vendedora: Licenciar Novo Escritório Contábil
                </h2>
                <p className="text-xs text-slate-400">Cadastre o e-mail e a senha do escritório de contabilidade que comprou o SaaS. Eles acederão com estes dados e inserirção a própria API Key de IA.</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <input type="text" placeholder="Nome do Escritório Contábil" className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200" />
                  <input type="email" placeholder="E-mail de Login do Escritório" className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200" />
                  <input type="password" placeholder="Senha Provisória" className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200" />
                </div>
                <button className="bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs px-5 py-2.5 rounded-xl transition-all">
                  Licenciar Escritório e Liberar Acesso
                </button>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
                <h3 className="text-sm font-bold text-white">Escritórios Ativos no Sistema</h3>
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-950 text-slate-400 border-b border-slate-800">
                      <th className="p-3">Escritório</th>
                      <th className="p-3">E-mail</th>
                      <th className="p-3">Status da Licença</th>
                      <th className="p-3 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {officesList.map(off => (
                      <tr key={off.id}>
                        <td className="p-3 font-semibold text-white">{off.name}</td>
                        <td className="p-3 text-slate-300">{off.email}</td>
                        <td className="p-3"><span className="bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded">{off.plan}</span></td>
                        <td className="p-3 text-right space-x-2">
                          <button className="text-slate-400 hover:text-white"><Edit className="w-4 h-4 inline" /></button>
                          <button className="text-red-400 hover:text-red-300"><Trash2 className="w-4 h-4 inline" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 3. USUÁRIOS E ACESSOS DO ESCRITÓRIO */}
          {activeTab === 'users' && userRole !== 'client' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <h2 className="text-base font-bold text-white flex items-center">
                  <Users className="w-5 h-5 mr-2 text-blue-400" /> Controle de Usuários e Acessos
                </h2>
                <button className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs flex items-center"><Plus className="w-3.5 h-3.5 mr-1" /> Criar Acesso</button>
              </div>
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-950 text-slate-400 border-b border-slate-800">
                    <th className="p-3">Nome</th>
                    <th className="p-3">E-mail</th>
                    <th className="p-3">Perfil</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {usersList.map(u => (
                    <tr key={u.id}>
                      <td className="p-3 font-semibold text-white">{u.name}</td>
                      <td className="p-3 text-slate-300">{u.email}</td>
                      <td className="p-3"><span className="bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded">{u.role}</span></td>
                      <td className="p-3"><span className="bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded">{u.status}</span></td>
                      <td className="p-3 text-right space-x-2">
                        <button className="text-slate-400 hover:text-white"><Edit className="w-4 h-4 inline" /></button>
                        <button className="text-red-400 hover:text-red-300"><Trash2 className="w-4 h-4 inline" /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* 4. CONFIGURAR API DE IA PRÓPRIA DO ESCRITÓRIO */}
          {activeTab === 'ai-config' && userRole !== 'client' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6 max-w-3xl">
              <div className="border-b border-slate-800 pb-4">
                <h2 className="text-base font-bold text-white flex items-center">
                  <Key className="w-5 h-5 mr-2 text-amber-400" /> Configurar Chave de API de IA (Seu Consumo Próprio)
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Cole aqui a chave da sua conta OpenAI ou Claude. Toda a inteligência artificial utilizará os seus créditos diretamente.
                </p>
              </div>

              <form onSubmit={handleSaveApiKey} className="space-y-4 text-xs">
                <div>
                  <label className="text-slate-300 block mb-1 font-semibold">Provedor de IA</label>
                  <select 
                    value={aiProvider} 
                    onChange={(e) => setAiProvider(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none"
                  >
                    <option value="openai">OpenAI (GPT-4o)</option>
                    <option value="anthropic">Anthropic (Claude 3.5 Sonnet)</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 block mb-1 font-semibold">Sua Chave de API Privada</label>
                  <input 
                    type="password" 
                    placeholder="sk-proj-..." 
                    value={aiApiKey}
                    onChange={(e) => setAiApiKey(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 font-mono text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>

                <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-5 py-2.5 rounded-xl transition-all flex items-center">
                  <Save className="w-4 h-4 mr-1.5" /> Salvar Chave de API
                </button>
                {keySaved && <p className="text-xs text-emerald-400 mt-2 font-medium">✓ Chave guardada e ativada!</p>}
              </form>
            </div>
          )}

          {/* 5. AUDITORIA POR IA */}
          {activeTab === 'ai-audit' && userRole !== 'client' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h2 className="text-base font-bold text-white flex items-center">
                <ShieldAlert className="w-5 h-5 mr-2 text-amber-400" /> Módulo de Auditoria Automatizada por IA
              </h2>
              <p className="text-xs text-slate-400">Verificação proativa de incongruências entre extratos bancários, guias de DAS e notas fiscais.</p>
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs text-emerald-300">
                ✓ IA operando normalmente com a chave configurada pelo escritório.
              </div>
            </div>
          )}

          {/* 6. CHAT COM IA PRÓPRIA */}
          {
