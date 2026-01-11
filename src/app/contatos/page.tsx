'use client';

import React, { useState, useEffect } from 'react';

interface Contact {
  idPessoa: number;
  nome: string;
  email: string;
  telefone: string;
  dataNascimento: string;
  observacoes: string;
}

// Pequenos ícones inline para evitar dependências extras e manter uma escolha curada
const IconContacts = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.25} {...props}>
    <circle cx="12" cy="8" r="3" />
    <path strokeLinecap="round" d="M5 18c0-3.2 3.6-5 7-5s7 1.8 7 5" />
  </svg>
);

const IconPlus = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m7-7H5" />
  </svg>
);

const IconSearch = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
    <circle cx="11" cy="11" r="6" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 17l4 4" />
  </svg>
);

const IconMail = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
    <rect x="3" y="6" width="18" height="12" rx="2" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l9 5 9-5" />
  </svg>
);

const IconPhone = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 3h3l2 5-2 1a10 10 0 005 5l1-2 5 2v3a2 2 0 01-2 2 15 15 0 01-13-13 2 2 0 012-2z" />
  </svg>
);

const IconCalendar = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
    <rect x="4" y="5" width="16" height="15" rx="2" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 3v4m8-4v4M4 10h16" />
  </svg>
);

const IconNote = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 4h7l5 5v9a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M14 3.5V9h5.5" />
  </svg>
);

const IconEye = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z" />
    <circle cx="12" cy="12" r="2.5" />
  </svg>
);

const IconEdit = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.06 7.06l2.88-2.88a1.5 1.5 0 012.12 0l1.06 1.06a1.5 1.5 0 010 2.12l-2.88 2.88" />
  </svg>
);

const IconTrash = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 7h14" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 11v6m4-6v6" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 7l1-2h4l1 2" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 7l1 12a2 2 0 002 2h6a2 2 0 002-2l1-12" />
  </svg>
);

export default function ContatosPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [message, setMessage] = useState<{ type: string; text: string } | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    dataNascimento: '',
    observacoes: '',
  });

  // Garante que formData sempre tem valores (para evitar controlled/uncontrolled warning)
  const getFormValue = (key: keyof typeof formData) => formData[key] ?? '';

  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/contatos');
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || `Erro ao carregar (${res.status})`);
      }
      const data = await res.json();
      console.log('Contatos carregados:', data);
      setContacts(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Erro ao carregar';
      console.error('Erro ao carregar contatos:', err);
      setError(msg);
      setContacts([]);
    } finally {
      setLoading(false);
    }
  };

  const showMsg = (type: string, text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  const filteredContacts = contacts.filter(
    c =>
      c.nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.telefone?.includes(searchTerm)
  );

  const totalPages = Math.ceil(filteredContacts.length / ITEMS_PER_PAGE);
  const paginatedContacts = filteredContacts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nome || !formData.email || !formData.telefone || !formData.dataNascimento) {
      showMsg('error', 'Preencha todos os campos');
      return;
    }

    try {
      // Extrai apenas YYYY-MM-DD se houver 'T' na data
      let sendDate = formData.dataNascimento;
      if (sendDate && sendDate.includes('T')) {
        sendDate = sendDate.split('T')[0];
      }

      const dataToSend = {
        ...formData,
        dataNascimento: sendDate,
      };

      console.log('Enviando dados:', dataToSend);

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
      setShowForm(false);
      setEditingId(null);
      setFormData({ nome: '', email: '', telefone: '', dataNascimento: '', observacoes: '' });
      loadContacts();
    } catch (err) {
      console.error('Erro no submit:', err);
      showMsg('error', err instanceof Error ? err.message : 'Erro na operação');
    }
  };

  const handleEdit = (contact: Contact) => {
    // Garante que a data está em formato YYYY-MM-DD
    let dateValue = contact.dataNascimento;
    if (dateValue && dateValue.includes('T')) {
      dateValue = dateValue.split('T')[0];
    }
    
    setFormData({
      nome: contact.nome,
      email: contact.email,
      telefone: contact.telefone,
      dataNascimento: dateValue,
      observacoes: contact.observacoes,
    });
    setEditingId(contact.idPessoa);
    setShowForm(true);
  };

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
      console.error('Erro ao deletar:', err);
      showMsg('error', err instanceof Error ? err.message : 'Erro ao deletar');
    }
  };

  const formatPhone = (phone: string) => {
    const cleaned = phone?.replace(/\D/g, '') || '';
    if (cleaned.length === 11) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
    }
    return phone;
  };

  const formatDate = (date: string | null | undefined) => {
    if (!date) return '';
    try {
      // Remove a hora se existir (formato ISO com hora: 1999-01-08T03:00:00.000Z)
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

  const getInitials = (name: string) => {
    if (!name) return '';
    const parts = name.trim().split(' ');
    const first = parts[0]?.[0] ?? '';
    const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
    return `${first}${last}`.toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-300/70 to-base-200">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="card bg-base-100 shadow-xl border border-base-300/60">
          <div className="card-body gap-6">
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

            <div className="card bg-base-200/60 border border-base-300/80 shadow-sm">
              <div className="card-body gap-4 md:flex md:items-center md:gap-3">
                <div className="relative w-full">
                  <IconSearch className="h-4 w-4 text-base-content/50 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Buscar por nome, email ou telefone..."
                    className="input input-bordered w-full pl-10"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                  />
                </div>
                <button
                  className="btn btn-success w-full md:w-auto gap-2 shadow-md"
                  onClick={() => {
                    setEditingId(null);
                    setFormData({ nome: '', email: '', telefone: '', dataNascimento: '', observacoes: '' });
                    setShowForm(true);
                  }}
                >
                  <IconPlus className="h-5 w-5" />
                  Novo contato
                </button>
              </div>
            </div>

            {/* Lista */}
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
                <div key={contact.idPessoa} className="card bg-base-100 border border-base-300/80 shadow-md transition hover:-translate-y-0.5 hover:shadow-lg">
                  <div className="card-body p-5 flex flex-col gap-4">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-full bg-primary text-primary-content font-semibold flex items-center justify-center">
                        {getInitials(contact.nome)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-semibold text-base-content truncate">{contact.nome}</h3>
                          <span className="badge badge-outline badge-sm text-xs border-base-300 text-base-content/70">ID {contact.idPessoa}</span>
                        </div>
                        <div className="space-y-1 text-sm text-base-content/80">
                          <div className="flex items-center gap-2 truncate">
                            <IconMail className="h-4 w-4 text-primary/80" />
                            <span className="truncate">{contact.email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <IconPhone className="h-4 w-4 text-success/80" />
                            <span>{formatPhone(contact.telefone)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <IconCalendar className="h-4 w-4 text-info/80" />
                            <span>{formatDate(contact.dataNascimento)}</span>
                          </div>
                          {contact.observacoes && (
                            <div className="flex items-start gap-2 text-xs text-base-content/70">
                              <IconNote className="h-4 w-4 text-accent/80 mt-0.5" />
                              <span className="line-clamp-2">{contact.observacoes}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap justify-end gap-2">
                      <button className="btn btn-sm btn-outline btn-info gap-2" onClick={() => setSelectedContact(contact)}>
                        <IconEye className="h-4 w-4" />
                        Ver
                      </button>
                      <button className="btn btn-sm btn-warning text-warning-content gap-2" onClick={() => handleEdit(contact)}>
                        <IconEdit className="h-4 w-4" />
                        Editar
                      </button>
                      <button className="btn btn-sm btn-error gap-2" onClick={() => setDeleteId(contact.idPessoa)}>
                        <IconTrash className="h-4 w-4" />
                        Deletar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center gap-2 flex-wrap pt-2">
                <button className="btn btn-sm btn-outline" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
                  Anterior
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    className={`btn btn-sm ${currentPage === page ? 'btn-primary' : 'btn-outline'}`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ))}
                <button className="btn btn-sm btn-outline" disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
                  Próximo
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal de criação/edição */}
      {showForm && (
        <div className="modal modal-open">
          <div className="modal-box max-w-3xl p-0 bg-base-100">
            <div className="flex items-center justify-between px-6 pt-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-success/10 text-success flex items-center justify-center">
                  <IconPlus className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{editingId ? 'Editar contato' : 'Novo contato'}</h3>
                  <p className="text-xs text-base-content/60">Campos obrigatórios marcados com *</p>
                </div>
              </div>
              <button className="btn btn-ghost btn-sm" onClick={() => setShowForm(false)}>✕</button>
            </div>
            <div className="px-6 pb-6 pt-2">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Nome completo *"
                    className="input input-bordered w-full"
                    value={getFormValue('nome')}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  />
                  <input
                    type="email"
                    placeholder="Email *"
                    className="input input-bordered w-full"
                    value={getFormValue('email')}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                  <input
                    type="tel"
                    placeholder="Telefone *"
                    className="input input-bordered w-full"
                    value={getFormValue('telefone')}
                    onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                  />
                  <div className="form-control">
                    <label className="label pb-1">
                      <span className="label-text text-sm">Data de nascimento *</span>
                    </label>
                    <input
                      type="date"
                      className="input input-bordered w-full"
                      value={getFormValue('dataNascimento')}
                      onChange={(e) => setFormData({ ...formData, dataNascimento: e.target.value })}
                    />
                  </div>
                </div>
                <div className="form-control">
                  <label className="label pb-1">
                    <span className="label-text text-sm">Observações</span>
                  </label>
                  <textarea
                    placeholder="Observações relevantes, contexto, tags..."
                    className="textarea textarea-bordered w-full h-24"
                    value={getFormValue('observacoes')}
                    onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
                  />
                </div>
                <div className="modal-action pt-2">
                  <button type="button" className="btn btn-ghost" onClick={() => setShowForm(false)}>
                    Cancelar
                  </button>
                  <button type="submit" className={editingId ? 'btn btn-warning text-warning-content' : 'btn btn-success'}>
                    {editingId ? 'Salvar alterações' : 'Adicionar contato'}
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="modal-backdrop" onClick={() => setShowForm(false)} />
        </div>
      )}

      {/* Modal de detalhes */}
      {selectedContact && (
        <div className="modal modal-open">
          <div className="modal-box max-w-lg p-0 bg-base-100">
            <div className="flex items-center justify-between px-6 pt-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-info/10 text-info flex items-center justify-center">
                  <IconEye className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Detalhes do contato</h3>
                  <p className="text-xs text-base-content/60">Visualização rápida</p>
                </div>
              </div>
              <button className="btn btn-ghost btn-sm" onClick={() => setSelectedContact(null)}>✕</button>
            </div>
            <div className="px-6 pb-6 pt-2 space-y-3 text-sm text-base-content/80">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-primary text-primary-content font-semibold flex items-center justify-center">
                  {getInitials(selectedContact.nome)}
                </div>
                <div>
                  <p className="font-semibold text-base-content">{selectedContact.nome}</p>
                  <p className="text-xs text-base-content/60">ID {selectedContact.idPessoa}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <IconMail className="h-4 w-4 text-primary/80" />
                  <span>{selectedContact.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <IconPhone className="h-4 w-4 text-success/80" />
                  <span>{formatPhone(selectedContact.telefone)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <IconCalendar className="h-4 w-4 text-info/80" />
                  <span>{formatDate(selectedContact.dataNascimento)}</span>
                </div>
                {selectedContact.observacoes && (
                  <div className="flex items-start gap-2">
                    <IconNote className="h-4 w-4 text-accent/80 mt-0.5" />
                    <span>{selectedContact.observacoes}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="modal-action px-6 pb-6">
              <button className="btn" onClick={() => setSelectedContact(null)}>Fechar</button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={() => setSelectedContact(null)} />
        </div>
      )}

      {/* Modal de confirmação de deleção */}
      {deleteId && (
        <div className="modal modal-open">
          <div className="modal-box max-w-md p-0 bg-base-100">
            <div className="flex items-center justify-between px-6 pt-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-error/10 text-error flex items-center justify-center">
                  <IconTrash className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Confirmar exclusão</h3>
                  <p className="text-xs text-base-content/60">Ação permanente, sem desfazer</p>
                </div>
              </div>
              <button className="btn btn-ghost btn-sm" onClick={() => setDeleteId(null)}>✕</button>
            </div>
            <div className="px-6 pb-6 pt-2">
              <p className="text-sm text-base-content/80 mb-4">Tem certeza que deseja deletar este contato?</p>
              <div className="modal-action">
                <button className="btn" onClick={() => setDeleteId(null)}>Cancelar</button>
                <button className="btn btn-error" onClick={() => handleDelete(deleteId)}>Deletar</button>
              </div>
            </div>
          </div>
          <div className="modal-backdrop" onClick={() => setDeleteId(null)} />
        </div>
      )}
    </div>
  );
}
