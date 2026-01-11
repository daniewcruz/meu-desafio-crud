import React from 'react';
import { Contact } from '../types/contact';
import { IconCalendar, IconEye, IconMail, IconNote, IconPhone } from './icons';

type Props = {
  contact: Contact;
  formatPhone: (phone: string) => string;
  formatDate: (date?: string | null) => string;
  getInitials: (name: string) => string;
  onClose: () => void;
};

export function ContactDetailsModal({ contact, formatPhone, formatDate, getInitials, onClose }: Props) {
  return (
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
          <button className="btn btn-ghost btn-sm" onClick={onClose}>✕</button>
        </div>
        <div className="px-6 pb-6 pt-2 space-y-3 text-sm text-base-content/80">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-primary text-primary-content font-semibold flex items-center justify-center">
              {getInitials(contact.nome)}
            </div>
            <div>
              <p className="font-semibold text-base-content">{contact.nome}</p>
              <p className="text-xs text-base-content/60">ID {contact.idPessoa}</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <IconMail className="h-4 w-4 text-primary/80" />
              <span>{contact.email}</span>
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
              <div className="flex items-start gap-2">
                <IconNote className="h-4 w-4 text-accent/80 mt-0.5" />
                <span>{contact.observacoes}</span>
              </div>
            )}
          </div>
        </div>
        <div className="modal-action px-6 pb-6">
          <button className="btn" onClick={onClose}>Fechar</button>
        </div>
      </div>
      <div className="modal-backdrop" onClick={onClose} />
    </div>
  );
}
