"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var request = require("request");
var Consts = require("./consts");
var es6_promise_1 = require("es6-promise");
var RequestService = (function () {
    function RequestService(cookieJar, eventEmitter) {
        this.requestWithJar = request.defaults({ jar: cookieJar });
        this.eventEmitter = eventEmitter;
    }
    RequestService.prototype.loadAllPendingContacts = function (skypeAccount) {
        var _this = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            _this.requestWithJar.get(Consts.SKYPEWEB_HTTPS + Consts.SKYPEWEB_CONTACTS_HOST + ("/contacts/v2/users/" + skypeAccount.selfInfo.username + "/invites/"), {
                headers: {
                    'X-Skypetoken': skypeAccount.skypeToken
                }
            }, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    resolve(JSON.parse(body));
                }
                else {
                    _this.eventEmitter.fire('error', 'Failed to accept friend.' + error + "/" + JSON.stringify(response));
                    reject(error);
                }
            });
        });
    };
    RequestService.prototype.accept = function (skypeAccount, userName) {
        var _this = this;
        this.requestWithJar.put(Consts.SKYPEWEB_HTTPS + Consts.SKYPEWEB_CONTACTS_HOST + ("/contacts/v2/users/" + skypeAccount._selfInfo.username + "/invites/" + userName + "/accept"), {
            headers: {
                'X-Skypetoken': skypeAccount.skypeToken
            }
        }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                return body ? JSON.parse(body) : { message: "success", result: true };
            }
            else {
                _this.eventEmitter.fire('error', 'Failed to accept friend.' + error + "/" + JSON.stringify(response));
            }
        });
    };
    RequestService.prototype.decline = function (skypeAccount, userName) {
        var _this = this;
        this.requestWithJar.put(Consts.SKYPEWEB_HTTPS + Consts.SKYPEWEB_API_SKYPE_HOST + '/users/self/contacts/auth-request/' + userName + '/decline', {
            headers: {
                'X-Skypetoken': skypeAccount.skypeToken
            }
        }, function (error, response, body) {
            if (!error && response.statusCode === 201) {
                return JSON.parse(body);
            }
            else {
                _this.eventEmitter.fire('error', 'Failed to decline friend.' + error + "/" + JSON.stringify(response));
            }
        });
    };
    return RequestService;
}());
exports.RequestService = RequestService;
exports.default = RequestService;
//# sourceMappingURL=request_service.js.map