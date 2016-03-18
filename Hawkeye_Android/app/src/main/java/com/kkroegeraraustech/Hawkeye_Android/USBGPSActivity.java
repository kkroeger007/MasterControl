package com.kkroegeraraustech.Hawkeye_Android;

import android.annotation.SuppressLint;
import android.content.BroadcastReceiver;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.ServiceConnection;
import android.location.Location;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.IBinder;
import android.os.Message;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.webkit.JavascriptInterface;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

import java.lang.ref.WeakReference;
import java.util.Set;

import com.kkroegeraraustech.Hawkeye_Android.Services.USB.Service_USBGPS;

public class USBGPSActivity extends AppCompatActivity {

    /*
     * Notifications from Service_USBGPS will be received here.
     */
    private final BroadcastReceiver mUsbReceiver = createBroadcastReceiver();
    private Service_USBGPS usbService;
    private MyHandler mHandler;

    private final ServiceConnection usbConnection = new ServiceConnection() {
        @Override
        public void onServiceConnected(ComponentName name, IBinder service) {
            Service_USBGPS.LocalBinder binder = (Service_USBGPS.LocalBinder) service;
            usbService = binder.getService();
            usbService.setHandler(mHandler);
            usbService.setOnServiceListener(mDeviceListener);
        }

        @Override
        public void onServiceDisconnected(ComponentName arg0) {
            usbService = null;
        }
    };

    private Service_USBGPS.UpdateUSBGPSListener mDeviceListener = new Service_USBGPS.UpdateUSBGPSListener() {
        @Override
        public void onUpdateGPS(Location locationUpdate) {
            mWebAppInterface.updateUserLocation(locationUpdate);
        }
    };

    private static final String URL = "file:///android_asset/index.html";
    private WebView mWebView;
    WebAppInterface mWebAppInterface;

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        mHandler = new MyHandler(this);
        setContentView(R.layout.activity_main);

        mWebAppInterface = new WebAppInterface(this);
        mWebView = (WebView) findViewById(R.id.webView);

        WebSettings webSettings = mWebView.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setCacheMode(WebSettings.LOAD_CACHE_ELSE_NETWORK);
        webSettings.setAppCacheEnabled(true);
        webSettings.setDomStorageEnabled(true);
        webSettings.setLayoutAlgorithm(WebSettings.LayoutAlgorithm.NARROW_COLUMNS);
        webSettings.setUseWideViewPort(true);
        mWebView.setWebViewClient(new WebViewClient());

        if (Build.VERSION.SDK_INT >= 19) {
            mWebView.setLayerType(View.LAYER_TYPE_HARDWARE, null);
        }
        else {
            mWebView.setLayerType(View.LAYER_TYPE_SOFTWARE, null);
        }

        mWebView.setWebViewClient(new WebViewClient());

        refreshWebView();

        mWebView.addJavascriptInterface(new WebAppInterface(this), "Android");
    }

    private void refreshWebView() {
        mWebView.loadUrl(URL);
    }

    @Override
    public void onResume() {
        super.onResume();
        setFilters();  // Start listening notifications from Service_USBGPS
        startService(Service_USBGPS.class, usbConnection, null); // Start Service_USBGPS(if it was not started before) and Bind it
    }

    @Override
    public void onPause() {
        super.onPause();
        unregisterReceiver(mUsbReceiver);
        unbindService(usbConnection);
    }

    private void startService(Class<?> service, ServiceConnection serviceConnection, Bundle extras) {
        if (!Service_USBGPS.SERVICE_CONNECTED) {
            Intent startService = new Intent(this, service);
            if (extras != null && !extras.isEmpty()) {
                Set<String> keys = extras.keySet();
                for (String key : keys) {
                    String extra = extras.getString(key);
                    startService.putExtra(key, extra);
                }
            }
            startService(startService);
        }
        Intent bindingIntent = new Intent(this, service);
        bindService(bindingIntent, serviceConnection, Context.BIND_AUTO_CREATE);
    }

    private void setFilters() {
        IntentFilter filter = new IntentFilter();
        filter.addAction(Service_USBGPS.ACTION_USB_PERMISSION_GRANTED);
        filter.addAction(Service_USBGPS.ACTION_NO_USB);
        filter.addAction(Service_USBGPS.ACTION_USB_DISCONNECTED);
        filter.addAction(Service_USBGPS.ACTION_USB_NOT_SUPPORTED);
        filter.addAction(Service_USBGPS.ACTION_USB_PERMISSION_NOT_GRANTED);
        registerReceiver(mUsbReceiver, filter);
    }

    /*
     * This handler will be passed to Service_USBGPS. Data received from serial port is displayed through this handler
     */
    private static class MyHandler extends Handler {
        private final WeakReference<USBGPSActivity> mActivity;

        public MyHandler(USBGPSActivity activity) {
            mActivity = new WeakReference<>(activity);
        }

        @Override
        public void handleMessage(Message msg) {
            switch (msg.what) {
                case Service_USBGPS.MESSAGE_RAW:
                    String data = (String) msg.obj;
                    Log.d("MessageRaw", "handleMessage: " + data);
//                    mActivity.get().display.append(data);
                    break;
                case Service_USBGPS.MESSAGE_GPS:
                    Location tmpLocation = (Location) msg.obj;
                    Log.d("NEW",tmpLocation.toString());
                    mActivity.get().updateData(tmpLocation);
                    break;
            }
        }
    }

    public void updateData(Location newLocation){
        if(newLocation != null) {
            mWebAppInterface.updateUserLocation(newLocation);
        }
    }

    private BroadcastReceiver createBroadcastReceiver(){
        return new BroadcastReceiver() {
            @Override
            public void onReceive(Context context, Intent intent) {
                switch (intent.getAction()) {
                    case Service_USBGPS.ACTION_USB_PERMISSION_GRANTED: // USB PERMISSION GRANTED
                        Toast.makeText(context, "USB Ready", Toast.LENGTH_SHORT).show();
                        break;
                    case Service_USBGPS.ACTION_USB_PERMISSION_NOT_GRANTED: // USB PERMISSION NOT GRANTED
                        Toast.makeText(context, "USB Permission not granted", Toast.LENGTH_SHORT).show();
                        break;
                    case Service_USBGPS.ACTION_NO_USB: // NO USB CONNECTED
                        Toast.makeText(context, "No USB connected", Toast.LENGTH_SHORT).show();
                        break;
                    case Service_USBGPS.ACTION_USB_DISCONNECTED: // USB DISCONNECTED
                        Toast.makeText(context, "USB disconnected", Toast.LENGTH_SHORT).show();
                        break;
                    case Service_USBGPS.ACTION_USB_NOT_SUPPORTED: // USB NOT SUPPORTED
                        Toast.makeText(context, "USB device not supported", Toast.LENGTH_SHORT).show();
                        break;
                }
            }
        };
    }

    public class WebAppInterface{
        Context mContext;
        /** Instantiate the interface and set the context */
        WebAppInterface(Context c) {
            mContext = c;
        }

        @JavascriptInterface
        public void updateUserLocation(final Location userLocation){
            mWebView.post(new Runnable() {
                @Override
                public void run() {
                    //Log.d("LOC",String.valueOf(userLocation.getLatitude()) + "," +String.valueOf(userLocation.getLongitude()));
                    String locString ="javascript:updateUserLocation("+ String.valueOf(userLocation.getLatitude()) + "," +String.valueOf(userLocation.getLongitude())+ ")";
                    mWebView.loadUrl(locString);
                    locString ="javascript:updateUserAccuracy("+ String.valueOf(userLocation.getAccuracy())+ ")";
                    mWebView.loadUrl(locString);
                }
            });
        }
        @JavascriptInterface
        public void doneLoading(){
            mWebView.post(new Runnable() {
                @Override
                public void run() {
                    mWebView.loadUrl("javascript:addMarkerAtLocation([37.890476,-76.814011])");
                }
            });
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
}
