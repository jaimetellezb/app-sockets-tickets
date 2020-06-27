const { io } = require('../server');
const { TicketControl } = require("../classes/ticket-control")


const ticketControl = new TicketControl();

io.on('connection', (client) => {

    client.on("siguienteTicket", (data, callback) => {

        let siguiente = ticketControl.siguiente();

        console.log(siguiente);
        callback(siguiente);
    });

    //emitir evento estadoActual
    client.emit("estadoActual", {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    });


    // escuchar el evento atenderTicket
    client.on("atenderTicket", (data, callback) => {

        if (!data.escritorio) {
            // devuelve un callback cuando no viene el escritorio
            return callback({
                err: true,
                message: "El escritorio es necesario"
            })
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);

        callback(atenderTicket);

        //actualizar o notificar cambios en los ultimos4

        //emitir evento ultimos4
        client.broadcast.emit("ultimos4", {
            ultimos4: ticketControl.getUltimos4()
        });

    })
})