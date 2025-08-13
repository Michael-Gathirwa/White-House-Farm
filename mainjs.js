// Menu toggle and basic slider
document.addEventListener('DOMContentLoaded', function(){
  const ham = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  if(ham) ham.addEventListener('click', ()=> nav.style.display = nav.style.display === 'block' ? 'none' : 'block');

  // Simple slider
  const slider = document.getElementById('slider');
  if(slider){
    let idx = 0;
    const slides = slider.children;
    const total = slides.length;
    setInterval(()=> {
      idx = (idx + 1) % total;
      slider.style.transform = 'translateX(' + (-idx*100) + '%)';
    }, 3500);
  }

  // keyboard support for animal-card buttons
  document.querySelectorAll('.animal-card').forEach(card=>{
    card.addEventListener('keydown', (e)=>{
      if(e.key === 'Enter' || e.key === ' ') {
        card.click();
      }
    });
  });
});
