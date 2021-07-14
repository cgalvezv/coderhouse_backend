// inicializamos la conexion
const socket = io();

// recibo desde el servidor un mensaje
socket.on('productos', productos => {
    if (productos.length > 0) {
        document.querySelector('#table-wrapper').innerHTML = generarTabla(productos);
    }
});

const titleInput = document.querySelector('#title-input');
const priceInput = document.querySelector('#price-input');
const thumbnailInput = document.querySelector('#thumbnail-input');
const button = document.querySelector('#add-button');

button.addEventListener('click', () => {
    const nombre = titleInput.value;
    const precio = priceInput.value;
    const url = thumbnailInput.value;
    fetch('/api/productos/guardar', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ nombre, precio, url })
    }).then(async response => console.log(await response.json()))
    .then(() => socket.emit('update', true))
    .catch(error => console.error(error));
})

const generarTabla = productos => {
    return `<div class="table-responsive">
        <table id="product-table" class="table table-dark">
            <tr> <th>Nombre</th> <th>Precio</th> <th>Foto</th></tr>
        ${
            productos.map(product => `
                <tr>
                    <td>${product.nombre}</td>
                    <td>${product.precio}</td>
                    <td><img width="50" src=${product.url} alt="not found"></td>
                </tr>`).join('')
        }
        </table>
    </div>`;
}