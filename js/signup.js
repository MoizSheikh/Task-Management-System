window.onload=function(){

const myForm=document.getElementById('myForm');
myForm.addEventListener('submit',function(e){
    e.preventDefault();
const username=document.getElementById('username').value;
const password=document.getElementById('password').value;
const password2=document.getElementById('password2').value;
const email=document.getElementById('email').value;
const mobile_no=document.getElementById('mobile_no').value;
const is_admin = adminCheck()
const data={username,password,password2,email,mobile_no,is_admin};
const options={
method:'POST',
headers:{
    'Content-Type':'application/json'
},
body:JSON.stringify(data)
};

       
fetch('/user/signup',options).then(response=>response.json()).then(data=>{
    console.log(data);
    if(data.success){
        // alert(data.message);
    if(data.user.is_admin){

        window.location.href="/login.html";
    }
    else{

        window.location.href="/login.html";
    }
    
}
    else{
        alert(data.message);
    }
});
 });

}

function adminCheck() {
    var checkBox = document.getElementById("myCheck");
    var text = document.getElementById("myCheck");
    var status = document.getElementById("status");
    if (checkBox.checked == true){
        console.log('checked');
        status.innerHTML = "Admin"
        localStorage.setItem("is_admin", true);
        return true
    } else {
        console.log('unchecked');
        status.innerHTML = "User&nbsp;&nbsp;&nbsp;"
        localStorage.setItem("is_admin", false);
        return false
    }
  }