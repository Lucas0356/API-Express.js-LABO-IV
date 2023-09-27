# API-Express.js-LABO-IV

**API Utilizada: https://restcountries.com/v3.1**
**URL Render: https://api-express-js-coutries-continents.onrender.com/**

<h2 style="color:#ff0000; font-size:36px;">---- DESCRIPCIÓN ----</h2>
Esta API proporciona información sobre países del mundo, permitiendo a los usuarios acceder a datos específicos
sobre países en las regiones de 'África' y 'América'. A continuación, detallamos los endpoints disponibles.

<h2 style="color:#ff0000; font-size:36px;">---- ENDPOINTS ----</h2>

**-- /africa**

GET /api/v1/countries/africa/all                                | Devuelve todos los países de África.

GET /api/v1/countries/africa/{ID}                               | Devuelve un determinado país en base a un ID.

GET /api/v1/countries/africa/population?population={numero}     | Devuelve los países de África que tengan hasta {numero} habitantes.

**-- /america**

GET /api/v1/countries/america/all                               | Devuelve todos los países de América.  

GET /api/v1/countries/america/{cioc}                            | Devuelve un determinado país en base a su abreviación.

GET /api/v1/countries/america/language?language={lenguaje}      | Devuelve los países de América que tengan {lenguaje} como lenguaje.


<h2 style="color:#ff0000; font-size:36px;">---- PARÁMETROS ACEPTADOS ----</h2>

**-- /africa**

{ID}          -->  La búsqueda de los países según su ID está establecida en base al código UN M49. 

Página de Referencia: https://en.wikipedia.org/wiki/UN_M49

{population}  -->  La búsqueda de los países según su población admite cualquier valor numérico.

**-- /america**

{CIOC}        -->  La búsqueda de los países según su abreviación está establecida en base al CIOC.

Página de Referencia: https://en.wikipedia.org/wiki/List_of_IOC_country_codes

{lenguaje}    -->  La búsqueda de los países por su lenguaje, está establecida en base a la lista de lenguajes oficiales.

Página de Referencia: https://en.wikipedia.org/wiki/List_of_official_languages

