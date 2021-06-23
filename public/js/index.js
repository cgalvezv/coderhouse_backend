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
    const title = titleInput.value;
    const price = priceInput.value;
    const thumbnail = thumbnailInput.value;
    socket.emit('productoSocket', { title, price, thumbnail });
})

const generarTabla = productos => {
    return `<div class="table-responsive">
        <table id="product-table" class="table table-dark">
            <tr> <th>Nombre</th> <th>Precio</th> <th>Foto</th></tr>
        ${
            productos.map(product => `
                <tr>
                    <td>${product.title}</td>
                    <td>${product.price}</td>
                    <td><img width="50" src=${product.thumbnail} alt="not found"></td>
                </tr>`).join('')
        }
        </table>
    </div>`;
}