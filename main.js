/*
REQUIRES:
entities.js
interface.js
script.js
*/
//VARIABLES
var UMI = new Interface();
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
    luck: 0,
    inventory: new Inventory(9),
});

//PROGRAM BODY
function InitDialog() {
    UMI.Element.DialogBlock = new Element("div", "DialogBlock", false);
    UMI.Element.DialogBlock.SetAttribute("class", "dialogblock");
    UMI.Element.DialogTitle = new Element("p", "DialogTitle");
    new Element("hr");
    UMI.Element.Dialog = new Element("p", "Dialog");
    new Element("hr");
    UMI.Elements.SelectionButtons = [];
    for (var u = 0; u < 5; u++) {
        UMI.Elements.SelectionButtons.push(new Element("button", "SelectionButton" + u));
    }
    UMI.Element.DialogBlock.Close();
}

function InitPlayerStats() {
    UMI.Element.PlayerBlock = new Element("div", "PlayerBlock", false);
    UMI.Element.PlayerBlock.SetAttribute("class", "playerblock");
    UMI.Element.PlayerMenu = new Element('p', 'PlayerMenu');
    UMI.Element.PlayerMenu.Change("innerHTML", "👤 Игрок");
    new Element("hr");
    UMI.Element.PlayerLevelIcon = new Element("a", "PLI");
    UMI.Element.PlayerLevelIcon.Change("innerHTML", "🏆 ");
    UMI.Element.PlayerLevel = new Element('a', 'PLevel');
    UMI.Element.PlayerLevel.SetAttribute("class", "healthbar");
    UMI.Element.PlayerMoneyIcon = new Element("a", "PMI");
    UMI.Element.PlayerMoneyIcon.Change("innerHTML", "⠀| 💰 ");
    UMI.Element.PlayerMoney = new Element('a', 'PMoney');
    UMI.Element.PlayerDamageIcon = new Element("a", "PDI");
    UMI.Element.PlayerDamageIcon.Change("innerHTML", "⠀| ⚔️");
    UMI.Element.PlayerDamage = new Element('a', 'PDamage');
    new Element("hr");
    UMI.Element.PlayerHealth = new Element('a', 'PHealth');
    UMI.Element.PlayerHealth.SetAttribute("class", "healthbar");
    UMI.Element.PlayerHealth.Change("innerHTML", " ❤️ ");
    UMI.Element.HealthBar = new Element("a", "HealthBar");
    UMI.Element.HealthBar.SetAttribute("class", "healthbar");
    UMI.Element.PlayerHunger = new Element('a', 'PHunger');
    UMI.Element.PlayerHunger.Change('innerHTML', "⠀| 🍴 ");
    UMI.Element.PlayerHunger.SetAttribute("class", "healthbar");
    UMI.Element.HungerBar = new Element("a", "HungerBar");
    UMI.Element.HungerBar.SetAttribute("class", "healthbar");
    UMI.Element.PlayerStress = new Element('a', 'PStress');
    UMI.Element.PlayerStress.SetAttribute("class", "healthbar");
    UMI.Element.PlayerStress.Change("innerHTML", "⠀| 🤯 ");
    UMI.Element.StressBar = new Element("a", "StressBar");
    UMI.Element.StressBar.SetAttribute("class", "healthbar");
    UMI.Element.PlayerPoison = new Element('a', 'PPoison');
    UMI.Element.PlayerPoison.SetAttribute("class", "healthbar");
    UMI.Element.PlayerPoison.Change("innerHTML", "⠀| 🤢 ");
    UMI.Element.PoisonBar = new Element("a", "PoisonBar");
    UMI.Element.PoisonBar.SetAttribute("class", "healthbar");
    new Element("p");
    new Element("hr");
    UMI.Element.PlayerStrengthIcon = new Element("a", "PStrength");
    UMI.Element.PlayerStrengthIcon.Change("innerHTML", "💪 ");
    UMI.Element.PlayerStrength = new Element("a", "PlayerStrength");
    UMI.Element.PlayerAgilityIcon = new Element("a", "PAgility");
    UMI.Element.PlayerAgilityIcon.Change("innerHTML", "⠀| 🦶 ");
    UMI.Element.PlayerAgility = new Element("a", "PlayerAgility");
    UMI.Element.PlayerIntellegenceIcon = new Element("a", "PInt");
    UMI.Element.PlayerIntellegenceIcon.Change("innerHTML", "⠀| 🧠 ");
    UMI.Element.PlayerIntellegence = new Element("a", "PlayerIntellegence");
    UMI.Element.PlayerLuckIcon = new Element("a", "PLuck");
    UMI.Element.PlayerLuckIcon.Change("innerHTML", "⠀| 🍀 ");
    UMI.Element.PlayerLuck = new Element("a", "PlayerLuck");
    new Element("p");
    new Element("hr");
    UMI.Element.PlayerArmorIcon = new Element("a", "PAI");
    UMI.Element.PlayerArmorIcon.Change("innerHTML", " 🎽 ");
    UMI.Element.PlayerArmor = new Element('a', 'PArmor');
    UMI.Element.PlayerArmor.SetAttribute("class", "healthbar");
    UMI.Element.PlayerScoreIcon = new Element("a", "PScoreI");
    UMI.Element.PlayerScoreIcon.Change("innerHTML", "⠀| 👣 ");
    UMI.Element.PlayerScore = new Element('a', 'score');
    UMI.Element.PlayerScore.SetAttribute("class", "healthbar");
    UMI.Element.PlayerBlock.Close();
}

function InitInventory() {
    UMI.Element.InventoryBlock = new Element("div", "InventoryBlock", false);
    UMI.Element.InventoryBlock.SetAttribute("class", "invblock");
    UMI.Element.PlayerMenuInventory = new Element("p", "PlayerMenuInventory");
    UMI.Element.PlayerMenuInventory.Change("innerHTML", "🎒 Рюкзак");
    new Element("hr");
    UMI.Elements.PlayerInventory = [];
    for (x = 0; x < Player.Bag.MaxCells; x++) {
        UMI.Elements.PlayerInventory.push(new Element('button', 'inv' + x));
        UMI.Elements.PlayerInventory[x].SetAttribute("class", "invitem");
        UMI.Elements.PlayerInventory[x].SetAttribute("onclick", "Player.Use(Player.Bag.Items[" + x + "]);");
    }
    UMI.Element.InventoryBlock.Close();
}
//()=>{return()}
function SetReferences() {
    //RockPaperScissors
    UMI.Element.RPSEnemyScore.SetRef(() => {
        return (RPS.enemyScore)
    });
    UMI.Element.RPSPlayerScore.SetRef(() => {
        return (RPS.playerScore)
    });
    UMI.Element.RPSEnemyTurn.SetRef(() => {
        return (RPS.enemyTurn)
    });
    UMI.Element.RPSPlayerTurn.SetRef(() => {
        return (RPS.playerTurn)
    });
    //PlayerStatistics
    UMI.Element.PlayerLevel.SetRef(() => {
        return (Player.Level)
    });
    UMI.Element.PlayerMoney.SetRef(() => {
        return (Player.Money)
    });
    UMI.Element.PlayerDamage.SetRef(() => {
        return (Player.Damage)
    });
    UMI.Element.HealthBar.SetRef(() => {
        return (Player.Health)
    });
    UMI.Element.HungerBar.SetRef(() => {
        return (Player.Hunger)
    });
    UMI.Element.StressBar.SetRef(() => {
        return (Player.Stress)
    });
    UMI.Element.PoisonBar.SetRef(() => {
        return (Player.Poison)
    });
    UMI.Element.PlayerMenu.SetRef(() => {
        return (Player.Name)
    });
    UMI.Element.PlayerStrength.SetRef(() => {
        return (Player.Strength)
    });
    UMI.Element.PlayerAgility.SetRef(() => {
        return (Player.Agility)
    });
    UMI.Element.PlayerIntellegence.SetRef(() => {
        return (Player.Intellegence)
    });
    UMI.Element.PlayerLuck.SetRef(() => {
        return (Player.Luck)
    });
    UMI.Element.PlayerArmor.SetRef(() => {
        return (Player.Armor)
    });
    UMI.Element.PlayerScore.SetRef(() => {
        return (Player.Score)
    });
    //PlayerBag
    UMI.Elements.PlayerInventory[0].SetRef(() => {
        return (Player.Bag.Items[0].Icon)
    });
    UMI.Elements.PlayerInventory[1].SetRef(() => {
        return (Player.Bag.Items[1].Icon)
    });
    UMI.Elements.PlayerInventory[2].SetRef(() => {
        return (Player.Bag.Items[2].Icon)
    });
    UMI.Elements.PlayerInventory[3].SetRef(() => {
        return (Player.Bag.Items[3].Icon)
    });
    UMI.Elements.PlayerInventory[4].SetRef(() => {
        return (Player.Bag.Items[4].Icon)
    });
    UMI.Elements.PlayerInventory[5].SetRef(() => {
        return (Player.Bag.Items[5].Icon)
    });
    UMI.Elements.PlayerInventory[6].SetRef(() => {
        return (Player.Bag.Items[6].Icon)
    });
    UMI.Elements.PlayerInventory[7].SetRef(() => {
        return (Player.Bag.Items[7].Icon)
    });
    UMI.Elements.PlayerInventory[8].SetRef(() => {
        return (Player.Bag.Items[8].Icon)
    });
}

function InitRPS() {
    UMI.Element.RPSBlock = new Element("div", "RPSBlock", false);
    UMI.Element.RPSBlock.SetAttribute("class", "playerblock");
    UMI.Element.RPSBlock.Change("align", "middle");
    UMI.Element.RPSMenu = new Element('p', 'RPSMenu');
    UMI.Element.RPSMenu.Change("innerHTML", "Камень, ножницы, бумага");
    new Element("hr");
    UMI.Element.RPSPlayer = new Element('a', 'RPSPlayer');
    UMI.Element.RPSPlayer.Change("innerHTML", "Игрок ");
    UMI.Element.RPSPlayerScore = new Element('a', 'RPSPlayerScore');
    UMI.Element.RPSDD = new Element('a', 'RPSDD');
    UMI.Element.RPSDD.Change("innerHTML", ":");
    UMI.Element.RPSEnemyScore = new Element('a', 'RPSEnemyScore');
    UMI.Element.RPSEnemy = new Element('a', 'RPSEnemy');
    UMI.Element.RPSEnemy.Change("innerHTML", " Противник");
    new Element("hr");
    UMI.Element.RPSPlayerTurn = new Element('a', 'RPSPlayerTurn');
    UMI.Element.RPSPlayerTurn.SetAttribute("class", "invitem");
    UMI.Element.RPSStick = new Element('a', 'RPSStick');
    UMI.Element.RPSStick.Change("innerHTML", "|");
    UMI.Element.RPSStick.SetAttribute("class", "invitem");
    UMI.Element.RPSEnemyTurn = new Element('a', 'RPSEnemyTurn');
    UMI.Element.RPSEnemyTurn.SetAttribute("class", "invitem");
    new Element("hr");
    UMI.Element.RockButton = new Element("button", "RockButton");
    UMI.Element.RockButton.Change("innerHTML", "✊");
    UMI.Element.RockButton.SetAttribute("class", "invitem");
    UMI.Element.RockButton.SetAttribute("onclick", "RPS.PlayerTurn('✊')");
    UMI.Element.ScissorsButton = new Element("button", "ScissorsButton");
    UMI.Element.ScissorsButton.Change("innerHTML", "✌️");
    UMI.Element.ScissorsButton.SetAttribute("class", "invitem");
    UMI.Element.ScissorsButton.SetAttribute("onclick", "RPS.PlayerTurn('✌️')");
    UMI.Element.PaperButton = new Element("button", "PaperButton");
    UMI.Element.PaperButton.Change("innerHTML", "✋");
    UMI.Element.PaperButton.SetAttribute("class", "invitem");
    UMI.Element.PaperButton.SetAttribute("onclick", "RPS.PlayerTurn('✋')");
    UMI.Element.RPSBlock.Close();
    UMI.Element.RPSBlock.HideOrNot(true);
    //🪨✂️📄 || ✊✌️✋
}

function CreateInterface() {
    InitDialog();
    InitRPS();
    InitPlayerStats();
    InitInventory();
    SetReferences();
    setInterval(() => UMI.Refresh(), 100);
    setInterval(() => Player.LiveLife(), 2000);
    UMI.Element.Version = new Element("a", "Version");
    UMI.Element.Version.Change("innerHTML", "version: 🎲0.02rps");
}

function Main() {
    CreateInterface();
    Q01.Set();

}

Main();
