(function ($) {
    $.extend({
        "success":function(text){
            alter(text,"success");
        },
        "error":function (text) {
            alter(text,"error");
        },
        "info":function (text) {
            alter(text,"info");
        }
    });
    function alter(text,type) {
        swal({
            text: text,
            type: type,
            confirmButtonText: '确认',
            confirmButtonColor: '#4cd964',
            allowOutsideClick:false
        });
    }
})(window.jQuery);