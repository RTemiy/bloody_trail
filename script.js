//ITEMS
const Entities = [];
Entities["🥔"] = new Entity({
    type: "Food",
    icon: "🥔",
    name: "🥔 Печёный картофель 🍴",
    title: "Он уже конечно невкусный...",
    cost: 2,
    money: 1,
    health: 10,
    poison: 5,
    stress: 0,
    hunger: 20,
});
Entities["🍖"] = new Entity({
    type: "Food",
    icon: "🍖",
    name: "🍖 Окорок 🍴",
    title: "Такой сочный и такой жирный— про голод можно будет забыть на долго",
    cost: 5,
    money: 2,
    health: 50,
    poison: 5,
    stress: 0,
    energy: 100,
    hunger: 100,
});
Entities["🍗"] = new Entity({
    type: "Food",
    icon: "🍗",
    name: "🍗 Куриные ножки 🍴",
    title: "Что-то очень напопинает, пальчики оближешь!",
    cost: 2,
    money: 1,
    health: 10,
    poison: 10,
    stress: 0,
    energy: 50,
    hunger: 25,
});
Entities["🍺"] = new Entity({
    type: "Food",
    icon: "🍺",
    name: "🍺 Пиво 🍴",
    title: "Не стоит перебарщивать с этим напитком...",
    cost: 1,
    money: 1,
    health: 10,
    poison: 25,
    stress: 25,
    energy: 25,
    hunger: 10,
});
Entities["🗡"] = new Entity({
    type: "Wearable",
    icon: "🗡",
    name: "🗡 Простой меч 🖐",
    title: "Хорошо хоть не деревянный",
    cost: 5,
    damage: 1,
});

//STORYLINE

/*
Script[""]= new Dialog({
    name: "",
    text: "",
    alternative: ,
    rpc: ,
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

var Script = [];
Script.Actual;
Script.Set = function (a) {
    Script[a].Set();
    Script.Actual = a;
}

Script["Start"] = new Dialog({
    name: "📖 Рассказчик",
    text: "Добро пожаловать! О чём ты хочешь знать?",
    buttontext01: "Как всё работает?",
    buttontext02: "Ничего не хочу знать!",
    buttonaction01: "Script.Set('Q02')",
    buttonaction02: "Script.Set('Q04')",
});

Script["Q02"] = new Dialog({
    name: "📖 Рассказчик",
    text: "Эта игра представляет из себя, текстовый квест. В данном проекте реализовано: инвентарь, диалоги, сражения и показатели игрока",
    buttontext01: "Понятно",
    buttonaction01: "Script.Set('Q03')",
    music: new SoundEntity("https://rtemiy.github.io/bloody_trail/Sounds/Intro.mp3"),
});

Script["Q03"] = new Dialog({
    name: "📖 Рассказчик",
    text: "Сверху можно узнать, с кем ты общаешься, далее текст и кнопки выбора действий. Следующее меню— это показатели персонажа. <p> Уровень—🏆 Деньги—💰 Урон—🗡<p> Здоровье—❤ Голод—🍽 Стресс—🤯 Отравление—🤢 <p> Сила—💪 Ловкость—🦶 Интеллект—🧠 Удача—🍀 <p>Броня—🛡 Шаги—👣<p> Далее инвентарь. Есть используемые и носимые предметы. Используемые дают бонус единожды при нажатии, а носимые дают бонус пока находятся в инвентаре ",
    buttontext01: "Хмм... Думаю всё понятно!",
    buttonaction01: "Script.Set('Q04')",
});

Script["Q04"] = new Dialog({
    name: "📖 Рассказчик",
    text: "Раз уж, пока вопросов нет, то можно отправиться в путешествие, но сначала давай определимся с твоими характеристиками. Выбери 1 показатель, который ты бы хотел улучшить",
    buttontext01: "+1 к силе",
    buttontext02: "+1 к ловкости",
    buttontext03: "+1 к интеллекту",
    buttontext04: "+1 к удаче",
    buttontext05: "+5 золотых монет",
    buttonaction01: "Script.Set('MainStreet');Player.Strength+=1;",
    buttonaction02: "Script.Set('MainStreet');Player.Agility+=1;",
    buttonaction03: "Script.Set('MainStreet');Player.Intelligence+=1;",
    buttonaction04: "Script.Set('MainStreet');Player.Luck+=1;",
    buttonaction05: "Script.Set('MainStreet');Player.Money+=5;",
});

Script["MainStreet"] = new Dialog({
    name: "📖 Рассказчик",
    text: "Перед тобой открывается небольшой средневековый город. Люди торопятся по своим делам. Вдалеке, прямо по дороге виден рынок, слева— лавка ведьмака, а справа таверна",
    buttontext01: "Пойти к рынку",
    buttontext02: "Зайти к ведьмаку",
    buttontext03: "Направиться к таверне",
    buttonaction01: "Script.Set('MarketPlace')",
    buttonaction02: "Script.Set('WitcherStore')",
    buttonaction03: "Script.Set('Tavern')",
    ambient: new SoundEntity("https://rtemiy.github.io/bloody_trail/Sounds/MainStreet.mp3"),
});

Script["Tavern"] = new Dialog({
    name: "📖 Рассказчик",
    text: "В любое время здесь шум и гам: пьяные спорят, официанты носятся в суматохе, а местный кот с наслаждением созерцает столь прекрасную картину",
    buttontext01: "Заказать перекус",
    buttontext02: "Погладить кота",
    buttontext03: "Попытаться проникнуть в подвал",
    buttontext04: "Попытать удачу в 'камень, ножницы, бумага'",
    buttontext05: "Уйти",
    buttonaction01: "Script.Set('TavernFood')",
    buttonaction02: "Script.Set('TavernCat');",
    buttonaction03: 'new SkillTest("Easy",Player.Agility,()=>{Player.Stress+=15;Script.Set("TavernBasement")},()=>{Script["Tavern"].ButtonActive[3]=true;Player.Stress+=25;})',
    buttonaction04: "if(Player.Money>=1){Script.Set('TavernGame')}else{Info.New({text:'Не хватает денег!'});}",
    buttonaction05: "Script.Set('MainStreet')",
    ambient: new SoundEntity("https://rtemiy.github.io/bloody_trail/Sounds/Tavern.mp3"),
});

Script["TavernBasement"]= new Dialog({
    name: "📖 Рассказчик",
    text: "",
    buttontext01: "",
    buttontext02: "",
    buttontext03: "",
    buttontext04: "",
    buttontext05: "Уйти",
    buttonaction01: "",
    buttonaction02: "",
    buttonaction03: "",
    buttonaction04: "",
    buttonaction05: "Script.Set('Tavern');",
});

Script["TavernFood"] = new Dialog({
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
    buttonaction05: "Script.Set('Tavern');",
});

Script["TavernGame"] = new Dialog({
    name: "🧖🏻‍♂️Местный доходяга",
    text: "Если выйграешь, то отдам тебе 1 золотую, а, думаю ты и так согласен",
    rps: new RockPaperScissors(
        "Random",
        () => { Script[Script.Actual].RPS.Repeat(), Script.Set('Tavern'), Player.Money++, Player.Stress += 15 },
        () => { Script[Script.Actual].RPS.Repeat(), Script.Set('Tavern'), Player.Money -= 1, Player.Stress += 25 })
});

Script["TavernCat"]= new Dialog({
    name: "🐈‍⬛‍ Чёрный кот",
    text: "Кот наблюдает и не хочет разговаривать. Можно попытаться заставить его обратить на вас внимание",
    buttontext01: "Попытать удачу",
    buttontext02: "Испытать интеллект",
    buttontext03: "Заставить силой",
    buttontext04: "Защекотать",
    buttontext05: "Уйти",
    buttonaction01: "new SkillTest('Easy',Player.Luck,() => {Script.Set('TavernCatDialog')},() => {Script.Set('Tavern');Player.Stress+=15;Script['Tavern'].ButtonActive[1]=true})",
    buttonaction02: "new SkillTest('Easy',Player.Intelligence,() => {Script.Set('TavernCatDialog')},() => {Script.Set('Tavern');Player.Stress+=15;Script['Tavern'].ButtonActive[1]=true})",
    buttonaction03: "new SkillTest('Easy',Player.Strength,() => {Script.Set('TavernCatDialog')},() => {Script.Set('Tavern');Player.Stress+=15;Script['Tavern'].ButtonActive[1]=true})",
    buttonaction04: "new SkillTest('Easy',Player.Agility,() => {Script.Set('TavernCatDialog')},() => {Script.Set('Tavern');Player.Stress+=15;Script['Tavern'].ButtonActive[1]=true})",
    buttonaction05: "Script.Set('Tavern');",
});

Script["TavernCatDialog"]= new Dialog({
    name: "🐈‍⬛ Чёрный кот",
    text: "Странно, что ты меня заметил, и поздравляю, теперь у тебя есть знакомый говорящий кот. В целом я владелец таверны. Последнее время у нас кончается пиво, а без магии здесь никуда, местные работяги совсем обленились, бочки таскать никто не отменял, если найдёшь способ быстро и легко их перетащить, то беги ко мне! Дам 10 золотых и постоянную работу!",
    buttontext01: "Взять задание",
    buttontext02: "",
    buttontext03: "",
    buttontext04: "",
    buttontext05: "Отказаться и уйти",
    buttonaction01: "Script.Set('Tavern');Script['Tavern'].ButtonActive[1]=true",
    buttonaction02: "",
    buttonaction03: "",
    buttonaction04: "",
    buttonaction05: "Script.Set('Tavern');Script['Tavern'].ButtonActive[1]=true",
});

Script["MarketPlace"] = new Dialog({
    name: "📖 Рассказчик",
    text: "Вот он— классический средневековый рынок. Где-то торговка пытается договориться о выгодной сделке. Рядом с её лавкой кузница, где мастер куёт оружие для всего города",
    buttontext01: "Подойти к торговке",
    buttontext02: "Поговорить с кузнецом",
    buttontext03: "",
    buttontext04: "Пройти к выходу в лес",
    buttontext05: "Уйти",
    buttonaction01: "Script.Set('MarketWoman')",
    buttonaction02: "Script.Set('MarketSmith')",
    buttonaction03: "",
    buttonaction04: "Script.Set('ExitToForest')",
    buttonaction05: "Script.Set('MainStreet')",
});

Script["MarketWoman"]= new Dialog({
    name: "👩🏾‍🌾 Торговка",
    text: "",
    buttontext01: "",
    buttontext02: "",
    buttontext03: "",
    buttontext04: "",
    buttontext05: "Уйти",
    buttonaction01: "",
    buttonaction02: "",
    buttonaction03: "",
    buttonaction04: "",
    buttonaction05: "Script.Set('MarketPlace')",
});

Script["MarketSmith"]= new Dialog({
    name: "👨🏻‍🔧 Кузнец",
    text: "У меня сейчас мало ресурсов, но могу предложить меч за 5 золотых. Если принесёшь сферу защиты, то смогу предложить тебе броню",
    buttontext01: "🗡 Меч",
    buttontext02: "",
    buttontext03: "",
    buttontext04: "",
    buttontext05: "Уйти",
    buttonaction01: "Player.Buy(Entities['🗡'])",
    buttonaction02: "",
    buttonaction03: "",
    buttonaction04: "",
    buttonaction05: "Script.Set('MarketPlace')",
});

Script["ExitToForest"]= new Dialog({
    name: "📖 Рассказчик",
    text: "Ворота ведущие в тёмный лес охраняются двумя стражниками. Справа родной дом, слева колодец, где все набирают воду",
    buttontext01: "Пойти домой",
    buttontext02: "",
    buttontext03: "",
    buttontext04: "",
    buttontext05: "Уйти",
    buttonaction01: "Script.Set('Home')",
    buttonaction02: "",
    buttonaction03: "",
    buttonaction04: "",
    buttonaction05: "Script.Set('MarketPlace')",
});

Script["Home"]= new Dialog({
    name: "📖 Рассказчик",
    text: "Дома всегда хорошо в углу стоит кровать, можно успокоить нервишки и восстановить здоровье в обмен на сытость",
    buttontext01: "🛏",
    buttontext02: "",
    buttontext03: "",
    buttontext04: "",
    buttontext05: "Уйти",
    buttonaction01: "Player.Stress=Player.MinHealth; Player.Energy=Player.MaxHealth;Player.Hunger-=50",
    buttonaction02: "",
    buttonaction03: "",
    buttonaction04: "",
    buttonaction05: "Script.Set('MainStreet')",
});

Script["WitcherStore"] = new Dialog({
    name: "🦹🏻‍♂️ Ведьмак",
    text: "Дверь в лавку неприятно скрипит; ведьмака это не тревожит. В дальнем углу, между ящиками он разбирает склад трав. Также поражает огромный стеллаж с книгами. Где-то колдовство, где-то травничество и забавно, что есть книги по кулинарии",
    buttontext01: "Поговорить с ведьмаком",
    buttontext02: "",
    buttontext03: "",
    buttontext04: "",
    buttontext05: "Уйти",
    buttonaction01: "Script.Set('Witcher01')",
    buttonaction02: "",
    buttonaction03: "",
    buttonaction04: "",
    buttonaction05: "Script.Set('MainStreet')",
});

Script["Witcher01"] = new Dialog({
    name: "🦹🏻‍♂️ Ведьмак",
    text: "Я сейчас очень занят, поэтому попрошу меня не отвлекать, хотя если ты ищешь работу, есть у меня парочка заданий",
    buttontext01: "Поговорить о задании",
    buttontext02: "",
    buttontext03: "",
    buttontext04: "",
    buttontext05: "Уйти",
    buttonaction01: "Script.Set('Witcher02')",
    buttonaction02: "",
    buttonaction03: "",
    buttonaction04: "",
    buttonaction05: "Script.Set('MainStreet')",
});

Script["Witcher02"] = new Dialog({
    name: "🦹🏻‍♂️ Ведьмак",
    text: "Вот что я могу тебе предложить:",
    buttontext01: "Забрать долг",
    buttontext02: "",
    buttontext03: "",
    buttontext04: "",
    buttontext05: "Уйти",
    buttonaction01: "Script.Set('WitcherQuest01')",
    buttonaction02: "",
    buttonaction03: "",
    buttonaction04: "",
    buttonaction05: "Script.Set('MainStreet')",
});

Script["WitcherQuest01"] = new Dialog({
    name: "🦹🏻‍♂️ Ведьмак",
    text: "Есть одна книга— Продвинутое травничество. Кто-то взял её из библиотеки, она мне очень нужна. Дам за неё 5 золотых",
    buttontext01: "Взять задание",
    buttontext02: "Задание выполнено",
    buttonactive02: true,
    buttontext03: "Уйти",
    buttontext04: "",
    buttontext05: "",
    buttonaction01: "Script.Set('MainStreet'); Script['WitcherQuest01'].ButtonActive[0]=true",
    buttonaction02: "Player.Money-=5",
    buttonaction03: "Script.Set('MainStreet')",
    buttonaction04: "",
    buttonaction05: "",
});