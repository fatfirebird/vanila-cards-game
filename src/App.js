import Card from './Card';
import '@styles/style';

const card = new Card();
card.cardsArr.map((value, id) => card.createCards(value, id));

document.querySelectorAll('.cards-container__card').forEach(div => 
  div.addEventListener('click', e => {
    e.preventDefault();
    const elem = e.target;
    console.log(e.target.img);
    
    if (!elem.classList.contains('cards-container__card--compared') && !elem.classList.contains('disabled')) {
      card.addChoice(elem);
    }
  })
)