//ITEM
class Entity {
    constructor(values) {
        var values = values || {};
        this.Type = values.type || "Unknown";
        this.Icon = values.icon || "";
        this.Name = values.name || "Unknown";
        this.Title = values.title || "";
        this.Level = values.level || 0;
        this.Cost = values.cost || 0;
        this.Money = values.money || 0;
        this.Health = values.health || 0;
        this.Armor = values.armor || 0;
        this.Damage = values.damage || 0;
        this.Stress = values.stress || 0;
        this.Poison = values.poison || 0;
        this.Hunger = values.hunger || 0;
        this.Strength = values.strength || 0;
        this.Agility = values.agility || 0;
        this.Intellegence = values.intellegence || 0;
        this.Luck = values.luck || 0;
        this.Completed = values.completed || false;
    }
}

//CHARACTER
class Character extends Entity{
    constructor(values){
        super(values);
        this.MinHealth = values.minhealth || 0;
        this.MaxHealth = values.health;
        this.Bag = values.inventory || null;
        this.Score = 0;
    }
    AliveChecker(entity) {
        if (entity.Health <= entity.MinHealth) {
            entity.Completed = true;
        }}
    isAlive() {
        if (this.Health <= this.MinHealth ||
            this.Stress >= this.MaxHealth ||
            this.Poison >= this.MaxHealth ||
            this.Hunger <= this.MinHealth) {
            this.Completed = true;
        }
    }
    MinChecker() {
        if (this.Stress <= 0) {
            this.Stress = 0;
        }
        if (this.Poison <= 0) {
            this.Poison = 0;
        }
        if (this.Hunger >= 100) {
            this.Hunger = 100;
        }
        if (this.Health >= this.MaxHealth) {
            this.Health = this.MaxHealth;
        }
    }
    Use(entity) {
        var q = confirm(entity.Name+". "+entity.Title);
        if (q == true) {
            if (entity.Type == "Wearable") {
                this.Unwear(entity);
            } else {
                this.Level += entity.Level
                this.Health += entity.Health;
                this.Armor += entity.Armor;
                this.Damage += entity.Damage;
                this.Stress += entity.Stress;
                this.Poison += entity.Poison;
                this.Hunger += entity.Hunger;
                entity.Icon = "";
                entity.Completed = true;
                this.MinChecker();
            }
        }
    }
    Unwear(entity) {
        this.Level -= entity.Level
        this.Health -= entity.Health;
        this.Armor -= entity.Armor;
        this.Damage -= entity.Damage;
        this.Stress -= entity.Stress;
        this.Poison -= entity.Poison;
        this.Hunger -= entity.Hunger;
        entity.Icon = "";
        entity.Completed = true;
        this.MinChecker();
    }
    Sell(entity) {
        this.Money += entity.Money;
        entity.Completed = true;
    }
    Buy(entity){
        if(entity.Cost <= this.Money && this.Bag.HavePlace()==true){
            this.Money-=entity.Cost;
            this.Bag.AddItem(entity);
        }
    }
    LiveLife() {
        this.Score += 2;
        this.Hunger -= 1;
        if (this.Hunger < 1) {
            this.Hunger = 0;
            this.Health -= 1;
        }
        if (this.Stress > 100) {
            this.Stress = 100;
            this.Health -= 25;
        }
    }
}

//INVENTORY
class Inventory {
    constructor(c) {
        this.MaxCells = c || 4;
        this.Items = [];
        for (let x = 0; x < this.MaxCells; x++) {
            this.Items[x] = new Entity({
                completed: true, icon: ""
            });
        }
    }
    AddItem(entity) {
        for (let y = 0; y < this.MaxCells; y++) {
            if (this.Items[y].Completed == true) {
                for (let key in entity) {
                    this.Items[y][key] = entity[key];
                }
                entity.Completed = true;
                break;
            }
        }
    }
    WearItem(entity, object) {
        for (let y = 0; y < this.MaxCells; y++) {
            if (this.Items[y].Completed == true) {
                for (let key in entity) {
                    this.Items[y][key] = entity[key];
                }
                entity.Completed = true;
                break;
            }
        }
        object.Level += entity.Level
        object.Health += entity.Health;
        object.Armor += entity.Armor;
        object.Damage += entity.Damage;
        object.Stress += entity.Stress;
        object.Poison += entity.Poison;
        object.Hunger += entity.Hunger;
        object.MinChecker();
    }
    HavePlace() {
        var amount = 0;
        for (let y = 0; y < this.MaxCells; y++) {
            if (this.Items[y].Completed == false)
                amount++;
        }
        if (amount == this.MaxCells) {
            return(false);
        } 
        else {
            return (true);
        }
    }
}

//DIALOG AND CHARACTER
class Dialog {
    constructor(values) {
        var values = values || {};
        this.Name = values.name || "";
        this.Text = values.text || "";
        this.Active = values.active || true;
        this.Alternative = values.alternative || "";
        this.Game = values.game;
        this.ButtonText = [];
        this.ButtonText.push(values.buttontext01 || "");
        this.ButtonText.push(values.buttontext02 || "");
        this.ButtonText.push(values.buttontext03 || "");
        this.ButtonText.push(values.buttontext04 || "");
        this.ButtonText.push(values.buttontext05 || "");
        this.ButtonAction = [];
        this.ButtonAction.push(values.buttonaction01 || "");
        this.ButtonAction.push(values.buttonaction02 || "");
        this.ButtonAction.push(values.buttonaction03 || "");
        this.ButtonAction.push(values.buttonaction04 || "");
        this.ButtonAction.push(values.buttonaction05 || "");
        this.ButtonActive = [];
        this.ButtonActive.push(values.buttonactive01);
        this.ButtonActive.push(values.buttonactive02);
        this.ButtonActive.push(values.buttonactive03);
        this.ButtonActive.push(values.buttonactive04);
        this.ButtonActive.push(values.buttonactive05);
        this.Ambient = values.ambient || "";
        this.Music = values.music || "";
    }
    Set() {
        let click = new SoundEntity("https://rtemiy.github.io/bloody_trail/Sounds/Click.mp3");
        click.Play();
        this.isActive();
    }
    isActive() {
        if (this.Active == false) {
            this.Alternative();
        } else {
            this.MainActivity();
        }
    }
    MainActivity(){
        this.SetGame();
        this.ActivateSounds();
        this.ChangeTitle();
        this.ChangeButtons();

    }
    ChangeTitle() {
        if (this.Name != "") {
            UMI.Element.DialogTitle.Change("innerHTML", this.Name);
        }
        UMI.Element.Dialog.Change("innerHTML", this.Text);
    }
    ChangeButtons() {
        for (var x = 0; x < 5; x++) {
            UMI.Elements.SelectionButtons[x].Change("innerHTML", this.ButtonText[x]);
            UMI.Elements.SelectionButtons[x].SetAttribute("onclick", this.ButtonAction[x]);
            if (this.ButtonText[x] != "") {
                UMI.Elements.SelectionButtons[x].HideOrNot(false);
        }
            if (this.ButtonText[x] == "" || this.ButtonActive[x] == false) {
                UMI.Elements.SelectionButtons[x].HideOrNot(true);
            }
        }
    }
    SetGame(){
        if(this.Game != undefined){
            RPS = new RockPaperScissors(this.Game.difficulty,this.Game.winaction,this.Game.loseaction);
            UMI.Element.RPSBlock.HideOrNot(false);
        }
        else{
            UMI.Element.RPSBlock.HideOrNot(true);
        }
    }
    ActivateSounds(){
        if(this.Ambient != ""){
        this.Ambient.Play();}
        if(this.Music != ""){
        this.Music.Play();}
    }
}

//RockPaperScissors ✊✌️✋
class RockPaperScissors {
    constructor(d,w,l){
        this.Dict = ["✊","✌️","✋"];
        this.difficulty=d;
        this.enemyScore=0;
        this.enemyTurn="";
        this.enemyTurnsHistory=[];
        this.playerScore=0;
        this.playerTurn="";
        this.winaction=w;
        this.loseaction=l;
        this.completed=false;
        this.won=false;
    }
    PlayerTurn(t){
        this.WinLoseChecker();
        this.playerTurn=t;
        this.EnemyTurn();
        this.Comparison();
    }
    EnemyTurn(){
        switch(this.difficulty){
            case "Random":
            this.enemyTurn=this.Dict[Math.floor(Math.random() * this.Dict.length)];                       
            break;
            case "Medium":

            break;
            case "Hard":

            break;
        }
    this.enemyTurnsHistory.push(this.enemyTurn);
    }
    Comparison(){
        if (this.enemyTurn==this.playerTurn){
        }
        if(this.enemyTurn=="✊" && this.playerTurn=="✋"){
            this.playerScore++;
        }
        if(this.enemyTurn=="✊" && this.playerTurn=="✌️"){
            this.enemyScore++;
        }
        if(this.enemyTurn=="✋" && this.playerTurn=="✊"){
            this.enemyScore++;
        }
        if(this.enemyTurn=="✋" && this.playerTurn=="✌️"){
            this.playerScore++;
        }
        if(this.enemyTurn=="✌️" && this.playerTurn=="✊"){
            this.playerScore++;
        }
        if(this.enemyTurn=="✌️" && this.playerTurn=="✋"){
            this.enemyScore++;
        }
    }
    WinLoseChecker(){
        let d=this.playerScore-this.enemyScore;
        if(d>=3){
            this.completed=true;
            this.won=true;
            this.winaction();
        }
        if(d<=-3){
            this.completed=true;
            this.won=false;
            this.loseaction();
        }
    }
}