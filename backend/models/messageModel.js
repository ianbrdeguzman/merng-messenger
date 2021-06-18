import mongoose from 'mongoose';

const messageSchema = mongoose.Schema(
    {
        content: { type: String, required: true },
        from: { type: String, required: true },
        to: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

const Message = mongoose.Model('Message', messageSchema);

export default Message;
