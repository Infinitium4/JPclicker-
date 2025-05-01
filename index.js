// ===== FONCTIONS DE FORMATAGE =====
function formatNumber(num) {
    num = parseFloat(num);
    if (isNaN(num)) return "0";
    if (num >= 1000000000000) return (num / 1000000000000).toFixed(2) + 'TR';
    if (num >= 1000000000) return (num / 1000000000).toFixed(2) + 'MD';
    if (num >= 1000000) return (num / 1000000).toFixed(2) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(2) + 'K';
    
    return Math.floor(num).toString();
}

function parseFormattedNumber(text) {
    if (!text) return 0;
    const num = parseFloat(text);
    if (text.includes('K')) return num * 1000;
    if (text.includes('M') && !text.includes('MD')) return num * 1000000;
    if (text.includes('MD')) return num * 1000000000;
    if (text.includes('TR')) return num * 1000000000000;
    return num;
}

// ===== VARIABLES DU JEU =====
let Money = document.querySelector('.money-number');
let Clickercost = document.querySelector('.Clicker-cost');
let clickerLevel = document.querySelector(".clicker-level");
let clickerIncrease = document.querySelector(".clicker-increase");

let parsedClickercost = parseFloat(Clickercost.textContent);
let parsedClickerIncrease = parseFloat(clickerIncrease.textContent);

let emileLevel = 0;
let emileIncomePerLevel = 2; // Augmenté de 1.5 à 2
let miloLevel = 0;
let miloIncomePerLevel = 1.5; // Augmenté de 1 à 1.5
let mpc = 1;
let mpsBonus = 0;
let achievementBonus = 0;
let achievementsUnlocked = [];

let nilsCost = 150;
let nilsLevel = 0;
let nilsIncrease = 2; // Augmenté de 1.5 à 2
let maxenceCost = 750; // Augmenté de 500 à 750
let maxenceLevel = 0;
let maxenceIncrease = 2.5; // Augmenté de 1.7 à 2.5

let lorisCost = 2500; // Augmenté de 2000 à 2500
let lorisLevel = 0;
let lorisIncrease = 4; // Augmenté de 3 à 4
let lorisIncomePerLevel = 15; // Augmenté de 10 à 15
let adrienLevel = 0;
let adrienIncomeperlevel = 15; // Augmenté de 10 à 15

let lutherCost = 10000; // Ajouté le coût initial manquant
let lutherLevel = 0;
let lutherIncomeperLevel = 15; 

// ===== FONCTIONS PRINCIPALES =====
function incrementMoney() {
    let currentMoney = parseFormattedNumber(Money.textContent);
    currentMoney += mpc;
    Money.textContent = formatNumber(currentMoney);
    checkAchievements();
}

function buyClicker() {
    let currentMoney = parseFormattedNumber(Money.textContent);
    if (currentMoney >= parsedClickercost) {
        currentMoney -= parsedClickercost;
        Money.textContent = formatNumber(currentMoney);

        let currentLevel = parseInt(clickerLevel.textContent) || 0;
        currentLevel += 1;
        clickerLevel.textContent = currentLevel;

        if (currentLevel === 10) document.querySelector('.upgrade.milo').classList.remove('hidden');

        let upgradeBox = document.querySelector('.upgrade');
        upgradeBox.className = 'upgrade';
        if (currentLevel >= 100) upgradeBox.classList.add('level-100');
        else if (currentLevel >= 50) upgradeBox.classList.add('level-50');
        else if (currentLevel >= 10) upgradeBox.classList.add('level-10');

        parsedClickerIncrease = parseFloat((parsedClickerIncrease * 1.03).toFixed(2));
        clickerIncrease.textContent = parsedClickerIncrease;
        mpc += parsedClickerIncrease;

        parsedClickercost *= 1.2;
        Clickercost.textContent = formatNumber(Math.round(parsedClickercost));

        checkAchievements();
    }
}

function buyMilo() {
    let currentMoney = parseFormattedNumber(Money.textContent);
    let miloCost = parseFormattedNumber(document.querySelector('.Milo-cost').textContent);
    
    if (currentMoney >= miloCost) {
        currentMoney -= miloCost;
        Money.textContent = formatNumber(currentMoney);

        miloLevel += 1;
        document.querySelector('.Milo-level').textContent = miloLevel;
        document.querySelector('.Milo-increase').textContent = (miloLevel * miloIncomePerLevel).toFixed(2);

        miloCost *= 1.15; // Diminué de 1.2 à 1.15
        document.querySelector('.Milo-cost').textContent = formatNumber(Math.round(miloCost));

        if (miloLevel >= 25) document.querySelector('.upgrade.emile').classList.remove('hidden');

        let miloBox = document.querySelector('.upgrade.milo');
        miloBox.className = 'upgrade milo';
        if (miloLevel >= 100) miloBox.classList.add('level-100');
        else if (miloLevel >= 50) miloBox.classList.add('level-50');
        else if (miloLevel >= 10) miloBox.classList.add('level-10');

        checkAchievements();
    }
}

function buyEmile() {
    let currentMoney = parseFormattedNumber(Money.textContent);
    let emileCost = parseFormattedNumber(document.querySelector('.emile-cost').textContent);
    
    if (currentMoney >= emileCost) {
        currentMoney -= emileCost;
        Money.textContent = formatNumber(currentMoney);

        emileLevel += 1;
        document.querySelector('.emile-level').textContent = emileLevel;
        document.querySelector('.emile-increase').textContent = (emileLevel * emileIncomePerLevel).toFixed(2);

        emileCost *= 1.18; // Diminué de 1.2 à 1.18
        document.querySelector('.emile-cost').textContent = formatNumber(Math.round(emileCost));

        if (emileLevel >= 25) document.querySelector('.upgrade.nils').classList.remove('hidden');

        let emileBox = document.querySelector('.upgrade.emile');
        emileBox.className = 'upgrade emile';
        if (emileLevel >= 100) emileBox.classList.add('level-100');
        else if (emileLevel >= 50) emileBox.classList.add('level-50');
        else if (emileLevel >= 10) emileBox.classList.add('level-10');

        checkAchievements();
    }
}

function buyNils() {
    let currentMoney = parseFormattedNumber(Money.textContent);
    if (currentMoney >= nilsCost) {
        currentMoney -= nilsCost;
        Money.textContent = formatNumber(currentMoney);

        nilsLevel++;
        document.querySelector('.nils-level').textContent = nilsLevel;
        document.querySelector('.nils-increase').textContent = nilsIncrease * nilsLevel;

        nilsCost = Math.floor(nilsCost * 1.2);
        document.querySelector('.nils-cost').textContent = formatNumber(nilsCost);

        if (nilsLevel >= 20) document.querySelector('.upgrade.maxence').classList.remove('hidden');

        let nilsBox = document.querySelector('.upgrade.nils');
        nilsBox.className = 'upgrade nils';
        if (nilsLevel >= 100) nilsBox.classList.add('level-100');
        else if (nilsLevel >= 50) nilsBox.classList.add('level-50');
        else if (nilsLevel >= 10) nilsBox.classList.add('level-10');

        mpc += nilsIncrease * nilsLevel;
        checkAchievements();
    }
}

function buyMaxence() {
    let currentMoney = parseFormattedNumber(Money.textContent);
    if (currentMoney >= maxenceCost) {
        currentMoney -= maxenceCost;
        Money.textContent = formatNumber(currentMoney);

        maxenceLevel++;
        document.querySelector('.maxence-level').textContent = maxenceLevel;
        document.querySelector('.maxence-increase').textContent = maxenceIncrease * maxenceLevel;

        maxenceCost = Math.floor(maxenceCost * 1.22); // Augmenté de 1.2 à 1.22
        document.querySelector('.maxence-cost').textContent = formatNumber(maxenceCost);

        if (maxenceLevel >= 20) document.querySelector('.upgrade.adrien').classList.remove('hidden');

        let maxenceBox = document.querySelector('.upgrade.maxence');
        maxenceBox.className = 'upgrade maxence';
        if (maxenceLevel >= 100) maxenceBox.classList.add('level-100');
        else if (maxenceLevel >= 50) maxenceBox.classList.add('level-50');
        else if (maxenceLevel >= 10) maxenceBox.classList.add('level-10');

        mpc += maxenceIncrease * maxenceLevel;
        checkAchievements();
    }
}

function buyAdrien() {
    let currentMoney = parseFormattedNumber(Money.textContent);
    let adrienCost = parseFormattedNumber(document.querySelector('.adrien-cost').textContent);
    
    if (currentMoney >= adrienCost) {
        currentMoney -= adrienCost;
        Money.textContent = formatNumber(currentMoney);

        adrienLevel += 1;
        document.querySelector('.adrien-level').textContent = adrienLevel;
        document.querySelector('.adrien-increase').textContent = (adrienLevel * adrienIncomeperlevel).toFixed(2);

        adrienCost *= 1.25; // Augmenté de 1.2 à 1.25
        document.querySelector('.adrien-cost').textContent = formatNumber(Math.round(adrienCost));

        if (adrienLevel >= 20) document.querySelector('.upgrade.loris').classList.remove('hidden');

        let adrienBox = document.querySelector('.upgrade.adrien');
        adrienBox.className = 'upgrade adrien';
        if (adrienLevel >= 100) adrienBox.classList.add('level-100');
        else if (adrienLevel >= 50) adrienBox.classList.add('level-50');
        else if (adrienLevel >= 10) adrienBox.classList.add('level-10');

        checkAchievements();
    }
}

function buyLoris() {
    let currentMoney = parseFormattedNumber(Money.textContent);
    if (currentMoney >= lorisCost) {
        currentMoney -= lorisCost;
        Money.textContent = formatNumber(currentMoney);

        lorisLevel++;
        document.querySelector('.loris-level').textContent = lorisLevel;
        document.querySelector('.loris-increase').textContent = lorisIncrease * lorisLevel;

        lorisCost = Math.floor(lorisCost * 1.25); // Augmenté de 1.15 à 1.25
        document.querySelector('.loris-cost').textContent = formatNumber(lorisCost);

        if (lorisLevel >= 20) document.querySelector('.upgrade.luther').classList.remove('hidden');

        let lorisBox = document.querySelector('.upgrade.loris');
        lorisBox.className = 'upgrade loris';
        if (lorisLevel >= 100) lorisBox.classList.add('level-100');
        else if (lorisLevel >= 50) lorisBox.classList.add('level-50');
        else if (lorisLevel >= 10) lorisBox.classList.add('level-10');

        mpc += lorisIncrease * lorisLevel;
        checkAchievements();
    }
}

function buyLuther() {
    let currentMoney = parseFormattedNumber(Money.textContent);
    let cost = parseFormattedNumber(document.querySelector('.luther-cost').textContent);
    
    if (currentMoney >= cost) {
        currentMoney -= cost;
        Money.textContent = formatNumber(currentMoney);

        lutherLevel += 1;
        document.querySelector('.luther-level').textContent = lutherLevel;
        document.querySelector('.luther-increase').textContent = (lutherLevel * lutherIncomeperLevel).toFixed(2);

        lutherCost = Math.floor(lutherCost * 1.25);
        document.querySelector('.luther-cost').textContent = formatNumber(lutherCost);

        let lutherBox = document.querySelector('.upgrade.luther');
        if (lutherBox) { // Sécurité si l'élément existe
            lutherBox.className = 'upgrade luther';
            if (lutherLevel >= 100) lutherBox.classList.add('level-100');
            else if (lutherLevel >= 50) lutherBox.classList.add('level-50');
            else if (lutherLevel >= 10) lutherBox.classList.add('level-10');
        }

        mpc += lutherIncomeperLevel; // Ajout crucial manquant
        checkAchievements();
        updateStats(); // Mise à jour immédiate des stats
    }
}

// ===== SYSTEME DE SUCCÈS =====
const achievementImages = {
    "Launis crame sa resistance": "assets/cigarette electronique.png",
    "4 PITBULLS": "assets/pitbull.png",
    "Nils Bad": "assets/NilsBad.png",
    "Launis femboy": "assets/Launis femboy.png",
    "4 BULLDOGS": "assets/4 BULLDOGS.png"
};

function showAchievementPopup(title, imageUrl) {
    const popup = document.createElement('div');
    popup.className = 'achievement-popup';
    popup.innerHTML = `
        <img src="${imageUrl}" class="achievement-popup-image" alt="${title}">
        <div class="achievement-popup-text">${title} débloqué!</div>
    `;
    document.body.appendChild(popup);
    
    // Animation
    setTimeout(() => {
        popup.classList.add('show');
        setTimeout(() => {
            popup.classList.remove('show');
            setTimeout(() => popup.remove(), 500);
        }, 3000);
    }, 100);
}

function unlockAchievement(title) {
    if (!achievementsUnlocked.includes(title)) {
        achievementsUnlocked.push(title);
        const bonus = getAchievementBonus(title);
        achievementBonus += bonus;
        
        // Ajout à la liste
        const list = document.querySelector('.achievements-list');
        const achievement = document.createElement('div');
        achievement.className = 'achievement';
        achievement.innerHTML = `
            <img src="${achievementImages[title]}" class="achievement-icon" alt="${title}">
            <span>${title} (+${bonus}/sec)</span>
        `;
        list.appendChild(achievement);
        
        // Popup visuel
        showAchievementPopup(title, achievementImages[title]);
        updateStats();
    }
}

function getAchievementBonus(title) {
    switch(title) {
        case "Launis crame sa resistance": return 0.5;
        case "4 PITBULLS": return 10;
        case "Nils Bad": return 40;
        case "Launis femboy": return 50;
        case "4 BULLDOGS": return 10000;
        default: return 0;
    }
}

function checkAchievements() {
    const clLevel = parseInt(clickerLevel.textContent) || 0;
    
    if (clLevel >= 10) unlockAchievement("Launis crame sa resistance");
    if (nilsLevel >= 1) unlockAchievement("4 PITBULLS");
    if (nilsLevel >= 50) unlockAchievement("Nils Bad");
    if (clLevel >= 20) unlockAchievement("Launis femboy");
    if (lorisLevel >= 20) unlockAchievement("4 BULLDOGS");
}

// ===== MISE À JOUR AUTOMATIQUE =====
function updateStats() {
    document.getElementById('mpc-display').textContent = formatNumber(mpc.toFixed(2));
    const mps = miloLevel * miloIncomePerLevel + 
               emileLevel * emileIncomePerLevel + 
               adrienLevel * adrienIncomeperlevel +
               lorisLevel * lorisIncomePerLevel + 
               lutherLevel * lutherIncomeperLevel +
               mpsBonus + 
               achievementBonus;
    document.getElementById('mps-display').textContent = formatNumber(mps.toFixed(2));
}

setInterval(() => {
    const income = miloLevel * miloIncomePerLevel + 
                  emileLevel * emileIncomePerLevel + 
                  adrienLevel * adrienIncomeperlevel +
                  lorisLevel * lorisIncomePerLevel +
                  lutherLevel * lutherIncomeperLevel +                  
                  mpsBonus + 
                  achievementBonus;
    let currentMoney = parseFormattedNumber(Money.textContent);
    currentMoney += income;
    Money.textContent = formatNumber(currentMoney);
    updateStats();
}, 1000);

// ===== INITIALISATION =====
if (Money.textContent.trim() === '') {
    Money.textContent = formatNumber(10000000);
} else {
    Money.textContent = formatNumber(parseFormattedNumber(Money.textContent));
}

function toggleAchievements() {
    const achievementsList = document.querySelector('.achievements-list');
    const arrow = document.querySelector('.arrow');
    
    achievementsList.classList.toggle('hidden');
    arrow.textContent = achievementsList.classList.contains('hidden') ? '▼' : '▲';
    
    if (!achievementsList.classList.contains('hidden')) {
        setTimeout(() => {
            achievementsList.scrollTop = achievementsList.scrollHeight;
        }, 100);
    }
}

updateStats();

document.querySelector('.Money-image').addEventListener('click', function() {
    this.style.animation = 'moneyClick 0.2s ease';
    setTimeout(() => this.style.animation = '', 200);
});