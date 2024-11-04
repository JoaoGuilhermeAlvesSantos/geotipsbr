document.addEventListener('DOMContentLoaded', () => {
    function showSection() {
      const hash = window.location.hash.substring(1); // Hash sem #
      const sections = document.querySelectorAll('.page-section');
      
      // Just my section
      sections.forEach(section => {
        section.classList.add('hidden');
      });
      console.log(hash)
      // Show Session
      if (hash === 'jogos') {
        document.getElementById('dicas-section').classList.remove('hidden');
      } else if (hash === 'dicas') {
        document.getElementById('jogo-section').classList.remove('hidden');
      }
    }
  
    window.addEventListener('hashchange', showSection);
  
    window.navigateTo = (page) => {
      window.location.hash = page;
    }
  
    if (!window.location.hash) {
      window.location.hash = 'countries';
    }
    showSection();
  });