/*
REQUIRES:
entities.js
interface.js
script.js
*/
//VARIABLES
var UMI = {};
var Info = new Message({title:''});
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
var b;
function InitLoader(){

    var max = 62;    
    if(b == undefined){
        b=true;
        UMI.Loader = new Element("progress","loader");
        UMI.Loader.SetAttribute("max", max);
    }   
    var v = 0;
    v=Object.keys(UMI).length;    
    UMI.Loader.SetAttribute("value", v);
    
    if(v!=max){
    setTimeout(()=>{InitLoader();},100);
    }
    else{
        UMI.Loader.HideOrNot(true);
    }
}

function SaveMemory(){
    localStorage.setItem('CurLev', Script.Actual);
    localStorage.setItem('PlayerH', Player.Health);
    localStorage.setItem('PlayerA', Player.Armor);
    localStorage.setItem('PlayerD', Player.Damage);
    localStorage.setItem('PlayerHu', Player.Hunger);
    localStorage.setItem('PlayerS', Player.Stress);
    localStorage.setItem('PlayerP', Player.Poison);
    localStorage.setItem('PlayerM', Player.Money);
    localStorage.setItem('PlayerE', Player.Energy);
    localStorage.setItem('PlayerC', Player.Charisma);
    localStorage.setItem('PlayerStr', Player.Strength);
    localStorage.setItem('PlayerAg', Player.Agility);
    localStorage.setItem('PlayerI', Player.Intelligence);
    localStorage.setItem('PlayerL', Player.Luck);
    Info.New({text: 'Игра сохранена!'});
}

function LoadMemory(){
    Script.Actual = localStorage.getItem('CurLev');
    Player.Health = localStorage.getItem('PlayerH');
    Player.Armor = localStorage.getItem('PlayerA');
    Player.Damage =localStorage.getItem('PlayerD');
    Player.Hunger =localStorage.getItem('PlayerHu');
    Player.Stress =localStorage.getItem('PlayerS');
    Player.Poison =localStorage.getItem('PlayerP');
    Player.Money = localStorage.getItem('PlayerM');
    Player.Energy =localStorage.getItem('PlayerE');
    Player.Charisma =localStorage.getItem('PlayerC');
    Player.Strength =localStorage.getItem('PlayerStr');
    Player.Agility =localStorage.getItem('PlayerAg');
    Player.Intelligence = localStorage.getItem('PlayerI');
    Player.Luck =localStorage.getItem('PlayerL');
    Info.New({text: 'Игра загружена!'});
}

function InitDialog() {
    UMI.DialogBlock = new Element("div", "DialogBlock", false);
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
    UMI.PlayerMenu = new Element('p', 'PlayerMenu');
    UMI.PlayerMenu.Change("innerHTML", "👤 Игрок");
    new Element("hr");
    UMI.PlayerLevelIcon = new Element("a", "PLI");
    UMI.PlayerLevelIcon.Change("innerHTML", "🏆 ");
    UMI.PlayerLevel = new Element('a', 'PLevel');
    UMI.PlayerMoneyIcon = new Element("a", "PMI");
    UMI.PlayerMoneyIcon.Change("innerHTML", "⠀| 💰 ");
    UMI.PlayerMoney = new Element('a', 'PMoney');
    UMI.PlayerDamageIcon = new Element("a", "PDI");
    UMI.PlayerDamageIcon.Change("innerHTML", "⠀| ⚔️");
    UMI.PlayerDamage = new Element('a', 'PDamage');
    new Element("hr");
    UMI.PlayerHealth = new Element('a', 'PHealth');
    UMI.PlayerHealth.Change("innerHTML", " ❤️ ");
    UMI.HealthBar = new Element("progress", "HealthBar");
    UMI.HealthBar.SetAttribute("class", "healthbar");
    UMI.HealthBar.SetAttribute("max", 100);
    UMI.PlayerHunger = new Element('a', 'PHunger');
    UMI.PlayerHunger.Change('innerHTML', "⠀| 🍖 ");
    UMI.HungerBar = new Element("progress", "HungerBar");
    UMI.HungerBar.SetAttribute("class", "hunger");
    UMI.HungerBar.SetAttribute("max", 100);
    new Element("hr");
    UMI.PlayerStress = new Element('a', 'PStress');
    UMI.PlayerStress.Change("innerHTML", "🤯 ");
    UMI.StressBar = new Element("progress", "StressBar");
    UMI.StressBar.SetAttribute("class", "stress");
    UMI.StressBar.SetAttribute("max", 100);
    UMI.PlayerPoison = new Element('a', 'PPoison');
    UMI.PlayerPoison.Change("innerHTML", "⠀| 🤢 ");
    UMI.PoisonBar = new Element("progress", "PoisonBar");
    UMI.PoisonBar.SetAttribute("class", "poison");
    UMI.PoisonBar.SetAttribute("max", 100);
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
    UMI.PlayerScoreIcon = new Element("a", "PEnergyI");
    UMI.PlayerScoreIcon.Change("innerHTML", "⠀| ⚡️ ");
    UMI.PlayerScore = new Element('progress', 'energy');
    UMI.PlayerScore.SetAttribute("class", "energy");
    UMI.PlayerScore.SetAttribute("max", 100);
    UMI.PlayerBlock.Close();
}

function InitInventory() {
    UMI.InventoryBlock = new Element("div", "InventoryBlock", false);
    UMI.PlayerMenuInventory = new Element("p", "PlayerMenuInventory");
    UMI.PlayerMenuInventory.Change("innerHTML", "🎒 Рюкзак");
    new Element("hr");
    UMI.PlayerInventory = [];
    for (x = 0; x < Player.Bag.MaxCells; x++) {
        UMI.PlayerInventory.push(new Element('button', 'inv' + x));
        UMI.PlayerInventory[x].SetAttribute('class','invitem');
        UMI.PlayerInventory[x].SetAttribute("onclick", "Info.New({ title: Player.Bag.Items[" + x + "].Name, xpos: 190,ypos: 427, text: Player.Bag.Items[" + x + "].Title, action: function(){Player.Use(Player.Bag.Items[" + x + "])}})");
    }
    
    UMI.InventoryBlock.Close();
}

function InitMessage(){
    UMI.MessageBackground = new Element("div", "MessageBackground");
    UMI.MessageBlock = new Element("div", "MessageBlock", false);
    UMI.MessageMenu = new Element("p", "MessageMenu");
    UMI.MessageMenu.Change("innerHTML", "✉️ Сообщение");
    new Element("hr");
    UMI.MessageText = new Element("p","MessageText");
    UMI.MesBut01 = new Element("button", "MesBut01");
    UMI.MesBut02 = new Element("button", "MesBut02");
    UMI.MessageBlock.Close();    
}

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
    UMI.HealthBar.SetAttribute("value",Player.Health);
    UMI.HungerBar.SetAttribute("value",Player.Hunger);
    UMI.StressBar.SetAttribute("value",Player.Stress);
    UMI.PoisonBar.SetAttribute("value",Player.Poison);
    UMI.PlayerMenu.SetRef(Player.Name);
    UMI.PlayerStrength.SetRef(Player.Strength);
    UMI.PlayerAgility.SetRef(Player.Agility);
    UMI.PlayerIntelligence.SetRef(Player.Intelligence);
    UMI.PlayerCharisma.SetRef(Player.Charisma);
    UMI.PlayerLuck.SetRef(Player.Luck);
    UMI.PlayerArmor.SetRef(Player.Armor);
    UMI.PlayerScore.SetAttribute("value",Player.Energy);
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
    //Message
    UMI.MessageBlock.Style("top",Info.ypos+"px");
    UMI.MessageBlock.Style("left",Info.xpos+"px");
    UMI.MessageBackground.HideOrNot(Info.hidden);
    UMI.MessageBlock.HideOrNot(Info.hidden);
    UMI.MessageMenu.SetRef(Info.title);
    UMI.MessageText.SetRef(Info.text);
    UMI.MesBut01.SetRef(Info.buttonok);
    UMI.MesBut01.HideOrNot(Info.buttonokhidden);
    UMI.MesBut02.SetRef(Info.buttondeny);
    UMI.MesBut02.HideOrNot(Info.buttondenyhidden);
    UMI.MesBut01.SetAttribute('onclick','Info.OK()');    
    UMI.MesBut02.SetAttribute('onclick','Info.Deny()');
}

function InitRPS() {
    UMI.RPSBlock = new Element("div", "RPSBlock", false);
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
    UMI.RPSPlayerTurn.SetAttribute("class", "rpsitem");
    UMI.RPSStick = new Element('a', 'RPSStick');
    UMI.RPSStick.Change("innerHTML", "|");
    UMI.RPSStick.SetAttribute("class", "rpsitem");
    UMI.RPSEnemyTurn = new Element('a', 'RPSEnemyTurn');
    UMI.RPSEnemyTurn.SetAttribute("class", "rpsitem");
    new Element("hr");
    UMI.RockButton = new Element("button", "RockButton");
    UMI.RockButton.Change("innerHTML", "✊");
    UMI.RockButton.SetAttribute("class", "rpsitem");
    UMI.ScissorsButton = new Element("button", "ScissorsButton");
    UMI.ScissorsButton.Change("innerHTML", "✌️");
    UMI.ScissorsButton.SetAttribute("class", "rpsitem");    
    UMI.PaperButton = new Element("button", "PaperButton");
    UMI.PaperButton.Change("innerHTML", "✋");
    UMI.PaperButton.SetAttribute("class", "rpsitem");
    UMI.RPSBlock.Close();
    UMI.RPSBlock.HideOrNot(true);
}

function InitSaveload(){
    UMI.LoadSave = new Element('div', 'LoadSave', false);   
    UMI.LoadSaveMenu = new Element('p', 'LoadSaveMenu'); 
    UMI.LoadSaveMenu.Change("innerHTML", "🎬 Сохранение/загрузка");
    new Element("hr");
    UMI.SaveButton = new Element('button', "SaveButton");
    UMI.SaveButton.Change("innerHTML", "📥 Сохранить");
    UMI.SaveButton.SetAttribute('onclick', "SaveMemory()");
    UMI.LoadButton = new Element('button', "LoadButton");
    UMI.LoadButton.Change("innerHTML", "📤 Загрузить");
    UMI.LoadButton.SetAttribute('onclick', "LoadMemory()");
    UMI.LoadSave.Close();

}

function CreateInterface() {
    InitLoader();
    InitRPS();
    InitDialog();
    InitPlayerStats();
    InitInventory();
    InitMessage();
    InitSaveload();
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
