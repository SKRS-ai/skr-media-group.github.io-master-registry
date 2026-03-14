// Global State
let masterData = null;

// 1. Initialize System & Fetch Database
async function initSystem() {
    try {
        const response = await fetch('./database.json');
        masterData = await response.json();
        console.log("System Online: Data Loaded");
        loadRegistry(); // Default view
    } catch (error) {
        document.getElementById('app-viewport').innerHTML = `<h2 style="color:red">SYSTEM ERROR: Data Link Severed</h2>`;
    }
}

// 2. The Registry View (Home Page)
function loadRegistry() {
    const viewport = document.getElementById('app-viewport');
    
    let html = `
        <div class="view-header">
            <h2>MASTER REGISTRY INDEX</h2>
            <input type="text" id="dbSearch" placeholder="Search IP / Industry / Company..." onkeyup="searchRegistry()">
        </div>
        <table id="registryTable">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Entity Name</th>
                    <th>Industry</th>
                    <th>Ownership</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>`;

    masterData.companies.forEach(company => {
        html += `
            <tr>
                <td>${company.id}</td>
                <td class="bold-cyan">${company.name}</td>
                <td>${company.industry}</td>
                <td class="rights-stamp">100% MASTER/PUB</td>
                <td><button class="btn-verify" onclick="viewCompany('${company.id}')">VIEW RECORDS</button></td>
            </tr>`;
    });

    html += `</tbody></table>`;
    viewport.innerHTML = html;
}

// 3. The "Next Page" View (Company Specific Profile)
function viewCompany(id) {
    const company = masterData.companies.find(c => c.id === id);
    const viewport = document.getElementById('app-viewport');

    viewport.innerHTML = `
        <div class="profile-view">
            <button class="btn-verify" onclick="loadRegistry()">← BACK TO INDEX</button>
            <h1 class="glow-text">${company.name}</h1>
            <div class="status-pill">${company.status}</div>
            <hr border-color="var(--sk-blue)">
            <p><strong>Primary Domain:</strong> <a href="http://${company.domain}" target="_blank">${company.domain}</a></p>
            <p><strong>Industrial Focus:</strong> ${company.focus}</p>
            <p class="description-box">${company.description}</p>
            
            <h3>VERIFIED IP ASSETS</h3>
            <div class="asset-grid">
                <div class="asset-card">SYNC_CATALOG_V1.PDF</div>
                <div class="asset-card">MASTER_LICENSE_PORTAL.EXE</div>
                <div class="asset-card">OWNERSHIP_CERTIFICATE.CERT</div>
            </div>
        </div>
    `;
}

// 4. Search Logic
function searchRegistry() {
    let input = document.getElementById("dbSearch").value.toUpperCase();
    let tr = document.querySelectorAll("#registryTable tbody tr");

    tr.forEach(row => {
        let text = row.textContent || row.innerText;
        row.style.display = text.toUpperCase().indexOf(input) > -1 ? "" : "none";
    });
}

// Start System
window.onload = initSystem;
// Global Cart State
let cart = JSON.parse(localStorage.getItem('skr_cart')) || [];

function loadServices() {
    const viewport = document.getElementById('app-viewport');
    
    // Example of a few autonomous products from our list of 50
    const products = [
        { id: 'SVC-001', name: 'Industrial Sync Certification', price: 499, desc: 'Full legal audit & 100% rights verification.' },
        { id: 'SVC-002', name: 'AI Character Authenticity Seal', price: 299, desc: 'Digital human rights & synthetic star casting legal seal.' },
        { id: 'SVC-003', name: 'Sovereign Village Data Archiving', price: 150, desc: 'Secure record storage within the SKR registry.' },
        { id: 'SVC-004', name: 'Identity Records Verification', price: 199, desc: 'TBBL USA Great Seal identity certification.' }
    ];

    let html = `
        <div class="view-header">
            <h2>AUTONOMOUS SERVICES PORTAL</h2>
            <p>Select industrial-grade packages for immediate processing.</p>
        </div>
        <div class="service-grid">`;

    products.forEach(p => {
        html += `
            <div class="service-card">
                <div class="sku">SKU: ${p.id}</div>
                <h3>${p.name}</h3>
                <p>${p.desc}</p>
                <div class="price">$${p.price}.00</div>
                <button class="btn-verify" onclick="addToCart('${p.id}', '${p.name}', ${p.price})">ADD TO COMMAND CART</button>
            </div>`;
    });

    html += `</div>`;
    viewport.innerHTML = html;
}

function addToCart(id, name, price) {
    cart.push({ id, name, price });
    localStorage.setItem('skr_cart', JSON.stringify(cart));
    updateCartUI();
    alert(`${name} added to command queue.`);
}

function updateCartUI() {
    const count = document.getElementById('cart-count');
    if(count) count.innerText = `Cart (${cart.length})`;
}
function loadVerificationTool() {
    const viewport = document.getElementById('app-viewport');
    
    viewport.innerHTML = `
        <div class="verify-scanner-view">
            <h2 class="glow-text">INDUSTRIAL RECORD VERIFICATION</h2>
            <p>Input a Record ID, License Number, or VEX-UUID to verify authenticity.</p>
            
            <div class="search-box-container">
                <input type="text" id="verifyInput" placeholder="EX: SKR-001 or LIC-VEX-992..." class="scan-input">
                <button class="btn-verify" onclick="executeScan()">RUN SYSTEM SCAN</button>
            </div>

            <div id="scanResult" class="scan-result-area">
                <div class="idle-message">SYSTEM IDLE: AWAITING INPUT</div>
            </div>
        </div>
    `;
}

function executeScan() {
    const input = document.getElementById('verifyInput').value.trim().toUpperCase();
    const resultArea = document.getElementById('scanResult');
    
    if(!input) return alert("Please enter a Record ID.");

    // Initial Scanning Animation
    resultArea.innerHTML = `
        <div class="scanning-animation">
            <div class="progress-bar"><div class="progress-fill"></div></div>
            <p>SCANNING MASTER REGISTRY...</p>
        </div>
    `;

    // Simulate Database Latency for Professional Feel
    setTimeout(() => {
        const foundCompany = masterData.companies.find(c => c.id === input);
        
        if (foundCompany) {
            resultArea.innerHTML = `
                <div class="status-result validated">
                    <div class="seal-icon">✓</div>
                    <div class="result-data">
                        <h3>RECORD VALIDATED</h3>
                        <p><strong>Entity:</strong> ${foundCompany.name}</p>
                        <p><strong>Status:</strong> ${foundCompany.status}</p>
                        <p><strong>Ownership:</strong> 100% MASTER/PUBLISHING CLEARANCE</p>
                        <small>TIMESTAMP: ${new Date().toLocaleString()}</small>
                    </div>
                </div>
            `;
        } else {
            resultArea.innerHTML = `
                <div class="status-result invalid">
                    <div class="seal-icon">X</div>
                    <div class="result-data">
                        <h3>RECORD NOT FOUND</h3>
                        <p>The ID entered does not match any verified records in the Solomon Kin Master Registry.</p>
                        <button class="btn-verify" onclick="loadVerificationTool()">RETRY</button>
                    </div>
                </div>
            `;
        }
    }, 2000);
}
function renderLegalPortal() {
    const viewport = document.getElementById('main-view');
    
    viewport.innerHTML = `
        <div class="registry-card">
            <h2 class="glow-text">LEGAL INFRASTRUCTURE & DISCLOSURES</h2>
            <p>Solomon Kin Records, LLC Media Group operates as a <strong>Master Rights Direct Owner</strong>.</p>
            
            <div class="legal-grid">
                <div class="legal-section">
                    <h3>01. ONE-STOP CERTIFICATION</h3>
                    <p>Every asset identified in this registry is guaranteed "One-Stop." Solomon Kin Records, LLC maintains 100% of the Master and 100% of the Publishing rights. No third-party clearances are required for industrial synchronization.</p>
                </div>
                
                <div class="legal-section">
                    <h3>02. AI & SYNTHETIC CASTING</h3>
                    <p>All AI-generated characters and synthetic performances are legally anchored to the SKR Master Registry. Usage rights are issued via Vexilla AiTS smart-contracts to ensure perpetual legal integrity.</p>
                </div>

                <div class="legal-section">
                    <h3>03. DATA & RECORD SECURITY</h3>
                    <p>Records kept within this portal are verified by Vexilla AiTS. Solomon Kin Records, LLC acts as the primary custodian for all trade, environmental, and multimedia records listed under the SKR identifier.</p>
                </div>
            </div>

            <div class="download-portal">
                <h3>MASTER DOCUMENTATION TEMPLATES</h3>
                <div class="file-list">
                    <button class="btn-verify" onclick="alert('Downloading Standard Sync License...')">↓ DOWNLOAD STANDARD SYNC LICENSE (PDF)</button>
                    <button class="btn-verify" onclick="alert('Downloading Master Affiliation Agreement...')">↓ DOWNLOAD MASTER AFFILIATION TERMS (PDF)</button>
                    <button class="btn-verify" onclick="alert('Downloading AI Casting Rider...')">↓ DOWNLOAD AI CASTING RIDER (PDF)</button>
                </div>
            </div>
        </div>
    `;
}
function renderDocRepository() {
    const viewport = document.getElementById('main-view');
    
    // Data structure for your intellectual property
    const documents = [
        { type: 'PATENT', id: 'PAT-VEX-2026', title: 'Autonomous AI Licensing Method (V1)', status: 'FILED' },
        { type: 'TRAINING', id: 'TRN-SKR-005', title: 'Industrial Record-Keeping Standards', status: 'ACTIVE' },
        { type: 'CERTIFICATION', id: 'CRT-CBG-201', title: 'Blue-Green Environmental Protocol', status: 'VERIFIED' },
        { type: 'METHODS', id: 'MET-IBG-99', title: 'Global Trade Ledger Integration', status: 'PUBLISHED' }
    ];

    let html = `
        <div class="registry-card">
            <h2 class="glow-text">INTELLECTUAL PROPERTY & PATENT REPOSITORY</h2>
            <p>Official Index of Proprietary Methods, Industrial Patents, and Training Protocols.</p>
            
            <div class="repo-controls">
                <input type="text" placeholder="FILTER BY PATENT ID..." class="scan-input" style="width:100%; margin-bottom:20px;">
            </div>

            <div class="doc-list">`;

    documents.forEach(doc => {
        html += `
            <div class="doc-row">
                <div class="doc-meta">
                    <span class="status-pill">${doc.type}</span>
                    <code>ID: ${doc.id}</code>
                </div>
                <div class="doc-title">${doc.title}</div>
                <div class="doc-status" style="color:${doc.status === 'FILED' ? 'var(--sk-blue)' : '#00ff00'}">${doc.status}</div>
                <button class="btn-verify" onclick="alert('Accessing Document ${doc.id}...')">REQUEST ACCESS</button>
            </div>`;
    });

    html += `</div></div>`;
    viewport.innerHTML = html;
}
