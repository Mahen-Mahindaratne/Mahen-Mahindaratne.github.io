const quoteText = document.querySelector(".quote"),
      authorName = document.querySelector(".name"),
      replayBtn = document.querySelector(".replay-btn");

const quotes = [
    {
        content: "If you were a Roman child, born to an equestrian or plebeian family, you would typically join the ranks of the Roman military at the age of seventeen."
    },
    {
        content: "From there, you would be marched from battle to battle, sent wherever Rome needed you."
    },
    {
        content: "If you survived the grueling campaigns and reached the ripe old age of thirty or beyond,"
    },
    {
        content: "Still whole in body, and mind."
    },
    {
        content: "You just may retire as a General."
    },
    {
        content: "You would be rewarded with a plot of land—hopefully not too far from Rome."
    },
    {
        content: "There, you would build a modest villa, and with your beloved who prayed for your safe return each day and night,"
    },
    {
        content: "You would finally live the life humans beings were meant to live."
    },
    {
        content: "A life shaped by courage, duty, sacrifice, and honor."
    },
    {
        content: "Knowing you fought for the good of humanity."
    },
    {
        content: "To protect what is worth protecting in a world that will always need men like you to face the wars others cannot."
    },
    {
        content: "Pax Romana"
    }
];

let currentIndex = 0; // Start from the first quote

// Function to show the next quote
function showNextQuote() {
    // Hide the current quote and author
    quoteText.classList.remove("visible");

    setTimeout(() => {
        // Update quote and author
        const quote = quotes[currentIndex];
        quoteText.innerText = quote.content;

        // Make quote and author visible again
        quoteText.classList.add("visible");

        // Check if we're on the last quote
        if (currentIndex === quotes.length - 1) {
            replayBtn.style.display = "block"; // Show the replay button after the last quote
        }

        // Increment the index, move to the next quote
        currentIndex++;
    }, 500); // Transition time to match fade-out duration
}

// Display the first quote immediately
setTimeout(() => {
    const quote = quotes[currentIndex];
    quoteText.innerText = quote.content;
    quoteText.classList.add("visible");

    // Move to the next quote
    currentIndex++;
}, 100);

// Set interval to show next quote every 10 seconds
const quoteInterval = setInterval(() => {
    if (currentIndex < quotes.length) {
        showNextQuote(); // Show the next quote
    } else {
        clearInterval(quoteInterval); // Stop the interval after the last quote
    }
}, 10000);

// Replay button event listener
replayBtn.addEventListener("click", () => {
    currentIndex = 0; // Reset to the first quote
    replayBtn.style.display = "none"; // Hide the replay button
    showNextQuote(); // Show the first quote again

    // Restart the interval after the button click
    setInterval(() => {
        if (currentIndex < quotes.length) {
            showNextQuote(); // Show the next quote
        } else {
            clearInterval(quoteInterval); // Stop the interval after the last quote
        }
    }, 10000);
});
