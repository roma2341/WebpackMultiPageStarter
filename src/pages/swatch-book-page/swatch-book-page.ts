import $ from 'jquery';
import './swatch-book.scss';
import { SwatchCardElement } from './models/swatch-card-element.model';

const CARD_SELECTOR = '.cards-wrapper .card';

window.onload = () => {
    let _elements = $(CARD_SELECTOR);
    let cards = initCards(_elements);
};


function initCards(cardsElement: JQuery<HTMLElement>) {
    let cardsArray = <SwatchCardElement[]>cardsElement.toArray();
    cardsArray.forEach(initCard);
    $('body').on('click', CARD_SELECTOR,( event ) => {
        onCardSelected(<SwatchCardElement>event.target);
    });

    function onCardSelected(_selectedCard: SwatchCardElement){
        let selectedElement = $(_selectedCard);
        setRotation(selectedElement, 0);
        let selectedElementOrder = _selectedCard.swatchData.order;
        cardsArray.forEach(_card => {
            let el = $(_card);
 
            if(_card.swatchData.order < selectedElementOrder) {
                setRotation(el,-45 + (10 * _card.swatchData.order) );
            }
            else if (_card.swatchData.order > selectedElementOrder) {
                setRotation(el,45 + (10 * _card.swatchData.order) );
            }
        });
    }

    function initCard(_card: SwatchCardElement, index: number, elements: HTMLElement[]) {
        let degree = index * 90 / elements.length;
        _card.swatchData = {
            order: index
        }
        setRotation($(_card), degree);
    }
    function setRotation(element: JQuery<HTMLElement>, degree: number) {
        element.css('transform', `rotate(${degree}deg)`);
    }

}