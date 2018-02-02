var roleAoColumn = [{
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
}];
var roleAoColumnDefs = [{
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
}];
var authAoColumn = [{
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
}];
var operationAoColumn = [{
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
var authAoColumnDefs = [{
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
var operationAoColumnDefs = [{
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
var roleId = null;
function loadEvent(oSettings, json) {
    //分配菜单
    $("div.allocation").on('click',function () {
        roleId = $(this).data("id");
        //重新加载数据
        createDataTable(function(sSource, aDataSet, fnCallback){
            var params = {
                "pageIndex":getPageSize(aDataSet),
                "pageSize" : getPageSize(aDataSet),
                "itemType" : '1',
                "roleId":roleId
            };
            serverAjaxData("/auth/get-all-auth",'get',fnCallback,params);
        },authAoColumn,authAoColumnDefs,null,'#user_table');
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
                    $.error("未选择任何资源!",null);
                    return false;
                }
            }
        }).modal("show").css({
            width:'1200px',
            "margin-left":'-38%',
            "margin-top" :'-300px'
        });
    });
    //分配操作
    $("div.allocation-op").on('click',function () {
        roleId = $(this).data("id");
        //加载操作数据
        createDataTable(function(sSource, aDataSet, fnCallback){
            var params = {
                "pageIndex":getPageSize(aDataSet),
                "pageSize" : getPageSize(aDataSet),
                "itemType" : '0',
                "roleId":roleId
            };
            serverAjaxData("/auth/get-all-auth",'get',fnCallback,params);
        },operationAoColumn,operationAoColumnDefs,null,'#operation-table');
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
            "margin-left":'-38%',
            "margin-top" :'-300px'
        });
    });
}
function initTable(aoColumn,aoColumnDefs,url,dom) {
    createDataTable(function(sSource, aDataSet, fnCallback){
        var params = {
            "pageIndex":getPageIndex(aDataSet),
            "pageSize" : getPageSize(aDataSet)
        };
        serverAjaxData(url,'get',fnCallback,params);
    },aoColumn,aoColumnDefs,loadEvent,dom);
}
$(document).ready(function () {
    //角色列表数据
    initTable(roleAoColumn,roleAoColumnDefs,"/role/get-roles","#role_table");
});