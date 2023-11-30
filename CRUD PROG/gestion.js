document.addEventListener('DOMContentLoaded', async function () {
    await mostrarDatos();
});

async function mostrarDatos() {
    let listguitars;
    if (localStorage.getItem('listguitars') == null) {
        listguitars = [];
    } else {
        listguitars = JSON.parse(localStorage.getItem('listguitars'));
    }

    var html = "";
    listguitars.forEach(function (element) {
        html += "<tr>";
        html += "<td>" + element.tipo + "</td>";
        html += "<td>" + element.fabricante + "</td>";
        html += "<td>" + element.modelo+ "</td>";
        html += "<td>" + element.stock + "</td>";
        html += "</tr>";
    });

    document.querySelector('#tableStock tbody').innerHTML = html;
}

async function restarStock() {
    let tipoRestar = document.getElementById('inputtipoRestar').value.trim();
    let fabricanteRestar = document.getElementById('inputfabricanteRestar').value.trim();
    let modeloRestar = document.getElementById('inputmodeloRestar').value.trim();
    let cantidadRestar = parseInt(document.getElementById('inputCantidadRestar').value);

    if (isNaN(cantidadRestar) || cantidadRestar <= 0) {
        alert("Ingrese una cantidad para restar.");
        return;
    }

    let listguitars;
    if (localStorage.getItem('listguitars') == null) {
        listguitars = [];
    } else {
        listguitars = JSON.parse(localStorage.getItem('listguitars'));
    }

  
    tipoRestar = tipoRestar.toLowerCase();
    fabricanteRestar = fabricanteRestar.toLowerCase();
    modeloRestar = modeloRestar.toLowerCase();

    let encontrado = false;
    for (let i = 0; i < listguitars.length; i++) {
        let tipoActual = listguitars[i].tipo.toLowerCase();
        let fabricanteActual = listguitars[i].fabricante.toLowerCase();
        let modeloActual = listguitars[i].modelo.toLowerCase();

        if (
            tipoActual === tipoRestar &&
            fabricanteActual === fabricanteRestar &&
            modeloActual === modeloRestar
        ) {
            if (listguitars[i].stock >= cantidadRestar) {
                listguitars[i].stock -= cantidadRestar;
                encontrado = true;
            } else {
                alert("No hay suficiente stock");
            }
        }
    }

    if (!encontrado) {
        alert("Producto no encontrado");
    }

    localStorage.setItem('listguitars', JSON.stringify());
    await mostrarDatos();

    
    document.getElementById('inputtipoRestar').value = "";
    document.getElementById('inputfabricanteRestar').value = "";
    document.getElementById('inputmodeloRestar').value = "";
    document.getElementById('inputCantidadRestar').value = "";
}

