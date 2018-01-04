package com.cloud.base.web.config;

import com.cloud.base.web.exception.UserAuthException;
import com.cloud.base.web.model.LoginUser;
import com.cloud.base.web.utils.EmptyChecker;

/**
 * 当前登录用户上下文
 *
 * @author Jon_China
 * @create 2017/11/11
 */
public final class LoginUserContext {

    private static ThreadLocal<LoginUser> userContext = new ThreadLocal<>();


    public static void addLoginUserContext(LoginUser loginUser){
        if(EmptyChecker.isEmpty(loginUser)){
            throw new UserAuthException("非法用户");
        }
        userContext.set(loginUser);
    }


    public static LoginUser getCurrentLoginUser(){
        return userContext.get();
    }

    public static void removeCurrentLoginUser(){
        userContext.remove();
    }


}
