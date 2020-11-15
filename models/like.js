const mongoose = require('mongoose');

const likeSchema = mongoose.Schema
(
    {
        user:
        {
            type: mongoose.Schema.ObjectId
        },
        // this defines the object id of the liked object
        likeable:
        {
            type: mongoose.Schema.ObjectId,
            required: true,
            refPath: 'onModel'
        },
        // this field is used for defining the type of the object since this is a dynamic reference
        onModel:
        {
            type: String,
            required: true,
            enum: ['Post', 'Comment']
        }
    },
    {
        timestamps: true
    }
);


const Like = mongoose.model('Like', likeSchema);
module.exports = Like;