// Play embedded sounds for animals
document.addEventListener('DOMContentLoaded', function(){
  const soundMap = {
    cow: new Audio('sounds/cow-moo.wav'),
    chicken: new Audio('sounds/chicken-cluck.wav')
  };

  // play when pressing the "Play" buttons
  document.querySelectorAll('.play-sound').forEach(btn=>{
    btn.addEventListener('click', (ev)=>{
      ev.stopPropagation();
      const key = btn.dataset.sound;
      const s = soundMap[key];
      if(s){ s.currentTime = 0; s.play(); }
    });
  });

  // also allow clicking on animal-card area to trigger sound
  document.querySelectorAll('.animal-card').forEach(card=>{
    card.addEventListener('click', (e)=>{
      // ignore clicks on buttons (handled above)
      if(e.target.tagName.toLowerCase() === 'button') return;
      const key = card.dataset.sound;
      if(soundMap[key]) { soundMap[key].currentTime = 0; soundMap[key].play(); }
    });
  });
});
