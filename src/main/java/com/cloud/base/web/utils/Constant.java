package com.cloud.base.web.utils;


/**
 * 各服务接口
 *
 * @author Jon_China
 * @create 2017/11/11
 */
public final class Constant {
    /**用户服务*/
    private static final String USER_SERVICE = "http://user-microservice";
    /**定时任务服务*/
    private static final String SCHEDULE_SERVICE = "http://cloud-schedule-center";

    /**获取公钥*/
    public static final String GET_PUBLIC_KEY = USER_SERVICE + "/get-public-key";
    /**用户登录*/
    public static final String USER_LOGIN = USER_SERVICE + "/login";
    /**检测token是否有效*/
    public static final String CHECK_TOKEN = USER_SERVICE + "/token/check-token/{1}";
    /**根据用户id查询用户信息*/
    public static final String GET_USER_INFO_BY_ID = USER_SERVICE + "/get-user-detail/{1}";
    /**根据条件查询用户列表*/
    public static final String GET_USER_LIST = USER_SERVICE + "/get-user-list?message={1}";
    /**保存角色信息*/
    public static final String SAVE_ROLE_INFO = USER_SERVICE + "/role/save-role";
    /**保存权限信息*/
    public static final String SAVE_AUTHORITY = USER_SERVICE + "/auth/save-auth";
    /**用户是否登录*/
    public static final String GET_USER_IS_LOGIN = USER_SERVICE + "/is-login/{tokenId}";
    /**获取系统菜单*/
    public static final String GET_ALL_MENUS = USER_SERVICE + "/auth/get-all-menus/{appName}/{userId}";
    /**业务系统分页查询*/
    public static final String GET_SYSTEM_INFO_BY_NAME = USER_SERVICE + "/system-info/get-system-info?systemName={systemName}&pageSize={pageSize}&pageIndex={pageIndex}";
    /**保存业务系统信息接口*/
    public static final String SAVE_SYSTEM_INFO = USER_SERVICE + "/system-info/save-system-info";
    /**权限信息分页查询*/
    public static final String GET_ALL_AUTHORITIES_BY_PAGE = USER_SERVICE + "/auth/get-all-auth?name={name}&pageIndex={pageIndex}&pageSize={pageSize}&appName={appName}&itemType={itemType}&roleId={roleId}&appId={appId}";
    /**角色信息分页查询*/
    public static final String GET_ALL_ROLE = USER_SERVICE + "/role/get-roles?roleName={roleName}&appId={appId}&pageIndex={pageIndex}&pageSize={pageSize}&userId={userId}";
    /**内部用户保存*/
    public static final String SAVE_USER = USER_SERVICE + "/save-user";
    /**角色分配用户*/
    public static final String ALLOCATION_USERS = USER_SERVICE + "/role/allocation-users";
    /**角色权限分配*/
    public static final String ALLOCATION_AUTH = USER_SERVICE + "/auth/allocation-auth";
    /**获取用户权限信息*/
    public static final String GET_USER_PRIVILEGE = USER_SERVICE + "/auth/check-privilege?userId={userId}&appId={appId}&uri={uri}";
    /**退出登录*/
    public static final String USER_LOGOUT = USER_SERVICE + "/logout/{tokenId}";
    /**删除系统信息接口*/
    public static final String DELETE_SYSTEM_INFO = USER_SERVICE + "/system-info/delete-system-info/{id}";
    /**获取系统详情*/
    public static final String GET_SYSTEM_INFO_DETAIL = USER_SERVICE + "/system-info/get/{id}";
    /**更新系统信息*/
    public static final String UPDATE_SYSTEM_INFO = USER_SERVICE + "/system-info/update/{id}";
    /**查看角色信息*/
    public static final String GET_ROLE_INFO_DETAIL = USER_SERVICE + "/role/get/{id}";
    /**更新角色信息*/
    public static final String UPDATE_ROLE_INFO = USER_SERVICE + "/role/update/{id}";
    /**删除角色信息*/
    public static final String DELETE_ROLE_INFO = USER_SERVICE + "/role/delete/{id}";
    /**删除用户信息*/
    public static final String DELETE_USER_INFO = USER_SERVICE + "/delete/{id}";
    /**更新用户信息*/
    public static final String UPDATE_USER_INFO = USER_SERVICE + "/update/{id}";
    /**删除权限/菜单信息*/
    public static final String DELETE_AUTHORITY = USER_SERVICE + "/auth/delete/{id}";
    /**更新权限/菜单信息*/
    public static final String UPDATE_AUTHORITY = USER_SERVICE + "/auth/update/{id}";
    /**查询权限详情*/
    public static final String GET_AUTHORITY = USER_SERVICE + "/auth/{id}";
    /**新增定时任务 */
    public static final String SCHEDULE_TASK_SAVE = SCHEDULE_SERVICE + "/schedule-task/add";
    /**定时任务分页查询 */
    public static final String SCHEDULE_GET_TASKS_PAGE = SCHEDULE_SERVICE + "/schedule-task/page";
    /**根据id删除定时任务 */
    public static final String SCHEDULE_DELETE_TASK = SCHEDULE_SERVICE + "/schedule-task/delete/{id}";
    /**根据id更新定时任务 */
    public static final String SCHEDULE_UPDATE_TASK = SCHEDULE_SERVICE + "/schedule-task/update/{id}";
    /**根据id查询定时任务 */
    public static final String SCHEDULE_GET_JOB = SCHEDULE_SERVICE + "/schedule-task/job/{id}";
}