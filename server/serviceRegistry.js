'use strict';

// import { throws } from "assert";
// Class that keeps trakc of all services.
// 
class ServiceRegistry {

    constructor(){
        // _ makes service array as private
        this._services = [];
        // timeout in seconds in which we will remove a service from a list
        this._timeout = 30;
    }

    // add a new service, that takes an intent, ip and port
    add(intent, ip, port){
        //unique identifier for a service
        const key = intent+ip+port;
    // check if the service is already registered
    // if the service key doesn't exist initiate the service/object
    // add hash map that allows us to easliy access any element in the array
        if(!this._services[key]){
            // this._services equals an empty object
            this._services[key] = {};
            // timestamp alive or failed to annouce itself
            this._services[key].timestamp = Math.floor(new Date()/ 1000);
            // store the IP
            this._services[key].ip = ip;
            // store the port
            this._services[key].port = port;
            //store the intent
            this._services[key].intent = intent;

            console.log(`From Service Registry, added service for intent ${intent} on ${ip}:${port}`);
            this._cleanup();
            return;
        }

        this._services[key].timestamp = Math.floor(new Date() / 1000);
        console.log(`Updated service for intent ${intent} on ${ip}:${port}`);
        this._cleanup();
    }

    //gets intent, ip, port and delete the element from the array
    remove(intent, ip, port){
        const key = intent + ip + port;
        delete this._services[key];
    }

    // return the first service which matches the intent
    // did not find matcthing intent return null
    get(intent) {
        this._cleanup();
        for(let key in this._services) {
            if(this._services[key].intent == intent) return this._services[key];
        }
        return null;
    }

    // look for service which has expired, 
    _cleanup() {
        const now = Math.floor(new Date() / 1000);
        
        for(let key in this._services) {
            if(this._services[key].timestamp + this._timeout < now) {
                console.log(`Removed service for intent ${this._services[key].intent}`);
                delete this._services[key];
            }
        }
    }

}

module.exports = ServiceRegistry;