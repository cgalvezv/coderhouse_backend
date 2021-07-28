const schemaAuthor = new normalizr.schema.Entity('author',{},{idAttribute: 'email'});

const schemaMensaje = new normalizr.schema.Entity('post', {
    author: schemaAuthor
},{idAttribute: '_id'});

const schemaMensajes = new normalizr.schema.Entity('posts', {
  mensajes: [schemaMensaje]
},{idAttribute: 'id'});

socket.on('messages', function(data) {
    const desnormalizedData = normalizr.denormalize(data.result, schemaMensajes, data.entities)
    const compression = Math.round((JSON.stringify(desnormalizedData).length * 100) / JSON.stringify(data).length);
    document.getElementById('compression').innerHTML = `${compression} %`; 
    render(desnormalizedData.mensajes);
});
  
function render(data) { 
    var html = data.map(function(elem, index){ 
    return(`
            <div>
                <b style="color:blue;">${elem.email}</b> 
                [<span style="color:brown;">${elem.fecha}</span>] : 
                <i style="color:green;">${elem.texto}</i>
            </div>
        `) 
    }).join(" "); 
    document.getElementById('messages').innerHTML = html; 
}

const emailCentroMensajes = document.getElementById('email-input')
const firstNameCentroMensajes = document.getElementById('firstName-input')
const lastNameCentroMensajes = document.getElementById('lastName-input')
const ageCentroMensajes = document.getElementById('age-input')
const nicknameCentroMensajes = document.getElementById('nickname-input')
const avatarCentroMensajes = document.getElementById('avatar-input')
const textoCentroMensajes = document.getElementById('msj-input')
const botonCentroMensajes = document.getElementById('send-button')

function addMessage(e) { 
    var mensaje = { 
        email: emailCentroMensajes.value,
        nombre: firstNameCentroMensajes.value,
        apellido: lastNameCentroMensajes.value,
        edad: ageCentroMensajes.value,
        alias: nicknameCentroMensajes.value,
        avatar: avatarCentroMensajes.value,
        texto: textoCentroMensajes.value
    }; 
    socket.emit('new-message', mensaje); 

    textoCentroMensajes.value = ''
    textoCentroMensajes.focus()

    botonCentroMensajes.disabled = true

    return false;
}

emailCentroMensajes.addEventListener('input', () => {
    let hayEmail = emailCentroMensajes.value.length
    let hayTexto = textoCentroMensajes.value.length
    textoCentroMensajes.disabled = !hayEmail
    botonCentroMensajes.disabled = !hayEmail || !hayTexto
})

textoCentroMensajes.addEventListener('input', () => {
    let hayTexto = textoCentroMensajes.value.length
    botonCentroMensajes.disabled = !hayTexto
})