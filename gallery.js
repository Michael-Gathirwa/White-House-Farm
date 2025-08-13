// Lightbox gallery
document.addEventListener('DOMContentLoaded', function(){
  const gallery = document.getElementById('gallery');
  const lightbox = document.getElementById('lightbox');
  const lightboxContent = document.getElementById('lightboxContent');
  const closeBtn = document.getElementById('lightboxClose');

  if(gallery){
    gallery.addEventListener('click', function(e){
      const t = e.target;
      if(t && t.classList.contains('gallery-item')){
        lightboxContent.innerHTML = '<img src="'+ t.src +'" alt="">';
        lightbox.style.display = 'flex';
      }
    });
  }
  if(closeBtn) closeBtn.addEventListener('click', ()=> lightbox.style.display='none');

  // close lightbox when clicking overlay
  if(lightbox){
    lightbox.addEventListener('click', function(e){
      if(e.target === lightbox) lightbox.style.display = 'none';
    });
  }
});
