import Echo from 'laravel-echo'
window.io = require('socket.io-client');
export default function () {

    

    console.log('started websockets js');

    if (typeof window.io !== 'undefined') {

        window.Echo = new Echo({
            broadcaster: 'socket.io',
            host: 'https://sockets.coinreview.cyou:443',

        });

    }



}