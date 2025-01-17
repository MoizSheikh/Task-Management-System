let outbtn = document.getElementsByClassName("logout-btn");
for (i = 0; i < outbtn.length; i++) {
  outbtn[i].addEventListener("click", (e) => {
    console.log("clickeds");
    localStorage.removeItem("id");
    localStorage.removeItem("userData");
    localStorage.removeItem("is_admin");
    localStorage.removeItem("firstRender");

    window.location.href = "/login.html";
  });
}
