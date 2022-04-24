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
        this.path = document.querySelector(""+this.id);
    }
    Open() {
        document.write("<"+this.type+" id='"+this.id+"'>");
    }
    Close() {
        document.write("</"+this.type+">");
    }
    Change(att, value) {
        let a = "document.getElementById(this.id)";
        let b = eval(a+"."+att+"="+"value");
    }
    GetValue() {
        return (document.getElementById(this.id).innerHTML);
    }
    SetAttribute(att, value) {
        let a = "document.getElementById(this.id)";
        let b = eval(a+".setAttribute("+"att"+","+'value)');
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
    SetRef(r, a, aa,aar) {
        this.ref = r;
        this.NeedRef = true;
        this.aref = a;
        this.aa = aa;
        this.aaref = aar;
    }
    SetBasicRef(){
        if (this.NeedRef == true) {
            this.Change("innerHTML", this.ref());
                this.SetOnClickRef();
        this.HiddenChecker();
        }
    }
    SetOnClickRef(){
        if (this.aref != undefined) {
                this.SetAttribute("onclick", ""+ this.aref());
            }
    }
    SetAdditionalAttribute(){
        if(this.aa != ""){
            if(this.aaref != ""){
                this.Change(this.aa, this.aaref);
            }                
        }
    }
    HiddenChecker(){
       if (this.HideOnEmpty == true) {
                if (this.ref()+"" == "") {
                    this.HideOrNot(true);
                } else {
                    this.HideOrNot(false);
                }
            } 
    }

    ApplyRef() {
        this.SetBasicRef();      
        this.SetAdditionalAttribute();     
    }
}

//INTERFACE
class Interface {
    constructor () {
        this.Element = [];
        this.Elements = [];
    }
    Refresh() {
        for (var m in this.Element) {
            eval("this.Element."+m+".ApplyRef();");
        }
        for (var n in this.Elements) {
            for (var o = 0; o < eval("this.Elements."+n+".length"); o++) {
                eval("this.Elements."+n+"["+o+"]"+".ApplyRef();");
            }
        }
    }
}

//SOUNDENGINE
class SoundEntity {
    constructor(l){
        this['audio'] = new Audio(l);
    }
    Play(){
        this['audio'].pause();
        this['audio'].play();
    }
    Change(l){
        this['audio'].pause();
        this['audio'] = new Audio(s);
        this['audio'].Play();
    }
}
