package com.cloud.base.web.service;

import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * @author Jon_China
 * @create 2018/3/24
 */
@FeignClient(name = "user-microservice",fallback = UserService.HystrixClientFallback.class)
public interface UserService {

    @RequestMapping(value = "/get-public-key",method = RequestMethod.GET)
    String getPublicKey();

    static class HystrixClientFallback implements UserService{
        @Override
        public String getPublicKey() {
            return "fallback";
        }
    }

}

