document.addEventListener('DOMContentLoaded', () => {
    function showSection() {
        const hash = window.location.hash.substring(1); // Hash sem #
        const sections = document.querySelectorAll('.page-section');

        // Just my section
        sections.forEach(section => {
            section.style.display = 'none';
        });
        console.log(hash)
        // Show Session
        if (hash === 'game') {
            document.getElementById('game-section').style.display= 'block';
        } else if (hash === 'tips') {
            document.getElementById('tips-section').style.display= 'block';
        }
    }

    window.addEventListener('hashchange', showSection);

    window.navigateTo = (page) => {

        window.location.hash = page;
    }

    if (!window.location.hash) {
        window.location.hash = '';
    }
    showSection();
});