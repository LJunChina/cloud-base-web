(function ($) {
    $.extend({
        "success":function(text,then){
            alter(text,"success",then);
        },
        "error":function (text,then) {
            alter(text,"error",then);
        },
        "info":function (text,then) {
            alter(text,"info",then);
        },
        "confirm":function (title,text,then) {
            confirm(title,text,then);
        }
    });
    function alter(text,type,then) {
        swal({
            text: text,
            type: type,
            confirmButtonText: '确认',
            confirmButtonColor: '#4cd964',
            allowOutsideClick:false
        }).then(then);
    }
    function confirm(title,text,then) {
        swal({
            title: title,
            text: text,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '是',
            cancelButtonText:'否'
        }).then(then)
    }
})(window.jQuery);