//Звуки окружения
var progresssound = new Audio ('https://drive.google.com/uc?id=17kO5Yo8Y5i357Ua1YR7plGlsrUlcHTX7&export=download');
var ambientsound = new Audio();
var streetsound = 'https://drive.google.com/uc?id=1nsXtwdY01ravkoT72bGViiNNzigAYbaq&export=download';
var armourysound = "https://drive.google.com/uc?id=16z1IPwqGjj7D0L7gW6n7Zw5My2dSyUb_&export=download";
var witchersound = 'https://drive.google.com/uc?id=13EURM8I7UhepOf88IQypUTtmZkXb6kt6&export=download';
var librarysound = 'https://drive.google.com/uc?id=1P84I0AYOTNM7RR7ef52k4c1bz2EVfPI7&export=download';




//Смена и игра музыки
function ChangeAmbient(a){
	if(ambientsound.audio==a){}
	else{ambientsound.pause();
	ambientsound= new Audio(a);
	ambientsound.play();
	}
}

//Логические функции
//Классы
//Создание персонажа ролевого
class RPGChar{
	constructor(name,money,health,attack,armor,strength,agility,intelligence){
		this.name = name;
		this.money = money;
		this.health = health;
		this.attack = attack;
		this.armor = armor;
		this.strength = strength;
		this.agility = agility;
		this.intelligence = intelligence;
	}
	AttackObj(Enemy){
		Enemy.health-=this.attack;
		
	}
}

//Создание персонажа диалога
class DiaChar{
	constructor(name,color){
		this.name = name;
		this.color = color;
		this.quest = 0;
		this.dialog=0;
		this.dtexts= [];
		this.devents=[];
		
	}
	Say(text,event){
		ChangeElementText('name',this.name);
		ChangeElementColor('name',this.color);
		ChangeElementText('text',text);
		ChangeElementEvent('next',event);
		HideSpecialChoice();
		HideShop();
		RefreshInterface();
	}
	Dialog(){
		this.Say(this.dtexts[this.dialog],this.devents[this.dialog]);
	}
	DialogAdd(t,e){
		this.dtexts.push(t+"");
		this.devent.push(e+"");
	}
}


//Персонажи диалога
let ST = new DiaChar("Рассказчик:","black");
let Me = new DiaChar ("Вы:","red");
let KW = new DiaChar ('Стражник:','black');
let KJ = new DiaChar ('Судья:','red');
let WM = new DiaChar ('Ведьмак','purple');
let LM = new DiaChar ('Библиотекарь','blue');

//Персонажи роли
//Игрок
let Player = new RPGChar('',0,3,0,0,0,0,0);
//Размер инвентаря
var InvCellAmount = 6;

//Функции истории
//Условия
//СоздатьВыбор из 3
function CreateSpecialChoice(...args){
	ChangeElementText('addact'+0,args[0]);
	ChangeElementEvent('addact'+0,args[1]);
	ChangeElementText('addact'+1,args[2]);
	ChangeElementEvent('addact'+1,args[3]);
	ChangeElementText('addact'+2,args[4]);
	ChangeElementEvent('addact'+2,args[5]);
	for (i=0;i<3;i++){HiddenElement('addact'+i,false);}
	HiddenElement('next',true);
}


//Спрятать выбор из 3
function HideSpecialChoice(){
	for (i=0;i<3;i++){HiddenElement('addact'+i,true);}
	HiddenElement('next',false);
	}

//Сценарий
function Story01(){
	progresssound.play();
	Player.name=AskQuestion('Введите ваше имя');
	ST.Say("Быть простым крестьянином в средневековье— участь не для слабонервных.","Story02()");
}

function Story02(){
	ST.Say('Тебя ждёт путь от простого до обожаемого.','ST.Say("Казалось бы— ничего нельзя изменить, но...","ST.Say(`Как говорится, всё в ваших руках.`,`Story03()`)")');
}

function Story03(){
	ST.Say('У '+Player.name+' в кармане оказалось несколько предметов. Их можно использовать, нажимая на них. Изначально в инвентаре может находиться только 6 предметов, его объём можно увеличить при помощи специальных предметов. Также, если в инвентаре нет места, а игрок должен получить предмет, то он исчезнет и его нельзя будет получить заного.',"Me.Say(`Порой одной книги достаточно, чтобы стать чуток умнее! Мне стоит запоминать, всё, что в них написано, в нашем королевстве это редкость`,`Story04()`);");
	Inv.Ball.add();
	Inv.Apple.add();
	Inv.PHerb.add();
	Inv.IntBook.add();
}

function Story04(){
	Me.Say('Где ключ? Надо сходить в свою комнату взять его.','Story05()');
}

function Story05(){
	ST.Say('Вы берёте ключ. Он появляется у вас в инвентаре. Такой тип предметов уничтожается при использовании, не давая бонусов. Их имеет смысл хранить долгое время для дальнейшего использования. ','Story06()');
	Inv.Key01.add();
}

function Story06(){
	ST.Say('Вы как раз только получили ключ. Попробуйте открыть им дверь в кладовую.');
	CreateSpecialChoice('Использовать ключ','if(Inv.Key01.amount==1){Story07()}','Поискать, может он потерялся недалеко','Story07()','Уйти из замка','Square01()');
}

function Story07(){
	ST.Say('Вы используете ключ и открываете кладовку и берёте кошелёк.','Square01()');
	if(Inv.Key01.amount==0){Inv.Key01.add();}
	Inv.Purse.add();
	}
	
function Square01(){
	ChangeAmbient(streetsound);
	ST.Say(''+Player.name+' выхдит на площадь и видит: рынок, библиотеку, королевскую оружейную.','');
	CreateSpecialChoice('Рынок','Market01()','Библиотека','Library01()','Оружейная','Armory01()');
}

function Market01(){
	ST.Say("Вы зашли на рынок. Здесь всегда много людей, и выбор хорош. Можно вернуться на площадь, пройти в лавку ведьмака или же королевское бюро.","");
	CreateSpecialChoice('Площадь','Square01()','Лавка ведьмака','WitcherStore01()','Королевское бюро','KingB01()');
	CreateShop(Inv.Apple,Inv.Bread,Inv.Stew,Inv.Pie,Inv.Cake,Inv.Spoon);
}

function Library01(){
	ChangeAmbient(librarysound);
	a= 'CreateSpecialChoice("Поговорить с библиотекарем","Library02()","Выйти через чёрный ход","House01()","Уйти","Square01()");'
	ST.Say("В библиотеке всегда тихо. Здесь вам пока нечего делать.",a);
	CreateShop(Inv.IntBook);
}

function Library02(){
	if(LM.quest==2){}
	if(LM.quest==0){
	LM.Say('У меня башка раскалывается, если ты сможешь раздобыть какое-нибудь лекарство, в долгу не останусь','');
	CreateSpecialChoice("Согласиться","Library03()","Подумать","Library01()","Уйти","Square01()");
	}
	if(LM.quest==1){
		LM.Say("Ну, что? Есть что-нибудь для меня?",'');
		CreateSpecialChoice("Отдать лекарство","Library03()","Пока нет","Library01()","Уйти","Square01()");
	}
}

function Library03(){
	if(LM.quest==0){LM.quest+=1;Square01();}
	else if(LM.quest==1 & Inv.PHerb.amount>0){Inv.PHerb.give();Inv.Purse.add(); Inv.Purse.add();progresssound.play();Square01();LM.quest+=1;}
}

function WitcherStore01(){
	ChangeAmbient(witchersound);
	a = "CreateSpecialChoice('Поговорить с ведьмаком','WitcherStore02()','Осмотреться','','Уйти','Market01()')";
	ST.Say('В лавку ведьмака мало кто приходит, простолюдинам не понять ведьминских утех.',a);
	CreateShop(Inv.PHerb);
}

function WitcherStore02(){
	if(WM.quest==2){}
	if (WM.quest==0){
	WM.Say('У меня есть для тебя небольшое задание. Выполнишь его— я тебя хорошенько отблагодарю. В библиотеке нужно купить книгу и принести её мне. Деньги дам, а в награду получишь 5 золотых.',a);
	a = CreateSpecialChoice('Согласиться','WitcherStore03()','Подумать','WitcherStore01()','Отказаться','Market01()');}
	if(WM.quest==1){
		c = "CreateSpecialChoice ('Отдать книгу','WitcherStore03()','В процессе','Square01()','Уйти','Market01()')";
		WM.Say('Как успехи?',c);
	}
}

function WitcherStore03(){
	if (WM.quest==0){WM.quest += 1; Inv.Purse.add(); Inv.Purse.add();Market01();}
	else if(WM.quest>0){if(Inv.IntBook.amount>0){WM.quest+=1; Inv.IntBook.give(); progresssound.play();	Inv.Purse.add(); Square01();}}
}

function Armory01(){
	ChangeAmbient(armourysound);
	KW.Say('Вход только по пропуску. ','Square01()');
	CreateSpecialChoice('Использовать пропуск','ArmoryB02()','Попробовать убедить стражника(требуется интеллект)','ArmoryB02()','Уйти','Square01()');
}

function ArmoryB02(){
	if(Inv.Pass01.amount==1){
		KW.Say('Проходи. Но имей ввиду, что пропуск разовый!','Inv.Pass01.give(); Armory03()');
	}
	if(Player.intelligence>1){
		ST.Say('Вам удаётся убедить стражника.','Armory03()');
	}
}

function Armory03(){
	KW.Say("Выбор скудный, но для самообороны пойдёт", "Square01()");
	CreateShop(Inv.SKnife,Inv.SArmor);
}

function KingB01(){
	b ="CreateSpecialChoice('Хочу получить пропуск',a,'Стражники не пускают в оружейную','','Уйти','Square01()')"
	KJ.Say('Что вам угодно?',b);
	a = "CreateSpecialChoice('Заплатить 10 золотых','Pass01.buy();Square01()','Денег нет','Square01()','Уйти','Square01()')";
	
}

function House01(){
	ST.Say("Вы вышли во двор своего дома.","");
	CreateSpecialChoice("Войти","","","","Уйти","Square01()");
}