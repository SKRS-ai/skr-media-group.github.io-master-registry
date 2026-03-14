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