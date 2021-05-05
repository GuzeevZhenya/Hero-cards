//Из того что криво работает:
//1) поисковик не до конца понятно как сделать, он выдает только тогда
//когда имя написано правильно, я попробовал сделать,чтобы удаляло тире
//и писало новое слово с большой буквы, но тогда не работает поиск
//ant-man, остальные более или менее
//2) косяк в выводе male и female, я так понимаю оно конфликтует из за 
//условия
//3) 4 карточка(black widow) не подсвечивается темным, т.к у нее статус жив, но при этом
// есть дата смерти...хммммм вопросик, как тогда сделать? Условием аля
// если жива и при этом есть дата смерти, то она жива????
//4) ну и думал сделать чтобы поисковик выводил при вводе букв, искал
//имена которые начинаются ,Но пока не до конца придумал как сделать


window.addEventListener('DOMContentLoaded', () => {
    const app = document.querySelector('.card');
    const cardInput = document.querySelector('.card__input');
    const buttons = document.querySelectorAll('.card__category');
    const buttonMain = document.querySelector('.buttons');
    const searchButton = document.querySelector('.searching-button');
    //Получаем данные из сервера
    function heroCards(status) {
        const db = 'https://heroescards-da99b-default-rtdb.europe-west1.firebasedatabase.app/db.json';
        fetch(db)
            .then(resp => resp.json())
            .then(data => heroCardsInfo(data, status))
            .catch((e) => alert(e));
    }
    //Выводим данные на страницу
    function heroCardsInfo(dataInfo, status) {
        app.textContent = '';
        for (let i = 0; i < dataInfo.length; i++) {
            if (status === 'all') {
                app.appendChild(createHeroCards(dataInfo[i]))
            }
            if (dataInfo[i].name === status) {
                app.appendChild(createHeroCards(dataInfo[i]))
            }
            // if (dataInfo[i].gender === 'female') {
            //     app.appendChild(createHeroCards(dataInfo[i]))
            // }

            // if (dataInfo[i].gender === 'male') {
            //     app.appendChild(createHeroCards(dataInfo[i]))
            // }

            if (dataInfo[i].status === status) {
                app.appendChild(createHeroCards(dataInfo[i]))
            }
        }
    }


    cardInput.addEventListener('input',()=>{
        let searchValue = cardInput.value;
    //    let newWord= searchValue.split(/\s+/).map(word => word[0].toUpperCase() + word.splice(1)).join(' ')
    
    //  newWord = searchValue.replace(/(^|\s)\S/g, function(a) {return a.toUpperCase()})
    let newWord = searchValue.replace(/-|\s/g," ");
    let result = newWord.replace(/(^|\s)\S/g, function(a) {return a.toUpperCase()})
    // let result2 = result.trim().replace(/[^a-zA-Z0-9 -]/, "").replace(/\s/g, "-");
         heroCards(result);
    })

    buttonMain.addEventListener('click', (e) => {
        let target = e.target;

        if (target.classList.contains('button-dead')) {
            heroCards('deceased');
        }
        if (target.classList.contains('button-alive')) {
            heroCards('alive');
        }
        if (target.classList.contains('button-all')) {
            heroCards('all');
        }
        if (target.classList.contains('button-female')) {
            heroCards('female');
        }
        if (target.classList.contains('button-male')) {
            heroCards('male');
        }
    })


    //Создаем карточки героев
    function createHeroCards(dataInfo) {
        const cardMarkup = `
            <div class="card__face card__face--front ${dataInfo.status ==='deceased'?'dead-style':'alive-style'}">
                <h2>${dataInfo.name}</h2>
            </div>
            <div class="card__face card__face--back">
                <div class="card__content">
                    <div class="card__header ${dataInfo.status ==='deceased'?'dead-style':'alive-style'}">
                        <img src="${dataInfo.photo}" alt="" class="pp" />
                        <h2>${dataInfo.realName?dataInfo.realName:dataInfo.name}</h2>
                    </div>
                     
                        <h3></h3>
                         <ul class="card__body">
                            <li><span>Дата рождения: ${dataInfo.birthDay?dataInfo.birthDay:'Неизвестно'}</li>
                            <li></li>
                            <li><span>Пол: ${dataInfo.gender}</li>
                            <li><span>Раcа: ${dataInfo.species}</li>
                            <li><span>Статус: ${dataInfo.status} ${dataInfo.deathDay?'' + dataInfo.deathDay:''}</li>
                            <li></li>
                            <li></li>
                         </ul>
                    </div>
                </div>
        </div>`

        const cardBlock = document.createElement('div');
        cardBlock.className = `card__inner ${dataInfo.status}`;
        cardBlock.innerHTML = cardMarkup;
        cardBlock.addEventListener('click', function () {
            cardBlock.classList.toggle('is-flipped')
        })
        return cardBlock;
    }

});