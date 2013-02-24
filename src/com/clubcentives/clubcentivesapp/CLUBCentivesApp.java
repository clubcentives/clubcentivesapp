/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
 */

package com.clubcentives.clubcentivesapp;

import android.os.Bundle;
import org.apache.cordova.*;
import android.graphics.Color;

public class CLUBCentivesApp extends DroidGap
{
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        
    	// configure settings - see documentation: https://svn.apache.org/repos/asf/incubator/callback/phonegap-android/trunk/framework/src/com/phonegap/DroidGap.java
        super.setIntegerProperty("backgroundColor", Color.WHITE);
        super.setStringProperty("loadingDialog", "Loading page...");
        super.setStringProperty("loadingPageDialog", "Loading page...");
        super.setBooleanProperty("loadInWebView", true);
        super.setStringProperty("errorUrl", "file:///android_asset/www/loaderror.html");
        
        // Set by <content src="index.html" /> in config.xml
        //super.setIntegerProperty("splashscreen", R.drawable.splash); 
        //super.loadUrl(Config.getStartUrl(), 3000);
        //super.loadUrl("file:///android_asset/www/index.html")
        
        // load the initial page
        super.loadUrl("file:///android_asset/www/index.html", 2000);
        

    }
}

