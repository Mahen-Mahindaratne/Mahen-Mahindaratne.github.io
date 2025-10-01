const quoteText = document.querySelector(".quote"),
      authorName = document.querySelector(".name");

const quotes = [
  {
    content: "Evil is not a substance created by God, but a privation of good—the absence of what should be present. Yet God works all things for good for those who love Him (Romans 8:28).",
    author: "On Evil and God’s Goodness"
  },
  {
    content: "The new covenant is God's promise through Christ's blood: 'This cup is the new covenant in my blood, poured out for you' (Luke 22:20).",
    author: "On the New and Eternal Covenant"
  },
  {
    content: "Salvation is by grace through faith, not by works (Ephesians 2:8-9). Whoever comes to Christ will never be driven away (John 6:37).",
    author: "On Salvation and Forgiveness"
  },
  {
    content: "To forgive means to release the debt, not count sin against another, removing it 'as far as the east is from the west' (Psalm 103:12).",
    author: "On Forgiveness"
  },
  {
    content: "Our Lord said: 'Judge not, that you be not judged' (Matthew 7:1). For man sees only appearances, but God sees the heart (1 Samuel 16:7).",
    author: "On Judgement"
  },
  {
    content: "Love 'keeps no record of wrongs' (1 Corinthians 13:5). Though memory remains, forgiveness chooses not to repay evil with evil.",
    author: "On Anger and Forgiveness"
  },
  {
    content: "Wealth itself is not evil, but the love of money is the root of all evil (1 Timothy 6:10). The faithful rich are called to hold riches lightly and serve God, not mammon.",
    author: "On Wealth and the Kingdom of God"
  }
];

let currentIndex = 0;

function showNextQuote() {
  quoteText.classList.remove("visible");
  authorName.classList.remove("visible");

  setTimeout(() => {
    const quote = quotes[currentIndex];

    quoteText.innerText = quote.content;
    authorName.innerText = quote.author;

    void quoteText.offsetWidth; // force reflow
    quoteText.classList.add("visible");
    authorName.classList.add("visible");

    // move to next index, reset if at end
    currentIndex = (currentIndex + 1) % quotes.length;
  }, 500);
}

// Initial display
setTimeout(() => {
  const quote = quotes[currentIndex];
  quoteText.innerText = quote.content;
  authorName.innerText = quote.author;

  quoteText.classList.add("visible");
  authorName.classList.add("visible");

  currentIndex = (currentIndex + 1) % quotes.length;
}, 100);

// Rotate every 25 seconds
setInterval(showNextQuote, 25000);


