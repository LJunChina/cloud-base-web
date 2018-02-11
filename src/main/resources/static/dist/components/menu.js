var menuAoColumns =  [{
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
},{
    "mDataProp" : "id",
    "sTitle" : "操作",
    "sDefaultContent" : "",
    "sClass" : "center"
}];
var menuDfColumns = [{
    "aTargets":[5],"mRender":function(data,type,full){
        return "<div class=\"ui vertical animated button edit-menu\" style='margin-bottom:0px!important;' tabindex=\"0\" data-id='"+data+"'>" +
            "                                    <div class=\"visible content\">编辑</div>" +
            "                                    <div class=\"hidden content\">" +
            "                                        <i class=\"gray edit icon\"></i>" +
            "                                    </div>" +
            "                                </div>" +
            "<div class=\"ui vertical animated button delete-menu\" style='margin-bottom:0px!important;' tabindex=\"0\" data-id='"+data+"'>" +
            "                                    <div class=\"visible content\">删除</div>" +
            "                                    <div class=\"hidden content\">" +
            "                                        <i class=\"gray remove icon\"></i>" +
            "                                    </div>" +
            "                                </div>" ;
    }
}];
/**
 * 初始化表格
 * @param aoColumn
 * @param aoColumnDefs
 * @param url
 * @param dom
 */
function initTable(aoColumn,aoColumnDefs,url,dom) {
    createDataTable(function(sSource, aDataSet, fnCallback){
        var params = {
            "itemType":"1",
            "pageIndex":getPageIndex(aDataSet),
            "pageSize" : getPageSize(aDataSet),
            "_":new Date().getMilliseconds()
        };
        serverAjaxData(url,'get',fnCallback,params);
    },aoColumn,aoColumnDefs,initComplete,dom);
}
function updateMenuForm(updateMenuId) {
    var formData = $('#update-menu-form input').serializeArray();
    formData.push({name:'itemType',value:'1'});
    $.post("/auth/update/" + updateMenuId,formData,function (data) {
        var resultData = JSON.parse(data);
        if(resultData.code === '0000'){
            $.success("处理成功！",function (e) {
                if(e){
                    $(".ui.modal.standard").modal('hide');
                    initTable(menuAoColumns,menuDfColumns,'/auth/get-all-auth',"#menu_table");
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
/**
 * 表格加载完成后回调
 * @param oSettings
 * @param json
 */
function initComplete(oSettings, json) {
    //删除操作
    $("#menu_table").on('click','div.delete-menu',function () {
        var menuId = $(this).data("id");
        if(!menuId){
            return;
        }
        $.confirm("确定要删除该操作吗？","",function (e) {
            if(e){
                //发送请求
                $.post('/auth/delete/' + menuId,null,function (result) {
                    var resp = JSON.parse(result);
                    if(resp && resp.code === '0000'){
                        $.success(resp.message,function (e) {
                            if(e){
                                initTable(menuAoColumns,menuDfColumns,'/auth/get-all-auth',"#menu_table");
                            }
                        });
                    }else if(resp.code === '7001' || resp.code === '8000' || resp.code === '9104'){
                        $.info(resp.message,function (e) {
                            if(e){
                                self.location.reload(true);
                            }
                        })
                    }else {
                        $.error(resp.message,null);
                    }
                });
            }
        })
    });
    //更新操作
    $("#menu_table").on('click','div.edit-menu',function () {
        var menu = $(this).data("id");
        //加载权限信息到modal
        $.getJSON('/auth/get/' + menu,null,function (resp) {
            if(resp && resp.code === '0000'){
                var menuData = resp.data;
                $("#update-menu-form input[name='name']").val(menuData.name);
                $("#update-menu-form input[name='itemUri']").val(menuData.itemUri);
                $("#update-menu-form input[name='icon']").val(menuData.icon);
                //加载系统信息列表
                $.getJSON('/system-info/get-system-info',{pageIndex:1,pageSize:99999},function (systemResp) {
                    if(systemResp && systemResp.code === '0000'){
                        var list = systemResp.data.list;
                        var objectValues = [];
                        if(list && list.length > 0){
                            $("#update-menu-system-data").html("");
                            $.each(list,function () {
                                if(resp.data.appName === this.id){
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
                            $("#update-menu-dropdown").dropdown({
                                values:objectValues
                            });
                        }
                    }else if (systemResp.code === '8001' || systemResp.code === '7000' || systemResp.code === '9104'){
                        $.info(systemResp.message,function (e) {
                            self.location.reload(true);
                        });
                    }
                });
                $.getJSON('/auth/get-all-auth',{pageIndex:1,pageSize:99999,itemType:'1',appId:menuData.appName,isParent:'1'},function (authResp) {
                    if(authResp && authResp.code === '0000'){
                        var list = authResp.data.list;
                        var objectValues = [];
                        objectValues.push({
                            "name":'无',
                            "value":''
                        });
                        if(list && list.length > 0){
                            $("#update-parent-menu-data").html("");
                            console.log(resp.data);
                            $.each(list,function () {
                                console.log(this.id);
                                if(resp.data.parentId === this.id){
                                    //设置dropDown的默认值
                                    objectValues.push({
                                        "name":this.name,
                                        "value":this.id,
                                        "selected":true
                                    });
                                }else {
                                    objectValues.push({
                                        "name":this.name,
                                        "value":this.id
                                    });
                                }
                            });
                            $("#update-menu-parent-dropdown").dropdown({
                                values:objectValues
                            });
                        }
                    }else if (authResp.code === '8001' || authResp.code === '7000' || authResp.code === '9104'){
                        $.info(authResp.message,function (e) {
                            if(e){
                                self.location.reload(true);
                            }
                        });
                    }
                });
                //父级菜单信息
                //弹出遮蔽罩
                $("#update-menu-modal").modal({
                    closable: false,
                    onDeny: function () {
                    },
                    onApprove: function () {
                        //提交后的处理 update-user-form
                        $('#update-menu-form').submit();
                        $('#update-menu-form').form({
                            fields: {
                                name: {
                                    identifier  : 'name',
                                    rules: [
                                        {
                                            type   : 'empty',
                                            prompt : '请输入操作名称'
                                        }
                                    ]
                                },
                                itemUri: {
                                    identifier  : 'itemUri',
                                    rules: [
                                        {
                                            type   : 'empty',
                                            prompt : '请输入操作请求路径'
                                        }
                                    ]
                                }
                            },
                            onSuccess:updateMenuForm(menu)
                        });
                    }
                }).modal('show');
                $('#update-menu-form').submit(function (e) {
                    return false;
                });
            }else if (resp.code === '8001' || resp.code === '7000' || resp.code === '9014'){
                $.info(resp.message, function (e) {
                    self.location .reload(true);
                });
            }else {
                $.error(resp.message,null);
            }
        });
    });
}
$(document).ready(function () {
    initTable(menuAoColumns,menuDfColumns,'/auth/get-all-auth',"#menu_table");
});