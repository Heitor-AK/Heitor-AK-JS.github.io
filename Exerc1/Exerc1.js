// Q1
function inverterFrase(frase) {
    let fraseInvertida = '';
    for (let i = frase.length - 1; i >= 0; i--) {
        fraseInvertida += frase[i];
    }
    return fraseInvertida;
}

// Q2
function marcarVogais(frase) {
    const vogais = ['a', 'e', 'i', 'o', 'u', 'á', 'é', 'í', 'ó', 'ú', 'â', 'ê', 'î', 'ô', 'û', 'ã', 'õ'];
    let resultado = '';
    
    for (let letra of frase) {
        if (vogais.includes(letra.toLowerCase())) {
            resultado += `<span class="vogal-negrito">${letra}</span>`;
        } else {
            resultado += letra;
        }
    }
    return resultado;
}

// Q3
function contarPalavras(texto) {
    const palavras = texto.toLowerCase().split(/\s+/);
    const contagem = {};
    
    for (let palavra of palavras) {
        palavra = palavra.replace(/[.,;!?]$/, '');
        if (palavra) {
            contagem[palavra] = (contagem[palavra] || 0) + 1;
        }
    }
    
    return contagem;
}

// Q4
function estatisticasTexto(texto) {
    const palavras = texto.split(/\s+/).filter(p => p.length > 0);
    const contagem = contarPalavras(texto);
    
    let maiorOcorrencia = '';
    let maxOcorrencias = 0;
    let totalLetras = 0;
    
    for (let palavra in contagem) {
        if (contagem[palavra] > maxOcorrencias) {
            maxOcorrencias = contagem[palavra];
            maiorOcorrencia = palavra;
        }
    }
    
    for (let palavra of palavras) {
        totalLetras += palavra.replace(/[^a-zA-ZÀ-ÿ]/g, '').length;
    }
    
    return {
        palavraMaisFrequente: maiorOcorrencia,
        ocorrencias: maxOcorrencias,
        totalPalavras: palavras.length,
        totalLetras: totalLetras
    };
}

//Q5
function substituirTexto(texto, procurar, substituir) {
    const regex = new RegExp(procurar, 'g');
    return texto.replace(regex, substituir);
}

// Q6
function dataPorExtenso(dataStr) {
    const partes = dataStr.split('/');
    const dia = partes[0];
    const mes = partes[1];
    const ano = partes[2];
    
    const meses = [
        'janeiro', 'fevereiro', 'março', 'abril',
        'maio', 'junho', 'julho', 'agosto',
        'setembro', 'outubro', 'novembro', 'dezembro'
    ];
    
    const mesExtenso = meses[parseInt(mes) - 1];
    return `${dia} de ${mesExtenso} de ${ano}`;
}


// Q7
function classificarSenha(senha) {
    const temMinuscula = /[a-z]/.test(senha);
    const temMaiuscula = /[A-Z]/.test(senha);
    const temNumero = /[0-9]/.test(senha);
    const temEspecial = /[@#!$%&*()\-+.=]/.test(senha);
    
    if (temMinuscula && temMaiuscula && temNumero && temEspecial) {
        return {
            classificacao: "forte",
            texto: "Senha Forte",
            cor: "lime"
        };
    } else if (temMinuscula && temMaiuscula && temNumero) {
        return {
            classificacao: "moderada",
            texto: "Senha Moderada",
            cor: "orange"
        };
    } else {
        return {
            classificacao: "fraca",
            texto: "Senha Fraca",
            cor: "red"
        };
    }
}

// Q8
function codificarTenisPolar(texto) {
    const mapa = {
        'T': 'P', 'P': 'T',
        'E': 'O', 'O': 'E',
        'N': 'L', 'L': 'N',
        'I': 'A', 'A': 'I',
        'S': 'R', 'R': 'S',
        't': 'p', 'p': 't',
        'e': 'o', 'o': 'e',
        'n': 'l', 'l': 'n',
        'i': 'a', 'a': 'i',
        's': 'r', 'r': 's'
    };
    
    let resultado = '';
    for (let letra of texto) {
        resultado += mapa[letra] || letra;
    }
    return resultado;
}

// Q9  (usei o split, reverse e join pois na linguagem fazem a mesma função do for com decremento)
function calcularDiasDeVida(dataNascimento) {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento.split('/').reverse().join('-'));
    const diff = hoje - nascimento;
    return Math.floor(diff / (1000 * 60 * 60 * 24));
}


// Q10 (usei split, reverse e join aqui também)
function distanciaEmSemanas(data1, data2) {
    const d1 = new Date(data1.split('/').reverse().join('-'));
    const d2 = new Date(data2.split('/').reverse().join('-'));
    const diff = Math.abs(d1 - d2);
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 7));
}
