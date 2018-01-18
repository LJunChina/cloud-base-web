package com.cloud.base.web.web;

import com.alibaba.fastjson.JSONObject;
import com.cloud.base.sso.context.LoginUserContext;
import com.cloud.base.web.utils.Constant;
import com.cloud.base.web.utils.ControllerUtil;
import com.cloud.common.dto.BaseRespDTO;
import com.cloud.common.enums.ResultCode;
import com.cloud.common.util.EmptyChecker;
import com.google.code.kaptcha.Constants;
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

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.Map;
import java.util.stream.Stream;

@RestController
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private RestTemplate restTemplate;

    /**
     * 用户登录
     * @param userName
     * @param password
     * @param response
     * @param code
     * @return
     */
    @PostMapping(value = "/user-login")
    public String login(@RequestParam(name = "userName")String userName, @RequestParam(name = "password")String password
            , HttpServletResponse response, @RequestParam(name = "code") String code, HttpSession session){
        String sessionCode = (String) session.getAttribute(Constants.KAPTCHA_SESSION_KEY);
        if(sessionCode == null || !sessionCode.equals(code)){
            return new BaseRespDTO(ResultCode.INVALID_CODE).toString();
        }
        MultiValueMap<String,String> params = new LinkedMultiValueMap<>();
        params.add("userName",userName);
        params.add("password",password);
        String result = this.restTemplate.postForEntity(Constant.USER_LOGIN,params,String.class).getBody();
        logger.info("this result is : {}" ,result);
        JSONObject object = JSONObject.parseObject(result);
        if(ResultCode.OK.getCode().equals(object.getString("code"))){
            String tokenId = object.getString("data");
            Cookie cookie = new Cookie("tokenId",tokenId);
            cookie.setDomain("joninfo.cn");
            cookie.setPath("/");
            cookie.setMaxAge(15*60);
            response.addCookie(cookie);
        }
        return result;
    }

    /**
     * 从服务器获取公钥
     * @return
     */
    @GetMapping("/get-public-key")
    public String getPublicKey(){
        String result = this.restTemplate.getForEntity(Constant.GET_PUBLIC_KEY,String.class).getBody();
        logger.info("this result is : {}" ,result);
        return result;
    }

    /**
     * 用户详情查询
     * @return
     */
    @GetMapping("/get-user-detail")
    public String getUserDetailById(){
        String userId = LoginUserContext.getCurrentLoginUser().getUserId();
        String result = this.restTemplate.getForEntity(Constant.GET_USER_INFO_BY_ID,String.class,userId).getBody();
        logger.info("this result is : {}" ,result);
        return result;
    }

    /**
     * 用户列表分页查询
     * @param request
     * @return
     */
    @GetMapping("/get-user-list")
    public String getUserList(HttpServletRequest request){
        Map<String,String> resultMap = ControllerUtil.getParamtersMap(request);
        String params = JSONObject.toJSONString(resultMap);
        logger.info("the params of [get-user-list] is :{}",params);
        String result = this.restTemplate.getForEntity(Constant.GET_USER_LIST,String.class,params).getBody();
        logger.info("this result is : {}" ,result);
        return result;
    }

    /**
     * 检测用户是否登录
     * @param request
     * @return
     */
    @GetMapping("/is-login/{tokenId}")
    public String getUserIsLogin(HttpServletRequest request){
        Cookie[] cookies = request.getCookies();
        if(EmptyChecker.isEmpty(cookies)){
            return new BaseRespDTO(ResultCode.LOGIN_EFFICACY).toString();
        }
        Cookie tokenCookie = Stream.of(cookies).filter(c -> "tokenId".equals(c.getName())).findFirst().orElse(null);
        if(EmptyChecker.isEmpty(tokenCookie)){
            return new BaseRespDTO(ResultCode.LOGIN_EFFICACY).toString();
        }
        logger.info("the params of getUserIsLogin is :{}",tokenCookie.getValue());
        String result = this.restTemplate.getForEntity(Constant.GET_USER_IS_LOGIN,String.class,tokenCookie.getValue()).getBody();
        logger.info("this result of getUserIsLogin is : {}" ,result);
        return result;
    }


    /**
     * 保存内部用户信息
     * @param request
     * @return
     */
    @PostMapping("/save-user")
    public String saveUserInfo(HttpServletRequest request){
        Map<String,String> params = ControllerUtil.getParamtersMap(request);
        logger.info("the params of saveUserInfo is :{}",params);
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON_UTF8);
            HttpEntity entity = new HttpEntity(params,headers);
            String result = this.restTemplate.postForEntity(Constant.SAVE_USER,entity,String.class).getBody();
            logger.info("this result of saveUserInfo is : {}" ,result);
            return result;
        }catch (Exception e){
            logger.error("exception occurred in saveUserInfo :",e);
            return new BaseRespDTO(ResultCode.ERROR).toString();
        }
    }

    /**
     * 用户退出登录
     * @param request
     * @return
     */
    @PostMapping("/logout")
    public String userLogout(HttpServletRequest request,HttpServletResponse response){
        try {
            //获取当前登录用户
            Cookie[] cookies = request.getCookies();
            if(EmptyChecker.isEmpty(cookies)){
                return new BaseRespDTO().toString();
            }
            Cookie tokenCookie = Stream.of(cookies).filter(s -> "tokenId".equals(s.getName())).findFirst().orElse(null);
            if(EmptyChecker.isEmpty(tokenCookie) || EmptyChecker.isEmpty(tokenCookie.getValue())){
                return new BaseRespDTO().toString();
            }
            String tokenId = tokenCookie.getValue();
            logger.debug("current loginUser token :{}",tokenId);
            String result = this.restTemplate.postForEntity(Constant.USER_LOGOUT,null,String.class,tokenId).getBody();
            JSONObject object = JSONObject.parseObject(result);
            if(!ResultCode.OK.getCode().equals(object.getString("code"))){
                return new BaseRespDTO(ResultCode.FAIL).toString();
            }
            if(!object.getBoolean("data")){
                return new BaseRespDTO(ResultCode.FAIL).toString();
            }
            //清除cookie
            Cookie clearCookie = new Cookie("tokenId",null);
            clearCookie.setMaxAge(-1);
            clearCookie.setDomain("joninfo.cn");
            clearCookie.setPath("/");
            response.addCookie(clearCookie);
            logger.info("success! user already logout.");
            return new BaseRespDTO().toString();
        }catch (Exception e){
            logger.error("exception occurred in userLogout :",e);
            return new BaseRespDTO(ResultCode.ERROR).toString();
        }
    }
}
