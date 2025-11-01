import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        },
    password: {
        type: String,
        required: true,
    },
    
},{
    timestamps: true
},{
    collection: 'dummy_collections'
});

const User = mongoose.model('job', userSchema);
export default User;