package com.cloud.base.web;

import org.junit.Test;

/**
 * @author Jon_China
 * @create 2018/3/30
 */
public class BinaryTest {
    @Test
    public void test(){
        int a = -6;
        for (int i = 0; i < 32; i++) {
            int t =(a & 0x80000000 >>> i ) >>>(31 - i);
            System.out.print(t);
        }
    }
}
