

let btn_id;
function getData() {
  let id = localStorage.getItem("id");
  fetch('task/assign/getAll/' + id).then((response) => {
    return response.json();
  }).then((data) => {
    console.log(data);



    let ToDoTasks = document.querySelector('div.ToDoTasks');
    let UserCompletedTasks = document.querySelector('div.UserCompletedTasks');  
    let todoData=data.filter(x=>x.is_completed==false)
    let completedTasks=data.filter(x=>x.is_completed==true)


    //todo
    for (let i = 0; i < todoData.length; i++) {
      const element = todoData[i];
      let eachTimer=document.createElement('h1');
      let eachTask = document.createElement('div')
      eachTask.classList.add("eachCard")
      let taskName = document.createElement('div');
      let taskDesc = document.createElement('div');
      let start_date = document.createElement('div');
      let end_date = document.createElement('div');
      let cost_per_hour = document.createElement('div');
      let startBtn = document.createElement('button');
      let completeBtn=document.createElement('button');
      let stopBtn=document.createElement('button')
      let resumeBtn=document.createElement('button');
      let timerh=document.createElement('h1');
      taskName.innerHTML=`${element.task_id.name}`;
        taskName.setAttribute("class","nameHeading");
        taskDesc.innerHTML=`<span>Description: </span>${element.task_id.description}`;
      start_date.innerHTML=`<span>Start Date: </span>${new Date(element.task_id.start_date).toDateString()}`;
      end_date.innerHTML=`<span>End Date:</span> ${new Date(element.task_id.end_date).toDateString()}`
      cost_per_hour.innerHTML=`<span>Cost Per Hour: ${element.cost_per_hour} $</span><div><span>Assigned By: ${element.admin_id.username} - ${element.admin_id.email}</span></div>`
      startBtn.innerHTML = `Start`;
      completeBtn.innerHTML=`Complete`;
      stopBtn.innerHTML=`Stop`;
      resumeBtn.innerHTML=`Resume`;
      stopBtn.classList.add("startBtn");
      resumeBtn.classList.add("startBtn");

      stopBtn.setAttribute("id",i);
      completeBtn.classList.add("startBtn")
      startBtn.classList.add("startBtn")
      startBtn.setAttribute("id", element._id);
      startBtn.setAttribute("type", "submit");
      stopBtn.setAttribute("hidden",true)
      completeBtn.setAttribute("hidden",true)
      
      resumeBtn.setAttribute("hidden",true)



      eachTask.appendChild(taskName);
      eachTask.appendChild(taskDesc);
      eachTask.appendChild(start_date);
      eachTask.appendChild(end_date);
      eachTask.appendChild(cost_per_hour);
      eachTask.appendChild(startBtn);
      eachTask.appendChild(timerh);
      eachTask.appendChild(stopBtn);
      
      eachTask.appendChild(resumeBtn);
      eachTask.appendChild(completeBtn)
      ToDoTasks.appendChild(eachTask);

      startBtn.onclick = function (event) {
        console.log(event);
        timerDiv=this.nextSibling;

          let hr = 0;
          let min = 0;
          let sec = 0;
          let stoptime = true;
        btn_id = event.target.id;
        const start_date= new Date();
        const start_data = { start_date };
        const options = {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(start_data)
        };
        fetch(`/task/assign/start_date/${btn_id}`, options).then(response => response.json()).then(data => {
          console.log(data);
          if(data.success){
            stopBtn.removeAttribute("hidden");
            completeBtn.removeAttribute("hidden")
            if (stoptime == true) {
              stoptime = false;
            timerCycle(timerDiv,stoptime,sec,min,hr,stopBtn,startBtn,resumeBtn);
            }
           
           
            event.target.setAttribute("hidden",true);
          }
          else{
            alert(data.message)
          }
    

        });

      }


      completeBtn.onclick=function(event){
        console.log(element);
        let end_date=new Date();
        let task_id=element.task_id._id;
        const options = {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({end_date,task_id})
        };
        fetch(`/task/assign/complete/${element._id}`, options).then(response => response.json()).then(data => {
          console.log(data);
          if(data.success){
            document. location. reload() ;
          }
          else{
            alert(data.message)
          }
    
        });
      }

    }

    //CompletedTasks 
    for (let i = 0; i < completedTasks.length; i++) {
      const element = data[i];

      let eachTask = document.createElement('div')
        eachTask.classList.add("eachCard")
        let taskName=document.createElement('div');
        let taskDesc=document.createElement('div');
        let start_date=document.createElement('div');
        let end_date=document.createElement('div');
        let members=document.createElement('div');
        let start_time=document.createElement('div');
        let end_time=document.createElement('div');
        if(element.start_date){
            start_time.innerHTML=`<span>Start Time: ${new Date(element.start_date).toLocaleTimeString()}</span>`
        }
        if(element.end_date){
            end_time.innerHTML=`<span>End Time: ${new Date(element.end_date).toLocaleTimeString()}</span>`
     
        }
        taskName.innerHTML=`${element.task_id.name}`;
        taskName.setAttribute("class","nameHeading");
        taskDesc.innerHTML=`<span>Description: </span>${element.task_id.description}`;
        start_date.innerHTML=`<span>Start Date: </span>${new Date(element.task_id.start_date).toDateString()}`;
        end_date.innerHTML=`<span>End Date:</span> ${new Date(element.task_id.end_date).toDateString()}`
        members.innerHTML=`<span>Total Cost: ${parseFloat(element.total_cost).toFixed(3)}$</span>
        <div> Completed By ${element.user_id.username}</div><div><span>Assigned By: ${element.admin_id.username} - ${element.admin_id.email}</span></div>
        `;

        eachTask.appendChild(taskName);
        eachTask.appendChild(taskDesc);
        eachTask.appendChild(start_date);
        eachTask.appendChild(start_time);
        eachTask.appendChild(end_date);
        eachTask.appendChild(end_time);
        
        eachTask.appendChild(members);
      UserCompletedTasks.appendChild(eachTask);
    }


    console.log("kch bhi");
    const myForm=document.getElementById('myForm4');
    console.log(myForm);

    function hello(){
      var arr=document.getElementsByClassName("startBtn");
      console.log(arr);
      const start_date=new Date();
      console.log(start_date);
      for (var i = 0; i < arr.length; i++) {
        const start_id=arr[i].getAttribute('id');
        console.log(start_id);
        const body={start_date};
        console.log(body);
      }
    }

    myForm.onsubmit = hello();

  })

}
getData();







let myVar;
function timerCycle(timer,stoptime,sec,min,hr,stopBtn,startBtn,resumeBtn) {
  
  stopBtn.onclick=function(event){
    if(stoptime==false){
    stoptime=true;
    resumeBtn.removeAttribute("hidden")
    stopBtn.setAttribute("hidden",true)
    resumeBtn.onclick=function(event){
      if (stoptime == true) {
        stoptime = false;
        stopBtn.removeAttribute("hidden")
        resumeBtn.setAttribute("hidden",true)
      timerCycle(timer,stoptime,sec,min,hr,stopBtn,startBtn,resumeBtn);
      }
    }
    clearTimeout(myVar);
    return;
    }
  }
  if (stoptime == false) {
    sec = parseInt(sec);
    min = parseInt(min);
    hr = parseInt(hr);

    sec = sec + 1;

    if (sec == 60) {
      min = min + 1;
      sec = 0;
    }
    if (min == 60) {
      hr = hr + 1;
      min = 0;
      sec = 0;
    }

    if (sec < 10 || sec == 0) {
      sec = '0' + sec;
    }
    if (min < 10 || min == 0) {
      min = '0' + min;
    }
    if (hr < 10 || hr == 0) {
      hr = '0' + hr;
    }

    timer.innerHTML = hr + ':' + min + ':' + sec;

   myVar=setTimeout(timerCycle, 1000,timer,stoptime,sec,min,hr,stopBtn,startBtn,resumeBtn);
  
  }
}

function resetTimer() {
  timer.innerHTML = '00:00:00';
}


function startTime() {
  const today = new Date();
  let h = today.getHours();
  let m = today.getMinutes();
  let s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  document.getElementById('time').innerHTML =  h + ":" + m + ":" + s;
  setTimeout(startTime, 1000);
}

function checkTime(i) {
  if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
  return i;
} 
function getAdminData(){
  fetch('user/admin').then((response)=>{
      return response.json();
  }).then((data)=>{
      console.log(data);
      document.getElementById("admin_name").innerHTML=`${data.username}`;
      document.getElementById("admin_email").innerHTML=`${data.email}`;
      document.getElementById("admin_phone").innerHTML=`${data.mobile_no}`;
  })
      
}

getAdminData();
startTime()