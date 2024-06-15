const configbot = (prefix) => {
return `

 COMO CONFIGURAR O BOT, PRA SER DONO. 
 
 Primeiro ligue o bot no termux, e vá para o WhatsApp do bot em algum privado, utilize os seguintes comandos.

╭───────────────

❪🍧ฺ࣭࣪͘ꕸ▸ Pra alterar o nome do bot :

❪🍧ฺ࣭࣪͘ꕸ▸  ${prefix}nome-bot Nome que deseja 

❪🍧ฺ࣭࣪͘ꕸ▸  Pode por letras modificadas também 🙂

╰───────────────

╭───────────────

❪🍧ฺ࣭࣪͘ꕸ▸  Nick Do Dono Do Bot :

❪🍧ฺ࣭࣪͘ꕸ▸  ${prefix}nick-dono Nick seu

╰───────────────

╭───────────────  

❪🍧ฺ࣭࣪͘ꕸ▸  Configurar o número do dono  
  
❪🍧ฺ࣭࣪͘ꕸ▸  ${prefix}numero-dono 55xxxxxx

❪🍧ฺ࣭࣪͘ꕸ▸  o número tem que ser junto, e não pode conter o símbolo de + nem - e não pode ter o 9 da operadora, tem que ser o número idêntico ao seu do whatsapp.
  
lembre-se, que deve utilizar o próprio whatsapp e número do bot pra configurar o número de dono, porque só ele é dono dele mesmo enquanto não for configurado..
  
╰───────────────

╭───────────────

❪🍧ฺ࣭࣪͘ꕸ▸  Prefixo Do Bot :

❪🍧ฺ࣭࣪͘ꕸ▸  ${prefix}prefixo-bot #

Pode por qualquer símbolo, se o seu símbolo for ${prefix} ele vai passar a ser # de acordo com o que você mudou.

╰───────────────

╭───────────────

❪🍧ฺ࣭࣪͘ꕸ▸  TROCAR FOTO DO MENU :

❪🍧ฺ࣭࣪͘ꕸ▸  ${prefix}fotomenu

apenas marque a foto que queres que seja do menu, com o comando.

╰───────────────
`
  
}

exports.configbot = configbot