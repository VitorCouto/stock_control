# Documentação da Aplicação Stock Control

## Descrição do Projeto

O **Stock Control** é um sistema de gerenciamento de estoque desenvolvido para facilitar o controle de produtos, categorias e usuários em uma aplicação web. Ele permite o cadastro, edição, exclusão e visualização de produtos e categorias, além de proporcionar uma interface amigável para os usuários administrarem suas informações de login.

## Tecnologias Utilizadas

- React: Biblioteca JavaScript para construção de interfaces de usuário.

- TypeScript: Superset do JavaScript que adiciona tipagem estática ao código.

- Sass: Pré-processador CSS que facilita a escrita de estilos de forma mais dinâmica e modular.

- Axios: Biblioteca para realizar requisições HTTP.

- React Router DOM: Biblioteca para controle de rotas na aplicação React.

- React Icons: Biblioteca de ícones para React.

- React Paginate: Componente para paginação em React.

- JSON Server: Ferramenta para simular um backend REST com persistência de dados.

## Instalação e Uso

### Pré-requisitos

- Node.js

- Yarn

### Instalação

Para instalar as dependências da aplicação, execute:

    yarn install

### Iniciar a Aplicação

Para iniciar a aplicação React, utilize o comando:

    yarn start

A aplicação estará disponível na porta 3000.

### Iniciar o JSON Server

Para iniciar o JSON Server, utilize o comando:

    yarn mock

O JSON Server estará disponível na porta 3001.

## Configuração do JSON Server

A aplicação utiliza o JSON Server para simular um backend. Para configurar o JSON Server, é necessário criar o arquivo `mock/db.json` com o seguinte conteúdo:

    {
        "users": [
            {
                "id": 1,
                "username": "admin",
                "password": "admin"
            }
        ],
        "products": [],
        "category": []
    }

Este arquivo contém um usuário padrão com nome de usuário `admin@admin.com` e senha `admin`. Caso queira alterar ou adicionar novos usuários basta adicionar no JSON conforme o modelo.

## Estrutura de Pastas

    mock/
    | db.json
    src/
    | app/
    | | layout/
    | | | Layout.tsx
    | | | Layout.module.scss
    | | pages/
    | | | category/
    | | | | Category.tsx
    | | | | Category.module.scss
    | | | dashboard/
    | | | | Dashboard.tsx
    | | | | Dashboard.module.scss
    | | | login/
    | | | | Login.tsx
    | | | | Login.module.scss
    | | | product/
    | | | | Product.tsx
    | | | | Product.module.scss
    | | | index.js
    | | routes/
    | | | index.tsx
    | | shared/
    | | | components/
    | | | | | buttonLink/
    | | | | | | ButtonLink.tsx
    | | | | | | ButtonLink.module.scss
    | | | | | buttonSubmit/
    | | | | | | ButtonSubmit.tsx
    | | | | | | ButtonSubmit.module.scss
    | | | | | categoryForm/
    | | | | | | CategoryForm.tsx
    | | | | | | CategoryForm.module.scss
    | | | | | inputSelect/
    | | | | | | InputSelect.tsx
    | | | | | | InputSelect.module.scss
    | | | | | inputText/
    | | | | | | InputText.tsx
    | | | | | | InputText.module.scss
    | | | | message/
    | | | | | Message.tsx
    | | | | | Message.module.scss
    | | | | navBar/
    | | | | | NavBar.tsx
    | | | | | NavBar.module.scss
    | | | | productForm/
    | | | | | ProductForm.tsx
    | | | | | ProductForm.module.scss
    | | | | index.js
    | | | contexts/
    | | | | AuthContext.tsx
    | | | | CategoryContext.tsx
    | | | | ProductContext.tsx
    | | | | index.js
    | | | hooks/
    | | | | useAuth.tsx
    | | | | useCategory.tsx
    | | | | useProduct.tsx
    | | | | index.js
    | | | img/
    | | | interface/
    | | | | IAuthContextProps.tsx
    | | | services/
    | | | | api/
    | | | | | CategoryService.ts
    | | | | | ProductService.ts
    | | | | | UserService.ts
    | | | | ApiConfig.ts
    | | | | ApiExceptions.ts
    | | | | index.js
    | | | utils/
    | | | | | variables.scss
    | | App.module.scss
    | | App.tsx
    | custom.d.ts
    | index.tsx
    | react-app-env.d.ts
    | reportWebVitals.ts
    | setupTests.ts
