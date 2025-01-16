
    const myForm=document.getElementById('myForm');
    myForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const email=document.getElementById('email').value;
    const password=document.getElementById('password').value;
    const data={email,password};
    const options={
    method:'POST',
    headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify(data)
    };


    fetch('/user/login',options).then(response=>response.json()).then(data=>{
        console.log(data);
        if(data.success){
        localStorage.setItem("id", data.userData._id);
        localStorage.setItem("is_admin", data.userData.is_admin);
        localStorage.setItem("userData",JSON.stringify(data.userData));
        if(data.userData.is_admin){

            window.location.href="/AdminDashboard.html";
        }
        else{

            window.location.href="/UserDashboard.html";
        }
        }
        else{
            alert(data.message)
        }
    });
  
     });

     
    
    