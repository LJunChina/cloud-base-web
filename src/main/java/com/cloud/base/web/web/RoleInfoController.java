package com.cloud.base.web.web;

import com.cloud.base.web.dto.BaseRespDTO;
import com.cloud.base.web.enums.ResultCode;
import com.cloud.base.web.utils.Constant;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;


/**
 * 系统角色API
 *
 * @author Jon_China
 * @create 2017/11/18
 */
@RestController
@RequestMapping(value = "/role")
public class RoleInfoController {

    private static final Logger logger = LoggerFactory.getLogger(RoleInfoController.class);
    @Autowired
    private RestTemplate restTemplate;

    /**
     * 新增角色信息
     * @param roleName
     * @return
     */
    @PostMapping(value = "/save-role")
    public String saveRoleInfo(@RequestParam(value = "roleName",defaultValue = StringUtils.EMPTY) String roleName,
                               @RequestParam(value = "roleType",defaultValue = "0")String roleType,
                               @RequestParam(value = "appId",defaultValue = StringUtils.EMPTY)String appId,
                               @RequestParam(value = "describe",defaultValue = StringUtils.EMPTY)String describe){
        logger.info("the params of saveRoleInfo,roleName:{},roleType:{},appId:{},describe:{} ",roleName,roleType,appId,describe);
        try {
            MultiValueMap<String,String> params = new LinkedMultiValueMap<>();
            params.add("roleName",roleName);
            params.add("roleType",roleType);
            params.add("appId",appId);
            params.add("describe",describe);
            String result = this.restTemplate.postForEntity(Constant.SAVE_ROLE_INFO,params,String.class).getBody();
            logger.info("the result of saveRoleInfo is : {}",result);
            return result;
        }catch (Exception e){
            logger.error("exception occurred in saveRoleInfo",e);
            return new BaseRespDTO(ResultCode.ERROR).toString();
        }
    }

    /**
     * 角色信息分页查询
     * @param roleName
     * @param appId
     * @param pageIndex
     * @param pageSize
     * @return
     */
    @GetMapping(value = "/get-roles")
    public String getAllRoleInfo(@RequestParam(value = "roleName",defaultValue = StringUtils.EMPTY) String roleName,
                                 @RequestParam(value = "appId",defaultValue = StringUtils.EMPTY) String appId,
                                 @RequestParam(value = "pageIndex",defaultValue = "1") Integer pageIndex,
                                 @RequestParam(value = "pageSize",defaultValue = "10") Integer pageSize){
        logger.info("the params of getAllRoleInfo,roleName:{},appId:{},pageIndex:{},pageSize:{} ",roleName,appId,pageIndex,pageSize);
        try {
            String result = this.restTemplate.getForEntity(Constant.GET_ALL_ROLE,String.class,roleName,appId,pageIndex,pageSize).getBody();
            logger.info("the result of getAllRoleInfo is : {}",result);
            return result;
        }catch (Exception e){
            logger.error("exception occurred in getAllRoleInfo",e);
            return new BaseRespDTO(ResultCode.ERROR).toString();
        }
    }


    /**
     * 角色分配用户信息
     * @param roleId
     * @param userIds
     * @return
     */
    @PostMapping(value = "/allocation-users")
    public String allocationUsers(@RequestParam(value = "roleId",defaultValue = StringUtils.EMPTY) String roleId,
                                  @RequestParam(value = "userIds",defaultValue = StringUtils.EMPTY) String userIds){
        logger.info("the params of allocationUsers,roleId:{},userIds:{}",roleId,userIds);
        try {
            MultiValueMap<String,String> params = new LinkedMultiValueMap<>();
            params.add("roleId",roleId);
            params.add("userIds",userIds);
            String result = this.restTemplate.postForEntity(Constant.ALLOCATION_USERS,params,String.class).getBody();
            logger.info("the result of allocationUsers is : {}",result);
            return result;
        }catch (Exception e){
            logger.error("exception occurred in allocationUsers",e);
            return new BaseRespDTO(ResultCode.ERROR).toString();
        }
    }
}
