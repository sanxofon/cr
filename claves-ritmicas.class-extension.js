// Extensiones para la clase cr
// Este archivo debe cargarse después de claves-ritmicas.class.js

// Verificamos que la clase cr exista antes de extenderla
if (typeof cr !== 'undefined') {	
	// ----------------------------------------------------
	// NUEVAS FUNCIONES DE ia -----------------------------
	
	// Modulo operations
	cr.createModularPattern = function(base, modulus, type = 'linear', params = {}) {
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
	
	cr.fibonacci = function(n) {
		if(n <= 1) return 1;
		return this.fibonacci(n - 1) + this.fibonacci(n - 2);
	}
	
	// Core Number Theory Library
	cr.primeFactors = function(n) {
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
	
	cr.isRhythmicIrreducible = function(a, b) {
		return this.mcd(a, b) === 1;
	}
	
	// Associativity example: (A + B) + C = A + (B + C)
	cr.testAssociativity = function(a, b, c) {
		const left = this.operar(this.operar(a,b,'+'),c,'+');
		const right = this.operar(a,this.operar(b,c,'+'),'+');
		return left === right;
	}
	
	// Identity element (empty rhythm)
	cr.identityElement = function() {
		return '0.0'; // Zero-length pattern
	}
	
	// Inverse element concept (pattern reversal)
	cr.invertirClave = function(c) {
		const [n, s] = this.completarClave(c,true);
		return n+'.'+this.juntar(s.reverse());
	}
	
	// Subgroup detection
	cr.isSubgroup = function(set, operation='+') {
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
	cr.isPalindrome = function(c) {
		const inverted = this.invertirClave(c);
		return this.compararClaves(c, inverted);
	}
	
	// Detect rotational symmetry
	cr.hasRotationalSymmetry = function(c, rotations) {
		const original = this.completarClave(c, true)[1];
		for(let i = 1; i <= rotations; i++) {
			const rotated = this.rotarClave(c, i);
			if(this.compararClaves(c, rotated)) return true;
		}
		return false;
	}
	
	// Find all symmetric transformations within a group
	cr.findSymmetries = function(patternSet) {
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
	cr.compararClaves = function(a, b) {
		return this.completarClave(a) === this.completarClave(b);
	}
	
	// Rotate rhythm by n positions
	cr.rotarClave = function(c, n) {
		let [total, sequence] = this.completarClave(c, true);
		n = n % sequence.length;
		const rotated = sequence.slice(-n).concat(sequence.slice(0, -n));
		return total + '.' + this.juntar(rotated);
	}
	// Automated composition functions
	// Generate composition using subgroup operations
	cr.generateComposition = function(basePattern, operationSequence) {
		let current = this.completarClave(basePattern);
		const composition = [current];
		
		for(const op of operationSequence) {
			current = this.operar(current, op.pattern, op.operation);
			composition.push(current);
		}
		
		return composition;
	}
	
	// Automatically generate rhythmic variations using cosets
	cr.generateVariations = function(basePattern, subgroupOps) {
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
	cr.createFractalRhythm = function(base, iterations) {
		let rhythm = this.completarClave(base);
		for(let i = 0; i < iterations; i++) {
			rhythm = this.operar(rhythm, rhythm, '/');
		}
		return rhythm;
	}
	
	// Generate rhythm permutations using symmetric group operations
	cr.permuteRhythm = function(pattern, permutationOrder) {
		const [total, sequence] = this.completarClave(pattern, true);
		const permuted = permutationOrder.map(index => sequence[index]);
		return total + '.' + this.juntar(permuted);
	}
	
	// culturally informed rhythm generation using group operations
	// Cultural rhythm templates
	cr.culturalPatterns = {
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
	cr.generateCulturalVariation = function(basePattern, culture) {
		const culturalSet = this.culturalPatterns[culture];
		const validOperations = Object.values(culturalSet);
		
		return this.operar(
			basePattern,
			validOperations[Math.floor(Math.random() * validOperations.length)],
			this.randomCulturalOperation(culture)
		);
	}
	
	// Culturally appropriate operations
	cr.randomCulturalOperation = function(culture) {
		const ops = {
			afroCuban: ['+', '/'],
			indianTala: ['*', '/'],
			westAfrican: ['+', '*'],
			edm: ['/']
		};
		return ops[culture][Math.floor(Math.random() * ops[culture].length)];
	}
	
	// Validate cultural rhythmic integrity
	cr.validateCulturalRhythm = function(pattern, culture) {
		const referenceGroup = Object.values(this.culturalPatterns[culture]);
		return this.isSubgroup([...referenceGroup, pattern]);
	}

    
    console.log('Extensiones de cr cargadas correctamente');
} else {
    console.error('Error: La clase cr no está definida. Asegúrate de cargar claves-ritmicas.class.js primero.');
}