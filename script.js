let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 0.5;
    let voices = speechSynthesis.getVoices();
    if (voices.length > 0) {
        text_speak.voice = voices.length > 1 ? voices[1] : voices[0];
    }
    window.speechSynthesis.speak(text_speak);
}

function wishme() {
    let day = new Date();
    let hours = day.getHours();
    if (hours >= 0 && hours < 12) {
        speak("Good Morning Sir");
    } else if (hours >= 12 && hours < 18) {
        speak("Good Afternoon Sir");
    } else {
        speak("Good Evening Sir");
    }
}

window.addEventListener("load", () => {
    wishme();
});

let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript;
    takeCommand(transcript.toLowerCase());
    
};

recognition.onerror = (event) => {
    console.error("Speech recognition error detected: " + event.error);
    btn.style.display = "flex";
    voice.style.display = "none";
};

btn.addEventListener("click", () => {
    recognition.start();
    btn.style.display = "none";
    voice.style.display = "block";
});

function takeCommand(message) {
    btn.style.display = "flex";
    voice.style.display = "none";

    if (message.includes("hello jarvis") || message.includes("hey") || message.includes("hi")) {
        speak("Hello Sir, How can I help you?");
    } else if (message.includes("who are you") || message.includes("hu r u")) {
        speak("I am Jarvis, your virtual assistant, created by Gobinda GSK.");
    } else if (message.includes("open youtube")) {
        speak("Opening YouTube");
        window.open("https://www.youtube.com/");
    } else if (message.includes("open google")) {
        speak("Opening Google");
        window.open("https://www.google.com/");
    } else if (message.includes("open facebook")) {
        speak("Opening Facebook");
        window.open("https://www.facebook.com");
    } else if (message.includes("open instagram")) {
        speak("Opening Instagram");
        window.open("https://www.instagram.com/");
    } else if (message.includes("open twitter")) {
        speak("Opening Twitter");
        window.open("https://www.twitter.com/");
    } else if (message.includes("open whatsapp")) {
        speak("Opening WhatsApp");
        window.open("https://web.whatsapp.com/");
    } else if (message.includes("time")) {
        let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        speak(time);
    } else if (message.includes("date")) {
        let date = new Date().toLocaleString(undefined, { day: "numeric", month: "short" });
        speak(date);
    } else {
        speak(`This is what I found on the internet regarding ${message}`);
        window.open(`https://www.google.com/search?q=${message.replace("jarvis", "")}`);
    }
}
