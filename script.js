//ITEMS
const Entities = [];
Entities["🥔"] = new Entity({
    type: "Item",
    icon: "🥔",
    name: "🥔 Печёный картофель",
    title: "Он уже конечно невкусный...",
    cost: 2,
    money: 1,
    health: 10,
    poison: 5,
    stress: 0,
    hunger: 20,
});
Entities["🍖"] = new Entity({
    type: "Item",
    icon: "🍖",
    name: "🍖 Окорок",
    title: "Такой сочный и такой жирный— про голод можно будет забыть на долго",
    cost: 5,
    money: 2,
    health: 50,
    poison: 5,
    stress: 0,
    hunger: 100,
});
Entities["🍗"] = new Entity({
    type: "Item",
    icon: "🍗",
    name: "🍗 Куриные ножки",
    title: "Что-то очень напопинает, пальчики оближешь!",
    cost: 2,
    money: 1,
    health: 10,
    poison: 10,
    stress: 0,
    hunger: 25,
});
Entities["🍺"] = new Entity({
    type: "Item",
    icon: "🍺",
    name: "🍺 Пиво",
    title: "Не стоит перебарщивать с этим напитком...",
    cost: 1,
    money: 1,
    health: 10,
    poison: 25,
    stress: 25,
    hunger: 10,
});

//STORYLINE

/*
= new Dialog({
    name: "",
    text: "",
    buttontext01: "",
    buttontext02: "",
    buttontext03: "",
    buttontext04: "",
    buttontext05: "",
    buttonaction01: "",
    buttonaction02: "",
    buttonaction03: "",
    buttonaction04: "",
    buttonaction05: "",
});
*/

Q01 = new Dialog({
    name: "📖 Рассказчик",
    text: "Добро пожаловать! О чём ты хочешь знать?",
    buttontext01: "Как всё работает?",
    buttontext02: "Ничего не хочу знать!",
    buttonaction01: "Q02.Set()",
    buttonaction02: "Q04.Set()",
});

Q02 = new Dialog({
    name: "📖 Рассказчик",
    text: "Эта игра представляет из себя, текстовый квест. В данном проекте реализовано: инвентарь, диалоги, сражения и показатели игрока",
    buttontext01: "Понятно",
    buttonaction01: "Q03.Set()",
    music: new SoundEntity("https://rtemiy.github.io/bloody_trail/Sounds/Intro.mp3"),
});
Q03 = new Dialog({
    name: "📖 Рассказчик",
    text: "Сверху можно узнать, с кем ты общаешься, далее текст и кнопки выбора действий. Следующее меню— это показатели персонажа. <p> Уровень—🏆 Деньги—💰 Урон—🗡<p> Здоровье—❤ Голод—🍽 Стресс—🤯 Отравление—🤢 <p> Сила—💪 Ловкость—🦶 Интеллект—🧠 Удача—🍀 <p>Броня—🛡 Шаги—👣<p> Далее инвентарь. Есть используемые и носимые предметы. Используемые дают бонус единожды при нажатии, а носимые дают бонус пока находятся в инвентаре ",
    buttontext01: "Хмм... Думаю всё понятно!",
    buttonaction01: "Q04.Set()",
});
Q04 = new Dialog({
    name: "📖 Рассказчик",
    text: "Раз уж, пока вопросов нет, то можно отправиться в путешествие, но сначала давай определимся с твоими характеристиками. Выбери 1 показатель, который ты бы хотел улучшить",
    buttontext01: "+1 к силе",
    buttontext02: "+1 к ловкости",
    buttontext03: "+1 к интеллекту",
    buttontext04: "+1 к удаче",
    buttontext05: "+5 золотых монет",
    buttonaction01: "MainStreet.Set();Player.Strength+=1;",
    buttonaction02: "MainStreet.Set();Player.Agility+=1;",
    buttonaction03: "MainStreet.Set();Player.Intellegence+=1;",
    buttonaction04: "MainStreet.Set();Player.Luck+=1;",
    buttonaction05: "MainStreet.Set();Player.Money+=5;",
});

MainStreet = new Dialog({
    name: "📖 Рассказчик",
    text: "Перед тобой открывается небольшой средневековый город. Люди торопятся по своим делам. Вдалеке, прямо по дороге виден рынок, слева— лавка ведьмака, а справа таверна",
    buttontext01: "Пойти к рынку",
    buttontext02: "Зайти к ведьмаку",
    buttontext03: "Направиться к таверне",
    buttonaction01: "MarketPlace.Set()",
    buttonaction02: "WitcherStore.Set()",
    buttonaction03: "Tavern.Set()",
    ambient: new SoundEntity("https://rtemiy.github.io/bloody_trail/Sounds/MainStreet.mp3"),
});

Tavern = new Dialog({
    name: "📖 Рассказчик",
    text: "В любое время здесь шум и гам: пьяные спорят, официанты носятся в суматохе, а местный кот с наслаждением созерцает столь прекрасную картину",
    buttontext01: "Заказать перекус",
    buttontext02: "Погладить кота",
    buttontext03: "Пообщаться с владельцем таверны",
    buttontext04: "Попытать удачу в 'камень, ножницы, бумага'",
    buttontext05: "Уйти",
    buttonaction01: "TavernFood.Set()",
    buttonaction02: "",
    buttonaction03: "",
    buttonaction04: "TavernGame.Set()",
    buttonaction05: "MainStreet.Set()",
    ambient: new SoundEntity("https://rtemiy.github.io/bloody_trail/Sounds/Tavern.mp3"),
});

TavernFood = new Dialog({
    name: "🤵🏼‍♀️ Официантка",
    text: "Добрейшего времени суток! Я могу предложить наш фирменный окорок за 5 золотых, но если вы хотите что-то по-бюджетнее, то возьмите хрустящие куриные ножки за 2 золотых, из напитков у нас только пиво по 1 золотому за пинту!",
    buttontext01: "🍖 Окорок",
    buttontext02: "🍗 Куриные ножки",
    buttontext03: "🍺 Пиво",
    buttontext04: "",
    buttontext05: "Уйти",
    buttonaction01: "Player.Buy(Entities['🍖'])",
    buttonaction02: "Player.Buy(Entities['🍗'])",
    buttonaction03: "Player.Buy(Entities['🍺'])",
    buttonaction04: "",
    buttonaction05: "Tavern.Set();",
});

TavernGame = new Dialog({
    name: "🧖🏻‍♂️Местный доходяга",
    text: "Если выйграешь, то отдам тебе 1 золотую, а, думаю ты и так согласен",
    game : new RockPaperScissors(
        "Random",
        ()=>{Tavern.Set(),Player.Money++,Player.Stress+=15},
        ()=>{Tavern.Set(),Player.Money-=1,Player.Stress+=25},)
});

MarketPlace = new Dialog({
    name: "📖 Рассказчик",
    text: "Вот он— классический средневековый рынок. Где-то торговка пытается договориться о выгодной сделке. Рядом с её лавкой кузница, где мастер куёт оружие для всего города",
    buttontext01: "Подойти к торговке",
    buttontext02: "Поговорить с кузнецом",
    buttontext03: "",
    buttontext04: "",
    buttontext05: "Уйти",
    buttonaction01: "",
    buttonaction02: "",
    buttonaction03: "",
    buttonaction04: "",
    buttonaction05: "MainStreet.Set()",
});

WitcherStore = new Dialog({
    name: "🦹🏻‍♂️ Ведьмак",
    text: "Дверь в лавку неприятно скрипит; ведьмака это не тревожит. В дальнем углу, между ящиками он разбирает склад трав. Также поражает огромный стеллаж с книгами. Где-то колдовство, где-то травничество и забавно, что есть книги по кулинарии",
    buttontext01: "Поговорить с ведьмаком",
    buttontext02: "",
    buttontext03: "",
    buttontext04: "",
    buttontext05: "Уйти",
    buttonaction01: "Witcher01.Set()",
    buttonaction02: "",
    buttonaction03: "",
    buttonaction04: "",
    buttonaction05: "MainStreet.Set()",
});

Witcher01 = new Dialog({
    text: "Я сейчас очень занят, поэтому попрошу меня не отвлекать, хотя если ты ищешь работу, есть у меня парочка заданий",
    alternative: function() {
        WitcherQuest01.Set()},
    buttontext01: "Поговорить о задании",
    buttontext02: "",
    buttontext03: "",
    buttontext04: "",
    buttontext05: "Уйти",
    buttonaction01: "Witcher02.Set()",
    buttonaction02: "",
    buttonaction03: "",
    buttonaction04: "",
    buttonaction05: "MainStreet.Set()",
});

Witcher02 = new Dialog({
    name: "",
    text: "Вот что я могу тебе предложить:",
    buttontext01: "Забрать долг",
    buttontext02: "",
    buttontext03: "",
    buttontext04: "",
    buttontext05: "Уйти",
    buttonaction01: "WitcherQuest01.Set()",
    buttonaction02: "",
    buttonaction03: "",
    buttonaction04: "",
    buttonaction05: "MainStreet.Set()",
});

WitcherQuest01 = new Dialog({
    name: "",
    text: "Есть одна книга— Продвинутое травничество. Кто-то взял её из библиотеки, она мне очень нужна. Дам за неё 5 золотых",
    buttontext01: "Взять задание",
    buttontext02: "Задание выполнено",
    buttonactive02: false,
    buttontext03: "Уйти",
    buttontext04: "",
    buttontext05: "",
    buttonaction01: "MainStreet.Set(); WitcherQuest01.ButtonActive[0]=false",
    buttonaction02: "Player.Money-=5",
    buttonaction03: "MainStreet.Set()",
    buttonaction04: "",
    buttonaction05: "",
});