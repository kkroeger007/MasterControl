package com.kkroegeraraustech.samplewebview;

import android.annotation.SuppressLint;
import android.content.Context;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v4.content.ContextCompat;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.view.Menu;
import android.view.MenuItem;

import android.webkit.JavascriptInterface;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import java.io.FileInputStream;
import java.io.FileOutputStream;


public class MainActivity extends AppCompatActivity {

    String tmpString = "<!doctype html>\n<html>\n<head>\n\t</head>\n\t<body>\n\t\t<center>\n\t\t\t<div id='msg'>Hello World!</div>\n\t\t</center>\n\t</body>\n</html>";
    private static final String URL = "file:///android_asset/test2.html";
    private WebView mWebView;

    //Button b1;
    EditText ed1;

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        mWebView = (WebView) findViewById(R.id.webView);
        mWebView.getSettings().setJavaScriptEnabled(true);
        mWebView.setWebChromeClient(new WebChromeClient());

        mWebView.setWebViewClient(new WebViewClient() {
            @Override
            public void onPageFinished(WebView view, String url) {
//                String user = ((EditText) findViewById(R.id.editText)).getText().toString();
//                if (user.isEmpty()) {
//                    user = "World";
//                }
//                String javascript = "javascript: document.getElementById('msg').innerHTML='Hello " + user + "!';";
//                view.loadUrl(javascript);
            }
        });

       // b1 = (Button) findViewById(R.id.button);

//        b1.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View v) {
//                refreshWebView();
//            }
//        });

        refreshWebView();
    }

    private void refreshWebView() {
        //mWebView.loadData(tmpString, "text/html", "UTF-8");
        mWebView.loadUrl(URL);
    }

}


//class MainActivityO extends AppCompatActivity {
//
//    Button b1;
//    EditText ed1;
//
//    private WebView wv1;
//
//    @Override
//    protected void onCreate(Bundle savedInstanceState) {
//        super.onCreate(savedInstanceState);
//        setContentView(R.layout.activity_main);
//
////        b1=(Button)findViewById(R.id.button);
////        ed1=(EditText)findViewById(R.id.editText);
//
//        wv1=(WebView)findViewById(R.id.webView);
//        WebSettings webSettings = wv1.getSettings();
//        webSettings.setJavaScriptEnabled(true);
//
//        wv1.addJavascriptInterface(new WebAppInterface(this), "Android");
//
//        wv1.setWebViewClient(new MyBrowser());
//
//        b1.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View v) {
////                String url = ed1.getText().toString();
////
////                wv1.getSettings().setLoadsImagesAutomatically(true);
////                wv1.getSettings().setJavaScriptEnabled(true);
////                wv1.setScrollBarStyle(View.SCROLLBARS_INSIDE_OVERLAY);
////                wv1.loadUrl(url);
//            }
//        });
//    }
//
//    public class WebAppInterface{
//        Context mContext;
//
//        /** Instantiate the interface and set the context */
//        WebAppInterface(Context c) {
//            mContext = c;
//        }
//
//        /** Show a toast from the web page */
//        @JavascriptInterface
//        public void showToast(String toast) {
//            Toast.makeText(mContext, toast, Toast.LENGTH_SHORT).show();
//        }
//    }
//    private class MyBrowser extends WebViewClient {
//        @Override
//        public boolean shouldOverrideUrlLoading(WebView view, String url) {
//            view.loadUrl(url);
//            return true;
//        }
//    }
//
//    @Override
//    public boolean onCreateOptionsMenu(Menu menu) {
//        // Inflate the menu; this adds items to the action bar if it is present.
//        getMenuInflater().inflate(R.menu.menu_main, menu);
//        return true;
//    }
//
//    @Override
//    public boolean onOptionsItemSelected(MenuItem item) {
//        // Handle action bar item clicks here. The action bar will
//        // automatically handle clicks on the Home/Up button, so long
//        // as you specify a parent activity in AndroidManifest.xml.
//
//        int id = item.getItemId();
//
//        //noinspection SimplifiableIfStatement
//        if (id == R.id.action_settings) {
//            return true;
//        }
//        return super.onOptionsItemSelected(item);
//    }
//}


