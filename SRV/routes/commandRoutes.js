const express = require('express');
const CommandController = require('../controllers/commandController');

const router = express.Router();

router.get('/', CommandController.getAllCommands);
router.get('/all', CommandController.getCommandWithArticles);
router.get('/:id', CommandController.getCommandById);
router.post('/', CommandController.createCommand);
router.put('/:id', CommandController.updateCommand);
router.delete('/:id', CommandController.deleteCommand);
router.get('/phone-history/:phoneNumber', CommandController.getPhoneHistory);

module.exports = router;
