const card = document.querySelector('.card__inner');
const db = './db/dbHeroes.json';

card.addEventListener('click', function () {
    card.classList.toggle('is-flipped')
})


// function heroCards() {
//     const db = './db/dbHeroes.json';
//     fetch('./db/dbHeroes.json')
//         .then((resp) => console.log(resp.json))
//         .then((data) => console.log(data))
// }

 

console.log(getHeroes());