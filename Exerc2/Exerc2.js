// Q1
function sum(arr) {
    let total = 0;
    for (let i = 0; i < arr.length; i++) {
        total += arr[i];
    }
    return total;
}

// Função sumOdds - soma apenas os números ímpares
function sumOdds(arr) {
    let total = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] % 2 !== 0) {
            total += arr[i];
        }
    }
    return total;
}

// Função product - multiplica todos os elementos do array
function product(arr) {
    let total = 1;
    for (let i = 0; i < arr.length; i++) {
        total *= arr[i];
    }
    return total;
}

// Q2

function isPrime(num) {
    if (num <= 1) return false;
    if (num === 2) return true;
    if (num % 2 === 0) return false;
    
    for (let i = 3; i <= Math.sqrt(num); i += 2) {
        if (num % i === 0) return false;
    }
    return true;
}

// Função principal para gerar números primos
function primes(...args) {
    if (args.length === 1) {
        // Caso 1: gerar n primeiros primos
        const n = args[0];
        const result = [];
        let num = 2;
        
        while (result.length < n) {
            if (isPrime(num)) {
                result.push(num);
            }
            num++;
        }
        return result;
    } else if (args.length === 2) {
        // Caso 2: gerar primos no intervalo [a, b]
        const [a, b] = args;
        if (a > b) return [];
        
        const result = [];
        for (let num = a; num <= b; num++) {
            if (isPrime(num)) {
                result.push(num);
            }
        }
        return result;
    } else {
        return []; // Caso inválido
    }
}

// Q3
function toRoman(num) {
    if (num <= 0 || num > 3999) return "";
    
    const romanNumerals = [
        { value: 1000, symbol: 'M' },
        { value: 900, symbol: 'CM' },
        { value: 500, symbol: 'D' },
        { value: 400, symbol: 'CD' },
        { value: 100, symbol: 'C' },
        { value: 90, symbol: 'XC' },
        { value: 50, symbol: 'L' },
        { value: 40, symbol: 'XL' },
        { value: 10, symbol: 'X' },
        { value: 9, symbol: 'IX' },
        { value: 5, symbol: 'V' },
        { value: 4, symbol: 'IV' },
        { value: 1, symbol: 'I' }
    ];
    
    let result = '';
    let remaining = num;
    
    for (let i = 0; i < romanNumerals.length; i++) {
        const { value, symbol } = romanNumerals[i];
        while (remaining >= value) {
            result += symbol;
            remaining -= value;
        }
    }
    
    return result;
}

//Q4
function saqueMinimo(valor) {
    const cedulas = [100, 50, 20, 10, 5, 2];
    const resultado = {};
    
    let restante = valor;
    
    for (let i = 0; i < cedulas.length; i++) {
        const cedula = cedulas[i];
        if (restante >= cedula) {
            const quantidade = Math.floor(restante / cedula);
            resultado[cedula] = quantidade;
            restante %= cedula;
        }
        
        if (restante === 0) break;
    }
    
    // Verifica se sobrou algum valor que não pode ser pago com as cédulas disponíveis
    if (restante !== 0) {
        return "Não é possível sacar este valor com as cédulas disponíveis";
    }
    
    return resultado;
}

// Testes
console.log(saqueMinimo(1280));
// { 100: 12, 50: 1, 20: 1, 10: 1 }

console.log(saqueMinimo(5705));
// { 100: 57, 5: 1 }

console.log(saqueMinimo(892));
// { 100: 8, 50: 1, 20: 2, 2: 1 }

console.log(saqueMinimo(1));
// "Não é possível sacar este valor com as cédulas disponíveis"