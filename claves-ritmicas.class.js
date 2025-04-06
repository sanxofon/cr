/*
  TEORÍA DE CLAVES RÍTMICAS
  Una clave rítmica es una pequeña frase o motivo rítmico mínimo que solo toma en cuenta la secuencia de golpes y no las alturas o los timbres, técnicas etc. Por ejemplo, se puede describir una clave rítmica simple con una secuencia de fihuras musicales sin usar nunca silencios, es decir, que todas las notas duran hasta la siguiente nota o hasta el final de la clave.
  Observa la siguiente tabla:
  |-------------------------------|
  |	Figura | Duración | Fracción	|
  |--------|----------|-----------|
  |    𝅘𝅥𝅮		|     1	 	 |   1/8		 |
  |    ♩		|    2	 	 |   1/4		|
  |    ♩. 	|    3	 	 |   3/8		|
  |    𝅗𝅥		 |    4		  |   1/2		 |
  |    𝅗𝅥.	 |    6		  |   2/3		 |
  |    𝅝		 |    8		  |   1/1		 |	
  |-------------------------------|
  Una clave muy famosa, llamada la "clave de son", es una clave caribeña para 2 compases de 4/4 con el siguiente patrón:

  ♩.   ♩.   𝅗𝅥   ♩    𝅗𝅥
  3   3    4   2   4

  Esta clave rítmica se puede representar con la siguiente secuencia:
  33424
  Antest de la secuencia¹, para facilitar la lectura, escribimos la longitud total de la clave, en este caso 16, porque 3+3+4+2+4 = 16 y un punto como separación. Así que escribimos:
  16.33424
  Esta es la clave rítmica de son. De forma similar se puede escribir la clave de rumba que es similar:
  16.24334
  Se podría decir que la clave de son es una "inversión" de la clave de rumba, 
  ¿pero de qué manera?
  Las claves rítmicas más complejas se pueden descomponer en claves más simples, como las frases en palabras. Por ejemplo, la clave de son se puede descomponer de la siguiente manera:
  16.33424 = 10.334 + 6.24
  Aquí la "suma" (+) se interpreta solo como que una clave se sucede a la otra. Una concatenación.
  A diferencia de una suma matemática, en la "suma" o concatenación de claves no se mantiene la "propiedad conmutativa", así que:
  A + B ≠ B + A.
  La suma de A + B no es igual a la suma de B + A.
  Volvamos a la clave de son.
  Si la parte A es la clave 10.334 y la parte B es 6.24, tenemos que:
  16.33424 = 10.334 + 6.24
  La clave de rumba es una concatenación inversa de las mismas claves simples:
  16.24334 = 6.24 + 10.334
  Recordemos que ANTES DEL PUNTO se escribe la longitud total de la clave y después se escribe la clave que si está completa, sus dígitos deben sumar la longitud total.
  Se puede abreviar una clave rítmica simple cuando se repite una secuencia.
  Por ejemplo:
  |-------------------------------------|
  |	Clave		| Completa		| Abreviada		|
  |---------|-------------|-------------|
  |	Ej.1		| 12.3333			| 12.3				|
  |	Ej.2		| 12.231231		| 12.231			|
  |	Ej.3		| 12.231231		| 12.231			|
  |-------------------------------------|
  Cuando se trata de claves rítmica IRREGULARES, la avreviatura debe tomar en cuenta que, si no alcanza la longitud total de la clave, se podrían omitir algunos dígitos de la secuencia abreviada y el último dígito puede acortarse para ajustarse a la longitud. 
  Por ejemplo:
  |-------------------------------------|
  |	Clave		| Completa		| Abreviada		|
  |---------|-------------|-------------|
  |	Ej.4		| 11.3332			| 11.3				|
  |	Ej.5		| 11.23231		| 11.23				|
  |	Ej.6		| 11.123122		| 11.123			|
  |	Ej.7		| 9.333				| 9.3					|
  |	Ej.8		| 9.441				| 9.4					|
  |	Ej.9		| 7.221				| 7.2					|
  |	Ej.10		| 5.221				| 5.2					|
  |	Ej.11		| 5.32				| 5.3					|
  |	Ej.12		| 5.23				| 5.23				|
  |-------------------------------------|

  Ahora que sabemos como abvreviar las claves rítmicas podemos escribir las operaciones sobre ellas de forma escueta,. Algunos ejemplos:
  Ej.13		7.2 + 5.2 = 7.2221 + 5.221 = 12.2221221
  Ej.14		5.2 + 7.2 = 5.221 + 7.2221 = 12.2212221
  Ej.15		7.2 + 5.3 = 7.2221 + 5.32 = 12.222132
  Ej.16		5.2 + 7.3 = 5.32 + 7.2221 = 12.32221
  Ej.17		7.3 + 3.2 + 5.23 = 7.331 + 3.21 + 5.23 = 15.3312123
  Ej.18		7.3 + 3.2 + 5.2 = 7.331 + 3.21 + 5.221 = 15.33121221
  Ej.19		11.123 + 5.122 = 11.123122 + 5.1221 = 16.24421221
  Ej.20		3.2 + 5.2 + 6.21 + 7.2 = 3.21 + 5.221 + 6.2121 + 7.2221 = 21.2122121212221

  Para enterderlo mejor, también podemos pensar o describir las claves rítmicas como secuencias de golpes (1) y silencios (0). Una "cadena de golpes" se puede expresar con unos y ceros (de forma binaria) expresando que el 1 "suena" y el 0 "no suena".
  Observa los siguientes ejemplos:
  Ej.21     2.11  => 1 1
  Ej.22      2.2  => 1 0
  Ej.23    3.111  => 1 1 1
  Ej.24     3.21  => 1 0 1
  Ej.25      3.3  => 1 0 0
  Ej.26     3.12  => 1 1 0
  Ej.27     5.221 => 1 0 1 0 1
  Ej.28     7.232 => 1 0 1 0 0 1 0
  Ej.29     6.33  => 1 0 0 1 0 0
  Ej.30     6.222 => 1 0 1 0 1 0
  Debemos leer estas secuencias binarias de forma que cada dígito "dura" un tiempo igual y el 1 suena y el 0 no suena.
  Se trata pues de "otra forma de ver o expresar" las mismas claves rítmicas. Esto nos será útil más adelante para entender las operaciones de concatenación (+) y superposición (/).

  Como hemos visto, la "suma" de claves implica concatenar o "poner una después de la otra".
  Ahora podemos definir otra operación de dos o más claves como "superponer una clave sobre la otra". En vez de "sucederse en el tiempo" vamos a tocar las dos claves "al mismo tiempo". Usamos la diagonal (/) para indicar la superposición.
  Por ejemplo:
  Ej.31   2.11 / 3.111 = 6.2112
  ¿Por qué es válido este resultado?
  Cuando "superponemos" dos claves las "estiramos" para que tengan la misma duración total en el tiempo. Los dos "pulsos" de 2.11 deben durar los mismo que lo tres "pulsos" de 3.111 y para lograrlo debemos "superponer" las longitudes de las claves para obtener la nueva longitud total, así:
  Ej.32   2 * 3 = 6
  Después debemos "estirar" los "pulsos" multiplicando cada uno por la longitud total de la clave contra la que estamos superponiendo, así:
  Ej.33   2.11 * 3 = 6.33
  Ej.34   3.111 * 2 = 6.222
  Ahora ambas claves tienen la misma duración total en el tiempo, así que podemos "superponerlas" combinandolas.
  Por ejemplo:
  Ej.35   6.33 / 6.222 = 6.2112
  Vamos a verlo gráficamente en modo binariob para entenderlo mejor:
  Ej.36   6.33  => 1 0 0 1 0 0
  6.222 => 1 0 1 0 1 0
  Si tocamos ambas claves al mismo tiempo, obtenemos:
  Ej.37     6.33 => 1 0 0 1 0 0
  6.222 => 1 0 1 0 1 0
  Res. = 6.2112 => 1 0 1 1 1 0
  El primer pulso es un "golpe" (1) en ambas claves, así que "suena" (1) en el resultado, el segundo pulso es un silencio (0) en ambas claves y "no suena" (0) en el resultado. El tercer pulso "no suena" (0) en la primera clave pero si "suena" (1) en la segunda, así que "suena" en el resultado, etcétera.
  Si no entendemos bien tedavía la operación, un poco de práctica nos ayudará a "escucharlo" directamente.
  Dos personas van a tocar juntas en 6/8.
  La primera tocará repetidamente la clave 6.33:
  6.33 => 𝄆 ♩. ♩. 𝄇
  La segunda persona tocará al mismo tiempo la clave 6.222:
  6.222 => 𝄆 ♩ ♩ ♩ 𝄇
  La clave que describe la superposición de ambas (cuando suenan al mismo tiempo) es la siguiente:
  6.2112 => 𝄆 ♩ 𝅘𝅥𝅮 𝅘𝅥𝅮 ♩ 𝄇

  Ahora veamos algunos ejemplos más comlejos de "superposiciones" (/) de claves simples:
  Ej.38		  3.1 / 5.2 = 3.111 / 5.221
  3 * 5 = 15
  3.111 * 5 => (3*5).(1*5)(1*5)(1*5) => 15.555
  5.221 * 3 => (5*3).(2*3)(2*3)(1*3) => 15.663
  15.555 => 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0
  15.663 => 1 0 0 0 0 0 1 0 0 0 0 0 1 0 0
  Res. = 15.51423 => 1 0 0 0 0 1 1 0 0 0 1 0 1 0 0
  Ej.39		  7.2 / 5.2 = 7.2221 / 5.221
  7 * 5 = 35
  7.2221 * 5 => (7*5).(2*5)(2*5)(2*5)(1*5)  => 35.(10)(10)(10)5
  5.221 * 7 => (5*7).(2*7)(2*7)(1*7)       => 35.(14)(14)7
  usando Base62 podemos omitir los paréntesis:
  Res = 35.AAA5 / 35.EE7 = 35.(10)46825 = 35.A46825
  Ej.40     5.212 / 7.21112
  5.212 * 7 = 35.(14)7(14)   = 35.E7E
  7.21112 * 5 = 35.(10)555(10) = 35.A555A
  Res. = 35.E7E / 35.A555A = 35.(10)41514(10) = 35.A41514A
  Nota que esta operación de superposición es más complicada que la concatenación así que hemos creado un código JavaScript para ayudarnos ha hacer estos cálculos rápido y fiablemente.
  Puedes acceder a la calculadora de operaciones con claves rítmicas en línea en la dirección https://lengua.la/cr y hacer operaciones tan complicadas como quieras, donde podemos además aplicar varias operaciones en una sola expresión usando los paréntesis para ordenas las operaciones de forma clara.
  Por ejemplo, podemos escribir en la calculadora rítmica algo como:
  Ej.41   (5.2 + 7.3) / (7.2 + 5.3)
  => 12.221331 / 12.222132
  Res. = 12.221111211
  Ej.42    (7.322 + 3.12) / 5.1211
  => (7.322 + 3.12) = 10.32212
  Res.  10.32212 / 5.1211 = 10.2121112

  ---
  Notas finales:
  ¹ Para facilitar la escritura, se puede usar el sistema de notación base 62,
  que usa los caracteres 0-9, A-Z y a-z, para representar los números mayores 
  de 9 en un sólo dígito.

*/
// Clase principal que contiene métodos para operaciones matemáticas y rítmicas
class cr {
  // BASE 62 -------------------------------------------------------------
  // Codifica un número entero a base62 usando caracteres alfanuméricos
  static base62encode(integer) {
    const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var arrayOfChars = chars.split("");
    if (integer === 0) {return '0';}
    var s = '';
    while (integer > 0) {
      s = arrayOfChars[integer % 62] + s;
      integer = Math.floor(integer/62);
    }
    return s;
  }
  // Decodifica una cadena base62 a un número entero
  static base62decode(base62String) {
    const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var arrayOfChars = chars.split("");
    var val = 0, base62Chars = base62String.split("").reverse();
    base62Chars.forEach(function(character, index){
      val += arrayOfChars.indexOf(character) * Math.pow(62, index);
    });
    return val;
  }
  // Expande una clave base62 a su representación numérica
  static base62expand(clave) { // a2d => 10_2_13
    clave = String(clave).split('.');
    var silencio=''; //inicial
    if(clave[0].charAt(0)==='-'){
      silencio='-';
      clave[0]=clave[0].replace(/^\-+/,"");
    }
    clave[1] = clave[1].split('');
    for (var i = 0; i < clave[1].length; i++) {
      clave[1][i]=this.base62decode(clave[1][i]);
    }
    clave[1] = clave[1].join('_');
    return silencio+clave.join('.');
  }
  // Contrae una representación numérica a su forma base62
  static base62contract(clave) { // 10_2_13 => a2d 
    clave = String(clave).split('.');
    var silencio=''; //inicial
    if(clave[0].charAt(0)==='-'){
      silencio='-';
      clave[0]=clave[0].replace(/^\-+/,"");
    }
    clave[1] = clave[1].split('_');
    for (var i = 0; i < clave[1].length; i++) {
      clave[1][i]=this.base62encode(clave[1][i]);
    }
    clave[1] = clave[1].join('');
    return silencio+clave.join('.');
  }
  
  // PARSER --------------------------------------------------------------
  // Limpia un array eliminando elementos vacíos
  static clean(a) {
    for(var i = 0; i < a.length; i++) {
      if(a[i] === "") {
        a.splice(i, 1);
      }
    }
    return a;
  }
  // Convierte una expresión infix a postfix (notación polaca inversa)
  static infixToPostfix(infix) {
    var outputQueue = "";
    var operatorStack = [];
    var operators = {
      // "^": {
      // 	precedence: 4,
      // 	associativity: "Right"
      // },
      "*": {
        precedence: 4,
        associativity: "Left"
      },
      "/": {
        precedence: 3,
        associativity: "Left"
      },
      "+": {
        precedence: 2,
        associativity: "Left"
      },
      // "-": {
      // 	precedence: 2,
      // 	associativity: "Left"
      // }
    };
    infix = infix.replace(/\s+/g, "");
    // infix = this.clean(infix.split(/([\+\-\*\/\^\(\)])/));
    infix = this.clean(infix.split(/([\+\*\/\(\)])/));
    for(var i = 0; i < infix.length; i++) {
      var token = infix[i];
      // if("^*/+-".indexOf(token) !== -1) {
      if("*/+".indexOf(token) !== -1) {
        var o1 = token;
        var o2 = operatorStack[operatorStack.length - 1];
        // while("^*/+-".indexOf(o2) !== -1 && ((operators[o1].associativity === "Left" && operators[o1].precedence <= operators[o2].precedence) || (operators[o1].associativity === "Right" && operators[o1].precedence < operators[o2].precedence))) {
        while("*/+".indexOf(o2) !== -1 && ((operators[o1].associativity === "Left" && operators[o1].precedence <= operators[o2].precedence) || (operators[o1].associativity === "Right" && operators[o1].precedence < operators[o2].precedence))) {
          outputQueue += operatorStack.pop() + " ";
          o2 = operatorStack[operatorStack.length - 1];
        }
        operatorStack.push(o1);
      } else if(token === "(") {
        operatorStack.push(token);
      } else if(token === ")") {
        while(operatorStack[operatorStack.length - 1] !== "(") {
          outputQueue += operatorStack.pop() + " ";
        }
        operatorStack.pop();
      } else {
        outputQueue += token + " ";
      }
    }
    while(operatorStack.length > 0) {
      outputQueue += operatorStack.pop() + " ";
    }
    return outputQueue;
  }
  // Resuelve una expresión en notación postfix
  static solvePostfix(postfix) {
    var resultStack = [];
    postfix = postfix.trim().split(" ");
    // if(verbose) console.log('postfix:',postfix);
    for(var i = 0; i < postfix.length; i++) {
      if(postfix[i] === "") {
        continue;
        // } else if("^/*+-".indexOf(postfix[i]) !== -1) {
      } else if("/*+".indexOf(postfix[i]) !== -1) {
        const a = resultStack.pop();
        const b = resultStack.pop();
        const c = this.operar(a,b,postfix[i]);
        resultStack.push(c);
      } else {
        resultStack.push(postfix[i]);
      }
    }
    if(resultStack.length > 1) {
      return "error";
    } else {
      return resultStack.pop();
    }
  }
  // Verifica si una cadena es una clave válida
  static esClave(s) {
    s = String(s);
    if("*/+".indexOf(s) !== -1)return false;
    else {
      s=s.split(".");
      if(s.length===1)return false;
      else return true;
    }
  }
  // Compara dos claves para ordenamiento
  static compareClaves(a, b) {
    a=String(a).split('.');
    a=parseInt(a[0]);
    b=String(b).split('.');
    b=parseInt(b[0]);
    return b-a;
  }
  // Parsea una expresión matemática y la procesa
  static parse(expression,reducir=false,asarray=false) {
    var infix = this.filtrar(expression); // filtrar
    const postfix = this.infixToPostfix(infix);
    // con(postfix);
    var pf = postfix.split(' ');
    pf = pf.filter(this.esClave);
    for (var i = 0; i < pf.length; i++) {
      pf[i]=this.completarClave(pf[i]);
      pf[i] = this.clave2binary(pf[i]);
    }
    pf.sort(this.compareClaves);
    // con(pf.join('|'),true);
    return [this.completarClave(this.solvePostfix(postfix),asarray,reducir),pf];
  }

  // Parsea una expresión matemática y la procesa
  static fullParse(expression, reducir=false, asarray=false) {
    var infix = this.filtrar(expression); // filtrar
    const postfix = this.infixToPostfix(infix);
    
    // Extract all claves from the postfix expression
    var pf = postfix.split(' ');
    pf = pf.filter(this.esClave);
    
    // Process each clave
    const originalClaves = [];
    const binaryClaves = [];
    const expandedClaves = [];
    
    for (var i = 0; i < pf.length; i++) {
      if(pf[i].indexOf('_')!==-1) {
        // Esto permite leer claves en formato con guión bajo _
        pf[i] = this.base62contract(pf[i]); 
      }
      const original = pf[i];
      const completed = this.completarClave(original);
      const binary = this.clave2binary(completed);
      
      originalClaves.push(original);
      binaryClaves.push(binary);
      expandedClaves.push(completed);
    }
    
    // Sort claves by length
    const sortedClaves = [...expandedClaves].sort(this.compareClaves);
    
    // Calculate the result
    const result = this.solvePostfix(postfix);
    const completedResult = this.completarClave(result, asarray, reducir);
    
    // Create binary representation of the result
    const binaryResult = this.clave2binary(this.completarClave(result));
    
    // Extract operations from the expression
    const operations = infix.match(/[\+\*\/]/g) || [];
		// Check if all operations are the same
		function areAllOperationsSame(operations) {
			if (!operations || operations.length <= 1) return true;
			const firstOp = operations[0];
			return operations.every(op => op === firstOp);
		}
    const allSame = areAllOperationsSame(operations);
    let operation = '';
    if(allSame) {
      // Solo hay una operación o son todas la misma operación
      const tipo = operations.length > 0 ? operations[0] : "none";
      if(tipo=="+") {
        // Operación: Concatenación: +
        if(verbose) console.log("Concatenación");
        operation = '+';
      } else if(tipo=="/") {
        // Operación: Superposición: /
        if(verbose) console.log("Superposición");
        operation = '/';
      } else {
        // No hay operaciones
        if(verbose) console.log("Sin operaciones");
        operation = '';
      }
    } else {
      // Operaciones combinadas: + /
      if(verbose) console.log("Operaciones múltiples");
      operation = 'm';
    }
    
    // Return rich information
    return {
      result: completedResult,
      binaryResult: binaryResult,
      originalExpression: expression,
      filteredExpression: infix,
      postfixExpression: postfix,
      operations: operations,
      operation: operation,
      inputClaves: {
        original: originalClaves,
        completed: expandedClaves,
        binary: binaryClaves,
        sorted: sortedClaves
      },
      // For backward compatibility
      legacy: [completedResult, binaryClaves]
    };
  }
  
  // OPERACIONES ---------------------------------------------------------
  // Calcula el mínimo común múltiplo de dos números
  static mcm(a,b) {
    var r = a * b;
    var m = Math.max(a,b);
    var n = Math.min(a,b);
    m = m/n;
    if (Number.isInteger(m)) r = r/n;
    return r;
  }
  // Calcula el máximo común divisor de dos números
  static mcd(a, b) {
    if ((typeof a !== 'number') || (typeof b !== 'number')) 
      return false;
    a = Math.abs(a);
    b = Math.abs(b);
    while(b) {
      var t = b;
      b = a % b;
      a = t;
    }
    return a;
  }
  // Calcula el máximo común divisor de una lista de números
  static multimcd(lista) {
    if (toString.call(lista) !== "[object Array]")  
      return  false;  
    var len, a, b;
    len = lista.length;
    if ( !len ) {
      return null;
    }
    a = lista[ 0 ];
    for ( var i = 1; i < len; i++ ) {
      b = lista[ i ];
      a = this.mcd( a, b );
    }
    return a;
  }
  // Convierte un array de números a su representación base62
  static juntar(c) {
    // return c.join('-');//si se quiere leer humano
    for (var i = 0; i < c.length; i++) {
      c[i]=this.base62encode(c[i]);
    }
    return c.join('');
  }
  // Convierte una cadena base62 a un array de números
  static romper(c) {
    c = String(c).split('');
    for (var i = 0; i < c.length; i++) {
      c[i]=this.base62decode(c[i]);
    }
    return c;
  }
  // Completa una clave con su representación completa
  static completarClave(c,asarray=false,reducir=false) {
    c = String(c);
    var silencio=''; //inicial
    if(c.charAt(0)==='-'){
      silencio='-';
      c=c.replace(/^\-+/,"");
    }
    c = c.trim('.').split('.');
    var n = parseInt(c[0]);
    if(c.length==1)c.push(c[0]); // FIX: 7 => 7.7
    c = this.romper(c[1]);
    var s = [];
    var m = 0,i = 0;
    while(m<n) {
      m+=parseInt(c[i]);
      if(m>n)s.push(parseInt(c[i])-(m-n));
      else s.push(parseInt(c[i]));
      i++;
      if(i>=c.length)i=0;
    }
    // Reducir a mínima expresión
    if(reducir){
      var divs=[];
      for (var i = 0; i < s.length; i++) {
        const d = this.mcd(n,s[i]);
        if(d===1){
          reducir=false;
          break;
        } else {
          if(divs.indexOf(d)===-1)divs.push(d);
        }
      }
      if(reducir){
        // if(verbose) console.log("Reducir:",n,s);
        reducir = this.multimcd(divs);
        if(reducir>1){
          n=n/reducir;
          for (var i = 0; i < s.length; i++) {
            s[i]=s[i]/reducir;
          }
        }
      }
    }
    
    if(asarray)return [n,s,(silencio!=='' ? 1:0)]; // array
    else return silencio+n+'.'+this.juntar(s);
  }
  // New abbreviation method
  static abreviarClave(clave) {
    const [total, sequence] = this.completarClave(clave, true);
    const original = sequence.join('');
    
    // Find repeating pattern
    for (let patternLength = 1; patternLength <= sequence.length; patternLength++) {
      const pattern = sequence.slice(0, patternLength);
      let reconstructed = [];
      let sum = 0;
      let index = 0;
      
      while (sum < total) {
        const current = pattern[index % patternLength];
        const remaining = total - sum;
        
        if (sum + current > total) {
          reconstructed.push(remaining);
          sum += remaining;
        } else {
          reconstructed.push(current);
          sum += current;
        }
        index++;
      }
      
      // Check if reconstruction matches original
      if (reconstructed.join('') === original) {
        const r = `${total}.${this.juntar(pattern)}`;
        // Check if abbreviation is significantly shorter
        if (r.length < clave.length-1) {
          return r;
        }
      }
    }
    
    return clave; // Return original if no pattern found
  }
  // Multiplica un array de números por un factor
  static multiplo(m,a) {
    // if(verbose) console.log('antes:',a);
    var x = 0;
    var z = a[0]*m; // No puede empezar con cero!!
    for (var i = 0; i < a.length; i++) {
      x+=parseInt(a[i])*m;
      a[i]=x;
    }
    // if(verbose) console.log('despu:',a);
    return a;
  }
  // Convierte una representación binaria a clave
  static binary2clave(b) {
    var x = 1,c = [];
    for (var i = b.length - 1; i >= 0; i--) {
      if(b[i]==0)x++;
      else{
        c.push(x);
        x = 1;
      }
    }
    return c.reverse();
  }
  // Convierte una clave a su representación binaria
  static clave2binary(c) {
    c = String(c).split('.');
    if(c.length===1)c.push(c[0]); // 7 => 7.7
    c[1]=c[1].split('');
    var b = [];
    for (var i = 0; i < c[1].length; i++) {
      b.push(1);
      for (var j = 1; j < c[1][i]; j++) {
        b.push(0);
      }
    }
    return c[0]+"."+b.join('');
  }
  // Conjuga dos claves rítmicas
  static superponer(a,b,asarray=false) {
    a = this.completarClave(a,true);
    b = this.completarClave(b,true);
    a[0]=parseInt(a[0]);
    b[0]=parseInt(b[0]);
    const n = this.mcm(a[0],b[0]);
    const na = this.multiplo(n/a[0],a[1]);
    const nb = this.multiplo((n/b[0]),b[1]);
    // Patrón binario
    var bin=[1];// no puede empezar en cero
    var ja=0,jb=0;
    var dopush=false;
    for (var i = 1; i < n; i++) {
      // no puede empezar en cero
      dopush=false;
      if(i==na[ja]){ // El pulso i está en la clave a
        dopush=true;
        ja++;
      }
      if(i==nb[jb]){ // El pulso i está en la clave b
        dopush=true;
        jb++;
      }
      if(dopush)bin.push(1);
      else bin.push(0);
    }
    const c = this.binary2clave(bin);
    if(asarray)return [n,c];
    else return n+'.'+this.juntar(c);
  }
  // Apila dos claves rítmicas
  static concatenar(a,b,asarray=false) {
    a = this.completarClave(a,true);
    b = this.completarClave(b,true);
    const n = parseInt(a[0])+parseInt(b[0]);
    if(asarray)return [n,a.concat(b)];
    else return n+'.'+this.juntar(a[1])+this.juntar(b[1]);
  }
  
  // Multiplica la clave a por la longitud de x 
  //  creando un patrón cíclico que repite a por x veces
  static cruzar(a,x,asarray=false) {
    a = this.completarClave(a,true);
    x = x.split('.');
    x=parseInt(x[0]);
    const n = parseInt(a[0])*x;
    var y=[];
    for (var j = 0; j < x; j++) {
      for (var i = 0; i < a[1].length; i++) {
        y.push(a[1][i]);
      }
    }
    if(asarray)return [n,y];
    else return n+'.'+this.juntar(y);
  }
  // Realiza operaciones básicas entre claves rítmicas
  static operar(a,b,op='+') {
    if(op==='/') {
      return this.superponer(a,b);
    } else if(op==='+') {
      return this.concatenar(b,a);//Ojo con el orden ya invertido!
    } else if(op==='*') {
      return this.cruzar(b,a);//Ojo con el orden ya invertido! a=x
    } else {
      if(verbose) console.log("ERROR: Operacion desconocida: ",op);
      if(verbose) console.log("a: ",a);
      if(verbose) console.log("b: ",b);
    }
  }
  // Filtra una cadena permitiendo solo caracteres válidos
  static filtrar(c) {
    return c.replace(/[^a-zA-Z0-9\.+\-*\/()]/gi, '');
  }


  
  // ----------------------------------------------------
  // NUEVAS FUNCIONES DE ia -----------------------------
  
  // Modulo operations
  static createModularPattern(base, modulus, type = 'linear', params = {}) {
    const sequence = [];
    
    for(let i = 0; i < modulus; i++) {
      let term;
      
      switch(type) {
        case 'arithmetic':
        term = base + params.step * i;
        break;
        
        case 'geometric':
        term = base * Math.pow(params.ratio, i);
        break;
        
        case 'fibonacci':
        term = this.fibonacci(i);
        break;
        
        default: // lineal
        term = base * i;
      }
      
      sequence.push((term % modulus) + 1);
    }
    
    const total = sequence.reduce((a, b) => a + b, 0);
    return this.completarClave(`${total}.${sequence.join('')}`);
  }
  
  static fibonacci(n) {
    if(n <= 1) return 1;
    return this.fibonacci(n - 1) + this.fibonacci(n - 2);
  }
  
  // Core Number Theory Library
  static primeFactors(n) {
    let factors = {}; 
    let i = 2;
    while(i <= n) {
      while(n % i === 0) {
        factors[i] = (factors[i] || 0) + 1;
        n /= i;
      }
      i++;
    }
    return factors;
  }
  
  static isRhythmicIrreducible(a, b) {
    return this.mcd(a, b) === 1;
  }
  
  // Associativity example: (A + B) + C = A + (B + C)
  static testAssociativity(a, b, c) {
    const left = this.operar(this.operar(a,b,'+'),c,'+');
    const right = this.operar(a,this.operar(b,c,'+'),'+');
    return left === right;
  }
  
  // Identity element (empty rhythm)
  static identityElement() {
    return '0.0'; // Zero-length pattern
  }
  
  // Inverse element concept (pattern reversal)
  static invertirClave(c) {
    const [n, s] = this.completarClave(c,true);
    return n+'.'+this.juntar(s.reverse());
  }
  
  // Subgroup detection
  static isSubgroup(set, operation='+') {
    // Verify closure and existence of inverses
    for(let a of set) {
      if(!set.includes(this.invertirClave(a))) return false;
      for(let b of set) {
        const result = this.operar(a,b,operation);
        if(!set.includes(result)) return false;
      }
    }
    return true;
  }
  // ----------------------------------------------------
  // Symmetry detection functions
  // Check for palindrome symmetry
  static isPalindrome(c) {
    const inverted = this.invertirClave(c);
    return this.compararClaves(c, inverted);
  }
  
  // Detect rotational symmetry
  static hasRotationalSymmetry(c, rotations) {
    const original = this.completarClave(c, true)[1];
    for(let i = 1; i <= rotations; i++) {
      const rotated = this.rotarClave(c, i);
      if(this.compararClaves(c, rotated)) return true;
    }
    return false;
  }
  
  // Find all symmetric transformations within a group
  static findSymmetries(patternSet) {
    const symmetries = [];
    for(const p of patternSet) {
      if(this.isPalindrome(p)) symmetries.push({type: 'palindrome', pattern: p});
      if(this.hasRotationalSymmetry(p, 2)) symmetries.push({type: 'rotational', pattern: p});
      // Add reflection symmetry checks using conjugation
      const conjugate = this.superponer(p, this.identityElement());
      if(this.compararClaves(p, conjugate)) {
        symmetries.push({type: 'reflection', pattern: p});
      }
    }
    return symmetries;
  }
  
  // Helper method to compare rhythms
  static compararClaves(a, b) {
    return this.completarClave(a) === this.completarClave(b);
  }
  
  // Rotate rhythm by n positions
  static rotarClave(c, n) {
    let [total, sequence] = this.completarClave(c, true);
    n = n % sequence.length;
    const rotated = sequence.slice(-n).concat(sequence.slice(0, -n));
    return total + '.' + this.juntar(rotated);
  }
  // Automated composition functions
  // Generate composition using subgroup operations
  static generateComposition(basePattern, operationSequence) {
    let current = this.completarClave(basePattern);
    const composition = [current];
    
    for(const op of operationSequence) {
      current = this.operar(current, op.pattern, op.operation);
      composition.push(current);
    }
    
    return composition;
  }
  
  // Automatically generate rhythmic variations using cosets
  static generateVariations(basePattern, subgroupOps) {
    const variations = [];
    const baseGroup = this.primeFactors(parseInt(basePattern.split('.')[0]));
    
    subgroupOps.forEach(op => {
      const variation = this.operar(basePattern, op, '*');
      if(this.isRhythmicIrreducible(
        parseInt(variation.split('.')[0]), 
        baseGroup[0]
      )) {
        variations.push(variation);
      }
    });
    
    return variations;
  }
  
  // Create fractal rhythm using cyclic subgroup generation
  static createFractalRhythm(base, iterations) {
    let rhythm = this.completarClave(base);
    for(let i = 0; i < iterations; i++) {
      rhythm = this.operar(rhythm, rhythm, '/');
    }
    return rhythm;
  }
  
  // Generate rhythm permutations using symmetric group operations
  static permuteRhythm(pattern, permutationOrder) {
    const [total, sequence] = this.completarClave(pattern, true);
    const permuted = permutationOrder.map(index => sequence[index]);
    return total + '.' + this.juntar(permuted);
  }
  
  // culturally informed rhythm generation using group operations
  // Cultural rhythm templates
  static culturalPatterns = {
    'afroCuban': {
      'son': '16.33424',
      'rumba': '16.24334',
      'bembe': '12.332322'
    },
    'indianTala': {
      'jhaptal': '10.223222',
      'teental': '16.4444',
      'rupak': '7.322'
    },
    'westAfrican': {
      'gahu': '12.222333',
      'agbadza': '12.333222',
      'kpanlogo': '16.444322'
    },
    'edm': {
      'fourToFloor': '8.2222',
      'dubstep': '16.31131131'
    }
  };
  
  // Generate culturally constrained variations
  static generateCulturalVariation(basePattern, culture) {
    const culturalSet = this.culturalPatterns[culture];
    const validOperations = Object.values(culturalSet);
    
    return this.operar(
      basePattern,
      validOperations[Math.floor(Math.random() * validOperations.length)],
      this.randomCulturalOperation(culture)
    );
  }
  
  // Culturally appropriate operations
  static randomCulturalOperation(culture) {
    const ops = {
      afroCuban: ['+', '/'],
      indianTala: ['*', '/'],
      westAfrican: ['+', '*'],
      edm: ['/']
    };
    return ops[culture][Math.floor(Math.random() * ops[culture].length)];
  }
  
  // Validate cultural rhythmic integrity
  static validateCulturalRhythm(pattern, culture) {
    const referenceGroup = Object.values(this.culturalPatterns[culture]);
    return this.isSubgroup([...referenceGroup, pattern]);
  }
  
}