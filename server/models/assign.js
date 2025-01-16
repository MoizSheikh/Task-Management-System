

const mongoose = require("mongoose");
const AssignSchema=mongoose.Schema({
   
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
    
        ref: 'User'
    },
    task_id:{
        type: mongoose.Schema.Types.ObjectId,
    
        ref: 'Task'
    },
    admin_id:{
        type: mongoose.Schema.Types.ObjectId,
    
        ref: 'User'
    },
    status:{
        type:String,
        default:"New",
    },
    start_date:{
        type:String
    },
    end_date:{
        type:String
    },
    cost_per_hour:{
        type:Number
    },
    total_members:{
        type:Number
    },
    is_completed:{
        type:Boolean,
        default:false,
    },
    is_active:{
        type:Boolean,
        default:true

    },
    total_cost:{
        type:String
    },
    date_created:{
        type:Date,
        default:Date.now
    }

})


module.exports=mongoose.model('Assign',AssignSchema);