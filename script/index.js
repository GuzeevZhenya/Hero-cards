
window.addEventListener('DOMContentLoaded', () => {
    const app = document.querySelector('.card');
    const cardInput = document.querySelector('.card__input');
    const buttons = document.querySelectorAll('.card__category');
    const buttonMain = document.querySelector('.buttons');
    const searchButton = document.querySelector('.searching-button');
    //Получаем данные из сервера
    function heroCards(status) {
        const db = 'https://marvel-data-base-default-rtdb.firebaseio.com/db.json';
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
            if (dataInfo[i].gender === status) {
                app.appendChild(createHeroCards(dataInfo[i]))
            }
            if (dataInfo[i].name === status) {
                app.appendChild(createHeroCards(dataInfo[i]))
            }
            if (dataInfo[i].status === status) {
                app.appendChild(createHeroCards(dataInfo[i]))
            }
        }
    }

    cardInput.addEventListener('input', () => {
        let searchValue = cardInput.value;
        let newWord = searchValue.replace(/-|\s/g, " ");
        let result = newWord.replace(/(^|\s)\S/g, function (a) {
            return a.toUpperCase()
        })
        heroCards(result);
    })

    buttonMain.addEventListener('click', (e) => {
        let target = e.target;
        cardInput.value = '';
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
                        <img src="${dataInfo.photo?dataInfo.photo:'no-image'}" alt="" class="pp" />
                        <h2>${dataInfo.realName?dataInfo.realName:dataInfo.name}</h2>
                    </div>
                     
                        <h3></h3>
                         <ul class="card__body">
                            <li>Актер:${dataInfo.actors}</li>
                            <li>Дата рождения: ${dataInfo.birthDay?dataInfo.birthDay:'Неизвестно'}</li>
                            <li>Пол: ${dataInfo.gender}</li>
                            <li>Граждансво:${dataInfo.citizenship}</li>
                            <li>Раcа: ${dataInfo.species}</li>
                            <li>Статус: ${dataInfo.status} ${dataInfo.deathDay?'' + dataInfo.deathDay:''}</li>
                           
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

//Preloader
document.body.onload = function () {
    setTimeout(function () {
        let preloader = document.getElementById('page-preloader');
        if (!preloader.classList.contains('done')) {
            preloader.classList.add('done')
        }
    }, 3000)
}

//Увеличение картинки при клике