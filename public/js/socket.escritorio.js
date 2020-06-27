// COmando para establecer la conexión 
let socket = io();

// con window.location.search para obtener todos los parametros opcionales que vienen por el URL
let searchParams = new URLSearchParams(window.location.search);

// para preguntar si algo existe en searchparams (searchParams.has())
if (!searchParams.has("escritorio")) {
    // salirse de la pantalla actual
    window.location = "index.html";
    throw new Error("El escritorio es necesario");
}

// si encuentra escritorio en los parametros de la URL 
// obtiene el valor
let escritorio = searchParams.get("escritorio");
// obtiene todos los elementos small del html
let label = $("small");

console.log(escritorio);

// por medio de JQuery con la etiqueta $() podemos acceder a los 
// componentes del html
$("h1").text("Escritorio " + escritorio);

// crear el listener para todos los botones
$("button").on("click", function() {
    // actualizar el elemento small del html
    socket.emit("atenderTicket", { escritorio: escritorio }, function(resp) {

        if (resp === "No hay tickets") {
            label.text(resp);
            alert(resp);
            return;
        }
        label.text("Ticket " + resp.numero);
    })


})