gsap.registerPlugin(ScrollTrigger);
const images = gsap.utils.toArray('img');
const loader = document.querySelector('.loader--text');
const updateProgress = (instance) =>
loader.textContent = `${Math.round(instance.progressedCount * 100 / images.length)}%`;

const showDemo = () => {
  document.scrollingElement.scrollTo(0, 0);
  gsap.to(document.querySelector('.loader'), { autoAlpha: 0 });

  gsap.utils.toArray('section').forEach((section, index) => {
    const w = section.querySelector('.wrapper');
    const [x, xEnd] = index % 2 ? ['100%', (w.scrollWidth - section.offsetWidth) * -1] : [w.scrollWidth * -1, 0];
    gsap.fromTo(w, { x }, {
      x: xEnd,
      scrollTrigger: {
        trigger: section,
        scrub: 0.5 } });
        document.getElementById("mm").remove();
        setTimeout(function(){
          document.getElementById('first').classList.add('fadeout');
          document.getElementById('first').classList.remove('op0');
        },2000);
  });
};
imagesLoaded(images).on('progress', updateProgress).on('always', showDemo);