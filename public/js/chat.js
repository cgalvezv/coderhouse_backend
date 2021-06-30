socket.on('messages', function(data) {
    render(data);
  });
  
  function render(data) { 
      var html = data.map(function(elem, index){ 
        return(`
              <div>
                  <b style="color:blue;">${elem.email}</b> 
                  [<span style="color:brown;">${elem.fecha}</span>] : 
                  <i style="color:green;">${elem.mensaje}</i>
              </div>
          `) 
      }).join(" "); 
      document.getElementById('messages').innerHTML = html; 
  }
  
  const userCentroMensajes = document.getElementById('user-input')
  const textoCentroMensajes = document.getElementById('msj-input')
  const botonCentroMensajes = document.getElementById('send-button')
  
  function addMessage(e) { 
      var mensaje = { 
        email: userCentroMensajes.value,
        mensaje: textoCentroMensajes.value
      }; 
      socket.emit('new-message', mensaje); 
  
      textoCentroMensajes.value = ''
      textoCentroMensajes.focus()
  
      botonCentroMensajes.disabled = true
  
      return false;
  }
  
  userCentroMensajes.addEventListener('input', () => {
      let hayEmail = userCentroMensajes.value.length
      let hayTexto = textoCentroMensajes.value.length
      textoCentroMensajes.disabled = !hayEmail
      botonCentroMensajes.disabled = !hayEmail || !hayTexto
  })
  
  textoCentroMensajes.addEventListener('input', () => {
      let hayTexto = textoCentroMensajes.value.length
      botonCentroMensajes.disabled = !hayTexto
  })