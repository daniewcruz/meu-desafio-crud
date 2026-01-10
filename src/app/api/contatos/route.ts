import { NextResponse } from 'next/server';
import { query } from '../../../lib/db';

/**
 * POST /api/contatos
 * [Item 44-48] Criar registro chamando a procedure de inserção.
 */
export async function POST(request: Request) {
	try {
		const body = await request.json();
		const { nome, dataNascimento, observacoes, telefone, email } = body;

		// [Item 47] Chama a procedure de criação passando os parâmetros.
		const result = await query(
			'SELECT sp_inserir_contato($1, $2, $3, $4, $5) as id',
			[nome, dataNascimento, observacoes, telefone, email]
		);

		const novoId = result.rows[0].id;

		// [Item 48] Printa no console o id retornado pela procedure.
		console.log('ID do novo registro:', novoId);

		return NextResponse.json({ id: novoId }, { status: 201 });
	} catch (error) {
		console.error('Erro ao inserir contato:', error);
		return NextResponse.json({ error: 'Erro ao inserir' }, { status: 500 });
	}
}

/**
 * GET /api/contatos
 * [Item 59-62] Selecionar todos os registros via procedure.
 */
export async function GET() {
	try {
		// [Item 61] Chama a procedure de seleção de contatos.
		const result = await query('SELECT * FROM sp_selecionar_todos_contatos()');

		// [Item 62] Printa no console os dados retornados.
		console.log('Lista de contatos:', result.rows);

		return NextResponse.json(result.rows);
	} catch (error) {
		console.error('Erro ao listar contatos:', error);
		return NextResponse.json({ error: 'Erro ao listar' }, { status: 500 });
	}
}

