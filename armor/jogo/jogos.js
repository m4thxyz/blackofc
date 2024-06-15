const fs = require('fs')



//========(PALAVRAS-DO-ANAGRAMA)=========\\

let palavrasANA = [
{
original: 'PARADOXO',
embaralhada: 'PARADOXO',
dica: 'CANAL'
},
{original: 'MATHEUS',
embaralhada: 'MATHEUS',
dica: 'DONO'
},
{original: 'VIADO',
embaralhada: 'VIADO',
dica: 'VOCÊ'
},
{original: 'CAMISETA',
embaralhada: 'CAMISETA',
dica: 'ROUPA'
},
{original: 'CARRO',
embaralhada: 'CARRO',
dica: 'VEÍCULO'
},
{original: 'EDIFÍCIO',
embaralhada: 'EDIFÍCIO',
dica: 'MORADIA'
},
{original: 'SOFÁ',
embaralhada: 'SOFÁ',
dica: 'OBJETO'
},
{
original: 'ESCADA',
embaralhada: 'ESCADA',
dica: 'OBJETO'
},
{
original: 'AKAME',
embaralhada: 'AKAME',
dica: 'PERSONAGEM'
},
{
original: 'NAGATORO',
embaralhada: 'NAGATORO',
dica: 'PERSONAGEM'
},
{
original: 'SASUKE',
embaralhada: 'SASUKE',
dica: 'PERSONAGEM'
},
{
original: 'GAY',
embaralhada: 'GAY',
dica: 'VOCÊ'
},
{
original: 'CIMENTO',
embaralhada: 'CIMENTO',
dica: 'CONSTRUÇÕES'
},
{
original: 'BANANA',
embaralhada: 'BANANA',
dica: 'COMIDA'
},
{
original: 'NETFLIX',
embaralhada: 'NETFLIX',
dica: 'APLICATIVO'
},
{
original: 'SPOTIFY',
embaralhada: 'SPOTIFY',
dica: 'APLICATIVO'
},
{
original: 'DISNEY',
embaralhada: 'DISNEY',
dica: 'APLICATIVO'
},
{
original: 'FACEBOOK',
embaralhada: 'FACEBOOK',
dica: 'APLICATIVO'
},
{
original: 'MINECRAFT',
embaralhada: 'MINECRAFT',
dica: 'JOGO'
},
{
original: 'COD',
embaralhada: 'COD',
dica: 'JOGO'
},
{
original: 'PUBG',
embaralhada: 'PUBG',
dica: 'JOGO'
},
{
original: 'FREEFIRE',
embaralhada: 'FREEFIRE',
dica: 'JOGO'
},
{
original: 'HELICÓPTERO',
embaralhada: 'HELICÓPTERO',
dica: 'CÉU'
},
{
original: 'AVIÃO',
embaralhada: 'AVIÃO',
dica: 'CÉU'
},
{
original: 'AEROPORTO',
embaralhada: 'AEROPORTO',
dica: 'AVIÃO'
},
{
original: 'ANTÁRTICA',
embaralhada: 'ANTÁRTICA',
dica: 'CONTINENTE'
},
{
original: 'INTERESTELAR',
embaralhada: 'INTERESTELAR',
dica: 'FILME'
},
{
original: 'AVENGERS',
embaralhada: 'AVENGERS',
dica: 'FILME'
},
{
original: 'TRANSFORMERS',
embaralhada: 'TRANSFORMERS',
dica: 'ROBÔ'
},
{
original: 'JÚPITER',
embaralhada: 'JÚPITER',
dica: 'PLANETA'
},
{
original: 'BARBIE',
embaralhada: 'BARBIE',
dica: 'FILME'
},
{
original: 'OPPENHEIMER',
embaralhada: 'OPPENHEIMER',
dica: 'FILME'
},
{
original: 'FNAF',
embaralhada: 'FNAF',
dica: 'JOGO'
},
{
original: 'YOUTUBE',
embaralhada: 'YOUTUBE',
dica: 'APLICATIVO'
},
{
original: 'PORTUGAL',
embaralhada: 'PORTUGAL',
dica: 'PAÍS'
},
{
original: 'MÉXICO',
embaralhada: 'MÉXICO',
dica: 'PAÍS'
},
{
original: 'PISTOLA',
embaralhada: 'PISTOLA',
dica: 'OBJETO'
},
		
{
original: 'CAMARÃO',
embaralhada: 'CAMARÃO',
dica: 'COMIDA'
},
{
original: 'HIDRANTE',
embaralhada: 'HIDRANTE',
dica: 'OBJETO'
},
{
original: 'FOGUETE',
embaralhada: 'FOGUETE',
dica: 'OBJETO'
},
{
original: 'SKATE',
embaralhada: 'SKATE',
dica: 'OBJETO'
},
{
original: 'MACACO',
embaralhada: 'MACACO',
dica: 'ANIMAL'
},
{
original: 'LASANHA',
embaralhada: 'LASANHA',
dica: 'COMIDA'
},
{
original: 'PASTEL',
embaralhada: 'PASTEL',
dica: 'COMIDA'
},
{
original: 'COXINHA',
embaralhada: 'COXINHA',
dica: 'COMIDA'
},
{
original: 'BICICLETA',
embaralhada: 'BICICLETA',
dica: 'OBJETO'
},
{
original: 'CAVALO',
embaralhada: 'CAVALO',
dica: 'ANIMAL'
},
{
original: 'LEVI',
embaralhada: 'LEVI',
dica: 'PERSONAGEM'
},
{
original: 'KAMAITACHI',
embaralhada: 'KAMAITACHI',
dica: 'CANTOR'
},
{
original: 'LUBA',
embaralhada: 'LUBA',
dica: 'YOUTUBER'
},
{
original: 'GRÊMIO',
embaralhada: 'GRÊMIO',
dica: 'TIME'
},
{
original: 'SATURNO',
embaralhada: 'SATURNO',
dica: 'PLANETA'
},
{
original: 'MIKASA',
embaralhada: 'MIKASA',
dica: 'PERSONAGEM'
},
{
original: 'LEÃO',
embaralhada: 'LEÃO',
dica: 'ANIMAL'
},
{
original: 'SAKURA',
embaralhada: 'SAKURA',
dica: 'PERSONAGEM'
},
{
original: 'HADES',
embaralhada: 'HADES',
dica: 'MITOLOGIA'
},
{
original: 'CORRIDA',
embaralhada: 'CORRIDA',
dica: 'ESPORTE'
},
{
original: 'ODIN',
embaralhada: 'ODIN',
dica: 'MITOLOGIA NÓRDICA'
},
{
original: 'DION',
embaralhada: 'DION',
dica: 'MITOLOGIA GREGA'
},
{
original: 'MEDUSA',
embaralhada: 'MEDUSA',
dica: 'MITOLOGIA GREGA'
},
{
original: 'AFRODITE',
embaralhada: 'AFRODITE',
dica: 'AMOR'
},
{
original: 'ROGÉRIO',
embaralhada: 'ROGÉRIO',
dica: 'NOME'
},
{
original: 'SALOMÃO',
embaralhada: 'SALOMÃO',
dica: 'REI'
},
{
original: 'HONDA',
embaralhada: 'HONDA',
dica: 'MARCA DE MOTO'
},
{
original: 'CHEVROLET',
embaralhada: 'CHEVROLET',
dica: 'MARCA DE CARRO'
},
{
original: 'MERCEDES',
embaralhada: 'MERCEDES',
dica: 'MARCA DE CARRO'
},
{
original: 'FERRARI',
embaralhada: 'FERRARI',
dica: 'MARCA DE CARRO'
},
{
original: 'FORD',
embaralhada: 'FORD',
dica: 'MARCA DE CARRO'
},
{
original: 'BICICLETA',
embaralhada: 'BICICLETA',
dica: 'OBJETO'
},
{
original: 'GUATEMALA',
embaralhada: 'GUATEMALA',
dica: 'PAÍS'
},
{
original: 'CEREJA',
embaralhada: 'CEREJA',
dica: 'FRUTA'
},
{
original: 'VENEZUELA',
embaralhada: 'VENEZUELA',
dica: 'PAÍS'
},
{
original: 'HISTÓRIA',
embaralhada: 'HISTÓRIA',
dica: 'MATÉRIA'
},
{
original: 'INSTAGRAM',
embaralhada: 'INSTAGRAM',
dica: 'APLICATIVO'
},
{
original: 'WHATSAPP',
embaralhada: 'WHATSAPP',
dica: 'APLICATIVO'
},
{
original: 'CELULAR',
embaralhada: 'CELULAR',
dica: 'OBJETO'
},
{
original: 'NOTEBOOK',
embaralhada: 'NOTEBOOK',
dica: 'OBJETO'
},
{
original: 'COMPUTADOR',
embaralhada: 'COMPUTADOR',
dica: 'OBJETO'
},
{
original: 'LANTERNA',
embaralhada: 'LANTERNA',
dica: 'OBJETO'
},
{
original: 'CACHORRO',
embaralhada: 'CACHORRO',
dica: 'ANIMAL'
},
{
original: 'DESENTUPIDOR',
embaralhada: 'DESENTUPIDOR',
dica: 'OBJETO'
},
{
original: 'TOMATE',
embaralhada: 'TOMATE',
dica: 'ALIMENTO'
},
{
original: 'SAXOFONE',
embaralhada: 'SAXOFONE',
dica: 'INSTRUMENTO MUSICAL'
},
{
original: 'CAZAQUISTÃO',
embaralhada: 'CAZAQUISTÃO',
dica: 'PAÍS'
},
{
original: 'CROÁCIA',
embaralhada: 'CROÁCIA',
dica: 'PAÍS'
},
{
original: 'HUNGRIA',
embaralhada: 'HUNGRIA',
dica: 'PAÍS'
},
{
original: 'CORÉIA',
embaralhada: 'CORÉIA',
dica: 'PAÍS'
},
{
original: 'UCRÂNIA',
embaralhada: 'UCRÂNIA',
dica: 'PAÍS'
},
{
original: 'BRASIL',
embaralhada: 'BRASIL',
dica: 'PAÍS'
},
{
original: 'DINAMARCA',
embaralhada: 'DINAMARCA',
dica: 'PAÍS'
},
{
original: 'HIROSHIMA',
embaralhada: 'HIROSHIMA',
dica: 'BOMBA'
},
{
original: 'MEGAFONE',
embaralhada: 'MEGAFONE',
dica: 'OBJETO'
},
{
original: 'CINTURA',
embaralhada: 'CINTURA',
dica: 'CORPO HUMANO'
},
{
original: 'ABDÔMEN',
embaralhada: 'ABDÔMEN',
dica: 'CORPO HUMANO'
},
{
original: 'VAGNER',
embaralhada: 'VAGNER',
dica: 'NOME'
},
{
original: 'BLACK',
embaralhada: 'KLABC',
dica: 'BOT'
},
{    
original: 'KONEKO',
embaralhada: 'KONEKO',
dica: 'NOME'
},
{
original: 'RAPOSA',
embaralhada: 'RAPOSA',
dica: 'ANIMAL'
},
{
original: 'LULA',
embaralhada: 'LULA',
dica: 'LADRÃO'
},
{
original: 'DRAGÃO',
embaralhada: ' DRAGÃO',
dica: 'ANIMAL'
},
{
original: 'GIRAFA',
embaralhada: 'GIRAFA',
dica: 'ANIMAL'
},
{
original: 'INFERNO',
embaralhada: 'INFERNO',
dica: 'LUGAR'
},
{
original: 'PARALELEPÍPEDO',
embaralhada: 'PARALELEPÍPEDO',
dica: 'GEOMETRIA'
},
{
original: 'PARALELOGRAMO',
embaralhada: 'PARALELOGRAMO',
dica: 'GEOMETRIA'
},
{   
original: 'RINOCERONTE',
embaralhada: 'RINOCERONTE',
dica: 'ANIMAL'
},
{   
original: 'HIPOPÓTAMO',
embaralhada: 'HIPOPÓTAMO',
dica: 'ANIMAL'
},
{ 
original: 'PASTOR',
embaralhada: 'PASTOR',
dica: 'BATIZADO'
},
{
original: 'BONITO',
embaralhada: 'BONITO',
dica: 'COMENTÁRIO'
},
{       
original: 'TANGERINA',
embaralhada: 'TANGERINA',
dica: 'ALIMENTO'
},
{       
original: 'MELANCIA',
embaralhada: 'MELANCIA',
dica: 'ALIMENTO'
}
]	


const showdomilhao = [
{
original: 'AMEIXA',
foto: 'https://telegra.ph/file/84928021bd4e6dfe8ff8c.jpg'
}, 
{
original: '100',
foto: 'https://telegra.ph/file/1530a82843034f1ede5d5.jpg'
}
]	

//======== QUIZ DE ANIMAIS =======\\
let quizanimais = [
{
original: 'PORQUINHO DA ÍNDIA',
foto: 'https://i.ibb.co/Fqwr0W0/cb2bb96f29e3.jpg'
},
{
original: 'HAMSTER',
foto: 'https://i.ibb.co/Qb3npqg/c43fae235c0a.jpg'
},
{
original: 'ROTTWEILER',
foto: 'https://telegra.ph/file/a10ad7df6ab6a2312a1f9.jpg'
},
{
original: 'FLOPPA',
foto: 'https://telegra.ph/file/7633abcd83b8a587f418d.jpg'
},
{
original: 'GUAXINIM',
foto: 'https://telegra.ph/file/3800c7048d04a1c3dbc4e.jpg'
},
{
original: 'ZEBRA',
foto: 'https://telegra.ph/file/a08e224344e34aa916972.jpg'
},
{
original: 'CARNEIRO',
foto: 'https://telegra.ph/file/096342c8c7815ba9d83be.jpg'
},
{
original: 'BODE',
foto: 'https://telegra.ph/file/ff574a82178089f453444.jpg'
},
{
original: 'MAMUTE',
foto: 'https://telegra.ph/file/00e445dde6c036a0c0df5.jpg'
},
{
original: 'ALPACA',
foto: 'https://telegra.ph/file/a201b23b179392f1cdd7f.jpg'
},
{
original: 'PORCO ESPINHO',
foto: 'https://telegra.ph/file/7b180efc77c8ab6e9a24a.jpg'
},
{
original: 'QUOKKA',
foto: 'https://telegra.ph/file/3042e66a22c6d0fb6e0cd.jpg'
},
{
original: 'PANDA VERMELHO',
foto: 'https://telegra.ph/file/a6517debde47b846073cc.jpg'
},
{
original: 'PEIXE GOTA',
foto: 'https://telegra.ph/file/e8892204b373c147bf489.jpg'
},
{
original: 'PEIXE MANDARIM',
foto: 'https://telegra.ph/file/e8892204b373c147bf489.jpg'
},
{
original: 'DRAGÃO DE KOMODO',
foto: 'https://telegra.ph/file/d4c36b449f4c781533f3c.jpg'
},
{
original: 'GUEPARDO',
foto: 'https://telegra.ph/file/0016017b9d28a3b6d027a.jpg'
},
{
original: 'FURÃO',
foto: 'https://telegra.ph/file/e352b4831db11c20a3c62.jpg'
},
{
original: 'LEOPARDO',
foto: 'https://telegra.ph/file/71f5f532ced0fddc08f5b.jpg'
},
{
original: 'LEBRE',
foto: 'https://telegra.ph/file/89f9a46ce660261279477.jpg'
},
{
original: 'MARRECO',
foto: 'https://telegra.ph/file/aa41bde6c4c350ec9d0d4.jpg'
},
{
original: 'GANSO',
foto: 'https://telegra.ph/file/9ab69884414feefc9c109.jpg'
},
{
original: 'CAVALO MARINHO',
foto: 'https://telegra.ph/file/e4cee57d5b731dfffa5d8.jpg'
},
{
original: 'CROCODILO',
foto: 'https://telegra.ph/file/b4483f9a7077fd29a137f.jpg'
},
{
original: 'ORNITORRINCO',
foto: 'https://telegra.ph/file/8ffdd62da1834433112be.jpg'
},
{
original: 'HUSKY SIBERIANO',
foto: 'https://telegra.ph/file/07b98023259637951ba8f.jpg'
},
{
original: 'CAPIVARA',
foto: 'https://telegra.ph/file/54f20cbd80737fe45a284.jpg'
}
]


module.exports = {
palavrasANA, 
quizanimais, 
showdomilhao
}