//ITEMS
const Entities = [
    new Entity({
        type: "Item",
        icon: "🥔",
        name: "🥔 Печёный картофель",
        title: "Кто-то оставил на костре картошку",
        money: 1,
        health: 10,
        poison: 5,
        stress: 0,
        hunger: 25,
        rlevel: 1
    }),
];


//STORYLINE

/*
= new Dialog({
    name: "📖 ",
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
});

Q02 = new Dialog({
    name: "📖 Рассказчик",
    text: "Эта игра представляет из себя, текстовый квест. В данном проекте реализовано: инвентарь, диалоги, сражения и показатели игрока",
    buttontext01: "Понятно",
    buttonaction01: "Q03.Set()",
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
    buttonaction01: "MainStreet.Set();Kingdom.Player.Strength+=1",
    buttonaction02: "MainStreet.Set();Kingdom.Player.Agility+=1",
    buttonaction03: "MainStreet.Set();Kingdom.Player.Intellegence+=1",
    buttonaction04: "MainStreet.Set();Kingdom.Player.Luck+=1",
    buttonaction05: "MainStreet.Set();Kingdom.Player.Money+=5",
});
MainStreet = new Dialog({
    name: "📖 Рассказчик",
    text: "Перед тобой открывается небольшой средневековый город. Люди торопятся по своим делам. Вдалеке, прямо по дороге виден рынок, слева— лавка ведьмака, а справа площадь при мэрии ",
    buttontext01: "Пойти к рынку",
    buttontext02: "Зайти к ведьмаку",
    buttontext03: "Направится к зданию мэрии",
    buttonaction02: "WitcherStore.Set()",
    buttonaction03: "",
});

WitcherStore = new Dialog({
    name: "🦹🏻‍♂️ Ведьмак",
    text: "Дверь в лавку неприятно скрипит; ведьмака это не тревожит. В дальнем углу, между ящиками он разбирает склад трав. Также поражает огромный стеллаж с книгами. Где-то колдовство, где-то травничество и забавно, что есть книги по кулинарии",
    buttontext01: "",
    buttontext02: "",
    buttontext03: "",
    buttontext04: "",
    buttontext05: "Уйти",
    buttonaction01: "",
    buttonaction02: "",
    buttonaction03: "",
    buttonaction04: "",
    buttonaction05: "MainStreet.Set()",
});