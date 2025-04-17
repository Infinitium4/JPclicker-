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

function incrementMoney() {
    let currentMoney = parseFloat(Money.innerHTML) || 0;
    currentMoney += mpc;
    Money.innerHTML = Math.round(currentMoney);
}

function buyClicker() {
    let currentMoney = parseFloat(Money.innerHTML) || 0;

    if (currentMoney >= parsedClickercost) {
        currentMoney -= parsedClickercost;
        Money.innerHTML = Math.round(currentMoney);

        let currentLevel = parseInt(clickerLevel.innerHTML) || 0;
        currentLevel += 1;
        clickerLevel.innerHTML = currentLevel;
        
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
        clickerIncrease.innerHTML = parsedClickerIncrease;
        mpc += parsedClickerIncrease;

        parsedClickercost *= 1.2;
        Clickercost.innerHTML = Math.round(parsedClickercost);
    }
}

function buyMilo() {
    let currentMoney = parseFloat(Money.innerHTML) || 0;
    let miloCostElement = document.querySelector('.Milo-cost');
    let miloLevelElement = document.querySelector('.Milo-level');
    let miloIncreaseElement = document.querySelector('.Milo-increase');

    let miloCost = parseFloat(miloCostElement.innerHTML) || 10;

    if (currentMoney >= miloCost) {
        currentMoney -= miloCost;
        Money.innerHTML = Math.round(currentMoney);

        miloLevel += 1;
        miloLevelElement.innerHTML = miloLevel;

        if (miloLevel === 30) {
            document.querySelector('.upgrade.emile').classList.remove('hidden');
        }

        miloIncreaseElement.innerHTML = (miloLevel * miloIncomePerLevel).toFixed(2);

        miloCost *= 1.5;
        miloCostElement.innerHTML = Math.round(miloCost);

        let miloBox = document.querySelector('.upgrade.milo');
        if (miloLevel >= 100) {
            miloBox.classList.remove('level-10', 'level-50');
            miloBox.classList.add('level-100');
        } else if (miloLevel >= 50) {
            miloBox.classList.remove('level-10', 'level-100');
            miloBox.classList.add('level-50');
        } else if (miloLevel >= 10) {
            miloBox.classList.remove('level-50', 'level-100');
            miloBox.classList.add('level-10');
        } else {
            miloBox.classList.remove('level-10', 'level-50', 'level-100');
        }
    }
}

function buyEmile() {
    let currentMoney = parseFloat(Money.innerHTML) || 0;
    let emileCostElement = document.querySelector('.emile-cost');
    let emileLevelElement = document.querySelector('.emile-level');
    let emileIncreaseElement = document.querySelector('.emile-increase');

    let emileCost = parseFloat(emileCostElement.innerHTML) || 10;

    if (currentMoney >= emileCost) {
        currentMoney -= emileCost;
        Money.innerHTML = Math.round(currentMoney);

        emileLevel += 1;
        emileLevelElement.innerHTML = emileLevel;

        emileIncreaseElement.innerHTML = (emileLevel * emileIncomePerLevel).toFixed(2);

        emileCost *= 1.2;
        emileCostElement.innerHTML = Math.round(emileCost);

        let emileBox = document.querySelector('.upgrade.emile');
        if (emileLevel >= 100) {
            emileBox.classList.remove('level-10', 'level-50');
            emileBox.classList.add('level-100');
        } else if (emileLevel >= 50) {
            emileBox.classList.remove('level-10', 'level-100');
            emileBox.classList.add('level-50');
        } else if (emileLevel >= 10) {
            emileBox.classList.remove('level-50', 'level-100');
            emileBox.classList.add('level-10');
        } else {
            emileBox.classList.remove('level-10', 'level-50', 'level-100');
        }
    }
}

function mettreAJourStats() {
    document.getElementById('mpc-display').innerText = mpc.toFixed(2);
    let mps = miloLevel * miloIncomePerLevel + emileLevel * emileIncomePerLevel + mpsBonus + achievementBonus;
    document.getElementById('mps-display').innerText = mps.toFixed(2);
}
setInterval(mettreAJourStats, 500);

// === GAIN PAR SECONDE GLOBAL ===
setInterval(() => {
    let income = miloLevel * miloIncomePerLevel + emileLevel * emileIncomePerLevel + mpsBonus + achievementBonus;
    let currentMoney = parseFloat(Money.innerHTML) || 0;
    currentMoney += income;
    Money.innerHTML = Math.round(currentMoney);
    document.getElementById("mps-display").innerHTML = income.toFixed(2);
}, 1000);

// === ACHIEVEMENTS ===

function toggleAchievements() {
    const list = document.querySelector('.achievements-list');
    list.classList.toggle('hidden');
}

function unlockAchievement(title, bonus) {
    if (!achievementsUnlocked.includes(title)) {
        achievementsUnlocked.push(title);

        const list = document.querySelector('.achievements-list');
        const div = document.createElement('div');
        div.classList.add('achievement');
        div.innerText = `Achievement : ${title} (+${bonus} money/sec)`;
        list.appendChild(div);

        mpsBonus += bonus;
    }
}

function checkAchievements() {
    if (clickerLevel.innerHTML >= 10) {
        unlockAchievement("Launis Crame sa CE", 0.5);
    }
}
setInterval(checkAchievements, 1000);
