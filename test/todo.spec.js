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
    test.todo('add');
    test.todo('update');
    test.todo('delete');
})