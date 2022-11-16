const { Schema,model,mongoose} = require('mongoose');
const dateFormat = require('../utils/dateFormat')

const UserSchema = new Schema(
    {
        userName: {
            type:String,
            required:true,
            trim:true
        },
        createdBy: {
            type:String,
            required:true,
            trim:true
        },
        createdAt:{
            type:Date,
            default:Date.now,
            get:(createdAtVal) => dateFormat(createdAtVal)
        },
        thoughts:[
            {
                type:Schema.Types.ObjectId,
                ref:'Thoughts'
            }
        ]
    },
    {
        toJSON:{
            virtuals:true,
            getters:true,
        },
        id:false
    }
);

//get total count of comments and replies on retrieval
UserSchema.virtual('ThoughtCount').get(function(){
    return this.thoughts.reduce((total,thoughts)=> total + this.thoughts.replies.length + 1.0) 
});

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);