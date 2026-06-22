emailjs.init("A7QwVlvTfntJ73Rew");

document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  emailjs.sendForm("Yservice_mkud5fx", "template_158f1ss", this).then(
    function () {
      alert("Message sent successfully!");
    },
    function (error) {
      alert("Failed to send message. Please try again later.");
    },
  );
});
