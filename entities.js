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
        this.MaxHealth = values.health || 100;
        this.Bag = values.inventory || null;
        this.Score = 0;
        this.Tick = 2000;
        this.HungerPerTick = 2;
        this.EnergyPerTick = 1;
        this.PoisonPerTick = 3;
    }
    isAlive() {
        if (this.Health <= this.MinHealth ||
            this.Energy <= this.MinHealth) {
            this.Completed = true;
        }
        else {
            this.Completed = false;
        }
    }
    MinSolver() {
        //Minimal values
        if (this.Stress <= this.MinHealth) {
            this.Stress = this.MinHealth;
        }
        if (this.Poison <= this.MinHealth) {
            this.Poison = this.MinHealth;
        }
        if (this.Hunger >= this.MaxHealth) {
            this.Hunger = this.MaxHealth;
        }
        if (this.Health >= this.MaxHealth) {
            this.Health = this.MaxHealth;
        }
        if (this.Energy <= this.MinHealth) {
            this.Energy = this.MinHealth;
        }
        if (this.Energy >= this.MaxHealth) {
            this.Energy = this.MaxHealth;
        }
        //Negative values
        if (this.Hunger <= this.MinHealth) {
            this.Hunger = this.MinHealth;
            this.Health -= this.HungerPerTick;
        }
        if (this.Poison >= this.MaxHealth) {
            this.Poison = this.MaxHealth;
            this.Health -= this.Poison;
        }
        if (this.Stress >= this.MaxHealth) {
            this.Stress = this.MaxHealth;
            this.Health -= this.PoisonPerTick;
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
            this.Level += entity.Level
            this.Health += entity.Health;
            this.Armor += entity.Armor;
            this.Damage += entity.Damage;
            this.Stress += entity.Stress;
            this.Poison += entity.Poison;
            this.Hunger += entity.Hunger;
            this.Energy += entity.Energy;
            entity.Icon = "";
            entity.Completed = true;
        }
    }
    WearItem(entity) {
        this.Level += entity.Level
        this.Health += entity.Health;
        this.Armor += entity.Armor;
        this.Damage += entity.Damage;
        this.Stress += entity.Stress;
        this.Poison += entity.Poison;
        this.Hunger += entity.Hunger;
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
            if (entity.Type == "Wearable") {
                this.WearItem(entity);
            }
        }
        else {
            Info.New({ text: "Недостаточно денег!" });
        }
    }
    LiveLife() {
        this.Energy -= this.EnergyPerTick;
        this.Hunger -= this.HungerPerTick;
        this.MinSolver();
        this.isAlive();
    }
    Start() {
        setInterval(() => this.LiveLife(), this.Tick);
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
    HavePlace() {
        let amount = 0;
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
        this.winscore = 3;
        this.losescore = -3;
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
        if (this.enemyTurn == this.Dict[0] && this.playerTurn == this.Dict[2]) {
            this.playerScore++;
        }
        if (this.enemyTurn == this.Dict[0] && this.playerTurn == this.Dict[1]) {
            this.enemyScore++;
        }
        if (this.enemyTurn == this.Dict[2] && this.playerTurn == this.Dict[0]) {
            this.enemyScore++;
        }
        if (this.enemyTurn == this.Dict[2] && this.playerTurn == this.Dict[1]) {
            this.playerScore++;
        }
        if (this.enemyTurn == this.Dict[1] && this.playerTurn == this.Dict[0]) {
            this.playerScore++;
        }
        if (this.enemyTurn == this.Dict[1] && this.playerTurn == this.Dict[2]) {
            this.enemyScore++;
        }
    }
    WinLoseChecker() {
        let d = this.playerScore - this.enemyScore;
        if (d >= this.winscore) {
            Info.New({ text: "Победа!" });
            this.completed = true;
            let win = new SoundEntity("Sounds/Win.mp3");
            win.Play();
            this.winaction();
        }
        if (d <= this.losescore) {
            Info.New({ text: "Поражение!" });
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
        let res = Math.floor(Math.random() * this.dice) + CharacterChar;
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