var userId = null;
//datatable page semantic datatable settings
(function (window, document, undefined) {
    var factory = function ($, DataTable) {
        "use strict";

        /* Set the defaults for DataTables initialisation */
        $.extend(true, DataTable.defaults, {
            dom:
            "<'left aligned eight wide column'l><'right aligned eight wide column'f>" +
            "<'sixteen wide column'tr>" +
            "<'left aligned four wide column'i><'right aligned twelve wide column'p>",
            renderer: 'semantic'
        });

        $.extend(DataTable.ext.pager, {
            full_numbers_icon: DataTable.ext.pager.full_numbers
        });

        /* Default class modification */
        $.extend(DataTable.ext.classes, {
            sWrapper: "ui grid dataTables_wrapper ",
            sFilterInput: "",
            sLengthSelect: ""
        });

        /* Bootstrap paging button renderer */
        DataTable.ext.renderer.pageButton.semantic = function (settings, host, idx, buttons, page, pages) {
            var api = new DataTable.Api(settings);
            var classes = settings.oClasses;
            var lang = settings.oLanguage.oPaginate;
            var btnDisplay, btnClass, btnIcon, counter = 0;
            var addIcons = ((!api.init().pagingType ? '' : api.init().pagingType.toLowerCase()).indexOf('icon') !== -1);

            var attach = function (container, buttons) {
                var i, ien, node, button;
                var clickHandler = function (e) {
                    e.preventDefault();
                    if (!$(e.currentTarget).hasClass('disabled')) {
                        api.page(e.data.action).draw('page');
                    }
                };

                for (i = 0, ien = buttons.length ; i < ien ; i++) {
                    button = buttons[i];

                    if ($.isArray(button)) {
                        attach(container, button);
                    }
                    else {
                        btnDisplay = '';
                        btnClass = '';
                        btnIcon = '';
                        switch (button) {
                            case 'ellipsis':
                                btnDisplay = (addIcons ? '<i class="mini ellipsis horizontal icon"></i>' : '&hellip;');
                                btnClass = 'disabled';
                                break;

                            case 'first':
                                btnIcon = (addIcons ? '<i class="angle single left icon"></i>' : '');
                                btnDisplay = btnIcon + lang.sFirst;
                                btnClass = button + (page > 0 ?
                                    '' : ' disabled');
                                break;

                            case 'previous':
                                btnIcon = (addIcons ? '<i class="angle double left icon"></i>' : '');
                                btnDisplay = btnIcon + lang.sPrevious;
                                btnClass = button + (page > 0 ?
                                    '' : ' disabled');
                                break;

                            case 'next':
                                btnIcon = (addIcons ? '<i class="angle double right icon"></i>' : '');
                                btnDisplay = lang.sNext + btnIcon;
                                btnClass = button + (page < pages - 1 ?
                                    '' : ' disabled');
                                break;

                            case 'last':
                                btnIcon = (addIcons ? '<i class="angle single right icon"></i>' : '');
                                btnDisplay = lang.sLast + btnIcon;
                                btnClass = button + (page < pages - 1 ?
                                    '' : ' disabled');
                                break;

                            default:
                                btnDisplay = button + 1;
                                btnClass = page === button ?
                                    'active' : '';
                                break;
                        }

                        if (btnDisplay) {
                            node = $('<a>', {
                                'class': classes.sPageButton + ' ' + btnClass + ' item ',
                                'id': idx === 0 && typeof button === 'string' ?
                                    settings.sTableId + '_' + button :
                                    null
                            }).html(btnDisplay).appendTo(container);

                            settings.oApi._fnBindAction(
                                node, { action: button }, clickHandler
                            );

                            counter++;
                        }
                    }
                }
            };

            // IE9 throws an 'unknown error' if document.activeElement is used
            // inside an iframe or frame.
            var activeEl;

            try {
                // Because this approach is destroying and recreating the paging
                // elements, focus is lost on the select button which is bad for
                // accessibility. So we want to restore focus once the draw has
                // completed
                activeEl = $(host).find(document.activeElement).data('dt-idx');
            }
            catch (e) { }

            attach(
                $(host).empty().html('<div class="ui stackable small pagination menu" />').children('div'),
                buttons
            );

            if (activeEl) {
                $(host).find('[data-dt-idx=' + activeEl + ']').focus();
            }
        };
    }; // /factory

    // Define as an AMD module if possible
    if (typeof define === 'function' && define.amd) {
        define(['jquery', 'datatables'], factory);
    }
    else if (typeof exports === 'object') {
        // Node/CommonJS
        factory(require('jquery'), require('datatables'));
    }
    else if (jQuery) {
        // Otherwise simply initialise as normal, stopping multiple evaluation
        factory(jQuery, jQuery.fn.dataTable);
    }
})(window, document);
function getPageIndex(aDataSet) {
    var pageSize,pageIndex = 1;
    $.each(aDataSet,function () {
        if(this.name && this.name === 'length'){
            pageSize = this.value;
        }
    });
    $.each(aDataSet,function () {
        if(this.name && this.name === 'start'){
            var start = this.value;
            if(start === 0){
                pageIndex = 1;
            }else {
                if(pageSize){
                    pageIndex = start/pageSize + 1;
                }
            }
        }
    });
    return pageIndex;
}
function getPageSize(aDataSet) {
    var pageSize = 10;
    $.each(aDataSet,function () {
        if(this.name && this.name === 'length'){
            pageSize = this.value;
        }
    });
    return pageSize;
}
function returnRoleData(sSource, aDataSet, fnCallback) {
    $.ajax({
        "dataType" : 'json',
        "contentType": "application/json; charset=utf-8",
        "type" : "get",
        "url" : "/role/get-roles",
        "async":false,
        "data" :{
            "pageSize": getPageSize(aDataSet),
            "pageIndex":getPageIndex(aDataSet),
            "userId" : userId
        },
        "success" : function(resp){
            if(resp.code === '0000'){
                fnCallback({
                    "recordsTotal":resp.data.pages,
                    "recordsFiltered":resp.data.total,
                    "data":resp.data.list
                });
                result = resp.data.list;
            }else {
                self.location = "login.html";
            }
        },
        "error":function () {
            self.location = "login.html";
        }
    });
}
function returnData(sSource, aDataSet, fnCallback) {
    $.ajax({
        "dataType" : 'json',
        "contentType": "application/json; charset=utf-8",
        "type" : "get",
        "url" : "/get-user-list",
        "data" :{
            "pageSize": function () {
                var pageSize = 10;
                $.each(aDataSet,function () {
                    if(this.name && this.name === 'length'){
                        pageSize = this.value;
                    }
                });
                return pageSize;
            },
            "pageIndex":function () {
                var pageSize,pageIndex = 1;
                $.each(aDataSet,function () {
                    if(this.name && this.name === 'length'){
                        pageSize = this.value;
                    }
                });
                $.each(aDataSet,function () {
                    if(this.name && this.name === 'start'){
                        var start = this.value;
                        if(start === 0){
                            pageIndex = 1;
                        }else {
                            if(pageSize){
                                pageIndex = start/pageSize + 1;
                            }
                        }
                    }
                });
                return pageIndex;
            }
        },
        "success" : function(resp){
            if(resp.code === '0000'){
                fnCallback({
                    "recordsTotal":resp.data.pages,
                    "recordsFiltered":resp.data.total,
                    "data":resp.data.list
                });
            }else {
                self.location = "login.html";
            }
        },
        "error":function () {
            self.location = "login.html";
        }
    });
}
$(document).ready(function () {
    var baseOption ={
        "pagingType": "full_numbers_icon",
        "serverSide": true,
        "ordering": false,
        "fnServerData":returnData,
        "searching": false,
        "oLanguage": { //国际化配置
            "sProcessing": "正在获取数据，请稍后...",
            "sLengthMenu": "显示 _MENU_ 条",
            "sZeroRecords": "没有您要搜索的内容",
            "sInfo": "从 _START_ 到  _END_ 条记录 总记录数为 _TOTAL_ 条",
            "sInfoEmpty": "记录数为0",
            "sInfoFiltered": "(总页数 _MAX_ 页)",
            "sInfoPostFix": "",
            "sSearch": "搜索",
            "sUrl": "",
            "oPaginate": {
                "sFirst": "第一页",
                "sPrevious": "上一页",
                "sNext": "下一页",
                "sLast": "最后一页"
            }
        },
        "bProcessing" : true, //DataTables载入数据时，是否显示‘进度’提示
        //"destroy" : true,//重载表格清空
        "aoColumns":[],
        "aoColumnDefs":[]
    };
    var userColumns = [{
        "mDataProp" : "userName",
        "sDefaultContent" : "", //此列默认值为""，以防数据中没有此值，DataTables加载数据的时候报错
        "sTitle" : "用户名称",
        "sClass" : "center"
    }, {
        "mDataProp" : "name",
        "sTitle" : "真实姓名",
        "sDefaultContent" : "",
        "sClass" : "center"
    }, {
        "mDataProp" : "sex",
        "sTitle" : "性别",
        "sDefaultContent" : "",
        "sClass" : "center"
    }, {
        "mDataProp" : "status",
        "sTitle" : "状态",
        "sDefaultContent" : "",
        "sClass" : "center"
    }, {
        "mDataProp" : "email",
        "sTitle" : "邮箱",
        "sDefaultContent" : "",
        "sClass" : "center"
    }, {
        "mDataProp" : "idCard",
        "sTitle" : "身份证",
        "sDefaultContent" : "",
        "sClass" : "center"
    }, {
        "mDataProp" : "mobile",
        "sTitle" : "手机号码",
        "sDefaultContent" : "",
        "sClass" : "center"
    }, {
        "mDataProp" : "appName",
        "sTitle" : "所属系统",
        "sDefaultContent" : "",
        "sClass" : "center"
    }, {
        "mDataProp" : "appChn",
        "sTitle" : "所属系统中文名",
        "sDefaultContent" : "",
        "sClass" : "center"
    },{
        "mDataProp" : "id",
        "sTitle" : "操作",
        "sDefaultContent" : "",
        "sClass" : "center",
        "width":"25%"
    }];
    var roleColumns = [{
        "mDataProp" : "id",
        "sDefaultContent" : "",
        "sTitle" : "选择",
        "sClass" : "text-center"
    },{
        "mDataProp" : "roleName",
        "sDefaultContent" : "", //此列默认值为""，以防数据中没有此值，DataTables加载数据的时候报错
        "sTitle" : "系统角色名称",
        "sClass" : "center"
    }, {
        "mDataProp" : "roleType",
        "sTitle" : "角色类型",
        "sDefaultContent" : "",
        "sClass" : "center"
    }, {
        "mDataProp" : "appName",
        "sTitle" : "系统名称",
        "sDefaultContent" : "",
        "sClass" : "center"
    }, {
        "mDataProp" : "appChn",
        "sTitle" : "系统中文名称",
        "sDefaultContent" : "",
        "sClass" : "center"
    }, {
        "mDataProp" : "describe",
        "sTitle" : "角色描述信息",
        "sDefaultContent" : "",
        "sClass" : "center"
    }];
    var userDefColumns = [{
        "aTargets":[2],"mRender":function(data,type,full){
            if(data === "1"){
                return "男";
            }
            if(data === "2"){
                return "女";
            }
            return "未知";
        }},{
        "aTargets":[3],"mRender":function(data,type,full){
            if(data === "00"){
                return "正常";
            }
            if(data === "01"){
                return "过期";
            }
            return "未知";
        }
    },{
        "aTargets":[9],"mRender":function(data,type,full){

            return "<div class=\"ui animated fade button allocation-role\" style='margin-bottom:0px!important;' tabindex=\"0\" data-id='"+data+"'>" +
                "                                    <div class=\"visible content\">分配角色</div>" +
                "                                    <div class=\"hidden content\">" +
                "                                        分配角色" +
                "                                    </div>" +
                "                                </div>" +
                "<div class=\"ui vertical animated button delete\" style='margin-bottom:0px!important;' tabindex=\"0\" data-id='\"+data+\"'>" +
                "                                    <div class=\"visible content\">删除</div>" +
                "                                    <div class=\"hidden content\">" +
                "                                        <i class=\"gray remove icon\"></i>" +
                "                                    </div>" +
                "                                </div>" +
                "<div class=\"ui vertical animated button edit\" style='margin-bottom:0px!important;' tabindex=\"0\" data-id='\"+data+\"'>" +
                "                                    <div class=\"visible content\">编辑</div>" +
                "                                    <div class=\"hidden content\">" +
                "                                        <i class=\"gray edit icon\"></i>" +
                "                                    </div>" +
                "                                </div>" +
                "<div class=\"ui vertical animated button query-user\" style='margin-bottom:0px!important;' tabindex=\"0\" data-id='\"+data+\"'>" +
                "                                    <div class=\"visible content\">查看角色</div>" +
                "                                    <div class=\"hidden content\">" +
                "                                        <i class=\"gray search icon\"></i>" +
                "                                    </div>" +
                "                                </div>" ;
        }
    }];
    var roleDefColumns = [{
        "aTargets":[0],"mRender":function(data,type,full){
            if(full.selected && full.selected === '1'){
                return "<div class=\"ui checkbox\">" +
                    "                                    <input type=\"checkbox\" checked class='user' value='"+data+"'>" +
                    "                                    <label class=\"coloring grey\"></label>" +
                    "                                </div>";
            }
            return "<div class=\"ui checkbox\">" +
                "                                    <input type=\"checkbox\" class='user' value='"+data+"'>" +
                "                                    <label class=\"coloring grey\"></label>" +
                "                                </div>";
        }
    },{
        "aTargets":[2],"mRender":function(data,type,full){
            if(data === "00"){
                return "管理员";
            }
            if(data === "01"){
                return "普通用户";
            }
            return "未知";
        }
    }];
    baseOption.aoColumns = userColumns;
    baseOption.aoColumnDefs = userDefColumns;
    //表格加载完成
    baseOption.fnInitComplete = function (oSettings, json) {
        //加载角色数据
        baseOption.aoColumns = roleColumns;
        baseOption.aoColumnDefs = roleDefColumns;
        baseOption.fnInitComplete = null;
        baseOption.fnServerData = returnRoleData;
        $("div.allocation-role").on('click',function () {
            userId = $(this).data("id");
            $("#role_table").dataTable(baseOption);
            //$("#role_table").dataTable().api().ajax.reload();
            $("#role-modal").modal({
                closable: false,
                onDeny: function () {
                },
                onApprove: function () {
                    //提交后的逻辑处理
                    var checkedRole = $("input.user:checked");
                    var roleIds = "";
                    if(checkedRole && checkedRole.length > 0){
                        $.each(checkedRole,function () {
                            roleIds += $(this).val() + ",";
                        });
                        if(!roleIds || roleIds === ""){
                            $.error("未选择任何用户!");
                            return false;
                        }
                        //执行ajax请求
                        $.post("/role/allocation-users",{userId:userId,roleIds:roleIds},function (resp) {
                            if(!resp){
                                //异常
                                $.error("系统异常,请稍后再试!");
                            }
                            var resultData = JSON.parse(resp);
                            if(resultData.code === "0000"){
                                //正常
                                $.success("处理成功!");
                            }else if(resultData.code === "8001") {
                                //未登录
                                self.location = "/login.html";
                            }else {
                                //异常
                                $.error(resultData.message);
                            }
                            roleIds = "";
                        });
                    }else {
                        $.error("未选择任何用户!");
                        return false;
                    }
                }
            }).modal("show").css({
                width:'1200px',
                "margin-left":'-38%'
            });
        })
    };
    $('#user_table').DataTable(baseOption);
});