function login() {
    const usuarioCorrecto = "admin";
    const contrasenaCorrecta = "admin";

    var usuario = document.getElementById("im").value;
    var contrasena = document.getElementById("ic").value;

    if (usuario == usuarioCorrecto && contrasena == contrasenaCorrecta) {
        window.location.href='home.html';
        
    } else {
        mostrarError("Usuario o contraseña incorrectos");
    }
}

function mostrarError(mensaje) {
    alert(mensaje);
}

function validateform() {
    let tipo = document.getElementById('inputtipo').value;
    let fabricante = document.getElementById('inputfabricante').value;
    let modelo = document.getElementById('inputmodelo').value;
   

    if (tipo.trim() === "") {
        alert("Ingrese el tipo");
        return false;
    }
    if (fabricante.trim() === "") {
        alert("Ingrese el fabricante");
        return false;
    }
    if (modelo.trim() === "") {
        alert("Ingrese el modelo");
        return false;
    }

    return true;
}

function read() {
    let listguitars;
    if (localStorage.getItem('listguitars') == null) {
        listguitars = [];
    } else {
        listguitars = JSON.parse(localStorage.getItem('listguitars'));
    }

    var html = "";
    listguitars.forEach(function (element, index) {
        html += "<tr>";
        html += "<td>" + element.tipo + "</td>";
        html += "<td>" + element.fabricante + "</td>";
        html += "<td>" + element.modelo + "</td>";
        html += "<td>" + (element.stock || 0) + "</td>"; 
        
        html += '<td><button onclick="deletedata(' + index + ')" class="btn btn-danger" id="btneliminar">Eliminar Dato</button><button id="btnedit" onclick="editdata(' + index + ')" class="btn btn-warning">Editar Dato</button></td>';
        html += "</tr>";
    });

    document.querySelector('#tabledata tbody').innerHTML = html;
}

document.addEventListener('DOMContentLoaded', read);

function adddata() {
    if (validateform()) {
        let tipo = document.getElementById('inputtipo').value;
        let fabricante = document.getElementById('inputfabricante').value;
        let modelo = document.getElementById('inputmodelo').value;
        let stock=document.getElementById('inputCantidadCargar').value;

        var listguitars;
        if (localStorage.getItem('listguitars') == null) {
            listguitars = [];
        } else {
            listguitars = JSON.parse(localStorage.getItem('listguitars'));
        }

        listguitars.push({
            tipo: tipo,
            fabricante: fabricante,
            modelo: modelo,
            stock:stock,
        });

        localStorage.setItem('listguitars', JSON.stringify(listguitars));
        read();

        document.getElementById('inputtipo').value = "";
        document.getElementById('inputfabricante').value = "";
        document.getElementById('inputmodelo').value = "";
        document.getElementById('inputCantidadCargar').value = "";
    }
}

function deletedata(index){
    let listguitars;
    if (localStorage.getItem('listguitars') == null) {
        listguitars = [];
    } else {
        listguitars = JSON.parse(localStorage.getItem('listguitars'));
    }

    listguitars.splice(index,1);
    localStorage.setItem('listguitars', JSON.stringify(listguitars));

    read();
}

function editdata(index) {
    document.getElementById('btnadd').style.display = 'none';
    document.getElementById('btnupdate').style.display = 'block';

    let listguitars;
    if (localStorage.getItem('listguitars') == null) {
        listguitars = [];
    } else {
        listguitars = JSON.parse(localStorage.getItem('listguitars'));
    }

    document.getElementById('inputtipo').value = listguitars[index].tipo;
    document.getElementById('inputfabricante').value = listguitars[index].fabricante;
    document.getElementById('inputmodelo').value = listguitars[index].modelo;
    document.getElementById('inputCantidadCargar').value = listguitars[index].stock;

    document.querySelector('#btnupdate').onclick = function () {
        if (validateform() == true) {
            listguitars[index].tipo = document.getElementById('inputtipo').value;
            listguitars[index].fabricante = document.getElementById('inputfabricante').value;
            listguitars[index].modelo = document.getElementById('inputmodelo').value;
            listguitars[index].stock = document.getElementById('inputCantidadCargar').value;

            localStorage.setItem('listguitars', JSON.stringify(listguitars));
            read();
            document.getElementById('inputtipo').value = "";
            document.getElementById('inputfabricante').value = "";
            document.getElementById('inputmodelo').value = "";
            document.getElementById('inputCantidadCargar').value = "";

            document.getElementById('btnadd').style.display = 'block';
            document.getElementById('btnupdate').style.display = 'none';
        }
    };
}

