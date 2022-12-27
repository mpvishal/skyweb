"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var request = require("request");
var Consts = require("./consts");
var ContactsService = (function () {
    function ContactsService(cookieJar, eventEmitter) {
        this.requestWithJar = request.defaults({ jar: cookieJar });
        this.eventEmitter = eventEmitter;
    }
    ContactsService.prototype.loadContacts = function (skypeAccount, resolve, reject) {
        var _this = this;
        this.requestWithJar.get(Consts.SKYPEWEB_HTTPS + Consts.SKYPEWEB_CONTACTS_HOST + '/contacts/v1/users/' + skypeAccount.selfInfo.username + '/contacts', {
            headers: {
                'X-Skypetoken': skypeAccount.skypeToken
            }
        }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                _this.contacts = JSON.parse(body).contacts;
                resolve(skypeAccount, _this.contacts);
            }
            else {
                _this.eventEmitter.fire('error', 'Failed to load contacts.');
            }
        });
        this.requestWithJar.get(Consts.SKYPEWEB_HTTPS + Consts.SKYPEWEB_CONTACTS_HOST + ("/contacts/v2/users/" + skypeAccount.selfInfo.username + "/invites/"), {
            headers: {
                'X-Skypetoken': skypeAccount.skypeToken
            }
        }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                _this.invite_contacts = JSON.parse(body).invite_list;
                resolve(skypeAccount, _this.contacts);
            }
            else {
                _this.eventEmitter.fire('error', 'Failed to load contacts.');
            }
        });
    };
    return ContactsService;
}());
exports.ContactsService = ContactsService;
exports.default = ContactsService;
//# sourceMappingURL=contacts_service.js.map