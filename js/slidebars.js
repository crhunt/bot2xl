function openSideNav() {
  closeBottomNav();
  document.getElementById("sideNav").style.width = "500px";
  document.getElementById("sideNavMain").style.width = "500px";
  document.getElementById("openSideNav").style.width = "0px";
  document.getElementById("main").style.marginRight = "500px";
}

function closeSideNav() {
  document.getElementById("sideNav").style.width = "50px";
  document.getElementById("sideNavMain").style.width = "0px";
  document.getElementById("openSideNav").style.width = "50px";
  document.getElementById("main").style.marginRight= "50px";
}

function openBottomNav() {
  closeSideNav();
  document.getElementById("bottomNav").style.height = "500px";
  document.getElementById("bottomNavMain").style.height = "450px";
  document.getElementById("main").style.marginBottom = "500px";
  document.getElementById("bottomNavUp").style.display = "none";
  document.getElementById("bottomNavDown").style.display = "table";
  //document.getElementById("bottomFrame").contentDocument.location.reload(true);
  //var frameElement = document.getElementById("bottomFrame");
  //frameElement.contentWindow.location.href = frameElement.src;
}

function closeBottomNav() {
  document.getElementById("bottomNav").style.height = "50px";
  document.getElementById("bottomNavMain").style.height = "0px";
  document.getElementById("main").style.marginBottom= "50px";
  document.getElementById("bottomNavUp").style.display = "table";
  document.getElementById("bottomNavDown").style.display = "none";
}

function closeAllNavs() {
  closeSideNav();
  closeBottomNav();
}
