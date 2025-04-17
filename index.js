let Money = document.querySelector('.money-number');
let Clickercost = document.querySelector('.Clicker-cost');
let clickerLevel = document.querySelector(".clicker-level");
let clickerIncrease = document.querySelector(".clicker-increase");

let parsedClickercost = parseFloat(Clickercost.innerHTML);
let parsedClickerIncrease = parseFloat(clickerIncrease.innerHTML);

let emileLevel = 0;
let emileIncomePerLevel = 0.5;

let miloLevel = 0;
let miloIncomePerLevel = 1;

let mpc = 1;
let mpsBonus = 0;
let achievementBonus = 0;
let achievementsUnlocked = [];

let nilsCost = 50;
let nilsLevel = 0;
let nilsIncrease = 2;

// === CLIC ===
function incrementMoney() {
    let currentMoney = parseFloat(Money.innerText) || 0;
    currentMoney += mpc;
    Money.innerText = Math.round(currentMoney);
    checkAchievements();
}

// === CLICKER ===
function buyClicker() {
    let currentMoney = parseFloat(Money.innerText) || 0;

    if (currentMoney >= parsedClickercost) {
        currentMoney -= parsedClickercost;
        Money.innerText = Math.round(currentMoney);

        let currentLevel = parseInt(clickerLevel.innerText) || 0;
        currentLevel += 1;
        clickerLevel.innerText = currentLevel;

        if (currentLevel === 10) {
            document.querySelector('.upgrade.milo').classList.remove('hidden');
        }

        let upgradeBox = document.querySelector('.upgrade');
        if (currentLevel >= 100) {
            upgradeBox.classList.remove('level-10', 'level-50');
            upgradeBox.classList.add('level-100');
        } else if (currentLevel >= 50) {
            upgradeBox.classList.remove('level-10', 'level-100');
            upgradeBox.classList.add('level-50');
        } else if (currentLevel >= 10) {
            upgradeBox.classList.remove('level-50', 'level-100');
            upgradeBox.classList.add('level-10');
        } else {
            upgradeBox.classList.remove('level-10', 'level-50', 'level-100');
        }

        parsedClickerIncrease = parseFloat((parsedClickerIncrease * 1.03).toFixed(2));
        clickerIncrease.innerText = parsedClickerIncrease;
        mpc += parsedClickerIncrease;

        parsedClickercost *= 1.2;
        Clickercost.innerText = Math.round(parsedClickercost);

        checkAchievements();
    }
}

// === MILO ===
function buyMilo() {
    let currentMoney = parseFloat(Money.innerText) || 0;
    let miloCostElement = document.querySelector('.Milo-cost');
    let miloLevelElement = document.querySelector('.Milo-level');
    let miloIncreaseElement = document.querySelector('.Milo-increase');

    let miloCost = parseFloat(miloCostElement.innerText) || 30;

    if (currentMoney >= miloCost) {
        currentMoney -= miloCost;
        Money.innerText = Math.round(currentMoney);

        miloLevel += 1;
        miloLevelElement.innerText = miloLevel;

        if (miloLevel === 30) {
            document.querySelector('.upgrade.emile').classList.remove('hidden');
        }

        miloIncreaseElement.innerText = (miloLevel * miloIncomePerLevel).toFixed(2);

        miloCost *= 1.5;
        miloCostElement.innerText = Math.round(miloCost);

        let miloBox = document.querySelector('.upgrade.milo');
        miloBox.classList.remove('level-10', 'level-50', 'level-100');
        if (miloLevel >= 100) miloBox.classList.add('level-100');
        else if (miloLevel >= 50) miloBox.classList.add('level-50');
        else if (miloLevel >= 10) miloBox.classList.add('level-10');

        checkAchievements();
    }
}

// === EMILE ===
function buyEmile() {
    let currentMoney = parseFloat(Money.innerText) || 0;
    let emileCostElement = document.querySelector('.emile-cost');
    let emileLevelElement = document.querySelector('.emile-level');
    let emileIncreaseElement = document.querySelector('.emile-increase');

    let emileCost = parseFloat(emileCostElement.innerText) || 40;

    if (currentMoney >= emileCost) {
        currentMoney -= emileCost;
        Money.innerText = Math.round(currentMoney);

        emileLevel += 1;
        emileLevelElement.innerText = emileLevel;

        emileIncreaseElement.innerText = (emileLevel * emileIncomePerLevel).toFixed(2);

        emileCost *= 1.2;
        emileCostElement.innerText = Math.round(emileCost);

        if (emileLevel >= 25) {
            document.querySelector('.nils').classList.remove('hidden');
        }

        let emileBox = document.querySelector('.upgrade.emile');
        emileBox.classList.remove('level-10', 'level-50', 'level-100');
        if (emileLevel >= 100) emileBox.classList.add('level-100');
        else if (emileLevel >= 50) emileBox.classList.add('level-50');
        else if (emileLevel >= 10) emileBox.classList.add('level-10');

        checkAchievements();
    }
}

function buyNils() {
    let currentMoney = parseFloat(Money.innerText) || 0;

    if (currentMoney >= nilsCost) {
        currentMoney -= nilsCost;
        Money.innerText = Math.round(currentMoney);

        nilsLevel++;
        document.querySelector('.nils-level').innerText = nilsLevel;
        document.querySelector('.nils-increase').innerText = nilsIncrease * nilsLevel;

        nilsCost = Math.floor(nilsCost * 1.2);
        document.querySelector('.nils-cost').innerText = nilsCost;

        let nilsBox = document.querySelector('.upgrade.nils');
        nilsBox.classList.remove('level-10', 'level-50', 'level-100');
        if (nilsLevel >= 100) nilsBox.classList.add('level-100');
        else if (nilsLevel >= 50) nilsBox.classList.add('level-50');
        else if (nilsLevel >= 10) nilsBox.classList.add('level-10');

        increaseMoneyPerClick(nilsIncrease * nilsLevel);

        checkAchievements();
    }
}

// === CLIC BONUS ===
function increaseMoneyPerClick(increase) {
    mpc += increase;
    document.getElementById('mpc-display').innerText = mpc.toFixed(2);
}

// === GAIN PAR SECONDE ===
setInterval(() => {
    let income = miloLevel * miloIncomePerLevel + emileLevel * emileIncomePerLevel + mpsBonus + achievementBonus;
    let currentMoney = parseFloat(Money.innerText) || 0;
    currentMoney += income;
    Money.innerText = Math.round(currentMoney);
    document.getElementById("mps-display").innerText = income.toFixed(2);
}, 1000);

// === STAT UPDATE ===
function mettreAJourStats() {
    document.getElementById('mpc-display').innerText = mpc.toFixed(2);
    let mps = miloLevel * miloIncomePerLevel + emileLevel * emileIncomePerLevel + mpsBonus + achievementBonus;
    document.getElementById('mps-display').innerText = mps.toFixed(2);
}

function unlockAchievement(title, bonus) {
    if (!achievementsUnlocked.includes(title)) {
        achievementsUnlocked.push(title);

        const list = document.querySelector('.achievements-list');
        const div = document.createElement('div');
        div.classList.add('achievement');

        const img = document.createElement('img');
        img.src = achievementImages[title];
        img.alt = title;
        img.classList.add('achievement-icon');

        const text = document.createElement('span');
        text.innerText = `${title} (+${bonus}/sec)`;

        div.appendChild(img);
        div.appendChild(text);
        list.appendChild(div);

        achievementBonus += bonus;
        mettreAJourStats();

        if (title === " 4 PITBULLS ") {
            img.style.width = "70px";
            img.style.height = "50px";
        }
        
    }
}


function checkAchievements() {
    if (parseInt(clickerLevel.innerText) >= 10) {
        unlockAchievement("Launis crame sa resistance", 0.5);
    }
    if (nilsLevel >= 1) {
        unlockAchievement(" 4 PITBULLS ", 10);
    }
}


const achievementImages = {
    "Launis crame sa resistance": "assets/cigarette electronique.png",
    " 4 PITBULLS ": "assets/pitbull.png"
};
