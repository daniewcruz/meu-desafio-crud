import React from 'react';
import { Contact } from '../types/contact';
import { IconMail, IconPhone, IconCalendar, IconNote, IconEye, IconEdit, IconTrash } from './icons';

type Props = {
	contact: Contact;
	formatPhone: (phone: string) => string;
	formatDate: (date: string | null | undefined) => string;
	getInitials: (name: string) => string;
	onView: (contact: Contact) => void;
	onEdit: (contact: Contact) => void;
	onDelete: (id: number) => void;
};

export function ContactCard({ contact, formatPhone, formatDate, getInitials, onView, onEdit, onDelete }: Props) {
	return (
		<div className="card bg-base-100 border border-base-300/80 shadow-md transition hover:-translate-y-0.5 hover:shadow-lg">
			<div className="card-body p-5 flex flex-col gap-4">
				<div className="flex items-start gap-4">
					<div className="h-12 w-12 rounded-full bg-slate-500 text-primary-content font-semibold flex items-center justify-center">
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
					<button className="btn btn-sm btn-outline btn-info gap-2" onClick={() => onView(contact)}>
						<IconEye className="h-4 w-4" />
						
					</button>
					<button className="btn btn-sm btn-warning text-warning-content gap-2" onClick={() => onEdit(contact)}>
						<IconEdit className="h-4 w-4" />
						Editar
					</button>
					<button className="btn btn-sm btn-error gap-2" onClick={() => onDelete(contact.idPessoa)}>
						<IconTrash className="h-4 w-4" />
						Deletar
					</button>
				</div>
			</div>
		</div>
	);
}
