export default class MessageGroup {
  private _messages: String[] = [];

  constructor() {}

  addMessage(message: String, newLine?: boolean): MessageGroup {
    if (this._messages.length !== 0 && newLine) this._messages.push("");
    this._messages.push(message);

    return this;
  }

  addMessages(messageArr?: string[], ...messages: String[]): MessageGroup {
    if (messages) for (let message of messages) this._messages.push(message);
    if (messageArr)
      for (let message of messageArr) this._messages.push(message);

    return this;
  }

  addBlankLine(amount?: number): MessageGroup {
    if (amount) for (let i = 0; i < amount - 1; i++) this._messages.push("");
    this._messages.push("");

    return this;
  }

  loopMessages(run: Function): void {
    for (let message of this._messages) {
      if (message === "") {
        console.log();
      } else {
        run(message);
      }
    }
  }
}
