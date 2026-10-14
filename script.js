/**
 * ZeroInteract - Core Client-Side State Management & Utility Library
 * Uses localStorage to mock a backend database and persistence engine.
 */

const STORAGE_KEYS = {
    WALLET: 'zi_wallet_balance',
    EVENTS: 'zi_events_catalog',
    REGISTRATIONS: 'zi_registered_events',
    ATTENDEE_SESSION: 'zi_attendee_session',
    ADMIN_SESSION: 'zi_admin_session'
};

// ================= STORAGE INITIALIZATION =================
function initStorage() {
    // 1. Initialize Wallet Balance (default 800 INR)
    if (localStorage.getItem(STORAGE_KEYS.WALLET) === null) {
        localStorage.setItem(STORAGE_KEYS.WALLET, '800');
    }

    // 2. Initialize Events Catalog (8 rich events)
    if (!localStorage.getItem(STORAGE_KEYS.EVENTS)) {
        seedEventsCatalog();
    }

    // 3. Initialize Registered Events (Empty by default so ONLY user-filled attendee names appear on attendance page)
    if (!localStorage.getItem(STORAGE_KEYS.REGISTRATIONS)) {
        localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify([]));
    }
}

// Multiples of 50 between 100 and 700 inclusive
function getRandomPaidPrice() {
    const validPrices = [100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700];
    return validPrices[Math.floor(Math.random() * validPrices.length)];
}

function seedEventsCatalog() {
    const initialEvents = [
        {
            id: 'evt_101',
            title: 'Next-Gen Web Dev with Tailwind & React',
            category: 'Webinar',
            badgeColor: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
            date: 'Oct 22, 2026 • 05:00 PM IST',
            venue: 'Online Virtual Stage 1',
            price: 0, // Free event
            shortSummary: 'Master modern frontend tooling, CSS grid layouts, component systems, and React Server Components.',
            description: 'Dive deep into modern web development practices with our senior engineering architects. Learn to design performant single-page applications, build bespoke design systems with Tailwind CSS, and leverage modern browsers for silky smooth 60fps animations.',
            agenda: [
                '17:00 - Introduction & State of Web Performance in 2026',
                '17:30 - Modern CSS: Container Queries, View Transitions & Subgrids',
                '18:15 - React 19 Server Components & Optimistic State Sync',
                '19:00 - Live Interactive Q&A and Resource Kit Distribution'
            ],
            speakers: [
                { name: 'Dr. Evelyn Vance', role: 'Staff Frontend Engineer', company: 'HyperScale Labs' },
                { name: 'Kavita Menon', role: 'Principal UI/UX Architect', company: 'DesignCraft' }
            ],
            organizer: 'Frontend Guild Global'
        },
        {
            id: 'evt_102',
            title: 'Global AI & Robotics Summit 2026',
            category: 'Conference',
            badgeColor: 'text-accentRed bg-accentRed/10 border-accentRed/30',
            date: 'Nov 05, 2026 • 09:30 AM IST',
            venue: 'Grand Tech Convention Center, Hall Alpha',
            price: getRandomPaidPrice(),
            shortSummary: 'Annual flagship summit exploring autonomous agents, humanoid robotics, and edge neuro-computing.',
            description: 'The Global AI & Robotics Summit unites 1,500+ researchers, engineers, and founders to dissect the next decade of artificial general intelligence and autonomous hardware robotics. Features 4 specialized tracks and live robotic demos.',
            agenda: [
                '09:30 - Keynote: Scaling Laws and Beyond by DeepMind Fellows',
                '11:00 - Track 1: Embodied AI and Real-time Motor Control',
                '14:00 - Track 2: Autonomous Multi-Agent Swarms & Decentralized Protocols',
                '16:30 - Investor Pitch Ring & Futuristic Hardware Showcase'
            ],
            speakers: [
                { name: 'Marcus Thorne', role: 'VP of Robotics AI', company: 'CyberKinematics' },
                { name: 'Dr. Sarah Lin', role: 'Chief Scientist', company: 'NeuralForge' }
            ],
            organizer: 'International Robotics Consortium'
        },
        {
            id: 'evt_103',
            title: 'UI/UX Design Masterclass & Prototyping',
            category: 'Workshop',
            badgeColor: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
            date: 'Nov 14, 2026 • 10:00 AM IST',
            venue: 'Innovation Lab B, 4th Floor',
            price: 0, // Free event
            shortSummary: 'Hands-on design systems sprint covering Figma variables, motion tokens, and high-fidelity micro-interactions.',
            description: 'An interactive 4-hour hands-on masterclass where attendees build an end-to-end design system from scratch. Discover accessibility color algorithms, dynamic typography scales, and interactive prototyping tricks used by top tier tech companies.',
            agenda: [
                '10:00 - Design System Foundation: Tokens, Variables & Mode Switching',
                '11:30 - Motion Design & Micro-interactions in Prototyping',
                '13:00 - Design Handoff & Auto-generating Frontend Stylesheets'
            ],
            speakers: [
                { name: 'Aarav Mehta', role: 'Head of Product Design', company: 'Apex Studios' }
            ],
            organizer: 'DesignWorks Academy'
        },
        {
            id: 'evt_104',
            title: 'Cloud Native & Kubernetes Deep-Dive',
            category: 'Workshop',
            badgeColor: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
            date: 'Nov 20, 2026 • 11:00 AM IST',
            venue: 'Cloud Complex 3, Room 102',
            price: getRandomPaidPrice(),
            shortSummary: 'Master zero-downtime microservices orchestration, eBPF telemetry, and multi-region failover.',
            description: 'Designed for DevOps engineers and backend architects who want to level up their Kubernetes production skills. Includes live hands-on clusters to simulate multi-region failover, service mesh traffic shaping, and security policies.',
            agenda: [
                '11:00 - Kubernetes Internals & Custom Resource Controllers',
                '12:30 - Observability at Scale: eBPF & Distributed Tracing',
                '14:30 - Chaos Engineering & Disaster Recovery Drills'
            ],
            speakers: [
                { name: 'Elena Rostova', role: 'Lead DevOps Architect', company: 'CloudGrid Systems' }
            ],
            organizer: 'Cloud Native Foundation'
        },
        {
            id: 'evt_105',
            title: 'Cybersecurity & Ethical Hacking Conclave',
            category: 'Conference',
            badgeColor: 'text-accentRed bg-accentRed/10 border-accentRed/30',
            date: 'Dec 02, 2026 • 09:00 AM IST',
            venue: 'Cyber Range Arena, Tech Dome',
            price: getRandomPaidPrice(),
            shortSummary: 'Elite conference analyzing real-world red team attack simulations, zero-day research, and API defense.',
            description: 'Discover the offensive and defensive strategies defining cybersecurity in 2026. Explore live malware analysis, identity spoofing counters, and how ZeroInteract cryptographically secures event verification against fake passes.',
            agenda: [
                '09:00 - Keynote: The Evolving Landscape of AI-Assisted Cyber Warfare',
                '10:45 - Live Exploit Breakdown: Reverse Engineering Mobile Authentication',
                '13:30 - Hardware Security Keys and Tamper-Proof Cryptographic Tokens',
                '15:30 - Live Capture The Flag (CTF) Tournament Finals'
            ],
            speakers: [
                { name: 'Vikram Singhania', role: 'Chief Information Security Officer', company: 'SecOps Global' },
                { name: 'Zoe Becker', role: 'Principal Red Team Operator', company: 'ZeroTrace Research' }
            ],
            organizer: 'Cyber Security Taskforce'
        },
        {
            id: 'evt_106',
            title: 'Full-Stack GenAI & Agent Hackathon',
            category: 'Hackathon',
            badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
            date: 'Dec 12, 2026 • 08:00 AM IST',
            venue: 'Main Campus Auditorium & Hacking Arena',
            price: 0, // Free event
            shortSummary: '36-hour intense hackathon building real-world autonomous coding, vision, and voice agents.',
            description: 'Assemble your dream team of up to 4 builders for 36 hours of non-stop innovation. Build autonomous multi-agent systems, multimodal generative tools, or decentralized apps. Includes free meals, mentor workshops, and ₹5,00,000 in bounties.',
            agenda: [
                'Day 1 - 08:00 AM: Registration, Team Matching & Opening Keynote',
                'Day 1 - 10:00 AM: Hacking Begins & Mentor Office Hours',
                'Day 2 - 12:00 PM: Project Submission Deadline & Expo Demos',
                'Day 2 - 04:00 PM: Grand Stage Finalist Pitches & Awards Ceremony'
            ],
            speakers: [
                { name: 'Karthik Raja', role: 'AI Ecosystem Lead', company: 'Antigravity AI' },
                { name: 'Maya Chen', role: 'Venture Partner', company: 'Genesis Hack Ventures' }
            ],
            organizer: 'Zero Origin Hackathon Network'
        },
        {
            id: 'evt_107',
            title: 'Autonomous Systems & Edge IoT Expo',
            category: 'Expo',
            badgeColor: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30',
            date: 'Dec 20, 2026 • 10:00 AM IST',
            venue: 'Exhibition Pavilion 4, Hall B',
            price: getRandomPaidPrice(),
            shortSummary: 'Exhibition of autonomous delivery drones, smart sensors, and high-frequency edge compute nodes.',
            description: 'Step into the future of connected hardware. Over 80 innovative tech startups demonstrate live autonomous drone flight corridors, low-latency satellite telemetries, and smart industrial automation hubs.',
            agenda: [
                '10:00 - Expo Floor Opens: 80+ Interactive Hardware Booths',
                '12:00 - Live Drone Corridor Navigation Challenge',
                '15:00 - Industry Panel: Edge Computing Protocols and Real-time Sensor Fusion'
            ],
            speakers: [
                { name: 'Nathan Drake', role: 'Director of Embedded Hardware', company: 'AeroSync' }
            ],
            organizer: 'Edge Technologies Alliance'
        },
        {
            id: 'evt_108',
            title: 'Quantum Computing & Post-Quantum Cryptography',
            category: 'Summit',
            badgeColor: 'text-accentPurple bg-accentPurple/10 border-accentPurple/30',
            date: 'Jan 08, 2027 • 09:30 AM IST',
            venue: 'Science Research Center, Lecture Hall 101',
            price: getRandomPaidPrice(),
            shortSummary: 'Academic & enterprise summit examining qubit coherence, fault tolerance, and lattice-based encryption.',
            description: 'Bringing together quantum physicists and mathematical cryptographers to tackle quantum supremacy and post-quantum security algorithms. Gain insights into the architectural transitions needed for next-generation encryption.',
            agenda: [
                '09:30 - Topological Qubits and Quantum Error Correction Breakthroughs',
                '11:30 - Migrating Public Key Infrastructure to NIST Post-Quantum Standards',
                '14:00 - Quantum Simulation for Drug Discovery and Material Science'
            ],
            speakers: [
                { name: 'Prof. Alistair Finch', role: 'Chair of Quantum Physics', company: 'Imperial Quantum Institute' }
            ],
            organizer: 'Quantum Research Society'
        }
    ];

    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(initialEvents));
}

// ================= STATE GETTERS & SETTERS =================
function getWalletBalance() {
    const val = localStorage.getItem(STORAGE_KEYS.WALLET);
    return val !== null ? parseInt(val, 10) : 800;
}

function setWalletBalance(amount) {
    localStorage.setItem(STORAGE_KEYS.WALLET, amount.toString());
    renderAllWallets();
}

function getEvents() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.EVENTS) || '[]');
}

function getEventById(id) {
    const events = getEvents();
    return events.find(e => e.id === id);
}

function saveEvents(events) {
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
}

function getRegistrations() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.REGISTRATIONS) || '[]');
}

function saveRegistrations(regs) {
    localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(regs));
}

// Global Auth Router: If email contains 'admin', routes strictly to Manager Portal; otherwise to Attendee Portal
function handleGlobalAuthRouting(email, name = '') {
    const cleanEmail = (email || '').trim();
    const cleanName = (name || cleanEmail.split('@')[0] || 'Attendee').trim();
    const isAdmin = cleanEmail.toLowerCase().includes('admin');

    if (isAdmin) {
        saveAdminSession(cleanEmail, cleanName || 'Event Director');
        showToast(`Admin identity verified (${cleanEmail}) — Routing to Manager Portal...`, 'success');
        setTimeout(() => {
            window.location.href = 'admin.html';
        }, 300);
    } else {
        saveAttendeeSession(cleanName, cleanEmail);
        showToast(`Attendee identity verified (${cleanEmail}) — Routing to Attendee Portal...`, 'success');
        setTimeout(() => {
            window.location.href = 'user.html';
        }, 300);
    }
}

// Attendee Session: holds the exact name filled in by the user
function getAttendeeSession() {
    const raw = localStorage.getItem(STORAGE_KEYS.ATTENDEE_SESSION);
    if (raw) {
        try { return JSON.parse(raw); } catch (e) { /* ignore */ }
    }
    return { isLoggedIn: false, name: '', email: '' };
}

function saveAttendeeSession(name, email) {
    const session = {
        isLoggedIn: true,
        name: (name || 'Attendee').trim(),
        email: (email || 'attendee@example.com').trim()
    };
    localStorage.setItem(STORAGE_KEYS.ATTENDEE_SESSION, JSON.stringify(session));
    return session;
}

function signOutAttendee() {
    localStorage.removeItem(STORAGE_KEYS.ATTENDEE_SESSION);
}

// Admin Session: strictly for Event Managers (email must contain 'admin')
function getAdminSession() {
    const raw = localStorage.getItem(STORAGE_KEYS.ADMIN_SESSION);
    if (raw) {
        try { return JSON.parse(raw); } catch (e) { /* ignore */ }
    }
    return { isLoggedIn: false, email: '', name: '' };
}

function saveAdminSession(email, name = 'Event Director') {
    const session = {
        isLoggedIn: true,
        email: email.trim(),
        name: name.trim()
    };
    localStorage.setItem(STORAGE_KEYS.ADMIN_SESSION, JSON.stringify(session));
    return session;
}

function signOutAdmin() {
    localStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
}

// ================= TRANSACTION & SCAN LOGIC =================

// Generate unique alphanumeric QR token: ZI-[4 letters]-[4 digits]
function generateUniqueQrToken() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let alnum = '';
    for (let i = 0; i < 4; i++) {
        alnum += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    const digits = Math.floor(1000 + Math.random() * 9000);
    return `ZI-${alnum}-${digits}`;
}

// Buy ticket action: ALWAYS stamps the EXACT attendee name filled on the user page
function buyTicket(eventId) {
    const event = getEventById(eventId);
    if (!event) {
        showToast('Event not found', 'error');
        return { success: false, reason: 'NOT_FOUND' };
    }

    const currentBalance = getWalletBalance();
    if (currentBalance < event.price) {
        return { success: false, reason: 'INSUFFICIENT_FUNDS', required: event.price, current: currentBalance };
    }

    // Get current attendee session
    const attendee = getAttendeeSession();
    // Use the exact name filled by the attendee on the user page
    const attendeeName = (attendee && attendee.name && attendee.name.trim()) 
        ? attendee.name.trim() 
        : 'Registered Attendee';
    const attendeeEmail = (attendee && attendee.email && attendee.email.trim()) 
        ? attendee.email.trim() 
        : 'attendee@example.com';

    // Deduct funds
    const newBalance = currentBalance - event.price;
    setWalletBalance(newBalance);

    // Create registration with unique QR token
    const token = generateUniqueQrToken();
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newReg = {
        id: `reg_${Date.now()}`,
        qr_token: token,
        eventId: event.id,
        eventTitle: event.title,
        eventDate: event.date,
        eventVenue: event.venue || 'Main Venue',
        price: event.price,
        userName: attendeeName,
        userEmail: attendeeEmail,
        registeredAt: timeStr,
        attended: false,
        attendedAt: null
    };

    const registrations = getRegistrations();
    registrations.unshift(newReg);
    saveRegistrations(registrations);

    return { success: true, registration: newReg, newBalance };
}

// Simulate scan action for admin
function simulateScan(token) {
    const rawToken = (token || '').trim().toUpperCase();
    if (!rawToken) {
        return { success: false, reason: 'EMPTY_TOKEN', message: 'Please enter a valid QR token to simulate scan.' };
    }

    const registrations = getRegistrations();
    const regIndex = registrations.findIndex(r => r.qr_token.toUpperCase() === rawToken);

    if (regIndex === -1) {
        return {
            success: false,
            reason: 'INVALID_TOKEN',
            message: `Invalid QR Token: No registration found for "${rawToken}". Verification failed.`
        };
    }

    const reg = registrations[regIndex];

    if (reg.attended === true) {
        return {
            success: false,
            reason: 'ALREADY_USED',
            registration: reg,
            message: `Token Already Used: Pass "${rawToken}" for ${reg.userName} was already scanned at ${reg.attendedAt || 'earlier'}. Access Denied.`
        };
    }

    // Mark attended
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    reg.attended = true;
    reg.attendedAt = timeStr;
    registrations[regIndex] = reg;
    saveRegistrations(registrations);

    return {
        success: true,
        registration: reg,
        message: `Access Granted! Verified: ${reg.userName} for "${reg.eventTitle}". Attendance marked at ${timeStr}.`
    };
}

// Create new event action for Event Manager
function createNewEvent(eventData) {
    const events = getEvents();
    const newId = `evt_${Date.now().toString().slice(-4)}`;

    const newEvent = {
        id: newId,
        title: eventData.title.trim(),
        category: eventData.category || 'Conference',
        badgeColor: getBadgeColorForCategory(eventData.category),
        date: eventData.date.trim(),
        venue: eventData.venue ? eventData.venue.trim() : 'Main Tech Venue',
        price: parseInt(eventData.price, 10) || 0,
        shortSummary: eventData.shortSummary ? eventData.shortSummary.trim() : eventData.description.slice(0, 110) + '...',
        description: eventData.description.trim(),
        agenda: eventData.agenda && Array.isArray(eventData.agenda) && eventData.agenda.length > 0 
            ? eventData.agenda 
            : ['10:00 AM - Opening & Registration', '11:00 AM - Keynote Address', '02:00 PM - Panel & Showcase'],
        speakers: eventData.speakers && Array.isArray(eventData.speakers) && eventData.speakers.length > 0
            ? eventData.speakers
            : [{ name: eventData.organizer || 'Lead Host', role: 'Event Organizer', company: 'ZeroInteract Partner' }],
        organizer: eventData.organizer ? eventData.organizer.trim() : 'Event Management Hub'
    };

    events.unshift(newEvent);
    saveEvents(events);
    return newEvent;
}

function getBadgeColorForCategory(cat) {
    switch ((cat || '').toLowerCase()) {
        case 'hackathon':
            return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
        case 'webinar':
            return 'text-purple-400 bg-purple-500/10 border-purple-500/30';
        case 'workshop':
            return 'text-blue-400 bg-blue-500/10 border-blue-500/30';
        case 'expo':
            return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
        case 'summit':
            return 'text-accentPurple bg-accentPurple/10 border-accentPurple/30';
        default:
            return 'text-accentRed bg-accentRed/10 border-accentRed/30';
    }
}

// ================= QR CANVAS DRAWING =================
function drawQrCanvas(canvasEl, token) {
    if (!canvasEl) return;
    const ctx = canvasEl.getContext('2d');
    const size = 21; // 21x21 grid
    const cellSize = canvasEl.width / size;

    // Background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);

    const grid = Array.from({ length: size }, () => Array(size).fill(false));

    function drawFinder(r0, c0) {
        for (let r = 0; r < 7; r++) {
            for (let c = 0; c < 7; c++) {
                const isBorder = (r === 0 || r === 6 || c === 0 || c === 6);
                const isCenter = (r >= 2 && r <= 4 && c >= 2 && c <= 4);
                grid[r0 + r][c0 + c] = isBorder || isCenter;
            }
        }
    }

    drawFinder(0, 0);
    drawFinder(0, size - 7);
    drawFinder(size - 7, 0);

    for (let i = 8; i < size - 8; i++) {
        grid[6][i] = (i % 2 === 0);
        grid[i][6] = (i % 2 === 0);
    }

    let hash = 0;
    for (let i = 0; i < token.length; i++) {
        hash = ((hash << 5) - hash) + token.charCodeAt(i);
        hash |= 0;
    }

    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
            const inFinder1 = r < 8 && c < 8;
            const inFinder2 = r < 8 && c >= size - 8;
            const inFinder3 = r >= size - 8 && c < 8;
            const inTiming = r === 6 || c === 6;

            if (!inFinder1 && !inFinder2 && !inFinder3 && !inTiming) {
                const val = Math.sin((hash + 1) * (r * size + c + 1)) * 10000;
                grid[r][c] = (val - Math.floor(val)) > 0.44;
            }
        }
    }

    ctx.fillStyle = '#0f050b';
    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
            if (grid[r][c]) {
                ctx.fillRect(c * cellSize, r * cellSize, cellSize - 0.4, cellSize - 0.4);
            }
        }
    }
}

// ================= TOAST NOTIFICATION HELPER =================
function showToast(message, type = 'info') {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'fixed top-5 right-5 z-[9999] flex flex-col space-y-3 pointer-events-none max-w-sm w-full';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    const bgClass = type === 'error' 
        ? 'bg-red-950/90 border-red-500/60 text-red-200 shadow-red-950/40' 
        : type === 'success'
        ? 'bg-emerald-950/90 border-emerald-500/60 text-emerald-200 shadow-emerald-950/40'
        : 'bg-cardBg border-purple-950/80 text-gray-200 shadow-purple-950/40';

    const icon = type === 'error'
        ? 'fa-circle-xmark text-accentRed'
        : type === 'success'
        ? 'fa-circle-check text-emerald-400'
        : 'fa-circle-info text-accentPurple';

    toast.className = `p-4 rounded-2xl border ${bgClass} shadow-2xl flex items-center space-x-3 pointer-events-auto transform transition-all duration-300 translate-y-2 opacity-0 text-xs sm:text-sm`;
    toast.innerHTML = `
        <i class="fa-solid ${icon} text-lg shrink-0"></i>
        <div class="flex-1 font-medium leading-tight">${message}</div>
    `;

    container.appendChild(toast);

    requestAnimationFrame(() => {
        toast.classList.remove('translate-y-2', 'opacity-0');
    });

    setTimeout(() => {
        toast.classList.add('opacity-0', 'translate-x-full');
        setTimeout(() => toast.remove(), 300);
    }, 3600);
}

// Render all wallet displays on current page
function renderAllWallets() {
    const balance = getWalletBalance();
    document.querySelectorAll('.wallet-balance-val').forEach(el => {
        el.textContent = `₹${balance}`;
    });
}

// Reset Demo Data
function resetDemoDatabase() {
    if (confirm("Reset prototype state to factory defaults? Wallet will be ₹800 and mock events will be reseeded.")) {
        localStorage.removeItem(STORAGE_KEYS.WALLET);
        localStorage.removeItem(STORAGE_KEYS.EVENTS);
        localStorage.removeItem(STORAGE_KEYS.REGISTRATIONS);
        localStorage.removeItem(STORAGE_KEYS.ATTENDEE_SESSION);
        localStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
        initStorage();
        showToast("Database reset to initial demo state!", "info");
        setTimeout(() => window.location.reload(), 400);
    }
}

// Auto init storage on script load
initStorage();
window.addEventListener('DOMContentLoaded', () => {
    renderAllWallets();
});

// Expose on global window object
window.ZeroInteract = {
    STORAGE_KEYS,
    initStorage,
    getWalletBalance,
    setWalletBalance,
    getEvents,
    getEventById,
    saveEvents,
    createNewEvent,
    getRegistrations,
    saveRegistrations,
    getAttendeeSession,
    saveAttendeeSession,
    signOutAttendee,
    getAdminSession,
    saveAdminSession,
    signOutAdmin,
    handleGlobalAuthRouting,
    buyTicket,
    simulateScan,
    drawQrCanvas,
    showToast,
    renderAllWallets,
    resetDemoDatabase
};
