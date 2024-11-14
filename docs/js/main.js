async function loadHTML(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erro ao carregar ${url}: ${response.statusText}`);
        }
        return await response.text();
    } catch (error) {
        console.error(error);
        return `<p>Erro ao carregar conteúdo.</p>`;
    }
}

// Função para carregar componentes dinâmicos
async function loadComponent(componentId, filePath) {
    const component = document.getElementById(componentId);
    if (component) {
        component.innerHTML = await loadHTML(filePath);

        // Executa scripts embutidos no HTML carregado
        const scripts = component.querySelectorAll("script");
        scripts.forEach(script => {
            const newScript = document.createElement("script");
            if (script.src) {
                newScript.src = script.src;
                newScript.async = true;
            } else {
                newScript.textContent = script.textContent;
            }
            document.body.appendChild(newScript);
            document.body.removeChild(newScript);
        });
    } else {
        console.warn(`Componente ${componentId} não encontrado.`);
    }
}

// Função para carregar view com base na hash
async function loadView() {
    const hash = window.location.hash.substring(1) || 'tips';
    const mainContent = document.getElementById('main-content');
    const views = {
        tips: './html/view/tips.html',
        game: './html/view/game.html',
        sites: './html/view/sites.html',
        about: './html/view/about.html'
    };

    const filePath = views[hash];
    if (filePath) {
        mainContent.innerHTML = await loadHTML(filePath);
        const scripts = mainContent.querySelectorAll("script");
        scripts.forEach(script => {
            const newScript = document.createElement("script");
            if (script.src) {
                newScript.src = script.src;
                newScript.async = true;
            } else {
                newScript.textContent = script.textContent;
            }
            document.body.appendChild(newScript);
            document.body.removeChild(newScript);
        });
    } else {
        mainContent.innerHTML = '<p>Seção não encontrada.</p>';
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    // Carrega os componentes
    await loadComponent('sidebar-component', './html/component/sidebar.html');

    // Configura o evento de navegação
    window.addEventListener('hashchange', loadView);
    await loadView();
});
