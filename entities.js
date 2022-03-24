//ITEM
class Entity {
    constructor(values) {
        var values = values || {};
        this.Type = values.type || "Unknown";
        this.Icon = values.icon || "";
        this.Name = values.name || "Unknown";
        this.Title = values.title || "";
        this.Level = values.level || 0;
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
        this.RLevel = values.rlevel || 1;
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
    LiveLife() {
        this.Score += 2;
        this.Hunger -= 1;
        if (this.Hunger < 1) {
            this.Hunger = 0;
            this.Health -= 1;
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
    }
}

//WORLD
class World {
    constructor(p) {
        this.Player = p;
    }
}

//DIALOG AND CHARACTER
class Dialog {
    constructor(values) {
        var values = values || {};
        this.Name = values.name || "";
        this.Text = values.text || "";
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
    }
    Set() {
        UMI.Element.DialogTitle.Change("innerHTML", this.Name);
        UMI.Element.Dialog.Change("innerHTML", this.Text);
        for (var x = 0; x < 5; x++) {
            UMI.Elements.SelectionButtons[x].Change("innerHTML", this.ButtonText[x]);
            UMI.Elements.SelectionButtons[x].SetAttribute("onclick", this.ButtonAction[x]);
            if (this.ButtonText[x] == "") {
                UMI.Elements.SelectionButtons[x].HideOrNot(true);
            } else {
                UMI.Elements.SelectionButtons[x].HideOrNot(false);

            }
        }
    }
}