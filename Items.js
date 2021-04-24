//Звуки
var shopsound = new Audio('https://drive.google.com/uc?id=1U-usQ5IuxSIp_f0LAburCzMpdF-7AbBi&export=download');
var foodsound = new Audio ("https://drive.google.com/uc?id=1_dRHqzk6AWBNNazxO-DxuxH5XHZGVxWv&export=download");
var weaponsound = new Audio ("https://drive.google.com/uc?id=1yTEHU8PIgnmN6JTBnkYiOaQZB6JwrODb&export=download");
var keysound = new Audio ('https://drive.google.com/uc?id=1sdfgO5pL6XWO3BZHS4Vrp-ytKJo4Cuji&export=download');
var booksound = new Audio ('https://drive.google.com/uc?id=1cuw5eSPcz7wE3aw3pbqnmqd1A-EbQKoU&export=download');
var bagsound = new Audio ('https://drive.google.com/uc?id=1PIlJO08Jk9DoTpTqETbDSSN2DToz2Ijt&export=download');
var armorsound = new Audio ('https://drive.google.com/uc?id=1CL3R2uQQFvD1C6v2TdDPfZKhF0GgcfEN&export=download')


//Создание предметов
function Item(values){
	var values = values || {};
	this.name = values.name || 'Предмет';
	this.title= values.title || "";
	this.icon = values.icon || "❓";
	this.type = values.type || "Consumable";
	this.amount = values.amount || 0;
	this.cost = values.cost || 1;
	this.health = values.health || 0;
	this.attack = values.attack || 0;
	this.armor = values.armor || 0;
	this.strength = values.strength || 0;
	this.agility = values.agility || 0;
	this.intelligence = values.intelligence || 0;
	this.bagcell = values.bagcell || 0;
	this.use = function(){
		check=confirm(this.title+'');
		if (check){if(this.type == "money"){Player.money+=this.cost;shopsound.play();}
		if(this.type=='food'){foodsound.play();}
		if(this.type=='weapon'){weaponsound.play();}
		if(this.type=='armor'){armorsound.play();}
		if(this.type=='key'){keysound.play();}
		if(this.type=='atrib'){booksound.play();}
		this.amount-=1;
		Player.health+=	this.health;
		Player.attack+=	this.attack;
		Player.armor+=	this.armor;
		Player.strength+= this.strength;
		Player.agility+= this.agility;
		Player.intelligence+= this.intelligence;
		InvCellAmount += this.bagcell;
		for (var i=0;i<InvCellAmount;i++){
		if (document.getElementById('InvCell'+i).getAttribute('onclick')=="Inv."+this.name+'.use();'){
			ChangeElementText('InvCell'+i,"");	
			ChangeElementEvent('InvCell'+i,"");
			i=InvCellAmount;
			RefreshInterface();
	}}}}
		
	this.add = function(){
		bagsound.play();
		for (i=0;i<InvCellAmount;i++){
		if (document.getElementById('InvCell'+i).getAttribute('onclick')==''){
		this.amount+=1;
		ChangeElementText('InvCell'+i,this.icon);
		ChangeElementTitle('InvCell'+i,this.title);
		ChangeElementEvent('InvCell'+i,"Inv."+this.name+'.use();');
		i=InvCellAmount;
		RefreshInterface();
}}}
	this.buy = function(){
		check =confirm(this.title+'  Стоимость: '+this.cost);
		if(check){
		Player.money-=this.cost;
		if(Player.money<0){Player.money+=this.cost;}
		else{this.add();shopsound.play();}
		RefreshInterface();}}
	this.addtoshop = function(objname){
		ChangeElementText(objname,this.icon);
		ChangeElementTitle(objname,this.title);
		ChangeElementEvent(objname,"Inv."+this.name+'.buy();');
	}
	this.give = function(){
		this.amount-=1;
		for (var i=0;i<InvCellAmount;i++){
		if (document.getElementById('InvCell'+i).getAttribute('onclick')=="Inv."+this.name+'.use();'){
			ChangeElementText('InvCell'+i,"");	
			ChangeElementEvent('InvCell'+i,"");
			i=InvCellAmount;
			RefreshInterface();
		}}
	}
}

//Магазин
//Кол-во ячеек
var ShopCells = 9; 

//Создаём магазин
function CreateShop(...params){
	for (i=0;i<ShopCells;i++){
		params[i].addtoshop("shop"+i);
		if (document.getElementById('shop'+i).onclick!=''){HiddenElement("shop"+i,false);}
	}

}

//Спрятать магазин
function HideShop(){
	for (i=0;i<ShopCells;i++){HiddenElement('shop'+i,true);}
}

//База данных
//Создаём Предметы
var Inv={
	//Еда
	Apple : new Item({
	name:'Apple',
	icon:'🍎',
	cost:2,
	health:1,
	title: "Простое яблоко. Вылечит тебя.",
	type:'food'
	}),

	Bread : new Item({
	name:'Bread',
	icon:'🍞',
	cost: 3,
	health:2,
	title:'Хлеб всему голова.',
	type:'food'
	}),

	Stew : new Item({
	name:'Stew',
	icon:'🍲',
	cost: 4,
	health:3,
	title:'Суп заряжает силами на весь день!',
	type:'food'
	}),

	Pie : new Item({
	name:'Pie',
	icon:'🥧',
	cost: 5,
	health:5,
	title:'Свежий пирог— лучшее, что может спасти во время мучительной битвы.',
	type:'food'
	}),

//Оружие
	Spoon : new Item({
	name:'Spoon',
	icon:'🥄',
	cost: 5,
	attack:1,
	title:'Ложкой по лбу!',
	type:'weapon'
	}),

	SKnife : new Item({
	name:'SKnife',
	icon:'🔪',
	cost: 10,
	attack:2,
	title:'Лучше бить ножом, чем кулаками.',
	type:'weapon'
	}),

//Броня
	SArmor : new Item({
	name:"SArmor",
	icon:"🎽",
	cost:10,
	armor: 1,
	title:"Это сложно названть бронёй, но это хоть что-то...",
	type:"armor"
	}),

//Обучение
	IntBook : new Item({
	name:'IntBook',
	icon:'📘',
	cost:10,
	intelligence:1,
	title:"Эта книга даст тебе знания.",
	type:'atrib'
	}),

	PHerb : new Item({
	name:'PHerb',
	icon:'🌱',
	cost:10,
	strength:1,
	title:"Съешь меня и станешь большим.",
	type:"food"
	}),

	Ball : new Item({
	name:'Ball',
	icon:'⚽️',
	cost: 10,
	agility:1,
	title:'Никогда не поздно начать заниматься спортом.',
	type: 'atrib'
	}),

//Сюжет и награды
	Key01 : new Item({
	name:'Key01',
	icon:'🔑',
	cost:0,
	title:"Ключ отпирающий почти все двери в королевстве. ПОЧТИ.",
	type: 'key'
	}),

	Purse : new Item({
	name:'Purse',
	icon:'👛',
	type: "money",
	cost:5,
	title:"Ваш кошелёк. Кажется там есть деньги."
	}),

	Cake : new Item({
	name:'Cake',
	icon:'🍰',
	cost:10,
	title:"Чарующий торт, даже заклятый противник станет вам другом!",
	type:'food'
	}),

	Pass01 : new Item({
	name:'Pass01',
	icon:'📜',
	cost:10,
	title:"Королевский пропуск. Пустят куда угодно. ПОЧТИ. Но один раз.",
	type:'attrib'
}),

}
