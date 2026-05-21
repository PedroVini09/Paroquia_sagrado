console.log("Cabeçalho carregado!");

// Elementos usados pelo modal de login
const abrirLoginBtn = document.getElementById("abrirLogin");
const modalLogin = document.getElementById("modalLogin");
const fecharModalBtn = document.getElementById("fecharModal");
const formLogin = document.getElementById("formLogin");

// Abrir modal quando o botão Admin for clicado (usa classe 'open' para ativar animação)
if (abrirLoginBtn && modalLogin) {
  abrirLoginBtn.addEventListener("click", () => {
    modalLogin.classList.add('open');
    const usuarioInput = document.getElementById("usuario");
    if (usuarioInput) setTimeout(() => usuarioInput.focus(), 120);
  });
}

// Fechar modal ao clicar no X
if (fecharModalBtn && modalLogin) {
  fecharModalBtn.addEventListener("click", () => {
    modalLogin.classList.remove('open');
  });
}

// Fechar modal ao clicar fora do conteúdo
window.addEventListener("click", (e) => {
  if (e.target === modalLogin) {
    modalLogin.classList.remove('open');
  }
});

// Fechar com ESC
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modalLogin && modalLogin.classList.contains('open')) {
    modalLogin.classList.remove('open');
  }
});

// Login: usuário padrão admin / 123456
if (formLogin) {
  formLogin.addEventListener("submit", (e) => {
    e.preventDefault();
    const user = document.getElementById("usuario")?.value.trim();
    const pass = document.getElementById("senha")?.value || "";

    // enviar para backend/login.php
    fetch('/backend/login.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `username=${encodeURIComponent(user)}&password=${encodeURIComponent(pass)}`
    }).then(r => r.json())
      .then(json => {
        if (json && json.success) {
          // redirecionar para painel admin (PHP)
          window.location.href = "/Login_Admin/login_admin.php";
        } else {
          alert(json.error || 'Erro ao autenticar');
        }
      }).catch(err => {
        console.error('Erro login', err);
        alert('Erro ao conectar-se ao servidor');
      });
  });
}

// POPUP ESTILO SANTA SÉ (com proteção caso elementos não existam)
window.addEventListener("load", function() {
  const popup = document.querySelector(".popup-caixa");
  const fechar = document.getElementById("fecharPopup");

  if (popup) {
    // Aparece suavemente após 1,5s
    setTimeout(() => {
      popup.classList.add("mostrar");
    }, 1500);
  }

  if (fechar && popup) {
    // Fecha ao clicar no X
    fechar.addEventListener("click", () => {
      popup.classList.remove("mostrar");
    });
  }
});