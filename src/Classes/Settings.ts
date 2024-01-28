import {ReadJSONFile} from "./File";
// @ts-ignore
let config_File = ReadJSONFile("config.json");


export const Community_Name = config_File.Community_Name;
export const Community_Owner = config_File.Community_Owner;
export const Community_SystemLogs_Discord_Channel = config_File.SystemLogs_ChannelID;
export const Community_ClientError_Discord_Channel = config_File.ClientError_Logs_ChannelID;
export const Community_AuthenticationKey = config_File.Community_AuthKey;
export const Community_SQL_CONN_HOST = config_File.SQLHOST;
export const Community_SQL_CONN_USERNAME = config_File.SQLUSERNAME;
export const Community_SQL_CONN_PASS = config_File.SQLPASS;
export const Community_SQL_DBNAME = config_File.SQLDB_NAME;
export const Discord_Bot_Token = config_File.token;
export const Discord_Bot_clientId = config_File.clientId;
export const Discord_Community_GUID = config_File.guildId;
export const SSL_TLS_PRIVATEKEY_FILENAME = config_File.Privatekey_name;
export const SSL_TLS_CERT_FILENAME = config_File.Cert_name;
export const SSL_TLS_CACERT_FILENAME = config_File.CA_CERT_name;
export const HTTP_PORT = config_File.HTTP_port;
export const HTTPS_PORT = config_File.HTTPS_port;
export const Dispatch_ChannelID = config_File.Dispatch_ChannelID;
export const Police_Jobs = config_File.LEOJOBS; //LEO JOB NAMES THAT WILL HAVE ACCESS TO RADIO CHANNELS
export const Rescue_Jobs = config_File.RESCUEJOBS; //FIRE AND EMS JOB NAMES THAT WILL HAVE RADIO ACCESS
export const CIVILIAN_Jobs = config_File.CIVJOBS; //CIVILIAN JOB NAMES THAT WILL HAVE RADIO ACCESS
export const Dispatch_Jobs = config_File.DISP_JOBS; //DISPATCH JOB NAMES THAT WILL HAVE RADIO ACCESS
export const SonoranAPIKey = config_File.SonoranAPIKey;
export const SonoranCommunityID = config_File.SonoranCommunityID;
export const SonoranServerID = config_File.SonoranServerID;
export const isRadio_Debug = config_File.isDebug;
export const Police_HC_Job_IDs = config_File.LEO_HC_COMMAND_IDs;
export const Police_REG_Job_IDs = config_File.LEO_REG_COMMAND_IDs;
export const Rescue_HC_Job_IDs = config_File.RESCUE_HC_COMMAND_IDs;
export const Rescue_REG_Job_IDs = config_File.RESCUE_REG_COMMAND_IDs;
export const Dispatch_HC_Job_IDs = config_File.Dispatch_HC_COMMAND_IDs;
export const Dispatch_REG_Job_IDs = config_File.Dispatch_REG_COMMAND_IDs;