const faqsJson = [
  {
    question: "Why XHacks?",
    answer: 
      "The past is more than just memory. Without it, there is no foundation for the future. At XHacks 2026, we invite hackers to bridge the gap between the past, present, and future. Whether you are rebuilding old technology with modern stacks, reviving lost stories, or creating retro-futuristic interfaces, this is your chance to connect with history and grow further to build the future. We will travel back in time to draw inspiration from our roots and honour the past through XHacks."
  },
  {
    question: "Where is the venue?",
    answer:
      "XHacks will take place in the SFU’s state-of-the-art Engineering Building, located in Surrey Central. Opened in 2019, this building is home to SFU’s Mechatronics Systems Engineering, Sustainable Energy Engineering, and Software Systems programs and has the best in campus design SFU has to offer with its lecture theaters, labs, and work spaces.",
  },
  {
    question: "What is a hackathon?",
    answer:
      "A hackathon is an event where teams of 2-4 develop (or “hack”) a project in a short period of time. Hackathons are an opportunity to experiment with new tools, or try new ideas. They are also a great change to make lasting connections with fellow students, mentors, and industry professionals.",
  },
  {
    question: "How can I best participate with no hackathon experience?",
    answer:
      "You are not expected to have any experience to participate; everyone starts somewhere! The goal of the event is to learn something new; don’t worry if the final result is not particularly polished. Mentors will be available to help you work through questions that you may have, and we encourage you and your teammates to teach each other as well. Just remember, the primary goal of a hackathon is to learn!",
  },
  {
    question: "How should the theme be integrated into my project?",
    answer:
      "The theme can be incorporated into your project however you see fit! “The Past” can be anything from recent memories to ancient history. You can use it to drive your project functionality, such as a digital photobooth or an interactive museum, or use it to inspire your design like a throwback from the 90s. It is fully up to you how you interpret the theme into your work. Think of the theme as simply a prompt to help you get started. Use the past as a foundation to build something new!"
    },
  {
    question: "How can I register my team?",
    answer:
      "If you already have a team in mind, each teammate must register individually for SystemsHacks. You do not have to notify the organizers of your team before the event, but projects must be submitted by a group of 2-4 people.",
  },
  {
    question: "What if I don’t have a team?",
    answer:
      "You certainly aren’t the only one, many first-time hackers find themselves in the same situation! On the morning of the event, there will be a team formation event. We will ask all participants without a team to gather somewhere, where you can all form teams on the spot to ensure everyone can participate.",
  },
  {
    question: "What can mentors help me with?",
    answer:
      "Mentors can answer questions and help fix any technical issues that you may have, but they may not directly contribute to your project. They can also help you elaborate your idea in the early stages of the event, so don’t hesitate to ask if they have time to chat about your concept!",
  },
];

// Create the image element for the chevron
var chevronImg = document.createElement("img");
chevronImg.setAttribute("src", "./assets/images/icons/chevron-down.svg");
chevronImg.setAttribute("alt", "Chevron");
chevronImg.width = 20;

// generates an html element that contains one faq 
// this includes an icon, then the question, and the answer
const toHtml = (faq, index) => {
  // Create the checkbox input
  var checkboxInput = document.createElement("input");
  checkboxInput.setAttribute("type", "checkbox");
  checkboxInput.setAttribute("id", `faq-${index}`);

  // Create the label for the checkbox
  var label = document.createElement("label");
  label.setAttribute("for", `faq-${index}`);

  // Create the text content for the label
  var labelText = document.createTextNode(faq.question);

  // Append the text and image to the label
  label.appendChild(labelText);
  label.appendChild(chevronImg.cloneNode());

  // Create the paragraph with the content
  var contentParagraph = document.createElement("p");
  contentParagraph.classList.add("content");
  contentParagraph.textContent = faq.answer;

  // Creating a container for the candle icons
  var faqIconContainer = document.createElement("div");
  faqIconContainer.classList.add("faq-icon-container");

  // Create a candle off icon which is visible by default
  var faqIconOff = document.createElement("img");
  faqIconOff.setAttribute("src", "./assets/images/faq_candle_off.svg");
  faqIconOff.setAttribute("alt", "FAQ Icon Candle Off");
  faqIconOff.classList.add("faq-candle-icon", "candle-off");

  // Create a candle on icon which is visible on checkbox expansion
  var faqIconOn = document.createElement("img");
  faqIconOn.setAttribute("src", "./assets/images/faq_candle_on.svg");
  faqIconOn.setAttribute("alt", "FAQ Icon Candle On");
  faqIconOn.classList.add("faq-candle-icon", "candle-on");
  faqIconOn.style.display = "none";

  faqIconContainer.appendChild(faqIconOff);
  faqIconContainer.appendChild(faqIconOn);

  checkboxInput.addEventListener("change", function() {
    if(this.checked){
      faqIconOff.style.display = "none";
      faqIconOn.style.display = "block";
    }else{
      faqIconOff.style.display = "block";
      faqIconOn.style.display = "none";
    }
  });

  // Append all elements to the main container
  var faqItem = document.createElement("div");
  faqItem.classList.add("faq-item");

  faqItem.appendChild(checkboxInput);
  faqItem.appendChild(label);
  faqItem.appendChild(contentParagraph);
  faqItem.appendChild(faqIconContainer);

  return faqItem;
};

const faqHtmlList = faqsJson.map((item, index) => toHtml(item, index));
const faqsList = document.querySelector("#faq-list");

faqHtmlList.forEach((faqItem) => {
  faqsList.appendChild(faqItem);
});