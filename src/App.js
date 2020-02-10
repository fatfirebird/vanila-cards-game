import Card from './Card';
import '@styles/style';

const card = new Card();
card.cardsArr.map((value, id) => card.createCards(id));

document.querySelectorAll('.cards-container__card').forEach(div => 
  div.addEventListener('click', e => {
    e.preventDefault();
    const elem = e.target;

    if (!elem.classList.contains('cards-container__card--compared')) {
      const eq = checkClassList(elem);
      if (eq) return setAsCompared(eq);

    }
  })
)

const checkClassList = elem => {
  if (elem.classList.contains('cards-container__card--selected')) {
    elem.classList.remove('cards-container__card--selected');
    return card.removeChoice(elem.id);
  } else {
    elem.classList.add('cards-container__card--selected');
    return card.addChoice(elem.id);
  }
}

const setAsCompared = arr => {
  for (let i = 0; i < arr.length; i++) {
    const id = arr[i]
    const div = document.getElementById(id);
    div.classList.remove('cards-container__card--selected');
    div.classList.add('cards-container__card--compared');
  }
  
}