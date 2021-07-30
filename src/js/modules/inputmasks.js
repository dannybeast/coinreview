import IMask from 'imask';
// https://imask.js.org/guide.html#getting-started
if (typeof NodeList.prototype.forEach !== 'function')  {
    NodeList.prototype.forEach = Array.prototype.forEach;
}
export default function () {

    // Mask phone
    document.querySelectorAll('.js-phone-mask').forEach((input) => {
        IMask(
            input, {
                mask: '+0(000)000-00-00'
            });
    });


    document.querySelectorAll('.js-card-mask').forEach((input) => {
        IMask(
            input, {
                mask: '0000 0000 0000 0000'
            });
    });

    document.querySelectorAll('.js-mm-mask').forEach((input) => {
        IMask(
            input, {
                mask: '00'
            });
    });

    document.querySelectorAll('.js-cvv-mask').forEach((input) => {
        IMask(
            input, {
                mask: '000'
            });
    });

    document.querySelectorAll('.js-date-mask').forEach((input) => {
        IMask(
            input, {
                mask: '00/00/0000'
            });
    });
    document.querySelectorAll('.js-passport-mask').forEach((input) => {
        IMask(
            input, {
                mask: '0000 000000'
            });
    });
}