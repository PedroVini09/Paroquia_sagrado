⛪ Paróquia Sagrado Coração de Jesus

Sistema web desenvolvido para modernizar a comunicação e administração da Paróquia Sagrado Coração de Jesus, oferecendo uma plataforma digital para divulgação de informações, gerenciamento de notícias e organização administrativa da igreja.

O projeto foi construído utilizando tecnologias web modernas, integrando frontend responsivo, backend em PHP, autenticação administrativa e conexão com banco de dados MySQL.

📖 Sobre o Projeto

A proposta deste sistema é criar uma presença digital mais organizada e acessível para a comunidade católica, permitindo que os fiéis acompanhem:

horários das celebrações;
notícias e eventos da paróquia;
informações institucionais;
redes sociais e conteúdos externos;
comunicados oficiais da igreja.

Além da área pública, o sistema possui um painel administrativo que permite aos responsáveis da paróquia gerenciar conteúdos diretamente pelo navegador, sem necessidade de alterar código manualmente.

🚀 Funcionalidades Implementadas
🌐 Área Pública do Site
✅ Página inicial moderna e responsiva

Interface visual desenvolvida com foco em:

identidade visual católica;
acessibilidade;
organização das informações;
experiência do usuário.
✅ Seção institucional

Apresentação da história e missão da paróquia:

Amor
Comunidade
Oração
✅ Horários das celebrações

Exibição organizada de:

missas dominicais;
missas semanais;
adoração ao Santíssimo.
✅ Destaques e notícias

Sistema dinâmico para:

divulgar eventos;
anunciar comunicados;
exibir conteúdos em destaque.

As notícias podem conter:

título;
resumo;
conteúdo;
links externos;
integração com redes sociais.
✅ Integração com plataformas externas

Compatibilidade com:

YouTube
Instagram
Facebook
Google Maps
✅ Layout Responsivo

Compatível com:

computadores;
tablets;
celulares.
🔐 Painel Administrativo

O sistema conta com uma área administrativa protegida por login.

Funcionalidades do painel:
👤 Gerenciamento de usuários
cadastro de administradores;
edição de usuários;
exclusão de usuários;
autenticação via sessão PHP.
📰 Gerenciamento de notícias
criação de notícias;
edição;
remoção;
destaque na página inicial;
publicação de links externos.
📊 Dashboard Administrativo

Painel com:

quantidade de usuários;
quantidade de notícias;
informações gerais do sistema.
🛠️ Tecnologias Utilizadas
Frontend
HTML5
CSS3
JavaScript
Font Awesome
Backend
PHP
MySQL
PDO
🗄️ Banco de Dados
O sistema utiliza MySQL para armazenamento de:
usuários administrativos;
notícias;
destaques;
informações futuras do sistema.
A conexão é realizada utilizando PDO, oferecendo:

maior segurança;
melhor organização;
facilidade de manutenção.
📂 Estrutura do Projeto
Paroquia_Sagrado/
│
├── Backend/
│   ├── db.php
│   ├── login.php
│   ├── logout.php
│   ├── save_news.php
│   ├── save_user.php
│   ├── delete_news.php
│   ├── delete_user.php
│   ├── list_news.php
│   ├── list_users.php
│   └── ...
│
├── Pagina_Inicial/
│   └── index.html
│
├── Login_Admin/
│   └── admin.js
│
├── css/
│   └── style.css
│
├── js/
│
├── imagem/
│
└── componentes/
⚙️ Como Executar o Projeto
1️⃣ Clonar o Repositório
git clone https://github.com/PedroVini09/Paroquia_sagrado.git

2️⃣ Configurar o Banco de Dados
Crie um banco MySQL chamado:
db_sagrado

3️⃣ Configurar a conexão
Edite o arquivo:
Backend/db.php
Com:
usuário do MySQL;
senha;
porta do banco.

4️⃣ Executar no Servidor Local

O projeto pode ser executado utilizando:

XAMPP
WAMP
Laragon

Coloque o projeto dentro da pasta:

htdocs

E acesse:

http://localhost/Paroquia_Sagrado/



🎯 Objetivo do Projeto
Este projeto foi desenvolvido com o objetivo de unir tecnologia e evangelização, proporcionando uma solução digital moderna para igrejas católicas, facilitando:

comunicação com os fiéis;
divulgação de eventos;
organização administrativa;
presença digital da paróquia.

🚧 Melhorias Futuras

O sistema ainda está em desenvolvimento e possui planejamento para novas funcionalidades, como:

sistema de agendamento de confissões;
cadastro de pastorais;
gerenciamento completo de eventos;
upload de imagens;
galeria de fotos;
transmissões ao vivo;
integração com WhatsApp;
calendário litúrgico;
sistema de pedidos de oração;
área para documentos e avisos paroquiais.

👨‍💻 Desenvolvedor
Desenvolvido por Pedro Vinicius como projeto Full Stack utilizando PHP, MySQL, JavaScript e CSS.

📜 Licença

Projeto desenvolvido para fins educacionais, religiosos e de aprendizado Full Stack.
