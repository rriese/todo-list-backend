const todoService = require('../src/services/todoService')
const db = require('./mongoosetest');

describe('todoService', () => {
    beforeAll(() => {
        db.init();
    })
    afterAll(() => {
        db.close();
    })
    test('getAll', async () => {
        const todos = await todoService.getAll();
        expect(todos.length).toBeGreaterThan(0)
    });
    test('getByTitle', async () => {
        const todo = await todoService.getByTitle('Estudar Node');
        expect(todo[0].title).toBe('Estudar Node');
    });
    test('add', async () => {
        let todo = {};
        todo.title = 'Estudar Jest';
        todo.description = 'Fazer mais aulas práticas';
        todo.finished = false;

        const createdTodo = await todoService.add(todo);
        expect(createdTodo).not.toBe(undefined);
    });
    test('update', async () => {
        let todo = await todoService.getByTitle('Estudar Jest');
        let isUpdated = false;

        if (todo.length > 0) {
            todo = todo[0];
            let todoNew = {};
            todoNew.title = todo.title;
            todoNew.description = todo.description + ' - Atualizado';
            todoNew.finished = todo.finished;
            
            const updatedTodo = await todoService.update(todo._id, todoNew);

            if (updatedTodo !== undefined) {
                isUpdated = true;
            }
        }
        expect(isUpdated).toBe(true);
    });
    test('delete', async () => {
        const todo = await todoService.getByTitle('Estudar Jest');
        let deletedTodo = null;

        if (todo.length > 0) {
            deletedTodo = await todoService.delete(todo[0]._id);
        }
        expect(deletedTodo).not.toBeNull();
    });
})