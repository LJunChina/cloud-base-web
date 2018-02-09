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
}];
var menuDfColumns = [];
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

/**
 * 表格加载完成后回调
 * @param oSettings
 * @param json
 */
function initComplete(oSettings, json) {

}
$(document).ready(function () {
    initTable(menuAoColumns,menuDfColumns,'/auth/get-all-auth',"#menu_table");
});