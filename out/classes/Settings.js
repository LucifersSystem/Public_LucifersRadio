"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dispatch_REG_Job_IDs = exports.Dispatch_HC_Job_IDs = exports.Rescue_REG_Job_IDs = exports.Rescue_HC_Job_IDs = exports.Police_REG_Job_IDs = exports.Police_HC_Job_IDs = exports.isRadio_Debug = exports.SonoranServerID = exports.SonoranCommunityID = exports.SonoranAPIKey = exports.Dispatch_Jobs = exports.CIVILIAN_Jobs = exports.Rescue_Jobs = exports.Police_Jobs = exports.Dispatch_ChannelID = exports.HTTPS_PORT = exports.HTTP_PORT = exports.SSL_TLS_CACERT_FILENAME = exports.SSL_TLS_CERT_FILENAME = exports.SSL_TLS_PRIVATEKEY_FILENAME = exports.Discord_Community_GUID = exports.Discord_Bot_clientId = exports.Discord_Bot_Token = exports.Community_SQL_DBNAME = exports.Community_SQL_CONN_PASS = exports.Community_SQL_CONN_USERNAME = exports.Community_SQL_CONN_HOST = exports.Community_AuthenticationKey = exports.Community_ClientError_Discord_Channel = exports.Community_SystemLogs_Discord_Channel = exports.Community_Owner = exports.Community_Name = void 0;
var File_1 = require("./File");
// @ts-ignore
var config_File = (0, File_1.ReadJSONFile)("config.json");
exports.Community_Name = config_File.Community_Name;
exports.Community_Owner = config_File.Community_Owner;
exports.Community_SystemLogs_Discord_Channel = config_File.SystemLogs_ChannelID;
exports.Community_ClientError_Discord_Channel = config_File.ClientError_Logs_ChannelID;
exports.Community_AuthenticationKey = config_File.Community_AuthKey;
exports.Community_SQL_CONN_HOST = config_File.SQLHOST;
exports.Community_SQL_CONN_USERNAME = config_File.SQLUSERNAME;
exports.Community_SQL_CONN_PASS = config_File.SQLPASS;
exports.Community_SQL_DBNAME = config_File.SQLDB_NAME;
exports.Discord_Bot_Token = config_File.token;
exports.Discord_Bot_clientId = config_File.clientId;
exports.Discord_Community_GUID = config_File.guildId;
exports.SSL_TLS_PRIVATEKEY_FILENAME = config_File.Privatekey_name;
exports.SSL_TLS_CERT_FILENAME = config_File.Cert_name;
exports.SSL_TLS_CACERT_FILENAME = config_File.CA_CERT_name;
exports.HTTP_PORT = config_File.HTTP_port;
exports.HTTPS_PORT = config_File.HTTPS_port;
exports.Dispatch_ChannelID = config_File.Dispatch_ChannelID;
exports.Police_Jobs = config_File.LEOJOBS; //LEO JOB NAMES THAT WILL HAVE ACCESS TO RADIO CHANNELS
exports.Rescue_Jobs = config_File.RESCUEJOBS; //FIRE AND EMS JOB NAMES THAT WILL HAVE RADIO ACCESS
exports.CIVILIAN_Jobs = config_File.CIVJOBS; //CIVILIAN JOB NAMES THAT WILL HAVE RADIO ACCESS
exports.Dispatch_Jobs = config_File.DISP_JOBS; //DISPATCH JOB NAMES THAT WILL HAVE RADIO ACCESS
exports.SonoranAPIKey = config_File.SonoranAPIKey;
exports.SonoranCommunityID = config_File.SonoranCommunityID;
exports.SonoranServerID = config_File.SonoranServerID;
exports.isRadio_Debug = config_File.isDebug;
exports.Police_HC_Job_IDs = config_File.LEO_HC_COMMAND_IDs;
exports.Police_REG_Job_IDs = config_File.LEO_REG_COMMAND_IDs;
exports.Rescue_HC_Job_IDs = config_File.RESCUE_HC_COMMAND_IDs;
exports.Rescue_REG_Job_IDs = config_File.RESCUE_REG_COMMAND_IDs;
exports.Dispatch_HC_Job_IDs = config_File.Dispatch_HC_COMMAND_IDs;
exports.Dispatch_REG_Job_IDs = config_File.Dispatch_REG_COMMAND_IDs;
