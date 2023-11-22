import LoggerMessage from "../types/LoggerMessage";
//@ts-ignore
import MessageGroup from "./MessageGroup";
import ansiColor from "ansi-colors";
import axios from "axios";

const projectName = "API";

export default class Logger {
  private readonly prefix: String;
  private readonly application: String;

  constructor(prefix: String) {
    this.prefix = prefix;
    this.application = projectName;
  }

  private static convertToMessageGroup(
    loggerMessage: LoggerMessage
  ): MessageGroup {
    if (typeof loggerMessage === "string") {
      loggerMessage = new MessageGroup().addMessage(loggerMessage, false);
    } else if (Array.isArray(loggerMessage)) {
      loggerMessage = new MessageGroup().addMessages(loggerMessage);
    }

    return loggerMessage;
  }

  private static formatTime(date: Date): String {
    let dateAsString: String =
      String("00" + (date.getMonth() + 1)).slice(-2) +
      "/" +
      ("00" + date.getDate()).slice(-2) +
      "/" +
      date.getFullYear() +
      " " +
      ("00" + date.getHours()).slice(-2) +
      ":" +
      ("00" + date.getMinutes()).slice(-2) +
      ":" +
      ("00" + date.getSeconds()).slice(-2);

    return ansiColor.blackBright.bold(`[${dateAsString}]`);
  }

  public info(loggerMessage: LoggerMessage): void {
    let messageGroup: MessageGroup =
      Logger.convertToMessageGroup(loggerMessage);
    const formattedMode = ansiColor.blue.bold(`[INFO]`);

    messageGroup.loopMessages((text: String) => {
      const formattedText = ansiColor.blue(`${text}`);

      console.log(
        Logger.formatTime(new Date()),
        this.formatApplication(),
        this.formatPrefix(),
        formattedMode,
        formattedText
      );
    });
  }

  discord = new (class Discord {
    // @ts-ignore
    #webhook = process.env.DISCORD_WEBHOOK || "";

    public error(data?: {
      title?: string;
      fields?: { name: string; value: string; inline?: boolean }[];
      color?: string;
      description?: string;
    }) {
      this.#postWebhook({
        embeds: [
          {
            title:
              data?.title ||
              `Error reported in ${
                process.env.DEVELOPMENT ? "Development" : "Production"
              }`,
            color: data?.color || 16711680,
            fields: data?.fields,
            description: data?.description,
            author: {
              name: new Date(Date.now()).toUTCString(),
            },
          },
        ],
        username: "Lucifer's API",
        avatar_url:
          "https://www.onlygfx.com/wp-content/uploads/2019/10/10-grunge-gothic-cross-10.png?width=468&height=468",
      });
    }

    public info(
      data?:
        | string
        | {
            title?: string;
            fields?: { name: string; value: string; inline?: boolean }[];
            color?: string;
            description?: string;
          }
    ) {
      if (typeof data === "string") {
        data = {
          description: data,
        };
      }

      this.#postWebhook({
        content: null,
        embeds: [
          {
            title:
              data?.title ||
              `Information logged from ${
                process.env.DEVELOPMENT ? "Development" : "Production"
              }`,
            color: data?.color || 44543,
            fields: data?.fields,
            description: data?.description,
            author: {
              name: new Date(Date.now()).toUTCString(),
            },
          },
        ],
        username: "Lucifer's API",
                avatar_url:
                  "https://www.onlygfx.com/wp-content/uploads/2019/10/10-grunge-gothic-cross-10.png?width=468&height=468",
      });
    }

    // @ts-ignore
    #postWebhook = async (data: any) => {
      await axios.post(this.#webhook, data);
    };
  })();

  public warn(loggerMessage: LoggerMessage): void {
    let messageGroup: MessageGroup =
      Logger.convertToMessageGroup(loggerMessage);
    const formattedMode = ansiColor.yellow.bold(`[WARNING]`);

    messageGroup.loopMessages((text: String) => {
      const formattedText = ansiColor.yellow(`${text}`);

      console.log(
        Logger.formatTime(new Date()),
        this.formatApplication(),
        this.formatPrefix(),
        formattedMode,
        formattedText
      );
    });
  }

  public error(loggerMessage: LoggerMessage): void {
    let messageGroup: MessageGroup =
      Logger.convertToMessageGroup(loggerMessage);
    const formattedMode = ansiColor.red.bold(`[ERROR]`);

    messageGroup.loopMessages((text: String) => {
      const formattedText = ansiColor.red(`${text}`);

      console.log(
        Logger.formatTime(new Date()),
        this.formatApplication(),
        this.formatPrefix(),
        formattedMode,
        formattedText
      );
    });
  }

  public debug(loggerMessage: LoggerMessage): void {
    if (process.env.DEVELOPMENT != "true") return;

    let messageGroup: MessageGroup =
      Logger.convertToMessageGroup(loggerMessage);
    const formattedMode = ansiColor.magenta.bold(`[DEBUG]`);

    messageGroup.loopMessages((text: String) => {
      const formattedText = ansiColor.magenta(`${text}`);

      console.log(
        Logger.formatTime(new Date()),
        this.formatApplication(),
        this.formatPrefix(),
        formattedMode,
        formattedText
      );
    });
  }

  public success(loggerMessage: LoggerMessage): void {
    let messageGroup: MessageGroup =
      Logger.convertToMessageGroup(loggerMessage);
    const formattedMode = ansiColor.green.bold(`[SUCCESS]`);

    messageGroup.loopMessages((text: String) => {
      const formattedText = ansiColor.green(`${text}`);

      console.log(
        Logger.formatTime(new Date()),
        this.formatApplication(),
        this.formatPrefix(),
        formattedMode,
        formattedText
      );
    });
  }

  private formatPrefix(): String {
    return ansiColor.cyanBright.bold(`[${this.prefix}]`);
  }

  private formatApplication(): String {
    return ansiColor.greenBright.bold(`[${this.application}]`);
  }
}
