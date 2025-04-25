function sum(arr) {
    return arr.reduce((acc, val) => acc + val, 0);
  }

  function sumOdds(arr) {
    return arr.filter(n => n % 2 !== 0).reduce((acc, val) => acc + val, 0);
  }

  function product(arr) {
    return arr.reduce((acc, val) => acc * val, 1);
  }

  function isPrime(n) {
    if (n < 2) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) return false;
    }
    return true;
  }

  function gerarPrimos(a, b = null) {
    const primos = [];
    if (b === null) {
      let num = 2;
      while (primos.length < a) {
        if (isPrime(num)) primos.push(num);
        num++;
      }
    } else {
      const [inicio, fim] = [Math.min(a, b), Math.max(a, b)];
      for (let i = inicio; i <= fim; i++) {
        if (isPrime(i)) primos.push(i);
      }
    }
    return primos;
  }

  function paraRomano(num) {
    const map = [
      [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
      [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
      [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']
    ];
    let result = '';
    for (const [val, letra] of map) {
      while (num >= val) {
        result += letra;
        num -= val;
      }
    }
    return result;
  }

  function saqueMinimo(valor) {
    const cedulas = [100, 50, 20, 10, 5, 2];
    const resultado = {};
    for (const ced of cedulas) {
      const qtd = Math.floor(valor / ced);
      if (qtd > 0) {
        resultado[ced] = qtd;
        valor -= qtd * ced;
      }
    }
    return resultado;
  }

  // Manipulação de entrada e saída
  function calcularFuncoesNumericas() {
    const input = document.getElementById("inputNumeros").value;
    const arr = input.split(',').map(Number).filter(n => !isNaN(n));
    if (arr.length === 0) return alert("Digite números válidos!");

    const texto = `
Array: [${arr.join(', ')}]
Soma total: ${sum(arr)}
Soma dos ímpares: ${sumOdds(arr)}
Produto: ${product(arr)}
    `;
    document.getElementById("saidaNumerica").textContent = texto;
  }

  function calcularPrimos() {
    const input = document.getElementById("inputPrimos").value;
    const valores = input.split(',').map(Number).filter(n => !isNaN(n));
    if (valores.length === 0 || valores.length > 2) return alert("Digite 1 ou 2 números!");

    const resultado = valores.length === 1
      ? gerarPrimos(valores[0])
      : gerarPrimos(valores[0], valores[1]);

    document.getElementById("saidaPrimos").textContent = "Primos: " + resultado.join(', ');
  }

  function converterRomano() {
    const num = parseInt(document.getElementById("inputRomano").value);
    if (isNaN(num) || num < 1) return alert("Digite um número positivo!");
    const romano = paraRomano(num);
    document.getElementById("saidaRomanos").textContent = `${num} em romano: ${romano}`;
  }

  function calcularSaque() {
    let valor = parseInt(document.getElementById("inputSaque").value);
    if (isNaN(valor) || valor < 2) return alert("Digite um valor maior ou igual a 2!");
    const resultado = saqueMinimo(valor);
    const texto = Object.entries(resultado)
      .map(([ced, qtd]) => `R$${ced}: ${qtd} nota(s)`)
      .join('\n');
    document.getElementById("saidaSaque").textContent = `Saque de R$${valor}:\n` + texto;
  }