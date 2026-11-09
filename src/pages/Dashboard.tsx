import React, { useState } from 'react';
import { 
  Building2, Users, Search, FileText, CheckCircle2, ShieldAlert, 
  Upload, CreditCard, DollarSign, Bell, UserCheck, ShieldCheck, 
  Bot, Calendar, Trash2, Edit, Plus, Key, LogOut, Download, 
  FileSpreadsheet, RefreshCw, ChevronRight
} from 'lucide-react';

export function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Navegação Principal
  const [activeTab, setActiveTab] = useState<'overview' | 'clients' | 'client-workspace' | 'super-admin' | 'users' | 'ai-config' | 'ai-audit' | 'ai-chat'>('overview');
  
  // Sub-abas do Espaço do Cliente (CNPJ)
  const [activeSubTab, setActiveSubTab] = useState<'visao' | 'docs' | 'conciliacao' | 'notas' | 'lancamentos' | 'plano' | 'relatorios'>('visao');
  
  // Sub-abas de Relatórios
  const [reportSubTab, setReportSubTab] = useState<'dre' | 'balanco' | 'fluxo' | 'balancete' | 'razonete' | 'razao' | 'diario'>('dre');

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [clientsList] = useState([
    { cnpj: '60.560.440/0001-25', name: '60.560.440 ELISETE DA SILVA PIRES', regime: 'MEI', status: 'Ativa' }
  ]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-4 font-sans text-[#1A2E22]">
        <div className="bg-white border border-[#E6E2D6] rounded-3xl p-8 max-w-md w-full shadow-2xl space-y-6">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 bg-[#C29B38] rounded-xl mx-auto flex items-center justify-center text-white shadow-md">
              <span className="font-bold text-lg">王</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-[#1A2E22]">Contáb<span className="text-[#C29B38]">IA</span></h1>
            <p className="text-xs text-slate-500">Use o e-mail e a senha liberados pelo seu escritório.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="text-slate-600 block mb-1 font-medium">E-mail</label>
              <input 
                type="email" 
                required
                placeholder="contabiasaas@gmail.com" 
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full bg-[#F4F1EA] border border-[#E6E2D6] rounded-xl p-3 text-slate-800 focus:outline-none focus:border-[#1A2E22]"
              />
            </div>
            <div>
              <label className="text-slate-600 block mb-1 font-medium">Senha</label>
              <input 
                type="password" 
                required
                placeholder="••••••••" 
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full bg-[#F4F1EA] border border-[#E6E2D6] rounded-xl p-3 text-slate-800 focus:outline-none focus:border-[#1A2E22]"
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-[#1A2E22] hover:bg-[#2A4836] text-white font-bold py-3.5 rounded-xl transition-all shadow-lg text-sm"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#FDFBF7] text-[#1A2E22] font-sans overflow-hidden">
      
      {/* SIDEBAR CORPORATIVA */}
      <aside className="w-64 bg-[#1A2E22] text-[#FDFBF7] flex flex-col justify-between shrink-0">
        <div>
          <div className="p-4 border-b border-[#2A4836] flex items-center space-x-3">
            <div className="bg-[#C29B38] p-2 rounded-xl text-white">
              <span className="font-bold text-sm">王</span>
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-tight">Contáb<span className="text-[#C29B38]">IA</span></h1>
              <p className="text-[10px] text-emerald-300">kG contabilidade</p>
            </div>
          </div>

          <nav className="px-2 py-3 space-y-1 text-xs font-medium">
            <button onClick={() => setActiveTab('overview')} className={`w-full flex items-center px-3 py-2.5 rounded-xl transition-all ${activeTab === 'overview' ? 'bg-[#2A4836] text-white font-bold' : 'text-slate-300 hover:bg-[#2A4836]/50'}`}>
              <Building2 className="w-4 h-4 mr-2.5" /> Painel geral
            </button>
            <button onClick={() => setActiveTab('clients')} className={`w-full flex items-center px-3 py-2.5 rounded-xl transition-all ${activeTab === 'clients' || activeTab === 'client-workspace' ? 'bg-[#2A4836] text-white font-bold' : 'text-slate-300 hover:bg-[#2A4836]/50'}`}>
              <Users className="w-4 h-4 mr-2.5" /> Clientes
            </button>

            <div className="pt-4 pb-1 px-3 text-[10px] uppercase font-bold text-slate-400 tracking-wider">Inteligência</div>
            <button onClick={() => setActiveTab('ai-audit')} className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${activeTab === 'ai-audit' ? 'bg-[#2A4836] text-white font-bold' : 'text-slate-300 hover:bg-[#2A4836]/50'}`}>
              <span className="flex items-center"><ShieldAlert className="w-4 h-4 mr-2.5 text-amber-400" /> Auditoria por IA</span>
              <span className="bg-[#C29B38] text-white text-[9px] px-1.5 py-0.5 rounded font-bold">ETAPA 2</span>
            </button>
            <button onClick={() => setActiveTab('ai-chat')} className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${activeTab === 'ai-chat' ? 'bg-[#2A4836] text-white font-bold' : 'text-slate-300 hover:bg-[#2A4836]/50'}`}>
              <span className="flex items-center"><Bot className="w-4 h-4 mr-2.5 text-blue-400" /> Chat contábil</span>
              <span className="bg-[#C29B38] text-white text-[9px] px-1.5 py-0.5 rounded font-bold">ETAPA 2</span>
            </button>
          </nav>
        </div>

        <div className="p-3 border-t border-[#2A4836] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 bg-[#C29B38] rounded-full flex items-center justify-center font-bold text-xs text-white">EL</div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-white truncate">Elisete</p>
              <p className="text-[10px] text-slate-400 truncate">Dono da plataforma</p>
            </div>
          </div>
          <button onClick={() => setIsLoggedIn(false)} className="text-slate-400 hover:text-red-300">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* ÁREA CENTRAL */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#FDFBF7]">
        
        <header className="h-16 bg-[#FDFBF7] border-b border-[#E6E2D6] px-6 flex items-center justify-between shrink-0">
          <div className="relative w-96">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar cliente por nome ou CNPJ..." 
              className="w-full bg-white border border-[#E6E2D6] rounded-xl pl-9 pr-12 py-2 text-xs text-slate-700 focus:outline-none"
            />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8 space-y-6">
          
          {/* PAINEL GERAL */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-[#1A2E22]">Olá, Elisete</h2>
                  <p className="text-xs text-slate-500">Resumo do escritório em tempo real.</p>
                </div>
                <button onClick={() => setActiveTab('clients')} className="bg-[#1A2E22] hover:bg-[#2A4836] text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center shadow-md">
                  <Building2 className="w-4 h-4 mr-2" /> Ver clientes
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white border border-[#E6E2D6] rounded-2xl p-5 shadow-sm">
                  <p className="text-xs text-slate-500 font-medium">CLIENTES ATIVOS</p>
                  <h3 className="text-3xl font-bold text-[#1A2E22] mt-2">1</h3>
                </div>
                <div className="bg-white border border-[#E6E2D6] rounded-2xl p-5 shadow-sm">
                  <p className="text-xs text-slate-500 font-medium">ITENS CONCILIADOS</p>
                  <h3 className="text-3xl font-bold text-[#1A2E22] mt-2">0</h3>
                </div>
                <div className="bg-white border border-[#E6E2D6] rounded-2xl p-5 shadow-sm">
                  <p className="text-xs text-slate-500 font-medium">AGUARDANDO CONFIRMAÇÃO</p>
                  <h3 className="text-3xl font-bold text-blue-600 mt-2">0</h3>
                </div>
                <div className="bg-white border border-[#E6E2D6] rounded-2xl p-5 shadow-sm">
                  <p className="text-xs text-slate-500 font-medium">DIVERGÊNCIAS</p>
                  <h3 className="text-3xl font-bold text-red-500 mt-2">0</h3>
                </div>
              </div>
            </div>
          )}

          {/* LISTA DE CLIENTES */}
          {activeTab === 'clients' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-[#1A2E22]">Clientes</h2>
                  <p className="text-xs text-slate-500">1 empresa(s) cadastrada(s). Cada uma tem seu próprio espaço.</p>
                </div>
                <button className="bg-[#1A2E22] hover:bg-[#2A4836] text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center shadow-md">
                  <Plus className="w-4 h-4 mr-2" /> Novo cliente
                </button>
              </div>

              <div className="bg-white border border-[#E6E2D6] rounded-2xl p-6 shadow-sm">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#E6E2D6] text-slate-500 uppercase">
                      <th className="pb-3">Empresa</th>
                      <th className="pb-3">CNPJ</th>
                      <th className="pb-3">Regime</th>
                      <th className="pb-3 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E6E2D6]">
                    {clientsList.map((c, i) => (
                      <tr key={i} className="hover:bg-[#FDFBF7]">
                        <td className="py-4 font-bold text-[#1A2E22]">{c.name}</td>
                        <td className="py-4 text-slate-600">{c.cnpj}</td>
                        <td className="py-4"><span className="bg-[#F4F1EA] px-2.5 py-1 rounded-md font-semibold">{c.regime}</span></td>
                        <td className="py-4 text-right">
                          <button 
                            onClick={() => setActiveTab('client-workspace')}
                            className="bg-[#E6E2D6] hover:bg-[#D5D0C0] text-[#1A2E22] px-3 py-1.5 rounded-lg font-bold inline-flex items-center transition-colors"
                          >
                            Abrir <ChevronRight className="w-3.5 h-3.5 ml-1" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ESPAÇO DO CLIENTE (CNPJ) COM TODAS AS ABAS FUNCIONAIS */}
          {activeTab === 'client-workspace' && (
            <div className="space-y-6">
              
              <div className="bg-[#1A2E22] text-[#FDFBF7] rounded-2xl p-6 shadow-lg flex justify-between items-center">
                <div>
                  <span className="text-[10px] bg-[#C29B38] text-white px-2 py-0.5 rounded font-bold uppercase tracking-wider">MEI</span>
                  <h2 className="text-2xl font-bold mt-1">60.560.440 ELISETE DA SILVA PIRES</h2>
                  <p className="text-xs text-emerald-300 mt-0.5">CNPJ: 60.560.440/0001-25</p>
                </div>
                <button onClick={() => setActiveTab('clients')} className="bg-[#2A4836] text-white text-xs font-bold px-3 py-1.5 rounded-lg">
                  ← Voltar para Clientes
                </button>
              </div>

              {/* ABAS DO CLIENTE */}
              <div className="flex border-b border-[#E6E2D6] space-x-6 text-xs font-semibold overflow-x-auto">
                <button onClick={() => setActiveSubTab('visao')} className={`pb-3 border-b-2 transition-all whitespace-nowrap ${activeSubTab === 'visao' ? 'border-[#1A2E22] text-[#1A2E22]' : 'border-transparent text-slate-400 hover:text-slate-700'}`}>Visão geral</button>
                <button onClick={() => setActiveSubTab('docs')} className={`pb-3 border-b-2 transition-all whitespace-nowrap ${activeSubTab === 'docs' ? 'border-[#1A2E22] text-[#1A2E22]' : 'border-transparent text-slate-400 hover:text-slate-700'}`}>Documentos & IA</button>
                <button onClick={() => setActiveSubTab('conciliacao')} className={`pb-3 border-b-2 transition-all whitespace-nowrap ${activeSubTab === 'conciliacao' ? 'border-[#1A2E22] text-[#1A2E22]' : 'border-transparent text-slate-400 hover:text-slate-700'}`}>Conciliação bancária</button>
                <button onClick={() => setActiveSubTab('notas')} className={`pb-3 border-b-2 transition-all whitespace-nowrap ${activeSubTab === 'notas' ? 'border-[#1A2E22] text-[#1A2E22]' : 'border-transparent text-slate-400 hover:text-slate-700'}`}>Notas fiscais</button>
                <button onClick={() => setActiveSubTab('lancamentos')} className={`pb-3 border-b-2 transition-all whitespace-nowrap ${activeSubTab === 'lancamentos' ? 'border-[#1A2E22] text-[#1A2E22]' : 'border-transparent text-slate-400 hover:text-slate-700'}`}>Lançamentos</button>
                <button onClick={() => setActiveSubTab('plano')} className={`pb-3 border-b-2 transition-all whitespace-nowrap ${activeSubTab === 'plano' ? 'border-[#1A2E22] text-[#1A2E22]' : 'border-transparent text-slate-400 hover:text-slate-700'}`}>Plano de contas</button>
                <button onClick={() => setActiveSubTab('relatorios')} className={`pb-3 border-b-2 transition-all whitespace-nowrap ${activeSubTab === 'relatorios' ? 'border-[#1A2E22] text-[#1A2E22]' : 'border-transparent text-slate-400 hover:text-slate-700'}`}>Relatórios</button>
              </div>

              {/* CONTEÚDO DAS SUB-ABAS */}
              {activeSubTab === 'visao' && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-white border border-[#E6E2D6] rounded-2xl p-5 shadow-sm"><p className="text-xs text-slate-500 font-medium">RECEITA 2026</p><h3 className="text-2xl font-bold text-[#1A2E22] mt-2">R$ 0,00</h3></div>
                  <div className="bg-white border border-[#E6E2D6] rounded-2xl p-5 shadow-sm"><p className="text-xs text-slate-500 font-medium">RESULTADO DO ANO</p><h3 className="text-2xl font-bold text-emerald-600 mt-2">R$ 0,00</h3></div>
                  <div className="bg-white border border-[#E6E2D6] rounded-2xl p-5 shadow-sm"><p className="text-xs text-slate-500 font-medium">CAIXA E BANCOS</p><h3 className="text-2xl font-bold text-[#1A2E22] mt-2">R$ 0,00</h3></div>
                  <div className="bg-white border border-[#E6E2D6] rounded-2xl p-5 shadow-sm"><p className="text-xs text-slate-500 font-medium">CONCILIAÇÃO</p><h3 className="text-2xl font-bold text-emerald-600 mt-2">0 ✓</h3></div>
                </div>
              )}

              {activeSubTab === 'docs' && (
                <div className="bg-white border border-[#E6E2D6] rounded-3xl p-8 space-y-6 shadow-sm">
                  <div className="border-2 border-dashed border-[#E6E2D6] rounded-2xl p-10 text-center bg-[#FDFBF7]">
                    <Upload className="w-10 h-10 text-[#C29B38] mx-auto mb-3" />
                    <h3 className="text-base font-bold text-[#1A2E22]">Arraste extratos e notas aqui</h3>
                    <p className="text-xs text-slate-500 mt-1">PDF, OFX, XML, CSV ou foto · até 20 MB</p>
                    <label className="inline-block mt-4 bg-[#1A2E22] text-white text-xs font-bold px-5 py-2.5 rounded-xl cursor-pointer">
                      <span>Selecionar arquivo</span>
                      <input type="file" className="hidden" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} />
                    </label>
                  </div>
                </div>
              )}

              {activeSubTab === 'conciliacao' && (
                <div className="bg-white border border-[#E6E2D6] rounded-3xl p-6 space-y-6 shadow-sm">
                  <div className="grid grid-cols-4 gap-4">
                    <div className="p-4 bg-[#FDFBF7] rounded-2xl border border-[#E6E2D6]"><p className="text-xs text-slate-500">ITENS DO EXTRATO</p><h4 className="text-xl font-bold mt-1">0</h4></div>
                    <div className="p-4 bg-[#FDFBF7] rounded-2xl border border-[#E6E2D6]"><p className="text-xs text-slate-500">CONCILIADOS</p><h4 className="text-xl font-bold text-emerald-600 mt-1">0</h4></div>
                    <div className="p-4 bg-[#FDFBF7] rounded-2xl border border-[#E6E2D6]"><p className="text-xs text-slate-500">A CONFIRMAR</p><h4 className="text-xl font-bold text-blue-600 mt-1">0</h4></div>
                    <div className="p-4 bg-[#FDFBF7] rounded-2xl border border-[#E6E2D6]"><p className="text-xs text-slate-500">DIVERGÊNCIAS</p><h4 className="text-xl font-bold text-red-500 mt-1">0</h4></div>
                  </div>
                  <div className="flex space-x-3">
                    <button className="bg-[#1A2E22] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center"><Plus className="w-3.5 h-3.5 mr-1.5" /> Incluir item</button>
                    <button className="bg-[#E6E2D6] text-[#1A2E22] px-4 py-2 rounded-xl text-xs font-bold flex items-center"><RefreshCw className="w-3.5 h-3.5 mr-1.5" /> Reconciliar</button>
                  </div>
                </div>
              )}

              {activeSubTab === 'notas' && (
                <div className="bg-white border border-[#E6E2D6] rounded-3xl p-6 space-y-6 shadow-sm">
                  <div className="grid grid-cols-4 gap-4">
                    <div className="p-4 bg-[#FDFBF7] rounded-2xl border border-[#E6E2D6]"><p className="text-xs text-slate-500">NOTAS</p><h4 className="text-xl font-bold mt-1">0</h4></div>
                    <div className="p-4 bg-[#FDFBF7] rounded-2xl border border-[#E6E2D6]"><p className="text-xs text-slate-500">VENDAS (SAÍDAS)</p><h4 className="text-xl font-bold text-emerald-600 mt-1">R$ 0,00</h4></div>
                    <div className="p-4 bg-[#FDFBF7] rounded-2xl border border-[#E6E2D6]"><p className="text-xs text-slate-500">COMPRAS (ENTRADAS)</p><h4 className="text-xl font-bold text-blue-600 mt-1">R$ 0,00</h4></div>
                    <div className="p-4 bg-[#FDFBF7] rounded-2xl border border-[#E6E2D6]"><p className="text-xs text-slate-500">IMPOSTOS</p><h4 className="text-xl font-bold text-purple-600 mt-1">R$ 0,00</h4></div>
                  </div>
                </div>
              )}

              {activeSubTab === 'lancamentos' && (
                <div className="bg-white border border-[#E6E2D6] rounded-3xl p-6 space-y-6 shadow-sm">
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-3">
                      <input type="text" placeholder="Histórico ou conta..." className="bg-[#F4F1EA] border border-[#E6E2D6] rounded-xl px-3 py-2 text-xs" />
                    </div>
                    <button className="bg-[#1A2E22] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center"><Plus className="w-3.5 h-3.5 mr-1" /> Novo lançamento</button>
                  </div>
                </div>
              )}

              {activeSubTab === 'plano' && (
                <div className="bg-white border border-[#E6E2D6] rounded-3xl p-6 space-y-6 shadow-sm">
                  <p className="text-xs text-slate-500">Plano de contas estruturado (Ativo, Passivo, Receitas, Custos, Despesas, Patrimônio Líquido).</p>
                </div>
              )}

              {activeSubTab === 'relatorios' && (
                <div className="bg-white border border-[#E6E2D6] rounded-3xl p-6 space-y-6 shadow-sm">
                  <div className="flex border-b border-[#E6E2D6] space-x-4 text-xs font-semibold pb-3 overflow-x-auto">
                    <button onClick={() => setReportSubTab('dre')} className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${reportSubTab === 'dre' ? 'bg-[#1A2E22] text-white font-bold' : 'text-slate-600 hover:bg-[#F4F1EA]'}`}>DRE</button>
                    <button onClick={() => setReportSubTab('balanco')} className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${reportSubTab === 'balanco' ? 'bg-[#1A2E22] text-white font-bold' : 'text-slate-600 hover:bg-[#F4F1EA]'}`}>Balanço patrimonial</button>
                    <button onClick={() => setReportSubTab('fluxo')} className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${reportSubTab === 'fluxo' ? 'bg-[#1A2E22] text-white font-bold' : 'text-slate-600 hover:bg-[#F4F1EA]'}`}>Fluxo de caixa</button>
                    <button onClick={() => setReportSubTab('balancete')} className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${reportSubTab === 'balancete' ? 'bg-[#1A2E22] text-white font-bold' : 'text-slate-600 hover:bg-[#F4F1EA]'}`}>Balancete</button>
                    <button onClick={() => setReportSubTab('razonete')} className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${reportSubTab === 'razonete' ? 'bg-[#1A2E22] text-white font-bold' : 'text-slate-600 hover:bg-[#F4F1EA]'}`}>Razonete</button>
                    <button onClick={() => setReportSubTab('razao')} className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${reportSubTab === 'razao' ? 'bg-[#1A2E22] text-white font-bold' : 'text-slate-600 hover:bg-[#F4F1EA]'}`}>Livro razão</button>
                    <button onClick={() => setReportSubTab('diario')} className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${reportSubTab === 'diario' ? 'bg-[#1A2E22] text-white font-bold' : 'text-slate-600 hover:bg-[#F4F1EA]'}`}>Livro diário</button>
                  </div>

                  <div className="bg-[#FDFBF7] border border-[#E6E2D6] rounded-2xl p-8 text-center space-y-3">
                    <h3 className="text-lg font-bold text-[#1A2E22] capitalize">{reportSubTab.replace('-', ' ')} Automatizado</h3>
                    <p className="text-xs text-slate-500">Calculado automaticamente pelos lançamentos contábeis.</p>
                  </div>
                </div>
              )}
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
