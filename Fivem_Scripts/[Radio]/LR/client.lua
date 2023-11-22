local core = null
local PlayerData = null
local ESX_ENABLED = false -- !!!(CHANGE ME)!!! IF USING ESX SET TRUE

-------------------------ESX----------------------------------------
RegisterNetEvent('esx:playerLoaded')
AddEventHandler('esx:playerLoaded', function(xPlayer)
    PlayerData = xPlayer
    Citizen.Wait(10000)
    print('user job is: ', job.label)
    SendNUIMessage({
       msgType = 'Sync_Character',
       Char_Job = core.PlayerData.job.name
    })
end)


RegisterNetEvent('esx:setJob', function(job, lastJob)
    print('user job is: ', job.label)
    SendNUIMessage({
        msgType = 'Sync_Character',
        Char_Job = PlayerData.job.name
    })
end)
--------------------------------------------------------------------
-------------------------QBCORE-------------------------------------
RegisterNetEvent('QBCore:Client:OnPlayerLoaded', function()
    core = exports['qb-core']:GetCoreObject()
    PlayerData = core.Functions.GetPlayerData()
    print(PlayerData.job.name)
    SendNUIMessage({
    	msgType = 'Sync_Character',
    	Char_Job = PlayerData.job.name
    })
end)

RegisterNetEvent('QBCore:Player:SetPlayerData', function(val)
    PlayerData = val
    SendNUIMessage({
        	msgType = 'Sync_Character',
        	Char_Job = PlayerData.job.name
        })
end)
-------------------------------------------------------------------

Citizen.CreateThread(function()
  while true do
  SendNUIMessage({msgType = 'Req_Sync_Location'})
    Citizen.Wait(10000)
  end
end)

Citizen.CreateThread(function()
	while ESX_ENABLED == true do
		TriggerEvent('esx:getSharedObject', function(obj) core = obj end)
		Citizen.Wait(0)
	end
end)