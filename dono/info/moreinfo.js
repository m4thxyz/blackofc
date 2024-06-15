const infotransmitir = (prefix, pushname) => {
return`
Olá ${pushname}, irei explicar como funciona os seguintes comando:

${prefix}rgtm

${prefix}tirardatm

${prefix}fazertm

${prefix}listatm

O comando rgtm, você entra no grupo ou privado de alguém que deseja que ele receba transmissão, digita ${prefix}rgtm

E caso queira tirar o grupo da transmissão, entra nele e digita 

${prefix}tirardatm ou se já saiu dele, procura o id dele no comando ${prefix}listatm

E caso queira fazer a transmissão para todos os grupos que foi registrado para transmissão, digita 

${prefix}fazertm e digita o que quer enviar para todos os grupos que foi registrado ou marque uma imagem já com legenda, ou envie uma imagem com legenda, ou documento, ou vídeo, ou texto, então é isso..
`;
};

exports.infotransmitir = infotransmitir;


const anotacao = (prefix) => {
return `

Olá. Se você está lendo isso, provavelmente está curioso sobre o comando anotação. 

Existe os seguintes comando:

1 ${prefix}anotações

2 ${prefix}anotar

3 ${prefix}tirar_nota

4 ${prefix}nota titulo


O primeiro ele mostra todas as anotações do grupo, criada. 

O segundo, ele é usado para criar a nota, tipo um bloco de notas, exemplo: ${prefix}anotar ABC|ABC são 3 letras do alfabeto, utilizada bastante

Isso foi um exemplo, mas pode ser utilizado da fórma que quiser, mas lembre que antes do | é o título, depois é a anotação.

Ja o terceiro, é pra tirar a nota, Exemplo como expliquei, ${prefix}tirar_nota ABC 

Com isso a anotação que estava criada foi apagada. 

Já o terceiro, ele é pra buscar a anotação que deseja, pelo título, exemplo: ${prefix}nota ABC

É isso... 

Boa sorte. 
`;
};

exports.anotacao = anotacao;