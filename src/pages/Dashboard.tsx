import React, { useState } from 'react';
import { 
  Building2, Users, Building, Search, FileText, CheckCircle2, ShieldAlert, 
  Upload, CreditCard, DollarSign, Bell, UserCheck, ShieldCheck, 
  Bot, MessageSquare, Calendar, Lock, Trash2, Edit, Plus, Key, LogOut, Save, Settings
} from 'lucide-react';

export function Dashboard() {
  // Estado de Autenticação (Login por escritório ou admin)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [userRole, setUserRole] = useState<'superadmin' | 'office'>('office');

  // Navegação de abas
  const [activeTab, setActiveTab] = useState('overview');
  const [activeSubTab, setActiveSubTab] = useState('cnpj-overview');
  const [selectedClient, setSelectedClient] = useState('12.345.678/0001-90 - Empresa Exemplo Ltda');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Configuração Própria da API de IA (Armazenada por cada escritório)
  const [aiApiKey, setAiApiKey] = useState('');
  const [aiProvider, setAiProvider] = useState('openai');
  const [keySaved, setKeySaved] = useState(false);

  // Listas de gestão
  const [officesList, setOfficesList] = useState([
    { id: 1, name: 'Escritório Contábil Alpha', email: 'contato@alpha.com', cnpj: '00.123.456/0001-00', plan: 'Profissional' },
    { id: 2, name: 'Beta Soluções Fiscais', email: 'adm@beta.com', cnpj: '11.987.654/0001-99', plan: 'Starter' }
  ]);

  const [usersList] = useState([
    { id: 1, name: 'Ana Souza', email: 'ana@escritorio.com', role: 'Contador', status: 'Ativo' },
    { id: 2, name: 'Carlos Lima', email: 'carlos@empresaexemplo.com', role: 'Cliente CNPJ', status: 'Ativo' }
  ]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginEmail.includes('admin')) {
      setUserRole('superadmin');
    } else {
      setUserRole('office');
    }
    setIsLoggedIn(true);
  };

  const handleSaveApiKey = (e: React.FormEvent) => {
    e.preventDefault();
    setKeySaved(true);
    setTimeout(() => setKeySaved(false), 3000);
  };

  // 1. TELA DE LOGIN (Sem cadastro público)
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 font-sans text-slate-100">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 max-w-md w-full shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-blue-600 rounded-xl mx-auto flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
              <Building2 className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold text-white">ContabilCore SaaS</h1>
            <p className="text-xs text-slate-400">Portal Contábil Multi-Tenant</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="text-slate-400 block mb-1">E-mail do Escritório / Usuário</label>
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
              Entrar no Portal
            </button>
            <p className="text-[10px] text-center text-slate-500 mt-2">
              Acesso exclusivo liberado pela administração do sistema.
            </p>
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
              <p className="text-xs text-slate-400 truncate">{userRole === 'superadmin' ? 'Super Admin Master' : 'Escritório Contábil'}</p>
            </div>
          </div>

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

          <nav className="px-2 py-2 space-y-1 text-xs font-medium">
            {userRole === 'superadmin' && (
              <button 
                onClick={() => setActiveTab('super-admin')} 
                className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${activeTab === 'super-admin' ? 'bg-amber-600 text-white font-semibold' : 'text-amber-400 hover:bg-slate-800'}`}
              >
                <Building className="w-4 h-4 mr-2.5" /> Master: Cadastrar Escritórios
              </button>
            )}

            <button onClick={() => setActiveTab('overview')} className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${activeTab === 'overview' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}>
              <Building2 className="w-4 h-4 mr-2.5" /> Visão Geral & CNPJ
            </button>
            <button onClick={() => setActiveTab('users')} className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${activeTab === 'users' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}>
              <Users className="w-4 h-4 mr-2.5" /> Usuários e Acessos
            </button>
            <button onClick={() => setActiveTab('ai-config')} className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${activeTab === 'ai-config' ? 'bg-blue-600 text-white font-semibold' : 'text-amber-400 hover:bg-slate-800'}`}>
              <Key className="w-4 h-4 mr-2.5" /> Configurar Minha API de IA
            </button>
            <button onClick={() => setActiveTab('ai-audit')} className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${activeTab === 'ai-audit' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}>
              <ShieldAlert className="w-4 h-4 mr-2.5 text-amber-400" /> Auditoria por IA
            </button>
            <button onClick={() => setActiveTab('ai-chat')} className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${activeTab === 'ai-chat' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}>
              <Bot className="w-4 h-4 mr-2.5 text-blue-400" /> Chat com IA Própria
            </button>
            <button onClick={() => setActiveTab('calendar')} className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${activeTab === 'calendar' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}>
              <Calendar className="w-4 h-4 mr-2.5" /> Calendário Fiscal
            </button>
            <button onClick={() => setActiveTab('subscriptions')} className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${activeTab === 'subscriptions' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}>
              <CreditCard className="w-4 h-4 mr-2.5" /> Cobrança de Assinatura
            </button>
            <button onClick={() => setActiveTab('receivables')} className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${activeTab === 'receivables' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}>
              <DollarSign className="w-4 h-4 mr-2.5" /> Honorários & Contas
            </button>
            <button onClick={() => setActiveTab('payroll')} className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${activeTab === 'payroll' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}>
              <UserCheck className="w-4 h-4 mr-2.5" /> Folha e Pró-labore
            </button>
          </nav>
        </div>

        <div className="p-3 border-t border-slate-800 flex items-center justify-between">
          <span className="text-[10px] text-emerald-400 flex items-center"><ShieldCheck className="w-3.5 h-3.5 mr-1" /> LGPD Ativo</span>
          <button onClick={() => setIsLoggedIn(false)} className="text-slate-400 hover:text-red-400 text-xs flex items-center">
            <LogOut className="w-3.5 h-3.5 mr-1" /> Sair
          </button>
        </div>
      </aside>

      {/* Área Central */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
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
            </select>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-lg border border-slate-700">
              <Bell className="w-4 h-4" />
            </button>
            <div className="flex items-center space-x-2 pl-2 border-l border-slate-800">
              <div className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center font-bold text-xs">
                {userRole === 'superadmin' ? 'SA' : 'AC'}
              </div>
              <span className="text-xs font-medium text-slate-200">
                {userRole === 'superadmin' ? 'Super Admin Master' : 'Escritório Contábil'}
              </span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* ABA: CONFIGURAR CHAVE DE API DE IA PRÓPRIA DO ESCRITÓRIO */}
          {activeTab === 'ai-config' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6 max-w-3xl">
              <div className="border-b border-slate-800 pb-4">
                <h2 className="text-base font-bold text-white flex items-center">
                  <Key className="w-5 h-5 mr-2 text-amber-400" /> Configuração da Chave de API de IA (Seu Consumo Próprio)
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Insira a chave da sua conta. O consumo da IA é faturado diretamente pelo provedor que escolher (OpenAI, Anthropic, etc.), sem custos extras no portal.
                </p>
              </div>

              <form onSubmit={handleSaveApiKey} className="space-y-4 text-xs">
                <div>
                  <label className="text-slate-300 block mb-1 font-semibold">Provedor de Inteligência Artificial</label>
                  <select 
                    value={aiProvider} 
                    onChange={(e) => setAiProvider(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-blue-500 font-medium"
                  >
                    <option value="openai">OpenAI (GPT-4o / GPT-4o-mini)</option>
                    <option value="anthropic">Anthropic (Claude 3.5 Sonnet)</option>
                    <option value="google">Google Gemini Pro</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 block mb-1 font-semibold">Sua Chave de API Privada (API Key)</label>
                  <input 
                    type="password" 
                    placeholder="sk-proj-..." 
                    value={aiApiKey}
                    onChange={(e) => setAiApiKey(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 font-mono text-xs focus:outline-none focus:border-blue-500"
                  />
                  <p className="text-[10px] text-slate-500 mt-1">
                    A chave fica salva com criptografia para uso exclusivo nas audições do seu escritório.
                  </p>
                </div>

                <div className="flex items-center space-x-3 pt-2">
                  <button 
                    type="submit" 
                    className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-5 py-2.5 rounded-xl transition-all shadow-lg flex items-center"
                  >
                    <Save className="w-4 h-4 mr-1.5" /> Guardar Chave de API
                  </button>
                  {keySaved && (
                    <span className="text-xs text-emerald-400 font-medium flex items-center">
                      <CheckCircle2 className="w-4 h-4 mr-1" /> Chave guardada com sucesso!
                    </span>
                  )}
                </div>
              </form>
            </div>
          )}

          {/* PAINEL SUPER ADMIN (VENDER / CADASTRAR ESCRITÓRIOS) */}
          {activeTab === 'super-admin' && userRole === 'superadmin' && (
            <div className="space-y-6">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
                <h2 className="text-base font-bold text-amber-400 flex items-center">
                  <Building className="w-5 h-5 mr-2" /> Cadastrar Novo Escritório Contábil Comprador
                </h2>
                <p className="text-xs text-slate-400">Adicione a contabilidade que comprou o SaaS. O e-mail e a senha criados serão os dados de acesso deles.</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <input type="text" placeholder="Nome da Contabilidade" className="bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200" />
                  <input type="email" placeholder="E-mail de Login do Escritório" className="bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200" />
                  <input type="password" placeholder="Senha Inicial de Acesso" className="bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200" />
                </div>
                <button className="bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs px-4 py-2.5 rounded-xl">
                  Criar Conta do Escritório
                </button>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
                <h3 className="text-sm font-bold text-white">Escritórios Clientes Cadastrados</h3>
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-950 text-slate-400 border-b border-slate-800">
                      <th className="p-3">Escritório</th>
                      <th className="p-3">E-mail</th>
                      <th className="p-3">Plano</th>
                      <th className="p-3 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {officesList.map(off => (
                      <tr key={off.id}>
                        <td className="p-3 font-semibold text-white">{off.name}</td>
                        <td className="p-3 text-slate-300">{off.email}</td>
                        <td className="p-3 text-blue-400">{off.plan}</td>
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

          {/* VISÃO GERAL & CNPJ */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="flex border-b border-slate-800 space-x-2 overflow-x-auto text-xs font-medium pb-1">
                <button onClick={() => setActiveSubTab('cnpj-overview')} className={`px-4 py-2 rounded-t-lg transition-colors border-b-2 ${activeSubTab === 'cnpj-overview' ? 'border-blue-500 text-blue-400 bg-slate-900/60' : 'border-transparent text-slate-400'}`}>Visão Geral & Cadastro</button>
                <button onClick={() => setActiveSubTab('docs')} className={`px-4 py-2 rounded-t-lg transition-colors border-b-2 ${activeSubTab === 'docs' ? 'border-blue-500 text-blue-400 bg-slate-900/60' : 'border-transparent text-slate-400'}`}>Documentos & IA</button>
                <button onClick={() => setActiveSubTab('reconciliation')} className={`px-4 py-2 rounded-t-lg transition-colors border-b-2 ${activeSubTab === 'reconciliation' ? 'border-blue-500 text-blue-400 bg-slate-900/60' : 'border-transparent text-slate-400'}`}>Conciliação Bancária</button>
                <button onClick={() => setActiveSubTab('reports')} className={`px-4 py-2 rounded-t-lg transition-colors border-b-2 ${activeSubTab === 'reports' ? 'border-blue-500 text-blue-400 bg-slate-900/60' : 'border-transparent text-slate-400'}`}>Relatórios Contábeis (DRE/Balanço)</button>
              </div>

              {activeSubTab === 'cnpj-overview' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                      <p className="text-xs text-slate-400">Conciliação do Mês</p>
                      <h3 className="text-3xl font-extrabold text-emerald-400 mt-1">100%</h3>
                    </div>
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                      <p className="text-xs text-slate-400">Status Auditoria IA</p>
                      <h3 className="text-3xl font-extrabold text-blue-400 mt-1">Regular</h3>
                    </div>
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                      <p className="text-xs text-slate-400">Faturamento Acumulado</p>
                      <h3 className="text-3xl font-extrabold text-purple-400 mt-1">R$ 145.800,00</h3>
                    </div>
                  </div>
                </div>
              )}

              {activeSubTab === 'docs' && (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl space-y-6">
                  <h2 className="text-base font-bold text-white flex items-center">
                    <Upload className="w-5 h-5 mr-2 text-blue-400" /> Upload de Arquivos (PDF, OFX, XML, CSV ou Foto)
                  </h2>
                  <div className="border-2 border-dashed border-slate-700 rounded-xl p-10 text-center hover:border-blue-500 transition-all bg-slate-950/50">
                    <Upload className="w-12 h-12 text-slate-500 mx-auto mb-3" />
                    <p className="text-sm font-semibold text-slate-200 mb-1">Arraste seus documentos contábeis aqui</p>
                    <label className="inline-flex items-center px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl cursor-pointer mt-4">
                      <span>Selecionar Documento</span>
                      <input type="file" className="hidden" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} />
                    </label>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* USUÁRIOS E ACESSOS */}
          {activeTab === 'users' && (
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
                    <th className="p-3 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {usersList.map(u => (
                    <tr key={u.id}>
                      <td className="p-3 font-semibold text-white">{u.name}</td>
                      <td className="p-3 text-slate-300">{u.email}</td>
                      <td className="p-3">{u.role}</td>
                      <td className="p-3 text-right">
                        <button className="text-slate-400 hover:text-white"><Edit className="w-4 h-4 inline" /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* CHAT COM IA */}
          {activeTab === 'ai-chat' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col h-[500px]">
              <h2 className="text-base font-bold text-white mb-4 flex items-center">
                <Bot className="w-5 h-5 mr-2 text-blue-400" /> Assistente IA Contábil (Usando sua API Key)
              </h2>
              <div className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-4 overflow-y-auto text-xs space-y-3">
                <div className="bg-blue-600/20 text-blue-200 p-3 rounded-lg max-w-md">
                  Assistente pronto! Os consumos serão debitados diretamente da chave configurada na aba "Configurar Minha API de IA".
                </div>
              </div>
              <div className="mt-4 flex space-x-2">
                <input type="text" placeholder="Digite sua pergunta..." className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-xs focus:outline-none" />
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-semibold">Enviar</button>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
