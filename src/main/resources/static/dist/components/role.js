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
            "<div class=\"ui vertical animated button delete-role\" style='margin-bottom:0px!important;' tabindex=\"0\" data-id='"+data+"'>" +
            "                                    <div class=\"visible content\">删除</div>" +
            "                                    <div class=\"hidden content\">" +
            "                                        <i class=\"gray remove icon\"></i>" +
            "                                    </div>" +
            "                                </div>" +
            "<div class=\"ui vertical animated button edit-role\" style='margin-bottom:0px!important;' tabindex=\"0\" data-id='"+data+"'>" +
            "                                    <div class=\"visible content\">编辑</div>" +
            "                                    <div class=\"hidden content\">" +
            "                                        <i class=\"gray edit icon\"></i>" +
            "                                    </div>" +
            "                                </div>" +
            "<div class=\"ui vertical animated button query-user\" style='margin-bottom:0px!important;' tabindex=\"0\" data-id='"+data+"'>" +
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
function updateForm(updateRoleId) {
    var formData = $('#update-role input').serializeArray();
    $.post("/role/update/" + updateRoleId,formData,function (data) {
        var resultData = JSON.parse(data);
        if(resultData.code === '0000'){
            $.success("处理成功！",function (e) {
                if(e){
                    $(".ui.modal.standard").modal('hide');
                    initTable(roleAoColumn,roleAoColumnDefs,"/role/get-roles","#role_table");
                }
            });
        }else if(resultData.code === '8001' || resultData.code === '9014' || resultData.code === '7000'){
            $.info(resultData.message,function (e) {
                if(e){
                    self.location.reload(true);
                }
            });
        }else {
            $.error(resultData.message,null);
        }
    });
}
function loadEvent(oSettings, json) {
    //此处添加事件只能使用先选择表格再过滤出孩子节点,其他点击事件的写法在分页后会导致失效
    //分配菜单
    $("#role_table").on('click','div.allocation',function () {
        roleId = $(this).data("id");
        //重新加载数据
        createDataTable(function(sSource, aDataSet, fnCallback){
            var params = {
                "pageIndex":getPageIndex(aDataSet),
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
    $("#role_table").on('click','div.allocation-op',function () {
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
    //删除操作
    $("#role_table").on('click','div.delete-role',function () {
        var deleteRoleId = $(this).data('id');
        $.confirm('确定要删除吗?','这会导致该角色所有功能不可用',function (e) {
            if(e){
                $.post('/role/delete/' + deleteRoleId,null,function (delResp) {
                    var result = JSON.parse(delResp);
                    if(result && result.code === '0000'){
                        $.success("删除成功",function (e) {
                            //刷新列表
                            initTable(roleAoColumn,roleAoColumnDefs,"/role/get-roles","#role_table");
                        });
                    }else if(result.code === '8001' || result.code === '7000' || result.code === '9014'){
                        $.info(result.message,null);
                        self.location = 'index.html';
                    }else {
                        $.error(result.code,null);
                    }
                });
            }
        });
    });
    //更新操作
    $("#role_table").on('click','div.edit-role',function () {
        var updateRoleId = $(this).data('id');
        $.getJSON('/role/get/'+ updateRoleId,null,function (resp) {
            if (resp.code === '0000') {
                //填充到modal
                $("#update-role input[name='roleName']").val(resp.data.roleName);
                $("#update-role input[name='roleType'][value='" + resp.data.roleType + "']").attr('checked', true);
                $("#update-role input[name='describe']").val(resp.data.describe);
                //加载系统信息列表
                $.getJSON('/system-info/get-system-info',{pageIndex:1,pageSize:99999},function (systemResp) {
                    if(systemResp && systemResp.code === '0000'){
                        var list = systemResp.data.list;
                        var objectValues = [];
                        if(list && list.length > 0){
                            $("#update-system-data").html("");
                            $.each(list,function () {
                                if(resp.data.appId === this.id){
                                    //设置dropDown的默认值
                                    objectValues.push({
                                        "name":this.systemName,
                                        "value":this.id,
                                        "selected":true
                                    });
                                }else {
                                    objectValues.push({
                                        "name":this.systemName,
                                        "value":this.id
                                    });
                                }
                            });
                            $("#update-role-dropdown").dropdown({
                                values:objectValues
                            });
                        }
                    }else {
                        self.location = "../login.html";
                    }
                });
                //弹出modal
                $("#update-role-modal").modal({
                    closable: false,
                    onDeny: function () {
                    },
                    onApprove: function () {
                        //提交后的逻辑处理
                        $('#update-role').submit();
                        $('#update-role').form({
                            fields: {
                                name: {
                                    identifier  : 'roleName',
                                    rules: [
                                        {
                                            type   : 'empty',
                                            prompt : '请输入角色名称'
                                        }
                                    ]
                                },
                                itemUri: {
                                    identifier  : 'roleType',
                                    rules: [
                                        {
                                            type   : 'empty',
                                            prompt : '请输入角色类型'
                                        }
                                    ]
                                }
                            },
                            onSuccess : updateForm(updateRoleId)
                        });
                    }
                }).modal("show");
                $('#update-role').submit(function (e) {
                    return false;
                });
            } else if (resp.code === '8001' || resp.code === '7000' || resp.code === '9014') {
                $.info(resp.message, function (e) {
                    self.location = 'index.html';
                });
            } else {
                $.error(resp.message, null);
            }
        })
    })
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