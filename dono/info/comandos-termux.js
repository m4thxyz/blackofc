const cmd_termux = (prefix) => {
return `
*_Primeira coisa... Instale o termux:_*
https://www.mediafire.com/file/0npdmv51pnttps0/com.termux_0.119.1-119_minAPI21(arm64-v8a,armeabi-v7a,x86,x86_64)(nodpi)_apkmirror.com.apk/file

*_Após instalado, configure ele com os comandos abaixo:_*

1.
termux-change-repo 

Confirma, marca a terceira caixinha e confirma e prossegue > 

2.
apt-get upgrade

Vai precisar digitar y e confirmar toda vez que pedir.

3.
apt-get update

Vai precisar digitar y e confirmar toda vez que pedir.

4.
pkg upgrade -y && pkg update -y && pkg install nodejs -y && pkg install nodejs-lts -y && pkg install ffmpeg -y && pkg install wget -y && pkg install git -y

5.
termux-setup-storage

E permite.

*_Após configurado, vamos pra instalação (caso você não tenha o arquivo, instale o mesmo no site do bot: https://blackmd.online/docs ):_*

6.
cd /sdcard/Download/BLACKOFC
7.
sh blackmd.sh
`
}

exports.cmd_termux = cmd_termux
