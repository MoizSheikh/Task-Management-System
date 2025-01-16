const router = require('express').Router();

const Task=require('./../models/task');
const Assign=require('./../models/assign');

const User=require("./../models/user")

//Add TASK in DATABASE
router.post("/add",(req,res)=>{
    const task=new Task(req.body);
    task.save((err,doc)=>{
        if(err) {console.log(err);
            return res.status(400).json({ success : false,error:err,message:"Error failed"});}
        
            res.status(200).json({
                success:true,
                data : doc,
                message:"Task added successfully"
            });
    })

    
})



  //GET ALL TASKs from DATABASE
router.get("/getAll", ({}, res) => {
    Task.find({}).then((tasks) => {
        res.json(tasks);
    }).catch(err => {
        res.status(400).json(err);
    });
  });

  router.get("/getAll/:id", (req, res) => {
    Task.find({user_id:req.params.id}).then((tasks) => {
        res.json(tasks);
    }).catch(err => {
        res.status(400).json(err);
    });
  });

  //GET specific TASK wrt to id from DATABASE
  router.get("/get/:id",(req,res)=>{
    Task.findOne({_id:req.params.id},(err,obj)=>{
        if(err) {console.log(err);
            return res.status(400).json({message:"Failed to get " ,success : false});}
     
            
    res.status(200).json({
                success:true,
                data : obj
            });
    })
});


  //UPDATE TASK wrt to id from DATABASE
router.put("/update/:id",(req,res)=>{
    Task.findOneAndUpdate({_id:req.params.id},req.body,{new:true},(err,obj)=>{
        if(err) {console.log(err);
            return res.status(400).json({message:"Failed to update " ,success : false});}
     
            res.status(200).json({
                success:true,
                message :"Task updated successfully!",
                data : obj
            })

        })
})

router.put("/update/:id",(req,res)=>{
    Task.findOneAndUpdate({_id:req.params.id},req.body,{new:true},(err,obj)=>{
        if(err) {console.log(err);
            return res.status(400).json({message:"Failed to update " ,success : false});}
     
            res.status(200).json({
                success:true,
                message :"Task updated successfully!",
                data : obj
            })

        })
})


  //DELETE  TASKs from DATABASE
router.delete("/delete/:id",(req,res)=>{
    Task.deleteOne({_id:req.params.id},(err,obj)=>{
        if(err){
            return res.status(400).json({message:"Failed to delete",success:false,err:err})
        }
        res.status(200).json({
                success:true,
                data : obj,
                message:"Task Deleted succesfully"
            });
    
    })
})

//ASSIGN task to some user
router.post("/assign",(req,res)=>{
    

    //req.body.user_id=obju._id
    const assign=new Assign(req.body);
    
    assign.save((err,doc)=>{
        if(err) {console.log(err);
            return res.status(400).json({ success : false,error:err,message:"Error failed"});}
            Task.findOneAndUpdate({_id:req.body.task_id},{status:"Assigned"},(err1,obj)=>{
                if(err1){
                    return res.status(400).json({message:"Failed to delete",success:false,err:err1})
                }
                res.status(200).json({
                        success:true,
                        data : obj,
                        data_assign:doc,
                        message:"Task assigned succesfully"
                    });
            })
           
    })
})


//delete assigned task
router.delete("/assign/:id",(req,res)=>{
    Assign.deleteOne({_id:req.params.id},(err,obj)=>{
        if(err){
            return res.status(400).json({message:"Failed to delete",success:false,err:err})
        }
        res.status(200).json({
                success:true,
                data : obj,
                message:"Task UnAssigned succesfully"
            });
    
    })
})

//complete task
router.put("/assign/complete/:id",(req,res)=>{
    Assign.findOneAndUpdate({_id:req.params.id},{is_completed:true,end_date:req.body.end_date,total_cost:req.body.total_cost,status:"Completed"},(err,obj)=>{
        if(err){
            return res.status(400).json({message:"Failed",success:false,err:err})
        }
        const start_date=new Date(obj.start_date)
      const end_date=new Date(req.body.end_date)
      const hours = parseFloat((end_date - start_date) / (1000 * 60 * 60) % 24);
      console.log(Math.abs(hours));
      obj.total_cost=Math.abs(hours)*obj.cost_per_hour;
      obj.save((err,data)=>{
        Task.findOneAndUpdate({_id:req.body.task_id},{status:"completed"},(err1,obj1)=>{
            if(err1){
                return res.status(400).json({message:"Failed to delete",success:false,err:err1})
            }
            res.status(200).json({
                    success:true,
                    data : obj,
                    message:"Task completed succesfully"
                });
        })
      })
        
        // res.status(200).json({
        //         success:true,
        //         data : obj,
        //         message:"Task completed succesfully"
        //     });
    })
})
//update start date in assigned task
router.put("/assign/start_date/:id",(req,res)=>{
    Assign.findOneAndUpdate({_id:req.params.id},{start_date:req.body.start_date,status:"Ongoing"},(err,obj)=>{
        if(err){
            return res.status(400).json({message:"Failed to delete",success:false,err:err})
        }
        res.status(200).json({
                success:true,
                data : obj,
                message:"Task start succesfully"
            });
    })
})

//update end date in assigned task
router.put("/assign/total_cost/:id",(req,res)=>{
    Assign.findOneAndUpdate({_id:req.params.id},{end_date:req.body.end_date},(err,obj)=>{
        if(err){
            return res.status(400).json({message:"Failed to delete",success:false,err:err})
        }
        res.status(200).json({
                success:true,
                data : obj,
                message:"Task end succesfully"
            });
    })
})

//update status of task
router.put("/update/status/:id",(req,res)=>{
    Task.findOneAndUpdate({_id:req.params.id},{status:"Assigned"},(err,obj)=>{
        if(err){
            return res.status(400).json({message:"Failed to delete",success:false,err:err})
        }
        res.status(200).json({
                success:true,
                data : obj,
                message:"Task completed succesfully"
            });
    })
})


router.get("/assign/getAll/:id",(req,res)=>{
    Assign.find({user_id:req.params.id},(err,obj)=>{
        if(err){
            return res.status(400).json({message:"Failed to get",success:false,err:err})
        }
        res.status(200).json(obj);
    }).populate("task_id").populate("user_id").populate("admin_id");
})

router.get("/assign/getAll",(req,res)=>{
    Assign.find({},(err,obj)=>{
        if(err){
            return res.status(400).json({message:"Failed to get",success:false,err:err})
        }
        res.status(200).json(obj);
    }).populate("task_id").populate("user_id").populate("admin_id");
})

router.get("/assign/get/:id",(req,res)=>{
    Assign.find({admin_id:req.params.id},(err,obj)=>{
        if(err){
            return res.status(400).json({message:"Failed to get",success:false,err:err})
        }
        res.status(200).json(obj);
    }).populate("task_id").populate("user_id").populate("admin_id");
})
      




module.exports = router;