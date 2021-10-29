import Echo from 'laravel-echo'
window.io = require('socket.io-client');
export default function () {

    
    let broadcaster = $('[data-broadcaster]').data('broadcaster')
    let host = $('[data-host]').data('host')

    if (typeof window.io !== 'undefined') {
     
        window.Echo = new Echo({
            broadcaster,
            host
        });

    }



}