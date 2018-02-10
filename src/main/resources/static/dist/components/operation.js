var operationAoColumns =  [{
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
},{
    "mDataProp" : "id",
    "sTitle" : "操作",
    "sDefaultContent" : "",
    "sClass" : "center"
}];
var operationDefColumns = [{
    "aTargets":[3],"mRender":function(data,type,full){
        return "<div class=\"ui vertical animated button edit-operation\" style='margin-bottom:0px!important;' tabindex=\"0\" data-id='"+data+"'>" +
            "                                    <div class=\"visible content\">编辑</div>" +
            "                                    <div class=\"hidden content\">" +
            "                                        <i class=\"gray edit icon\"></i>" +
            "                                    </div>" +
            "                                </div>" +
            "<div class=\"ui vertical animated button delete-operation\" style='margin-bottom:0px!important;' tabindex=\"0\" data-id='"+data+"'>" +
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
            "itemType":"0",
            "pageIndex":getPageIndex(aDataSet),
            "pageSize" : getPageSize(aDataSet),
            "_":new Date().getMilliseconds()
        };
        serverAjaxData(url,'get',fnCallback,params);
    },aoColumn,aoColumnDefs,initComplete,dom);
}

function updateOperationForm(updateOperationId) {
    var formData = $('#update-operation input').serializeArray();
    formData.push({name:'itemType',value:'0'});
    $.post("/auth/update/" + updateOperationId,formData,function (data) {
        var resultData = JSON.parse(data);
        if(resultData.code === '0000'){
            $.success("处理成功！",function (e) {
                if(e){
                    $(".ui.modal.standard").modal('hide');
                    initTable(operationAoColumns,operationDefColumns,'/auth/get-all-auth',"#operation-table");
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
    $("#operation-table").on('click','div.delete-operation',function () {
        var operationId = $(this).data("id");
        $.confirm("确定要删除该操作吗？","",function (e) {
            if(e){
                //发送请求
                $.post('/auth/delete/' + operationId,null,function (result) {
                    var resp = JSON.parse(result);
                    if(resp && resp.code === '0000'){
                        $.success(resp.message,function (e) {
                            if(e){
                                initTable(operationAoColumns,operationDefColumns,'/auth/get-all-auth',"#operation-table");
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
    $("#operation-table").on('click','div.edit-operation',function () {
        var operationId = $(this).data("id");
        //加载权限信息到modal
        $.getJSON('/auth/get/' + operationId,null,function (resp) {
            if(resp && resp.code === '0000'){
                var operationData = resp.data;
                $("#update-operation input[name='name']").val(operationData.name);
                $("#update-operation input[name='itemUri']").val(operationData.itemUri);
                //加载系统信息列表
                $.getJSON('/system-info/get-system-info',{pageIndex:1,pageSize:99999},function (systemResp) {
                    if(systemResp && systemResp.code === '0000'){
                        var list = systemResp.data.list;
                        var objectValues = [];
                        if(list && list.length > 0){
                            $("#update-system-data").html("");
                            $.each(list,function () {
                                console.log(this.id + " " + resp.data.appName);
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
                            $("#update-operation-dropdown").dropdown({
                                values:objectValues
                            });
                        }
                    }else {
                        self.location = "../login.html";
                    }
                });
                //弹出遮蔽罩
                $("#update-operation-modal").modal({
                    closable: false,
                    onDeny: function () {
                    },
                    onApprove: function () {
                        //提交后的处理 update-user-form
                        $('#update-operation').submit();
                        $('#update-operation').form({
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
                            onSuccess:updateOperationForm(operationId)
                        });
                    }
                }).modal('show');
                $('#update-operation').submit(function (e) {
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
    initTable(operationAoColumns,operationDefColumns,'/auth/get-all-auth',"#operation-table");
});