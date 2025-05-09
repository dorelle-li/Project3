function nudgeRotateSquashShapes() {
    const shapes = document.querySelectorAll(
      '.shape.circle,' +
      '.shape.circle > .star4,' +
      '.shape.circle > .half-circle,' +
      '.shape.circle > .star10,' +
      '.shape.circle > .circlesmall'
    );
    const moveDuration     = 800;
    const pauseAfterMove   = 600;
    const rotateDuration   = 1000;
    const pauseAfterRotate = 2000;
  
    // 1) SLIDE
    shapes.forEach(shape => {
      const raw = shape.getAttribute('data-nudge-x');
      const dx  = raw !== null ? parseInt(raw, 10) : -10;
  
      // stash original transform
      const orig = window.getComputedStyle(shape).transform;
      shape.dataset.orig = orig === 'none' ? '' : orig;
  
      shape.style.transition = `transform ${moveDuration}ms ease`;
      shape.style.transform  = `${shape.dataset.orig} translateX(${dx}px)`;
    });
  
    // 2) ROTATE (after slide + pause)
    setTimeout(() => {
      shapes.forEach(shape => {
        // use same dx you nudged by
        const raw = shape.getAttribute('data-nudge-x');
        const dx  = raw !== null ? parseInt(raw, 10) : -10;
  
        shape.style.transition = `transform ${rotateDuration}ms ease`;
        shape.style.transform  =
          `${shape.dataset.orig} translateX(${dx}px) rotate(6deg)`;
      });
    }, moveDuration + pauseAfterMove);
  
    
    // 3) MORPH MOUTH → LINE (after rotate + pause)
setTimeout(() => {
    document
      .querySelectorAll('.shape.circle > .half-circle')
      .forEach(mouth => {
        // 1. Remove any inline transform/transition so CSS is in full control:
        mouth.style.removeProperty('transform');
        mouth.style.removeProperty('transition');
  
        // 2. Now add the class that has the full transform+scaleY + transition on transform
        mouth.classList.add('stern');
      });
  }, moveDuration + pauseAfterMove + rotateDuration + pauseAfterRotate);

  // 4) FADE OUT (canvas and all its children)
  const totalDelay = moveDuration 
                   + pauseAfterMove 
                   + rotateDuration 
                   + pauseAfterRotate 
                   + 500; // extra 0.5s after the morph
  setTimeout(() => {
    const canvas = document.querySelector('.canvas');
    const pageColor = document.getElementById('page-color');
  
    canvas.style.transition = `opacity 28s ease-in-out`;
    canvas.style.opacity = 0;
  
    pageColor.style.transition = `opacity 28s ease-in-out`;
    pageColor.style.opacity = 0;

    setTimeout(() => {
        window.location.href = '../4/4.html';
      }, 30000); 
  }, totalDelay);

  
  
    }


  
  window.addEventListener('load', () => {
    setTimeout(nudgeRotateSquashShapes, 2000);
  });
  