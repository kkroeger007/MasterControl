package com.kkroegeraraustech.parsersampleapplication;

import android.location.Location;
import android.location.LocationManager;
import android.location.LocationProvider;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.Toast;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Locale;
import java.util.TimeZone;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class MainActivity extends AppCompatActivity {

    private static final String LOG_TAG = "UsbGPS";

    private String fixTime = null;
    private long fixTimestamp;

    private boolean hasGGA = false;
    private boolean hasRMC = false;
    private LocationManager lm;
    private float precision = 10f;
    private boolean mockGpsAutoEnabled = false;
    private boolean mockGpsEnabled = false;
    private String mockLocationProvider = null;
    private boolean oneExectuion = false;
    private Location fix = null;

    private int mockStatus = LocationProvider.OUT_OF_SERVICE;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Snackbar.make(view, "Replace with your own action", Snackbar.LENGTH_LONG)
                        .setAction("Action", null).show();
            }
        });

        String gpsSentence = "$GPGGA,140941.041,3848.1108,N,077004.0625,W,1,07,1.4,59.0,M,-33.5,M,,0000*5B\r\n";
        Pattern xx = Pattern.compile("\\$([^*$]*)(?:\\*([0-9A-F][0-9A-F]))?\r\n");
        Matcher m = xx.matcher(gpsSentence);
        String nmeaSentence = "";
        String sentence = "";
        String checkSum = "";
        if (m.matches()) {
            nmeaSentence = m.group(0);
            sentence = m.group(1);
            checkSum = m.group(2);

            StringBuffer buf = new StringBuffer(gpsSentence);
            buf.replace(0,m.end(),"");
            String remainingSentence = buf.toString();

        }
        TextUtils.SimpleStringSplitter splitter = new TextUtils.SimpleStringSplitter(',');
        splitter.setString(sentence);
        String command = splitter.next();
        if (command.equals("GPGGA")){
				/* $GPGGA,123519,4807.038,N,01131.000,E,1,08,0.9,545.4,M,46.9,M,,*47

					Where:
					     GGA          Global Positioning System Fix Data
					     123519       Fix taken at 12:35:19 UTC
					     4807.038,N   Latitude 48 deg 07.038' N
					     01131.000,E  Longitude 11 deg 31.000' E
					     1            Fix quality: 0 = invalid
					                               1 = GPS fix (SPS)
					                               2 = DGPS fix
					                               3 = PPS fix
											       4 = Real Time Kinematic
											       5 = Float RTK
					                               6 = estimated (dead reckoning) (2.3 feature)
											       7 = Manual input mode
											       8 = Simulation mode
					     08           Number of satellites being tracked
					     0.9          Horizontal dilution of position
					     545.4,M      Altitude, Meters, above mean sea level
					     46.9,M       Height of geoid (mean sea level) above WGS84
					                      ellipsoid
					     (empty field) time in seconds since last DGPS update
					     (empty field) DGPS station ID number
					     *47          the checksum data, always begins with *
				 */
            // UTC time of fix HHmmss.S
            String time = splitter.next();
            // latitude ddmm.M
            String lat = splitter.next();
            // direction (N/S)
            String latDir = splitter.next();
            // longitude dddmm.M
            String lon = splitter.next();
            // direction (E/W)
            String lonDir = splitter.next();
				/* fix quality:
				  	0= invalid
					1 = GPS fix (SPS)
					2 = DGPS fix
					3 = PPS fix
					4 = Real Time Kinematic
					5 = Float RTK
					6 = estimated (dead reckoning) (2.3 feature)
					7 = Manual input mode
					8 = Simulation mode
				 */
            String quality = splitter.next();
            // Number of satellites being tracked
            String nbSat = splitter.next();
            // Horizontal dilution of position (float)
            String hdop = splitter.next();
            // Altitude, Meters, above mean sea level
            String alt = splitter.next();
            // Height of geoid (mean sea level) above WGS84 ellipsoid
            String geoAlt = splitter.next();
            // time in seconds since last DGPS update
            // DGPS station ID number
            if (quality != null && !quality.equals("") && !quality.equals("0") ){
                if (this.mockStatus != LocationProvider.AVAILABLE){
                    long updateTime = parseNmeaTime(time);
                    notifyStatusChanged(LocationProvider.AVAILABLE, null, updateTime);
                }
                if (! time.equals(fixTime)){
                    notifyFix(fix);
                    fix = new Location(mockLocationProvider);
                    fixTime = time;
                    fixTimestamp = parseNmeaTime(time);
                    fix.setTime(fixTimestamp);
                    Log.v(LOG_TAG, "Fix: " + fix);
                }
                if (lat != null && !lat.equals("")){
                    fix.setLatitude(parseNmeaLatitude(lat,latDir));
                }
                if (lon != null && !lon.equals("")){
                    fix.setLongitude(parseNmeaLongitude(lon,lonDir));
                }
                if (hdop != null && !hdop.equals("")){
                    fix.setAccuracy(Float.parseFloat(hdop)*precision);
                }
                if (alt != null && !alt.equals("")){
                    fix.setAltitude(Double.parseDouble(alt));
                }
                if (nbSat != null && !nbSat.equals("")){
                    Bundle extras = new Bundle();
                    extras.putInt("satellites", Integer.parseInt(nbSat));
                    fix.setExtras(extras);
                }
            }
        }
    }

    private void notifyFix(Location fix) throws SecurityException {
        fixTime = null;
        hasGGA = false;
        hasRMC=false;
        if (fix != null){
            Log.v(LOG_TAG, "New Fix: "+System.currentTimeMillis()+" "+fix);
            if (lm != null && mockGpsEnabled){
                lm.setTestProviderLocation(mockLocationProvider, fix);
                Log.v(LOG_TAG, "New Fix notified to Location Manager: "+mockLocationProvider);
            }
            this.fix = null;
        }
    }


    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }

    public double parseNmeaLatitude(String lat,String orientation){
        double latitude = 0.0;
        if (lat != null && orientation != null && !lat.equals("") && !orientation.equals("")){
            double temp1 = Double.parseDouble(lat);
            double temp2 = Math.floor(temp1/100);
            double temp3 = (temp1/100 - temp2)/0.6;
            if (orientation.equals("S")){
                latitude = -(temp2+temp3);
            } else if (orientation.equals("N")){
                latitude = (temp2+temp3);
            }
        }
        return latitude;
    }
    public double parseNmeaLongitude(String lon,String orientation){
        double longitude = 0.0;
        if (lon != null && orientation != null && !lon.equals("") && !orientation.equals("")){
            double temp1 = Double.parseDouble(lon);
            double temp2 = Math.floor(temp1/100);
            double temp3 = (temp1/100 - temp2)/0.6;
            if (orientation.equals("W")){
                longitude = -(temp2+temp3);
            } else if (orientation.equals("E")){
                longitude = (temp2+temp3);
            }
        }
        return longitude;
    }
    public float parseNmeaSpeed(String speed,String metric){
        float meterSpeed = 0.0f;
        if (speed != null && metric != null && !speed.equals("") && !metric.equals("")){
            float temp1 = Float.parseFloat(speed)/3.6f;
            if (metric.equals("K")){
                meterSpeed = temp1;
            } else if (metric.equals("N")){
                meterSpeed = temp1*1.852f;
            }
        }
        return meterSpeed;
    }
    public long parseNmeaTime(String time){
        long timestamp = 0;
        SimpleDateFormat fmt = new SimpleDateFormat("HHmmss.SSS");
        fmt.setTimeZone(TimeZone.getTimeZone("GMT"));
        try {
            if (time != null && time != null){
                long now = System.currentTimeMillis();
                long today = now - (now %86400000L);
                long temp1;
                // sometime we don't have millisecond in the time string, so we have to reformat it
                temp1 = fmt.parse(String.format((Locale)null,"%010.3f", Double.parseDouble(time))).getTime();
                long temp2 = today+temp1;
                // if we're around midnight we could have a problem...
                if (temp2 - now > 43200000L) {
                    timestamp  = temp2 - 86400000L;
                } else if (now - temp2 > 43200000L){
                    timestamp  = temp2 + 86400000L;
                } else {
                    timestamp  = temp2;
                }
            }
        } catch (ParseException e) {
            Log.e(LOG_TAG, "Error while parsing NMEA time", e);
        }
        return timestamp;
    }
    public byte computeChecksum(String s){
        byte checksum = 0;
        for (char c : s.toCharArray()){
            checksum ^= (byte)c;
        }
        return checksum;
    }

    private void notifyStatusChanged(int status, Bundle extras, long updateTime){
        fixTime = null;
        hasGGA = false;
        hasRMC=false;
        if (this.mockStatus != status){
            Log.d(LOG_TAG, "New mockStatus: " + System.currentTimeMillis() + " " + status);
            if (lm != null && mockGpsEnabled){
                lm.setTestProviderStatus(mockLocationProvider, status, extras, updateTime);
                // lm.setTestProviderStatus(mockLocationProvider, status, extras, SystemClock.elapsedRealtime());
                // lm.setTestProviderStatus(mockLocationProvider, status, extras, 50);
                Log.v(LOG_TAG, "New mockStatus notified to Location Manager: " + status + " "+mockLocationProvider);
            }
            this.fix = null;
            this.mockStatus = status;
        }
    }
}
