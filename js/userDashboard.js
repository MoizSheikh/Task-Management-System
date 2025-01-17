let obj = JSON.parse(localStorage.getItem("userData"));
if (obj) {
  const username = obj.username;
  const email = obj.email;
  const phone = obj.mobile_no;
  const id = obj.id;
  console.log(id);

  document.getElementById("username").innerHTML = username;
  document.getElementById("email").innerHTML = email;
  document.getElementById("phone").innerHTML = phone;
}
