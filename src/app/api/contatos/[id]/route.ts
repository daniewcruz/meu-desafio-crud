import { NextResponse } from 'next/server';
import { query } from '../../../../lib/db';

/**
 * GET /api/contatos/[id]
 * [Item 63-67] Selecionar um registro específico por ID.
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    // [Item 66] Chama a procedure de obter passando o id.
    const result = await query('SELECT * FROM sp_obter_contato($1)', [id]);

    // [Item 67] Printa no console o registro retornado.
    console.log('Dados do registro selecionado:', result.rows[0]);

    return NextResponse.json(result.rows[0] || { message: 'Não encontrado' });
  } catch (error) {
    console.error('Erro ao obter contato:', error);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}

/**
 * PUT /api/contatos/[id]
 * [Item 49-53] Atualizar registros chamando a procedure de atualização.
 */
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { nome, dataNascimento, observacoes, telefone, email } = body;

    // [Item 52] Chama a procedure de atualização.
    const result = await query(
      'SELECT sp_atualizar_contato($1, $2, $3, $4, $5, $6) as status',
      [id, nome, dataNascimento, observacoes, telefone, email]
    );

    const textoRetornado = result.rows[0].status;

    // [Item 53] Printa no console o texto retornado ("OK").
    console.log('Resultado da atualização:', textoRetornado);

    return NextResponse.json({ message: textoRetornado });
  } catch (error) {
    console.error('Erro ao atualizar:', error);
    return NextResponse.json({ error: 'Erro ao atualizar' }, { status: 500 });
  }
}

/**
 * DELETE /api/contatos/[id]
 * [Item 54-58] Remover registro chamando a procedure de remoção.
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // [Item 57] Chama a procedure de remoção passando o id.
    const result = await query('SELECT sp_remover_contato($1) as status', [id]);
    
    const textoRetornado = result.rows[0].status;

    // [Item 58] Printa no console o texto retornado ("OK").
    console.log('Resultado da remoção:', textoRetornado);

    return NextResponse.json({ message: textoRetornado });
  } catch (error) {
    console.error('Erro ao remover:', error);
    return NextResponse.json({ error: 'Erro ao remover' }, { status: 500 });
  }
}