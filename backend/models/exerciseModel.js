import mongoose from 'mongoose'

const exerciseSchema = mongoose.Schema(
    {
        Exercise: {
            type:String,
            required: true,
        },
        Weight: {
            type:Number,
            required: true,
        },
        NumOfSet: {
            type:Number,
            required: true,
        },
        NumOfRep: {
            type:Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

export const Exercise = mongoose.model('Cat', exerciseSchema);