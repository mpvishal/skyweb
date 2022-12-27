import { CookieJar } from "request";
import { EventEmitter } from "./utils";
import { Promise } from "es6-promise";
export declare class RequestService {
    private requestWithJar;
    private eventEmitter;
    constructor(cookieJar: CookieJar, eventEmitter: EventEmitter);
    loadAllPendingContacts(skypeAccount: any): Promise<{}>;
    accept(skypeAccount: any, userName: any): void;
    decline(skypeAccount: any, userName: any): void;
}
export default RequestService;
