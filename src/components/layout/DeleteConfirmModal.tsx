import React from 'react';
import { IconTrash } from '../icons';

type Props = {
  onCancel: () => void;
  onConfirm: () => void;
};

export function DeleteConfirmModal({ onCancel, onConfirm }: Props) {
  return (
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
          <button className="btn btn-ghost btn-sm" onClick={onCancel}>✕</button>
        </div>
        <div className="px-6 pb-6 pt-2">
          <p className="text-sm text-base-content/80 mb-4">Tem certeza que deseja deletar este contato?</p>
          <div className="modal-action">
            <button className="btn" onClick={onCancel}>Cancelar</button>
            <button className="btn btn-error" onClick={onConfirm}>Deletar</button>
          </div>
        </div>
      </div>
      <div className="modal-backdrop" onClick={onCancel} />
    </div>
  );
}
