// const http = require('http') 
// Se esta requiriendo el modulo http, que se utliza para levanatr servidores, hacer peticiones, demas.
const express = require('express')
// Se esta requiriendo el modulo http, que se utliza para levanatr servidores, hacer peticiones, demas.
// Este framework, es el "flask" pero para el JS.
const app = express()

let notes = [
    {
        "id": 1,
        "content": "Hello World 1",
        "date": "2019-05-30T17:30:31.098Z",
        "important": true
    },
    {
        "id": 2,
        "content": "Hello World 2",
        "date": "2019-05-30T18:39:34.091Z",
        "important": false
    },
    {
        "id": 3,
        "content": "Hello World 3",
        "date": "2019-05-30T19:20:14.298Z",
        "important": true
    }
]

// A continuacion, determinaremos como seran las rutas. Al igual que flask, lo que hacemos es hacer una 
// peticion .get, le indicamos la ruta, y le hacemos una callback, que devolvera lo que nosotros querramos.
// En el primer caso, devolvemos una etiqueta h1, y en el segundo caso, devolvemos un json de notes. El .json
// en la response, es un metodo.
app.get('/', (request, response) => {
    response.send('<h1>Hello World</h1>')
})

app.get('/api/notes', (request, response) => {
    response.json(notes)
})

// En esta ruta, el elemento :id, es un segmento dinamico, por lo cual puede obtener distintos valores (ya sea
// 1, 2, 3, etc).
app.get('/api/notes/:id', (request, response) => {
    // La razon por la cual ponemos todo adentro de numeros, es que el id en notes, es un numero, y en la ruta, nuestro id es
    // un string. Entonces, al no coinicidir en los tipos de datos, nunca se va a encontrar una similitud entre estos y la pagina
    // nunca devolveria nada. Por eso, lo que hacemos en este caso, es convertir a numero el id, y de esa manera si los comparamos.
    const id = Number(request.params.id)
    // Aca lo que buscamos hacer, es a traves del elemento id que pasamos en la ruta, preguntar si ese id es igual al id
    // que tenemos en notes, en caso afirmativo, devolvemos ese objeto que tenga esa id correspondiente.
    const note = notes.find(note => note.id === id)

    // Con este if lo unico que hacemos es consultar si se encontro note, que lo devuelva con el metodo json, de lo contrario, que devuevla
    // el status code 404, que refiere a Not found.
    if (note) {
        response.json(note)
    } else {
        response.status(404).end()
    }
})

// A continuacion hacemos una peticion delete, con un status code de 204, la cual hace referencia a no content. Para poder
// probar esto, utilizamos postman. La condicion es que coincida, el id que se pasa por la ruta, y esto deberia hacer el delete bajo
// la condicion de callback. IMPORTANTE -- COMO ESTOS DATOS ESTAN GUARDADOS EN MEMORIA, SI BIEN CUANDO AL MOMENTO DE UTILIZAR EL POSTMAN,
// Y HACEMOS LA PETICION, ESTE LO BORRA DE MANERA CORRECTA, Y ESTO LO PODEMOS CORROBORAR VOLVIENDO A UTILIZAR EL GET METHOD. SIN EMBARGO,
// AL ESTAR GUARDADO EN MEMORIA, CUANDO REINICIAMOS EL SERVIDOR, LOS DATOS SIGUEN ESTANDO AHI. AQUI SE DEBE IMPLEMENTAR EL USO DE ALGUNA BASE
// DE DATOS, PARA QUE CUANDO AL ELIMINAR LOS DATOS, ESTOS NO SE VUELVAN A MOSTRAR.
app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
    response.status(204).end()
})

// Con esta peticion, lo que hago es querer agregar elementos al notes. Para apreciar estos cambios, ejecutar estas peticiones en el postman
app.post('/api/notes', (request, response) => {
    const note = request.body
    
    if (!note.content || !note) {
        return response.status(400).json({
            error: "Bad request"
        })
    }

    // Con el maxID, lo que hago es ver cual fue el ultimo id creado, y de esta manera el proximo id se va a asignar al elemento que yo vaya a crear
    const ids = notes.map(note => note.id)
    const maxID = Math.max( ... ids)

    const new_note = {
        id: maxID + 1, // asignamos el id que va a tener la nueva note
        content: note.content, // Content, es el contenido del json que queremos agregar al notes
        important: typeof note.important !==  'undefined' ? note.important : false,
        date: new Date().toISOString()
    }

    notes = notes.concat(new_note)

    response.status(201).json(new_note)
})

// const app = http.createServer((request, response) => { 
//     // Al createServer, se le pasa un Callback, que es una funcion que se ejecuta cuando ocurre algo. En este caso, cuando 
//     // una request llegue se va a ejecutar. Esta funcion es una request, y un response. 
//     response.writeHead(200, { 'Content-Type': 'application/json' }) // 200 es el status code - Content tpye es el tipo de dato que estas devolviendo
//     response.end(JSON.stringify(notes)) // Dato que se devuelve
// })

const HOST = 'localhost'; // El host va a ser el localhost
const PORT = 3001; // Este servidor va a estar escuchando en el puerto 3001
// Ahora que utilizamos Express, lo que hacemos en este caso, es hacer que la app escuche al puerto
// establecido, y una vez que lo hace, retorna el console.log(como callback)
app.listen(PORT, () => {
    console.log(`Server running on http://${HOST}:${PORT}`)
})