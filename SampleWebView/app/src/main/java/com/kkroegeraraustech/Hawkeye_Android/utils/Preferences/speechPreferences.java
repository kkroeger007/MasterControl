package com.kkroegeraraustech.Hawkeye_Android.utils.Preferences;

import android.content.Context;
import android.content.SharedPreferences;
import android.preference.PreferenceManager;
import android.support.v4.content.LocalBroadcastManager;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by Ken Heron Systems on 2/21/2016.
 * This class handles the speech preferences of the device. This would often be
 * periodic readouts and callouts in either emergencies, changes, and/or alerts to an operator.
 */
public class speechPreferences {

    private final SharedPreferences prefs;
    private final LocalBroadcastManager lbm;

    public speechPreferences(Context context) {
        prefs = PreferenceManager.getDefaultSharedPreferences(context);
        lbm = LocalBroadcastManager.getInstance(context);
    }
    public static final String PREF_TTS_PERIODIC = "tts_periodic";


    private static final String PREF_IS_TTS_ENABLED = "pref_enable_tts";
    private static final boolean DEFAULT_TTS_ENABLED = false;
    public boolean isTtsEnabled() {
        return prefs.getBoolean(PREF_IS_TTS_ENABLED, DEFAULT_TTS_ENABLED);
    }

    public static final String PREF_VEHICLE_HOME_UPDATE_WARNING = "pref_vehicle_home_update_warning";
    public static final boolean DEFAULT_VEHICLE_HOME_UPDATE_WARNING = true;
    public boolean getWarningOnVehicleHomeUpdate(){
        return prefs.getBoolean(PREF_VEHICLE_HOME_UPDATE_WARNING, DEFAULT_VEHICLE_HOME_UPDATE_WARNING);
    }

    public static final String PREF_TTS_PERIODIC_BAT_VOLT = "tts_periodic_bat_volt";
    private static final boolean DEFAULT_TTS_PERIODIC_BAT_VOLT = true;

    public static final String PREF_TTS_PERIODIC_ALT = "tts_periodic_alt";
    private static final boolean DEFAULT_TTS_PERIODIC_ALT = true;

    public static final String PREF_TTS_PERIODIC_RSSI = "tts_periodic_rssi";
    private static final boolean DEFAULT_TTS_PERIODIC_RRSI = true;

    public static final String PREF_TTS_PERIODIC_AIRSPEED = "tts_periodic_airspeed";
    private static final boolean DEFAULT_TTS_PERIODIC_AIRSPEED = true;

    public Map<String, Boolean> getPeriodicSpeechPrefs() {
        final Map<String, Boolean> speechPrefs = new HashMap<>();
        speechPrefs.put(PREF_TTS_PERIODIC_BAT_VOLT,
                prefs.getBoolean(PREF_TTS_PERIODIC_BAT_VOLT, DEFAULT_TTS_PERIODIC_BAT_VOLT));
        speechPrefs.put(PREF_TTS_PERIODIC_ALT,
                prefs.getBoolean(PREF_TTS_PERIODIC_ALT, DEFAULT_TTS_PERIODIC_ALT));
        speechPrefs.put(PREF_TTS_PERIODIC_AIRSPEED,
                prefs.getBoolean(PREF_TTS_PERIODIC_AIRSPEED, DEFAULT_TTS_PERIODIC_AIRSPEED));
        speechPrefs.put(PREF_TTS_PERIODIC_RSSI,
                prefs.getBoolean(PREF_TTS_PERIODIC_RSSI, DEFAULT_TTS_PERIODIC_RRSI));

        return speechPrefs;
    }
}
