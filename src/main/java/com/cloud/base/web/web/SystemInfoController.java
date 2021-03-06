package com.cloud.base.web.web;

import com.alibaba.fastjson.JSONObject;
import com.cloud.base.web.utils.Constant;
import com.cloud.base.web.utils.ControllerUtil;
import com.cloud.common.dto.BaseRespDTO;
import com.cloud.common.enums.ResultCode;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;


/**
 * 业务系统管理API
 *
 * @author Jon_China
 * @create 2017/12/23
 */
@RestController
@RequestMapping(value = "/system-info")
public class SystemInfoController {

    private static final Logger logger = LoggerFactory.getLogger(SystemInfoController.class);

    @Autowired
    private RestTemplate restTemplate;

    /**
     * 业务系统分页查询
     * @param systemName
     * @param pageSize
     * @param pageIndex
     * @return
     */
    @GetMapping(value = "/get-system-info")
    public String getSystemInfoByName(@RequestParam(value = "systemName",defaultValue = "")String systemName,
                                      @RequestParam(value = "pageSize",defaultValue = "10") int pageSize,
                                      @RequestParam(value = "pageIndex",defaultValue = "1") int pageIndex){
        logger.info("params of getSystemInfoByName,systemName : {},pageSize:{},pageIndex:{}",systemName,pageSize,pageIndex);
        try {
            String result = this.restTemplate.getForEntity(Constant.GET_SYSTEM_INFO_BY_NAME,String.class,systemName,pageSize,pageIndex).getBody();
            logger.info("result of the getSystemInfoByName is :{}",result);
            return result;
        }catch (Exception e){
            logger.error("exception occurred in getSystemInfoByName",e);
            return new BaseRespDTO(ResultCode.ERROR).toString();
        }
    }

    /**
     * 保存业务系统信息接口
     * @param request
     * @return
     */
    @PostMapping(value = "/save-system-info")
    public String saveSystemInfo(HttpServletRequest request){
        Map<String,String> params = ControllerUtil.getParamtersMap(request);
        String param = JSONObject.toJSONString(params);
        logger.info("params of saveSystemInfo :{}",param);
        try {
            MultiValueMap<String,String> requestEntity = new LinkedMultiValueMap<>();
            requestEntity.setAll(params);
            String result = this.restTemplate.postForEntity(Constant.SAVE_SYSTEM_INFO,requestEntity,String.class).getBody();
            logger.info("result of the saveSystemInfo is :{}",result);
            return result;
        }catch (Exception e){
            logger.error("exception occurred in saveSystemInfo",e);
            return new BaseRespDTO(ResultCode.ERROR).toString();
        }
    }


    /**
     * 删除系统信息接口
     * @param id
     * @return
     */
    @PostMapping(value = "/delete-system-info")
    public String deleteSystemInfo(@RequestParam(value = "id",required = false)String id){
        logger.info("params of deleteSystemInfo,id:{}",id);
        try {
            String result = this.restTemplate.postForEntity(Constant.DELETE_SYSTEM_INFO,null,String.class,id).getBody();
            logger.info("result of the deleteSystemInfo is :{}",result);
            return result;
        }catch (Exception e){
            logger.error("exception occurred in deleteSystemInfo",e);
            return new BaseRespDTO(ResultCode.ERROR).toString();
        }
    }

    /**
     * 获取系统详情
     * @param id
     * @return
     */
    @GetMapping(value = "/get/{id}")
    public String getSystemInfoDetail(@PathVariable(value = "id")String id){
        logger.info("params of getSystemInfoDetail,id:{}",id);
        try {
            String result = this.restTemplate.getForEntity(Constant.GET_SYSTEM_INFO_DETAIL,String.class,id).getBody();
            logger.info("result of the getSystemInfoDetail is :{}",result);
            return result;
        }catch (Exception e){
            logger.error("exception occurred in getSystemInfoDetail",e);
            return new BaseRespDTO(ResultCode.ERROR).toString();
        }
    }

    /**
     * 更新系统信息
     * @param request
     * @return
     */
    @PostMapping(value = "/update")
    public String updateSystem(HttpServletRequest request){
        Map<String,String> params = ControllerUtil.getParamtersMap(request);
        String param = JSONObject.toJSONString(params);
        logger.info("params of updateSystem,id:{}",param);
        try {
            String id = params.remove("id");
            MultiValueMap<String,String> requestEntity = new LinkedMultiValueMap<>();
            requestEntity.setAll(params);
            String result = this.restTemplate.postForEntity(Constant.UPDATE_SYSTEM_INFO,requestEntity,String.class,id).getBody();
            logger.info("result of the updateSystem is :{}",result);
            return result;
        }catch (Exception e){
            logger.error("exception occurred in getSystemInfoDetail",e);
            return new BaseRespDTO(ResultCode.ERROR).toString();
        }
    }
}
