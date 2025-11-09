// ===================================
// Neural Network Background Animation
// ===================================
class NeuralNetwork {
    constructor() {
        this.canvas = document.getElementById('neural-network-bg');
        this.ctx = this.canvas.getContext('2d');
        this.nodes = [];
        this.connections = [];
        this.mouse = { x: 0, y: 0 };
        this.nodeCount = 50;
        
        this.init();
        this.animate();
        this.setupEventListeners();
    }
    
    init() {
        this.resize();
        this.createNodes();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createNodes() {
        this.nodes = [];
        for (let i = 0; i < this.nodeCount; i++) {
            this.nodes.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1
            });
        }
    }
    
    updateNodes() {
        this.nodes.forEach(node => {
            node.x += node.vx;
            node.y += node.vy;
            
            if (node.x < 0 || node.x > this.canvas.width) node.vx *= -1;
            if (node.y < 0 || node.y > this.canvas.height) node.vy *= -1;
            
            // Mouse interaction
            const dx = this.mouse.x - node.x;
            const dy = this.mouse.y - node.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
                const force = (150 - distance) / 150;
                node.x -= dx * force * 0.03;
                node.y -= dy * force * 0.03;
            }
        });
    }
    
    drawNodes() {
        this.nodes.forEach(node => {
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(74, 74, 90, 0.6)';
            this.ctx.fill();
        });
    }
    
    drawConnections() {
        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = i + 1; j < this.nodes.length; j++) {
                const dx = this.nodes[i].x - this.nodes[j].x;
                const dy = this.nodes[i].y - this.nodes[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.nodes[i].x, this.nodes[i].y);
                    this.ctx.lineTo(this.nodes[j].x, this.nodes[j].y);
                    const opacity = (150 - distance) / 150 * 0.3;
                    this.ctx.strokeStyle = `rgba(90, 90, 106, ${opacity})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.stroke();
                }
            }
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.updateNodes();
        this.drawConnections();
        this.drawNodes();
        requestAnimationFrame(() => this.animate());
    }
    
    setupEventListeners() {
        window.addEventListener('resize', () => {
            this.resize();
            this.createNodes();
        });
        
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
    }
}

// ===================================
// Code Rain Effect
// ===================================
class CodeRain {
    constructor() {
        this.container = document.querySelector('.code-rain');
        if (!this.container) return;
        
        this.characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        this.streams = [];
        this.init();
    }
    
    init() {
        const streamCount = 8;
        for (let i = 0; i < streamCount; i++) {
            const stream = document.createElement('div');
            stream.className = 'rain-stream';
            stream.style.cssText = `
                position: absolute;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * -100}%;
                font-size: 14px;
                color: #00ff88;
                opacity: ${Math.random() * 0.5 + 0.3};
                animation: rainFall ${Math.random() * 5 + 5}s linear infinite;
                animation-delay: ${Math.random() * 5}s;
            `;
            
            let text = '';
            for (let j = 0; j < 15; j++) {
                text += this.characters.charAt(Math.floor(Math.random() * this.characters.length)) + '<br>';
            }
            stream.innerHTML = text;
            this.container.appendChild(stream);
        }
        
        // Add CSS animation
        if (!document.querySelector('#rain-animation-style')) {
            const style = document.createElement('style');
            style.id = 'rain-animation-style';
            style.textContent = `
                @keyframes rainFall {
                    0% { transform: translateY(-100%); }
                    100% { transform: translateY(600px); }
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// ===================================
// Terminal Live Typing Effect
// ===================================
class TerminalTyping {
    constructor() {
        this.elements = document.querySelectorAll('.typing-effect');
        this.init();
    }
    
    init() {
        this.elements.forEach((element, index) => {
            const text = element.getAttribute('data-text');
            if (text) {
                element.textContent = '';
                this.typeText(element, text, index * 100);
            }
        });
    }
    
    typeText(element, text, delay) {
        setTimeout(() => {
            let index = 0;
            const interval = setInterval(() => {
                if (index < text.length) {
                    element.textContent += text.charAt(index);
                    index++;
                } else {
                    clearInterval(interval);
                    setTimeout(() => {
                        element.textContent = '';
                        this.typeText(element, text, 3000);
                    }, 3000);
                }
            }, 50);
        }, delay);
    }
}

// ===================================
// Skills Reveal on Scroll
// ===================================
class SkillsReveal {
    constructor() {
        this.skillItems = document.querySelectorAll('.skill-item');
        this.init();
    }
    
    init() {
        this.observeSkills();
    }
    
    observeSkills() {
        const options = {
            threshold: 0.3,
            rootMargin: '0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('revealed');
                    }, index * 100);
                }
            });
        }, options);
        
        this.skillItems.forEach(item => observer.observe(item));
    }
}

// ===================================
// Scroll Animations
// ===================================
class ScrollAnimations {
    constructor() {
        this.sections = document.querySelectorAll('.projects-section, .skills-section, .contact-section');
        this.projectCards = document.querySelectorAll('.project-card');
        this.init();
    }
    
    init() {
        this.observeElements();
    }
    
    observeElements() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('scroll-reveal', 'revealed');
                }
            });
        }, options);
        
        [...this.sections, ...this.projectCards].forEach(element => {
            element.classList.add('scroll-reveal');
            observer.observe(element);
        });
    }
}

// ===================================
// Terminal Easter Egg
// ===================================
class TerminalEasterEgg {
    constructor() {
        this.terminal = document.getElementById('terminal-egg');
        this.input = document.getElementById('terminal-input');
        this.output = document.getElementById('terminal-output');
        this.toggleBtn = document.querySelector('.terminal-toggle');
        
        this.commands = {
            'hello': '👋 Hello! Welcome to my portfolio. Try typing "hack" for a surprise!',
            'hack': '🎉 Achievement Unlocked: Curious Mind! 💻\n\nYou found the secret console! As an AI/ML engineer, I believe the best discoveries come from curiosity.\n\nBonus fact: This portfolio was built with vanilla JS, no frameworks needed. Sometimes the simplest solutions are the most elegant.\n\nTry "skills" or "contact" for more info!',
            'skills': '💪 Core Skills:\n• Machine Learning & Deep Learning\n• Python, Go, TensorFlow, PyTorch\n• Distributed Systems & MLOps\n• CI/CD with GitHub Actions\n• Linux & Cloud Infrastructure',
            'contact': '📧 Let\'s connect!\nEmail: contact@example.com\nGitHub: github.com\nLinkedIn: linkedin.com',
            'clear': 'CLEAR_OUTPUT',
            'help': 'Available commands:\n• hello - Greeting message\n• hack - Easter egg surprise 🎉\n• skills - View my technical skills\n• contact - Get in touch\n• clear - Clear console\n• exit - Close console'
        };
        
        this.init();
    }
    
    init() {
        if (!this.input) return;
        
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.processCommand(this.input.value.trim().toLowerCase());
                this.input.value = '';
            }
        });
        
        // Focus input when terminal is opened
        this.terminal.addEventListener('transitionend', () => {
            if (this.terminal.classList.contains('active')) {
                this.input.focus();
            }
        });
    }
    
    processCommand(command) {
        if (command === '') return;
        
        // Add command to output
        this.addOutput(`$> ${command}`, 'command');
        
        if (command === 'exit') {
            closeTerminal();
            return;
        }
        
        const response = this.commands[command];
        
        if (response === 'CLEAR_OUTPUT') {
            this.clearOutput();
        } else if (response) {
            this.addOutput(response, 'success');
        } else {
            this.addOutput(`Command not found: ${command}. Type "help" for available commands.`, 'error');
        }
    }
    
    addOutput(text, type = '') {
        const line = document.createElement('div');
        line.className = `terminal-output-line ${type}`;
        line.style.whiteSpace = 'pre-wrap';
        line.textContent = text;
        
        // Insert before the prompt
        const prompt = this.output.querySelector('.terminal-prompt');
        this.output.insertBefore(line, prompt);
        
        // Auto-scroll to bottom
        this.output.scrollTop = this.output.scrollHeight;
    }
    
    clearOutput() {
        const lines = this.output.querySelectorAll('.terminal-output-line');
        lines.forEach(line => line.remove());
    }
}

// ===================================
// Terminal Toggle Functions (Global)
// ===================================
function toggleTerminal() {
    const terminal = document.getElementById('terminal-egg');
    const toggleBtn = document.querySelector('.terminal-toggle');
    
    if (terminal.classList.contains('active')) {
        closeTerminal();
    } else {
        terminal.classList.add('active');
        toggleBtn.classList.add('hidden');
        setTimeout(() => {
            document.getElementById('terminal-input').focus();
        }, 300);
    }
}

function closeTerminal() {
    const terminal = document.getElementById('terminal-egg');
    const toggleBtn = document.querySelector('.terminal-toggle');
    
    terminal.classList.remove('active');
    toggleBtn.classList.remove('hidden');
}

// ===================================
// Project Card Interactions
// ===================================
class ProjectInteractions {
    constructor() {
        this.cards = document.querySelectorAll('.project-card');
        this.init();
    }
    
    init() {
        this.cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.animateCard(card);
            });
        });
    }
    
    animateCard(card) {
        const projectType = card.getAttribute('data-project');
        
        // Add specific animations based on project type
        if (projectType === 'biosphere') {
            const organisms = card.querySelectorAll('.organism');
            organisms.forEach((org, index) => {
                org.style.animation = `float ${3 + index}s ease-in-out infinite`;
            });
        }
    }
}

// ===================================
// Smooth Scroll for Navigation
// ===================================
class SmoothScroll {
    constructor() {
        this.links = document.querySelectorAll('a[href^="#"]');
        this.init();
    }
    
    init() {
        this.links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // Account for fixed nav
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// ===================================
// Active Navigation Link
// ===================================
class ActiveNav {
    constructor() {
        this.sections = document.querySelectorAll('section[id]');
        this.navLinks = document.querySelectorAll('.nav-links a');
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', () => {
            this.updateActiveLink();
        });
    }
    
    updateActiveLink() {
        const scrollPosition = window.scrollY + 100;
        
        this.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                this.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
}

// ===================================
// Initialize All Components
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize neural network background
    new NeuralNetwork();
    
    // Initialize code rain effect
    new CodeRain();
    
    // Initialize terminal typing effect
    new TerminalTyping();
    
    // Initialize skills reveal animation
    new SkillsReveal();
    
    // Initialize scroll animations
    new ScrollAnimations();
    
    // Initialize terminal easter egg
    new TerminalEasterEgg();
    
    // Initialize project interactions
    new ProjectInteractions();
    
    // Initialize smooth scroll
    new SmoothScroll();
    
    // Initialize active navigation
    new ActiveNav();
    
    console.log('%c🎉 Portfolio Loaded Successfully! ', 'background: #00ff88; color: #0a0a0a; font-size: 16px; padding: 10px; border-radius: 4px;');
    console.log('%cTry opening the terminal in the bottom right corner! 💻', 'color: #00d4ff; font-size: 14px;');
});

// Handle window resize for responsive canvas
window.addEventListener('resize', () => {
    const canvas = document.getElementById('neural-network-bg');
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
});
