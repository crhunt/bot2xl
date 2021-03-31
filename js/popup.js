function openPopUp(popup_id) {
    document.getElementById(popup_id).style.transform = "scale(1)";
    //document.getElementById(popup_id).style.visibility = "visible";
    //document.getElementById(popup_id).style.width = "80vw";
    //document.getElementById(popup_id).style.height = "80vh";
  }
  
function closePopUp(popup_id) {
    document.getElementById(popup_id).style.transform = "scale(0)";
    //document.getElementById(popup_id).style.visibility = "hidden";
    //document.getElementById(popup_id).style.width = "0vw";
    //document.getElementById(popup_id).style.height = "0vh";
}