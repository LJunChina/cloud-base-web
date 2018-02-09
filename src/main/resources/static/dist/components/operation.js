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
}];
var operationDefColumns = [];

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

/**
 * 表格加载完成后回调
 * @param oSettings
 * @param json
 */
function initComplete(oSettings, json) {

}
$(document).ready(function () {
    initTable(operationAoColumns,operationDefColumns,'/auth/get-all-auth',"#operation-table");
});