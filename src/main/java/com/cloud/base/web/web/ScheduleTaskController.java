package com.cloud.base.web.web;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.cloud.base.web.utils.Constant;
import com.cloud.base.web.utils.ControllerUtil;
import com.cloud.common.dto.BaseRespDTO;
import com.cloud.common.enums.ResultCode;
import com.cloud.common.util.WebParameterUtil;
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
import java.util.Map;

/**
 * 定时任务操作
 *
 * @author Jon_China
 * @create 2018/3/6
 */
@RestController
@RequestMapping(value = "/schedule")
public class ScheduleTaskController {

    private static final Logger LOGGER = LoggerFactory.getLogger(ScheduleTaskController.class);

    @Autowired
    private RestTemplate restTemplate;

    @PostMapping(value = "/add")
    public String addTask(HttpServletRequest request){
        Map<String,String> params = ControllerUtil.getParamtersMap(request);
        LOGGER.info("params of addTask:{}", JSON.toJSONString(params));
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON_UTF8);
            HttpEntity<?> entity = new HttpEntity<>(params,headers);
            String result = this.restTemplate.postForEntity(Constant.SCHEDULE_TASK_SAVE,entity,String.class).getBody();
            LOGGER.info("result of addTask:",result);
            return result;
        }catch (Exception e){
            LOGGER.error("exception occurred in addTask:",e);
            return new BaseRespDTO(ResultCode.ERROR).toString();
        }
    }


    /**
     * 定时任务分页查询
     * @param request
     * @return
     */
    @GetMapping(value = "/page")
    public String getAllJobsByPage(HttpServletRequest request){
        Map<String,String> params = ControllerUtil.getParamtersMap(request);
        LOGGER.info("params of getAllJobsByPage:{}",JSON.toJSONString(params));
        try {
            String result = this.restTemplate.getForEntity(WebParameterUtil.generatorRestStyle(Constant.SCHEDULE_GET_TASKS_PAGE,params),String.class,params).getBody();
            LOGGER.info("result of getAllJobsByPage:",result);
            return result;
        }catch (Exception e){
            LOGGER.error("exception occurred in getAllJobsByPage:",e);
            return new BaseRespDTO(ResultCode.ERROR).toString();
        }
    }

    /**
     * 更新job
     * @param id
     * @param request
     * @return
     */
    @PostMapping(value = "/update/{id}")
    public String updateJobById(@PathVariable(value = "id") long id,HttpServletRequest request){
        Map<String,String> params = ControllerUtil.getParamtersMap(request);
        LOGGER.info("params of updateJobById,id:{},body:{}",id,JSON.toJSONString(params));
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON_UTF8);
            HttpEntity<?> entity = new HttpEntity<>(params,headers);
            String result = this.restTemplate.postForEntity(Constant.SCHEDULE_UPDATE_TASK,entity,String.class).getBody();
            LOGGER.info("result of updateJobById:",result);
            return result;
        }catch (Exception e){
            LOGGER.error("exception occurred in updateJobById:",e);
            return new BaseRespDTO(ResultCode.ERROR).toString();
        }
    }

    /**
     * 根据id删除定时任务
     * @param id
     * @return
     */
    @PostMapping(value = "/delete/{id}")
    public String deleteJobById(@PathVariable(value = "id") long id){
        LOGGER.info("params of deleteJobById:{}",id);
        try {
            String result = this.restTemplate.postForEntity(Constant.SCHEDULE_DELETE_TASK,null,String.class,id).getBody();
            LOGGER.info("result of deleteJobById:",result);
            return result;
        }catch (Exception e){
            LOGGER.error("exception occurred in deleteJobById:",e);
            return new BaseRespDTO(ResultCode.ERROR).toString();
        }
    }

    /**
     * 根据id查询定时任务详情
     * @param id
     * @return
     */
    @GetMapping(value = "/job/{id}")
    public String getJobById(@PathVariable(value = "id") long id){
        LOGGER.info("params of getJobById:{}",id);
        try {
            String result = this.restTemplate.getForEntity(Constant.SCHEDULE_GET_JOB,String.class,id).getBody();
            LOGGER.info("result of getJobById:",result);
            return result;
        }catch (Exception e){
            LOGGER.error("exception occurred in getJobById:",e);
            return new BaseRespDTO(ResultCode.ERROR).toString();
        }
    }
}
