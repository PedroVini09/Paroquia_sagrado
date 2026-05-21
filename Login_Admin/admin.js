// Sistema Administrativo da Paróquia
class AdminPanel {
    constructor() {
        this.usuarios = JSON.parse(localStorage.getItem('paroquia_usuarios')) || [];
        this.noticias = JSON.parse(localStorage.getItem('paroquia_noticias')) || [];
        this.usuarioLogado = localStorage.getItem('paroquia_logado') === 'true';
        this.editandoUsuario = null;
        this.editandoNoticia = null;
        
        this.verificarAutenticacao();
        this.init();
    }

    verificarAutenticacao() {
        if (!this.usuarioLogado) {
            alert('Acesso negado! Faça login primeiro.');
            // redireciona para a página inicial pública
            window.location.href = '../Pagina_Inicial/index.html';
            return;
        }
    }

    init() {
        this.configurarEventos();
        this.carregarDashboard();
        this.fetchUsuarios();
        this.fetchNoticias();
        this.mostrarSecao('dashboard');
    }

    configurarEventos() {
        // Menu lateral
        document.querySelectorAll('.menu-item[data-section]').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const secao = item.dataset.section;
                this.mostrarSecao(secao);
                
                // Atualizar menu ativo
                document.querySelectorAll('.menu-item').forEach(m => m.classList.remove('active'));
                item.classList.add('active');
            });
        });

        // Logout
        document.getElementById('logout').addEventListener('click', () => {
            if (confirm('Deseja realmente sair?')) {
                localStorage.removeItem('paroquia_logado');
                // voltar para a página pública
                window.location.href = '../Pagina_Inicial/index.html';
            }
        });

        // Botões principais
        document.getElementById('novoUsuario').addEventListener('click', () => this.abrirModalUsuario());
        document.getElementById('novaNoticia').addEventListener('click', () => this.abrirModalNoticia());

        // Modais - Usuário
        document.getElementById('fecharModalUsuario').addEventListener('click', () => this.fecharModalUsuario());
        document.getElementById('cancelarUsuario').addEventListener('click', () => this.fecharModalUsuario());
        document.getElementById('formUsuario').addEventListener('submit', (e) => {
            e.preventDefault();
            this.salvarUsuario();
        });

        // Modais - Notícia
        document.getElementById('fecharModalNoticia').addEventListener('click', () => this.fecharModalNoticia());
        document.getElementById('cancelarNoticia').addEventListener('click', () => this.fecharModalNoticia());
        document.getElementById('formNoticia').addEventListener('submit', (e) => {
            e.preventDefault();
            this.salvarNoticia();
        });

        // Fechar modais clicando fora
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                if (e.target.id === 'modalUsuario') this.fecharModalUsuario();
                if (e.target.id === 'modalNoticia') this.fecharModalNoticia();
            }
        });
    }

    mostrarSecao(secao) {
        document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
        document.getElementById(secao).classList.add('active');
    }

    carregarDashboard() {
        document.getElementById('totalUsuarios').textContent = this.usuarios.length || 0;
        document.getElementById('totalNoticias').textContent = (this.noticias || []).filter(n => n.highlight == 1).length;
        document.getElementById('dataAtual').textContent = new Date().toLocaleDateString('pt-BR');
    }

    // buscar usuários no backend
    fetchUsuarios() {
        fetch('/backend/list_users.php')
          .then(r => r.json())
          .then(data => { this.usuarios = data.map(u => ({ id: u.id, usuario: u.username, dataCriacao: u.created_at })); this.carregarUsuarios(); this.carregarDashboard(); })
          .catch(err => console.error('Erro ao buscar usuarios', err));
    }

    // buscar noticias no backend
    fetchNoticias() {
        fetch('/backend/list_news.php')
          .then(r => r.json())
          .then(data => { this.noticias = data.map(n => ({ id: n.id, titulo: n.title, resumo: n.summary, conteudo: n.content, imagem: '', data: n.created_at, ativo: n.highlight })); this.carregarNoticias(); this.carregarDashboard(); })
          .catch(err => console.error('Erro ao buscar noticias', err));
    }

    // === USUÁRIOS ===
    carregarUsuarios() {
        const tbody = document.getElementById('usuariosTable');
        tbody.innerHTML = this.usuarios.map(usuario => `
            <tr>
                <td>${usuario.id}</td>
                <td>${usuario.usuario}</td>
                <td>${this.formatarData(usuario.dataCriacao)}</td>
                <td>
                    <button class="btn-sm btn-edit" onclick="adminPanel.editarUsuario(${usuario.id})">
                        <i class="fa-solid fa-edit"></i> Editar
                    </button>
                    ${usuario.id !== 1 ? `
                        <button class="btn-sm btn-delete" onclick="adminPanel.excluirUsuario(${usuario.id})">
                            <i class="fa-solid fa-trash"></i> Excluir
                        </button>
                    ` : ''}
                </td>
            </tr>
        `).join('');
    }

    abrirModalUsuario(usuario = null) {
        this.editandoUsuario = usuario;
        const modal = document.getElementById('modalUsuario');
        const titulo = document.getElementById('tituloModalUsuario');
        const form = document.getElementById('formUsuario');

        if (usuario) {
            titulo.textContent = 'Editar Usuário Admin';
            document.getElementById('usuarioId').value = usuario.id;
            document.getElementById('nomeUsuario').value = usuario.usuario;
            document.getElementById('senhaUsuario').value = usuario.senha;
        } else {
            titulo.textContent = 'Novo Usuário Admin';
            form.reset();
            document.getElementById('usuarioId').value = '';
        }

        // usar classe 'open' para ativar animação CSS
        modal.classList.add('open');
    }

    fecharModalUsuario() {
        document.getElementById('modalUsuario').classList.remove('open');
        this.editandoUsuario = null;
    }

    salvarUsuario() {
        const usuario = document.getElementById('nomeUsuario').value.trim();
        const senha = document.getElementById('senhaUsuario').value.trim();
        if (!usuario || !senha) { alert('Preencha todos os campos!'); return; }

        // enviar para backend
        fetch('/backend/save_user.php', {
            method: 'POST',
            body: new URLSearchParams({ username: usuario, password: senha })
        }).then(r => r.json()).then(json => {
            if (json && json.success) {
                this.fecharModalUsuario();
                this.fetchUsuarios();
                alert('Usuário salvo com sucesso!');
            } else {
                alert((json && json.error) || 'Erro ao salvar usuário');
            }
        }).catch(err => { console.error(err); alert('Erro ao salvar usuário'); });
    }

    editarUsuario(id) {
        const usuario = this.usuarios.find(u => u.id === id);
        if (usuario) {
            this.abrirModalUsuario(usuario);
        }
    }

    excluirUsuario(id) {
                if (!confirm('Deseja realmente excluir este usuário?')) return;
                fetch('/backend/delete_user.php', { method: 'POST', body: new URLSearchParams({ id }) })
                    .then(r => r.json()).then(json => {
                        if (json && json.success) { this.fetchUsuarios(); alert('Usuário excluído com sucesso!'); }
                        else alert('Erro ao excluir usuário');
                    }).catch(err => { console.error(err); alert('Erro ao excluir usuário'); });
    }

    // === NOTÍCIAS ===
    carregarNoticias() {
        const tbody = document.getElementById('noticiasTable');
        tbody.innerHTML = this.noticias.map(noticia => `
            <tr>
                <td>${noticia.id}</td>
                <td>${noticia.titulo}</td>
                <td>${this.formatarData(noticia.data)}</td>
                <td>
                    <span class="${noticia.ativo ? 'status-ativo' : 'status-inativo'}">
                        ${noticia.ativo ? 'Ativo' : 'Inativo'}
                    </span>
                </td>
                <td>
                    <button class="btn-sm btn-edit" onclick="adminPanel.editarNoticia(${noticia.id})">
                        <i class="fa-solid fa-edit"></i> Editar
                    </button>
                    <button class="btn-sm btn-delete" onclick="adminPanel.excluirNoticia(${noticia.id})">
                        <i class="fa-solid fa-trash"></i> Excluir
                    </button>
                    <button class="btn-sm ${noticia.ativo ? 'btn-secondary' : 'btn-primary'}" 
                            onclick="adminPanel.toggleNoticia(${noticia.id})">
                        ${noticia.ativo ? 'Desativar' : 'Ativar'}
                    </button>
                </td>
            </tr>
        `).join('');
    }

    abrirModalNoticia(noticia = null) {
        this.editandoNoticia = noticia;
        const modal = document.getElementById('modalNoticia');
        const titulo = document.getElementById('tituloModalNoticia');
        const form = document.getElementById('formNoticia');

        if (noticia) {
            titulo.textContent = 'Editar Notícia';
            document.getElementById('noticiaId').value = noticia.id;
            document.getElementById('tituloNoticia').value = noticia.titulo;
            document.getElementById('resumoNoticia').value = noticia.resumo;
            document.getElementById('conteudoNoticia').value = noticia.conteudo;
            document.getElementById('imagemNoticia').value = noticia.imagem || '';
        } else {
            titulo.textContent = 'Nova Notícia';
            form.reset();
            document.getElementById('noticiaId').value = '';
        }

        modal.classList.add('open');
    }

    fecharModalNoticia() {
        document.getElementById('modalNoticia').classList.remove('open');
        this.editandoNoticia = null;
    }

    salvarNoticia() {
        const titulo = document.getElementById('tituloNoticia').value.trim();
        const resumo = document.getElementById('resumoNoticia').value.trim();
        const conteudo = document.getElementById('conteudoNoticia').value.trim();
        const link = document.getElementById('linkNoticia').value.trim();
        const platform = document.getElementById('platformNoticia').value;
        const highlight = document.getElementById('highlightNoticia').checked ? '1' : '0';
        if (!titulo) { alert('Título é obrigatório'); return; }

        fetch('/backend/save_news.php', { method: 'POST', body: new URLSearchParams({ title: titulo, summary: resumo, content: conteudo, link: link, platform: platform, highlight: highlight }) })
          .then(r => r.json()).then(json => {
            if (json && json.success) { this.fecharModalNoticia(); this.fetchNoticias(); alert('Notícia salva com sucesso!'); }
            else alert((json && json.error) || 'Erro ao salvar notícia');
          }).catch(err => { console.error(err); alert('Erro ao salvar notícia'); });
    }

    editarNoticia(id) {
        const noticia = this.noticias.find(n => n.id === id);
        if (noticia) {
            this.abrirModalNoticia(noticia);
        }
    }

    excluirNoticia(id) {
        if (!confirm('Deseja realmente excluir esta notícia?')) return;
        fetch('/backend/delete_news.php', { method: 'POST', body: new URLSearchParams({ id }) })
          .then(r => r.json()).then(json => { if (json && json.success) { this.fetchNoticias(); alert('Notícia excluída com sucesso!'); } else alert('Erro ao excluir notícia'); })
          .catch(err => { console.error(err); alert('Erro ao excluir notícia'); });
    }

    toggleNoticia(id) {
        fetch('/backend/toggle_news.php', { method: 'POST', body: new URLSearchParams({ id }) })
          .then(r => r.json()).then(json => { if (json && json.success) { this.fetchNoticias(); this.carregarDashboard(); alert('Alterado com sucesso!'); } else alert('Erro ao alterar'); })
          .catch(err => { console.error(err); alert('Erro ao alterar'); });
    }

    // === UTILITÁRIOS ===
    formatarData(dataISO) {
        const data = new Date(dataISO);
        return data.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    salvarDados() {
        localStorage.setItem('paroquia_usuarios', JSON.stringify(this.usuarios));
        localStorage.setItem('paroquia_noticias', JSON.stringify(this.noticias));
    }
}

// Inicializar painel admin
let adminPanel;
document.addEventListener('DOMContentLoaded', () => {
    adminPanel = new AdminPanel();
});