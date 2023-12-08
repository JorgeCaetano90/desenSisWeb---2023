var obj = "";

function cadastraExtrato() {
    valor = document.getElementById("inputValor").value;

    valorCorreto = valor.replace(",", ".");

    const data = {
        nome: document.getElementById("inputNome").value,
        data_tr: document.getElementById("inputData").value,
        conta: document.getElementById("inputConta").value,
        valor: valorCorreto
    };

    var url = "http://localhost:8080/JavaRest/Extrato";

    function PromessaExtrato(url, body, metodo) {

        return new Promise((resolve, reject) => {
            fetch(url, {
                method: metodo,
                body: body ? JSON.stringify(body) : undefined
            })
            .then((resp) => resp.json())
            .then((obj) => {
                resolve(obj);
            })
            .catch((e) => {
                reject(e);
            });
        });
    }

    PromessaExtrato(url, data, 'POST')
        .then(resp => {
            console.log(resp);
        })
        .catch((e) => {
            console.error(e.message);
        })
        .finally(() => {
            ToastSnack("Cadastrado com sucesso!");
        });
};

function listar() {
    const THEAD = document.querySelector(".lista-extrato thead");
    const TBODY = document.querySelector(".lista-extrato tbody");
    
    TBODY.innerHTML = "";

    var url = "http://localhost:8080/JavaRest/Extrato";

    function PromessaExtrato(url, metodo) {

        return new Promise((resolve, reject) => {
            fetch(url, {
                method: metodo,
            })
            .then((resp) => resp.json())
            .then((obj) => {
                resolve(obj);
            })
            .catch((e) => {
                reject(e);
            });
        });
    }

    PromessaExtrato(url, 'GET')
        .then(resp => {

            // console.log(resp);
    
            if (resp.length !=0) {
                
                let cabecalho = `<tr>
                                    <th style="width: 1.5rem" id="idExtrato">#</th> 
                                    <th style="width: 10rem" id="nomeExtrato">Nome:</th> 
                                    <th style="width: 6.5rem" id="dataExtrato">Data:</th> 
                                    <th style="width: 5rem" id="contaExtrato">Conta:</th> 
                                    <th style="width: 6rem" id="valorExtrato">Valor:</th> 
                                    <th style="width: 3rem>&nbsp;</th>
                                    <th style="width: 3rem>&nbsp;</th>
                                </tr>`;
                                
                THEAD.innerHTML = cabecalho;

                for (index in resp) {

                    item = resp[index]

                    console.log(item);

                    let linha = TBODY.insertRow();

                    let id = linha.insertCell();
                    id.innerHTML = item.id_extrato;

                    let nome = linha.insertCell();
                    nome.innerHTML = item.nome;

                    let data = linha.insertCell();
                    data.innerHTML = item.data_tr;

                    let conta = linha.insertCell();
                    conta.innerHTML = item.conta;

                    let valor = item.valor;
                    valorFormat = (parseFloat(valor)).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    });
                    let valorCorreto = linha.insertCell();
                    valorCorreto.innerHTML = valorFormat;
                    valorCorreto.style.display = "flex";
                    valorCorreto.style.justifyContent = "end";
                    valorCorreto.style.alignItems = "center";
                    valorCorreto.style.height = "1.5rem";

                    const div = document.createElement('div');
                    div.setAttribute('id', 'divBtnUpdate');
                    
                    const button = document.createElement('button');
                    button.textContent = 'Alterar';
                    button.setAttribute('id', 'btnUpdate');
                    button.classList.add('btn');

                    button.onclick = (function(item) {
                        return function() {
                            setValorUpdate(item);
                        };
                    })(item);

                    div.appendChild(button);

                    colunaUpdate = linha.insertCell();
                    colunaUpdate.appendChild(div);



                    let btnDelete = `<div id="divBtnupdat">
                                        <button type="button" class="btn" id="btnDelete" onclick="deleteExtrato(${item.id_extrato})">Deletar</button>
                                     </div>`;
                    colunaDelete = linha.insertCell();
                    colunaDelete.innerHTML = btnDelete;
                }
            }
        })
        .catch((e) => {
            console.error(e.message);
        });
};

function setValorUpdate(obj) {

    // console.log(obj.id_extrato);

    var modal = document.getElementById("myModal");

    let divModalBody = document.getElementById("modalBody");
    let divModalFooter = document.getElementById("modalFooter");

    let modalBody = `<div id="mainExtrato">
                        <div id="divId">
                            <div class="label">
                                <label for="id">ID:</label>
                            </div>
                            <input type="text" name="id" id="inputIdUp" disabled="true">
                        </div>
                        <div id="divNome">
                            <div class="label">
                                <label for="nome">Nome:</label>
                            </div>
                            <input type="text" name="nome" id="inputNomeUp" required>
                        </div>
                        <div id="divData">
                            <div class="label">
                                <label for="data">Data:</label>
                            </div>
                            <input type="text" name="data" id="inputDataUp" required>
                        </div>
                        <div id="divConta">
                            <div class="label">
                                <label for="conta">Conta:</label>
                            </div>
                            <input type="text" name="conta" id="inputContaUp" required>
                        </div>
                        <div id="divValor">
                            <div class="label">
                                <label for="valor">Valor:</label>
                            </div>
                            <input type="number" name="valor" id="inputValorUp" required>
                        </div>
                    </div>`;

    let modalFooter = `
                <button class="btn" id="btnModalUp" onclick="updateExtrato()">Atualizar</button>
                <button class="btn" id="btnModalClose" onclick="closeModal()">Cancelar</button>
                `;

    divModalBody.innerHTML = modalBody;
    divModalFooter.innerHTML = modalFooter;

    modal.style.display = "block";

    document.getElementById("inputIdUp").value = obj.id_extrato;
    document.getElementById("inputNomeUp").value = obj.nome;
    document.getElementById("inputDataUp").value = obj.data_tr;
    document.getElementById("inputContaUp").value = obj.conta;
    document.getElementById("inputValorUp").value = obj.valor;
}

function updateExtrato() {

    const data = {
        id_extrato: document.getElementById("inputIdUp").value,
        nome: document.getElementById("inputNomeUp").value,
        data_tr: document.getElementById("inputDataUp").value,
        conta: document.getElementById("inputContaUp").value,
        valor: document.getElementById("inputValorUp").value
    };

    console.log(data);

    var url = "http://localhost:8080/JavaRest/Extrato";

    function PromessaExtrato(url, body, metodo) {

        return new Promise((resolve, reject) => {
            fetch(url, {
                method: metodo,
                body: body ? JSON.stringify(body) : undefined
            })
            .then((resp) => resp.json())
            .then((obj) => {
                resolve(obj);
            })
            .catch((e) => {
                reject(e);
            });
        });
    }

    PromessaExtrato(url, data, 'PUT')
        .then(resp => {
            console.log(resp);
        })
        .catch((e) => {
            console.error(e.message);
            closeModal();
        })
        .finally(() => {
            window.location.reload();
        })
};

function deleteExtrato(id) {
    var url = `http://localhost:8080/JavaRest/Extrato/${id}`;

    function PromessaExtrato(url, metodo) {

        return new Promise((resolve, reject) => {
            fetch(url, {
                method: metodo
            })
            .then((resp) => resp)
            .then((obj) => {
                resolve(obj);
            })
            .catch((e) => {
                reject(e);
            });
        });
    }

    PromessaExtrato(url, 'DELETE')
        .then(resp => {
            console.log(resp);
            window.location.reload();
        })
        .catch((e) => {
            console.error(e.message);
        });
};

function closeModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
}

window.onclick = function(event) {
    var modal = document.getElementById("myModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
};