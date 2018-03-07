var aoColumn = [{
    "mDataProp" : "systemName",
    "sDefaultContent" : "", //此列默认值为""，以防数据中没有此值，DataTables加载数据的时候报错
    "sTitle" : "业务系统名称",
    "sClass" : "center"
}, {
    "mDataProp" : "systemChn",
    "sTitle" : "业务系统中文名称",
    "sDefaultContent" : "",
    "sClass" : "center"
}, {
    "mDataProp" : "systemContext",
    "sTitle" : "系统context",
    "sDefaultContent" : "",
    "sClass" : "center"
}, {
    "mDataProp" : "systemHost",
    "sTitle" : "系统host",
    "sDefaultContent" : "",
    "sClass" : "center"
}, {
    "mDataProp" : "id",
    "sTitle" : "操作",
    "sDefaultContent" : "",
    "sClass" : "center",
    "width" : '15%'
}];
var aoColumnDefs = [{
    "aTargets":[4],"mRender":function(data,type,full){
        var id = full.id || null;
        return "<div class=\"ui vertical animated button delete-system\" style='margin-bottom:0px!important;' tabindex='0' data-id='"+id+"'>" +
            "                                    <div class=\"visible content\">删除系统</div>" +
            "                                    <div class=\"hidden content\">" +
            "                                        <i class=\"gray remove icon\"></i>" +
            "                                    </div>" +
            "                                </div>" +
            "<div class=\"ui vertical animated button edit\" style='margin-bottom:0px!important;' tabindex=\"0\" data-value='horizontal flip' data-id='"+id+"'>" +
            "                                    <div class=\"visible content\">更新系统</div>" +
            "                                    <div class=\"hidden content\">" +
            "                                        <i class=\"gray edit icon\"></i>" +
            "                                    </div>" +
            "                                </div>";
    }
}];
function loadSystemEvent(oSettings, json) {
    //删除系统
    $("div.delete-system").on('click',function () {
        var id = $(this).data('id');
        if(!id){
            return;
        }
        $.confirm('确定要删除吗?','这会导致该系统所有功能不可用',function (e) {
            if(e){
                $.post('/system-info/delete-system-info',{id:id},function (resp) {
                    var result = JSON.parse(resp);
                    if(result && result.code === '0000'){
                        $.success("删除成功",function (e) {
                            //刷新列表
                            initTable(aoColumn,aoColumnDefs);
                        });
                    }else {
                        
                    }
                });
            }
        });
    });
    //更新事件
    $("div.edit").on('click',function () {
        var id = $(this).data('id');
        if(!id){
            return;
        }
        //弹出遮蔽罩
        var a = $(this).data("value");
        //拉取数据
        $.getJSON('/system-info/get/' + id,function (result) {
            if(result && result.code === '0000'){
                //填充数据
                var data = result.data;
                $("#update-system input[name='systemName']").val(data.systemName);
                $("#update-system input[name='systemChn']").val(data.systemChn);
                $("#update-system input[name='systemHost']").val(data.systemHost);
                $("#update-system input[name='systemContext']").val(data.systemContext);
                $("#update-system input[name='id']").val(id);
            }else {
                $.error("未查询到任何数据",null);
                return;
            }
        });
        $("#update-system").modal("setting", "transition", a).modal("show");
    });
    //提交更新表单
    var $new = $('#submit_update');
    $new.on('click',function () {
        $new.submit();
    });
    $('#update-system').form({
        fields: {
            systemName: {
                identifier  : 'systemName',
                rules: [
                    {
                        type   : 'empty',
                        prompt : '请输入系统名称'
                    }
                ]
            },
            systemHost: {
                identifier  : 'systemHost',
                rules: [
                    {
                        type   : 'empty',
                        prompt : '请输入系统host'
                    }
                ]
            }
        },
        onSuccess:submitForm
    });
    $('#update-system').submit(function(e){
        return false;
    });
    function submitForm() {
        var formData = $('#new_system input').serializeArray();
        $.post("/system-info/update",formData,function (data) {
            var resultData = JSON.parse(data);
            if(resultData.code === '0000'){
                $.success("处理成功！",function (e) {
                    if(e){
                        $("#update-system").modal('hide');
                        //重置表单
                        $('#new_system')[0].reset();
                        initTable(aoColumn,aoColumnDefs);
                    }
                });
            }else if(resultData.code === '8001'){
                self.location = "/index.html";
            }else {
                $.error(resultData.message,null);
            }
        });
    }
}
function initTable(aoColumn,aoColumnDefs) {
    createDataTable(function(sSource, aDataSet, fnCallback){
        var params = {
            "pageIndex":getPageIndex(aDataSet),
            "pageSize" : getPageSize(aDataSet)
        };
        serverAjaxData("/system-info/get-system-info",'get',fnCallback,params);
    },aoColumn,aoColumnDefs,loadSystemEvent,'#system_table');
}
$(document).ready(function () {
    //initTable(aoColumn,aoColumnDefs);
});

