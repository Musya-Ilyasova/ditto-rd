import loadCss from "./modules/loadCss";
import addMenu from "./modules/menu";
import { headerScroll, scrollToTheSection } from "./modules/headerScroll";
import { validateInputEmail, formSubmit, addResponseMsg } from "./modules/form";
import titleSlider from "./modules/titleSlider";
import wow from "./modules/animated";


if(document.querySelector('main').classList.contains('index')) {
  loadCss('css/style.min.css');
}

document.addEventListener("DOMContentLoaded",  () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  window.addEventListener('resize', () => {
    vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  });
  wow.init();
  addMenu();
  headerScroll();
  if(document.querySelector('main').classList.contains('index')) {
    // setTimeout(titleSlider, 3000)
  }
  if(document.querySelector('main').classList.contains('contacts-page')) {
    validateInputEmail();
    formSubmit();
    addResponseMsg();
  }
});
