function nudgeShapes() {
  const shapes = document.querySelectorAll(
    '.shape.circle,' +                            // ← include the circle
    '.shape.circle > .star4,' +
    '.shape.circle > .half-circle,' +
    '.shape.circle > .star10,' +
    '.shape.circle > .circlesmall'
  );
  const moveDuration = 600; // ms
  const holdDuration = 1200; // ms

  shapes.forEach(shape => {
    const raw = shape.getAttribute('data-nudge-x');
    const dx  = raw !== null ? parseInt(raw, 10) : -10;
    console.log(shape.className, '→ nudge =', dx, 'px');

    const computed = window.getComputedStyle(shape).transform;
    shape.dataset.orig = computed === 'none' ? '' : computed;

    shape.style.transition = `transform ${moveDuration}ms ease`;
    shape.style.transform  = `${shape.dataset.orig} translateX(${dx}px)`;
  });

  setTimeout(() => {
    shapes.forEach(shape => {
      shape.style.transition = `transform ${moveDuration}ms ease`;
      shape.style.transform  = shape.dataset.orig;
      delete shape.dataset.orig;
    });
  }, moveDuration + holdDuration);
}
