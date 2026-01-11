import { NextResponse } from 'next/server';
import { query } from '../../../lib/db';

// Função para normalizar nomes de colunas e padronizar a data em YYYY-MM-DD
function normalizeContact(row: any) {
	const rawDate = row?.datanascimento ?? row?.dataNascimento;
	let dateStr: string | null = null;
	if (rawDate != null) {
		try {
			if (typeof rawDate === 'string') {
				dateStr = rawDate.includes('T') ? rawDate.split('T')[0] : rawDate;
			} else {
				// Converte objetos Date ou outros formatos para ISO e extrai apenas a parte da data
				dateStr = new Date(rawDate).toISOString().split('T')[0];
			}
		} catch {
			dateStr = String(rawDate).split('T')[0];
		}
	}

	return {
		idPessoa: row.idpessoa ?? row.idPessoa,
		nome: row.nome,
		email: row.email,
		telefone: row.telefone,
		dataNascimento: dateStr,
		observacoes: row.observacoes,
	};
}

/**
 * POST /api/contatos
 * Criar registro chamando a procedure de inserção.
 */
export async function POST(request: Request) {
	try {
		const body = await request.json();
		const { nome, dataNascimento, observacoes, telefone, email } = body;

		// Log dos dados recebidos
		console.log('Dados recebidos no POST:', { nome, dataNascimento, observacoes, telefone, email });

		// Validação
		if (!nome || !dataNascimento || !telefone || !email) {
			console.error('Campos obrigatórios faltando:', { nome, dataNascimento, telefone, email });
			return NextResponse.json({ error: 'Campos obrigatórios faltando' }, { status: 400 });
		}

		// Chama a procedure de criação passando os parâmetros na ordem correta
		const result = await query(
			'SELECT sp_inserir_contato($1, $2, $3, $4, $5) as id',
			[nome, dataNascimento, observacoes || null, telefone, email]
		);

		const novoId = result.rows[0].id;

		// Printa no console o id retornado pela procedure.
		console.log('ID do novo registro:', novoId);

		return NextResponse.json({ id: novoId }, { status: 201 });
	} catch (error) {
		console.error('Erro ao inserir contato:', error);
		return NextResponse.json({ error: 'Erro ao inserir', details: error instanceof Error ? error.message : String(error) }, { status: 500 });
	}
}

/**
 * GET /api/contatos
 * Selecionar todos os registros via procedure.
 */
export async function GET() {
	try {
		// Chama a procedure de seleção de contatos.
		const result = await query('SELECT * FROM sp_selecionar_todos_contatos()');

		// Normaliza os dados retornados
		const normalizedData = result.rows.map(normalizeContact);

		// Printa no console os dados retornados.
		console.log('Lista de contatos normalizada:', normalizedData);

		return NextResponse.json(normalizedData);
	} catch (error) {
		console.error('Erro ao listar contatos:', error);
		return NextResponse.json({ error: 'Erro ao listar' }, { status: 500 });
	}
}

