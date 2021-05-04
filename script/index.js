window.addEventListener('DOMContentLoaded', () => {
    const card = document.querySelector('.card__inner');
    const app = document.querySelector('.card');
    const db = './db/dbHeroes.json';


    function heroCards() {
        const db = 'https://heroescards-da99b-default-rtdb.europe-west1.firebasedatabase.app/db.json';
        fetch(db)
            .then(resp => resp.json())
            .then(data => heroCardsInfo(data))
            .catch((e) => alert(e));
    }

    function heroCardsInfo(dataInfo) {
        app.textContent = '';
        console.log(dataInfo);
        for (let i = 0; i < dataInfo.length; i++) {
            app.appendChild(createHeroCards(dataInfo[i]))
        }
    }

    function createHeroCards(dataInfo) {
        const cardMarkup = `
            <div class="card__face card__face--front">
                <h2>${dataInfo.name}</h2>
            </div>
            <div class="card__face card__face--back">
                <div class="card__content">
                    <div class="card__header">
                        <img src="${dataInfo.photo}" alt="" class="pp" />
                        <h2>${dataInfo.realName}</h2>
                    </div>
                    <div class="card__body">
                        <h3>JavaScript Wizard</h3>
                        <p>Lorem ipsum <strong>dolor</strong> sit amet, consectetur <strong>adipiscing</strong> elit.
                            Sed id erat a magna lobortis dictum. Nunc est arcu, <strong>lacinia</strong> quis sapien
                            placerat, <strong>laoreet</strong> tincidunt nulla.</p>
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

    heroCards();

    function sort() {
        const buttons = document.querySelectorAll('.card__category');
        const cards = document.querySelectorAll('.card__inner');
       

        function filter(category, items) {
            items.forEach(item => {
                const isItemFiltered = !item.classList.contains(category);
                const isShowAll = category.toLowerCase() === 'all';
                if (isItemFiltered && !isShowAll) {
                    item.classList.add('hide');
                } else {
                    item.classList.remove('hide');
                }
            })
        }
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                console.log(cards);
                const currentCategory = button.dataset.filter;
                console.log(currentCategory)
                filter(currentCategory, cards);
            });
        });
    }
    sort()
});