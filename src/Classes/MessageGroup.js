"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MessageGroup = /** @class */ (function () {
    function MessageGroup() {
        this._messages = [];
    }
    MessageGroup.prototype.addMessage = function (message, newLine) {
        if (this._messages.length !== 0 && newLine)
            this._messages.push("");
        this._messages.push(message);
        return this;
    };
    MessageGroup.prototype.addMessages = function (messageArr) {
        var messages = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            messages[_i - 1] = arguments[_i];
        }
        if (messages)
            for (var _a = 0, messages_1 = messages; _a < messages_1.length; _a++) {
                var message = messages_1[_a];
                this._messages.push(message);
            }
        if (messageArr)
            for (var _b = 0, messageArr_1 = messageArr; _b < messageArr_1.length; _b++) {
                var message = messageArr_1[_b];
                this._messages.push(message);
            }
        return this;
    };
    MessageGroup.prototype.addBlankLine = function (amount) {
        if (amount)
            for (var i = 0; i < amount - 1; i++)
                this._messages.push("");
        this._messages.push("");
        return this;
    };
    MessageGroup.prototype.loopMessages = function (run) {
        for (var _i = 0, _a = this._messages; _i < _a.length; _i++) {
            var message = _a[_i];
            if (message === "") {
                console.log();
            }
            else {
                run(message);
            }
        }
    };
    return MessageGroup;
}());
exports.default = MessageGroup;
