const infobemvindo = (prefix, pushname) => {
return `Oi ${pushname}, está perdido em como montar seu bem vindo? Chega mais então.

O primeiro passo é ativar a função, usando ${prefix}bemvindo 1... Caso queira desativar, use ${prefix}bemvindo 0

Sendo assim, temos 5 tipos de bem vindo, dos quais datados abaixo:

• ${prefix}bemvindo 1 (envio de foto)
• ${prefix}bemvindo2 1 (envio de texto)
• ${prefix}bemvindo3 1 (envio de figurinha)
• ${prefix}bemvindo4 1 (envio de áudio)
• ${prefix}bemvindo5 1 (envio de vídeo)
_(pra desativar, só usar "0" em vez de "1")_

Para definir a legenda do bem vindo, basta usar ${prefix}legendabv e escrever a sua mensagem... Cada bem vindo tem seu comando próprio de legenda:

• ${prefix}legendabv (bemvindo)
• ${prefix}legendabv2 (bemvindo2)
• ${prefix}stickerbv (bemvindo3)
• ${prefix}audiobv (bemvindo4)
• ${prefix}legendabv5 (bemvindo5)

Caso queira definir a legenda de saída, segue o msm comando acima, com uma sutil diferença... Basta mudar o "bv" para "saiu", ex: O que era "${prefix}legendabv2" vira "${prefix}legendasaiu2"

E para montar qualquer legenda, existem alguns códigos que você pode usar, como os descritos abaixo:

• #tempo# = vai puxar o saudação do horário (ex: bom dia)

• #hora# = vai puxar a hora atual

• #nomedogp# = vai puxar o nome do grupo

• #numerodele# = vai puxar o @ do usuário que entrou/saiu

• #nomedele# = vai puxar o nome do usuário que entrou/saiu

• #wame# = vai puxar o número em wa.me do usuário que entrou/saiu

• #numero# = vai puxar o número por escrito do usuário que entrou/saiu (ex: +55 11...)

• #status# = vai puxar a bio do wpp do usuário que entrou/saiu

• #numerobot# = vai puxar o @ do bot

• #nomebot# = vai puxar o nome do bot

• #nickdono# = vai puxar o nick do dono do bot

• #prefixo# = vai puxar o prefixo do bot

• #estado# = vai puxar o estado do Brasil do usuário que entrou/saiu

• #descrição# = vai puxar a descrição do grupo



Aqui embaixo farei um exemplo pra vc ${pushname}:

${"-".repeat(60)}
${prefix}legendabv _#tempo# *#numerodele#,* seja bem vindo ao grupo #nomedogp#_

#descrição#
${"-".repeat(60)}


Bom, basicamente é isso... Boa sorte aí kkkkk

${"-".repeat(60)}

*CRÉDITOS DO BEM VINDO:*

*Criado por:* Black Bot (matheuzinho)

${"-".repeat(60)}
`
}

exports.infobemvindo = infobemvindo