const { Schema, model, Types, mongoose} = require('mongoose');
const dateFormat = require('../utils/dateFormat')

const ReactionsSchema =new Schema(
    {
        //set custom id to avoid confusion with parent comment _id
        replyId:{
            type:Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        replyBody:{
            type:String,
            required:true,
            trim:true
        },
        writtenBy:{
            type:String,
            required:true
        },
        createdAt:{
            type:Date,
            default:Date.now,
            get:createdAtVal => dateFormat(createdAtVal)
        }
    },
    {
        toJson: {
            getters:true
        }
    }, 
);


const ThoughtSchema = new Schema(
    {
        writtenBy:{
            type:String 
        },
        thoughtBody:{
            type:String
        },
        createdAt:{
            type:Date,
            default:Date.now
        },
        reactions:[ReactionsSchema]
     },
        {
            toJson:{
                virtuals:true,
                getters:true
            },
            id:false
        }
    
);
ThoughtSchema.virtual('reactionCount').get(function(){
    return this.replies.length
});

module.exports = mongoose.models.thoughts || mongoose.model('thoughts', ThoughtSchema);