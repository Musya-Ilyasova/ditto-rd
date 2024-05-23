const openMenu = (burger, menu) => {
  burger.classList.add('close');
  menu.classList.add('show');
  document.body.classList.add('no-scroll');
}

const closeMenu = (burger, menu) => {
  burger.classList.remove('close');
  menu.classList.remove('show');
  document.body.classList.remove('no-scroll');
}


const openSubMenu = (links, link, overlay) => {
  links.forEach(item => item.parentNode.classList.remove('active'));
  link.parentNode.classList.add('active');
  overlay.style.display = "block";
}

const closeSubMenu = (links, overlay) => {
  links.forEach(item => item.parentNode.classList.remove('active'));
  overlay.style.display = "";
}

const toggleSubMenuMobile = (links, link) => {
  if(link.parentNode.classList.contains('active')) {
    links.forEach(item => item.parentNode.classList.remove('active'));
    console.log('remove')
  } else {
    links.forEach(item => item.parentNode.classList.remove('active'));
    link.parentNode.classList.add('active');
  }
}

const addMenu = () => {
  const menu = document.querySelector('.menu__wrapper');
  const links = document.querySelectorAll('.menu__link_submenu');
  const burger = document.querySelector('.header__burger');
  let overlay = document.createElement('div');

  overlay.classList.add('overlay');
  document.body.prepend(overlay);

  burger.addEventListener('click', () => {
    if(burger.classList.contains('close')) {
      closeMenu(burger, menu);
    } else {
      openMenu(burger, menu)
    }
  })
  links.forEach(link => {
    if(window.innerWidth<"1280") {
      link.parentNode.addEventListener('click', () => toggleSubMenuMobile(links, link));
    } else {
      link.parentNode.addEventListener('mouseover', () => openSubMenu(links, link, overlay), true);
      link.parentNode.addEventListener('mouseout', () => closeSubMenu(links, overlay), true);
    }
  });
  overlay.addEventListener('click', () => closeSubMenu(links, overlay));
  document.body.addEventListener('click', function(e){
    let target = e.target;
    if(document.body.classList.contains('no-scroll') && target.classList.contains('no-scroll')) {
      closeMenu(burger, menu);
    }
  })
}

export default addMenu;
