package com.kkroegeraraustech.Hawkeye_Android.Utils.WebAppInterfaces;

import android.content.Context;
import android.location.Location;
import android.util.Log;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;

/**
 * Created by Ken Heron Systems on 3/1/2016.
 */
public class WAI_Operator {

    private Context mContext;
    private WebView mWebView;
    private boolean mDoneLoading;

    /** Instantiate the interface and set the context */
    WAI_Operator(Context c, WebView wv) {
        mContext = c;
        mWebView = wv;
        mDoneLoading = false;
    }

    @JavascriptInterface
    public void doneLoading(){
        mDoneLoading = true;
    }

    @JavascriptInterface
    public void updateUserLocation(final Location userLocation){
        mWebView.post(new Runnable() {
            @Override
            public void run() {
                Log.d("LOC", String.valueOf(userLocation.getLatitude()) + "," + String.valueOf(userLocation.getLongitude()));
                String locString ="javascript:updateUserLocation(["+ String.valueOf(userLocation.getLatitude()) + "," +String.valueOf(userLocation.getLongitude())+ "])";
                mWebView.loadUrl(locString);
            }
        });
    }
}
