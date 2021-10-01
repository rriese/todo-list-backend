const Todo = require('../models/todo');

module.exports = class todoService {
    static async getAll() {
        try {
            const data = await Todo.find();
            return data;
        } catch (error) {
            console.log(`Could not fetch todos -> ${error}`);
        }
    }

    static async getByTitle(title) {
        try {
            const data = await Todo.find({
                title: title
            });
            return data;
        } catch (error) {
            console.log(`Could not fetch todo -> ${error}`);
        }
    }

    static async add(data) {
        try {
            const response = await new Todo({
                title: data.title,
                description: data.description,
                date: data.date,
                finished: data.finished
            }).save();
            return response;
        } catch (error) {
            console.log(`Error creating todo -> ${error}`);
        }
    }

    static async update(id, todo) {
        try {
          const updateResponse = await Todo.updateOne(
            { _id: id },
            { ...todo, date: new Date() }
          );
    
          return updateResponse;
        } catch (error) {
          console.log(`Error updating todo -> ${error}`);
        }
      }

    static async delete(id) {
        try {
            const deleted = await Todo.findOneAndDelete({
                _id: id
            });
            if (deleted) return deleted;
        } catch (error) {
            console.log(`Error deleting todo -> ${error}`);
        }
    }
}