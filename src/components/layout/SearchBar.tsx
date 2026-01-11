import React from 'react';
import { IconPlus, IconSearch } from '../icons';

type Props = {
  value: string;
  onChange: (value: string) => void;
  onNew: () => void;
};

export function SearchBar({ value, onChange, onNew }: Props) {
  return (
    <div className="card bg-base-200/60 border border-base-300/80 shadow-sm">
      <div className="card-body gap-4 md:flex md:items-center md:gap-3">
        <div className="relative w-full">
          <IconSearch className="h-4 w-4 text-base-content/50 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por nome, email ou telefone..."
            className="input input-bordered w-full pl-10"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
        <button className="btn btn-success w-full md:w-auto gap-2 shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-200" onClick={onNew}>
          <IconPlus className="h-5 w-5" />
          Novo contato
        </button>
      </div>
    </div>
  );
}
