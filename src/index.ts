import {Routing} from '../routing';
import $ from "jquery";
import './index.scss';

window.onload = () => {
  let body = $('body');
  let links = Routing.pages.forEach(page => {
      let element: JQuery<HTMLAnchorElement> = $('<a>');
      element.attr('href',`pages/${page.name}/${page.name}.html`);
      element.text(page.name);
      element.addClass('nav-link');
      body.append(element);
  });
}