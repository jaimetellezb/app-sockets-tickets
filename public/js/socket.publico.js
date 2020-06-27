// COmando para establecer la conexión 
let socket = io();

// con #id_elemento para buscar un elemento dentro del HTML
let lblTicket1 = $("#lblTicket1");
let lblTicket2 = $("#lblTicket2");
let lblTicket3 = $("#lblTicket3");
let lblTicket4 = $("#lblTicket4");

let lblEscritorio1 = $("#lblEscritorio1");
let lblEscritorio2 = $("#lblEscritorio2");
let lblEscritorio3 = $("#lblEscritorio3");
let lblEscritorio4 = $("#lblEscritorio4");

let arrLblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
let arrLblEscritorios = [lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4];

socket.on("connect", function() {
    console.log("conectado al servidor")
});

socket.on("disconnect", function() {
    console.log("desconectado del servidor")
});


socket.on("estadoActual", function(data) {
    actualizaHtml(data.ultimos4);
});

// escucha el evento de ultimos4 para actualizar
// datos en la pantalla Publico
socket.on("ultimos4", function(data) {
    var audio = new Audio("audio/new-ticket.mp3");
    audio.play();

    actualizaHtml(data.ultimos4);
});

function actualizaHtml(ultimos4) {

    for (let i = 0; i <= ultimos4.length - 1; i++) {
        arrLblTickets[i].text("Ticket " + ultimos4[i].numero);
        arrLblEscritorios[i].text("Escritorio " + ultimos4[i].escritorio);
    }
}