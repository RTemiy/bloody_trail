/*
REQUIRES:
entities.js
interface.js
script.js
*/
//VARIABLES
var UMI = {};
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
    intelligence: 0,
    charisma: 0,
    luck: 0,
    energy: 100,
    inventory: new Inventory(9),
});

//PROGRAM BODY
function InitDialog() {
    UMI.DialogBlock = new Element("div", "DialogBlock", false);
    InitRPS();
    UMI.DialogBlock.SetAttribute("class", "dialogblock");
    UMI.DialogTitle = new Element("p", "DialogTitle");
    new Element("hr");
    UMI.Dialog = new Element("p", "Dialog");
    UMI.Dialog.SetAttribute("class", "dialog");
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
    UMI.PlayerIntelligenceIcon = new Element("a", "PInt");
    UMI.PlayerIntelligenceIcon.Change("innerHTML", "⠀| 🧠 ");
    UMI.PlayerIntelligence = new Element("a", "PlayerIntelligence");
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
    UMI.PlayerScoreIcon = new Element("a", "PEnergyI");
    UMI.PlayerScoreIcon.Change("innerHTML", "⠀| ⚡️ ");
    UMI.PlayerScore = new Element('a', 'energy');
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
    //PlayerAction
    UMI.DialogBlock.HideOrNot(Player.Completed);
    UMI.RPSBlock.HideOrNot(Script[Script.Actual].RPS.completed);
    //Title and text
    UMI.DialogTitle.SetRef(Script[Script.Actual].Name);
    UMI.Dialog.SetRef(Script[Script.Actual].Text);
    //Buttons
    UMI.SelectionButtons[0].SetRef(
        Script[Script.Actual].ButtonText[0],
        Script[Script.Actual].ButtonAction[0],
        "hidden",
        Script[Script.Actual].ButtonActive[0]
    );
    UMI.SelectionButtons[1].SetRef(Script[Script.Actual].ButtonText[1],
        Script[Script.Actual].ButtonAction[1],
        "hidden",
        Script[Script.Actual].ButtonActive[1]);
    UMI.SelectionButtons[2].SetRef(
        Script[Script.Actual].ButtonText[2],
        Script[Script.Actual].ButtonAction[2],
        "hidden",
        Script[Script.Actual].ButtonActive[2],
    );
    UMI.SelectionButtons[3].SetRef(
        Script[Script.Actual].ButtonText[3],
        Script[Script.Actual].ButtonAction[3],
        "hidden",
        Script[Script.Actual].ButtonActive[3]);
    UMI.SelectionButtons[4].SetRef(
        Script[Script.Actual].ButtonText[4],
        Script[Script.Actual].ButtonAction[4],
        "hidden",
        Script[Script.Actual].ButtonActive[4]);
    //RockPaperScissors ✊✌️✋
    UMI.RPSEnemyScore.SetRef(Script[Script.Actual].RPS.enemyScore);
    UMI.RPSPlayerScore.SetRef(Script[Script.Actual].RPS.playerScore);
    UMI.RPSEnemyTurn.SetRef(Script[Script.Actual].RPS.enemyTurn);
    UMI.RPSPlayerTurn.SetRef(Script[Script.Actual].RPS.playerTurn);
    UMI.ScissorsButton.SetAttribute("onclick", "Script[Script.Actual].RPS.PlayerTurn('✌️')");
    UMI.PaperButton.SetAttribute("onclick", "Script[Script.Actual].RPS.PlayerTurn('✋')");
    UMI.RockButton.SetAttribute("onclick", "Script[Script.Actual].RPS.PlayerTurn('✊')");
    //PlayerStatistics 
    UMI.PlayerLevel.SetRef(Player.Level);
    UMI.PlayerMoney.SetRef(Player.Money);
    UMI.PlayerDamage.SetRef(Player.Damage);
    UMI.HealthBar.SetRef(Player.Health);
    UMI.HungerBar.SetRef(Player.Hunger);
    UMI.StressBar.SetRef(Player.Stress);
    UMI.PoisonBar.SetRef(Player.Poison);
    UMI.PlayerMenu.SetRef(Player.Name);
    UMI.PlayerStrength.SetRef(Player.Strength);
    UMI.PlayerAgility.SetRef(Player.Agility);
    UMI.PlayerIntelligence.SetRef(Player.Intelligence);
    UMI.PlayerCharisma.SetRef(Player.Charisma);
    UMI.PlayerLuck.SetRef(Player.Luck);
    UMI.PlayerArmor.SetRef(Player.Armor);
    UMI.PlayerScore.SetRef(Player.Energy);
    //PlayerBag
    UMI.PlayerInventory[0].SetRef(Player.Bag.Items[0].Icon);
    UMI.PlayerInventory[1].SetRef(Player.Bag.Items[1].Icon);
    UMI.PlayerInventory[2].SetRef(Player.Bag.Items[2].Icon);
    UMI.PlayerInventory[3].SetRef(Player.Bag.Items[3].Icon);
    UMI.PlayerInventory[4].SetRef(Player.Bag.Items[4].Icon);
    UMI.PlayerInventory[5].SetRef(Player.Bag.Items[5].Icon);
    UMI.PlayerInventory[6].SetRef(Player.Bag.Items[6].Icon);
    UMI.PlayerInventory[7].SetRef(Player.Bag.Items[7].Icon);
    UMI.PlayerInventory[8].SetRef(Player.Bag.Items[8].Icon);
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
    UMI.ScissorsButton = new Element("button", "ScissorsButton");
    UMI.ScissorsButton.Change("innerHTML", "✌️");
    UMI.ScissorsButton.SetAttribute("class", "invitem");
    
    UMI.PaperButton = new Element("button", "PaperButton");
    UMI.PaperButton.Change("innerHTML", "✋");
    UMI.PaperButton.SetAttribute("class", "invitem");
    UMI.RPSBlock.Close();
    UMI.RPSBlock.HideOrNot(true);
}

function CreateInterface() {
    InitDialog();
    InitPlayerStats();
    InitInventory();
    setInterval(() => SetReferences(), 100);
    
    UMI.Version = new Element("a", "Version");
    UMI.Version.Change("innerHTML", "version: 🎲0.02rps");
}

function Main() {
    Script.Set("Start");
    CreateInterface();
    Player.Start();
}

Main();
