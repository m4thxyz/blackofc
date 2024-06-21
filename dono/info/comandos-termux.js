const cmd_termux = (prefix) => {
return `
*_Primeira coisa... Instale o termux:_*
https://www.mediafire.com/file/0npdmv51pnttps0/com.termux_0.119.1-119_minAPI21(arm64-v8a,armeabi-v7a,x86,x86_64)(nodpi)_apkmirror.com.apk/file

*_Após instalado, configure ele com os comandos abaixo:_*

1.
pkg upgrade -y && pkg update -y && pkg install nodejs -y && pkg install nodejs-lts -y && pkg install ffmpeg -y && pkg install wget -y && pkg install git -y

Vai precisar digitar y e confirmar toda vez que pedir.

2.
termux-setup-storage

Espera um pouco, e permite.

3.
cd /sdcard && git clone https://github.com/m4thxyz/blackofc

4.
cd blackofc && sh blackmd.sh

Daí basta colocar o número e conectar no whatsapp.



_Caso o bot desligue do termux e termine a sessão, basta usar o seguinte comando:_
cd /sdcard/blackofc && sh blackmd.sh

_Ou se a sessão permanecer aberta, basta usar:_
sh blackmd.sh
`
}

exports.cmd_termux = cmd_termux
