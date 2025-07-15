const express = require('express');
const path = require('path'); // Importa o módulo 'path'
const app = express();
const PORT = 3000;

// Middleware para servir arquivos estáticos da pasta 'public'
// Qualquer arquivo em 'public' (css, imagens, json) será acessível pela URL base.
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para interpretar o corpo de requisições POST com dados de formulário
app.use(express.urlencoded({ extended: true }));

// Rota para a página principal (/)
app.get('/', (req, res) => {
    // Envia o arquivo index.html como resposta
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Rota para a API de lanches (/api/lanches)
app.get('/api/lanches', (req, res) => {
    // Envia o arquivo lanches.json como resposta
    res.sendFile(path.join(__dirname, 'public', 'data', 'lanches.json'));
});

// Rota para processar a sugestão de lanche (GET)
app.get('/sugestao', (req, res) => {
    // Captura os dados da query string (enviados pelo formulário)
    const nomeLanche = req.query.nome;
    const ingredientesLanche = req.query.ingredientes;

    // Gera uma página de agradecimento simples dinamicamente
    res.status(200).send(`
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <title>Obrigado pela Sugestão!</title>
        </head>
        <body>
            <h1>Obrigado pela sua sugestão!</h1>
            <p>Recebemos a sua ideia para o lanche <strong>${nomeLanche}</strong>.</p>
            <p>Ingredientes sugeridos: ${ingredientesLanche}</p>
            <br>
            <a href="/">Voltar para a página inicial</a>
        </body>
        </html>
    `);
});

// Rota para servir a página de contato (GET)
app.get('/contato', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'contato.html'));
});

// Rota para processar os dados do formulário de contato (POST)
app.post('/contato', (req, res) => {
    // Os dados do formulário POST estão em req.body
    const { nome, email, assunto, mensagem } = req.body;

    // Gera uma página de confirmação
    res.send(`
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <title>Mensagem Recebida!</title>
        </head>
        <body>
            <h1>Mensagem Recebida com Sucesso!</h1>
            <p>Olá, <strong>${nome}</strong>.</p>
            <p>Recebemos sua mensagem sobre "${assunto}".</p>
            <p>Entraremos em contato pelo e-mail: ${email} se necessário.</p>
            <p>Sua mensagem: <em>"${mensagem}"</em></p>
            <br>
            <a href="/">Voltar para a página inicial</a>
        </body>
        </html>
    `);
});

app.listen(PORT, () => {
    console.log(`Servidor da DevBurger rodando em http://localhost:${PORT}`);
});