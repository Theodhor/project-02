
console.log('Js loaded');

document.addEventListener('DOMContentLoaded', () => {
  const deleteBtns = document.querySelectorAll('.delete');
  deleteBtns.forEach(button => {
    button.addEventListener('click', (e) => {
      if(!confirm('Are you sure?')) e.preventDefault();
    });
  });
  var burger = document.querySelector('.burger');
  var nav = document.querySelector('.navbar-menu');

  burger.addEventListener('click', function(){
    burger.classList.toggle('is-active');
    nav.classList.toggle('is-active');
  });
});
