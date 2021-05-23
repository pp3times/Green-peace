window.addEventListener('scroll', function(){
    let value = window.scrollY;
    boat.style.marginLeft = value * .3 + 'px';
    boat.style.top = value * .2 + 'px';
})