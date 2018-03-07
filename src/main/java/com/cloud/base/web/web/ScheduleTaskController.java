package com.cloud.base.web.web;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.cloud.base.web.utils.Constant;
import com.cloud.base.web.utils.ControllerUtil;
import com.cloud.common.dto.BaseRespDTO;
import com.cloud.common.enums.ResultCode;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
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
}
