window.onload = function () {
    console.log("inside")
  const myForm = document.getElementById("myForm");
  console.log('myForm: ', myForm);
  myForm.addEventListener("submit", function (e) {
    console.log("submitting");
    e.preventDefault();
    const username = document.getElementById("username").value;
    console.log('username: ', username);
    const password = document.getElementById("password").value;
    console.log('password: ', password);
    const password2 = document.getElementById("password2").value;
    console.log('password2: ', password2);
    const email = document.getElementById("email").value;
    console.log('email: ', email);
    const mobile_no = document.getElementById("mobile_no").value;
    console.log('mobile_no: ', mobile_no);
    const is_admin = adminCheck();
    console.log('is_admin: ', is_admin);
    const data = { username, password, password2, email, mobile_no, is_admin };
    console.log('data: ', data);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    console.log("inside2");

    fetch("/user/signup", options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          // alert(data.message);
          if (data.user.is_admin) {
            window.location.href = "/login.html";
          } else {
            window.location.href = "/login.html";
          }
        } else {
          alert(data.message);
        }
      }).catch(e=>{
        console.log(e)
      })
  });
};

function adminCheck() {
  var checkBox = document.getElementById("myCheck");
  var text = document.getElementById("myCheck");
  var status = document.getElementById("status");
  if (checkBox.checked == true) {
    console.log("checked");
    status.innerHTML = "Admin";
    localStorage.setItem("is_admin", true);
    return true;
  } else {
    console.log("unchecked");
    status.innerHTML = "User&nbsp;&nbsp;&nbsp;";
    localStorage.setItem("is_admin", false);
    return false;
  }
}
