package com.cloud.base.web.service;

import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * @author Jon_China
 * @create 2018/3/24
 */
@FeignClient("user-microservice")
public interface UserService {

    @RequestMapping(value = "/get-public-key",method = RequestMethod.GET)
    String getPublicKey();
}
