
var uuid = require('node-uuid');
var dgram = require('dgram');
var socket = dgram.createSocket('udp4');

function musician (instrument) {
    this.instrument = instrument;
    this.uuid = uuid.v1();

        musician.prototype.whoIsPlaying = function(){

            switch(this.instrument) {
                case 'piano' : this.sound = 'ti-ta-ti';
                                break;
                case 'trumpet' : this.sound = 'pouet';
                                break;
                case 'flute' : this.sound = 'trulu';
                                break;
                case 'violin' : this.sound = 'gzi-gzi';
                                break;
                case 'drum' : this.sound = 'boum-boum';
                                break;
            }

            var play =  {
                uuid : this.uuid, 
                sound : this.sound  
            };

            var payload = JSON.stringify(play);

            message = new Buffer(payload);

            socket.send(message, 0 , message.length,  2204 , "239.255.22.5", function(err, bytes) {
                console.log(payload + "is playing via port " + socket.address().port);
            });

        }

            setInterval(this.whoIsPlaying.bind(this), 1000);
}

var instrument = process.argv[2];
var musician = new musician (instrument);