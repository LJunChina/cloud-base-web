package com.cloud.base.web.config;

import com.cloud.base.sso.filter.UserAuthFilter;
import com.google.code.kaptcha.impl.DefaultKaptcha;
import com.google.code.kaptcha.util.Config;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.servlet.Filter;
import java.util.Properties;

/**
 * bean配置
 */
@Configuration
public class BeanLoader {
    @Bean
    public Config getConfig(){
        Properties properties = new Properties();
        properties.setProperty("kaptcha.border","no");
        properties.setProperty("kaptcha.border.color","105,179,90");
        properties.setProperty("kaptcha.textproducer.font.color","red");
        properties.setProperty("kaptcha.image.width","250");
        properties.setProperty("kaptcha.textproducer.font.size","80");
        properties.setProperty("kaptcha.image.height","90");
        properties.setProperty("kaptcha.session.key","code");
        properties.setProperty("kaptcha.textproducer.char.length","4");
        properties.setProperty("kaptcha.textproducer.font.names","宋体,楷体,微软雅黑");
        return new Config(properties);
    }

    @Bean
    public DefaultKaptcha getCaptchaProducer(){
        DefaultKaptcha defaultKaptcha = new DefaultKaptcha();
        defaultKaptcha.setConfig(getConfig());
        return defaultKaptcha;
    }

    @Bean
    public FilterRegistrationBean registerUserAuthFilter() {
        FilterRegistrationBean registration = new FilterRegistrationBean();
        registration.setFilter(userAuthFilter());
        registration.addUrlPatterns("*.html");
        registration.addInitParameter("excludeUrl", "/login.html");
        registration.setName("userAuthFilter");
        return registration;
    }

    @Bean(name = "userAuthFilter")
    public Filter userAuthFilter() {
        return new UserAuthFilter();
    }
}
