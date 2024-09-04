const GerenciadorDeTarefas = require('../src/Trabalho01Turma01');

describe('GerenciadorDeTarefas', () => {
    let gerenciador;

    beforeEach(() => {
        gerenciador = new GerenciadorDeTarefas();
    });

    test('Deve adicionar uma tarefa', () => {
        const tarefa = { id: 1, descricao: 'Tarefa 1' };
        gerenciador.adicionarTarefa(tarefa);
        expect(gerenciador.listarTarefas()).toContain(tarefa);
    });

    test('Não deve adicionar uma tarefa quando a descrição for menor que 3 caracteres', () => {
        const tarefa2 = { id: 1, descricao: 'AB' };
        expect(() => gerenciador.adicionarTarefa(tarefa2)).toThrow('Erro ao cadastrar tarefa');
    });

    test('Deve remover uma tarefa', () => {
        const tarefa = { id: 1, descricao: 'Descricao da tarefa' };
        gerenciador.adicionarTarefa(tarefa);
        gerenciador.removerTarefa(1);
        expect(gerenciador.listarTarefas()).not.toContain(tarefa);
    });

    test('Deve buscar uma tarefa por ID', () => {
        const tarefa = { id: 1, descricao: 'Descricao da tarefa' };
        gerenciador.adicionarTarefa(tarefa);
        expect(gerenciador.buscarTarefaPorId(1)).toEqual(tarefa);
    });

    test('Deve atualizar uma tarefa', () => {
        const tarefa = { id: 1, descricao: 'Descricao da tarefa' };
        gerenciador.adicionarTarefa(tarefa);
        gerenciador.atualizarTarefa(1, { descricao: 'Tarefa atualizada' });
        expect(gerenciador.buscarTarefaPorId(1).descricao).toBe('Tarefa atualizada');
    });

    test('Deve listar todas as tarefas', () => {
        const tarefa1 = { id: 1, descricao: 'Tarefa 1' };
        const tarefa2 = { id: 2, descricao: 'Tarefa 2' };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        expect(gerenciador.listarTarefas()).toEqual([tarefa1, tarefa2]);
    });

    test('Deve contar o número de tarefas', () => {
        const tarefa1 = { id: 1, descricao: 'Tarefa 1' };
        const tarefa2 = { id: 2, descricao: 'Tarefa 2' };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        expect(gerenciador.contarTarefas()).toBe(2);
    });

    test('Deve marcar uma tarefa como concluída', () => {
        const tarefa = { id: 1, descricao: 'Descricao da tarefa' };
        gerenciador.adicionarTarefa(tarefa);
        gerenciador.marcarTarefaComoConcluida(1);
        expect(gerenciador.buscarTarefaPorId(1).concluida).toBe(true);
    });

    test('Deve listar tarefas concluídas', () => {
        const tarefa1 = { id: 1, descricao: 'Tarefa 1', concluida: true };
        const tarefa2 = { id: 2, descricao: 'Tarefa 2', concluida: false };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        expect(gerenciador.listarTarefasConcluidas()).toEqual([tarefa1]);
    });

    test('Deve listar tarefas pendentes', () => {
        const tarefa1 = { id: 1, descricao: 'Tarefa 1', concluida: false };
        const tarefa2 = { id: 2, descricao: 'Tarefa 2', concluida: true };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        expect(gerenciador.listarTarefasPendentes()).toEqual([tarefa1]);
    });

    test('Deve remover tarefas concluídas', () => {
        const tarefa1 = { id: 1, descricao: 'Tarefa 1', concluida: false };
        const tarefa2 = { id: 2, descricao: 'Tarefa 2', concluida: true };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        gerenciador.removerTarefasConcluidas();
        expect(gerenciador.listarTarefas()).toEqual([tarefa1]);
    });

    test('Deve buscar tarefa por descrição', () => {
        const tarefa = { id: 1, descricao: 'Descricao da tarefa' };
        gerenciador.adicionarTarefa(tarefa);
        expect(gerenciador.buscarTarefaPorDescricao('Descricao da tarefa')).toEqual([tarefa]);
    });

    test('Deve adicionar uma tag a uma tarefa', () => {
        const tarefa = { id: 1, descricao: 'Descricao da tarefa' };
        gerenciador.adicionarTarefa(tarefa);
        gerenciador.adicionarTagATarefa(1, 'tag1');
        expect(gerenciador.buscarTarefaPorId(1).tags).toContain('tag1');
    });

    test('Deve remover uma tag de uma tarefa', () => {
        const tarefa = { id: 1, descricao: 'Tarefa com tag' };
        gerenciador.adicionarTarefa(tarefa);
        gerenciador.adicionarTagATarefa(1, 'tag1');
        gerenciador.removerTagDaTarefa(1, 'tag1');
        expect(gerenciador.buscarTarefaPorId(1).tags).not.toContain('tag1');
    });

    test('Deve listar tarefas por tag', () => {
        const tarefa1 = { id: 1, descricao: 'Tarefa com tag', tags: ['tag1'] };
        const tarefa2 = { id: 2, descricao: 'Outra tarefa', tags: ['tag2'] };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        expect(gerenciador.listarTarefasPorTag('tag1')).toEqual([tarefa1]);
    });

    test('Deve buscar tarefas por data', () => {
        const tarefa = { id: 1, descricao: 'Tarefa por data', data: '2024-09-04' };
        gerenciador.adicionarTarefa(tarefa);
        expect(gerenciador.buscarTarefasPorData('2024-09-04')).toEqual([tarefa]);
    });

    test('Deve atualizar a prioridade de uma tarefa', () => {
        const tarefa = { id: 1, descricao: 'Tarefa com prioridade' };
        gerenciador.adicionarTarefa(tarefa);
        gerenciador.atualizarPrioridade(1, 1);
        expect(gerenciador.buscarTarefaPorId(1).prioridade).toBe(1);
    });

    test('Deve listar tarefas por prioridade', () => {
        const tarefa1 = { id: 1, descricao: 'Tarefa baixa', prioridade: 1 };
        const tarefa2 = { id: 1, descricao: 'Tarefa alta', prioridade: 5 };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        expect(gerenciador.listarTarefasPorPrioridade(1)).toEqual([tarefa1]);
    });

    test('Deve contar tarefas por prioridade', () => {
        const tarefa1 = { id: 1, descricao: 'Tarefa baixa', prioridade: 1 };
        const tarefa2 = { id: 2, descricao: 'Outra tarefa baixa', prioridade: 1 };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        expect(gerenciador.contarTarefasPorPrioridade(1)).toBe(2);
    });

    test('Deve marcar todas as tarefas como concluídas', () => {
        const tarefa1 = { id: 1, descricao: 'Tarefa 1' };
        const tarefa2 = { id: 2, descricao: 'Tarefa 2' };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        gerenciador.marcarTodasComoConcluidas();
        expect(gerenciador.listarTarefas()).toEqual([
            { ...tarefa1, concluida: true },
            { ...tarefa2, concluida: true }
        ]);
    });

    test('Deve reabrir uma tarefa', () => {
        const tarefa = { id: 1, descricao: 'Tarefa concluída', concluida: true };
        gerenciador.adicionarTarefa(tarefa);
        gerenciador.reabrirTarefa(1);
        expect(gerenciador.buscarTarefaPorId(1).concluida).toBe(false);
    });

    test('Deve ordenar tarefas por data', () => {
        const tarefa1 = { id: 1, descricao: 'Tarefa 1', data: '2024-09-05' };
        const tarefa2 = { id: 2, descricao: 'Tarefa 2', data: '2024-09-04' };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        gerenciador.ordenarTarefasPorData();
        expect(gerenciador.listarTarefas()).toEqual([tarefa2, tarefa1]);
    });

    test('Deve ordenar tarefas por prioridade', () => {
        const tarefa1 = { id: 1, descricao: 'Tarefa baixa', prioridade: 1 };
        const tarefa2 = { id: 2, descricao: 'Tarefa alta', prioridade: 5 };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        gerenciador.ordenarTarefasPorPrioridade();
        expect(gerenciador.listarTarefas()).toEqual([tarefa1, tarefa2]);
    });
});
