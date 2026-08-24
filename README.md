# Checklist de Infraestrutura – Novo Colaborador (Tecfag)

Checklist interativo em HTML/CSS/JS para o setup de TI de novos colaboradores da Tecfag, com banco de dados em **Google Sheets**.

## Funcionalidades
- Wizard por etapas: Estação de trabalho, Rede, Acessos, Software, Segurança, Físico e Treinamentos
- Campos condicionais (tipo de equipamento, VPN, ERP, CRM, backup etc.)
- Itens com botões **OK / N/A** (em vez de checkbox simples)
- Menu de setor (RH, Recepção, Financeiro, Compras, Comercial, Pós Venda, Assistência Técnica, Marketing, TI, Projetos, Estoque e Expedição) que personaliza os itens de acesso e treinamento
- Barra de progresso automática
- **Banco de dados real em Google Sheets** — salvar, abrir e excluir checklists, acessível de qualquer computador
- Modo escuro com identidade visual da Tecfag
- Impressão / exportação em PDF com todas as etapas

## Como configurar o banco de dados (Google Sheets) — só uma vez

1. Crie uma Planilha Google nova (sheets.new).
2. Vá em **Extensões > Apps Script**.
3. Apague o conteúdo padrão e cole o conteúdo do arquivo `apps-script-backend.gs` (está neste pacote).
4. No topo do código, troque o valor de `TOKEN` por uma senha simples só sua (ex: `tecfag2026!`).
5. Clique em **Implantar > Nova implantação**.
   - Tipo: **App da Web**
   - Executar como: **Eu** (sua conta)
   - Quem pode acessar: **Qualquer pessoa**
6. Clique em **Implantar**, autorize as permissões pedidas pelo Google, e copie a URL gerada (termina com `/exec`).
7. Abra o arquivo `index.html` em um editor de texto e encontre estas duas linhas (perto do final do arquivo):
   ```js
   const APPS_SCRIPT_URL = 'COLE_AQUI_A_URL_DO_SEU_APPS_SCRIPT';
   const SHEETS_TOKEN = 'troque-esta-senha-123';
   ```
   Troque `APPS_SCRIPT_URL` pela URL copiada no passo 6, e `SHEETS_TOKEN` pela **mesma senha** que você colocou no `TOKEN` do Apps Script.
8. Salve o arquivo. Pronto — o botão "📊 Banco de dados (Sheets)" já vai salvar/ler direto na sua planilha.

A aba `Checklists` é criada automaticamente na planilha na primeira vez que alguém salvar um checklist.

### Sobre segurança
O link do Apps Script funciona como uma senha em si — não divulgue publicamente. O `TOKEN` é uma segunda camada simples de proteção (evita que alguém que descubra a URL acidentalmente leia/escreva dados sem saber o token). Para algo mais robusto (login por usuário, permissões por setor etc.), seria necessário um backend mais completo.

## Como usar
Basta abrir o arquivo `index.html` em qualquer navegador — não precisa instalar nada. Com o backend configurado (passo acima), os dados ficam disponíveis para qualquer pessoa que abrir o arquivo, em qualquer computador.

### Publicar com GitHub Pages (opcional)
1. Suba este repositório no GitHub.
2. Vá em **Settings > Pages**.
3. Em "Branch", selecione `main` (ou a branch usada) e a pasta `/root`.
4. Salve — o checklist ficará disponível em `https://<seu-usuario>.github.io/<repositorio>/`.
