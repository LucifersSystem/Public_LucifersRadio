local core = exports['qb-core']:GetCoreObject()

exports('Drawgps', function(x,y,z)
	print("Drawing GPS Route")
    ClearGpsCustomRoute()
    StartGpsMultiRoute(6, false, true)
    AddPointToGpsCustomRoute(x,y,y)
    SetGpsCustomRouteRender(true, 16, 16)
end)
exports('setDispJob', function(DiscordID)
    local Player = QBCore.Functions.GetPlayerData()
	print("Checking Dispatch Job For: "..DiscordID)

end)

exports('dispUpdate', function(btn01,btn02,btn03,btn04,btn05,ln01,ln02,zn,ch)
	SendNUIMessage({
		action = 'dispUpdate',
		display = {
			btn01 = btn01,
			btn02 = btn02,
			btn03 = btn03,
			btn04 = btn04,
			btn05 = btn05,
			ln01 = ln01,
			ln02 = ln02,
			zn = zn,
			ch = ch
		}
	})
end)

exports('lnUpdate', function(ln01,ln02,zn,ch)
	SendNUIMessage({
		action = 'lnUpdate',
		display = {
			ln01 = ln01,
			ln02 = ln02,
			zn = zn,
			ch = ch
		}
	})
end)


open = false

focused = false

exports('focus', function()
	SendNUIMessage({
		action = 'focus'
	})
	SetNuiFocus(true,true)
	focused = true
end)

exports('unfocus', function()
	SetNuiFocus(false,false)
	focused = false
end)

exports('toggleFocus', function()
	if(focused) then
		SetNuiFocus(false,false)
		focused = false
	else
		SetNuiFocus(true,true)
		focused = true
	end
end)

exports('toggle', function()
	if(open) then
		SetNuiFocus(false,false)
		focused = false
		SendNUIMessage({
			action = 'close'
		})
		open = false
	else
		SendNUIMessage({
			action = 'open'
		})
		open = true
	end
end)

openRadio = function()
	SendNUIMessage({
		action = 'open'
	})
	open = true
end
exports('open', function()
    openRadio()
end)
closeRadio = function()
    SetNuiFocus(false,false)
    focused = false
    SendNUIMessage({
        action = 'close'
    })
    open = false
end
exports('close', function()
    closeRadio()
end)

exports('setVisibility',function(state)
    if(state) then
        openRadio()
    else
        closeRadio()
    end
end)

exports('powerOff', function()
	SendNUIMessage({
		action = 'powerOff'
	})
end)

exports('showAlert', function(message)
	SendNUIMessage({
		action = 'alert',
		message = message
	})
end)

RegisterNUICallback('btnPress', function(data, cb)
	    local btnID = data.btnID
		TriggerEvent('radioInternal:btnPress',btnID)
		cb({ok=true})
end)

RegisterNUICallback('init', function(data, cb)
	SendNUIMessage({
		action = 'init'
	})
	TriggerEvent('radioInternal:init')
	cb({ok=true})
end)

function setModel(model)
	SendNUIMessage({
		action = 'setModel',
		model = model
	})
end

RegisterNetEvent("radioInternal:setModel")
AddEventHandler("radioInternal:setModel",function(model)
	setModel(model)
end)

exports('setModel', function(model)
	setModel(model)
end)

RegisterNUICallback('releaseFocus', function(data,cb)
    SetNuiFocus(false,false)
    focused = false
end)

