const Message = require('../models/message.model');

exports.createMessage = async (req, res, next) => {
    const { text } = req.body

    try {
        if (!req.file) {
            const message = new Message({
                text: text,
                author: req.userId
            });

            const savedMessage = await message.save();

            return res.status(201).json({
                'data': savedMessage,
                'success': true,
            });
        }

        const imageUrl = req.file.path.replace(/\\/g, '/');

        const message = new Message({
            text: text,
            author: req.userId,
            imageUrl: imageUrl
        });

        const savedMessage = await message.save();

        return res.status(201).json({
            'data': savedMessage,
            'success': true,
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.getMessages = async (req, res, next) => {
    try {
        const totalItems = await Message.find().count();
        const currentPage = req.query.page || 1;
        const perPage = 20;

        const messages = await Message.find().skip((currentPage -1) * perPage).limit(perPage);

        return res.status(200).json({
            'data': messages,
            'success': true,
            'totalItems': totalItems
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.getMessage = async (req, res, next) => {
    const { id } = req.params;

    try {
        const message = await Message.findOne({ _id: id });

        if (!message) {
            const error = new Error('Message not found');
            error.statusCode = 404;
            throw error;
        }

        return res.status(200).json({
            'data': message,
            'success': true
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.updateMessage = async (req, res, next) => {
    const { text } = req.body;
    const { id } = req.params;

    try {
        const message = await Message.findOne({ _id: id });

        if (!message) {
            const error = new Error('Message not found');
            error.statusCode = 404;
            throw error;
        }

        if (req.file) {
            message.imageUrl = req.file.path.replace(/\\/g, '/');
            message.text = text;

            const savedMessage = await message.save();

            return res.status(200).json({
                'data': savedMessage,
                'success': true
            });
        }

        message.text = text

        const savedMessage = await message.save();

        return res.status(200).json({
            'data': savedMessage,
            'success': true
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.deleteMessage = async (req, res, next) => {
    const { id } = req.params;

    try {
        const message = await Message.findOne({ _id: id });

        if (!message) {
            const error = new Error('Message not found');
            error.statusCode = 404;
            throw error;
        }

        await Message.findByIdAndDelete({ _id: id });

        return res.status(200).json({
            'data': null,
            'success': true
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}
