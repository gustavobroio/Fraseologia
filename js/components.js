// ============================================
// FRASEOLOGIA - LOADER DE COMPONENTES
// ============================================

function loadComponent(id, file) {
  const elemento = document.getElementById(id);
  if (!elemento) return;

  fetch(file)
    .then(response => {
      if (!response.ok) throw new Error('Erro ao carregar ' + file);
      return response.text();
    })
    .then(html => {
      elemento.innerHTML = html;
      if (id === 'header-placeholder') {
        setTimeout(() => {
          if (typeof initRolloutSubmenu === 'function') initRolloutSubmenu();
          if (typeof destacarMenuAtivo === 'function') destacarMenuAtivo();
        }, 100);
      }
    })
    .catch(error => console.error('Falha ao carregar componente:', error));
}

function carregarComponentes() {
  loadComponent('header-placeholder', '../components/header.html');
  loadComponent('footer-placeholder', '../components/footer.html');
}

document.addEventListener('DOMContentLoaded', carregarComponentes);