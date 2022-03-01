const { Schema, model } = require('mongoose');

const messageSchema = new Schema(
    {
        text: {
            type: String
        },
        imageUrl: {
            type: String,
            required: false
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true
    }
);

module.exports = model('Message', messageSchema);
