#!bin/bash

NOCOLOR='\033[0m'

RED='\033[0;31m'

SABTRED='\033[1;31m'

GREEN='\033[1;32m'

ORANGE='\033[0;33m'

BLUE='\033[0;34m'

PURPLE='\033[0;35m'

CYAN='\033[0;36m'

SABGRAY='\033[0;37m'

DARKGRAY='\033[1;30m'

PURPLE='\033[1;31m'

SABGREEN='\033[1;32m'

YELLOW='\033[1;33m'

SABRED='\033[1;34m'

SABPURPLE='\033[1;35m'

SABTCYAN='\033[1;36m'

WHITE='\033[1;37m'

while : 

do

printf "${GREEN}︎BLACK-MD - Auto reconexão ativada para prevenção de quedas...\n\n"

node start.js --code

sleep 1

printf "${BLUE}︎Iniciando Sistemas [ ! ]\n"

done
