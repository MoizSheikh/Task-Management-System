window.onload = function () {
  let id = localStorage.getItem("id");
  function getData() {
    fetch("task/getAll/" + id)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);

        fetch("task/assign/get/" + id)
          .then((response1) => {
            return response1.json();
          })
          .then((data1) => {
            console.log(data1);

            let unassignedTasks = data;
            let assignedTasks = data1.filter((x) => x.is_completed == false);
            let completedTasks = data1.filter((x) => x.is_completed == true);
            console.log(unassignedTasks);

            let AllTasks = document.querySelector("div.allTask");
            let UnAssignedTasks = document.querySelector("div.UnAssignedTasks");
            let AssignedTasks = document.querySelector("div.AssignedTasks");
            let CompletedTasks = document.querySelector("div.CompletedTasks");

            //all
            for (let i = 0; i < data.length; i++) {
              const element = data[i];
              let eachTask = document.createElement("div");
              eachTask.classList.add("eachCard");
              let taskName = document.createElement("div");
              let taskDesc = document.createElement("div");
              let start_date = document.createElement("div");
              let end_date = document.createElement("div");
              taskName.innerHTML = `${element.name}`;
              taskName.setAttribute("class", "nameHeading");
              start_date.innerHTML = `<span>Start Date: </span>${new Date(
                element.start_date
              ).toDateString()}`;
              end_date.innerHTML = `<span>End Date:</span> ${new Date(
                element.end_date
              ).toDateString()}`;
              taskDesc.innerHTML = `<span>Description: </span>${element.description}`;
              eachTask.appendChild(taskName);
              eachTask.appendChild(taskDesc);
              eachTask.appendChild(start_date);

              eachTask.appendChild(end_date);
              AllTasks.appendChild(eachTask);
            }

            //unassigned
            for (let i = 0; i < unassignedTasks.length; i++) {
              const element = unassignedTasks[i];
              let eachTask = document.createElement("div");
              eachTask.classList.add("eachCard");
              let taskName = document.createElement("div");
              let taskDesc = document.createElement("div");
              let start_date = document.createElement("div");

              let end_date = document.createElement("div");
              let assignMemberBtn = document.createElement("button");
              // let removeMemberBtn=document.createElement('button');
              taskName.innerHTML = `${element.name}`;
              start_date.innerHTML = `<span>Start Date: </span>${new Date(
                element.start_date
              ).toDateString()}`;
              end_date.innerHTML = `<span>End Date:</span> ${new Date(
                element.end_date
              ).toDateString()}`;
              taskDesc.innerHTML = `<span>Description: </span>${element.description}`;
              assignMemberBtn.innerHTML = `Assign Members`;
              // removeMemberBtn.innerHTML=`Remove Project`;
              assignMemberBtn.classList.add("assignMemberBtn");
              assignMemberBtn.setAttribute("id", element._id);
              taskName.setAttribute("class", "nameHeading");

              eachTask.appendChild(taskName);
              eachTask.appendChild(taskDesc);
              eachTask.appendChild(start_date);

              eachTask.appendChild(end_date);
              eachTask.appendChild(assignMemberBtn);
              //eachTask.appendChild(removeMemberBtn);
              UnAssignedTasks.appendChild(eachTask);
              // removeMemberBtn.onclick=function(event){
              //     const project_id=element._id;
              //     fetch(`task/${project_id}`,{method:'DELETE'}).then((response2)=>{
              //         return response2.json();
              //     }).then((data2)=>{
              //         if(data2.success){

              //     document. location. reload() ;
              //         }
              //         else{
              //             alert(data2.message);
              //         }
              //         console.log(data2);
              //     })
              // }
            }
            //assigned
            for (let i = 0; i < assignedTasks.length; i++) {
              const element = assignedTasks[i];
              let eachTask = document.createElement("div");
              eachTask.classList.add("eachCard");
              let taskName = document.createElement("div");
              let taskDesc = document.createElement("div");
              let start_date = document.createElement("div");
              let cost = document.createElement("div");
              let end_date = document.createElement("div");
              let removeBtn = document.createElement("button");
              let start_time = document.createElement("div");
              let end_time = document.createElement("div");
              if (element.start_date) {
                start_time.innerHTML = `<span>Start Time: ${new Date(
                  element.start_date
                ).toLocaleTimeString()}</span>`;
              }
              if (element.end_date) {
                end_time.innerHTML = `<span>Start Time: ${new Date(
                  element.end_date
                ).toLocaleTimeString()}</span>`;
              }
              taskName.innerHTML = `${element.task_id.name}`;
              taskName.setAttribute("class", "nameHeading");
              start_date.innerHTML = `<span>Start Date: </span>${new Date(
                element.task_id.start_date
              ).toDateString()}`;
              end_date.innerHTML = `<span>End Date:</span> ${new Date(
                element.task_id.end_date
              ).toDateString()}
        <div><span>Assigned to: </span>${
          element.user_id.username
        }</div><span>Status: ${element.status}</span>`;
              taskDesc.innerHTML = `<span>Description: </span>${element.task_id.description}`;

              removeBtn.innerHTML = `Remove Member`;
              removeBtn.classList.add("removeMemberBtn");
              removeBtn.setAttribute("id", element._id);
              eachTask.appendChild(taskName);
              eachTask.appendChild(taskDesc);
              eachTask.appendChild(cost);
              eachTask.appendChild(start_date);
              eachTask.appendChild(start_time);
              eachTask.appendChild(end_time);
              eachTask.appendChild(end_date);
              eachTask.appendChild(removeBtn);
              AssignedTasks.appendChild(eachTask);

              removeBtn.onclick = function (e) {
                let id = e.target.id;
                fetch(`task/assign/${id}`, { method: "DELETE" })
                  .then((response2) => {
                    return response2.json();
                  })
                  .then((data2) => {
                    if (data2.success) {
                      document.location.reload();
                    } else {
                      alert(data2.message);
                    }
                    console.log(data2);
                  });
              };
            }
            //completed
            for (let i = 0; i < completedTasks.length; i++) {
              const element = completedTasks[i];
              let eachTask = document.createElement("div");
              eachTask.classList.add("eachCard");
              let taskName = document.createElement("div");
              let taskDesc = document.createElement("div");
              let start_date = document.createElement("div");
              let end_date = document.createElement("div");
              let members = document.createElement("div");
              let start_time = document.createElement("div");
              let end_time = document.createElement("div");
              if (element.start_date) {
                start_time.innerHTML = `<span>Start Time: ${new Date(
                  element.start_date
                ).toLocaleTimeString()}</span>`;
              }
              if (element.end_date) {
                end_time.innerHTML = `<span>End Time: ${new Date(
                  element.end_date
                ).toLocaleTimeString()}</span>`;
              }
              taskName.innerHTML = `${element.task_id.name}`;
              taskName.setAttribute("class", "nameHeading");
              taskDesc.innerHTML = `<span>Description: </span>${element.task_id.description}`;
              start_date.innerHTML = `<span>Start Date: </span>${new Date(
                element.task_id.start_date
              ).toDateString()}`;
              end_date.innerHTML = `<span>End Date:</span> ${new Date(
                element.task_id.end_date
              ).toDateString()}`;
              members.innerHTML = `<span>Total Cost: ${parseFloat(
                element.total_cost
              ).toFixed(3)}$</span>
        <div> Completed By ${element.user_id.username}</div><span>Status: ${
                element.status
              }</span>
        `;

              eachTask.appendChild(taskName);
              eachTask.appendChild(taskDesc);
              eachTask.appendChild(start_date);
              eachTask.appendChild(start_time);
              eachTask.appendChild(end_date);

              eachTask.appendChild(end_time);
              eachTask.appendChild(members);

              CompletedTasks.appendChild(eachTask);
            }
          });
      });
  }

  function getAdminData() {
    //fetch('user/admin').then((response)=>{
    //  return response.json();
    //}).then((data)=>{
    const data = JSON.parse(localStorage.getItem("userData"));
    console.log(data);
    document.getElementById("username").innerHTML = ` ${data.username}`;
    document.getElementById("email").innerHTML = ` ${data.email}`;
    document.getElementById("phone").innerHTML = ` ${data.mobile_no}`;
    // })
  }

  getAdminData();
  getData();
};
