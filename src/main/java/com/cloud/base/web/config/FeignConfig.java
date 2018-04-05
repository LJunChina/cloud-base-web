package com.cloud.base.web.config;

import feign.Feign;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;

/**
 * @author Jon_China
 * @create 2018/3/24
 */
@Configuration
public class FeignConfig {

    @Bean
    @Scope("prototype")
    public Feign.Builder feignBuilder(){
        return  Feign.builder();
    }
}
