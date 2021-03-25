let socket = io.connect('http://localhost:8080/', { forceNew : true});

socket.on('message', (data) => {
    console.log(data);
    render(data);
})

function render (data){
    let html = data.map((elem, index) =>{
       return ( `<div>
                    <strong>${elem.autor}</strong>
                    <em>${elem.text}</em>
                </div>`);
    }).join(" ");

    document.getElementById('messages').innerHTML = html;
  
}

function addMessages (info){
    let payload = {
        autor : document.getElementById('username').value,
        text: document.getElementById('text').value
    }
    socket.emit('new-message', payload);
    return false;
};
