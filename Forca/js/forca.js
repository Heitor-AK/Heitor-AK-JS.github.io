//passo 0 - definir um array de palavras
const palavras = [
    "abacaxi","abacate","abelha","abismo","abobrinha","abundante","academia","acender","acervo","acetona",
    "achaque","aceitar","acidez","acolher","acomodar","acontecer","acousmar","acre","acreditar","acrobata",
    "adaptar","admirar","adoração","adorno","adulto","aeronave","afastar","afeto","afiar","afilhado",
    "agadir","agenda","agitado","agora","agradar","agricultura","agudo","ah","ainda","aipo",
    "ajudar","alameda","albergue","albergueiro","albino","alentar","alface","alfabeto","alfinete","algodão",
    "alicate","alimentar","alma","almofada","almoço","altar","altura","aluguel","aluno","alvura",
    "amado","amanhecer","amarelo","ambiente","ambulância","amendoim","amiga","amistoso","amor","ampulheta",
    "amuleto","anagrama","analisar","âncora","anel","anfíbio","angustiar","animal","anjo","ânodo",
    "antena","antigo","anual","anunciar","anzol","aonizar","apagar","aparelho","apito","aplaudir",
    "apontar","apreço","aprender","aprovar","aquarela","arame","aranha","arco","areia","argila",
    "armário","armazenar","arraial","arrepio","arroba","arrumar","artesanato","artista","árvore","asa",
    "asfalto","atrair","atrasar","atropelar","atura","atual","aula","ausente","autenticar","automóvel",
    "autor","avaliar","aventura","avião","aviso","azar","azulejo","baile","bala","balanço",
    "bambu","banheiro","banana","bandeira","banho","baralho","barato","barco","barriga","barulho",
    "basalto","base","batata","bebê","beleza","bengala","berço","bicicleta","bigode","bilhete",
    "bolacha","boleto","bolo","bolsa","bomba","bondade","bonito","borboleta","borracha","botão",
    "branco","braço","bravo","brejo","brinquedo","brisa","brócolis","bronze","bruxa","bucha",
    "bucho","buscar","bufar","bulbo","buraco","burlão","busca","butique","cabaça","cabana",
    "cabelo","cabide","cabo","cacau","cacto","caçar","cadeia","cadeira","cafuné","cair",
    "calaboço","calça","calcular","caleidoscópio","calendário","cálculo","caminhão","camisa","campo","canal",
    "cancún","candura","caneta","canguru","canoa","canudo","cantar","capaz","capim","caracol",
    "caramba","carater","careta","cargo","carinho","carne","carona","carpinteiro","carrinho","carta",
    "cartão","casaco","casa","casal","casca","casebre","caso","castanha","castelo","catedral",
    "cativeiro","cauda","causa","cavalo","caverna","cebola","cela","celular","cem","centavo",
    "centro","cerâmica","cercado","cereja","certo","certeza","cessar","chafariz","chalé","chaleira",
    "chamar","chapa","chapéu","charme","chave","checar","cheiro","chefe","cheio","chiclete",
    "chifre","china","chip","chique","chiste","chocalho","chover","chuchu","chuva","círculo",
    "cimento","cinto","cipó","círio","civil","claro","clima","clínica","clipe","clip",
    "coala","cobertura","coelho","coentro","coerente","cofre","cogumelo","coisa","colar","colher",
    "colina","colmeia","coluna","combinar","comer","comida","comissário","comodo","compasso","completo",
    "comprar","comprido","comprimento","comprimento","computador","concerto","concha","concordar","concreto","condor",
    "conectar","cone","confete","confiar","conflito","congelar","conhecer","conjunto","conosco","conserto",
    "consolar","contato","conta","contente","contingência","contorno","controle","contudo","conversa","conversa", "convidar","cooperar","copo","cor","coragem","corda","corpo","corredor","correto","correr",
    "coruja","corvo","cortar","corte","costela","costume","cotovelo","couro","cravo","crédito",
    "creme","crença","crescer","criança","criar","crime","crina","crioulo","criticar","crochê",
    "cruz","cruzar","cubano","cueca","cuidado","culinária","cultura","cumprir","cura","curioso",
    "curso","curto","cutucar","dadiva","dado","dança","dançar","dançarino","dar","dardo",
    "década","decidir","declive","dedal","dedicar","dedo","defesa","definir","deitar","deixar",
    "delicado","delícia","demorar","dentista","dente","dentro","depor","depressa","derramar","derrota",
    "desafio","descanso","descobrir","desenhar","deserto","desfazer","design","desligar","deslizar","desmaiar",
    "desmontar","desodorante","despedida","despertar","desprezar","destruir","detalhe","deus","dever","devorar",
    "dez","diabo","diadema","diagrama","diamante","diário","dica","dificuldade","digitar","digno",
    "dilema","dinheiro","dinossauro","diploma","direção","direita","direto","dirigir","disciplina","disco",
    "disfarçar","dispersar","dispor","disquete","distante","distraído","diva","diversão","dividir","divino",
    "divulgar","dobrar","doca","docente","doce","doença","doente","dólar","dolorido","dom",
    "domínio","domo","donzela","dor","dormir","dorso","dose","dotado","dragão","drama",
    "ducha","dúvida","duvidoso","duzento","eco","econômico","educado","educar","efeito","efeito",
    "eficaz","efeito","egípcio","eira","eixo","elegante","elemento","eletricista","eletrônico","elogio",
    "eloquente","embaixo","embalar","embarcação","embrião","emoção","empada","empatia","emprego","empurrar",
    "emissão","emulador","encanto","encarar","encerrar","endereço","energia","enfermeira","engano","engenheiro",
    "engrenagem","enigma","enjoar","enquanto","enquete","ensinar","ensopado","entender","entidade","entrar",
    "entrega","entusiasmo","envelhecer","enviar","enxada","enxame","enxergar","enxoval","epiderme","época",
    "equador","equipamento","equívoco","equilibrar","era","eremita","erguer","errado","errar","erudito",
    "escada","escala","escapar","escarola","escassez","escavar","escola","escolher","esconder","escrever",
    "escutar","esforço","esfregar","esgotar","esmalte","espada","espaguete","espantar","espaço","esperar",
    "espeto","espiar","espiga","espinho","espiral","espirro","espuma","esqueleto","esquecer","esquema",
    "esquilo","estaca","estádio","estante","estar","estátua","estilo","estimar","estofado","estojo",
    "estrela","estrofe","estudo","estufa","estupendo","etapa","etiqueta","evento","exame","exato",
    "excelente","excluir","exemplo","exercício","exibir","exigir","existir","expansão","expedição","experiência",
    "explicar","explodir","explorar","exportar","exposição","expressar","extensão","externo","extra","extrato",
    "extremo","faca","faceta","facilidade","fácil","fada","fado","faísca","falar","falcão",
    "falta","fama","família","fantasia","fantasma","fardo","farinha","faro","farsa","farto",
    "fascinar","fase","fastio","fatal","fatia","fator","fauna","favor","favela","faxina",
        "fazer","febre","fechar","feijão","feira","feito","felicidade","felino","fenda","feriado",
        "ferida","fermento","feroz","festa","festivo","feudal","fevra","fiação","fibra","ficar",
        "figo","figura","filar","filé","filhote","filme","filtro","final","financeiro","finca",
        "fingir","fino","fio","firma","fisgada","físico","fita","fixar","flácido","flanela",
        "flauta","flechado","flexão","floco","flor","flora","fluir","foca","foco","fogão",
        "foice","folga","folha","folia","fome","fonema","fonte","formar","forno","forte",
        "força","fosfato","foto","fotão","fouet","fovea","fragata","fralda","framboesa","franco",
        "frase","fraude","frear","freira","frequente","fria","fricção","frio","frisar","frite",
        "frivolo","frota","fruta","fubá","fuga","fumar","função","funcional","fundir","fundo",
        "furacão","furar","furor","furo","futebol","futuro","gabarito","gabinete","gado","gaiola",
        "gaita","gala","galho","galinha","galo","galpão","gama","ganhar","garagem","garfo",
        "garganta","gargantilha","garimpo","garoto","gás","gasto","gatilho","gato","gavião","gazeta",
        "gelado","geleia","gema","gêmeo","genro","gerar","gerente","germinar","gesso","gesto",
        "gigante","gilete","ginasta","girar","giz","glacial","glândula","globo","glória","gola",
        "golfinho","golpe","goma","gomo","gongo","gordura","gorila","gorro","gostar","gozo",
        "grade","grafite","grama","grampear","granada","grande","grão","gravata","grave","gredo",
        "greve","grid","grilo","grinalda","grito","grosso","grudar","grupo","gruta","guarda",
        "guarnição","guaxinim","guelra","guia","guilherme","guincho","guirlanda","guitarra","habilidade","hálito",
        "haltere","harmonia","haste","haver","hebraico","hectare","helicóptero","hemisfério","herança","herói",
        "hesitar","hidrante","hidratar","hiena","higiene","hino","hipnose","hipopótamo","histeria","história",
        "hoje","homenagem","homem","honesto","honra","hora","horizonte","horta","hospital","hostil",
        "hotel","hóspede","humano","humilde","humor","húngaro","huno","hurra","húmus","ibérico",
        "iceberg","idade","ideia","identidade","ideologia","idioma","idiota","ídolo","ignorar","igreja",
        "igual","ilusão","imagem","imã","imbatível","imediato","imensidão","imitar","imóvel","impacto",
        "impedir","imperador","imperfeito","implorar","importar","impor","impossível","imprensa","impulso","inativo",
        "incenso","inchar","inclinar","incluir","incolor","incrível","incubar","indagar","índio","índice",
        "indústria","inerte","infância","infeliz","inferno","infinito","inflar","influência","informar","inglês",
        "ingrediente","inicial","injusto","inocente","inquieto","inseto","insistir","inspetor","instante","instituto",
        "instrumento","inteiro","inteligente","intenção","interior","interrogar","intervalo","intimidade","inverno","invés",
        "invocar","iogurte","íris","irmão","irônico","irregular","isca","isolado","isopor","item",
    "itinerário","jacaré","jacto","jade","jamanta","janela","jardim","jargão","jato","javali",
    "jazida","jeito","jogo","jornal","jorro","jovem","juiz","julgamento","julgador","julho",
    "junco","junho","junta","juntar","jurar","justiça","juvenil","kabuki","kaki","kamikaze",
    "karatê","karma","kayak","kazoo","kelvin","ketchup","kiwi","koala","kombi","kungfu",
        "lábio","laca","ladeira","lado","ladrão","lago","lâmina","lampião","lança","lanche",
        "lance","lápis","laranja","largura","larva","laser","lata","latido","lato","lavanda",
        "lavoura","leal","lebre","legal","leigo","leite","leitura","lembrete","lenda","lenha",
        "lençol","leoa","leque","ler","lesma","lesão","letra","leve","levitar","lexema",
        "lhama","líder","lima","limão","limite","limpar","linha","lira","liso","listrado",
        "livre","livro","lixo","lobo","local","lógica","logotipo","lombada","lona","longa",
        "lontra","lorde","louro","lousa","lua","lugar","luva","luxo","mágoa","maior",
        "majestade","malabarismo","malandro","maleta","malha","mamão","mamífero","mamilo","mamut","manada",
        "mancha","mandar","maneira","manga","manjar","manobra","mansão","manso","manta","mapa",
        "mar","maravilha","marca","marfim","margem","marido","marinheiro","mariposa","maroto","martelo",
        "massa","mastro","matar","matemática","matiz","matriz","mau","máximo","medalha","médico",
        "medo","medula","mel","melancia","melodia","meloso","memória","menina","menino","mensagem",
        "mental","mercado","mergulho","mesa","mesmo","messias","mestre","metal","metas","mexer",
        "mexicano","milagre","milhar","milho","militar","milímetro","mim","mina","mineral","mínimo",
        "minoria","minuto","miojo","mira","miragem","misterioso","mito","mistura","modelo","modo",
        "moeda","mola","molde","molhado","momento","monarca","monge","monstro","montanha","montar",
        "monte","morada","morango","moreno","morro","mortal","mosca","mosquito","mosteiro","motriz",
        "moto","motor","movimento","mudo","muito","mula","mulher","multa","múmia","mundo",
        "muralha","museu","musgo","música","nação","nadar","nadador","nádega","nailon","nascente",
        "natal","navalha","nave","navegar","navio","neblina","necessário","negócio","negrito","neném",
        "neve","níquel","nível","nobre","noção","noite","nome","nômade","nordeste","normal",
        "norma","norte","nosso","nota","notícia","novato","novembro","novo","nudez","número",
        "nutrir","obediência","obesidade","objeção","objeto","obra","obrigado","observar","obstáculo","ocasião",
        "oceano","ocupar","ódio","oferta","oficial","óleo","olhar","olho","ombro","onda",
        "ônibus","ônix","ontem","opaco","operação","opinião","ópio","óptico","oração","orador",
        "órbita","orçamento","ordem","orelha","orgulho","orientar","origem","ornamento","orquestra","orteil",
        "ósseo","ossos","ostentar","otimismo","ouro","ousar","outono","ouvido","ouvir","ovelha",
        "ovo","oxigênio","pacto","padeiro","padrão","página","páreo","pássaro","passo","pasta",
        "pátio","patrão","pausa","pavê","paz","peão","pecado","pedra","peixe","pele",
        "pena","pênalti","pente","pequeno","perdão","perigo","perna","persiana","pertencer","peso",
        "peteca","piano","picada","picolé","piedade","pijama","pilha","piloto","pingo","pintor",
        "pipa","pirâmide","pirata","piscina","piso","pista","pivô","placa","planeta","plano",
        "plástico","pneu","pobre","pocinha","poema","poeta","polegar","policial","polvo","pomba",
        "ponte","ponto","população","porque","porquinho","porta","posição","positivo","pote","pouco",
        "praça","praia","prancha","prato","prazer","precioso","preguiça","preparo","pressa","preto",
        "príncipe","prisma","problema","processo","produto","professor","programa","projeto","prosa","proteína"    
];   

//funcao para sortear palavras
const sortearPalavra = () => palavras[Math.trunc(Math.random()*palavras.length)].toUpperCase()

let palavraSorteada = ""
let nletras = 0
const montarDisplay = () => {
    //item html que receberá a palavra sorteada
    const lista = document.querySelector("#palavra")
    //sorteio da palavra
    palavraSorteada = sortearPalavra()

    //criar lis para cada letra da palavra
    for(let i=0;i<palavraSorteada.length;i++){
        //cria um li
        const nodeElement = document.createElement("li")
        //cria a letra para o li
        const textContent = document.createTextNode(" ? ")
        // adiciona a letra no li
        nodeElement.appendChild(textContent)
        //adiciona o li no elemento html
        lista.appendChild(nodeElement)
    }
}

const partesBoneco = [
    '<img src="js/img/So_a_cabecinha.png" alt="Cabeça">',
    '<img src="js/img/Cabeça_corpo.png" alt="Corpo">',
    '<img src="js/img/Braco1.png" alt="Braço direito">',
    '<img src="js/img/Braco2.png" alt="Braço esquerdo">',
    '<img src="js/img/Perna1.png" alt="Perna direita">',
    '<img src="js/img/Perna2.png" alt="Perna esquerda">'
]

montarDisplay()

const montarBoneco = () =>{
    const boneco = document.querySelector(".controle")
    if (partesBoneco.length > 1) {
        const parte = partesBoneco.shift() // retira o próximo elemento
        boneco.innerHTML = parte // adiciona ao HTML
    }
    else {
        const parte = partesBoneco.shift() // retira o próximo elemento
        boneco.innerHTML = parte // adiciona ao HTML
        document.querySelector("#perdeu").innerHTML = "Perdeu Mané"
    }
}

const btn = document.querySelector("#executa")

btn.addEventListener("click", function(){
    const letra = document.querySelector("#tentativa").value.toUpperCase()

    let acertou = false

    const listaLetra = document.querySelectorAll("#palavra li")
    //pesquisando a  letra na palavra
    for(let i =0; i< palavraSorteada.length; i++){
        
        if(letra == palavraSorteada[i]){
            listaLetra[i].innerHTML = palavraSorteada[i];
            listaLetra[i].style.color = "#000"
            acertou = true
            nletras = nletras+1;
        }
    }


    if (!acertou) {
        montarBoneco() // chama a função apenas se a letra não estiver na palavra
    }

    if (nletras == palavraSorteada.length) {
        document.querySelector("#ganhou").innerHTML = "You win, GG";
    }
    
    document.querySelector("#tentativa").value=""
   

    
})

