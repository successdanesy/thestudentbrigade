//HEADER ANIMATION
window.addEventListener('scroll', function () {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  //TRACKER SECTION
 let pints = 0;

  const addBtn = document.getElementById('rbdButton');
  const resetBtn = document.getElementById('resetButton');

  const pintsDisplay = document.getElementById('pintsDisplay');
  const livesDisplay = document.getElementById('livesDisplay');

function updateStats() {
  const lives = pints * 3;

  // Update numbers
  pintsDisplay.innerHTML = '<i class="fas fa-tint"></i> ' + pints;
  livesDisplay.innerHTML = '<i class="fas fa-heartbeat"></i> ' + lives;

  // Trigger pop animation
  [pintsDisplay, livesDisplay].forEach((el) => {
    el.classList.remove('animate-pop'); // reset
    void el.offsetWidth;                // force reflow
    el.classList.add('animate-pop');    // retrigger
  });
}


  addBtn.addEventListener('click', () => {
    pints += 1;
    updateStats();
  });

  resetBtn.addEventListener('click', () => {
    if (pints > 0) {
      pints -= 1;
      updateStats();
    }
  });
