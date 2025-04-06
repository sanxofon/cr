# Cifrado rítmico

Podemos representar patrones rítmicos como una secuencia de números, donde cada número representa la duración entre los golpes de cualquier patrón rítmico.

## CLAVES RÍTMICAS

Una clave rítmica es una pequeña frase o motivo rítmico mínimo que solo toma en cuenta la secuencia de golpes y no las alturas o los timbres, técnicas, etc. Por ejemplo, se puede describir una clave rítmica simple con una secuencia de figuras musicales sin usar nunca silencios, es decir, que todas las notas duran hasta la siguiente nota o hasta el final de la clave.

Observa la siguiente tabla:

  | Figura | Duración en 8vos | Fracción |
  |--------|----------|----------|
  | 𝅘𝅥𝅮      | 1        | 1/8      |
  | ♩      | 2        | 2/8      |
  | ♩.     | 3        | 3/8      |
  | 𝅗𝅥      | 4        | 4/8      |
  | 𝅗𝅥.     | 6        | 6/8      |
  | 𝅝      | 8        | 8/8      |

### Clave de Son

Una clave muy famosa, llamada "Clave de Son", es una clave caribeña para 2 compases de 4/4 con el siguiente patrón:

|        |  |  |  |  |  |
|--------|--------|--------|--------|--------|--------|
| Figura | ♩. | ♩. | 𝅗𝅥 | ♩ | 𝅗𝅥 |
| Número | 3 | 3 | 4 | 2 | 4 |
                 
                  
  
Así, esta clave rítmica se puede representar con la siguiente secuencia de números:

		33424

Para facilitar la lectura, antes de la secuencia¹ escribimos la longitud total de la clave, en este caso 16, porque 3+3+4+2+4 = 16 y un punto (.) como separación. Así que escribimos:

		16.33424

Esta es la clave de son.

### Clave de Rumba

De forma similar se puede escribir la "Clave de Rumba":

		16.24334

Se podría decir que la clave de son es una "inversión" de la clave de rumba, pero ¿de qué manera?

## Concatenación

Las claves rítmicas más complejas se pueden descomponer en claves más simples, como las frases en palabras. Por ejemplo, la clave de son se puede descomponer de la siguiente manera:

		16.33424 = 10.334 + 6.24

Aquí la "suma" (+) se interpreta solo como que una clave se sucede a la otra. Una **concatenación** de claves.

A diferencia de una suma matemática, en la "suma" o concatenación de claves no se mantiene la "propiedad conmutativa", así que:

		A + B ≠ B + A

La *concatenación* de A + B no es igual a la *concatenación** de B + A.

Volvamos a la clave de son.
Si la parte A es la clave 10.334 y la parte B es 6.24, tenemos que:

		16.33424 = 10.334 + 6.24

La clave de rumba es una concatenación inversa de las mismas claves simples:

		16.24334 = 6.24 + 10.334

Recordemos que ANTES DEL PUNTO se escribe la longitud total y después se escribe de la secuencia de la clave en sí. Cuando la secuencia está completa, sus dígitos deben sumar la longitud total.

Sin embargo, se puede **abreviar** una clave rítmica simple cuando se repite una secuencia dentro de ella.

Por ejemplo:

|	Clave		| Completa		| Abreviada		|
|---------|-------------|-------------|
|	Ej.1		| 12.3333			| 12.3				|
|	Ej.2		| 12.231231		| 12.231			|
|	Ej.3		| 16.13131313		| 16.13			|

(REVISAR ESTO!)
Cuando se trata de claves rítmicas IRREGULARES, la abreviatura debe tomar en cuenta que si no alcanza la longitud total de la clave se podrían omitir algunos dígitos de la secuencia abreviada y el último dígito puede acortarse para ajustarse a la longitud.

Por ejemplo:

|	Clave Completa		| Abreviada		|
|-------------|-------------|
|	9.333				| 9.3					|
|	9.441				| 9.4					|
|	7.221				| 7.2					|
|	5.221				| 5.2					|
|	5.32				| 5.3					|
|	5.23				| 5.23				|
|	11.3332			| 11.3				|
|	11.23231		| 11.23				|
|	11.123122		| 11.123			|
	
Ahora que sabemos cómo abreviar las claves rítmicas podemos escribir las concatenaciones sobre ellas de forma escueta.
Algunos ejemplos:

| Abreviadas | Completas | Resultado |
|------------|-----------|-----------|
| 7.2 + 5.2 | 7.2221 + 5.221 | 12.2221221 |
| 5.2 + 7.2 | 5.221 + 7.2221 | 12.2212221 |
| 7.2 + 5.3 | 7.2221 + 5.32 | 12.222132 |
| 5.2 + 7.3 | 5.32 + 7.2221 | 12.32221 |
| 3.2 + 5.23 | 3.21 + 5.23 | 8.2123 |
| 7.3 + 3.2 + 5.2 | 7.331 + 3.21 + 5.221 | 15.33121221 |

Para enterderlo mejor, también podemos pensar o describir las claves rítmicas como secuencias de golpes (1) y silencios (0). Una "cadena de golpes" se puede expresar con unos y ceros (de forma binaria) expresando que el 1 "suena" y el 0 "no suena".

Observa los siguientes ejemplos:
| Clave rítmica | Cadena binaria |
|---------------|----------------|
| 2.11  | 1 1 |
| 2.2  | 1 0 |
| 3.111  | 1 1 1 |
| 3.21  | 1 0 1 |
| 3.3  | 1 0 0 |
| 3.12  | 1 1 0 |
| 5.221 | 1 0 1 0 1 |
| 7.232 | 1 0 1 0 0 1 0 |
| 6.33  | 1 0 0 1 0 0 |
| 6.222 | 1 0 1 0 1 0 |

Debemos leer estas secuencias binarias de forma que cada dígito "dura" un tiempo igual y el 1 suena y el 0 no suena.

Se trata pues de "otra forma de ver o expresar" las mismas claves rítmicas. Esto nos será útil para entender la operación de **superposición** más adelante.

## Superposición

Como hemos visto, **concatenar** implica "poner una después de la otra" y usamos el signo de suma (+).

Ahora podemos definir otra operación de dos o más claves como "superponer una clave sobre la otra". En vez de "sucederse en el tiempo" (concatenar) vamos a tocar las dos claves "al mismo tiempo". Usamos la diagonal (/) para indicar la superposición.
Por ejemplo:

    2.11 / 3.111 = 6.2112

¿Por qué es válido este resultado?
Cuando "superponemos" dos claves las "estiramos" para que tengan la misma duración total en el tiempo. Los dos "pulsos" de 2.11 deben durar los mismo que lo tres "pulsos" de 3.111 y para lograrlo debemos "superponer" las longitudes de las claves para obtener la nueva longitud total, así:

    2 * 3 = 6

Después debemos "estirar" los "pulsos" multiplicando cada uno por la longitud total de la clave contra la que estamos superponiendo, así:

    2.11 * 3 = 6.33
    3.111 * 2 = 6.222

Ahora ambas claves tienen la misma duración total en el tiempo, así que podemos "superponerlas" combinandolas.
Por ejemplo:

    6.33 / 6.222 = 6.2112

Vamos a verlo gráficamente en modo binariob para entenderlo mejor:

| Clave rítmica | Cadena binaria |
|---------------|----------------|
|     6.33      |   1 0 0 1 0 0  |
|     6.222     |   1 0 1 0 1 0  |

Si tocamos ambas claves al mismo tiempo, obtenemos:

|  Pulsos   |   1   |   2   |   3   |   4   |   5   |   6   |
|-----------|-------|-------|-------|-------|-------|-------|
|   6.33    | **1** |   0   |   0   | **1** |   0   |   0   |
|   6.222   | **1** |   0   | **1** |   0   | **1** |   0   |
| Resultado | **1** |   0   | **1** | **1** | **1** |   0   |

El primer pulso es un "golpe" (1) en ambas claves, así que "suena" (1) en el resultado; el segundo pulso es un silencio (0) en ambas claves y "no suena" (0) en el resultado. El tercer pulso "no suena" (0) en la primera clave pero sí "suena" (1) en la segunda, así que "suena" en el resultado, etcétera.

Y el resultado es:

    1 0 1 1 1 0 = 6.2112

Si no entendemos bien todavía la operación de **superposición**, un poco de práctica nos ayudará a "escucharlo" directamente.

Dos personas van a tocar juntas en 6/8.
La primera tocará repetidamente la clave 6.33:

    6.33 => 𝄆 ♩. ♩. 𝄇

La segunda persona tocará al mismo tiempo la clave 6.222:

    6.222 => 𝄆 ♩ ♩ ♩ 𝄇

La clave que describe la superposición de ambas (cuando suenan al mismo tiempo) es la siguiente:

    6.2112 => 𝄆 ♩ 𝅘𝅥𝅮 𝅘𝅥𝅮 ♩ 𝄇

Ahora veamos algunos ejemplos más complejos de *superposiciones* de claves simples:

#### Ejemplo: Concatear 3.1 y 5.2

1. Completamos las claves:

    | Abreviadas |   Completas   |
    |------------|---------------|
    |  3.1 / 5.2 | 3.111 / 5.221 |

2. Multiplicamos las longitudes de las claves para conocer la longitud total de la clave que resultará de la superposición:

        3 * 5 = 15

3. Multiplicamos cada pulso de la *primera clave* (1,1,1) por la longitud de la *segunda clave* (5) par "expandirla" a la longitud total de la clave que resultará de la superposición:

        1 1 1 => (1 * 5) (1 * 5) (1 * 5) => 5 5 5

    La primera clave resultante (expandida) es:

        3.111 => 15.555

4. Ahora multiplicamos cada pulso de la *segunda clave* (1,0,1,0,1) por la longitud de la *primera clave* (3) para "expandirla" a la longitud total de la superposición:

        2 2 1 => (2 *3) (2 *3) (1 *3) => 6 6 3

    La segunda clave resultante (expandida) es:

        5.221 => 15.663

5. Ahora que ambas claves tienen la misma longitud total en el tiempo, podemos "superponerlas" y obtener el resultado:

| Pulsos | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |10 |11 |12 |13 |14 |15 |
|--------|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 15.555 | 1 | 0 | 0 | 0 | 0 | 1 | 0 | 0 | 0 | 0 | 1 | 0 | 0 | 0 | 0 |
| 15.663 | 1 | 0 | 0 | 0 | 0 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | 1 | 0 | 0 |
| Resultado | **1** | 0 | 0 | 0 | 0 | **1** | **1** | 0 | 0 | 0 | **1** | 0 | **1** | 0 | 0 |

6. Así la clave resultante de la superposición de **3.1** y **5.2** es:

        1 0 0 0 0 1 1 0 0 0 1 0 1 0 0  =>  51423

        Y por lo tanto:

            3.1 / 5.2 = 15.51423

**Resolvamos un par de ejemplos más como ejercicio:**

Ejemplo: **3.1 / 5.2**

1. Completamos las claves:

        3.1 / 5.2 = 3.111 / 5.221

2. Calculamos la longitud resultante:
        
        3 * 5 = 15

3. Expandimos la primera clave:
        
        3.111 * 5 => 15.555

4. Expandimos la segunda clave:
        
        5.221 * 3 => 15.663

5. Superponemos ambas claves:
        
        555 => 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0
        663 => 1 0 0 0 0 0 1 0 0 0 0 0 1 0 0
               -----------------------------
               1 0 0 0 0 1 1 0 0 0 1 0 1 0 0 => 51423

6. Podemos entonces afirmar que:
        
        3.1 / 5.2 = 15.51423

Ejemplo: **7.2 / 5.2**

1. Completamos las claves:

        7.2 / 5.2 = 7.2221 / 5.221

2. Calculamos la longitud resultante:

        7 * 5 = 35

3. Expandimos la primera clave:

        7.2221 * 5 => 35.(10)(10)(10)5

4. Expandimos la segunda clave:

        5.221 * 7 => 35.(14)(14)7

    Usando Base62 podemos omitir los paréntesis¹:

        35.(10)(10)(10)5 => 35.AAA5

        35.(14)(14)7 => 35.EE7

5. Superponemos ambas claves:

        35.AAA5 / 35.EE7 = 35.A46825

6. Podemos entonces afirmar que:

        7.2 / 5.2 = 35.A46825

Como ejercicio, resuelve la siguiente superposición rítmica:

Ejercicio: **5.212 / 7.21112**

     5.212 / 7.21112 = 35.A41514A

Nota que esta operación de **superposición** es más complicada que la **concatenación**, así que hemos creado un código JavaScript (claves-ritmicas.class.js) para ayudarnos a hacer estos cálculos rápido y fiablemente.

Puedes acceder a la **[Calculadora Rítmica](https://lengua.la/cr)** en línea en la dirección:

**[https://lengua.la/cr](https://lengua.la/cr)**

Ahí se pueden hacer operaciones tan complicadas como quieras, y podemos aplicar varias operaciones en una sola expresión usando los paréntesis para ordenas las operaciones de forma clara.

Por ejemplo, podemos escribir en la calculadora rítmica algo como:

    (5.2 + 7.3) / (7.2 + 5.3)

Y obtendremos el resultado:

                5.2 + 7.3 = 12.221331
                7.2 + 5.3 = 12.222132
    12.221331 / 12.222132 = 12.221111211

Otro ejemplo:

    (7.322 + 3.12) / 5.1211

Obtendremos:

         7.322 + 3.12 = 10.32212
    10.32212 / 5.1211 = 10.2121112
  
---
**Notas finales:**

¹ Para facilitar la escritura, se puede usar el sistema de notación base 62, que usa los caracteres 0-9, A-Z y a-z, para representar los números mayores de 9 en un sólo dígito.
