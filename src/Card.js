export default class Card {
  cards = ['1', '1', '2', '2', '3', '3', '4', '4', '5', '5', '6', '6', '7', '7', '8', '8']; 
  choice = [];

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

  _checkChoice() {
    let eq = false;
    console.log(this.choice);
    
    if (this.choice.length == 2) {
      eq = this.choice[0] === this.choice[1];
      eq ? eq = this._getIds(this.choice[0], this.choice[1]) : eq = false
      this.choice = [];
    }
    
    return eq
  }

  createCards(id) {
    const div = document.createElement('div');
    div.className = 'cards-container__card';
    div.id = id;
    const container = document.getElementById('cards-container');
    container.append(div);
  }

  addChoice(id) {
    this.choice.push(this.cards[id]);
    return this._checkChoice();
  } 

  removeChoice() {
    this.choice.pop();
    return false
  }
}
