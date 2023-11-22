Requires:
Mysql
Node 18x
A SSL/TLS CERT

DISCORD: https://discord.gg/6r8f6mQvZa
Please join :)

THIS RADIO REQUIRES YOU TO SETUP AND CONFIGURE THE RELEVANT JOBS AS THE CLIENT WILL ONLY SEE THE RELEVANT AUTHORIZED RADIO CHANNELS, IF ANY.
EVERY RADIO CHANNEL HAS ITS OWN GENERATED ID, FOR SECURITY REASONS.

MY RADIO HAS FULL ESX AND QBCORE INTEGRATION!!!

------------------------------------------------------------------
START COMMAND: npm start
------------------------------------------------------------------

THIS RADIO WAS CREATED BY MATTHEW J. (lucifer6661771)

!!!!MAKE SURE TO FILL OUT THE CONFIG.JSON FILE!!!


THIS RADIO USES THE FALLOWING PORTS ARE SET AS DEFAULT:
9000  -- SSL/TLS (SOCKET AND WEB-API)
9001  -- NO SSL/TLS (WEB-API)

THIS RADIO REQUIRES A VALID SSL/TLS CERT!!! (Old Openssl Versions Only)
THE SOCKET USES THE SAME SSL/TLS AS THE WEB SERVER!!!!
---------------------------------------------------------------------
THE FALLOWING CERT FILES ARE REQUIRED TO BE IN THE OF THE GIT FOLDER:
PRIVATE KEY;
CERT FILE;
CA File;
-----------------------------------------------------------------------
THIS RADIO SERVER REQUIRES A MYSQL SERVER!! -- (I USED XAMPP)

THIS RADIO REQUIRES A DISCORD BOT

THE DISCORD BOT COMMANDS ARE THE FALLOWING:

/newchannel --Instantly Creates a radio Channel
/removechannel -- Instantly removes a radio Channel
/adduser  --- Adds a Authorized User who can manage some of the radio functions
/viewchannels -- Allows you to view all radio channels
/syncuser --- Required soo fivem radio users can connect to the server (All it dose is just gather basic user information and make a user object in the DS)
/netmsg -- Allows someone from discord to send a message from discord to a radio active user in fivem by just running a command.


RUN THE SQL COMMANDS IN YOUR DB SERVER

---
CREATE TABLE `radio_authorizedadmins` (
  `ID` int(11) NOT NULL,
  `CommunityKey` text NOT NULL,
  `DiscordID` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;


CREATE TABLE `radio_registeredchannels` (
  `communitykey` text NOT NULL,
  `channelID` int(11) NOT NULL,
  `channelName` text NOT NULL,
  `creatordiscordID` text NOT NULL,
  `date` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

CREATE TABLE `radio_syncedusers` (
  `ID` int(11) NOT NULL,
  `data` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE `radio_syncedusers`
  ADD PRIMARY KEY (`ID`);
ALTER TABLE `radio_syncedusers`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
----

