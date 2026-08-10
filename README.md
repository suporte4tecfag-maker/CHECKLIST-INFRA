# Checklist de Infraestrutura – Novo Colaborador (Tecfag)

Checklist interativo em HTML/CSS/JS puro para o setup de TI de novos colaboradores da Tecfag.

## Funcionalidades
- Wizard por etapas: Estação de trabalho, Rede, Acessos, Software, Segurança, Físico e Treinamentos
- Campos condicionais (ex: tipo de equipamento, VPN, ERP, CRM, backup)
- Menu de setor (RH, Recepção, Financeiro, Compras, Comercial, Pós Venda, Assistência Técnica, Marketing, TI, Projetos, Estoque e Expedição) que personaliza os itens de acesso e treinamento
- Barra de progresso automática
- Banco de dados local (localStorage do navegador) para salvar, abrir e excluir checklists preenchidos
- Modo escuro com identidade visual da Tecfag
- Impressão / exportação em PDF com todas as etapas

## Como usar
Basta abrir o arquivo `index.html` em qualquer navegador — não precisa de servidor, backend ou instalação.

### Publicar com GitHub Pages (opcional)
1. Suba este repositório no GitHub.
2. Vá em **Settings > Pages**.
3. Em "Branch", selecione `main` (ou a branch usada) e a pasta `/root`.
4. Salve — o checklist ficará disponível em `https://<seu-usuario>.github.io/<repositorio>/`.

## Observação sobre os dados
Os checklists salvos ficam apenas no navegador de quem preencheu (armazenamento local). Não há envio para nenhum servidor.
