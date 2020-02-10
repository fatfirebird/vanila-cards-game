import Card from './Card';
import createPopup from './newGame';
import '@styles/style';

const card = new Card();


const getClick = () => document.querySelectorAll('.cards-container__card').forEach(div => 
  div.addEventListener('click', e => {
    e.preventDefault();
    const elem = e.target;
    if (!elem.classList.contains('cards-container__card--compared') && !elem.classList.contains('disabled')) {
      card.addChoice(elem);
    }
    checkCompared();
  })
)

const startNewGame = e => {
  if (e) {
    e.preventDefault();
    document.querySelectorAll('.cards-container__card')
    .forEach(div => div.remove());
  }

  card.cardsArr.map((value, id) => card.createCards(value, id));
  return getClick()
}

startNewGame();

const checkCompared = () => {
  const compared = document.querySelectorAll('.cards-container__card--compared');

  if (compared.length === 16) {
    const popup = createPopup();
    const app = document.getElementById('app');
    app.append(popup);
    popup.querySelector('#start-button').addEventListener('click', e => {
      popup.remove();
      return startNewGame(e, popup);
    })
  }
}
