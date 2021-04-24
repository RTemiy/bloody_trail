//Системные функции

var bgimage = 'https://drive.google.com/uc?id=1qxTi4i3_qZiER2eQ8Wg8DxYiZjNLDdPl&export=download';
var buttonbgimage ='';//https://drive.google.com/uc?id=1MuNyfsywGM6g9N7N-JVcA2gMLuUGOLtG&export=download

//Создать кнопку
function CreateButton(name,text,event){
	document.write("<button id='"+name+"' style='background: url("+buttonbgimage+")' onclick='"+event+"'>"+text+"</button>");
}

//Создать текст
function CreateTextArea(name,text,color,bold,italic,underlined){
document.write('<p>');
if(bold==true){
	document.write('<b>');
}
if(italic==true){
	document.write('<i>');
}
if(underlined==true){
	document.write('<u>');
}
document.write('<font  id="'+name+'"color="'+color+'">');
document.write(''+text+'');

if(bold==true){
	document.write('</b>');
}
if(italic==true){
	document.write('</i>')
}
if(underlined==true){
	document.write('</u>');
}
document.write('</p>');
document.write('</font>');
}

//Создать поле ввода
function CreateInput(name){
	document.write('<input type="text" id="'+name+'"></input>');
}

//Создать картинку
function CreateImage(src){
	document.write('<img src="'+src+'">');
}

//Задать вопрос
function AskQuestion(txt){
	return prompt(txt);
}

//Изменить формат текста
function ChangeTextFont(objname,text,color,bold,italic,underlined){
var a,b,c,d,e,f,g;
if(bold==true){a='<b>';}
if(italic==true){b='<i>';}
if(underlined==true){c='<u>';}
d=text;
if(bold==true){e='</b>';}
if(italic==true){f='</i>';}
if(underlined==true){g='</u>';}
document.getElementById(objname).color=color;
document.getElementById(objname).innerHTML=a+b+c+d+e+f+g;
}

//Изменить текст элемента
function ChangeElementText(objname,newtext){
	document.getElementById(''+objname+'').innerHTML=''+newtext+'';
}

//Изменить цвет элемента
function ChangeElementColor(objname,newcolor){
	document.getElementById(''+objname+'').color=''+newcolor+'';
}

function ChangeElementSize(objname,size){
	document.getElementById(objname).innerHTML="<font size="+size+"></font>"

}

//Изменить событие элемента
function ChangeElementEvent(objname,newevent){
	document.getElementById(''+objname+'').setAttribute('onclick',newevent);
}

//Добавить подсказку
function ChangeElementTitle(objname,text){
	document.getElementById(objname).title=text;
	document.getElementById(objname).alt=text;
}

//Очистить элемент 
function ClearElement(objname){
	document.getElementById(objname).innerHTML='';
	document.getElementById(objname).onclick='';
}

//Спрятать или показать элемент
function HiddenElement(objname,value){
	document.getElementById(objname).hidden=value;
}

//Создание интерфейса
function CreateInterface(){
	
	//Фон
	document.body.style.backgroundImage = "url("+bgimage+")";
	//Меню
	document.write('<div id="menu">');
	CreateImage('https://drive.google.com/uc?id=1auZfZ6YnWhcTcbvknFEGMg1e5iyI0fSC&export=download');
	document.write('<p>');
	CreateButton('MStart','Новая игра', 'HiddenElement("menu",true);HiddenElement("Interface",false);	ST.Say("Здравствуй!Скажи, как тебя зовут?","Story01()")');
	document.write('<p>');
	CreateButton('MChapter','Выбрать главу');
	document.write('<p>');
	CreateButton('MSettings','Изменить имя','Player.name=AskQuestion("Введите ваше имя");');
	document.write('</div>');
	//Интерфейс игры
	document.write('<div id="Interface" hidden=true>');
	//Область для диалогов и кнопки далее
	document.write('<fieldset id="scroll">');
	document.write('<legend>');
	CreateTextArea('name','StoryTeller','green',true,false,true);
	document.write('</legend>');
	CreateTextArea('text','Text','black');
	document.write('</fieldset>');
	//Кнопки выбора действия и магазин
	CreateButton('next','👉','Story02()');
	for (i=0;i<3;i++){CreateButton('addact'+i,'','');document.write('<p>');}
	//Кнопки магазина
	document.write('<p>');
	for (i=0;i<ShopCells;i++){CreateButton('shop'+i,'','');}
	HideSpecialChoice();
	HideShop();
	//Имя персонажа
	document.write('<fieldset id="player">');
	document.write('<legend>');
	CreateButton('RPGPlayerName');
	document.write('</legend>');
	//Показатели персонажа
	CreateButton('RPGPlayerMoney',' 💰:'+Player.money);
	CreateButton('RPGPlayerHealth',' 💖:'+Player.health);
	CreateButton('RPGPlayerAttack',' ⚔️:'+Player.attack);
	CreateButton('RPGPlayerArmor',' 🎽:'+Player.armor);
	CreateButton('RPGPlayerStrength',' 💪:'+Player.strength);
	CreateButton('RPGPlayerAgility',' 🤸:'+Player.agility);
	CreateButton('RPGPlayerIntelligence',' 🧠:'+Player.intelligence);	
	document.write('</fieldset>');
	// Инвентарь
	document.write('<fieldset id="player">');
	document.write('<legend id="inv">');
	CreateTextArea('InvText','Инвентарь:','black',true,false,true);
	document.write('</legend>');
	for (var i=0; i<InvCellAmount;i++){CreateButton('InvCell'+i,'','');}
	document.write('</fieldset>');
	document.write('</div>');
	
}
//Обновление изменяемых элементов интерфейса
function RefreshInterface(){
	ChangeElementText('RPGPlayerName',Player.name);
	ChangeElementText('RPGPlayerMoney',' 💰:'+Player.money);
	ChangeElementText('RPGPlayerHealth',' 💖:'+Player.health);
	ChangeElementText('RPGPlayerAttack',' ⚔️:'+Player.attack);
	ChangeElementText('RPGPlayerArmor',' 🎽:'+Player.armor);
	ChangeElementText('RPGPlayerStrength',' 💪:'+Player.strength);
	ChangeElementText('RPGPlayerAgility',' 🤸:'+Player.agility);
	ChangeElementText('RPGPlayerIntelligence',' 🧠:'+Player.intelligence);
	for(i=0;i<InvCellAmount;i++){
		if (document.getElementById('InvCell'+i).getAttribute('onclick')==''){
		HiddenElement('InvCell'+i,true);}
		else{
			HiddenElement('InvCell'+i,false);}
	
	}
}
