export default function createPopup() {
  const popup = document.createElement('div');
  popup.className = 'popup';
  popup.innerHTML = `
    <p class="popup__text">Игра завершена, не хотите ли сыграть еще раз?</p>
     <button class="popup__button" id="start-button">Начать новую игру</button>
  `;
  
  return popup;
}
