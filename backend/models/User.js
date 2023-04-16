const mongoose=require("mongoose")

const UserSchema= new mongoose.Schema( //Esquema es la silueta de lo que llevará ese documento 
    { 
        username:{ 
            type:String,
            require:true,
            min:3,
            max:20,
            unique:true,
        },

        email:{ 
            type:String,
            require:true,
            max:50,
            unique:true,
        },
        password:{ 
            type:String,
            require:true,
            min:6,
        },
    },
    { 
        timestamps:true,
        versionKey: false

    }
)

module.exports= mongoose.model("User",UserSchema)
    
