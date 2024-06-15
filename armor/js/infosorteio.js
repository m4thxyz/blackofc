const infosorteio = (sender, prefix) => {
return `_Olá @${sender.split("@")[0]}, vou te explicar como funciona o sistema de sorteio._

_Use o comando ${prefix}sorteio para definir o horário, a quantidade de ganhadores, a quantidade de participantes e o emoji que será usado para participar, ex:_
-> ${prefix}sorteio 18:00 1/10 ❤
_(o sorteio será programado para às 18:00, com 1 ganhador para 10 participantes, e com reação do emoji ❤ para participar)_

-> ${prefix}sorteio 15:30 2/all 😂
_(o sorteio será programado para às 15:30, com 2 ganhadores para todos os membros do grupo, e com reação do emoji 😂 para participar)_

_Antes de enviar, marque uma menssagem, no caso, o seu texto de sorteio, o bot salvará esta na base de dados_



_Só lembrando tbm que, para que não haja conflito, só será possível configurarar um sorteio por vez..._

_Você pode também cancelar o sorteio a qualquer momento usando o comando ${prefix}stopsorte, desde que este não tenha iniciado_
`
}

exports.infosorteio = infosorteio