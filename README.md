# API Express-generator.

- **npm i express-generator**
- **express --view=no-view** (nome_app)

# Instalação do Nodemon.
- **npm i nodemon --save**
- Execução do projeto **nodemon start** no terminal

**Pasta ROUTES foi inserida dentro da pasta criada por nome APP**

# Instalação do MonGoose. (Utilização com o MongoDB)
- **npm i mongoose --save**
- Criado pasta config / database.js
- Constante com mongoose (conexão) dentro do database.js
- Importar a conexão para o app.js

# Criação dos models
- pasta app/models
- Criação dos arquivos note.js e user.js
- Criando schema dos arquivos note e user e exportado para models usando Mongoose (roteiro para necessidade).

# Utilizaremos JWT (Json Web Token - padrão de autenticação)
 **Dividido em três partes: Header , Payload (possui informações como id  ou email do usuario.) e Signature (é a concatenação das hashes geradas pelo Header e Payload usando base64UrlEncode).**
- **npm i bcrypt --save** //Biblioteca para trabalhar com password dos usuarios.
- Criado model com a biblioteca.
- Importar o model para a rota users.

# Iremos fazer agora a validação da senha criada.
- Criar um metodo para comparar as senhas no model.
- Vamos executar a biblioteca JWT
- **npm i jsonwebtoken --save**
- Importar para a nossa rota users.
- **npm i dotenv --save** //Biblioteca para guardar nossas variáveis de ambiente.

# Iremos verificar o usuário da requisição.
- Iniciaremos criando uma pasta **middlewares** dentro do nosso app.
- Em seguida criar um arquivo auth.js.

# Iremos criar a rotas das Notas do projeto.
- Criar arquivo em rotas, notes.js.
- Importar o WithAuth(middleware) para a rota nova.
- No arquivo app.js deve importar a nova rota da criação das notas.

# Iremos visualizar as notas por ID.
- Adicionar uma nova rota GET para localizar por ID para validar a autenticação.

# Iremos visualizar todas as notas.
- Adicionar uma nova rota GET para listar as notas.
