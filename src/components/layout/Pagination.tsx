import React from 'react';

type Props = {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
};

export function Pagination({ currentPage, totalPages, onChange }: Props) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center gap-2 flex-wrap pt-2">
      <button className="btn btn-sm btn-outline" disabled={currentPage === 1} onClick={() => onChange(currentPage - 1)}>
        Anterior
      </button>
      {pages.map(page => (
        <button
          key={page}
          className={`btn btn-sm ${currentPage === page ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => onChange(page)}
        >
          {page}
        </button>
      ))}
      <button className="btn btn-sm btn-outline" disabled={currentPage === totalPages} onClick={() => onChange(currentPage + 1)}>
        Próximo
      </button>
    </div>
  );
}
