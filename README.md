# Aurora · Console

API de clientes com Node, TypeScript, Express e SQLite, acompanhada de um console responsivo em temas claro e escuro. Projeto de portfólio para o desafio **Criando a API do Dio Bank Com Node** da DIO.

## Executar

Requer Node 24 ou superior e npm.

```sh
npm ci
npm test
npm run build
npm start
```

Abra http://127.0.0.1:5180. O banco é criado em `data/aurora.sqlite`, fora do versionamento. Variáveis opcionais: `PORT`, `HOST`, `DATABASE_PATH` (diretório deve existir). O padrão de rede é somente loopback.

## Funcionalidades

- Cadastro com nome obrigatório, e-mail válido e único, normalizado em minúsculas.
- Listagem com busca local e contadores calculados a partir dos dados reais.
- Exclusão por UUID com confirmação na interface e resposta 404 para cadastro inexistente.
- Persistência SQLite, consultas parametrizadas, camadas de controller/service/repositório e injeção de dependência.
- Testes unitários e integração HTTP, incluindo dados ausentes, duplicidade, exclusão e persistência após reabertura do banco.

## API

| Método | Endpoint | Resultado |
| --- | --- | --- |
| GET | `/api/health` | Estado do serviço |
| GET | `/api/users` | Lista de clientes |
| POST | `/api/users` | Cria cliente e devolve 201 |
| DELETE | `/api/users/:id` | Exclui cliente e devolve 204 |

POST recebe JSON como `{"name":"Cliente Demo","email":"cliente@example.com"}`. Erros usam `{ "message": "..." }`, com 400 para dados inválidos, 409 para e-mail existente e 404 para registro ausente.

## Escopo da demonstração

Não há autenticação, autorização, operações financeiras ou integração bancária. Use somente dados fictícios. O armazenamento pertence ao servidor, não ao navegador. A API não deve ser exposta para receber dados pessoais sem proteção de acesso, limites de requisição, TLS e operação apropriada. Publicar o código em um repositório não hospeda o servidor; hospedagens estáticas não executam esta API nem persistem SQLite.

## Referência do desafio

Enunciado e implementação didática de Nathally Souza/DIO: https://github.com/digitalinnovationone/desafio04-ts . Esta implementação foi escrita separadamente, mantendo a proposta de controller/service, validação e testes. Os demais projetos Aurora permanecem independentes.
