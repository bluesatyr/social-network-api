const { Schema, model, Types } = require('mongoose');
const formatDate = require('../utils/formatDate');

const ReactionSchema = new Schema (
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => formatDate(createdAtVal)  // Create a utility function to format the date
        }
    },
    {
        toJSON: {
        virtuals: true,
        getters: true
        },
        id: false
    }
)

// get the thought that the reaction is tied to
ReactionSchema.virtual('thoughtId').get(function() {
    return this.parent.__id;
});

const ThoughtSchema = new Schema (
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => formatDate(createdAtVal)
        },
        username: {
            type: String,
            required: true
        },
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
        virtuals: true,
        getters: true
        },
        id: false
    }
);

//Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

// virtual to get the User who owns a thought
ThoughtSchema.virtual('userId').get(function() {
    return parent = this.parent.__id; 
});


const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;