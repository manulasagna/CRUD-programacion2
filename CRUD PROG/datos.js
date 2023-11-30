
document.addEventListener('DOMContentLoaded', function () {
    mostrarDatos();
});

function mostrarDatos() {
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
        html += "<td>" + (element.modelo|| '') + "</td>";
        html += "<td>" + (element.stock || 0) + "</td>";
        html += "</tr>";
    });

   
    document.querySelector('#tabledata tbody').innerHTML = html;
}
document.addEventListener('DOMContentLoaded', function () {
    mostrarDatos();
});

function mostrarDatos() {
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
        html += "<td>" + (element.modelo|| '') + "</td>";
        html += "<td>" + (element.stock || 0) + "</td>";
        html += "</tr>";
    });

    document.querySelector('#tabledata tbody').innerHTML = html;
}

function buscarDatos() {
    var input, filter, table, tbody, tr, td, i, txtValue;
    input = document.getElementById("buscar");
    filter = input.value.toUpperCase();
    table = document.getElementById("tabledata");
    tbody = table.getElementsByTagName("tbody")[0];
    tr = tbody.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1]; 
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

      