const CommandModel = require('../models/commandModel');

class CommandController {
    // Get all commands
    static async getAllCommands(req, res) {
        try {
            const rows = await CommandModel.getAllCommands();
            res.json(rows);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    // Get a command by ID
    static async getCommandById(req, res) {
        const { id } = req.params;
        try {
            const row = await CommandModel.getCommandById(id);
            if (!row) {
                return res.status(404).json({ error: 'Command not found' });
            }
            res.json(row);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    // Create a new command with articles
    static async createCommand(req, res) {
        try {
            const commandId = await CommandModel.createCommandWithArticles(req.body);
            res.status(201).json({ id: commandId });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    // Update a command by ID
    static async updateCommand(req, res) {
        const { id } = req.params;
        try {
            await CommandModel.updateCommand(id, req.body);
            res.json({ message: 'Command updated successfully' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    // Delete a command by ID
    static async deleteCommand(req, res) {
        const { id } = req.params;
        try {
            await CommandModel.deleteArticlesByCommandId(id);
            await CommandModel.deleteCommand(id);
            res.json({ message: 'Command and associated articles deleted successfully' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async getCommandWithArticles(req, res) {
        try {
            const command = await CommandModel.getCommandWithArticles();
            res.status(200).json(command);
        } catch (err) {
            console.error('Error fetching command with articles:', err);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    // Get command history by phone number
    static async getPhoneHistory(req, res) {
        const { phoneNumber } = req.params;
        try {
            const history = await CommandModel.getPhoneHistory(phoneNumber);
            res.json(history);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

}

module.exports = CommandController;
