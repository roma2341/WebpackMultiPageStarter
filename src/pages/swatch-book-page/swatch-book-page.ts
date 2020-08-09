import $ from "jquery";
import './swatch-book.scss';

window.onload = () => {
    let cards = Array.from($('.cards-wrapper .card'));
    cards.forEach(initCard);
}

function initCard(cardElement: HTMLElement) {
    //cardElement.
}