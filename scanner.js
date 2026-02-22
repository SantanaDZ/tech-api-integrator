document.getElementById('btnBuscar').addEventListener('click', executarSync);

async function executarSync() {
    const corpoTabela = document.getElementById('corpoTabela');
    const statusMsg = document.getElementById('statusMessage');
    const loading = document.getElementById('loading');

    // 1. Reset de Interface e Feedback Visual
    corpoTabela.innerHTML = "";
    statusMsg.innerText = "";
    loading.style.display = "block";

    try {
        // 2. Realizando a requisição HTTP (GET)
        const resposta = await fetch('https://jsonplaceholder.typicode.com/users');

        // Verificação manual de status (Boa prática)
        if (!resposta.ok) {
            throw new Error(`STATUS_CODE_FAIL: ${resposta.status}`);
        }

        // 3. Conversão de JSON
        const dados = await resposta.json();

        // 4. Exibição Dinâmica (DOM Manipulation)
        dados.forEach(item => {
            const linha = document.createElement('tr');

            // Criando células dinamicamente
            const colId = document.createElement('td');
            colId.textContent = `#${item.id}`;

            const colNome = document.createElement('td');
            colNome.textContent = item.name.toUpperCase();

            const colEmail = document.createElement('td');
            colEmail.textContent = item.email.toLowerCase();

            const colEmpresa = document.createElement('td');
            colEmpresa.textContent = item.company.name;

            // Anexando colunas à linha
            linha.appendChild(colId);
            linha.appendChild(colNome);
            linha.appendChild(colEmail);
            linha.appendChild(colEmpresa);

            // Anexando linha ao corpo da tabela
            corpoTabela.appendChild(linha);
        });

    } catch (erro) {
        // 5. Tratamento de Erros Amigável e Técnico
        console.error("LOG_ERRO:", erro.message);
        statusMsg.innerText = `> SYSTEM_FAILURE: Erro ao buscar os dados. Verifique a conexão. (DETALHE: ${erro.message})`;
    } finally {
        // Remove o loading independente de sucesso ou erro
        loading.style.display = "none";
    }
}