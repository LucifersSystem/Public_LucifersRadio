fx_version 'bodacious'
name 'Lucifer Systems Radio'
description 'Lucifer Systems Radio'
author 'Matthew J.'
version 'v1.0.1'
url 'https://lucifersapi.live'
games { 'gta5' }
client_scripts {
    'client.lua',
    'LuciferSystems.Client.net.dll'
}

files {
    'Newtonsoft.Json.dll',
    'nui/*.html',
    'nui/*.js'
}

server_scripts {
'LuciferSystems.Server.net.dll'
}
ui_page 'nui/client.html'
