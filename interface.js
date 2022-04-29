//ALL CLASSES
//HTML ELEMENT
class Element {
    constructor(type, id, close = true, open = true) {
        this.id = id;
        this.type = type;
        this.hidden = false;
        this.NeedRef = false;
        this.ref = "";
        this.aref = "";
        this.aa = "";
        this.aaref = "";
        this.preref = "";
        this.HideOnEmpty = true;
        if (open == true) {
            this.Open();
        }
        if (close == true) {
            this.Close();
        }
        this.path = document.querySelector("" + this.id);
    }
    Open() {
        document.write("<" + this.type + " id='" + this.id + "'>");
    }
    Close() {
        document.write("</" + this.type + ">");
    }
    Change(att, value) {
        document.getElementById(this.id)[att] = value;
    }
    GetValue() {
        return (document.getElementById(this.id).innerHTML);
    }
    SetAttribute(att, value) {
        document.getElementById(this.id).setAttribute(att, value);
    }
    HideOrNot(w) {
        if (w == true) {
            this.Change("hidden", true);
        }
        if (w == false) {
            this.Change("hidden", false);
        }
    }
    ToggleHide() {
        if (this.hidden == false) {
            this.Change("hidden", true);
        } else {
            this.Change("hidden", false);
        }
    }
    SetRef(r, a, aa, aar) {
        this.ref = r;
        this.NeedRef = true;
        this.aref = a;
        this.aa = aa;
        this.aaref = aar;
        this.ApplyRef();
    }
    SetBasicRef() {
        if (this.NeedRef == true || this.ref != undefined) {
            this.Change("innerHTML", this.ref);
            this.SetOnClickRef();
        }
    }
    SetOnClickRef() {
        if (this.aref != undefined) {
            this.SetAttribute("onclick", "" + this.aref);
        }
    }
    SetAdditionalAttribute() {
        try {
            this.Change(this.aa, this.aaref);
            if (this.ref + "" == "") {
                this.HideOrNot(true);
            }
        }
        catch (e) { }
    }
    HiddenChecker() {
        if (this.HideOnEmpty == true) {
            if (this.ref + "" == "") {
                this.HideOrNot(true);
            } else {
                this.HideOrNot(false);
            }
        }
    }
    ApplyRef() {
        this.SetBasicRef();
        this.HiddenChecker();
        this.SetAdditionalAttribute();
    }
}

//MESSAGE
class Message {
    constructor() {        
        this.hidden = true;
    }
    New(values){
        this.hidden = false;
        var values = values;
        this.title = "✉️ Сообщение" || values.title;
        this.text = values.text;
        this.action = values.action;
        this.deny = values.deny;
        this.buttonok = "✔️" || values.buttonoktext;
        this.buttondeny = "❌" || values.buttondenytext;      
    }
    OK(){
        this.hidden=true;
        this.res=true;
        this.action();
    }
    Deny(){
        this.hidden=true;
        this.res=false;
        this.deny();
    }
    Result(){
        return(this.res);
    }
}

//SOUNDENGINE
class SoundEntity {
    constructor(l) {
        this['audio'] = new Audio(l);
    }
    Play() {
        this['audio'].pause();
        this['audio'].play();
    }
    Change(l) {
        this['audio'].pause();
        this['audio'] = new Audio(l);
        this['audio'].play();
    }
}
