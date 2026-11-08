import React, { useState } from 'react'
import { uploadDocument, getDocumentDownloadUrl, deleteDocument } from '../lib/fileManager'

export function Dashboard() {
  const [uploading, setUploading] = useState(false)
  const [documents, setDocuments] = useState<any[]>([])

  // Exemplo de manipulador para Upload
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true)
      if (!event.target.files || event.target.files.length === 0) return
      const file = event.target.files[0]
      
      // IDs de exemplo (na aplicação real vêm do contexto de autenticação/cliente selecionado)
      const mockClientId = "00000000-0000-0000-0000-000000000000"
      const mockUserId = "00000000-0000-0000-0000-000000000000"

      const newDoc = await uploadDocument(file, mockClientId, mockUserId)
      setDocuments((prev) => [...prev, newDoc])
      alert('Arquivo enviado com sucesso!')
    } catch (error: any) {
      alert('Erro ao enviar arquivo: ' + error.message)
    } finally {
      setUploading(false)
    }
  }

  // Exemplo de manipulador para Download
  const handleDownload = async (filePath: string) => {
    try {
      const url = await getDocumentDownloadUrl(filePath)
      window.open(url, '_blank')
    } catch (error: any) {
      alert('Erro ao baixar arquivo: ' + error.message)
    }
  }

  // Exemplo de manipulador para Exclusão
  const handleDelete = async (docId: string, filePath: string) => {
    if (!confirm('Deseja realmente excluir este arquivo?')) return
    try {
      await deleteDocument(docId, filePath)
      setDocuments((prev) => prev.filter((doc) => doc.id !== docId))
      alert('Arquivo excluído com sucesso!')
    } catch (error: any) {
      alert('Erro ao excluir arquivo: ' + error.message)
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-8 font-sans">
      <header className="flex justify-between items-center pb-6 mb-8 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-blue-400">Portal Contábil Multi-Tenant</h1>
          <p className="text-sm text-slate-400">Gestão de Documentos, Conciliação e IA Auditora</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="bg-blue-900/50 text-blue-300 text-xs px-3 py-1 rounded-full border border-blue-700">
            Escritório Ativo
          </span>
        </div>
      </header>

      {/* Painel Central de Upload e Ações */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <h2 className="text-lg font-semibold mb-4 text-slate-200">Upload de Arquivos</h2>
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-600 rounded-lg p-6 cursor-pointer hover:border-blue-500 transition-colors">
            <span className="text-sm text-slate-400 mb-2">
              {uploading ? 'Enviando...' : 'Clique para selecionar Nota ou Extrato'}
            </span>
            <input 
              type="file" 
              onChange={handleFileUpload} 
              disabled={uploading} 
              className="hidden" 
            />
          </label>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <h2 className="text-lg font-semibold mb-2 text-slate-200">Resumo da Conciliação</h2>
          <p className="text-3xl font-bold text-emerald-400">100%</p>
          <p className="text-xs text-slate-400 mt-2">Lançamentos validados sem divergência</p>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <h2 className="text-lg font-semibold mb-2 text-slate-200">Auditoria IA</h2>
          <p className="text-sm text-slate-300">Nenhum risco contábil detectado no último lote.</p>
        </div>
      </div>

      {/* Tabela de Arquivos Processados */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <div className="p-4 border-b border-slate-700">
          <h2 className="text-lg font-semibold text-slate-200">Documentos da Empresa</h2>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-700 bg-slate-800/50 text-slate-400 text-sm">
              <th className="p-4">Nome do Arquivo</th>
              <th className="p-4">Tipo</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700 text-sm">
            {documents.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-4 text-center text-slate-500">
                  Nenhum documento enviado ainda.
                </td>
              </tr>
            ) : (
              documents.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-700/50">
                  <td className="p-4 font-medium">{doc.file_name}</td>
                  <td className="p-4 text-slate-400">{doc.file_type}</td>
                  <td className="p-4">
                    <span className="bg-emerald-900/40 text-emerald-400 text-xs px-2 py-1 rounded">
                      {doc.status}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button 
                      onClick={() => handleDownload(doc.file_path)}
                      className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-3 py-1 rounded"
                    >
                      Download
                    </button>
                    <button 
                      onClick={() => handleDelete(doc.id, doc.file_path)}
                      className="bg-rose-600 hover:bg-rose-500 text-white text-xs px-3 py-1 rounded"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
