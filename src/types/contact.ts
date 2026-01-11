export interface Contact {
  idPessoa: number;
  nome: string;
  email: string;
  telefone: string;
  dataNascimento: string | null;
  observacoes: string | null;
}

export interface ContactFormData {
  nome: string;
  email: string;
  telefone: string;
  dataNascimento: string;
  observacoes: string;
}
