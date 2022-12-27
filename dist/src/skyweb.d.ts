import SkypeAccount from './skype_account';
import ContactsService from './contacts_service';
import ThreadService from "./thread_service";
import Status from "./status/status";
import { Promise } from "es6-promise";
import { Member } from "./thread_service";
export default class Skyweb {
    messagesCallback: (messages: Array<any>) => void;
    skypeAccount: SkypeAccount;
    contactsService: ContactsService;
    private messageService;
    private requestService;
    private statusService;
    private eventEmitter;
    threadService: ThreadService;
    private cookieJar;
    constructor();
    login(username: any, password: any): Promise<{}>;
    sendMessage(conversationId: string, message: string, messagetype?: string, contenttype?: string): void;
    setTopic(conversationId: string, message: string): void;
    setStatus(status: Status): void;
    acceptAuthRequest(username: any): void;
    getAllPendingRequest(): void;
    declineAuthRequest(username: any): void;
    createThread(members: Member[]): Promise<string>;
    on(eventName: string, listener: (eventName: string, content: any) => void): void;
    un(eventName: string, listener: (eventName: string, content: any) => void): void;
}
