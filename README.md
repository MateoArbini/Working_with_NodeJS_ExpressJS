---Trabajando con NodeJs y ExpressJS---

Siguiendo tutorial de curso https://www.youtube.com/watch?v=o85OkeVtm7k 

En este tutorial estaremos trabajando con NodeJS y ExpressJS

Lo primero que hacemos, es corroborar que Node y NPM (Node Package Manager) esten instalados

    * node -v
    * npm -v

Una vez que corroboramos que estos esten instalados, lo que hacemos es ejecutar el comando npm init, y con esto inciaremos un proyecto.
En principio, este te hara una serie de preguntas acerca de especificaciones sobre tu proyecto, sin embargo, si tiramos el comando npm init -y,
con esto lo que haremos es hacer un npm init con todo "yes". Y esto, ya te crea el package json listo en tu directorio.

Luego de tener listo el package, creamos un index.js, con un simple console.log, y si queremos ejecutar este index, lo que hacemos es ejecutar el node index.js y veremos los resultados, sin embargo, no es lo habitual seguir este proceso, sino que lo que se hace, es crear un script, en nuestro caso "start" en el package json en la seccion "scripts", que lo que hara es ejecutar el mismo comando. (Para ver los scripts de nuestro proyecto, ejecutamos el comando npm run y alli los podremos ver y hasta su determinada descripcion). Entonces, si ejecutamos npm start, estamos ejecutando el "node index.js"




