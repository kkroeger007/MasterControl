package com.kkroegeraraustech.Hawkeye_Android;

import android.Manifest;
import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.BroadcastReceiver;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.ServiceConnection;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.database.Cursor;
import android.location.Location;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.IBinder;
import android.provider.MediaStore;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.LocalBroadcastManager;
import android.support.v7.app.AppCompatActivity;
import android.text.TextUtils;
import android.util.Log;

import android.view.View;
import android.webkit.JavascriptInterface;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicBoolean;

import com.kkroegeraraustech.Hawkeye_Android.Services.Service_GPSInternal;
import com.kkroegeraraustech.Hawkeye_Android.Utils.Preferences.PreferencesApplicaiton;
import com.kkroegeraraustech.Hawkeye_Android.Utils.file.IO.ExceptionWriter;
import com.o3dr.android.client.ControlTower;
import com.o3dr.android.client.Drone;
import com.o3dr.android.client.interfaces.DroneListener;
import com.o3dr.android.client.interfaces.TowerListener;
import com.o3dr.services.android.lib.drone.attribute.AttributeEvent;
import com.o3dr.services.android.lib.drone.attribute.AttributeType;
import com.o3dr.services.android.lib.drone.connection.ConnectionParameter;
import com.o3dr.services.android.lib.drone.connection.ConnectionResult;
import com.o3dr.services.android.lib.drone.connection.ConnectionType;
import com.o3dr.services.android.lib.drone.property.Attitude;
import com.o3dr.services.android.lib.util.Utils;

public class MainActivity extends AppCompatActivity implements DroneListener, TowerListener {

    private final Handler handler = new Handler();
    private final List<ApiListener> apiListeners = new ArrayList<ApiListener>();
    private PreferencesApplicaiton preferencesApplication;

    private LocalBroadcastManager lbm;

    private Thread.UncaughtExceptionHandler exceptionHandler;

    private ControlTower controlTower;
    private Drone drone;

    private static final long DELAY_TO_DISCONNECTION = 1000l; // ms

    private static final String TAG = PrimaryApp_3DR.class.getSimpleName();

    public static final String ACTION_TOGGLE_DRONE_CONNECTION = Utils.PACKAGE_NAME
            + ".ACTION_TOGGLE_DRONE_CONNECTION";
    public static final String EXTRA_ESTABLISH_CONNECTION = "extra_establish_connection";

    public static final String ACTION_DRONE_CONNECTION_FAILED = Utils.PACKAGE_NAME
            + ".ACTION_DRONE_CONNECTION_FAILED";

    public static final String EXTRA_CONNECTION_FAILED_ERROR_CODE = "extra_connection_failed_error_code";

    public static final String EXTRA_CONNECTION_FAILED_ERROR_MESSAGE = "extra_connection_failed_error_message";

    public static final String ACTION_DRONE_EVENT = Utils.PACKAGE_NAME + ".ACTION_DRONE_EVENT";
    public static final String EXTRA_DRONE_EVENT = "extra_drone_event";

    private static final AtomicBoolean isCellularNetworkOn = new AtomicBoolean(false);



    WebAppInterface mWebAppInterface;
    /**
     * Create a GPS Service Listener that updates the user location
     */
    private boolean mGPSServiceBounded = false;
    private Service_GPSInternal mGPSTrackingService = new Service_GPSInternal(MainActivity.this);
    private Location mCurrentLOC;
    public ServiceConnection mConnectionGPS = new ServiceConnection() {
        @Override
        public void onServiceConnected(ComponentName name, IBinder service) {
            // We've bound to LocalService, cast the IBinder and get LocalService instance
            Service_GPSInternal.LocalBinder binder = (Service_GPSInternal.LocalBinder) service;
            mGPSTrackingService = binder.getService();
            mGPSServiceBounded = true;
            mGPSTrackingService.setOnServiceListener(mGPSListener);
        }

        @Override
        public void onServiceDisconnected(ComponentName name) {
            mGPSTrackingService = null;
            mGPSServiceBounded = false;
        }
    };


    private Service_GPSInternal.UpdateGPSListener mGPSListener = new Service_GPSInternal.UpdateGPSListener() {
        @Override
        public void onUpdateLocation(final Location newLocation) {
            if(newLocation != null) {
                mCurrentLOC.setLatitude(newLocation.getLatitude());
                mCurrentLOC.setLongitude(newLocation.getLongitude());
                mCurrentLOC.setAccuracy(newLocation.getAccuracy());
                mCurrentLOC.setAltitude(newLocation.getAltitude());
                mCurrentLOC.setBearing(newLocation.getBearing());
                testThis(newLocation);
            }
        }
    };
    public void testThis(Location testLocation){
        mWebAppInterface.updateUserLocation(testLocation);
    }

    private void doBindServices() {
        Intent intent = new Intent(this, Service_GPSInternal.class);
        startService(intent);
        mGPSServiceBounded = bindService(intent, mConnectionGPS, Context.BIND_AUTO_CREATE);
    }

    private void doUnbindService()
    {
        if (mGPSServiceBounded)
        {
            // Detach our existing connection.
            unbindService(mConnectionGPS);
            mGPSServiceBounded = false;
        }
    }

    protected void onResume() {
        super.onResume();
    }
    @Override
    protected void onPause() {
        super.onPause();

    }
    @Override
    protected void onDestroy() {
        super.onDestroy();
        doUnbindService();
        stopService(new Intent(this, Service_GPSInternal.class));
    }

    @Override
    protected void onStart(){
        super.onStart();
        controlTower.connect(this);
        doBindServices();
    }

    @Override
    protected void onStop(){
        super.onStop();
        controlTower.unregisterDrone(drone);
        controlTower.disconnect();
    }


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
//        switch (requestCode) {
//// Check for the integer request code originally supplied to startResolutionForResult().
//            case REQUEST_CHECK_SETTINGS:
//                switch (resultCode) {
//                    case Activity.RESULT_OK:
//                        startLocationUpdates();
//                        break;
//                    case Activity.RESULT_CANCELED
//                        settingsrequest();//keep asking if imp or do whatever
//                        break;
//                }
//                break;
//        }
//        String TAG = "onActivityResult";
//        if (resultCode == RESULT_OK) {
//            Uri treeUri = resultData.getData();
//            SharedPreferences.Editor editor = mSharedPreferences.edit();
//            editor.putString("URI",treeUri.toString());
//            editor.commit();
//            Log.d(null,treeUri.toString());
//            DocumentFile pickedDir = DocumentFile.fromTreeUri(this, treeUri);
//            // List all existing files inside picked directory
//            for (DocumentFile file : pickedDir.listFiles()) {
//                Log.d(TAG, "Found file " + file.getName() + " with size " + file.length());
//            }
//
//            // Create a new file and write into it
//            DocumentFile newFile = pickedDir.createFile("text/plain", "My Novel");
//            try {
//                OutputStream out = getContentResolver().openOutputStream(newFile.getUri());
//                out.write("A long time ago...".getBytes());
//                out.close();
//            } catch (FileNotFoundException e) {
//                Log.d(TAG, "File Not Found, reason: ", e);
//            } catch (IOException e) {
//                Log.d(TAG,"IOException, reason: ", e);
//            }
//        }
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
    private static final String URL = "file:///android_asset/index.html";
    private WebView mWebView;

    //Button b1;
    EditText ed1;

    TextView attitudeText;


    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        final Context context = getApplicationContext();

        preferencesApplication = new PreferencesApplicaiton(context);

        mWebAppInterface = new WebAppInterface(this);
        mCurrentLOC = new Location("");

        verifyStoragePermissions(this);
        //testDocumentTree();
        mWebView = (WebView) findViewById(R.id.webView);

        WebSettings webSettings = mWebView.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setRenderPriority(WebSettings.RenderPriority.HIGH);
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

        lbm = LocalBroadcastManager.getInstance(context);

        controlTower = new ControlTower(context);
        drone = new Drone(context);

        final Thread.UncaughtExceptionHandler dpExceptionHandler = new Thread.UncaughtExceptionHandler() {
            @Override
            public void uncaughtException(Thread thread, Throwable ex) {
                new ExceptionWriter(ex).saveStackTraceToSD(context);
                exceptionHandler.uncaughtException(thread, ex);
            }
        };

        exceptionHandler = Thread.getDefaultUncaughtExceptionHandler();
        Thread.setDefaultUncaughtExceptionHandler(dpExceptionHandler);


        final IntentFilter intentFilter = new IntentFilter();
        intentFilter.addAction(ACTION_TOGGLE_DRONE_CONNECTION);

        registerReceiver(broadcastReceiver, intentFilter);

        connectToDrone();
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
        float testFloat;
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


    //This is the Drone stuff required...initially just gonna drop it here



    private final Runnable disconnectionTask = new Runnable() {
        @Override
        public void run() {
            controlTower.unregisterDrone(drone);
            controlTower.disconnect();

            handler.removeCallbacks(this);
        }
    };


    private final BroadcastReceiver broadcastReceiver = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
            final String action = intent.getAction();

            switch (action) {
                case ACTION_TOGGLE_DRONE_CONNECTION:
                    boolean connect = intent.getBooleanExtra(EXTRA_ESTABLISH_CONNECTION,
                            !drone.isConnected());

                    if (connect)
                        connectToDrone();
                    else
                        disconnectFromDrone();
                    break;
            }
        }
    };

    public void connectToDrone() {
        Bundle extraParams = new Bundle();
        extraParams.putInt(ConnectionType.EXTRA_USB_BAUD_RATE, 57600); // Set default baud rate to 57600
        ConnectionParameter connectionParams = new ConnectionParameter(ConnectionType.TYPE_USB, extraParams, null);
        drone.connect(connectionParams);

    }

    private ConnectionParameter retrieveConnectionParameters() {
        final int connectionType = preferencesApplication.preferencesCommunication.getConnectionParameterType();
        Bundle extraParams = new Bundle();
        ConnectionParameter connParams;

        extraParams.putInt(ConnectionType.EXTRA_USB_BAUD_RATE, preferencesApplication.preferencesCommunication.getUsbBaudRate());
        connParams = new ConnectionParameter(connectionType, extraParams, null);

        return connParams;
    }

    public static void connectToDrone(Context context) {
        context.sendBroadcast(new Intent(PrimaryApp_3DR.ACTION_TOGGLE_DRONE_CONNECTION)
                .putExtra(PrimaryApp_3DR.EXTRA_ESTABLISH_CONNECTION, true));
    }

    public static void disconnectFromDrone(Context context) {
        context.sendBroadcast(new Intent(PrimaryApp_3DR.ACTION_TOGGLE_DRONE_CONNECTION)
                .putExtra(PrimaryApp_3DR.EXTRA_ESTABLISH_CONNECTION, false));
    }

    public void disconnectFromDrone() {
        if (drone.isConnected()) {
            drone.disconnect();
        }
    }

    public Drone getDrone() {
        return this.drone;
    }



    @Override
    public void onDroneConnectionFailed(ConnectionResult result) {
        String errorMsg = result.getErrorMessage();
        Toast.makeText(getApplicationContext(), "Connection failed: " + errorMsg,
                Toast.LENGTH_LONG).show();

        lbm.sendBroadcast(new Intent(ACTION_DRONE_CONNECTION_FAILED)
                .putExtra(EXTRA_CONNECTION_FAILED_ERROR_CODE, result.getErrorCode())
                .putExtra(EXTRA_CONNECTION_FAILED_ERROR_MESSAGE, result.getErrorMessage()));
    }

    protected void alertUser(String message) {
        Toast.makeText(getApplicationContext(), message, Toast.LENGTH_SHORT).show();
        Log.d(TAG, message);
    }


    @Override
    public void onDroneEvent(String event, Bundle extras) {
        switch(event) {
            case AttributeEvent.STATE_CONNECTED:
                alertUser("Drone Connected");
                break;
            case AttributeEvent.ATTITUDE_UPDATED:
                Attitude tmpAttitude = this.drone.getAttribute(AttributeType.ATTITUDE);
                attitudeText.setText(Double.toString(tmpAttitude.getRoll()));
                Log.d("KEN", Double.toString(tmpAttitude.getRoll()));
                break;
        }
    }

    @Override
    public void onDroneServiceInterrupted(String errorMsg) {
        controlTower.unregisterDrone(drone);

        if (!TextUtils.isEmpty(errorMsg))
            Log.e(TAG, errorMsg);
    }

    @Override
    public void onTowerConnected() {
        drone.unregisterDroneListener(this);

        controlTower.registerDrone(drone, handler);
        drone.registerDroneListener(this);

        //notifyApiConnected();
    }

    @Override
    public void onTowerDisconnected() {
        notifyApiDisconnected();
    }


    public interface ApiListener {
        void onApiConnected();

        void onApiDisconnected();
    }


    public void addApiListener(ApiListener listener) {
        if (listener == null)
            return;

        handler.removeCallbacks(disconnectionTask);
        boolean isTowerConnected = controlTower.isTowerConnected();
        if (isTowerConnected)
            listener.onApiConnected();

        if (!isTowerConnected) {
            try {
                controlTower.connect(this);
            } catch (IllegalStateException e) {
                //Ignore
            }
        }

        apiListeners.add(listener);
    }

    public void removeApiListener(ApiListener listener) {
        if (listener != null) {
            apiListeners.remove(listener);
            if (controlTower.isTowerConnected())
                listener.onApiDisconnected();
        }

        shouldWeTerminate();
    }

    private void shouldWeTerminate() {
        if (apiListeners.isEmpty() && !drone.isConnected()) {
            // Wait 30s, then disconnect the service binding.
            handler.postDelayed(disconnectionTask, DELAY_TO_DISCONNECTION);
        }
    }

    private void notifyApiConnected() {
        if (apiListeners.isEmpty())
            return;

        for (ApiListener listener : apiListeners)
            listener.onApiConnected();
    }

    private void notifyApiDisconnected() {
        if (apiListeners.isEmpty())
            return;

        for (ApiListener listener : apiListeners)
            listener.onApiDisconnected();
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


