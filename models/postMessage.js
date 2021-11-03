import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    audio: { type: String, trim: true },
    message: { type: String, trim: true },
    video: { type: String, trim: true },
    selectedFile: { type: String, trim: true },
    likeCount: { type: Number, default: 0, },
    dislikeCount: { type: Number, default: 0, },
    createdAt: { type: Date, default: new Date(), },
}, { timeStamps: true }
)

var PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;