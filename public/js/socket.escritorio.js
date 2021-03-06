//Comando para establecer conexion
var socket = io();

socket.on('connect',function(){
    console.log('Conectado al servidor');
});

socket.on('disconnect',function(){
    console.log('Desconectado del servidor');
});

var searchParams = new URLSearchParams(window.location.search);

if(!searchParams.has('escritorio')){
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');

$('h1').text("Escritorio "+escritorio);

$('button').click(function (e) {     

    socket.emit('atenderTicket',{escritorio:escritorio},function(resp){
        if(resp == 'No hay mas tickets'){
            alert(resp);
            $('small').text(resp);
            return;
        }
        $('small').text('Ticket '+resp.numero);
    });
    

});