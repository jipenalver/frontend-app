import { doLogout } from "../main";

// Assign Logout Functionality
const btn_logout = document.getElementById("btn_logout");

btn_logout.onclick = doLogout;

// Chat Submit Functionality
const form_chat = document.getElementById("form_chat");

form_chat.onsubmit = async (e) => {
  e.preventDefault();

  alert("sample");
};
