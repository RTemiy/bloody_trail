/*
REQUIRES:
entities.js
interface.js
script.js
*/
//VARIABLES
var UMI = {};
var RPS = new RockPaperScissors('Random');
var Player = new Character({
    name: "🌡 Показатели персонажа:",
    level: 1,
    type: "Player",
    money: 0,
    health: 100,
    armor: 0,
    damage: 1,
    stress: 0,
    poison: 0,
    hunger: 100,
    strength: 0,
    agility: 0,
    intellegence: 0,
    charisma: 0,
    luck: 0,
    inventory: new Inventory(9),
});

//PROGRAM BODY
function InitDialog() {
    UMI.DialogBlock = new Element("div", "DialogBlock", false);
    UMI.DialogBlock.SetAttribute("class", "dialogblock");
    UMI.DialogTitle = new Element("p", "DialogTitle");
    new Element("hr");
    UMI.Dialog = new Element("p", "Dialog");
    new Element("hr");
    UMI.SelectionButtons = [];
    for (var u = 0; u < 5; u++) {
        UMI.SelectionButtons.push(new Element("button", "SelectionButton" + u));
    }
    UMI.DialogBlock.Close();
}

function InitPlayerStats() {
    UMI.PlayerBlock = new Element("div", "PlayerBlock", false);
    UMI.PlayerBlock.SetAttribute("class", "playerblock");
    UMI.PlayerMenu = new Element('p', 'PlayerMenu');
    UMI.PlayerMenu.Change("innerHTML", "👤 Игрок");
    new Element("hr");
    UMI.PlayerLevelIcon = new Element("a", "PLI");
    UMI.PlayerLevelIcon.Change("innerHTML", "🏆 ");
    UMI.PlayerLevel = new Element('a', 'PLevel');
    UMI.PlayerLevel.SetAttribute("class", "healthbar");
    UMI.PlayerMoneyIcon = new Element("a", "PMI");
    UMI.PlayerMoneyIcon.Change("innerHTML", "⠀| 💰 ");
    UMI.PlayerMoney = new Element('a', 'PMoney');
    UMI.PlayerDamageIcon = new Element("a", "PDI");
    UMI.PlayerDamageIcon.Change("innerHTML", "⠀| ⚔️");
    UMI.PlayerDamage = new Element('a', 'PDamage');
    new Element("hr");
    UMI.PlayerHealth = new Element('a', 'PHealth');
    UMI.PlayerHealth.SetAttribute("class", "healthbar");
    UMI.PlayerHealth.Change("innerHTML", " ❤️ ");
    UMI.HealthBar = new Element("a", "HealthBar");
    UMI.HealthBar.SetAttribute("class", "healthbar");
    UMI.PlayerHunger = new Element('a', 'PHunger');
    UMI.PlayerHunger.Change('innerHTML', "⠀| 🍴 ");
    UMI.PlayerHunger.SetAttribute("class", "healthbar");
    UMI.HungerBar = new Element("a", "HungerBar");
    UMI.HungerBar.SetAttribute("class", "healthbar");
    UMI.PlayerStress = new Element('a', 'PStress');
    UMI.PlayerStress.SetAttribute("class", "healthbar");
    UMI.PlayerStress.Change("innerHTML", "⠀| 🤯 ");
    UMI.StressBar = new Element("a", "StressBar");
    UMI.StressBar.SetAttribute("class", "healthbar");
    UMI.PlayerPoison = new Element('a', 'PPoison');
    UMI.PlayerPoison.SetAttribute("class", "healthbar");
    UMI.PlayerPoison.Change("innerHTML", "⠀| 🤢 ");
    UMI.PoisonBar = new Element("a", "PoisonBar");
    UMI.PoisonBar.SetAttribute("class", "healthbar");
    new Element("p");
    new Element("hr");
    UMI.PlayerStrengthIcon = new Element("a", "PStrength");
    UMI.PlayerStrengthIcon.Change("innerHTML", "💪 ");
    UMI.PlayerStrength = new Element("a", "PlayerStrength");
    UMI.PlayerAgilityIcon = new Element("a", "PAgility");
    UMI.PlayerAgilityIcon.Change("innerHTML", "⠀| 🦶 ");
    UMI.PlayerAgility = new Element("a", "PlayerAgility");
    UMI.PlayerIntellegenceIcon = new Element("a", "PInt");
    UMI.PlayerIntellegenceIcon.Change("innerHTML", "⠀| 🧠 ");
    UMI.PlayerIntellegence = new Element("a", "PlayerIntellegence");
    UMI.PlayerCharismaIcon = new Element("a", "PChar");
    UMI.PlayerCharismaIcon.Change("innerHTML", "⠀| 🤝 ");
    UMI.PlayerCharisma = new Element("a", "PlayerCharisma");
    UMI.PlayerLuckIcon = new Element("a", "PLuck");
    UMI.PlayerLuckIcon.Change("innerHTML", "⠀| 🍀 ");
    UMI.PlayerLuck = new Element("a", "PlayerLuck");
    new Element("p");
    new Element("hr");
    UMI.PlayerArmorIcon = new Element("a", "PAI");
    UMI.PlayerArmorIcon.Change("innerHTML", " 🎽 ");
    UMI.PlayerArmor = new Element('a', 'PArmor');
    UMI.PlayerArmor.SetAttribute("class", "healthbar");
    UMI.PlayerScoreIcon = new Element("a", "PScoreI");
    UMI.PlayerScoreIcon.Change("innerHTML", "⠀| 👣 ");
    UMI.PlayerScore = new Element('a', 'score');
    UMI.PlayerScore.SetAttribute("class", "healthbar");
    UMI.PlayerBlock.Close();
}

function InitInventory() {
    UMI.InventoryBlock = new Element("div", "InventoryBlock", false);
    UMI.InventoryBlock.SetAttribute("class", "invblock");
    UMI.PlayerMenuInventory = new Element("p", "PlayerMenuInventory");
    UMI.PlayerMenuInventory.Change("innerHTML", "🎒 Рюкзак");
    new Element("hr");
    UMI.PlayerInventory = [];
    for (x = 0; x < Player.Bag.MaxCells; x++) {
        UMI.PlayerInventory.push(new Element('button', 'inv' + x));
        UMI.PlayerInventory[x].SetAttribute("class", "invitem");
        UMI.PlayerInventory[x].SetAttribute("onclick", "Player.Use(Player.Bag.Items[" + x + "]);");
    }
    UMI.InventoryBlock.Close();
}
//()=>{return()}
function SetReferences() {
    //Title and text
    UMI.DialogTitle.SetRef(() => {
        return (Script[Script.Actual].Name)
    });
    UMI.Dialog.SetRef(() => {
        return (Script[Script.Actual].Text)
    });
    //Buttons
    UMI.SelectionButtons[0].SetRef(
        () => { return (Script[Script.Actual].ButtonText[0]) },
        () => { return (Script[Script.Actual].ButtonAction[0]) },
        "hidden",
        () => { return (Script[Script.Actual].ButtonActive[0]) }
    );
    UMI.SelectionButtons[1].SetRef(
        () => { return (Script[Script.Actual].ButtonText[1]) },
        () => { return (Script[Script.Actual].ButtonAction[1]) },
        "hidden",
        () => { return (Script[Script.Actual].ButtonActive[1]) }
    );
    UMI.SelectionButtons[2].SetRef(
        () => { return (Script[Script.Actual].ButtonText[2]) },
        () => { return (Script[Script.Actual].ButtonAction[2]) },
        "hidden",
        () => { return (Script[Script.Actual].ButtonActive[2]) },
    );
    UMI.SelectionButtons[3].SetRef(
        () => { return (Script[Script.Actual].ButtonText[3]) },
        () => { return (Script[Script.Actual].ButtonAction[3]) },
        "hidden",
        () => { return (Script[Script.Actual].ButtonActive[3]) }
    );
    UMI.SelectionButtons[4].SetRef(
        () => { return (Script[Script.Actual].ButtonText[4]) },
        () => { return (Script[Script.Actual].ButtonAction[4]) },
        "hidden",
        () => { return (Script[Script.Actual].ButtonActive[4]) }
    );
    //RockPaperScissors
    UMI.RPSEnemyScore.SetRef(() => {
        return (RPS.enemyScore)
    });
    UMI.RPSPlayerScore.SetRef(() => {
        return (RPS.playerScore)
    });
    UMI.RPSEnemyTurn.SetRef(() => {
        return (RPS.enemyTurn)
    });
    UMI.RPSPlayerTurn.SetRef(() => {
        return (RPS.playerTurn)
    });
    //PlayerStatistics
    UMI.PlayerLevel.SetRef(() => {
        return (Player.Level)
    });
    UMI.PlayerMoney.SetRef(() => {
        return (Player.Money)
    });
    UMI.PlayerDamage.SetRef(() => {
        return (Player.Damage)
    });
    UMI.HealthBar.SetRef(() => {
        return (Player.Health)
    });
    UMI.HungerBar.SetRef(() => {
        return (Player.Hunger)
    });
    UMI.StressBar.SetRef(() => {
        return (Player.Stress)
    });
    UMI.PoisonBar.SetRef(() => {
        return (Player.Poison)
    });
    UMI.PlayerMenu.SetRef(() => {
        return (Player.Name)
    });
    UMI.PlayerStrength.SetRef(() => {
        return (Player.Strength)
    });
    UMI.PlayerAgility.SetRef(() => {
        return (Player.Agility)
    });
    UMI.PlayerIntellegence.SetRef(() => {
        return (Player.Intellegence)
    });
    UMI.PlayerCharisma.SetRef(() => {
        return (Player.Charisma)
    });
    UMI.PlayerLuck.SetRef(() => {
        return (Player.Luck)
    });
    UMI.PlayerArmor.SetRef(() => {
        return (Player.Armor)
    });
    UMI.PlayerScore.SetRef(() => {
        return (Player.Score)
    });
    //PlayerBag
    UMI.PlayerInventory[0].SetRef(() => {
        return (Player.Bag.Items[0].Icon)
    });
    UMI.PlayerInventory[1].SetRef(() => {
        return (Player.Bag.Items[1].Icon)
    });
    UMI.PlayerInventory[2].SetRef(() => {
        return (Player.Bag.Items[2].Icon)
    });
    UMI.PlayerInventory[3].SetRef(() => {
        return (Player.Bag.Items[3].Icon)
    });
    UMI.PlayerInventory[4].SetRef(() => {
        return (Player.Bag.Items[4].Icon)
    });
    UMI.PlayerInventory[5].SetRef(() => {
        return (Player.Bag.Items[5].Icon)
    });
    UMI.PlayerInventory[6].SetRef(() => {
        return (Player.Bag.Items[6].Icon)
    });
    UMI.PlayerInventory[7].SetRef(() => {
        return (Player.Bag.Items[7].Icon)
    });
    UMI.PlayerInventory[8].SetRef(() => {
        return (Player.Bag.Items[8].Icon)
    });
}

function InitRPS() {
    UMI.RPSBlock = new Element("div", "RPSBlock", false);
    UMI.RPSBlock.SetAttribute("class", "playerblock");
    UMI.RPSBlock.Change("align", "middle");
    UMI.RPSMenu = new Element('p', 'RPSMenu');
    UMI.RPSMenu.Change("innerHTML", "Камень, ножницы, бумага");
    new Element("hr");
    UMI.RPSPlayer = new Element('a', 'RPSPlayer');
    UMI.RPSPlayer.Change("innerHTML", "Игрок ");
    UMI.RPSPlayerScore = new Element('a', 'RPSPlayerScore');
    UMI.RPSDD = new Element('a', 'RPSDD');
    UMI.RPSDD.Change("innerHTML", ":");
    UMI.RPSEnemyScore = new Element('a', 'RPSEnemyScore');
    UMI.RPSEnemy = new Element('a', 'RPSEnemy');
    UMI.RPSEnemy.Change("innerHTML", " Противник");
    new Element("hr");
    UMI.RPSPlayerTurn = new Element('a', 'RPSPlayerTurn');
    UMI.RPSPlayerTurn.SetAttribute("class", "invitem");
    UMI.RPSStick = new Element('a', 'RPSStick');
    UMI.RPSStick.Change("innerHTML", "|");
    UMI.RPSStick.SetAttribute("class", "invitem");
    UMI.RPSEnemyTurn = new Element('a', 'RPSEnemyTurn');
    UMI.RPSEnemyTurn.SetAttribute("class", "invitem");
    new Element("hr");
    UMI.RockButton = new Element("button", "RockButton");
    UMI.RockButton.Change("innerHTML", "✊");
    UMI.RockButton.SetAttribute("class", "invitem");
    UMI.RockButton.SetAttribute("onclick", "RPS.PlayerTurn('✊')");
    UMI.ScissorsButton = new Element("button", "ScissorsButton");
    UMI.ScissorsButton.Change("innerHTML", "✌️");
    UMI.ScissorsButton.SetAttribute("class", "invitem");
    UMI.ScissorsButton.SetAttribute("onclick", "RPS.PlayerTurn('✌️')");
    UMI.PaperButton = new Element("button", "PaperButton");
    UMI.PaperButton.Change("innerHTML", "✋");
    UMI.PaperButton.SetAttribute("class", "invitem");
    UMI.PaperButton.SetAttribute("onclick", "RPS.PlayerTurn('✋')");
    UMI.RPSBlock.Close();
    UMI.RPSBlock.HideOrNot(true);
    //🪨✂️📄 || ✊✌️✋
}

function CreateInterface() {
    InitDialog();
    InitRPS();
    InitPlayerStats();
    InitInventory();
    SetReferences();
    setInterval(() => Player.LiveLife(), 2000);
    UMI.Version = new Element("a", "Version");
    UMI.Version.Change("innerHTML", "version: 🎲0.02rps");
}

function Main() {
    CreateInterface();
    Script.Set("Q01");

}

Main();
