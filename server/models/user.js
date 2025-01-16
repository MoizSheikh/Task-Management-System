

const mongoose = require("mongoose");
const UserSchema=mongoose.Schema({
   username:{
    type: String,
    required: true,
    },
    
     email:{
        type: String,
        required: true,
        trim: true,
        unique: 1
    },
    
    password:{
        type:String,
        required:true
    },
    password2:{
        type:String,

    },
  
    mobile_no:{
        type:Number,
        maxlength:15
    },
    
    is_admin:{
        type:Boolean,
        default:false,
    },
    is_active:{
        type:Boolean,
        default:true

    },
 
    date_created:{
        type:Date,
        default:Date.now
    }

})


module.exports=mongoose.model('User',UserSchema);