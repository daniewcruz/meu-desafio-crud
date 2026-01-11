import { NextResponse } from 'next/server';
import { query } from '../../../../lib/db';

// Função para normalizar nomes de colunas e padronizar a data em YYYY-MM-DD
function normalizeContact(row: any) {
  const rawDate = row?.datanascimento ?? row?.dataNascimento;
  let dateStr: string | null = null;
  if (rawDate != null) {
    try {
      if (typeof rawDate === 'string') {
        dateStr = rawDate.includes('T') ? rawDate.split('T')[0] : rawDate;
      } else {
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
 * GET /api/contatos/[id]
 * Selecionar um registro específico por ID.
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    // Chama a procedure de obter passando o id.
    const result = await query('SELECT * FROM sp_obter_contato($1)', [id]);

    // Printa no console o registro retornado.
    console.log('Dados do registro selecionado:', result.rows[0]);

    if (!result.rows.length) {
      return NextResponse.json({ message: 'Não encontrado' }, { status: 404 });
    }

    return NextResponse.json(normalizeContact(result.rows[0]));
  } catch (error) {
    console.error('Erro ao obter contato:', error);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}

/**
 * PUT /api/contatos/[id]
 * Atualizar registros chamando a procedure de atualização.
 */
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { nome, dataNascimento, observacoes, telefone, email } = body;

    console.log('PUT /api/contatos/[id] - ID:', id);
    console.log('Dados recebidos:', { nome, dataNascimento, observacoes, telefone, email });

    // Validação
    if (!nome || !dataNascimento || !telefone || !email) {
      console.error('Campos obrigatórios faltando:', { nome, dataNascimento, telefone, email });
      return NextResponse.json({ error: 'Campos obrigatórios faltando' }, { status: 400 });
    }

    // Chama a procedure de atualização.
    const result = await query(
      'SELECT sp_atualizar_contato($1, $2, $3, $4, $5, $6) as status',
      [id, nome, dataNascimento, observacoes || null, telefone, email]
    );

    const textoRetornado = result.rows[0].status;

    console.log('Resultado da atualização:', textoRetornado);

    if (textoRetornado === 'NAO_ENCONTRADO') {
      return NextResponse.json({ message: 'Não encontrado' }, { status: 404 });
    }

    return NextResponse.json({ message: textoRetornado });
  } catch (error) {
    console.error('Erro ao atualizar:', error);
    return NextResponse.json({ error: 'Erro ao atualizar', details: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}

/**
 * DELETE /api/contatos/[id]
 * Remover registro chamando a procedure de remoção.
 */
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    console.log('DELETE /api/contatos/[id] - ID:', id);

    // Chama a procedure de remoção passando o id.
    const result = await query('SELECT sp_remover_contato($1) as status', [id]);
    
    const textoRetornado = result.rows[0].status;

    console.log('Resultado da remoção:', textoRetornado);

    if (textoRetornado === 'NAO_ENCONTRADO') {
      return NextResponse.json({ message: 'Não encontrado' }, { status: 404 });
    }

    return NextResponse.json({ message: textoRetornado });
  } catch (error) {
    console.error('Erro ao remover:', error);
    return NextResponse.json({ error: 'Erro ao remover', details: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}