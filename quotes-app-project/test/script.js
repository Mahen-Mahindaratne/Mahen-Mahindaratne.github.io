// Global variables
let currentTheme = 'roman';
let currentQuotes = [];
let autoInterval = null;
let isAutoEnabled = true;

// DOM elements
const quoteText = document.getElementById('quoteText');
const quoteAuthor = document.getElementById('quoteAuthor');
const quoteGame = document.getElementById('quoteGame');
const romanThemeBtn = document.getElementById('romanTheme');
const tombRaiderThemeBtn = document.getElementById('tombRaiderTheme');
const unchartedThemeBtn = document.getElementById('unchartedTheme');
const newQuoteBtn = document.getElementById('newQuote');
const autoToggleBtn = document.getElementById('autoToggle');
const totalQuotesSpan = document.getElementById('totalQuotes');
const currentThemeSpan = document.getElementById('currentTheme');
const loadingOverlay = document.getElementById('loadingOverlay');

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    loadQuotes('roman');
    setupEventListeners();
});

// Set up event listeners
function setupEventListeners() {
    romanThemeBtn.addEventListener('click', () => switchTheme('roman'));
    tombRaiderThemeBtn.addEventListener('click', () => switchTheme('tomb-raider'));
    unchartedThemeBtn.addEventListener('click', () => switchTheme('uncharted'));
    newQuoteBtn.addEventListener('click', displayRandomQuote);
    autoToggleBtn.addEventListener('click', toggleAutoQuote);
}

// Load quotes from JSON file
async function loadQuotes(theme) {
    try {
        showLoading();
        disableButtons();
        
        const response = await fetch(`data/${theme}-quotes.json`);
        
        if (!response.ok) {
            throw new Error(`Failed to load ${theme} quotes: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!Array.isArray(data) || data.length === 0) {
            throw new Error(`No quotes found in ${theme} dataset`);
        }
        
        currentQuotes = data;
        currentTheme = theme;
        
        updateUI();
        displayRandomQuote();
        hideLoading();
        enableButtons();
        
        // Start auto quote rotation if enabled
        if (isAutoEnabled && !autoInterval) {
            startAutoQuote();
        }
        
    } catch (error) {
        console.error('Error loading quotes:', error);
        showError(`Failed to load ${theme} quotes. Using fallback data.`);
        loadFallbackQuotes(theme);
    }
}

// Fallback quotes in case JSON files are not available
function loadFallbackQuotes(theme) {
    const fallbackQuotes = {
        'roman': [
            { content: "Si vis pacem, para bellum.", author: "Vegetius" },
            { content: "Fortis Fortuna Adiuvat.", author: "Virgil" }
        ],
        'tomb-raider': [
            { content: "I'd finally set out to make my mark; to find adventure. But instead, adventure found me.", author: "Lara Croft", game: "Tomb Raider (2013)" },
            { content: "What makes someone reach beyond the boundaries of human experience... to face the unknown? As children, we question the world around us. We learn, we accept, and gradually, we lose our capacity for wonder. But some do not—the explorers, the seekers of truth. It is these pioneers who define the future of mankind", author: "Lord Richard James Croft", game: "Rise of the Tomb Raider" }
        ],
        'uncharted': [
            { content: "Sic parvis magna. - Greatness from small beginnings.", author: "Sir Francis Drake", game: "UNCHARTED: The Nathan Drake Collection" },
            { content: "We don't get to choose how we start in the life. Real 'greatness' is what you do with the hand you're dealt.", author: "Victor Sullivan", game: "Unchareted 3: Drake's Deception" }
        ]
    };
    
    currentQuotes = fallbackQuotes[theme] || fallbackQuotes.roman;
    currentTheme = theme;
    
    updateUI();
    displayRandomQuote();
    hideLoading();
    enableButtons();
    
    if (isAutoEnabled && !autoInterval) {
        startAutoQuote();
    }
}

// Switch between three themes
function switchTheme(theme) {
    if (theme === currentTheme) return;
    
    // Update active button
    romanThemeBtn.classList.remove('active');
    tombRaiderThemeBtn.classList.remove('active');
    unchartedThemeBtn.classList.remove('active');
    
    if (theme === 'roman') {
        romanThemeBtn.classList.add('active');
        document.body.className = 'theme-roman';
    } else if (theme === 'tomb-raider') {
        tombRaiderThemeBtn.classList.add('active');
        document.body.className = 'theme-tomb-raider';
    } else if (theme === 'uncharted') {
        unchartedThemeBtn.classList.add('active');
        document.body.className = 'theme-uncharted';
    }
    
    // Stop auto rotation during theme switch
    if (autoInterval) {
        clearInterval(autoInterval);
        autoInterval = null;
    }
    
    // Load new quotes
    loadQuotes(theme);
}

// Display a random quote
function displayRandomQuote() {
    if (currentQuotes.length === 0) {
        quoteText.textContent = "No quotes available.";
        quoteAuthor.textContent = "";
        quoteGame.textContent = "";
        return;
    }
    
    const randomIndex = Math.floor(Math.random() * currentQuotes.length);
    const quote = currentQuotes[randomIndex];
    
    // Add fade animation
    quoteText.classList.remove('fade-in');
    quoteAuthor.classList.remove('fade-in');
    quoteGame.classList.remove('fade-in');
    
    setTimeout(() => {
        quoteText.textContent = quote.content;
        quoteAuthor.textContent = `— ${quote.author}`;
        
        if (quote.game) {
            quoteGame.textContent = quote.game;
        } else {
            quoteGame.textContent = "";
        }
        
        quoteText.classList.add('fade-in');
        quoteAuthor.classList.add('fade-in');
        quoteGame.classList.add('fade-in');
    }, 300);
}

// Start automatic quote rotation
function startAutoQuote() {
    if (autoInterval) {
        clearInterval(autoInterval);
    }
    
    autoInterval = setInterval(displayRandomQuote, 8000);
    autoToggleBtn.innerHTML = '⏸️ Pause Auto';
    isAutoEnabled = true;
}

// Toggle automatic quote rotation
function toggleAutoQuote() {
    if (isAutoEnabled) {
        // Pause auto rotation
        if (autoInterval) {
            clearInterval(autoInterval);
            autoInterval = null;
        }
        autoToggleBtn.innerHTML = '▶️ Resume Auto';
        isAutoEnabled = false;
    } else {
        // Resume auto rotation
        startAutoQuote();
    }
}

// Update UI elements
function updateUI() {
    totalQuotesSpan.textContent = currentQuotes.length;
    
    // Update theme display text
    if (currentTheme === 'roman') {
        currentThemeSpan.textContent = 'Roman';
    } else if (currentTheme === 'tomb-raider') {
        currentThemeSpan.textContent = 'Tomb Raider';
    } else if (currentTheme === 'uncharted') {
        currentThemeSpan.textContent = 'Uncharted';
    }
}

// Show loading state
function showLoading() {
    loadingOverlay.style.display = 'flex';
    quoteText.style.opacity = '0.5';
    quoteAuthor.style.opacity = '0.5';
    quoteGame.style.opacity = '0.5';
}

// Hide loading state
function hideLoading() {
    loadingOverlay.style.display = 'none';
    quoteText.style.opacity = '1';
    quoteAuthor.style.opacity = '1';
    quoteGame.style.opacity = '1';
}

// Disable buttons during loading
function disableButtons() {
    romanThemeBtn.disabled = true;
    tombRaiderThemeBtn.disabled = true;
    unchartedThemeBtn.disabled = true;
    newQuoteBtn.disabled = true;
    autoToggleBtn.disabled = true;
}

// Enable buttons after loading
function enableButtons() {
    romanThemeBtn.disabled = false;
    tombRaiderThemeBtn.disabled = false;
    unchartedThemeBtn.disabled = false;
    newQuoteBtn.disabled = false;
    autoToggleBtn.disabled = false;
}

// Show error message
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    document.querySelector('.theme-selector').after(errorDiv);
    
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.parentNode.removeChild(errorDiv);
        }
    }, 5000);
}

