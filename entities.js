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
        this.Energy = values.energy || 0;
        this.Strength = values.strength || 0;
        this.Agility = values.agility || 0;
        this.Intelligence = values.intelligence || 0;
        this.Luck = values.luck || 0;
        this.Charisma = values.charisma || 0;
        this.Completed = values.completed || false;
    }
}

//CHARACTER
class Character extends Entity {
    constructor(values) {
        super(values);
        this.MinHealth = values.minhealth || 0;
        this.MaxHealth = values.health;
        this.Bag = values.inventory || null;
        this.Score = 0;
        this.me = this;
    }
    isAlive() {
        if (this.Health <= 0 ||
            this.Energy <= 0) {
            this.Completed = true;
        }
        else {
            this.Completed = false;
        }
    }
    MinSolver() {
        //Minimal values
        if (this.Stress <= 0) {
            this.Stress = 0;
        }
        if (this.Poison <= 0) {
            this.Poison = 0;
        }
        if (this.Hunger >= 100) {
            this.Hunger = 100;
        }
        if (this.Health >= 100) {
            this.Health = 100;
        }
        if (this.Energy < 1) {
            this.Energy = 0;
        }
        if (this.Energy >= 100) {
            this.Energy = 100;
        }
        //Negative values
        if (this.Hunger <= 0) {
            this.Hunger = 0;
            this.Health -= 3;
        }
        if (this.Poison >= 100) {
            this.Poison = 100;
            this.Health -= 4;
        }
        if (this.Stress >= 100) {
            this.Stress = 100;
            this.Health -= 2;
        }
    }
    Use(entity) {      
            if (entity.Type == "Wearable") {
                this.Unwear(entity);
            } else {
                switch (entity.Type) {
                    case "Food":
                        let use = new SoundEntity("Sounds/Food.mp3");
                        use.Play();
                        break;
                }
                this.me.Level += entity.Level
                this.me.Health += entity.Health;
                this.me.Armor += entity.Armor;
                this.me.Damage += entity.Damage;
                this.me.Stress += entity.Stress;
                this.me.Poison += entity.Poison;
                this.me.Hunger += entity.Hunger;
                this.me.Energy += entity.Energy;
                entity.Icon = "";
                entity.Completed = true;
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
    }
    Sell(entity) {
        this.Money += entity.Money;
        entity.Completed = true;
    }
    Buy(entity) {
        if (entity.Cost <= this.Money && this.Bag.HavePlace() == true) {
            let money = new SoundEntity("Sounds/Money.mp3");
            money.Play();
            this.Money -= entity.Cost;
            this.Bag.AddItem(entity);
        }
    }
    LiveLife() {
        this.Energy -= 2;
        this.Hunger -= 1;
        this.MinSolver();
        this.isAlive();
    }
    Start() {
        setInterval(() => this.LiveLife(), 2000);
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
            return (false);
        }
        else {
            return (true);
        }
    }
}

//DIALOG
class Dialog {
    constructor(values) {
        var values = values || {};
        this.Name = values.name || "";
        this.Text = values.text || "";
        this.Active = values.active;
        this.Alternative = values.alternative || "";
        this.RPS = values.rps || new RockPaperScissors("", "", "", true);
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
        let click = new SoundEntity("Sounds/Click.mp3");
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
    MainActivity() {
        this.ActivateSounds();
    }
    ActivateSounds() {
        if (this.Ambient != "") {
            this.Ambient.Play();
        }
        if (this.Music != "") {
            this.Music.Play();
        }
    }
}

//RockPaperScissors ✊✌️✋
class RockPaperScissors {
    constructor(d, w, l, empty) {
        this.Dict = ["✊", "✌️", "✋"];
        this.difficulty = d;
        this.enemyScore = 0;
        this.enemyTurn = "";
        this.enemyTurnsHistory = [];
        this.playerScore = 0;
        this.playerTurn = "";
        this.winaction = w;
        this.loseaction = l;
        this.completed = empty || false;
    }
    PlayerTurn(t) {
        this.WinLoseChecker();
        this.playerTurn = t;
        this.EnemyTurn();
        this.Comparison();
    }
    EnemyTurn() {
        switch (this.difficulty) {
            case "Random":
                this.enemyTurn = this.Dict[Math.floor(Math.random() * this.Dict.length)];
                break;
            case "Medium":

                break;
            case "Hard":

                break;
        }
        this.enemyTurnsHistory.push(this.enemyTurn);
    }
    Comparison() {
        if (this.enemyTurn == this.playerTurn) {
        }
        if (this.enemyTurn == "✊" && this.playerTurn == "✋") {
            this.playerScore++;
        }
        if (this.enemyTurn == "✊" && this.playerTurn == "✌️") {
            this.enemyScore++;
        }
        if (this.enemyTurn == "✋" && this.playerTurn == "✊") {
            this.enemyScore++;
        }
        if (this.enemyTurn == "✋" && this.playerTurn == "✌️") {
            this.playerScore++;
        }
        if (this.enemyTurn == "✌️" && this.playerTurn == "✊") {
            this.playerScore++;
        }
        if (this.enemyTurn == "✌️" && this.playerTurn == "✋") {
            this.enemyScore++;
        }
    }
    WinLoseChecker() {
        let d = this.playerScore - this.enemyScore;
        if (d >= 3) {
            Info.New({ypos: 500,text: "Победа!"});
            this.completed = true;
            let win = new SoundEntity("Sounds/Win.mp3");
            win.Play();
            this.winaction();
        }
        if (d <= -3) {
            Info.New({text: "Поражение!"});
            this.completed = true;
            let lose = new SoundEntity("Sounds/Lose.mp3");
            lose.Play();
            this.loseaction();
        }
    }
    Repeat() {
        this.completed = false;
        this.enemyScore = 0;
        this.playerScore = 0;
        this.playerTurn = "";
        this.enemyTurn = "";
        this.enemyTurnsHistory = [];
    }
}

class SkillTest {
    constructor(d, c, w, l) {
        this.difficulty = d;
        this.winaction = w;
        this.loseaction = l;
        this.dice = 20;
        this.Check(c);
    }
    Check(CharacterChar) {
        this.SwitchDifficulty();
        var res = Math.floor(Math.random() * this.dice) + CharacterChar;
        if (res >= this.difficulty) {
            let win = new SoundEntity("Sounds/Win.mp3");
            win.Play();
            Info.New({ text: "Удача! " + "Требуется: " + this.difficulty + " Результат: " + res, });
            this.winaction();
        }
        else {
            let lose = new SoundEntity("Sounds/Lose.mp3");
            lose.Play();
            Info.New({ text: "Провал! " + "Требуется: " + this.difficulty + " Результат: " + res, });
            this.loseaction();
        }
    }
    SwitchDifficulty() {
        switch (this.difficulty) {
            case "Easy":
                this.difficulty = 10;
                break;
            case "Medium":
                this.difficulty = 12;
                break;
            case "Hard":
                this.difficulty = 15;
                break;
            case "Critical":
                this.difficulty = 20;
                break;
        }
    }
}