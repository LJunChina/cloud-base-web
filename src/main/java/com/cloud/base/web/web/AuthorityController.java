package com.cloud.base.web.web;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.cloud.base.sso.context.LoginUser;
import com.cloud.base.sso.context.LoginUserContext;
import com.cloud.base.web.utils.ControllerUtil;
import com.cloud.base.web.utils.Constant;
import com.cloud.common.dto.BaseRespDTO;
import com.cloud.common.enums.ResultCode;
import com.cloud.common.enums.YesOrNoEnum;
import com.cloud.common.util.EmptyChecker;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

/**
 * 权限API
 *
 * @author Jon_China
 * @create 2017/11/19
 */
@RestController
@RequestMapping(value = "/auth")
public class AuthorityController {

    private static final Logger logger = LoggerFactory.getLogger(AuthorityController.class);

    private static final String SYSTEM_STR = "cloud_base";

    @Autowired
    private RestTemplate restTemplate;

    /**
     * 增加操作(权限信息)
     * @param request
     * @return
     */
    @PostMapping(value = "/save-auth")
    public String saveAuthority(HttpServletRequest request){
        Map<String,String> params = ControllerUtil.getParamtersMap(request);
        logger.info("the params of saveAuthority is : {}",params);
        try {
            if(EmptyChecker.notEmpty(params.get("available")) && params.get("available").equals("on")){
                params.put("available", YesOrNoEnum.YES.getCode());
            }else {
                params.put("available",YesOrNoEnum.NO.getCode());
            }
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON_UTF8);
            HttpEntity httpEntity = new HttpEntity(JSONObject.toJSONString(params),headers);
            String result = this.restTemplate.postForEntity(Constant.SAVE_AUTHORITY,httpEntity,String.class).getBody();
            logger.info("result of the saveAuthority is :{}",result);
            return result;
        }catch (Exception e){
            logger.error("exception occurred in saveAuthority",e);
            return new BaseRespDTO(ResultCode.ERROR).toString();
        }
    }

    /**
     * 获取系统菜单
     * @return
     */
    @GetMapping(value = "/get-all-menus")
    public String getAllMenus(){
        try {
            //获取当前登录用户
            LoginUser loginUser = LoginUserContext.getCurrentLoginUser();
            String result = this.restTemplate.getForEntity(Constant.GET_ALL_MENUS,String.class,SYSTEM_STR,loginUser.getUserId()).getBody();
            logger.info("result of the getAllMenus is :{}",result);
            return result;
        }catch (Exception e){
            logger.error("exception occurred in getAllMenus",e);
            return new BaseRespDTO(ResultCode.ERROR).toString();
        }
    }

    /**
     * 获取所有菜单、操作信息
     * @param name 菜单/操作名称
     * @param pageIndex 页号
     * @param pageSize 页大小
     * @param appName 所属系统
     * @param itemType 类型
     * @return
     */
    @GetMapping(value = "/get-all-auth")
    public String getAllAuthoritiesByPage(@RequestParam(value = "name",defaultValue = StringUtils.EMPTY) String name,
                                          @RequestParam(value = "pageIndex",defaultValue = "1")Integer pageIndex,
                                          @RequestParam(value = "pageSize",defaultValue = "10")Integer pageSize,
                                          @RequestParam(value = "appName",defaultValue = StringUtils.EMPTY)String appName,
                                          @RequestParam(value = "itemType",defaultValue = StringUtils.EMPTY)String itemType,
                                          @RequestParam(value = "roleId",defaultValue = StringUtils.EMPTY)String roleId,
                                          @RequestParam(value = "appId",defaultValue = StringUtils.EMPTY) String appId){
        logger.info("the params of getAllAuthoritiesByPage,name:{},pageIndex:{},pageSize:{},appName:{},itemType:{},roleId:{},appId:{}"
                ,name,pageIndex,pageSize,appName,itemType,roleId,appId);
        try {
            Map<String,Object> params = new HashMap<>();
            params.put("name",name);
            params.put("pageIndex",pageIndex);
            params.put("pageSize",pageSize);
            params.put("appName",appName);
            params.put("itemType",itemType);
            params.put("roleId",roleId);
            params.put("appId",appId);
            String result = this.restTemplate.getForEntity(Constant.GET_ALL_AUTHORITIES_BY_PAGE,String.class,params).getBody();
            logger.info("result of the getAllAuthoritiesByPage is :{}",result);
            return result;
        }catch (Exception e){
            logger.error("exception occurred in getAllAuthoritiesByPage",e);
            return new BaseRespDTO(ResultCode.ERROR).toString();
        }
    }

    /**
     * 角色权限分配
     * @param roleId
     * @param authIds
     * @return
     */
    @PostMapping(value = "/allocation-auth")
    public String allocationAuth(@RequestParam(value = "roleId")String roleId,
                                 @RequestParam(value = "authIds")String authIds,@RequestParam(value = "itemType")String itemType){
        logger.info("params of allocationAuth,roleId:{},authIds:{}",roleId,authIds);
        try {
            MultiValueMap<String,String> params = new LinkedMultiValueMap<>();
            params.add("roleId",roleId);
            params.add("authIds",authIds);
            params.add("itemType",itemType);
            String result = this.restTemplate.postForEntity(Constant.ALLOCATION_AUTH,params,String.class).getBody();
            logger.info("result of allocationAuth:{}",result);
            return result;
        }catch (Exception e){
            logger.error("exception occurred in allocationAuth",e);
            return new BaseRespDTO(ResultCode.ERROR).toString();
        }
    }

    /**
     * 根据id删除菜单/权限信息
     * @param id
     * @return
     */
    @PostMapping(value = "/delete/{id}")
    public String deleteAuthorityById(@PathVariable(value = "id") String id){
        logger.info("param of deleteAuthorityById,id:{}",id);
        try {
            String result = this.restTemplate.postForEntity(Constant.DELETE_AUTHORITY,null,String.class,id).getBody();
            logger.info("result of deleteAuthorityById:{}",result);
            return result;
        }catch (Exception e){
            logger.error("exception occurred in deleteAuthorityById",e);
            return new BaseRespDTO(ResultCode.ERROR).toString();
        }
    }


    /**
     * 更新菜单/权限信息
     * @param id
     * @param request
     * @return
     */
    @PostMapping(value = "/update/{id}")
    public String updateAuthority(@PathVariable(value = "id") String id,HttpServletRequest request){
        Map<String,String> params = ControllerUtil.getParamtersMap(request);
        logger.info("param of deleteAuthorityById,id:{},request:{}",id,params);
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON_UTF8);
            HttpEntity<String> entity = new HttpEntity<>(JSON.toJSONString(params),headers);
            String result = this.restTemplate.postForEntity(Constant.UPDATE_AUTHORITY,entity,String.class,id).getBody();
            logger.info("result of updateAuthority:{}",result);
            return result;
        }catch (Exception e){
            logger.error("exception occurred in updateAuthority",e);
            return new BaseRespDTO(ResultCode.ERROR).toString();
        }
    }

    /**
     * 菜单/权限详情查询api
     * @param id
     * @return
     */
    @GetMapping(value = "/get/{id}")
    public String getAuthorityInfo(@PathVariable(value = "id") String id){
        logger.info("param of getAuthorityInfo,id:{",id);
        try {
            String result = this.restTemplate.getForEntity(Constant.GET_AUTHORITY,String.class,id).getBody();
            logger.info("result of getAuthorityInfo:{}",result);
            return result;
        }catch (Exception e){
            logger.error("exception occurred in getAuthorityInfo",e);
            return new BaseRespDTO(ResultCode.ERROR).toString();
        }
    }
}
