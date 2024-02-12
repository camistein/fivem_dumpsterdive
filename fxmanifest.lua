fx_version 'cerulean'
lua54 'yes'
game 'gta5'

author 'camistein'
description ''
version '1.0.0'

ui_page 'release/html/index.html'

client_script 'release/client/main.js'

server_scripts {
    'release/server/main.js'
}

files { 
    'config/config.json',
    'release/html/index.html',
    'release/html/css/styles.css',
    'release/html/progressbar.js',
    'release/html/notify.js',
    'customFramework.js',
}
