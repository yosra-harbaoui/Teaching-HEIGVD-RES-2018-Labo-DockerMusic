var dgram = require('dgram');   
var net = require('net');
var moment = require('moment');

var musicians = new Map();

var socket = dgram.createSocket('udp4');

socket.bind( 2204 , function() {
    console.log("auditor is listening...");
});

socket.on("listening", () => {
	 socket.addMembership("239.255.22.5");

    console.log("Socket : %j", socket.address());
});

socket.on('message', function(msg , source){

    msg = JSON.parse(msg);

    var instrument;

    switch(msg.sound) {
            case 'ti-ta-ti' : instrument = 'piano';
                            break;
            case 'pouet' : instrument = 'trumpet';
                            break;
            case 'trulu' : instrument = 'flute';
                            break;
            case 'gzi-gzi' : instrument = 'violin';
                            break;
            case 'boum-boum' : instrument = 'drum';
                            break;
        }

    var musician = {
        'uuid': msg.uuid,
        'instrument': instrument,
        'activeSince': moment().toISOString()
    };

    musicians.set(musician.uuid, musician);

    console.log(musician);
});

var server = net.createServer();

server.on("listening", callbackIsBound);
server.on("connection", callbacknNewClient);

server.listen(2205, "0.0.0.0");

function callbackIsBound() {
    console.log("Server : %j", server.address());
}

function callbacknNewClient(socket) {
    console.log("new client : " + socket.remoteAddress + ":" + socket.remotePort);

    var values = new Array();

    musicians.forEach(function (item, key, mapObj) {
        
        if (moment().diff(item.activeSince, 'seconds') > 5) {
            musicians.delete(key);
        } else {
            values.push(item);
        }

    });

    socket.write(JSON.stringify(values) + "\n");
    socket.end();
} 