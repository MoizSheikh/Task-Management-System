

const mongoose = require("mongoose");
const TaskSchema=mongoose.Schema({
   name:{
    type: String,
    required: true,
    },
    description:{
        type:String
    },
    start_date:{
        type:String,
    },
    end_date:{
        type:String,
    },
    status:{
        type:String,
        default:"unAssigned"
    },
    cost_per_hour:{
        type:Number
    },
    total_members:{
        type:Number
    },
  
    
    is_active:{
        type:Boolean,
        default:true

    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
    
        ref: 'User'
    },
    date_created:{
        type:Date,
        default:Date.now
    }

})


module.exports=mongoose.model('Task',TaskSchema);