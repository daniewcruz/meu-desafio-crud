import React from 'react';
import { ContactFormData } from '../types/contact';
import { IconPlus } from './icons';

type Props = {
	formData: ContactFormData;
	onChange: (field: keyof ContactFormData, value: string) => void;
	onSubmit: (e: React.FormEvent) => void;
	onCancel: () => void;
	editing: boolean;
};

export function ContactForm({ formData, onChange, onSubmit, onCancel, editing }: Props) {
	const getFormValue = (key: keyof ContactFormData) => formData[key] ?? '';

	return (
		<div className="modal modal-open">
			<div className="modal-box max-w-3xl p-0 bg-base-100">
				<div className="flex items-center justify-between px-6 pt-6">
					<div className="flex items-center gap-3">
						<div className="h-10 w-10 rounded-xl bg-success/10 text-success flex items-center justify-center">
							<IconPlus className="h-5 w-5" />
						</div>
						<div>
							<h3 className="font-bold text-lg">{editing ? 'Editar contato' : 'Novo contato'}</h3>
							<p className="text-xs text-base-content/60">Campos obrigatórios marcados com *</p>
						</div>
					</div>
					<button className="btn btn-ghost btn-sm" onClick={onCancel}>✕</button>
				</div>
				<div className="px-6 pb-6 pt-2">
					<form onSubmit={onSubmit} className="space-y-4">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<input
								type="text"
								placeholder="Nome completo *"
								className="input input-bordered w-full"
								value={getFormValue('nome')}
								onChange={(e) => onChange('nome', e.target.value)}
							/>
							<input
								type="email"
								placeholder="Email *"
								className="input input-bordered w-full"
								value={getFormValue('email')}
								onChange={(e) => onChange('email', e.target.value)}
							/>
							<input
								type="tel"
								placeholder="Telefone *"
								className="input input-bordered w-full"
								value={getFormValue('telefone')}
								onChange={(e) => onChange('telefone', e.target.value)}
							/>
							<div className="form-control">
								<label className="label pb-1">
									<span className="label-text text-sm">Data de nascimento *</span>
								</label>
								<input
									type="date"
									className="input input-bordered w-full"
									value={getFormValue('dataNascimento')}
									onChange={(e) => onChange('dataNascimento', e.target.value)}
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
								onChange={(e) => onChange('observacoes', e.target.value)}
							/>
						</div>
						<div className="modal-action pt-2">
							<button type="button" className="btn btn-ghost" onClick={onCancel}>
								Cancelar
							</button>
							<button type="submit" className={editing ? 'btn btn-warning text-warning-content' : 'btn btn-success'}>
								{editing ? 'Salvar alterações' : 'Adicionar contato'}
							</button>
						</div>
					</form>
				</div>
			</div>
			<div className="modal-backdrop" onClick={onCancel} />
		</div>
	);
}
