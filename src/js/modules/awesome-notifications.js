import AWN from "awesome-notifications"
// Set global options
let globalOptions =  {
    icons: {enabled: false},
    position : "bottom-right",
    durations : {
        global: 1000,
     }
}
// Initialize instance of AWN
window.notifier = new AWN(globalOptions)
