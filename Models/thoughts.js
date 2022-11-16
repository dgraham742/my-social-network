const { Schema, model, Types, mongoose} = require('mongoose');

const ThoughtSchema = new Schema(
    {
        writtenBy:{
            type:string 
        }
    }
)