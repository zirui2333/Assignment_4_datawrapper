const toggleMenu = () => {
  const navLinks = document.querySelector('.nav-links');

  if (navLinks.style.display === 'flex') {
    navLinks.style.display = 'none';
  } else {
    navLinks.style.display = 'flex';
  }
};

const handleResize = () => {
  const navLinks = document.querySelector('.nav-links');
  if (window.innerWidth > 1000) {
    navLinks.style.display = '';
  }
};

const initializeMenu = () => {
  document.getElementById('ham_menu').addEventListener('click', toggleMenu);
  window.addEventListener('resize', handleResize);
};

// Export all functions
export { toggleMenu, handleResize, initializeMenu };
