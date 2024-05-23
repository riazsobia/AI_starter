//With strict mode, you can not, for example, use undeclared variables.
'use strict';

// setting up the express server
const express = require('express');
const service = express();
const ServiceRegistry = require('./serviceRegistry');
const serviceRegistry = new ServiceRegistry();

//express provides a way to store data for reuse
//store service registry object
service.set('serviceRegistry', serviceRegistry)
// make microservice resilience -- add flexibity and ability to recover service registry
// the service need to know the endpoint of the main application 
// below is the service registry

//service.get('/service/:intent/:port', (req, res, next) =>{
service.put('/service/:intent/:port', (req, res, next) =>{
    const serviceIntent = req.params.intent;
    const servicePort = req.params.port;

    // check if it is an IPv6 address check if it inclues ('::') if it does we use a ternary syntax ? ``, if it is a IPv6 we need to put it in curly brakctes
    const serviceIp = req.connection.remoteAddress.includes('::')
    ?`[${req.connection.remoteAddress}]` : req.connection.remoteAddress;

    serviceRegistry.add(serviceIntent, serviceIp, servicePort);
    res.json({result: `${serviceIntent} at ${serviceIp}:${servicePort}`})

});

//exporting the service
module.exports = service;

// change service to get to check if service is working, result is like below:
//http://localhost:3000/service/time/3010
//{"result":"time at [::1]:3010"}