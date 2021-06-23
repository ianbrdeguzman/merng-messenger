import mongoose from 'mongoose';

const reactionSchema = mongoose.Schema(
    {
        content: {type: String, required: true},
        messageId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message',
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        }
    },{
        timestamps: true
    }
)

const Reaction = mongoose.model('Reaction', reactionSchema)

export default Reaction;