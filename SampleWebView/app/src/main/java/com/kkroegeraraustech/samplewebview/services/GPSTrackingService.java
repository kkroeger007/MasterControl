package com.kkroegeraraustech.samplewebview.services;

/**
 * Created by Ken Heron Systems on 2/9/2016.
 */
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.location.Location;
import android.os.Binder;
import android.os.Bundle;
import android.os.IBinder;
import android.util.Log;
import android.widget.Toast;

import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.api.GoogleApiClient;
import com.google.android.gms.common.api.GoogleApiClient.ConnectionCallbacks;
import com.google.android.gms.common.api.GoogleApiClient.OnConnectionFailedListener;
import com.google.android.gms.location.LocationListener;
import com.google.android.gms.location.LocationRequest;
import com.google.android.gms.location.LocationServices;
import com.kkroegeraraustech.samplewebview.R;

import java.text.DateFormat;
import java.util.Date;
import java.util.logging.Handler;

public class GPSTrackingService extends Service implements GoogleApiClient.ConnectionCallbacks,GoogleApiClient.OnConnectionFailedListener,LocationListener{

    public GPSTrackingService(){

    }
    public static String TAG = "GPS_TRACKING_SERVICE";

    Context mContext;
    private final IBinder mIBinder = new LocalBinder();
    private Handler mHandler = null;
    private UpdateGPSListener mOnServiceListenerGPS_Remote;

    @Override
    public IBinder onBind(Intent intent) {
        return mIBinder;
    }

    public class LocalBinder extends Binder {
        public GPSTrackingService getService(){
            return GPSTrackingService.this;
        }
    }

    public void setHandler(Handler handler)
    {
        mHandler = handler;
    }

    @Override
    public boolean onUnbind(Intent intent) {
        stopLocationUpdates();
        mGoogleApiClient.disconnect();
        return false;
        //return super.onUnbind(intent);
    }

    public void setOnServiceListener(UpdateGPSListener serviceListener) {
        mOnServiceListenerGPS_Remote = serviceListener;
    }



    /**
     * FLAGS for the GOOGLE API Services
     */
    private static final long TIME_MAX_WAIT_PERIOD = 5000; //ms
    private static final long TIME_UPDATE_INTERVAL = 1000; // ms
    private static final long TIME_UPDATE_FASTEST_INTERVAL = 500; // ms
    private static final float DIST_MIN_UPDATE = 0.25f; // m

    /**
     * Keys for storing activity state in the Bundle.
     */
    protected final static String REQUESTING_LOCATION_UPDATES_KEY = "requesting-location-updates-key";
    protected final static String LOCATION_KEY = "location-key";
    protected final static String LAST_UPDATED_TIME_STRING_KEY = "last-updated-time-string-key";

    /**
     * Provides the entry point to Google Play services.
     */
    protected GoogleApiClient mGoogleApiClient;

    /**
     * Stores parameters for requests to the FusedLocationProviderApi.
     */
    protected LocationRequest mLocationRequest;

    /**
     * Location datatype holders for current and last locations
     */
    protected Location mCurrentLocation;
    protected Location mLastLocation;

    /**
     * Tracks the status of the location updates request. Value changes when the user presses the
     * Start Updates and Stop Updates buttons.
     */
    protected Boolean mRequestingLocationUpdates;


    /**
     * Represents approrpiate public interface callbacks for implementers to use to get
     * information from the service
     */
    public interface UpdateGPSListener
    {
        public void onUpdateLocation(Location newLocation);
    }

    /**
     * Time when the location was updated represented as a String.
     */
    protected String mLastUpdateTime;

    public  GPSTrackingService(Context context){
        mContext = context;
    }

    @Override
    public void onCreate() {
        Log.e("TAG","onCreate");
        this.mContext = getApplicationContext();
        try {
            mRequestingLocationUpdates = true;
            mCurrentLocation = new Location("");
            mLastUpdateTime = "";
            buildGoogleApiClient();
            mGoogleApiClient.connect();
        } catch (Exception e) {
            e.printStackTrace();
        }
        super.onCreate();
    }

    @Override
    public void onDestroy() {
        stopLocationUpdates();
        super.onDestroy();
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        if (intent != null) {
            if (intent.hasExtra(REQUESTING_LOCATION_UPDATES_KEY))
                mRequestingLocationUpdates = intent.getBooleanExtra(REQUESTING_LOCATION_UPDATES_KEY, false);
            if (intent.hasExtra(LOCATION_KEY))
                mCurrentLocation = intent.getParcelableExtra(LOCATION_KEY);
            if (intent.hasExtra(LAST_UPDATED_TIME_STRING_KEY))
                mLastUpdateTime = intent.getStringExtra(LAST_UPDATED_TIME_STRING_KEY);
        }
            super.onStartCommand(intent, flags, startId);
            return START_STICKY;
    }

    /**
     * Google Play services required function implementation
     */

    /**
     * Builds a GoogleApiClient. Uses the {@code #addApi} method to request the
     * LocationServices API.
     */
    protected synchronized void buildGoogleApiClient() {
        Log.i(TAG, "Building GoogleApiClient");
        mGoogleApiClient = new GoogleApiClient.Builder(this)
                .addConnectionCallbacks(this)
                .addOnConnectionFailedListener(this)
                .addApi(LocationServices.API)
                .build();
        createLocationRequest();
    }

    /**
     * Sets up the location request. Android has two location request settings:
     * {@code ACCESS_COARSE_LOCATION} and {@code ACCESS_FINE_LOCATION}. These settings control
     * the accuracy of the current location. This sample uses ACCESS_FINE_LOCATION, as defined in
     * the AndroidManifest.xml.
     * <p/>
     * When the ACCESS_FINE_LOCATION setting is specified, combined with a fast update
     * interval (5 seconds), the Fused Location Provider API returns location updates that are
     * accurate to within a few feet.
     * <p/>
     * These settings are appropriate for mapping applications that show real-time location
     * updates.
     */
    protected void createLocationRequest() {
        mLocationRequest = new LocationRequest();

        // Sets the desired interval for active location updates. This interval is
        // inexact. You may not receive updates at all if no location sources are available, or
        // you may receive them slower than requested. You may also receive updates faster than
        // requested if other applications are requesting location at a faster interval.
        mLocationRequest.setInterval(TIME_UPDATE_INTERVAL);
        mLocationRequest.setMaxWaitTime(TIME_MAX_WAIT_PERIOD);
        // Sets the fastest rate for active location updates. This interval is exact, and your
        // application will never receive updates faster than this value.
        mLocationRequest.setFastestInterval(TIME_UPDATE_FASTEST_INTERVAL);
        mLocationRequest.setPriority(LocationRequest.PRIORITY_HIGH_ACCURACY);
    }


    @Override
    public void onConnected(Bundle connectionHint){
        Log.i(TAG,"Connected to GoogleAPIClient");

        // If the initial location was never previously requested, we use
        // FusedLocationApi.getLastLocation() to get it. If it was previously requested, we store
        // its value in the Bundle and check for it in onCreate(). We
        // do not request it again unless the user specifically requests location updates by pressing
        // the Start Updates button.
        //
        // Because we cache the value of the initial location in the Bundle, it means that if the
        // user launches the activity,
        // moves to a new location, and then changes the device orientation, the original location
        // is displayed as the activity is re-created.
        if (mCurrentLocation == null) {
            mCurrentLocation = LocationServices.FusedLocationApi.getLastLocation(mGoogleApiClient);
            mLastUpdateTime = DateFormat.getTimeInstance().format(new Date());
        }

        // If the user presses the Start Updates button before GoogleApiClient connects, we set
        // mRequestingLocationUpdates to true (see startUpdatesButtonHandler()). Here, we check
        // the value of mRequestingLocationUpdates and if it is true, we start location updates.
        if (mGoogleApiClient.isConnected() && mRequestingLocationUpdates) {
            startLocationUpdates();
        }
    }

    /**
     * Requests location updates from the FusedLocationApi.
     */
    protected void startLocationUpdates() {
        // The final argument to {@code requestLocationUpdates()} is a LocationListener
        // (http://developer.android.com/reference/com/google/android/gms/location/LocationListener.html).
        if(mGoogleApiClient.isConnected())
            LocationServices.FusedLocationApi.requestLocationUpdates(mGoogleApiClient, mLocationRequest, this);
    }

    /**
     * Removes location updates from the FusedLocationApi.
     */
    protected void stopLocationUpdates() {
        // It is a good practice to remove location requests when the activity is in a paused or
        // stopped state. Doing so helps battery performance and is especially
        // recommended in applications that request frequent location updates.

        // The final argument to {@code requestLocationUpdates()} is a LocationListener
        // (http://developer.android.com/reference/com/google/android/gms/location/LocationListener.html).
        if(mGoogleApiClient.isConnected())
            LocationServices.FusedLocationApi.removeLocationUpdates(mGoogleApiClient, this);
    }

    /**
     * Callback that fires when the location changes.
     */
    @Override
    public void onLocationChanged(Location location) {
        mCurrentLocation = location;
        mLastUpdateTime = DateFormat.getTimeInstance().format(new Date());
        mOnServiceListenerGPS_Remote.onUpdateLocation(mCurrentLocation);
        Toast.makeText(this, getResources().getString(R.string.location_updated_message),
                Toast.LENGTH_SHORT).show();
    }

    @Override
    public void onConnectionSuspended(int cause) {
        // The connection to Google Play services was lost for some reason. We call connect() to
        // attempt to re-establish the connection.
        Log.i(TAG, "Connection suspended");
        mGoogleApiClient.connect();
    }

    @Override
    public void onConnectionFailed(ConnectionResult result) {
        // Refer to the javadoc for ConnectionResult to see what error codes might be returned in
        // onConnectionFailed.
        Log.i(TAG, "Connection failed: ConnectionResult.getErrorCode() = " + result.getErrorCode());
    }


    /**
     * Stores activity data in the Bundle.
     */
    public void onSaveInstanceState(Bundle savedInstanceState) {
        savedInstanceState.putBoolean(REQUESTING_LOCATION_UPDATES_KEY, mRequestingLocationUpdates);
        savedInstanceState.putParcelable(LOCATION_KEY, mCurrentLocation);
        savedInstanceState.putString(LAST_UPDATED_TIME_STRING_KEY, mLastUpdateTime);
        //super.onSaveInstanceState(savedInstanceState);
    }
}