const loaderHide = () => {
  const loader = document.querySelector('.loader');
  loader.style.opacity = "0";
  loader.style.zIndex = "-1";
  document.body.classList.remove('no-scroll')
}

export default loaderHide;
