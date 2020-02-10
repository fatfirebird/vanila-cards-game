export default class Card {
  cards = ['1', '1', '2', '2', '3', '3', '4', '4', '5', '5', '6', '6', '7', '7', '8', '8']; 
  choice = new Map();

  get cardsArr() {
    return this._createArr();
  }

  _randomize(n) {
    return Math.floor(Math.random() * Math.floor(n));
  }

  _createArr() {
    for (let index = 0; index < this.cards.length; index++) {
      const j = this._randomize(this.cards.length);
      const k = this._randomize(this.cards.length);
      const t = this.cards[j];
      this.cards[j] = this.cards[k];
      this.cards[k] = t;
    }
    return this.cards;
  }

  _getIds(el1, el2) {
    const arr = [];
    let index = this.cards.indexOf(el1, 0);

    while (index !== -1) {
      arr.push(index);
      index = this.cards.indexOf(el1, index + 1)
    }
    
    return arr;
  }

  _removeSelect(arr) {
    for (let i = 0; i < arr.length; i++) {
      const div = document.getElementById(arr[i]);
      div.style.backgroundImage = null;
      div.classList.remove('cards-container__card--selected');
    }
    this._enable();
  }

  _enable() {
    const cards = document.querySelectorAll('.cards-container__card')
    cards.forEach(el => {
      el.classList.remove('disabled');
    });
  }

  _disable() {
    const cards = document.querySelectorAll('.cards-container__card')
    cards.forEach(el => {
      el.classList.add('disabled');
    });
  }

  _checkChoice() {
    let eq = false;
    const indexes = [];
    const values = [];
    
    for (const elem of this.choice) {
      indexes.push(elem[0]);
      values.push(elem[1])
    }
    
    if (indexes.length === 2) {
      if (values[0] === values[1]) {
        eq = indexes;
      } else {
        this._disable();
        setTimeout(() => this._removeSelect(indexes), 1000);
       }

       this.choice.clear();
    }
    
    return this._setAsCompared(eq);
  }

  _setAsCompared(arr) {
    for (let i = 0; i < arr.length; i++) {
      const id = arr[i]
      const div = document.getElementById(id);
      div.classList.remove('cards-container__card--selected');
      div.classList.add('cards-container__card--compared');
    }
  }

  createCards(value, id) {
    const div = document.createElement('div');
    div.className = 'cards-container__card';
    div.id = id;
    div.img = value;
    const container = document.getElementById('cards-container');
    container.append(div);
  }

  addChoice(elem) {
    elem.classList.add('cards-container__card--selected');
    elem.style.backgroundImage = `url(../assets/${elem.img}.png)`;
    this.choice.set(elem.id, this.cards[elem.id]);
    return this._checkChoice();
  } 
}
