import { doLogout, openai, supabase } from "../main";

// Load Images from assets to Show it in Mobile
import imgYou from "../../assets/imgs/img_you.png";
import imgMime from "../../assets/imgs/img_junjun.png";

// Assign Logout Functionality
const btn_logout = document.getElementById("btn_logout");

btn_logout.onclick = doLogout;

// Load Datas or Chatbox
getDatas();

// Array Storage for OpenAI, This is optional
const ai_array = [];

// Chat Submit Functionality
const form_chat = document.getElementById("form_chat");

form_chat.onsubmit = async (e) => {
  e.preventDefault();

  // Disable Button
  document.querySelector("#form_chat button").disabled = true;

  // Get All values from input, select, textarea under form tag
  const formData = new FormData(form_chat);

  // OpenAI Api
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are Meme, a chatbot that reluctantly answers questions with sarcastic responses.",
      },
      ...ai_array, // Optional; So that it can remember previous chats by passing the array; you can comment if you dont like
      { role: "user", content: formData.get("message") },
    ],
    model: "gpt-3.5-turbo",
  });

  const ai_response = completion.choices[0].message;

  // Check if their is OpenAi response
  if (ai_response) {
    const { data, error } = await supabase
      .from("message")
      .insert([
        { message: formData.get("message"), response: ai_response.content },
      ])
      .select();

    if (error == null) {
      // Reload Chatbox
      getDatas();
    } else {
      errorNotification(
        "Something wrong happened. Cannot access database.",
        15
      );
      console.log(error);
    }
  } else {
    errorNotification("Something wrong happened. Cannot access OpenAI.", 15);
  }

  // Reset Form
  form_chat.reset();

  // Enable Submit Button
  document.querySelector("#form_chat button").disabled = false;
};

// Load Chatbox Functionality
async function getDatas(keyword = "") {
  // Get all rows
  let { data: message, error } = await supabase.from("message").select("*");

  // Temporary storage for html elements and each items
  let container = "";
  let is_today = false;
  // Get Each item and interpolate with html elements
  message.forEach((row) => {
    // Date Created
    let created_at = new Date(row.created_at);

    // Set Time or Date based on Created At
    let date = created_at.toLocaleString("en-US", { timeZone: "Asia/Manila" });
    let time = created_at.toLocaleTimeString("en-US", {
      timeZone: "Asia/Manila",
    });

    // Check the created date if it is today's date; Oprional code, you can comment this
    if (created_at.getDate() == new Date().getDate() && !is_today) {
      container += `<div class="divider d-flex align-items-center mb-4">
                        <p class="text-center mx-3 mb-0">Today</p>
                </div>`;
      is_today = true;
    }

    // Get Each item and interpolate with html elements
    container += `<div class="d-flex flex-row justify-content-end">
                      <div>
                          <p class="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                              ${row.message}
                          </p>
                          <p class="small me-3 mb-3 rounded-3 text-muted d-flex justify-content-end">
                              ${is_today ? time : date}
                          </p>
                      </div>
                      <img class="img-junjun" src="${imgYou}" alt="">
                  </div>

                  <div class="d-flex flex-row justify-content-start mb-4 pt-1">
                      <img class="img-you" src="${imgMime}" alt="">
                      <div>
                          <p class="small p-2 ms-3 mb-1 rounded-3 theme-bg-surface">
                              ${row.response} 
                          </p>
                          <p class="small ms-3 mb-3 rounded-3 text-muted">
                              ${is_today ? time : date}
                          </p>
                      </div>
                  </div>`;

    // Optional; So that it can remember previous chats by pushing to array
    ai_array.push({ role: "user", content: row.message });
    ai_array.push({ role: "assistant", content: row.response });
  });

  // Assign container to the html element to be displayed; scroll to lowest
  const div_convo = document.getElementById("get_convo");
  div_convo.innerHTML = container;
  div_convo.scrollTo(0, div_convo.scrollHeight);
}
