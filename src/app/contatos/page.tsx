'use client';

import React, { useEffect, useMemo, useState } from 'react';
// Importa tipos compartilhados para tipagem forte
import { Contact, ContactFormData } from '../../types/contact';
// Importa componentes de UI reutilizáveis para manter código organizado
import { ContactCard } from '../../components/layout/ContactCard';
import { ContactDetailsModal } from '../../components/layout/ContactDetailsModal';
import { ContactForm } from '../../components/layout/ContactForm';
import { DeleteConfirmModal } from '../../components/layout/DeleteConfirmModal';
import { Pagination } from '../../components/layout/Pagination';
import { SearchBar } from '../../components/layout/SearchBar';
import { IconCalendar, IconContacts, IconEye, IconMail, IconNote, IconPhone, IconPlus, IconTrash } from '../../components/icons';

// Constante para paginação - quantos contatos exibir por página
const ITEMS_PER_PAGE = 10;

// Objeto padrão para resetar o formulário após operações
const defaultFormData: ContactFormData = {
  nome: '',
  email: '',
  telefone: '',
  dataNascimento: '',
  observacoes: '',
};

export default function ContatosPage() {
  // === Estados principais da aplicação ===
  const [contacts, setContacts] = useState<Contact[]>([]); // Lista de contatos carregados do backend
  const [loading, setLoading] = useState(true); // Controla estado de carregamento
  const [error, setError] = useState<string | null>(null); // Armazena mensagens de erro
  
  // === Estados de UI e interação ===
  const [searchTerm, setSearchTerm] = useState(''); // Termo de busca para filtrar contatos
  const [currentPage, setCurrentPage] = useState(1); // Página atual da paginação
  const [message, setMessage] = useState<{ type: string; text: string } | null>(null); // Mensagens de sucesso/erro temporárias
  
  // === Estados dos modais ===
  const [showForm, setShowForm] = useState(false); // Controla exibição do modal de formulário
  const [editingId, setEditingId] = useState<number | null>(null); // ID do contato sendo editado (null = criação)
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null); // Contato selecionado para visualização
  const [deleteId, setDeleteId] = useState<number | null>(null); // ID do contato a ser deletado
  
  // === Estado do formulário ===
  const [formData, setFormData] = useState<ContactFormData>(defaultFormData); // Dados do formulário de criação/edição

  // Carrega contatos ao montar o componente
  useEffect(() => {
    loadContacts();
  }, []);

  /**
   * Carrega todos os contatos do backend via API
   * Tratamento de erros e estados de loading/error
   */
  const loadContacts = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/contatos');
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || `Erro ao carregar (${res.status})`);
      }
      const data = await res.json();
      setContacts(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Erro ao carregar';
      setError(msg);
      setContacts([]);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Exibe mensagem temporária (sucesso/erro) por 3 segundos
   */
  const showMsg = (type: string, text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  /**
   * Filtra contatos baseado no termo de busca
   * Busca em: nome, email e telefone (case-insensitive)
   * useMemo evita recalcular a cada render
   */
  const filteredContacts = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return contacts.filter(
      c =>
        c.nome?.toLowerCase().includes(term) ||
        c.email?.toLowerCase().includes(term) ||
        c.telefone?.includes(searchTerm)
    );
  }, [contacts, searchTerm]);

  // Calcula total de páginas baseado nos contatos filtrados
  const totalPages = Math.ceil(filteredContacts.length / ITEMS_PER_PAGE) || 1;
  
  // Pega apenas os contatos da página atual (slice do array filtrado)
  const paginatedContacts = filteredContacts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  /**
   * Processa envio do formulário (criação ou edição)
   * - Valida campos obrigatórios
   * - Normaliza formato da data (YYYY-MM-DD)
   * - Chama API POST (criar) ou PUT (editar)
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nome || !formData.email || !formData.telefone || !formData.dataNascimento) {
      showMsg('error', 'Preencha todos os campos');
      return;
    }

    try {
      // Normaliza data para formato YYYY-MM-DD (remove hora se existir)
      let sendDate = formData.dataNascimento;
      if (sendDate && sendDate.includes('T')) {
        sendDate = sendDate.split('T')[0];
      }

      const dataToSend = {
        ...formData,
        dataNascimento: sendDate,
      };

      // Se editingId existe, atualiza contato existente (PUT)
      if (editingId) {
        const res = await fetch(`/api/contatos/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dataToSend),
        });
        if (!res.ok) {
          const error = await res.json();
          throw new Error(error.error || `Erro ao atualizar (${res.status})`);
        }
        showMsg('success', 'Contato atualizado!');
      } else {
        // Senão, cria novo contato (POST)
        const res = await fetch('/api/contatos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dataToSend),
        });
        if (!res.ok) {
          const error = await res.json();
          throw new Error(error.error || `Erro ao criar (${res.status})`);
        }
        showMsg('success', 'Contato criado!');
      }
      // Limpa formulário, fecha modal e recarrega lista
      setShowForm(false);
      setEditingId(null);
      setFormData({ ...defaultFormData });
      loadContacts();
    } catch (err) {
      showMsg('error', err instanceof Error ? err.message : 'Erro na operação');
    }
  };

  /**
   * Prepara formulário para editar um contato existente
   * Preenche formData com dados do contato e normaliza data
   */
  const handleEdit = (contact: Contact) => {
    // Garante que a data está em formato YYYY-MM-DD para o input date
    let dateValue = contact.dataNascimento;
    if (dateValue && dateValue.includes('T')) {
      dateValue = dateValue.split('T')[0];
    }

    setFormData({
      nome: contact.nome,
      email: contact.email,
      telefone: contact.telefone,
      dataNascimento: dateValue || '',
      observacoes: contact.observacoes || '',
    });
    setEditingId(contact.idPessoa);
    setShowForm(true);
  };

  /**
   * Deleta um contato via API DELETE
   * Recarrega lista após sucesso
   */
  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/contatos/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || error.message || `Erro ao deletar (${res.status})`);
      }
      showMsg('success', 'Contato deletado!');
      setDeleteId(null);
      loadContacts();
    } catch (err) {
      showMsg('error', err instanceof Error ? err.message : 'Erro ao deletar');
    }
  };

  /**
   * Formata telefone para padrão brasileiro: (XX) XXXXX-XXXX
   * Remove caracteres não numéricos e aplica máscara
   */
  const formatPhone = (phone: string) => {
    const cleaned = phone?.replace(/\D/g, '') || '';
    if (cleaned.length === 11) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
    }
    return phone;
  };

  /**
   * Formata data ISO (YYYY-MM-DD) para formato brasileiro (DD/MM/YYYY)
   * Remove hora se existir no timestamp
   */
  const formatDate = (date: string | null | undefined) => {
    if (!date) return '';
    try {
      const dateOnly = date.split('T')[0];
      if (!dateOnly || dateOnly === 'Invalid Date') {
        return '';
      }
      const [year, month, day] = dateOnly.split('-');
      return `${day}/${month}/${year}`;
    } catch {
      return '';
    }
  };

  /**
   * Extrai iniciais do nome para avatar
   * Retorna primeira letra do primeiro nome + primeira letra do último nome
   */
  const getInitials = (name: string) => {
    if (!name) return '';
    const parts = name.trim().split(' ');
    const first = parts[0]?.[0] ?? '';
    const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
    return `${first}${last}`.toUpperCase();
  };

  /**
   * Abre modal de criação de novo contato
   * Reseta formulário e limpa editingId
   */
  const handleNewContact = () => {
    setEditingId(null);
    setFormData({ ...defaultFormData });
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-300/70 to-base-200">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="card bg-base-100 shadow-xl border border-base-300/60">
          <div className="card-body gap-6">
            {/* === Cabeçalho da página === */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-base-200 border border-base-300 text-primary flex items-center justify-center">
                  <IconContacts className="h-5 w-5" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-base-content">Meu desafio CRUD</h1>
                  <p className="text-sm text-base-content/70">Gestão de Contatos</p>
                </div>
              </div>
              <div className="badge badge-outline py-3 px-4 text-xs md:text-sm font-medium bg-base-200/80 border-base-300 text-base-content/80">
                Gerencie seus contatos: criar, editar, excluir e ver detalhes
              </div>
            </div>

            {/* === Mensagens de feedback (sucesso/erro) === */}
            {message && (
              <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-error'} shadow-sm border border-base-300/80`}>
                <span className="font-medium">{message.text}</span>
              </div>
            )}

            {error && (
              <div className="alert alert-error shadow-sm border border-error/30">
                <span>{error}</span>
              </div>
            )}

            {/* === Barra de busca e botão de novo contato === */}
            <SearchBar
              value={searchTerm}
              onChange={(val) => {
                setSearchTerm(val);
                setCurrentPage(1);
              }}
              onNew={handleNewContact}
            />

            {/* === Grid de contatos com estados de loading/vazio === */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {loading && (
                <div className="col-span-full card bg-base-100 border border-base-300/70 shadow-sm">
                  <div className="card-body items-center justify-center py-10">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                    <p className="text-sm text-base-content/70 mt-3">Carregando contatos...</p>
                  </div>
                </div>
              )}

              {!loading && paginatedContacts.length === 0 && (
                <div className="col-span-full card bg-base-100 border border-base-300/70 shadow-sm">
                  <div className="card-body items-center justify-center py-12 text-center text-base-content/70">
                    <p className="text-lg font-semibold">Nenhum contato encontrado</p>
                    <p className="text-sm">Use "Novo contato" para começar sua lista</p>
                  </div>
                </div>
              )}

              {!loading && paginatedContacts.map(contact => (
                <ContactCard
                  key={contact.idPessoa}
                  contact={contact}
                  formatPhone={formatPhone}
                  formatDate={formatDate}
                  getInitials={getInitials}
                  onView={() => setSelectedContact(contact)}
                  onEdit={() => handleEdit(contact)}
                  onDelete={() => setDeleteId(contact.idPessoa)}
                />
              ))}
            </div>
            {/* === Paginação (só exibe se houver múltiplas páginas) === */}            <Pagination currentPage={currentPage} totalPages={totalPages} onChange={setCurrentPage} />
          </div>
        </div>
      </div>

      {/* === Modal de criação/edição de contato === */}
      {showForm && (
        <ContactForm
          formData={formData}
          editing={!!editingId}
          onChange={(field, value) => setFormData({ ...formData, [field]: value })}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* === Modal de visualização de detalhes === */}
      {selectedContact && (
        <ContactDetailsModal
          contact={selectedContact}
          formatPhone={formatPhone}
          formatDate={formatDate}
          getInitials={getInitials}
          onClose={() => setSelectedContact(null)}
        />
      )}

      {/* === Modal de confirmação de exclusão === */}
      {deleteId && (
        <DeleteConfirmModal
          onCancel={() => setDeleteId(null)}
          onConfirm={() => handleDelete(deleteId)}
        />
      )}
    </div>
  );
}
