
var modal = document.getElementById("myModal");
var overlay = document.getElementById("overlay");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];
let task_id;


let firstRender = true;

if( localStorage.getItem("firstRender")){
//true found meaning already once rendered so
modal.style.display = "none";
overlay.style.display = "none";
}
else{

  overlay.style.display = "block";
  overlay.style.height = Math.max( document.body.scrollHeight, document.body.offsetHeight, 
    document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight ) + "px";
  
  localStorage.setItem("firstRender", firstRender);
}

btn.onclick = function() {
  modal.style.display = "flex";
  overlay.style.display = "block";
  overlay.style.height = Math.max( document.body.scrollHeight, document.body.offsetHeight, 
    document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight ) + "px";
}
span.onclick = function() {
  modal.style.display = "none";
  overlay.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    overlay.style.display = "none";
  }
}

//add members
var member_modal = document.getElementById("myModal1");
var Memberspan = document.getElementsByClassName("close1")[0];
const container = document.querySelector('.UnAssignedTasks');
container.addEventListener('click', function (e) {
  if (e.target.classList.contains('assignMemberBtn')) {
    task_id=e.target.id;

    member_modal.style.display = "flex";
    overlay.style.display = "block";
    overlay.style.height = Math.max( document.body.scrollHeight, document.body.offsetHeight, 
      document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight ) + "px";
  }
});
Memberspan.onclick = function() {
  member_modal.style.display = "none";
  overlay.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == modal) {
    member_modal.style.display = "none";
    overlay.style.display = "none";
  }
}

const myForm=document.getElementById('myForm3');
myForm.addEventListener('submit',async (e)=>{
e.preventDefault();
const name=document.getElementById('task_name').value;
const description=document.getElementById('task_desc').value;
const start_date=document.getElementById('start_date_project').value;
const end_date=document.getElementById('end_date_project').value;
const user_id=localStorage.getItem("id");
const data={name,description,start_date,end_date,user_id};
const options={
method:'POST',
headers:{
    'Content-Type':'application/json'
},
body:JSON.stringify(data)
};
const request=await fetch('/task/add',options);
const response=await request.json();
console.log(response);
if(response.success)
{
  document. location. reload() ;

  // alert('Task added successfully');
}
else{
  alert(response.message)
}
 });





 function getAllUsers(){
  fetch('user/getAll').then((response)=>{
      return response.json();
  }).then((data)=>{
       const selectUsers=document.getElementById("member_email");
       data = data.filter(e=>e.is_admin!==true)
      data.map((eachData)=>{
          selectUsers.innerHTML+=`<option value='${eachData._id}' id=emailOption>${eachData.username}</option>`
      })
     
  })
}
let showAlert=false;
const assignBtn=document.getElementById("assign-btn");
assignBtn.onclick=async function(event){
  event.preventDefault();
  let user_id=document.getElementById("member_email").value;
  let cost_per_hour=document.getElementById("cost_per_hour").value;
  let admin_id=localStorage.getItem("id");
  if(user_id && cost_per_hour){
      const options={
      method:'POST',
      headers:{
          'Content-Type':'application/json'
      },
      body:JSON.stringify({user_id,task_id,cost_per_hour,admin_id})
      };
      const request=await fetch('/task/assign',options);
      const response=await request.json();
      console.log(response);
      if(response.success)
      {

        document. location. reload() ;
      }
      else{
        alert(response.message)
      }
    }

    

}
getAllUsers()