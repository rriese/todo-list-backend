const todoService = require('../services/todoService');

exports.getAll = async(req, res) => {
    try {
        const data = await todoService.getAll();

        if (!data) {
            return res.status(404).json('No data on database')
        }
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

exports.getByTitle = async (req, res) => {
    try {
        const data = await todoService.getByTitle(req.params.title);

        if (!data) {
            return res.status(404).json('No data on database')
        }
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

exports.create = async (req, res) => {
    try {
        const createdTodo = await todoService.add(req.body);
        res.status(201).json(createdTodo);
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

exports.update = async (req, res) => {
    let id = req.params.id;

    try {
        const todo = {};
        todo.title = req.body.title;
        todo.description = req.body.description;
        todo.finished = req.body.finished;

        const updatedTodo = await todoService.update(id, todo);

        if (updatedTodo.nModified === 0) {
            return res.status(404).json({});
        }

        res.json(updatedTodo);
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

exports.delete = async (req, res) => {
    try {
        const response = await todoService.delete(req.params.id);
        if (response) {
            res.json(response);
        } else {
            res.json({});
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
}