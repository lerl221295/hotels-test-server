import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let HotelsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String
    },
    stars: {
        type: Number,
        enum: [1, 2, 3, 4, 5],
        required: true
    },
    amenities: [{
        type: String
    }]
});

HotelsSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

HotelsSchema.set('toJSON', {
    virtuals: true
});

export default mongoose.model('Hotels', HotelsSchema);