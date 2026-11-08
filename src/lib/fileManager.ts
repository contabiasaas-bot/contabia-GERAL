import { supabase } from './supabase'

export interface StorageFile {
  id: string;
  clientId: string;
  fileName: string;
  filePath: string;
  fileType: string;
  fileSize: number;
}

// Upload de arquivo para o Bucket do Supabase Storage
export async function uploadDocument(file: File, clientId: string, userId: string) {
  const fileExt = file.name.split('.').pop()
  const filePath = `${clientId}/${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`

  // 1. Envia o arquivo físico para o Storage do Supabase
  const { data: storageData, error: storageError } = await supabase.storage
    .from('documents')
    .upload(filePath, file)

  if (storageError) throw storageError

  // 2. Registra os metadados do documento na tabela `documents`
  const { data: dbData, error: dbError } = await supabase
    .from('documents')
    .insert([
      {
        client_id: clientId,
        file_name: file.name,
        file_path: filePath,
        file_type: file.type || fileExt,
        file_size: file.size,
        file_hash: 'hash_placeholder', // Pode ser gerado via crypto se necessário
        status: 'pending',
        created_by: userId
      }
    ])
    .select()
    .single()

  if (dbError) throw dbError

  return dbData
}

// Obter URL assinada para Download do arquivo
export async function getDocumentDownloadUrl(filePath: string): Promise<string> {
  const { data, error } = await supabase.storage
    .from('documents')
    .createSignedUrl(filePath, 60) // Link válido por 60 segundos

  if (error) throw error
  return data.signedUrl
}

// Excluir arquivo do Storage e do Banco de Dados
export async function deleteDocument(documentId: string, filePath: string) {
  // 1. Remove do Storage
  const { error: storageError } = await supabase.storage
    .from('documents')
    .remove([filePath])

  if (storageError) console.warn('Erro ao remover do Storage:', storageError.message)

  // 2. Remove do Banco de Dados (tabela `documents`)
  const { error: dbError } = await supabase
    .from('documents')
    .delete()
    .eq('id', documentId)

  if (dbError) throw dbError

  return true
}
