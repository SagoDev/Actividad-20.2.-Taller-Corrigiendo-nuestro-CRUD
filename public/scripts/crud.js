function showDatos(datos) {
    let resultsElement = document.getElementById("results");
    resultsElement.innerHTML = "";
    let HTMLContentToAppend = "";
    for (const item of datos) {
        HTMLContentToAppend = `
        <li class="list-group-item bg-dark text-white">
            ID: ${item.id} <br>
            NAME: ${item.name} <br>
            LASTNAME: ${item.lastname}
        </li>
        `;
        resultsElement.innerHTML += HTMLContentToAppend;
    }
}

function showAlert() {
    document.getElementById("alert-error").classList.add("show");
    window.setTimeout(() => document.getElementById("alert-error").classList.remove("show"), 3000)
    resultsElement = document.getElementById("results").innerHTML = "";
}

function validate() {
    
    if (document.getElementById("inputPostNombre").value && document.getElementById("inputPostApellido").value) {
        document.getElementById("btnPost").disabled = false;
    }else{
        document.getElementById("btnPost").disabled = true;
    }

    if (document.getElementById("inputPutId").value) {
        document.getElementById("btnPut").disabled = false;
    }else{
        document.getElementById("btnPut").disabled = true;
    }

    if (document.getElementById("inputDelete").value) {
        document.getElementById("btnDelete").disabled = false;
    }else{
        document.getElementById("btnDelete").disabled = true;
    }

    if (document.getElementById("inputPutNombre").value && document.getElementById("inputPutApellido").value) {
        document.getElementById("btnSendChanges").disabled = false;
    }else{
        document.getElementById("btnSendChanges").disabled = true;
    }
}

function getAll() {
    requestCRUD('GET').then((response) => response ? showDatos(response) : showAlert());
}

function getDatos(id) {
    requestCRUD('GET', { id }).then((response) => response ? showDatos([response]) : showAlert());
}

function deleteDatos(id) {
    requestCRUD('DELETE', { id }).then((response) => response ? getAll() : showAlert());
}

function postDatos(data) {
    requestCRUD('POST', data).then((response) => response ? getAll() : showAlert());
}

function putDatos(data) {
    requestCRUD('PUT', data).then((response) => response ? getAll() : showAlert());
}

document.addEventListener("DOMContentLoaded", () => {

    getAll()

    document.body.addEventListener("input", validate)

    document.getElementById("btnGet1").addEventListener("click", () => {
        let inputId = document.getElementById("inputGet1Id");
        if (inputId.value) {
            getDatos(inputId.value);
            inputId.value = "";
            validate();
        } else {
            getAll()
        }

    })

    document.getElementById("btnPost").addEventListener("click", () => {
        let name = document.getElementById("inputPostNombre");
        let lastname = document.getElementById("inputPostApellido");
        postDatos({ name: name.value, lastname: lastname.value });
        [name, lastname].forEach(element => element.value = "");
        validate();
    })

    document.getElementById("btnPut").addEventListener("click", () => {
        let id = document.getElementById("inputPutId").value
        let nameInput = document.getElementById("inputPutNobre");
        let lastNameInput = document.getElementById("inputPutApellido");
        requestCRUD('GET', { id })
            .then((response) => {
                if (response) {
                    nameInput.value = response.name;
                    lastNameInput.value = response.lastname;
                    let dataModal = new bootstrap.Modal(document.getElementById("dataModal"));
                    dataModal.show();
                    document.getElementById("btnSendChanges").addEventListener("click", () => {
                        putDatos({
                            id,
                            name: nameInput.value,
                            lastname: lastNameInput.value
                        })
                        dataModal.hide()
                    })

                } else {
                    showAlert();
                }
                document.getElementById("inputPutId").value = "";
                validate();
            });

    })

    document.getElementById("btnDelete").addEventListener("click", () => {
        let inputId = document.getElementById("inputDelete");
        if (inputId.value) {
            deleteDatos(inputId.value);
            inputId.value = "";
            validate();
        }

    })


})