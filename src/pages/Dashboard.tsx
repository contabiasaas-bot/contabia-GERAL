import React, { useState } from 'react';
import { 
  Building2, Users, Building, Search, FileText, CheckCircle2, ShieldAlert, 
  Upload, CreditCard, DollarSign, Bell, UserCheck, ShieldCheck, 
  Bot, MessageSquare, Calendar, Lock, Trash2, Edit, Plus, Key, LogOut, Save, Download, FileSpreadsheet
} from 'lucide-react';

export function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [userRole, setUserRole] = useState<'superadmin' | 'office' | 'client'>('office');

  const [activeTab, setActiveTab] = useState('overview');
  const [activeSubTab, setActiveSubTab] = useState('cnpj-overview');
  const [selectedClient, setSelectedClient] = useState('12.345.678/0001-90 - Empresa Exemplo Ltda');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [aiApiKey, setAiApiKey] = useState('');
  const [aiProvider, setAiProvider] = useState('openai');
  const [keySaved, setKeySaved] = useState(false);

  const [officesList] = useState([
    { id: 1, name: 'Escritório Contábil Alpha', email: 'contato@alpha.com', cnpj: '00.123.456/0001-00', plan: 'Enterprise (Licenciado)' },
    { id: 2, name: 'Beta Soluções Fiscais', email: 'adm@beta.com', cnpj: '11.987.654/0001-99', plan: 'Profissional (Licenciado)' }
  ]);

  const [usersList] = useState([
    { id: 1, name: 'João Contador', email: 'joao@escritorio.com', role: 'Contador Responsável', status: 'Ativo' },
    { id: 2, name: 'Maria Fiscal', email: 'maria@escritorio.com', role: 'Analista Fiscal', status: 'Ativo' }
  ]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginEmail.toLowerCase().includes('admin')) {
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
              <p className="font-semibold text-slate-300">Acessos para Teste:</p>
              <p>• <b className="text-amber-400">Admin:</b> "admin"</p>
              <p>• <b className="text-blue-400">Escritório:</b> qualquer e-mail</p>
              <p>• <b className="text-emerald-400">Cliente:</b> "cliente"</p>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-600 selection:text-white overflow-hidden">
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between shrink-0">
        <div>
          <div className="p-4 border-b border-slate-800 flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-xl text-white shadow-lg shadow-blue-500/20">
              <Building2 className="w-5 h-5" />
            </div>
            <div className="overflow-hidden">
              <h1 className="text-sm font-bold text-white truncate">ContabilCore SaaS</h1>
              <p className="text-xs text-slate-400 truncate">
                {userRole === 'superadmin' ? 'Master Admin' : userRole === 'client' ? 'Portal da Empresa' : 'Painel da Contabilidade'}
              </p>
            </div>
          </div>

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
                <button onClick={() => setActiveTab('users')} className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${activeTab === 'users' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}>
                  <Users className="w-4 h-4 mr-2.5" /> Usuários e Acessos
                </button>
                <button onClick={() => setActiveTab('ai-config')} className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${activeTab === 'ai-config' ? 'bg-blue-600 text-white font-semibold' : 'text-amber-400 hover:bg-slate-800'}`}>
                  <Key className="w-4 h-4 mr-2.5" /> Configurar API de IA
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

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-14 bg-slate-900 border-b border-slate-800 px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <span className="text-xs text-slate-400">Cliente Selecionado:</span>
            <select 
              value={selectedClient} 
              onChange={(e) => setSelectedClient(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1 text-xs text-slate-200 font-semibold focus:outline-none"
            >
              <option>12.345.678/0001-90 - Empresa Exemplo Ltda</option>
              <option>98.765.432/0001-10 - Comércio de Bebidas SA</option>
            </select>
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
                {userRole === 'superadmin' ? 'Master Admin' : 'Contabilidade'}
              </span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="flex border-b border-slate-800 space-x-2 overflow-x-auto text-xs font-medium pb-1">
                <button onClick={() => setActiveSubTab('cnpj-overview')} className={`px-4 py-2 rounded-t-lg transition-colors border-b-2 ${activeSubTab === 'cnpj-overview' ? 'border-blue-500 text-blue-400 bg-slate-900/60 font-bold' : 'border-transparent text-slate-400'}`}>Visão Geral & Cadastro</button>
                <button onClick={() => setActiveSubTab('docs')} className={`px-4 py-2 rounded-t-lg transition-colors border-b-2 ${activeSubTab === 'docs' ? 'border-blue-500 text-blue-400 bg-slate-900/60 font-bold' : 'border-transparent text-slate-400'}`}>Documentos & IA</button>
                <button onClick={() => setActiveSubTab('reconciliation')} className={`px-4 py-2 rounded-t-lg transition-colors border-b-2 ${activeSubTab === 'reconciliation' ? 'border-blue-500 text-blue-400 bg-slate-900/60 font-bold' : 'border-transparent text-slate-400'}`}>Conciliação Bancária</button>
                <button onClick={() => setActiveSubTab('invoices')} className={`px-4 py-2 rounded-t-lg transition-colors border-b-2 ${activeSubTab === 'invoices' ? 'border-blue-500 text-blue-400 bg-slate-900/60 font-bold' : 'border-transparent text-slate-400'}`}>Notas Fiscais</button>
                <button onClick={() => setActiveSubTab('reports')} className={`px-4 py-2 rounded-t-lg transition-colors border-b-2 ${activeSubTab === 'reports' ? 'border-blue-500 text-blue-400 bg-slate-900/60 font-bold' : 'border-transparent text-slate-400'}`}>Relatórios (DRE/Balanço)</button>
              </div>

              {activeSubTab === 'cnpj-overview' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                    <p className="text-xs text-slate-400">Conciliação Automática</p>
                    <h3 className="text-3xl font-extrabold text-emerald-400 mt-1">100%</h3>
                  </div>
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                    <p className="text-xs text-slate-400">Status Auditoria IA</p>
                    <h3 className="text-3xl font-extrabold text-blue-400 mt-1">Aprovado</h3>
                  </div>
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                    <p className="text-xs text-slate-400">Faturamento Acumulado</p>
                    <h3 className="text-3xl font-extrabold text-purple-400 mt-1">R$ 145.800,00</h3>
                  </div>
                </div>
              )}

              {activeSubTab === 'docs' && (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl space-y-6">
                  <h2 className="text-base font-bold text-white flex items-center">
                    <Upload className="w-5 h-5 mr-2 text-blue-400" /> Upload de Arquivos (PDF, OFX, XML, CSV)
                  </h2>
                  <div className="border-2 border-dashed border-slate-700 rounded-xl p-10 text-center bg-slate-950/50">
                    <Upload className="w-12 h-12 text-slate-500 mx-auto mb-3" />
                    <label className="inline-flex items-center px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl cursor-pointer">
                      <span>Selecionar Arquivo</span>
                      <input type="file" className="hidden" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} />
                    </label>
                    {selectedFile && <p className="text-xs text-emerald-400 mt-4">Arquivo pronto: {selectedFile.name}</p>}
                  </div>
                </div>
              )}

              {activeSubTab === 'reconciliation' && (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
                  <h2 className="text-sm font-bold text-white">Conciliação Bancária Automática</h2>
                  <p className="text-xs text-slate-400">Nenhuma divergência encontrada nos extratos recentes.</p>
                </div>
              )}

              {activeSubTab === 'invoices' && (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
                  <h2 className="text-sm font-bold text-white">Notas Fiscais & Lançamentos</h2>
                  <p className="text-xs text-slate-400">Nenhum lote fiscal pendente.</p>
                </div>
              )}

              {activeSubTab === 'reports' && (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
                  <h2 className="text-base font-bold text-white">Demonstração do Resultado do Exercício (DRE)</h2>
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs space-y-2">
                    <div className="flex justify-between border-b border-slate-900 pb-1">
                      <span className="text-slate-300">(+) Receita Bruta</span>
                      <span className="font-bold text-emerald-400">R$ 145.800,00</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-900 pb-1 text-slate-400">
                      <span>(-) Impostos (Simples Nacional)</span>
                      <span className="text-red-400">- R$ 8.748,00</span>
                    </div>
                    <div className="flex justify-between pt-2 text-sm font-extrabold text-emerald-400">
                      <span>(=) LUCRO LÍQUIDO</span>
                      <span>R$ 136.052,00</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'super-admin' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h2 className="text-base font-bold text-amber-400">Gestão de Escritórios Licenciados</h2>
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-950 text-slate-400 border-b border-slate-800">
                    <th className="p-3">Escritório</th>
                    <th className="p-3">E-mail</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {officesList.map(off => (
                    <tr key={off.id}>
                      <td className="p-3 font-semibold text-white">{off.name}</td>
                      <td className="p-3 text-slate-300">{off.email}</td>
                      <td className="p-3 text-emerald-400">{off.plan}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h2 className="text-base font-bold text-white">Controle de Usuários e Acessos</h2>
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-950 text-slate-400 border-b border-slate-800">
                    <th className="p-3">Nome</th>
                    <th className="p-3">E-mail</th>
                    <th className="p-3">Perfil</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {usersList.map(u => (
                    <tr key={u.id}>
                      <td className="p-3 font-semibold text-white">{u.name}</td>
                      <td className="p-3 text-slate-300">{u.email}</td>
                      <td className="p-3 text-purple-400">{u.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'ai-config' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6 max-w-3xl">
              <h2 className="text-base font-bold text-white">Configurar Chave de API de IA do Escritório</h2>
              <form onSubmit={handleSaveApiKey} className="space-y-4 text-xs">
                <div>
                  <label className="text-slate-300 block mb-1 font-semibold">Chave de API Privada (OpenAI / Claude)</label>
                  <input 
                    type="password" 
                    placeholder="sk-proj-..." 
                    value={aiApiKey}
                    onChange={(e) => setAiApiKey(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 font-mono text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>
                <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-5 py-2.5 rounded-xl">
                  Salvar Chave
                </button>
                {keySaved && <p className="text-xs text-emerald-400">✓ Chave guardada com sucesso!</p>}
              </form>
            </div>
          )}

          {activeTab === 'ai-audit' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h2 className="text-base font-bold text-white">Auditoria por IA</h2>
              <p className="text-xs text-slate-400">Nenhum risco contábil detetado nas últimas importações.</p>
            </div>
          )}

          {activeTab === 'ai-chat' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col h-[400px]">
              <h2 className="text-base font-bold text-white mb-4">Assistente IA Contábil</h2>
              <div className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-blue-200">
                Olá! Como posso ajudar com as conciliações e relatórios do escritório hoje?
              </div>
            </div>
          )}

          {activeTab === 'calendar' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h2 className="text-base font-bold text-white">Calendário Fiscal</h2>
              <p className="text-xs text-slate-400">Próximo vencimento: DAS / Simples Nacional (Dia 15).</p>
            </div>
          )}

          {activeTab === 'subscriptions' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h2 className="text-base font-bold text-white">Cobrança de Assinatura</h2>
              <p className="text-xs text-slate-400">Seu plano está ativo e regular.</p>
            </div>
          )}

          {activeTab === 'receivables' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h2 className="text-base font-bold text-white">Honorários & Contas a Receber</h2>
              <p className="text-xs text-slate-400">Nenhum honorário pendente para esta competência.</p>
            </div>
          )}

          {activeTab === 'payroll' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h2 className="text-base font-bold text-white">Folha de Pagamento e Pró-labore</h2>
              <p className="text-xs text-slate-400">Cálculos de pró-labore sincronizados.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
