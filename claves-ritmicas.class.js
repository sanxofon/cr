// Clase principal que contiene métodos para operaciones matemáticas y rítmicas
class cr {

	// GENERAL CLAVE READ METHOD
	static readClaveSimple(clave) {
		clave = String(clave);
		const claveParsed = clave.match(/^(-?)([1-9][0-9]*)\.(\[([1-9][0-9]*)\])?([1-9A-Za-z][0-9A-Za-z_]*)?/);
		if(claveParsed==null) {
			throw new Error('Clave inválida en readClaveSimple:'+clave);
		}
		const longitud = parseInt(claveParsed[2]);
		if (claveParsed[5]==undefined) claveParsed[5] = longitud+''; // FIX: 7 => 7.7
		let leadingZeroes = 0;
		if (claveParsed[4]!=undefined)leadingZeroes=parseInt(claveParsed[4]); // leading zeroes
		let silencio = claveParsed[1];
		let s = [];
		if(claveParsed[5].includes('_')){
			s = claveParsed[5].split('_');
		} else {
			s = this.base62expand(claveParsed[5]).split('_');
		}
		return {
			'longitud': longitud, 	// Longitud total
			'golpes': s, 			// Numéricos
			'ceros': leadingZeroes, // 0 || n
			'silencio': silencio 	// '-' || ''
		};
	}

	// BASE 62 -------------------------------------------------------------
	// Codifica un número entero a base62 usando caracteres alfanuméricos
	static base62encode(integer) {
		const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
		var arrayOfChars = chars.split('');
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
		const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
		var arrayOfChars = chars.split('');
		var val = 0, base62Chars = base62String.split('').reverse();
		base62Chars.forEach(function(character, index){
			val += arrayOfChars.indexOf(character) * Math.pow(62, index);
		});
		return val;
	}
	// Expande una clave base62 a su representación numérica
	static base62expand(golpes) { // a2d => 10_2_13
		golpes = String(golpes).split('');
		for (var i = 0; i < golpes.length; i++) {
			golpes[i]=this.base62decode(golpes[i]);
		}
		return golpes.join('_');
	}
	// Contrae una representación numérica a su forma base62
	static base62contract(clave) { // 10_2_13 => a2d
		const claveParsed = this.readClaveSimple(clave); //longitud, golpes, ceros, silencio

		const longitud = claveParsed.longitud;
		const leadingZeroes = claveParsed.ceros;
		const silencio = claveParsed.silencio;
		clave = [longitud, claveParsed.golpes];

		for (var i = 0; i < clave[1].length; i++) {
			clave[1][i]=this.base62encode(clave[1][i]);
		}
		clave[1] = clave[1].join('');
		if(leadingZeroes>0) return silencio+longitud+'.'+'['+leadingZeroes+']'+clave[1];
		else return silencio+longitud+'.'+clave[1];
	}
	
	// PARSER --------------------------------------------------------------
	// Limpia un array eliminando elementos vacíos
	static clean(a) {
		for(var i = 0; i < a.length; i++) {
			if(a[i] === '') {
				a.splice(i, 1);
			}
		}
		return a;
	}
	// Convierte una expresión infix a postfix (notación polaca inversa)
	static infixToPostfix(infix) {
		var outputQueue = '';
		var operatorStack = [];
		var operators = {
			// '^': {
			// 	precedence: 4,
			// 	associativity: 'Right'
			// },
			'*': {
				precedence: 4,
				associativity: 'Left'
			},
			'/': {
				precedence: 3,
				associativity: 'Left'
			},
			'|': {
				precedence: 3,
				associativity: 'Left'
			},
			'+': {
				precedence: 2,
				associativity: 'Left'
			},
			// '-': {
			// 	precedence: 2,
			// 	associativity: 'Left'
			// }
		};
		infix = infix.replace(/\s+/g, '');

		infix = this.clean(infix.split(/([\+\*\/\|\(\)])/));
		
		for(var i = 0; i < infix.length; i++) {
			var token = infix[i];
			if('*/|+'.indexOf(token) !== -1) {
				var o1 = token;
				var o2 = operatorStack[operatorStack.length - 1];
				while('*/|+'.indexOf(o2) !== -1 && ((operators[o1].associativity === 'Left' && operators[o1].precedence <= operators[o2].precedence) || (operators[o1].associativity === 'Right' && operators[o1].precedence < operators[o2].precedence))) {
					outputQueue += operatorStack.pop() + ' ';
					o2 = operatorStack[operatorStack.length - 1];
				}
				operatorStack.push(o1);
			} else if(token === '(') {
				operatorStack.push(token);
			} else if(token === ')') {
				while(operatorStack[operatorStack.length - 1] !== '(') {
					outputQueue += operatorStack.pop() + ' ';
				}
				operatorStack.pop();
			} else {
				outputQueue += token + ' ';
			}
		}
		while(operatorStack.length > 0) {
			outputQueue += operatorStack.pop() + ' ';
		}

		return outputQueue;
	}
	// Resuelve una expresión en notación postfix
	static solvePostfix(postfix) {
		var resultStack = [];
		postfix = postfix.trim().split(' ');
		if(verbose)console.log('postfix:',postfix);
		for(var i = 0; i < postfix.length; i++) {
			if(postfix[i] === '') {
				continue;
				// } else if('^/|*+-'.indexOf(postfix[i]) !== -1) {
			} else if('/|*+'.indexOf(postfix[i]) !== -1) {
				const a = resultStack.pop();
				const b = resultStack.pop();
				const c = this.operar(a,b,postfix[i]);
				resultStack.push(c);
			} else {
				resultStack.push(postfix[i]);
			}
		}
		if(resultStack.length > 1) {
			return 'error';
		} else {
			return resultStack.pop();
		}
	}
	// Verifica si una cadena es una clave válida
	static esClave(s) {
		s = String(s);
		if('*/|+'.indexOf(s) !== -1)return false;
		else {
			s=s.split('.');
			if(s.length===1)return false;
			else return true;
		}
	}
	// Compara dos claves para ordenamiento
	static compareClaves(a, b) {
		a=String(a).split('.');
		a=Math.abs(parseInt(a[0]));
		b=String(b).split('.');
		b=Math.abs(parseInt(b[0]));
		return b-a;
	}
	// Compara dos enteros para ordenamiento
	static compareInt(a, b) {
		return a-b;
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
		const operations = infix.match(/[\+\*\/\|]/g) || [];
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
			const tipo = operations.length > 0 ? operations[0] : 'none';
			if(tipo=='+') {
				// Operación: Concatenación: +
				if(verbose)console.log('Concatenación');
				operation = '+';
			} else if(tipo=='/') {
				// Operación: Superposición: /
				if(verbose)console.log('Superposición');
				operation = '/';
			} else if(tipo=='|') {
				// Operación: Superposición XOR: |
				if(verbose)console.log('Superposición XOR');
				operation = '|';
			} else {
				// No hay operaciones
				if(verbose)console.log('Sin operaciones');
				operation = '';
			}
		} else {
			// Operaciones combinadas: + /
			if(verbose)console.log('Operaciones múltiples');
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
	static multimcd(lista) {
		// Calcula el máximo común divisor de una lista de números
		if (toString.call(lista) !== '[object Array]') return	false;	
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
	static juntar(c) {
		// Convierte un array de números a su representación base62
		// return c.join('-');//si se quiere leer humano
		for (var i = 0; i < c.length; i++) {
			c[i]=this.base62encode(c[i]);
		}
		return c.join('');
	}
	static romper(c) {
		// Convierte una cadena base62 a un array de números
		c = String(c).split('');
		for (var i = 0; i < c.length; i++) {
			c[i]=this.base62decode(c[i]);
		}
		return c;
	}
	// Completa una clave con su representación completa
	static completarClave(c,asarray=false,reducir=false) {
		const claveParsed = this.readClaveSimple(c);
		let n = claveParsed.longitud;
		const leadingZeroes = claveParsed.ceros;
		const silencio = claveParsed.silencio;
		c = claveParsed.golpes;
		
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
				if(verbose)console.log('Reducir:',n,s);
				reducir = this.multimcd(divs);
				if(reducir>1){
					n=n/reducir;
					for (var i = 0; i < s.length; i++) {
						s[i]=s[i]/reducir;
					}
				}
			}
		}
		if(leadingZeroes>0 && leadingZeroes>=s[s.length-1]){
			// Revisa que leadingZeroes sea razonable
			console.log('Demasiados CEROS INICIALES para el ÚLTIMO GOLPE:',leadingZeroes,'>=',s[s.length-1]);
			
		}
		
		if(asarray)return [n,s,silencio,leadingZeroes]; // array
		else if(leadingZeroes>0)return silencio+n+'.'+'['+leadingZeroes+']'+this.juntar(s);
		else return silencio+n+'.'+this.juntar(s);
	}
	// New abbreviation method
	static abreviarClave(clave) {
		const [total, sequence, silencio, leadingZeroes] = this.completarClave(clave, true);
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
				if(leadingZeroes>0) {
					const r = `${total}.[${leadingZeroes}]${this.juntar(pattern)}`;
				} else {
					const r = `${total}.${this.juntar(pattern)}`;
				}
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
		if(verbose)console.log('antes:',a);
		var x = 0;
		var z = a[0]*m; // No puede empezar con cero!!
		for (var i = 0; i < a.length; i++) {
			x+=parseInt(a[i])*m;
			a[i]=x;
		}
		if(verbose)console.log('despu:',a);
		return a;
	}
	// Convierte una representación binaria a clave
	static binary2clave(b) {
		// Count leading zeroes
		var leadingZeroes = 0;
		while (parseInt(b[leadingZeroes]) === 0) {
			leadingZeroes++;
		}
		// Remove leading zeroes
		b = b.slice(leadingZeroes);
		// Add zeroes to the end
		for (let i = 0; i < leadingZeroes; i++) {
			b.push(0);
		}

		var x = 1,c = [];
		for (var i = b.length - 1; i >= 0; i--) {
			if(b[i]==0)x++;
			else{
				c.push(x);
				x = 1;
			}
		}
		// Devuelve la clave como array y la cantidad de leading zeroes
		return [c.reverse(),leadingZeroes];
	}
	// Convierte una clave a su representación binaria
	static clave2binary(c) {
		let cc = this.completarClave(c,true);
		var b = [];
		const leadingZeroes = cc[3];
		if (leadingZeroes>0) {
			cc[1][cc[1].length-1]-=leadingZeroes;
			for (var i = 0; i < leadingZeroes; i++) {
				b.push(0);
			}
		}
		for (var i = 0; i < cc[1].length; i++) {
			b.push(1);
			for (var j = 1; j < cc[1][i]; j++) {
				b.push(0);
			}
		}
		return cc[2]+cc[0]+'.'+b.join('');
	}
	// Conjuga dos claves rítmicas
	static superponer(a,b,op='or',asarray=false) {
		a = this.clave2binary(a).split('.');
		b = this.clave2binary(b).split('.');
		a[0]=Math.abs(parseInt(a[0]));
		b[0]=Math.abs(parseInt(b[0]));
		a[1]=a[1].split('').map(Number);
		b[1]=b[1].split('').map(Number);
		const n = this.mcm(a[0],b[0]);
		// Patrón binario
		var bin=[];
		var ja=0,jb=0;
		var na=n/a[0];
		var nb=n/b[0];
		var dopush=false;
		var isxor = [0,0];
		for (var i = 0; i < n; i++) {
			dopush=false;
			isxor = [0,0];
			if(i%na==0){ // Es pulso de A
				if(a[1][ja]==1){
					dopush=true;
					isxor[0]=1;
				}
				ja++;
			}
			if(i%nb==0){ // Es pulso de B
				if(b[1][jb]==1){
					dopush=true;
					isxor[1]=1;
				}
				jb++;
			}
			if(op=='xor' && isxor[0]==1 && isxor[1]==1){
				dopush=false;
			}
			if(dopush)bin.push(1);
			else bin.push(0);
		}

		// Hasta aquí la variable 'bin' contiene el patrón binario
		if(verbose)console.log('bin:',bin);

		const c = this.binary2clave(bin);
		if(asarray)return [n,c[0],c[1]];
		else if(c[1]>0)return n+'.'+'['+c[1]+']'+this.juntar(c[0]);
		else return n+'.'+this.juntar(c[0]);
	}
	// Concatena dos claves rítmicas uda despúes de la otra
	static concatenar(a,b,asarray=false) {
		a = this.completarClave(a,true);
		b = this.completarClave(b,true);
		const n = a[0]+b[0];
		let leadingZeroes = 0;
		const l = [a[1].length-1,b[1].length-1];
		if(a[3]>0) {
			// Hay leadingZeroes en la clave A
			leadingZeroes = a[3]; // Solo agregamos a la clave resultante
			a[1][l[0]]-=a[3]; // Quitamos los ceros al último golpe de A
			b[1][l[1]]+=a[3]; // Agregamos los ceros al primer golpe de B
		}
		if(b[3]>0) {
			// Hay leadingZeroes en la clave B
			a[1][l[0]]+=a[3]; // Agregamos los ceros al último golpe de A
			b[1][l[1]]-=a[3]; // QUitamos los ceros al último golpe de B
		}
		if(asarray)return [n,a[1].concat(b[1]),leadingZeroes];
		else if (leadingZeroes>0) return n+'.'+'['+leadingZeroes+']'+this.juntar(a[1])+this.juntar(b[1]);
		else return n+'.'+this.juntar(a[1])+this.juntar(b[1]);
	}
	
	// Multiplica la clave a por la longitud de x 
	//	creando un patrón cíclico que repite a por x veces
	static cruzar(a,x,asarray=false) {
		a = this.completarClave(a,true);
		x = x.split('.');
		x=Math.abs(parseInt(x[0]));
		const n = parseInt(a[0])*x;
		var y=[];
		for (var j = 0; j < x; j++) {
			for (var i = 0; i < a[1].length; i++) {
				y.push(a[1][i]);
			}
		}
		const leadingZeroes = parseInt(a[3]);
		if(asarray)return [n,y,leadingZeroes];
		else if (leadingZeroes>0) return n+'.'+'['+leadingZeroes+']'+this.juntar(y);
		else  return n+'.'+this.juntar(y);
	}
	static fixClaveSimple(clave) {
		// Corrige una clave rítmica
		clave = String(clave);
		const claveParsed = clave.match(/^(-)?([1-9][0-9]*)(\.)?(\[([1-9][0-9]*)\])?([0-9A-Za-z_]*)?/);
		if(claveParsed==null) {
			throw new Error('Clave inválida en fixCLave:'+clave);
		}
		let silencio = claveParsed[1] ? '-':'';
		let longitud = parseInt(claveParsed[2]) || 0;
		let dot = claveParsed[3] ? 1:0;
		let leadingZeroes = parseInt(claveParsed[5]) || 0;
		let golpes = claveParsed[6] || '';
		if(longitud<=0) {
			throw new Error('Clave inválida en fixCLave (sin longitud):'+clave);
		}
		if(dot==0 || golpes=='') {
			golpes = ['0'];
			leadingZeroes = 0;
		} else {
			if(golpes.includes('_')){
				golpes = golpes.split('_').map(parseInt);
			} else {
				golpes = this.romper(golpes);
			}
			if(leadingZeroes>0 && leadingZeroes>=golpes[golpes.length-1]) {
				// Revisa que leadingZeroes sea razonable
				console.log('Demasiados CEROS INICIALES para el ÚLTIMO GOLPE:',leadingZeroes,'>=',golpes[golpes.length-1]);
				leadingZeroes = golpes[golpes.length-1]-1;
			}
		}
		const fixedClave = silencio + longitud + '.' + (leadingZeroes ? '[' + leadingZeroes + ']' : '') + golpes.join('_');
		return fixedClave;
	}
	// Realiza operaciones básicas entre claves rítmicas
	static operar(a,b,op='+') {
		a = this.fixClaveSimple(a);
		b = this.fixClaveSimple(b);
		if(verbose)console.log('operar: a,b -> op',a,b,' -> ',op);
		if(op==='/' || op==='|' ) {
			if(a[0]=='-') return b;
			else if(b[0]=='-') return a;
			else {
				if(op==='|')return this.superponer(a,b,'xor'); // version XOR
				else return this.superponer(a,b);	// versión normal OR
			}
		} else if(op==='+') {
			if(a[0]=='-') return b;
			else if(b[0]=='-') return a;
			else return this.concatenar(b,a);//Ojo con el orden ya invertido!
		} else if(op==='*') {
			return this.cruzar(b,a);//Ojo con el orden ya invertido! a=x
		} else {
			if(verbose)console.log('ERROR: Operacion desconocida: ',op);
			if(verbose)console.log('a: ',a);
			if(verbose)console.log('b: ',b);
		}
	}
	// Filtra una cadena permitiendo solo caracteres válidos
	static filtrar(c) {
		return c.replace(/[^a-zA-Z0-9\.+\-*\/|()\[\]]/gi, '');
	}
	
}