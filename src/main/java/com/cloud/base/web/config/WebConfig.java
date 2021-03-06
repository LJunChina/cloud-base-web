package com.cloud.base.web.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 * web配置
 *
 * @author Jon_China
 * @create 2017/11/11
 */
@Configuration
public class WebConfig extends WebMvcConfigurerAdapter {

    @Autowired
    private HandlerInterceptor userAuthInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(userAuthInterceptor)
                .addPathPatterns("/**").excludePathPatterns("/user-login"
                ,"/get-public-key"
                ,"/captcha-image","/error");
    }

}
