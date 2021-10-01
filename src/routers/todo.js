const app = require('express');
const router = app.Router();
const controller = require('../controllers/todoController');

router.get('/', controller.getAll);
router.get('/:title', controller.getByTitle);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;