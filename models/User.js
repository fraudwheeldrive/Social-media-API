// User

// username

// String
// Unique
// Required
// Trimmed
// email

// String
// Required
// Unique
// Must match a valid email address (look into Mongoose's matching validation)
// thoughts

// Array of _id values referencing the Thought model
// friends

// Array of _id values referencing the User model (self-reference)
// Schema Settings

// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.

const { Schema, model } = require ('mongoose');

const UserSchema = new Schema(
    {
        username: {
            Type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            match: [] //look into the mongo validation / regex
        },
        thoughts: [
            {
                type:Schema.Types.ObjectId,
                ref: 'Though'
            }
        ],
friends: [
    {
        type: SChema.Types.ObjectId,
        ref: 'User'
    }
]
    },
{
    toJSON: {
        virtuals: true,
    },
    id: false
});

UserSchema.virtual('friendCount').get(function() {

});

const User = model ('User', UserSchema);

module.exports = User; 