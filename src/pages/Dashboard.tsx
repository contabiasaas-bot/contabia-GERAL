import React, { useState } from 'react';
import { 
  Building2, Users, Building, Search, FileText, CheckCircle2, ShieldAlert, 
  Upload, CreditCard, DollarSign, Bell, UserCheck, ShieldCheck, 
  Bot, MessageSquare, Calendar, Lock, Trash2, Edit, Plus, Key, LogOut, Save, Download, 
  FileSpreadsheet, AlertTriangle, Calculator, FileCheck, ChevronDown, ChevronRight, BarChart3, TrendingUp, RefreshCw, Layers
} from 'lucide-react';

export function Dashboard() {
  // Autenticação e Perfis
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [userRole, setUserRole] = useState<'superadmin' | 'office' | 'client'>('office');

  // Navegação Principal e Sub-Navegações
  const [activeTab, setActiveTab] = useState('overview');
  const [activeSubTab, setActiveSubTab] = useState('cnpj-overview');
  const [selectedClient, setSelectedClient] = useState('12.345.678/0001-90 - Empresa Exemplo Ltda');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Expansão de Menus Laterais (Sub-abas dinâmicas)
  const [isClientsMenuOpen, setIsClientsMenuOpen] = useState(true);
  const [isReportsMenuOpen, setIsReportsMenuOpen] = useState(false);

  // Configuração da API de IA do Escritório
  const [aiApiKey, setAiApiKey] = useState('sk-proj-********************************');
  const [aiProvider, setAiProvider] = useState('openai');
  const [keySaved, setKeySaved] = useState(false);

  // Base de Dados de Escritórios (Visão Vendedora)
  const [officesList] = useState([
    { id: 1, name: 'Escritório Contábil Alpha Ltda', email: 'contato@alpha.com', cnpj: '00.123.456/0001-00', plan: 'Enterprise (Licenciado)', activeClients: 42, status: 'Ativo' },
    { id: 2, name: 'Beta Soluções Fiscais & Auditoria', email: 'adm@beta.com', cnpj: '11.987.654/0001-99', plan: 'Profissional (Licenciado)', activeClients: 18, status: 'Ativo' }
  ]);

  // Base de Clientes do Escritório
  const [clientsList] = useState([
    { cnpj: '12.345.678/0001-90', name: 'Empresa Exemplo Ltda', regime: 'Simples Nacional', status: 'Em Dia', conciliation: '100%' },
    { cnpj: '98.765.432/0001-10', name: 'Comércio de Bebidas SA', regime: 'Lucro Presumido', status: 'Divergência Notada', conciliation: '85%' },
    { cnpj: '45.123.890/0001-55', name: 'Tech Solutions Serviços', regime: 'Simples Nacional', status: 'Em Dia', conciliation: '100%' }
  ]);

  // Base de Lançamentos para Conciliação Inteligente
  const [reconciliations, setReconciliations] = useState([
    { id: 1, date: '05/11/2026', desc: 'TED RECEBIDA CLIENTE ABC', val: '+ R$ 12.500,00', type: 'in', iaStatus: 'Nota Compatible (NF-e #459)', alert: false },
    { id: 2, date: '06/11/2026', desc: 'PGTO FORNECEDOR XYZ', val: '- R$ 3.200,00', type: 'out', iaStatus: 'Comprovante Encontrado', alert: false },
    { id: 3, date: '07/11/2026', desc: 'SAQUE CAIXA ELETRÔNICO UNIBANCO', val: '- R$ 1.500,00', type: 'out', iaStatus: 'Sem Comprovante Anexado', alert: true }
  ]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const mail = loginEmail.toLowerCase();
    if (mail.includes('admin') || mail.includes('vendedora')) {
      setUserRole('superadmin');
      setActiveTab('super-admin');
    } else if (mail.includes('cliente') || mail.includes('empresa')) {
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

  // TELA DE LOGIN CORPORATIVA COM RESTRICAO TOTAL
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 font-sans text-slate-100">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-md w-full shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-2xl mx-auto flex items-center justify-center text-white shadow-xl shadow-blue-500/20">
              <Building2 className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white">ContabilCore SaaS</h1>
            <p className="text-xs text-slate-400">Plataforma Avançada de Gestão & Auditoria Inteligente</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="text-slate-300 block mb-1 font-semibold">E-mail de Acesso</label>
              <input 
                type="email" 
                required
                placeholder="seu.email@escritorio.com" 
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-slate-200 focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>
            <div>
              <label className="text-slate-300 block mb-1 font-semibold">Senha Corporativa</label>
              <input 
                type="password" 
                required
                placeholder="••••••••" 
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-slate-200 focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-600/30 text-sm"
            >
              Aceder ao Portal
            </button>
            
            <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <p className="font-bold text-slate-200 mb-1">Simular Perfil de Acesso:</p>
              <p>• <span className="text-amber-400 font-semibold">Painel Vendedora (SaaS Master):</span> digite <code className="text-amber-300">admin</code> no e-mail</p>
              <p>• <span className="text-blue-400 font-semibold">Painel da Contabilidade (B2B):</span> digite qualquer outro e-mail</p>
              <p>• <span className="text-emerald-400 font-semibold">Portal do Cliente CNPJ:</span> digite <code className="text-emerald-300">cliente</code> no e-mail</p>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-600 selection:text-white overflow-hidden">
      
      {/* SIDEBAR CORPORATIVA EXPANSÍVEL */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between shrink-0">
        <div>
          <div className="p-4 border-b border-slate-800 flex items-center space-x-3">
            <div className="bg-gradient-to-tr from-blue-600 to-indigo-500 p-2 rounded-xl text-white shadow-lg shadow-blue-500/20">
              <Building2 className="w-5 h-5" />
            </div>
            <div className="overflow-hidden">
              <h1 className="text-sm font-black text-white truncate">ContabilCore SaaS</h1>
              <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider truncate">
                {userRole === 'superadmin' ? 'Master Vendedora' : userRole === 'client' ? 'Portal Empresa' : 'Painel Contábil'}
              </p>
            </div>
          </div>

          {userRole !== 'client' && (
            <div className="p-3">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
                <input 
                  type="text" 
                  placeholder="Buscar Cliente ou CNPJ..." 
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500 transition-all"
                />
              </div>
            </div>
          )}

          {/* MENU LATERAL COM SUB-CATEGORIAS E ABAS DE AÇÃO */}
          <nav className="px-2 py-2 space-y-1 text-xs font-medium overflow-y-auto max-h-[calc(100vh-140px)]">
            
            {/* 1. VISÃO MASTER (APENAS VENDEDORA) */}
            {userRole === 'superadmin' && (
              <button 
                onClick={() => setActiveTab('super-admin')} 
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${activeTab === 'super-admin' ? 'bg-amber-600 text-white font-bold shadow-lg shadow-amber-600/20' : 'text-amber-400 hover:bg-slate-800'}`}
              >
                <span className="flex items-center"><Building className="w-4 h-4 mr-2.5" /> Gestão de Escritórios</span>
                <span className="bg-amber-500/20 text-amber-300 text-[10px] px-1.5 py-0.5 rounded">Master</span>
              </button>
            )}

            {/* 2. PAINEL PRINCIPAL DE GESTÃO DO CNPJ */}
            <button 
              onClick={() => setActiveTab('overview')} 
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${activeTab === 'overview' ? 'bg-blue-600 text-white font-bold shadow-lg shadow-blue-600/20' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}
            >
              <span className="flex items-center"><Building2 className="w-4 h-4 mr-2.5" /> {userRole === 'client' ? 'Meu Espaço CNPJ' : 'Visão Geral & CNPJ'}</span>
            </button>

            {/* 3. OPERAÇÃO COMPLETA DA CONTABILIDADE */}
            {userRole !== 'client' && (
              <>
                {/* SUB-MENU EXPANSÍVEL: GERENCIAR CARTEIRA DE CLIENTES */}
                <div>
                  <button 
                    onClick={() => setIsClientsMenuOpen(!isClientsMenuOpen)} 
                    className="w-full flex items-center justify-between px-3 py-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 rounded-xl transition-all"
                  >
                    <span className="flex items-center"><Users className="w-4 h-4 mr-2.5 text-indigo-400" /> Carteira de Clientes</span>
                    {isClientsMenuOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                  </button>
                  {isClientsMenuOpen && (
                    <div className="ml-6 pl-2 border-l border-slate-800 space-y-1 mt-1">
                      <button 
                        onClick={() => { setActiveTab('overview'); setActiveSubTab('cnpj-overview'); }}
                        className={`w-full text-left px-2 py-1.5 rounded-lg text-[11px] transition-colors ${activeTab === 'overview' && activeSubTab === 'cnpj-overview' ? 'text-blue-400 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
                      >
                        • Cadastro & Dados Receita
                      </button>
                      <button 
                        onClick={() => { setActiveTab('overview'); setActiveSubTab('reconciliation'); }}
                        className={`w-full text-left px-2 py-1.5 rounded-lg text-[11px] transition-colors ${activeTab === 'overview' && activeSubTab === 'reconciliation' ? 'text-blue-400 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
                      >
                        • Conciliação Bancária
                      </button>
                      <button 
                        onClick={() => { setActiveTab('overview'); setActiveSubTab('reports'); }}
                        className={`w-full text-left px-2 py-1.5 rounded-lg text-[11px] transition-colors ${activeTab === 'overview' && activeSubTab === 'reports' ? 'text-blue-400 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
                      >
                        • Fechamento DRE & Balanço
                      </button>
                    </div>
                  )}
                </div>

                <button 
                  onClick={() => setActiveTab('users')} 
                  className={`w-full flex items-center px-3 py-2.5 rounded-xl transition-all ${activeTab === 'users' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}
                >
                  <UserCheck className="w-4 h-4 mr-2.5" /> Usuários e Permissões
                </button>

                <button 
                  onClick={() => setActiveTab('ai-config')} 
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${activeTab === 'ai-config' ? 'bg-amber-600 text-white font-bold shadow-lg shadow-amber-600/20' : 'text-amber-400 hover:bg-slate-800'}`}
                >
                  <span className="flex items-center"><Key className="w-4 h-4 mr-2.5" /> Configurar Minha API de IA</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                </button>

                <button 
                  onClick={() => setActiveTab('ai-audit')} 
                  className={`w-full flex items-center px-3 py-2.5 rounded-xl transition-all ${activeTab === 'ai-audit' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}
                >
                  <ShieldAlert className="w-4 h-4 mr-2.5 text-amber-400" /> Auditoria Fiscal Automatizada
                </button>

                <button 
                  onClick={() => setActiveTab('ai-chat')} 
                  className={`w-full flex items-center px-3 py-2.5 rounded-xl transition-all ${activeTab === 'ai-chat' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}
                >
                  <Bot className="w-4 h-4 mr-2.5 text-blue-400" /> Assistente IA Contábil
                </button>

                <button 
                  onClick={() => setActiveTab('calendar')} 
                  className={`w-full flex items-center px-3 py-2.5 rounded-xl transition-all ${activeTab === 'calendar' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}
                >
                  <Calendar className="w-4 h-4 mr-2.5 text-purple-400" /> Calendário de Obrigação Fiscal
                </button>

                <button 
                  onClick={() => setActiveTab('receivables')} 
                  className={`w-full flex items-center px-3 py-2.5 rounded-xl transition-all ${activeTab === 'receivables' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}
                >
                  <DollarSign className="w-4 h-4 mr-2.5 text-emerald-400" /> Honorários & Cobranças
                </button>

                <button 
                  onClick={() => setActiveTab('payroll')} 
                  className={`w-full flex items-center px-3 py-2.5 rounded-xl transition-all ${activeTab === 'payroll' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}
                >
                  <Calculator className="w-4 h-4 mr-2.5 text-indigo-400" /> Folha e Pró-labore
                </button>
              </>
            )}
          </nav>
        </div>

        <div className="p-3 border-t border-slate-800 flex items-center justify-between">
          <span className="text-[10px] text-emerald-400 font-semibold flex items-center"><ShieldCheck className="w-3.5 h-3.5 mr-1" /> LGPD Ativo</span>
          <button onClick={() => setIsLoggedIn(false)} className="text-slate-400 hover:text-red-400 text-xs flex items-center font-medium transition-colors">
            <LogOut className="w-3.5 h-3.5 mr-1" /> Sair
          </button>
        </div>
      </aside>

      {/* ÁREA CENTRAL PRINCIPAL */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* TOPBAR */}
        <header className="h-14 bg-slate-900 border-b border-slate-800 px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <span className="text-xs font-semibold text-slate-400">Cliente CNPJ Selecionado:</span>
            {userRole === 'client' ? (
              <span className="text-xs font-bold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-lg border border-blue-500/20">12.345.678/0001-90 - Empresa Exemplo Ltda</span>
            ) : (
              <select 
                value={selectedClient} 
                onChange={(e) => setSelectedClient(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 font-bold focus:outline-none focus:border-blue-500"
              >
                {clientsList.map(c => (
                  <option key={c.cnpj} value={`${c.cnpj} - ${c.name}`}>{c.cnpj} - {c.name}</option>
                ))}
              </select>
            )}
          </div>
          
          <div className="flex items-center space-x-3">
            <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 mr-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
              API de IA Operacional
            </span>
            <button className="p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-lg border border-slate-700 relative">
              <Bell className="w-4 h-4" />
              <span className="w-2 h-2 bg-blue-500 rounded-full absolute top-1 right-1"></span>
            </button>
            <div className="flex items-center space-x-2 pl-2 border-l border-slate-800">
              <div className="w-7 h-7 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-full flex items-center justify-center font-bold text-xs text-white">
                {userRole === 'superadmin' ? 'SA' : userRole === 'client' ? 'CLI' : 'ESC'}
              </div>
              <span className="text-xs font-bold text-slate-200">
                {userRole === 'superadmin' ? 'Super Admin Master' : userRole === 'client' ? 'Empresa CNPJ' : 'Escritório Contábil'}
              </span>
            </div>
          </div>
        </header>

        {/* ÁREA DE CONTEÚDO RENDERIZADA */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* ==================================================== */}
          {/* 1. VISÃO GERAL DO CNPJ E TODAS AS SUB-ABAS */}
          {/* ==================================================== */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* SUB-ABAS PRINCIPAIS */}
              <div className="flex border-b border-slate-800 space-x-2 overflow-x-auto text-xs font-medium pb-1">
                <button onClick={() => setActiveSubTab('cnpj-overview')} className={`px-4 py-2.5 rounded-t-xl transition-all border-b-2 ${activeSubTab === 'cnpj-overview' ? 'border-blue-500 text-blue-400 bg-slate-900/80 font-bold' : 'border-transparent text-slate-400 hover:text-slate-200'}`}>Visão Geral & Cadastro Receita</button>
                <button onClick={() => setActiveSubTab('docs')} className={`px-4 py-2.5 rounded-t-xl transition-all border-b-2 ${activeSubTab === 'docs' ? 'border-blue-500 text-blue-400 bg-slate-900/80 font-bold' : 'border-transparent text-slate-400 hover:text-slate-200'}`}>Documentos & IA</button>
                <button onClick={() => setActiveSubTab('reconciliation')} className={`px-4 py-2.5 rounded-t-xl transition-all border-b-2 ${activeSubTab === 'reconciliation' ? 'border-blue-500 text-blue-400 bg-slate-900/80 font-bold' : 'border-transparent text-slate-400 hover:text-slate-200'}`}>Conciliação Bancária</button>
                <button onClick={() => setActiveSubTab('invoices')} className={`px-4 py-2.5 rounded-t-xl transition-all border-b-2 ${activeSubTab === 'invoices' ? 'border-blue-500 text-blue-400 bg-slate-900/80 font-bold' : 'border-transparent text-slate-400 hover:text-slate-200'}`}>Notas Fiscais & Lançamentos</button>
                <button onClick={() => setActiveSubTab('chart-accounts')} className={`px-4 py-2.5 rounded-t-xl transition-all border-b-2 ${activeSubTab === 'chart-accounts' ? 'border-blue-500 text-blue-400 bg-slate-900/80 font-bold' : 'border-transparent text-slate-400 hover:text-slate-200'}`}>Plano de Contas</button>
                <button onClick={() => setActiveSubTab('reports')} className={`px-4 py-2.5 rounded-t-xl transition-all border-b-2 ${activeSubTab === 'reports' ? 'border-blue-500 text-blue-400 bg-slate-900/80 font-bold' : 'border-transparent text-slate-400 hover:text-slate-200'}`}>Relatórios (DRE / Balanço / Razão)</button>
              </div>

              {/* SUB-ABA: VISÃO GERAL & CADASTRO */}
              {activeSubTab === 'cnpj-overview' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Conciliação do Mês</p>
                      <h3 className="text-3xl font-black text-emerald-400 mt-1">100%</h3>
                      <p className="text-xs text-slate-400 mt-2 flex items-center">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mr-1" /> Todos os lançamentos batem com extrato
                      </p>
                    </div>
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Auditoria IA Auditora</p>
                      <h3 className="text-3xl font-black text-blue-400 mt-1">Aprovado</h3>
                      <p className="text-xs text-slate-400 mt-2">Nenhum risco tributário detectado</p>
                    </div>
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Faturamento Acumulado</p>
                      <h3 className="text-3xl font-black text-purple-400 mt-1">R$ 145.800,00</h3>
                      <p className="text-xs text-slate-400 mt-2">Competência Atual (Novembro/2026)</p>
                    </div>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                      <h2 className="text-sm font-bold text-white flex items-center">
                        <Building2 className="w-4 h-4 mr-2 text-blue-400" /> Dados Cadastrais Automáticos (Sincronizado Receita Federal)
                      </h2>
                      <button className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-3 py-1.5 rounded-lg flex items-center transition-all">
                        <RefreshCw className="w-3.5 h-3.5 mr-1" /> Reconsultar CNPJ
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div>
                        <label className="text-slate-400 block mb-1">Razão Social</label>
                        <input type="text" defaultValue="Empresa Exemplo Ltda" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200" />
                      </div>
                      <div>
                        <label className="text-slate-400 block mb-1">CNPJ</label>
                        <input type="text" defaultValue="12.345.678/0001-90" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200" />
                      </div>
                      <div>
                        <label className="text-slate-400 block mb-1">Atividade Econômica (CNAE Principal)</label>
                        <input type="text" defaultValue="6201-5/01 - Desenvolvimento de Programas de Computador" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200" />
                      </div>
                      <div>
                        <label className="text-slate-400 block mb-1">Regime Tributário</label>
                        <input type="text" defaultValue="Simples Nacional - Anexo III" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SUB-ABA: DOCUMENTOS & IA */}
              {activeSubTab === 'docs' && (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl space-y-6">
                  <div className="border-b border-slate-800 pb-4">
                    <h2 className="text-base font-bold text-white flex items-center">
                      <Upload className="w-5 h-5 mr-2 text-blue-400" /> Central de Uploads com Processamento IA
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">Suporta ficheiros em PDF, OFX, XML, CSV e imagens/fotos de comprovantes.</p>
                  </div>
                  <div className="border-2 border-dashed border-slate-700 rounded-2xl p-10 text-center hover:border-blue-500 transition-all bg-slate-950/50 group cursor-pointer">
                    <Upload className="w-12 h-12 text-slate-500 group-hover:text-blue-400 mx-auto mb-3 transition-colors" />
                    <p className="text-sm font-semibold text-slate-200 mb-1">Arraste seus comprovantes ou extratos bancários para aqui</p>
                    <p className="text-xs text-slate-400 mb-6">A IA lê os valores, identifica a contrapartida no plano de contas e sugere a conciliação.</p>
                    <label className="inline-flex items-center px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl cursor-pointer transition-all shadow-lg shadow-blue-600/30">
                      <span>Selecionar Arquivo</span>
                      <input type="file" className="hidden" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} />
                    </label>
                    {selectedFile && <p className="text-xs text-emerald-400 mt-4 font-semibold">✓ Arquivo carregado: {selectedFile.name}</p>}
                  </div>
                </div>
              )}

              {/* SUB-ABA: CONCILIAÇÃO BANCÁRIA */}
              {activeSubTab === 'reconciliation' && (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                    <div>
                      <h2 className="text-sm font-bold text-white">Conciliação Bancária & Auditoria de Extrato</h2>
                      <p className="text-xs text-slate-400">A IA compara o extrato bancário com as notas fiscais enviadas.</p>
                    </div>
                    <span className="text-xs bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20 font-semibold">Segurança Humana Ativa</span>
                  </div>

                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-950 text-slate-400 border-b border-slate-800">
                        <th className="p-3">Data</th>
                        <th className="p-3">Descrição Extrato</th>
                        <th className="p-3">Valor</th>
                        <th className="p-3">Status Auditoria IA</th>
                        <th className="p-3 text-right">Ação Contábil</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {reconciliations.map(r => (
                        <tr key={r.id} className="hover:bg-slate-950/40">
                          <td className="p-3 text-slate-300">{r.date}</td>
                          <td className="p-3 font-semibold text-white">{r.desc}</td>
                          <td className={`p-3 font-bold ${r.type === 'in' ? 'text-emerald-400' : 'text-red-400'}`}>{r.val}</td>
                          <td className="p-3">
                            <span className={`px-2.5 py-1 rounded-lg font-semibold ${r.alert ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'}`}>
                              {r.iaStatus}
                            </span>
                          </td>
                          <td className="p-3 text-right">
                            <button className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg font-semibold transition-colors">
                              Confirmar Lançamento
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* SUB-ABA: RELATÓRIOS CONTÁBEIS */}
              {activeSubTab === 'reports' && (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                    <div>
                      <h2 className="text-base font-bold text-white">Relatórios & Livros Contábeis Oficiais</h2>
                      <p className="text-xs text-slate-400">Gere DRE, Balanço Patrimonial, Razonete e Livro Diário com 1 clique</p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="bg-slate-800 hover:bg-slate-700 text-xs px-3.5 py-2 rounded-xl border border-slate-700 flex items-center font-semibold text-slate-200">
                        <FileSpreadsheet className="w-4 h-4 mr-1.5 text-emerald-400" /> Exportar Excel (.xlsx)
                      </button>
                      <button className="bg-blue-600 hover:bg-blue-500 text-xs px-3.5 py-2 rounded-xl text-white flex items-center font-semibold transition-all">
                        <Download className="w-4 h-4 mr-1.5" /> Imprimir Relatório PDF
                      </button>
                    </div>
                  </div>

                  {/* DRE DETALHADA */}
                  <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 text-xs space-y-3">
                    <h3 className="font-bold text-blue-400 text-sm mb-4">Demonstração do Resultado do Exercício (DRE) - Novembro/2026</h3>
                    <div className="flex justify-between border-b border-slate-900 pb-2">
                      <span className="text-slate-300 font-semibold">(+) RECEITA BRUTA DE VENDAS E SERVIÇOS</span>
                      <span className="font-extrabold text-emerald-400 text-sm">R$ 145.800,00</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-900 pb-2 text-slate-400">
                      <span>(-) Impostos Faturados (Simples Nacional - DAS)</span>
                      <span className="text-red-400 font-semibold">- R$ 8.748,00</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-900 pb-2 font-bold text-slate-200">
                      <span>(=) RECEITA LÍQUIDA OPERACIONAL</span>
                      <span>R$ 137.052,00</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-900 pb-2 text-slate-400">
                      <span>(-) Custos Operacionais e Pró-labore Sócios</span>
                      <span className="text-red-400 font-semibold">- R$ 42.100,00</span>
                    </div>
                    <div className="flex justify-between pt-3 text-base font-black text-emerald-400 bg-emerald-500/5 p-3 rounded-xl border border-emerald-500/10">
                      <span>(=) LUCRO LÍQUIDO DO PERÍODO</span>
                      <span>R$ 94.952,00</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ==================================================== */}
          {/* 2. PAINEL VENDEDORA (SUPER ADMIN MASTER) */}
          {/* ==================================================== */}
          {activeTab === 'super-admin' && userRole === 'superadmin' && (
            <div className="space-y-6">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
                <h2 className="text-base font-bold text-amber-400 flex items-center">
                  <Building className="w-5 h-5 mr-2" /> Painel da Vendedora: Licenciamento de Escritórios B2B
                </h2>
                <p className="text-xs text-slate-400">Cadastre os dados de login dos escritórios que adquiriram a licença. Cada escritório utilizará a própria API Key de IA sem custo adicional para si.</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <input type="text" placeholder="Razão Social do Escritório" className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200" />
                  <input type="email" placeholder="E-mail de Login do Escritório" className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200" />
                  <input type="password" placeholder="Senha Inicial" className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200" />
                </div>
                <button className="bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs px-5 py-3 rounded-xl transition-all">
                  Licenciar Escritório Contábil
                </button>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
                <h3 className="text-sm font-bold text-white">Escritórios Clientes Ativos</h3>
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-950 text-slate-400 border-b border-slate-800">
                      <th className="p-3">Escritório</th>
                      <th className="p-3">E-mail</th>
                      <th className="p-3">Clientes Ativos</th>
                      <th className="p-3">Status Licença</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {officesList.map(off => (
                      <tr key={off.id}>
                        <td className="p-3 font-semibold text-white">{off.name}</td>
                        <td className="p-3 text-slate-300">{off.email}</td>
                        <td className="p-3 text-blue-400 font-bold">{off.activeClients} CNPJs</td>
                        <td className="p-3"><span className="bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-lg border border-emerald-500/20 font-semibold">{off.plan}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ==================================================== */}
          {/* 3. CONFIGURAÇÃO DA CHAVE DE API DE IA DO ESCRITÓRIO */}
          {/* ==================================================== */}
          {activeTab === 'ai-config' && userRole !== 'client' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6 max-w-3xl">
              <div className="border-b border-slate-800 pb-4">
                <h2 className="text-base font-bold text-white flex items-center">
                  <Key className="w-5 h-5 mr-2 text-amber-400" /> Configuração da Chave de API de IA Privada
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Cole aqui a sua chave de API (OpenAI ou Claude). O consumo da IA é faturado diretamente pelo provedor para o seu escritório.
                </p>
              </div>

              <form onSubmit={handleSaveApiKey} className="space-y-4 text-xs">
                <div>
                  <label className="text-slate-300 block mb-1 font-semibold">Provedor de Inteligência Artificial</label>
                  <select 
                    value={aiProvider} 
                    onChange={(e) => setAiProvider(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 font-semibold focus:outline-none"
                  >
                    <option value="openai">OpenAI (GPT-4o / GPT-4o-mini)</option>
                    <option value="anthropic">Anthropic (Claude 3.5 Sonnet)</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 block mb-1 font-semibold">Sua Chave de API Secreta (API Key)</label>
                  <input 
                    type="password" 
                    placeholder="sk-proj-..." 
                    value={aiApiKey}
                    onChange={(e) => setAiApiKey(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 font-mono text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>

                <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-lg flex items-center">
                  <Save className="w-4 h-4 mr-1.5" /> Salvar Chave de API
                </button>
                {keySaved && <p className="text-xs text-emerald-400 font-semibold">✓ Chave gravada e pronta para auditar!</p>}
              </form>
            </div>
          )}

          {/* DEMAIS MÓDULOS DE SUPORTE */}
          {activeTab === 'users' && userRole !== 'client' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h2 className="text-base font-bold text-white">Controle de Usuários e Permissões</h2>
              <p className="text-xs text-slate-400">Crie ou remova acessos dos contadores e clientes sem cadastro aberto.</p>
            </div>
          )}

          {activeTab === 'ai-audit' && userRole !== 'client' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h2 className="text-base font-bold text-white flex items-center text-amber-400">
                <ShieldAlert className="w-5 h-5 mr-2" /> Auditoria Fiscal Automatizada
              </h2>
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs text-emerald-300 font-semibold">
                ✓ IA verificou 145 lançamentos sem detectar divergências de impostos ou saídas sem nota.
              </div>
            </div>
          )}

          {activeTab === 'ai-chat' && userRole !== 'client' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col h-[450px]">
              <h2 className="text-base font-bold text-white mb-4">Assistente IA Contábil Própria</h2>
              <div className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-blue-200">
                Assistente operacional pronto utilizando a chave de API cadastrada pelo seu escritório.
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
