$(document).ready(function() {
  const toggleMenu = document.querySelector('.toggle-menu');
  const mobileMenu = document.querySelector('.mobile-menu-wrapper');
  const bodyEl = document.body;
  const overlay = document.querySelector('#overlay');
  
  //прослушиваем событие клик по гамбургеру
  toggleMenu.addEventListener('click', function() {
      this.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      overlay.classList.toggle('active');
      bodyEl.classList.toggle('noscroll');
  });

  //прослушиваем событие клик моб меню
  mobileMenu.addEventListener('click', function() {
      this.classList.remove('active');
      toggleMenu.classList.remove('active');
      overlay.classList.remove('active');
      bodyEl.classList.remove('noscroll');
  });

  //прослушиваем событие клик по overlay
  overlay.addEventListener('click', function(){
      this.classList.remove('active');
      toggleMenu.classList.remove('active');
      mobileMenu.classList.toggle('active');
      bodyEl.classList.toggle('noscroll');

  });

  let options = {threshold: [0.5] };
  let observer = new IntersectionObserver(onEntry, options);
  let services = document.querySelectorAll('.services-list-item');
  let about = document.querySelectorAll('.about-content-item');

  function onEntry(entry) {
    entry.forEach(change => {
      if (change.isIntersecting) {
      change.target.classList.add('element-show');
      }
    });
  }

  for (let elm of services) {
    observer.observe(elm);
  }
  for (let elm of about) {
    observer.observe(elm);
  }
});