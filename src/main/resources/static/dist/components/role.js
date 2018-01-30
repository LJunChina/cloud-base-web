
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
var roleId = null;
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
function returnData(sSource, aDataSet, fnCallback) {
    $.ajax({
        "dataType" : 'json',
        "contentType": "application/json; charset=utf-8",
        "type" : "get",
        "url" : "/role/get-roles",
        "data" :{
            "pageSize": getPageSize(aDataSet),
            "pageIndex":getPageIndex(aDataSet)
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
function returnAuthData(sSource, aDataSet, fnCallback) {
    console.log(aDataSet);
    $.ajax({
        "dataType" : 'json',
        "contentType": "application/json; charset=utf-8",
        "type" : "get",
        "url" : "/auth/get-all-auth",
        "data" :{
            "itemType":"1",
            "roleId":roleId,
            "pageSize": getPageSize(aDataSet),
            "pageIndex":getPageIndex(aDataSet)
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
    var option = {
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
        "aoColumns" : [{
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
        },{
            "mDataProp" : "id",
            "sTitle" : "操作",
            "sDefaultContent" : "",
            "sClass" : "center",
            "width":"32%"
        }],
        "aoColumnDefs":[{
            "aTargets":[1],"mRender":function(data,type,full){
                if(data === "00"){
                    return "管理员";
                }
                if(data === "01"){
                    return "普通用户";
                }
                return "未知";
            }
        },{
            "aTargets":[5],"mRender":function(data,type,full){

                return "<div class=\"ui animated fade button allocation\" style='margin-bottom:0px!important;' tabindex=\"0\" data-id='"+data+"'>" +
                    "                                    <div class=\"visible content\">分配菜单</div>" +
                    "                                    <div class=\"hidden content\">" +
                    "                                        分配菜单" +
                    "                                    </div>" +
                    "                                </div>" +
                    "<div class=\"ui animated fade button allocation-op\" style='margin-bottom:0px!important;' tabindex=\"0\" data-id='"+data+"'>" +
                    "                                    <div class=\"visible content\">分配操作</div>" +
                    "                                    <div class=\"hidden content\">" +
                    "                                        分配操作" +
                    "                                    </div>" +
                    "                                </div>"+
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
                    "                                    <div class=\"visible content\">查看用户</div>" +
                    "                                    <div class=\"hidden content\">" +
                    "                                        <i class=\"gray search icon\"></i>" +
                    "                                    </div>" +
                    "                                </div>" ;
            }
        }],
        "fnInitComplete":loadEvent
    };
    $('#data_table').DataTable(option);
    //加载用户列表数据
    var authOption = {
        "pagingType": "full_numbers_icon",
        "serverSide": true,
        "ordering": false,
        "fnServerData":returnAuthData,
        "searching": false,
        "oLanguage": { //国际化配置
            "sProcessing": "正在获取数据，请稍后...",
            "sLengthMenu": "显示 _MENU_ 条",
            "sZeroRecords": "没有您要搜索的内容",
            "sInfo": " _START_ 到  _END_ 条 总记录数 _TOTAL_ 条",
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
        "aoColumns" : [{
            "mDataProp" : "id",
            "sDefaultContent" : "",
            "sTitle" : "选择",
            "sClass" : "text-center"
        },{
            "mDataProp" : "name",
            "sDefaultContent" : "", //此列默认值为""，以防数据中没有此值，DataTables加载数据的时候报错
            "sTitle" : "菜单名称",
            "sClass" : "center"
        }, {
            "mDataProp" : "itemUri",
            "sTitle" : "请求路径",
            "sDefaultContent" : "",
            "sClass" : "center"
        }, {
            "mDataProp" : "parentName",
            "sTitle" : "父级菜单名称",
            "sDefaultContent" : "",
            "sClass" : "center"
        }, {
            "mDataProp" : "appName",
            "sTitle" : "所属系统",
            "sDefaultContent" : "",
            "sClass" : "center"
        },{
            "mDataProp" : "icon",
            "sTitle" : "菜单图标样式",
            "sDefaultContent" : "",
            "sClass" : "center"
        }],
        "aoColumnDefs":[{
            "aTargets":[0],"mRender":function(data,type,full){
               if(full.selected && full.selected === '1'){
                   return "<div class=\"ui checkbox\">" +
                       "                                    <input type=\"checkbox\" class='user' checked='checked' value='"+data+"'>" +
                       "                                    <label class=\"coloring grey\"></label>" +
                       "                                </div>";
               }
                return "<div class=\"ui checkbox\">" +
                    "                                    <input type=\"checkbox\" class='user' value='"+data+"'>" +
                    "                                    <label class=\"coloring grey\"></label>" +
                    "                                </div>";
            }
        }]
    };
    $('#user_table').DataTable(authOption);
    function loadEvent(oSettings, json) {
        //分配菜单
        $("div.allocation").on('click',function () {
            roleId = $(this).data("id");
            //重新加载数据
            $("#user_table").dataTable().api().ajax.reload();
            $("#user-modal").modal({
                closable: false,
                onDeny: function () {
                },
                onApprove: function () {
                   //提交后的逻辑处理
                    var checkedUser = $("input.user:checked");
                    var authIds = "";
                    if(checkedUser && checkedUser.length > 0){
                        $.each(checkedUser,function () {
                            authIds += $(this).val() + ",";
                        });
                        if(!authIds || authIds === ""){
                            $.error("未选择任何资源!",null);
                            return false;
                        }
                        //执行ajax请求，菜单
                        $.post("/auth/allocation-auth",{authIds:authIds,roleId:roleId,itemType:'1'},function (resp) {
                            if(!resp){
                                //异常
                                $.error("系统异常,请稍后再试!",null);
                            }
                            var resultData = JSON.parse(resp);
                            if(resultData.code === "0000"){
                                //正常
                                $.success("处理成功!",null);
                            }else if(resultData.code === "8000") {
                                //未登录
                                self.location = "/login.html";
                            }else {
                                //异常
                                $.error(resultData.message,null);
                            }
                        });
                    }else {
                        $.error("未选择任何用户!",null);
                        return false;
                    }
                }
            }).modal("show").css({
                width:'1200px',
                "margin-left":'-38%'
            });
        });
        //分配操作
        $("div.allocation-op").on('click',function () {
            roleId = $(this).data("id");
            //加载操作数据
            var aoColumn = [{
                "mDataProp" : "id",
                "sDefaultContent" : "",
                "sTitle" : "选择",
                "sClass" : "text-center"
            },{
                "mDataProp" : "name",
                "sDefaultContent" : "", //此列默认值为""，以防数据中没有此值，DataTables加载数据的时候报错
                "sTitle" : "操作名称",
                "sClass" : "center"
            }, {
                "mDataProp" : "itemUri",
                "sTitle" : "请求路径",
                "sDefaultContent" : "",
                "sClass" : "center"
            }, {
                "mDataProp" : "appName",
                "sTitle" : "所属系统",
                "sDefaultContent" : "",
                "sClass" : "center"
            }];
            var aoColumnDefs = [{
                "aTargets":[0],"mRender":function(data,type,full){
                    if(full.selected && full.selected === '1'){
                        return "<div class=\"ui checkbox\">" +
                            "                                    <input type=\"checkbox\" class='user' checked='checked' value='"+data+"'>" +
                            "                                    <label class=\"coloring grey\"></label>" +
                            "                                </div>";
                    }
                    return "<div class=\"ui checkbox\">" +
                        "                                    <input type=\"checkbox\" class='user' value='"+data+"'>" +
                        "                                    <label class=\"coloring grey\"></label>" +
                        "                                </div>";
                }
            }];

            createDataTable(function(sSource, aDataSet, fnCallback){
                var params = {
                    "pageIndex":getPageSize(aDataSet),
                    "pageSize" : getPageSize(aDataSet),
                    "itemType" : '0',
                    "roleId":roleId
                };
                serverAjaxData("/auth/get-all-auth",'get',fnCallback,params);
            },aoColumn,aoColumnDefs,null,'#operation-table');
            $("#operation-table").dataTable().api().ajax.reload();
            $("#operation-modal").modal({
                closable: false,
                onDeny: function () {
                },
                onApprove: function () {
                    //提交后的逻辑处理
                    var checkedUser = $("input.user:checked");
                    var authIds = "";
                    if(checkedUser && checkedUser.length > 0){
                        $.each(checkedUser,function () {
                            authIds += $(this).val() + ",";
                        });
                        if(!authIds || authIds === ""){
                            $.error("未选择任何资源!",null);
                            return false;
                        }
                        //执行ajax请求，菜单
                        $.post("/auth/allocation-auth",{authIds:authIds,roleId:roleId,itemType:'0'},function (resp) {
                            if(!resp){
                                //异常
                                $.error("系统异常,请稍后再试!",null);
                            }
                            var resultData = JSON.parse(resp);
                            if(resultData.code === "0000"){
                                //正常
                                $.success("处理成功!",null);
                            }else if(resultData.code === "8000") {
                                //未登录
                                self.location = "/login.html";
                            }else {
                                //异常
                                $.error(resultData.message,null);
                            }
                        });
                    }else {
                        $.error("未选择任何用户!",null);
                        return false;
                    }
                }
            }).modal("show").css({
                width:'1200px',
                "margin-left":'-38%'
            });
        });
    }
});