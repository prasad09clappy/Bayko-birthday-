const messages = [
  "Close your eyes... ❤️",
  "Take a deep breath... ✨",
  "Today is not just another day...",
  "Someone made something special just for you... 💖",
  "Ready to begin your little journey? 🌸"
];

const typewriter = document.getElementById("typewriter");
const continueBtn = document.getElementById("continueBtn");

let msgIndex = 0;
let charIndex = 0;

function typeEffect() {

  if (msgIndex >= messages.length) {
    continueBtn.classList.add("fadeIn");
    return;
  }

  if (charIndex < messages[msgIndex].length) {

    typewriter.innerHTML += messages[msgIndex].charAt(charIndex);
    charIndex++;

    setTimeout(typeEffect, 60);

  } else {

    setTimeout(() => {
      typewriter.innerHTML = "";
      charIndex = 0;
      msgIndex++;
      typeEffect();
    }, 1700);

  }

}

typeEffect();

continueBtn.onclick = function () {

    document.getElementById("intro").style.display = "none";

    document.getElementById("loginPage").style.display = "flex";

};


function checkPassword() {

    const pass = document.getElementById("password").value;

    if (pass === "2409") {
        const music = document.getElementById("bgMusic");
music.play();

        // Hide password page
        document.querySelector(".loginBox").style.display = "none";

        // Show welcome page
        document.getElementById("welcomePage").style.display = "flex";

        const text = `Today isn't just another day...

It's the day someone amazing came into this world. ❤️

I made this little world just for you.

I hope every smile, every memory and every surprise here makes your day unforgettable.

Welcome to your Memory World. ✨`;

        let i = 0;
        const message = document.getElementById("welcomeMessage");

        function typing() {
            if (i < text.length) {
                message.innerHTML += text.charAt(i);
                i++;
                setTimeout(typing, 35);
            } else {
                document.getElementById("journeyBtn").style.display = "inline-block";
            }
        }

        message.innerHTML = "";
        typing();

    } else {

        document.getElementById("error").innerHTML = "❌ Wrong Password";

    }
}
document.getElementById("unlockBtn").onclick = checkPassword;

// ================= GIFT PAGE =================

// Welcome → Gift
document.getElementById("journeyBtn").onclick = function () {

    document.getElementById("welcomePage").style.display = "none";
    document.getElementById("giftPage").style.display = "flex";

};

// Gift Open
document.getElementById("giftBox").onclick = function () {

    this.innerHTML = "🎉";

    const text = "Every gift can be wrapped in paper... 💖\n\nBut this one is wrapped with beautiful memories. ❤️";

    let i = 0;

    const msg = document.getElementById("giftMessage");
    msg.innerHTML = "";

    function typeGift() {

        if (i < text.length) {

            msg.innerHTML += text.charAt(i);
            i++;

            setTimeout(typeGift, 35);

        } else {

            document.getElementById("cakeBtn").style.display = "inline-block";

        }

    }

    typeGift();

};
// ================= CAKE PAGE =================

// Gift → Cake
document.getElementById("cakeBtn").onclick = function () {

    document.getElementById("giftPage").style.display = "none";
    document.getElementById("cakePage").style.display = "flex";

};

// Light Candle
document.getElementById("lightBtn").onclick = function () {

    const msg = document.getElementById("cakeMessage");

    msg.innerHTML = "🕯️ The candle is glowing... Close your eyes and make a beautiful wish! ❤️✨";

    document.getElementById("cake").innerHTML = "🕯️🎂";

    document.getElementById("cutCakeBtn").style.display = "inline-block";

};

// Cut Cake
document.getElementById("cutCakeBtn").onclick = function () {

    document.getElementById("cake").innerHTML = "🍰";

    document.getElementById("cakeMessage").innerHTML =
    "🎉 Happy Birthday Madam Ji! ❤️<br>May all your dreams come true! ✨";

    setTimeout(function () {

        document.getElementById("cakePage").style.display = "none";
        document.getElementById("memoryPage").style.display = "flex";

        startMemorySphere();

    }, 2500);

};
