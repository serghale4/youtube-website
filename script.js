// YouTube API Integration
const API_KEY = "AIzaSyDPrAV0m4r2lWVGWzTpG1xJAPrRqXxc14Q";
const CHANNEL_ID = "UCJggSI3mqsxis-lFxH4z9gw";

// Fetch videos from YouTube API
async function fetchVideos() {
    try {
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=6`
        );
        const data = await response.json();
        displayVideos(data.items);
    } catch (error) {
        console.error("Error fetching videos:", error);
        document.getElementById("video-grid").innerHTML = 
            "<p>Couldn't load videos. Please check back later!</p>";
    }
}

// Display videos on the page
function displayVideos(videos) {
    const videoGrid = document.getElementById("video-grid");
    videoGrid.innerHTML = "";

    videos.forEach((video) => {
        if (video.id.kind === "youtube#video") {
            const videoCard = document.createElement("div");
            videoCard.className = "video-card";
            videoCard.innerHTML = `
                <iframe 
                    src="https://www.youtube.com/embed/${video.id.videoId}" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe>
                <div class="video-info">
                    <h3>${video.snippet.title}</h3>
                    <p>${new Date(video.snippet.publishedAt).toLocaleDateString()}</p>
                </div>
            `;
            videoGrid.appendChild(videoCard);
        }
    });
}

// Joke Generator
const jokes = [
    "Why don't scientists trust atoms? Because they make up everything!",
    "Did you hear about the mathematician who's afraid of negative numbers? He'll stop at nothing to avoid them.",
    "Why don't skeletons fight each other? They don't have the guts.",
    "I told my wife she was drawing her eyebrows too high. She looked surprised.",
    "What do you call a fake noodle? An impasta!",
    "How do you organize a space party? You planet!",
    "Why did the scarecrow win an award? Because he was outstanding in his field!",
    "I'm reading a book about anti-gravity. It's impossible to put down!",
    "Did you hear about the claustrophobic astronaut? He just needed a little space.",
    "Why don't eggs tell jokes? They'd crack each other up."
];

function generateJoke() {
    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
    document.getElementById("joke-text").textContent = randomJoke;
}

// Mobile Menu Toggle
function toggleMenu() {
    const navLinks = document.querySelector(".nav-links");
    navLinks.classList.toggle("active");
    
    // Animate hamburger icon
    const bars = document.querySelectorAll(".bar");
    if (navLinks.classList.contains("active")) {
        bars[0].style.transform = "rotate(45deg) translate(5px, 5px)";
        bars[1].style.opacity = "0";
        bars[2].style.transform = "rotate(-45deg) translate(5px, -5px)";
    } else {
        bars.forEach(bar => {
            bar.style.transform = "";
            bar.style.opacity = "";
        });
    }
}

// Initialize when page loads
document.addEventListener("DOMContentLoaded", () => {
    fetchVideos();
    
    // Close mobile menu when clicking a link
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            if (window.innerWidth <= 768) {
                toggleMenu();
            }
        });
    });
});