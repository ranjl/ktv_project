package com.ktv_app; 

import android.content.BroadcastReceiver;  

import android.content.Context;  

import android.content.Intent;  

import android.util.Log;

public class BootBroadcastReceiver extends BroadcastReceiver {

    // 系统启动完成   
    static final String ACTION = "android.intent.action.BOOT_COMPLETED";
    
    @Override
    public void onReceive(Context context, Intent intent) {
        
        Log.d("BootBroadcastReceiver", intent.getAction()); 

        // 当收听到的事件是“BOOT_COMPLETED”时，就创建并启动相应的Activity和Service     
        if (intent.getAction().equals(ACTION)) {    
            Intent activityIntent = new Intent(context, MainActivity.class);    // 开机启动的Activity
            activityIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            // 启动Activity     
            context.startActivity(activityIntent);
        }    
    }

}