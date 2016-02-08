package com.kkroegeraraustech.samplewebview;

import android.Manifest;
import android.annotation.SuppressLint;
import android.app.Activity;
import android.app.Application;
import android.content.ClipData;
import android.content.ContentResolver;
import android.content.ContentUris;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.database.Cursor;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.preference.PreferenceManager;
import android.provider.DocumentsContract;
import android.provider.MediaStore;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.support.v4.provider.DocumentFile;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.View;
import android.view.Menu;
import android.view.MenuItem;
import android.support.v7.app.AlertDialog;

import android.webkit.JavascriptInterface;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.net.URI;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import com.kkroegeraraustech.samplewebview.StorageHelper;

public class MainActivity extends AppCompatActivity {

    SharedPreferences mSharedPreferences;
    String URI;

    private static final int REQUEST_EXTERNAL_STORAGE = 1;
    private static String[] PERMISSIONS_STORAGE = {
            Manifest.permission.READ_EXTERNAL_STORAGE,
            Manifest.permission.WRITE_EXTERNAL_STORAGE
    };

    private void testDocumentTree() {

//        Intent shareIntent = new Intent();
//        shareIntent.setAction(Intent.ACTION_SEND);
//        shareIntent.putExtra(Intent.EXTRA_STREAM, uriToImage);
//        shareIntent.setType("image/jpeg");

        Intent intent = new Intent(Intent.ACTION_MEDIA_SHARED);
        startActivityForResult(intent, 42);
    }

    public void onActivityResult(int requestCode, int resultCode, Intent resultData) {
        String TAG = "onActivityResult";
        if (resultCode == RESULT_OK) {
            Uri treeUri = resultData.getData();
            SharedPreferences.Editor editor = mSharedPreferences.edit();
            editor.putString("URI",treeUri.toString());
            editor.commit();
            Log.d(null,treeUri.toString());
            DocumentFile pickedDir = DocumentFile.fromTreeUri(this, treeUri);
            // List all existing files inside picked directory
            for (DocumentFile file : pickedDir.listFiles()) {
                Log.d(TAG, "Found file " + file.getName() + " with size " + file.length());
            }

            // Create a new file and write into it
            DocumentFile newFile = pickedDir.createFile("text/plain", "My Novel");
            try {
                OutputStream out = getContentResolver().openOutputStream(newFile.getUri());
                out.write("A long time ago...".getBytes());
                out.close();
            } catch (FileNotFoundException e) {
                Log.d(TAG, "File Not Found, reason: ", e);
            } catch (IOException e) {
                Log.d(TAG,"IOException, reason: ", e);
            }
        }
    }

    /**
     * Checks if the app has permission to write to device storage
     *
     * If the app does not has permission then the user will be prompted to grant permissions
     *
     * @param activity
     */
    public static void verifyStoragePermissions(Activity activity) {
        // Check if we have write permission
        int permission = ActivityCompat.checkSelfPermission(activity, Manifest.permission.WRITE_EXTERNAL_STORAGE);

        if (permission != PackageManager.PERMISSION_GRANTED) {
            // We don't have permission so prompt the user
            ActivityCompat.requestPermissions(
                    activity,
                    PERMISSIONS_STORAGE,
                    REQUEST_EXTERNAL_STORAGE
            );
        }
    }
    private File currentDir;
    private TextView tv;
    private static final String TAG = "MEDIA";

    private void writeExternalStorage(){
        StorageHelper temp = new StorageHelper();
    }
    private void writeToSDFile() {
        // Find the root of the external storage.
        // See http://developer.android.com/guide/topics/data/data-  storage.html#filesExternal
        File root = android.os.Environment.getExternalStorageDirectory();
        //Environment.getExternalStoragePublicDirectory()
        File dir = root.getAbsoluteFile();
        // See http://stackoverflow.com/questions/3551821/android-write-to-sd-card-folder
        //dir = new File (root.getAbsolutePath() + "../extSdCard/FieldImages"); //wrote to internal directory

        File dirnew = new File(dir.getParent());
        File dirfinal = new File(dirnew.getParent() + "/extSdCard/FieldImages/mydata.txt");
        Log.d("Files", "Path: " + dirfinal.getPath());
//        String path = dirnew.getParent();
        File file[] = new File(dirnew.getParentFile() + "/extSdCard/FieldImages").listFiles();
        Log.d("Files", "Size: " + file.length);
        for (int i = 0; i < file.length; i++) {
            Log.d("Files", "FileName:" + file[i].getName());
        }

//        String pathnew = dir.getParent() + "/legacy";
//        Log.d("Files", "Pathnew: " + pathnew);
//        File fnew = new File(pathnew);
//        File filenew[] = f.listFiles();
//        Log.d("Files", "Size: "+ filenew.length);
//        for (int i=0; i < filenew.length; i++)
//        {
//            Log.d("Files", "FileName:" + filenew[i].getName());
//        }
        //dir.mkdirs();
        //File file = new File(dir, "myData.txt");

//        try {
//            FileOutputStream f = new FileOutputStream(dirfinal);
//            PrintWriter pw = new PrintWriter(f);
//            pw.println("Hi , How are you");
//            pw.println("Hello");
//            pw.flush();
//            pw.close();
//            f.close();
//        } catch (FileNotFoundException e) {
//            e.printStackTrace();
//            Log.i(TAG, "******* File not found. Did you" +
//                    " add a WRITE_EXTERNAL_STORAGE permission to the   manifest?");
//        } catch (IOException e) {
//            e.printStackTrace();
//        }


        //Get the text file
        File filetest = dirfinal;

        //Read text from file
        StringBuilder text = new StringBuilder();

        try {
            BufferedReader br = new BufferedReader(new FileReader(filetest));
            String line;

            while ((line = br.readLine()) != null) {
                text.append(line);
                text.append('\n');
            }
            br.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
            Log.i(TAG, "******* File not found. Did you" +
                    " add a WRITE_EXTERNAL_STORAGE permission to the   manifest?");
        } catch (IOException e) {
            e.printStackTrace();
        }

        Log.v(null,text.toString());

    }

    String tmpString = "<!doctype html>\n<html>\n<head>\n\t</head>\n\t<body>\n\t\t<center>\n\t\t\t<div id='msg'>Hello World!</div>\n\t\t</center>\n\t</body>\n</html>";
    private static final String URL = "file:///android_asset/test3.html";
    private WebView mWebView;

    //Button b1;
    EditText ed1;



    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        verifyStoragePermissions(this);
        //testDocumentTree();
        mWebView = (WebView) findViewById(R.id.webView);
        mWebView.getSettings().setJavaScriptEnabled(true);
        mWebView.setWebChromeClient(new WebChromeClient());
        //mSharedPreferences = PreferenceManager.getDefaultSharedPreferences(this);

        //writeToSDFile();

        //URI = mSharedPreferences.getString("URI", "DEFAULT");

//        File newFile = new File(getRealPathFromURI(treeUri));
//        Log.d(TAG,"The file path is possibly" + newFile.getAbsolutePath());
        if(URI == "DEFAULT")
        {
            //The operator has not previously configured the use of the SD card
            //We can ask them to by performing the following call
            //testDocumentTree();
        }
        if(URI != "DEFAULT"){
            //The operator has previously configured the SD card for use
            //we can now search the SD card for imagery
        }
//        writeExternalStorage();
//       checkExternalMedia();


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

//        Uri treeUri = Uri.parse(URI);
//        Intent shareIntent = new Intent();
//        shareIntent.setAction(Intent.ACTION_SEND);
//        shareIntent.putExtra(Intent.EXTRA_STREAM, treeUri);
//        shareIntent.setType("image/*");
//        startActivity(shareIntent);
        refreshWebView();

        mWebView.addJavascriptInterface(new WebAppInterface(this), "Android");

    }
    private String getRealPathFromURI(Uri contentURI) {
        String result;
        Cursor cursor = getContentResolver().query(contentURI, null, null, null, null);
        if (cursor == null) { // Source is Dropbox or other similar local file path
            result = contentURI.getPath();
        } else {
            cursor.moveToFirst();
            int idx = cursor.getColumnIndex(MediaStore.Images.ImageColumns.DATA);
            result = cursor.getString(idx);
            cursor.close();
        }
        return result;
    }


    private void refreshWebView() {
        //mWebView.loadData(tmpString, "text/html", "UTF-8");
        mWebView.loadUrl(URL);
    }

    public class WebAppInterface{
        Context mContext;

        /** Instantiate the interface and set the context */
        WebAppInterface(Context c) {
            mContext = c;
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
        public void updateLatLon(double lat, double lon){

        }
        @JavascriptInterface
        public void showToast(String toast) {
            Toast.makeText(mContext, toast, Toast.LENGTH_SHORT).show();
        }

        @JavascriptInterface
        public void returnResult(String dialogMsg){
            Log.v(null,dialogMsg);
        }
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


