package com.kkroegeraraustech.Hawkeye_Android.Utils.WebAppInterfaces;

import android.content.Context;
import android.location.Location;
import android.util.Log;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import android.widget.Toast;

/**
 * Created by Ken Heron Systems on 3/1/2016.
 */
public class WAI_Markers {

    private Context mContext;
    private WebView mWebView;
    private boolean mDoneLoading;

    /** Instantiate the interface and set the context */
    WAI_Markers(Context c, WebView wv) {
        mContext = c;
        mWebView = wv;
        mDoneLoading = true;
    }

    @JavascriptInterface
    public void doneLoading(){
        mDoneLoading = true;
        mWebView.post(new Runnable() {
            @Override
            public void run() {
                mWebView.loadUrl("javascript:addMarkerAtLocation([37.890476,-76.814011])");
            }
        });
    }
    @JavascriptInterface
    public void updateLatLon(double lat, double lon){

    }
    @JavascriptInterface
    public void showToast(String toast) {
        Toast.makeText(mContext, toast, Toast.LENGTH_SHORT).show();
    }

    @JavascriptInterface
    public void returnResult(String dialogMsg){
        Log.v(null, dialogMsg);
    }
}
