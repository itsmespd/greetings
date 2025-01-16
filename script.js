// Random Color Themes
const colorThemes = [
    ['#FF5733', '#C70039', '#FFC300'],
    ['#33FF57', '#39C7C7', '#57C7FF'],
    ['#FF33C7', '#C733FF', '#5733FF']
];

const randomTheme = colorThemes[Math.floor(Math.random() * colorThemes.length)];
document.body.style.background = `linear-gradient(45deg, ${randomTheme[0]}, ${randomTheme[1]}, ${randomTheme[2]})`;

// Confetti Animation
function createConfetti() {
    const container = document.querySelector('.confetti-container');

    for (let i = 0; i < 150; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.top = `-${Math.random() * 20}vh`;
        confetti.style.backgroundColor = randomTheme[Math.floor(Math.random() * randomTheme.length)];
        confetti.style.width = `${Math.random() * 10 + 5}px`;
        confetti.style.height = confetti.style.width;
        confetti.style.animation = `confetti-fall ${Math.random() * 3 + 2}s linear infinite`;
        container.appendChild(confetti);
    }
}

createConfetti();

// Open Gift Function
document.addEventListener('DOMContentLoaded', () => {
    const giftBox = document.querySelector('.gift-box');
    const tapText = document.querySelector('.tap-text');
    const greetingCard = document.querySelector('.greeting-card');
    const giftContainer = document.querySelector('.gift-container');
    const confettiContainer = document.querySelector('.confetti-container');

    function openGift() {
        //Play audio
        enableAudioPlayback();
        // Animate the gift box and text to disappear
        giftBox.style.animation = 'none';
        tapText.style.animation = 'none';
        giftContainer.style.transform = 'translate(-50%, -200%)'; // Move the gift box up
        tapText.style.opacity = '0'; // Fade out the text
        giftBox.style.opacity = '0'; // Fade out the gift box

        // Display the greeting card with a fade-in effect
        greetingCard.style.display = 'block';
        greetingCard.style.opacity = '0';
        confettiContainer.style.display = 'block';
        setTimeout(() => {
            greetingCard.style.transition = 'opacity 2s ease-in-out';
            greetingCard.style.opacity = '1';
        }, 200);
    }

    // Add click event listener to gift box
    giftBox.addEventListener('click', openGift);
});

// Play Happy Birthday Jingle
function enableAudioPlayback() {
    const audio = new Audio('images/happy-birthday.mp3'); // Ensure the audio file is in the "audio" folder
    audio.play()
        .then(() => {
            console.log("Audio playback started.");
        })
        .catch(error => {
            console.warn("Autoplay blocked. Waiting for user interaction.");
        });

    // Remove the listener after audio starts
    document.removeEventListener('click', enableAudioPlayback);
}

document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.carousel-image');
    let currentIndex = 0;

    // Show the first image
    images[currentIndex].classList.add('active');

    // Function to change images every 3 seconds
    function changeImage() {
        // Remove the 'active' class from the current image
        images[currentIndex].classList.remove('active');

        // Update the index to the next image
        currentIndex = (currentIndex + 1) % images.length;

        // Add the 'active' class to the new image
        images[currentIndex].classList.add('active');
    }

    // Change image every 3 seconds
    setInterval(changeImage, 3000); // Adjust the time as necessary
});

// Scroll Down click event
const scrollDownText = document.querySelector('.scroll-down');
scrollDownText.addEventListener('click', () => {
    document.querySelector('.facts-section').scrollIntoView({ behavior: 'smooth' });
    fetchRandomFact();  // Fetch the random fact when clicked
});

// Fetch Random Fact about January 21st from API
function fetchRandomFact() {
    const factText = document.getElementById('fact-text');
    const factsSection = document.querySelector('.facts-section');

    // Define the three API endpoints
    const apiEndpoints = [
        'http://numbersapi.com/21/date?json',
        'http://numbersapi.com/21/math?json',
        'http://numbersapi.com/21/trivia?json'
    ];

    // Randomly select one endpoint
    const randomEndpoint = apiEndpoints[Math.floor(Math.random() * apiEndpoints.length)];

    fetch(randomEndpoint)
        .then(response => response.json())
        .then(data => {
            const fact = data.text;
            factText.textContent = fact;
            factsSection.style.display = 'block'; // Show the facts section after data is fetched
        })
        .catch(error => {
            factText.textContent = 'Sorry, we couldn\'t fetch a fact at this time.';
            factsSection.style.display = 'block'; // Show the facts section even if the fetch fails
        });
}
