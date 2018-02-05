var userId = null;
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

/**
 * 初始化表格函数
 * @param aoColumn
 * @param aoColumnDefs
 * @param url
 * @param dom
 */
function initTable(aoColumn,aoColumnDefs,url,dom) {
    createDataTable(function(sSource, aDataSet, fnCallback){
        var params = {
            "pageIndex":getPageIndex(aDataSet),
            "pageSize" : getPageSize(aDataSet),
            "_":new Date().getMilliseconds()
        };
        serverAjaxData(url,'get',fnCallback,params);
    },aoColumn,aoColumnDefs,initComplete,dom);
}

/**
 * 表格加载完成后的回调函数
 * @param oSettings
 * @param json
 */
function initComplete(oSettings, json) {
    //加载角色数据
    $("#user_table").on('click','div.allocation-role',function () {
        userId = $(this).data("id");
        //初始化角色数据表格
        createDataTable(function(sSource, aDataSet, fnCallback){
            var params = {
                "pageIndex":getPageIndex(aDataSet),
                "pageSize" : getPageSize(aDataSet),
                "_":new Date().getMilliseconds(),
                "userId" : userId
            };
            serverAjaxData('/role/get-roles','get',fnCallback,params);
        },roleColumns,roleDefColumns,initComplete,'#role_table');
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
                        $.error("未选择任何用户!",null);
                        return false;
                    }
                    //执行ajax请求
                    $.post("/role/allocation-users",{userId:userId,roleIds:roleIds},function (resp) {
                        if(!resp){
                            //异常
                            $.error("系统异常,请稍后再试!",null);
                        }
                        var resultData = JSON.parse(resp);
                        if(resultData.code === "0000"){
                            //正常
                            $.success("处理成功!",null);
                        }else if(resultData.code === "8001") {
                            //未登录
                            self.location = "/login.html";
                        }else {
                            //异常
                            $.error(resultData.message,null);
                        }
                        roleIds = "";
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
$(document).ready(function () {
    //初始化表格
    initTable(userColumns,userDefColumns,'/get-user-list','#user_table')
});