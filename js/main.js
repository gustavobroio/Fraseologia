// ============================================
// FRASEOLOGIA - Funções Globais
// ============================================

// Alterna Dark Mode
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  localStorage.setItem('fraseologia-darkmode', isDark);

  const btn = document.getElementById('darkModeToggle');
  if (btn) {
    btn.textContent = isDark ? '☀️' : '🌙';
  }

  mostrarToast(isDark ? 'Modo escuro ativado' : 'Modo claro ativado', 'info');
}

// Carrega Dark Mode
function loadDarkModePreference() {
  const saved = localStorage.getItem('fraseologia-darkmode');
  const btn = document.getElementById('darkModeToggle');

  if (saved === 'true') {
    document.body.classList.add('dark-mode');
    if (btn) btn.textContent = '☀️';
  } else {
    if (btn) btn.textContent = '🌙';
  }
}

// ============================================
// MENU ATIVO
// ============================================
function destacarMenuAtivo() {
  const links = document.querySelectorAll(".nav-menu a");
  links.forEach(link => link.classList.remove("active"));

  let paginaAtual = window.location.pathname.split("/").pop();
  paginaAtual = paginaAtual.split("?")[0].split("#")[0];

  const linkAtivo = Array.from(links).find(link => {
    return link.getAttribute("href") === paginaAtual;
  });

  if (linkAtivo) {
    linkAtivo.classList.add("active");
  }
}

// ============================================
// COPIAR LOG
// ============================================
async function copiarLog() {
  const logDiv = document.getElementById('Log');
  const texto = logDiv?.innerText || '';

  if (!texto.trim() || texto.includes('Clique em')) {
    mostrarToast('⚠️ Gere um log antes de copiar!', 'warning');
    return;
  }

  try {
    await navigator.clipboard.writeText(texto);
    mostrarToast('📋 Log copiado!', 'success');
  } catch {
    const textarea = document.createElement('textarea');
    textarea.value = texto;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    mostrarToast('📋 Log copiado!', 'success');
  }
}

// ============================================
// LIMPAR FORMULÁRIO
// ============================================
function limparFormulario() {
  const inputs = document.querySelectorAll('input:not([type="button"]):not([type="submit"]), textarea, select');

  inputs.forEach(input => {
    if (input.id) input.value = '';
  });

  document.getElementById('Log').innerHTML = 'Clique em "Gerar Log" para começar';

  mostrarToast('🧹 Formulário limpo!', 'info');
}

// ============================================
// TOAST
// ============================================
function mostrarToast(msg, tipo = 'info') {
  const existente = document.querySelector('.toast-message');
  if (existente) existente.remove();

  const toast = document.createElement('div');
  toast.className = 'toast-message';
  toast.textContent = msg;

  const cores = {
    success: '#28a745',
    warning: '#ffc107',
    error: '#dc3545',
    info: '#17a2b8'
  };

  toast.style.backgroundColor = cores[tipo] || '#333';

  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// ============================================
// ATALHOS
// ============================================
function configurarAtalhos() {
  document.addEventListener('keydown', (e) => {

    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      if (typeof window.gerarLog === 'function') {
        window.gerarLog();
      }
    }

    if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
      e.preventDefault();
      limparFormulario();
    }
  });
}

// ============================================
// ✅ VALIDAÇÃO OTIMIZADA
// ============================================
function validarCamposObrigatorios() {
  const campos = document.querySelectorAll('[required]');
  let erro = false;

  campos.forEach(campo => {
    if (!campo.value.trim()) {
      erro = true;
      campo.style.borderColor = '#dc3545';
      campo.style.boxShadow = '0 0 0 2px rgba(220,53,69,0.3)';

      setTimeout(() => {
        campo.style.borderColor = '';
        campo.style.boxShadow = '';
      }, 2000);
    }
  });

  if (erro) {
    mostrarToast('⚠️ Preencha os campos obrigatórios!', 'warning');
    return false;
  }

  return true;
}

// ============================================
// ✅ SUBMENU ROLLOUT
// ============================================
function initRolloutSubmenu() {
  const rolloutItem = document.querySelector('.nav-menu li.rollout');
  if (!rolloutItem) return;

  const toggle = rolloutItem.querySelector('.rollout-toggle');
  const links = rolloutItem.querySelectorAll('.rollout-submenu a');

  if (!toggle) return;

  toggle.addEventListener('click', (e) => {
    e.preventDefault();

    const aberto = rolloutItem.classList.contains('open');

    if (!aberto) {
      document.querySelectorAll('.nav-menu a').forEach(l => l.classList.remove('active'));
      toggle.classList.add('active');
      rolloutItem.classList.add('open');
    } else {
      toggle.classList.remove('active');
      rolloutItem.classList.remove('open');
      destacarMenuAtivo();
    }
  });

  // Fecha ao clicar fora
  document.addEventListener('click', (e) => {
    if (!rolloutItem.contains(e.target)) {
      rolloutItem.classList.remove('open');
      toggle.classList.remove('active');
      destacarMenuAtivo();
    }
  });

  // Fecha ao clicar em item
  links.forEach(link => {
    link.addEventListener('click', () => {
      rolloutItem.classList.remove('open');
    });
  });

  // Fecha com ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      rolloutItem.classList.remove('open');
      destacarMenuAtivo();
    }
  });
}

// ============================================
// INICIALIZAÇÃO
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  configurarAtalhos();
  loadDarkModePreference();
  destacarMenuAtivo();
  initRolloutSubmenu();

  console.log('✅ Sistema carregado com melhorias completas');
});