import React, { useState } from 'react';
import { 
  Building2, Users, Search, CheckCircle2, ShieldAlert, 
  Upload, UserCheck, Bot, Trash2, Edit, Plus, Key, LogOut, Download, 
  FileSpreadsheet, RefreshCw, ChevronRight
} from 'lucide-react';

export function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  const [activeTab, setActiveTab] = useState<'overview' | 'clients' | 'client-workspace' | 'super-admin' | 'users' | 'ai-config' | 'ai-audit' | 'ai-chat'>('client-workspace');
  const [activeSubTab, setActiveSubTab] = useState<'visao' | 'docs' | 'conciliacao' | 'notas' | 'lancamentos' | 'plano' | 'relatorios'>('plano');
  const [reportSubTab, setReportSubTab] = useState<'dre' | 'balanco' | 'fluxo' | 'balancete' | 'razonete' | 'razao' | 'diario'>('dre');

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [clientsList] = useState([
    { cnpj: '60.560.440/0001-25', name: '60.560.440 ELISETE DA SILVA PIRES', regime: 'MEI', status: 'Ativa' }
  ]);

  const accounts = {
    ativo: [
      { code: '1.1.01', name: 'Caixa', tag: 'CAIXA' },
      { code: '1.1.02', name: 'Bancos Conta Movimento', tag: 'CAIXA' },
      { code: '1.1.03', name: 'Aplicações Financeiras', tag: 'CAIXA' },
      { code: '1.1.04', name: 'Clientes a Receber' },
      { code: '1.1.05', name: 'Estoques' },
      { code: '1.1.06', name: 'Impostos a Recuperar' },
      { code: '1.1.07', name: 'Adiantamentos' },
      { code: '1.2.01', name: 'Imobilizado - Máquinas e Equipamentos' },
      { code: '1.2.02', name: 'Imobilizado - Veículos' },
      { code: '1.2.03', name: 'Imobilizado - Móveis e Utensílios' },
      { code: '1.2.04', name: 'Imobilizado - Computadores' }
    ],
    passivo: [
      { code: '2.1.01', name: 'Fornecedores' },
      { code: '2.1.02', name: 'Salários a Pagar' },
      { code: '2.1.03', name: 'Encargos Sociais a Pagar (INSS/FGTS)' },
      { code: '2.1.04', name: 'Impostos a Recolher' },
      { code: '2.1.05', name: 'Empréstimos e Financiamentos CP' },
      { code: '2.1.06', name: 'Contas a Pagar Diversas' },
      { code: '2.2.01', name: 'Empréstimos e Financiamentos LP' }
    ],
    patrimonio: [
      { code: '3.1.01', name: 'Capital Social' },
      { code: '3.1.02', name: 'Lucros ou Prejuízos Acumulados' },
      { code: '3.1.03', name: 'Distribuição de Lucros' }
    ],
    receitas: [
      { code: '4.1.01', name: 'Receita de Vendas de Mercadorias' },
      { code: '4.1.02', name: 'Receita de Prestação de Serviços' },
      { code: '4.1.03', name: 'Receitas Financeiras' },
      { code: '4.1.04', name: 'Outras Receitas' },
      { code: '4.2.01', name: '(-) Impostos sobre Vendas (DAS/ICMS/ISS/PIS/COFINS)' },
      { code: '4.2.02', name: '(-) Devoluções e Descontos' }
    ],
    custos: [
      { code: '5.1.01', name: 'Custo das Mercadorias Vendidas (CMV)' },
      { code: '5.1.02', name: 'Custo dos Serviços Prestados (CSP)' }
    ],
    despesas: [
      { code: '6.1.01', name: 'Salários e Ordenados' },
      { code: '6.1.02', name: 'Encargos Sociais (INSS/FGTS)' },
      { code: '6.1.03', name: 'Pró-labore' },
      { code: '6.1.04', name: 'Aluguel' },
      { code: '6.1.05', name: 'Energia, Água e Telefone' },
      { code: '6.1.06', name: 'Internet e Software' },
      { code: '6.1.07', name: 'Honorários Contábeis' },
      { code: '6.1.08', name: 'Material de Escritório e Consumo' },
      { code: '6.1.09', name: 'Combustível e Transporte' },
      { code: '6.1.10', name: 'Marketing e Publicidade' }
    ]
  };

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
              Entrar no portal
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

            <div className="pt-4 pb-1 px-3 text-[10px] uppercase font-bold text-slate-400 tracking-wider">Administração</div>
            <button onClick={() => setActiveTab('users')} className={`w-full flex items-center px-3 py-2.5 rounded-xl transition-all ${activeTab === 'users' ? 'bg-[#2A4836] text-white font-bold' : 'text-slate-300 hover:bg-[#2A4836]/50'}`}>
              <UserCheck className="w-4 h-4 mr-2.5" /> Usuários e acessos
            </button>
            <button onClick={() => setActiveTab('ai-config')} className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${activeTab === 'ai-config' ? 'bg-[#2A4836] text-white font-bold' : 'text-slate-300 hover:bg-[#2A4836]/50'}`}>
              <span className="flex items-center"><Key className="w-4 h-4 mr-2.5" /> Configuração de IA</span>
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
                <div className="bg-white border border-[#E6E2D6] rounded-2xl p-5 shadow-sm"><p className="text-xs text-slate-500 font-medium">CLIENTES ATIVOS</p><h3 className="text-3xl font-bold text-[#1A2E22] mt-2">1</h3></div>
                <div className="bg-white border border-[#E6E2D6] rounded-2xl p-5 shadow-sm"><p className="text-xs text-slate-500 font-medium">ITENS CONCILIADOS</p><h3 className="text-3xl font-bold text-[#1A2E22] mt-2">0</h3></div>
                <div className="bg-white border border-[#E6E2D6] rounded-2xl p-5 shadow-sm"><p className="text-xs text-slate-500 font-medium">AGUARDANDO CONFIRMAÇÃO</p><h3 className="text-3xl font-bold text-blue-600 mt-2">0</h3></div>
                <div className="bg-white border border-[#E6E2D6] rounded-2xl p-5 shadow-sm"><p className="text-xs text-slate-500 font-medium">DIVERGÊNCIAS</p><h3 className="text-3xl font-bold text-red-500 mt-2">0</h3></div>
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
                      <th className="pb-3">Escritório</th>
                      <th className="pb-3 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E6E2D6]">
                    {clientsList.map((c, i) => (
                      <tr key={i} className="hover:bg-[#FDFBF7]">
                        <td className="py-4 font-bold text-[#1A2E22]">{c.name}</td>
                        <td className="py-4 text-slate-600">{c.cnpj}</td>
                        <td className="py-4"><span className="bg-[#F4F1EA] px-2.5 py-1 rounded-md font-semibold">{c.regime}</span></td>
                        <td className="py-4 text-slate-600">kG contabilidade</td>
                        <td className="py-4 text-right space-x-2">
                          <button 
                            onClick={() => setActiveTab('client-workspace')}
                            className="bg-[#E6E2D6] hover:bg-[#D5D0C0] text-[#1A2E22] px-3.5 py-1.5 rounded-lg font-bold inline-flex items-center transition-colors"
                          >
                            Abrir <ChevronRight className="w-3.5 h-3.5 ml-1" />
                          </button>
                          <button className="text-red-500 hover:text-red-700 p-1"><Trash2 className="w-4 h-4 inline" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ESPAÇO DO CLIENTE (CNPJ) */}
          {activeTab === 'client-workspace' && (
            <div className="space-y-6">
              
              <div className="bg-[#1A2E22] text-[#FDFBF7] rounded-2xl p-6 shadow-lg flex justify-between items-center">
                <div>
                  <span className="text-[10px] bg-[#C29B38] text-white px-2 py-0.5 rounded font-bold uppercase tracking-wider">MEI</span>
                  <h2 className="text-2xl font-bold mt-1">60.560.440 ELISETE DA SILVA PIRES</h2>
                  <p className="text-xs text-emerald-300 mt-0.5">CNPJ: 60.560.440/0001-25</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="bg-emerald-500/20 text-emerald-300 text-xs px-3 py-1.5 rounded-full border border-emerald-500/30 font-bold">
                    Receita: ATIVA
                  </span>
                  <button onClick={() => setActiveTab('clients')} className="bg-[#2A4836] hover:bg-[#355C45] text-white text-xs font-bold px-3.5 py-1.5 rounded-lg transition-colors">
                    ← Voltar para Clientes
                  </button>
                </div>
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

              {/* 1. VISÃO GERAL */}
              {activeSubTab === 'visao' && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-white border border-[#E6E2D6] rounded-2xl p-5 shadow-sm"><p className="text-xs text-slate-500 font-medium">RECEITA 2026</p><h3 className="text-2xl font-bold text-[#1A2E22] mt-2">R$ 0,00</h3></div>
                  <div className="bg-white border border-[#E6E2D6] rounded-2xl p-5 shadow-sm"><p className="text-xs text-slate-500 font-medium">RESULTADO DO ANO</p><h3 className="text-2xl font-bold text-emerald-600 mt-2">R$ 0,00</h3></div>
                  <div className="bg-white border border-[#E6E2D6] rounded-2xl p-5 shadow-sm"><p className="text-xs text-slate-500 font-medium">SALDO CAIXA E BANCOS</p><h3 className="text-2xl font-bold text-[#1A2E22] mt-2">R$ 0,00</h3></div>
                  <div className="bg-white border border-[#E6E2D6] rounded-2xl p-5 shadow-sm"><p className="text-xs text-slate-500 font-medium">CONCILIAÇÃO</p><h3 className="text-2xl font-bold text-emerald-600 mt-2">0 ✓</h3></div>
                </div>
              )}

              {/* 2. DOCUMENTOS & IA */}
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

              {/* 3. CONCILIAÇÃO BANCÁRIA */}
              {activeSubTab === 'conciliacao' && (
                <div className="bg-white border border-[#E6E2D6] rounded-3xl p-6 space-y-6 shadow-sm">
                  <div className="grid grid-cols-4 gap-4">
                    <div className="p-4 bg-[#FDFBF7] rounded-2xl border border-[#E6E2D6]"><p className="text-xs text-slate-500">ITENS DO EXTRATO</p><h4 className="text-xl font-bold mt-1">0</h4></div>
                    <div className="p-4 bg-[#FDFBF7] rounded-2xl border border-[#E6E2D6]"><p className="text-xs text-slate-500">CONCILIADOS</p><h4 className="text-xl font-bold text-emerald
