package com.kkroegeraraustech.Hawkeye_Android.Utils.Preferences;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.preference.PreferenceManager;
import android.support.v4.content.LocalBroadcastManager;
import android.text.TextUtils;

import com.o3dr.services.android.lib.util.Utils;

/**
 * Created by Ken Heron Systems on 2/21/2016.
 * This class contains vehicle preferences that should be agnostic to vehicle autopilot type and/or
 * configuration generally
 */
public class PreferencesVehicle {

    // Public for legacy usage
    public final SharedPreferences prefs;
    private final LocalBroadcastManager lbm;

    public PreferencesVehicle(Context context) {
        prefs = PreferenceManager.getDefaultSharedPreferences(context);
        lbm = LocalBroadcastManager.getInstance(context);
    }

    public static final String ACTION_PREF_RETURN_TO_ME_UPDATED = Utils.PACKAGE_NAME + ".action.PREF_RETURN_TO_ME_UPDATED";
    public static final String PREF_RETURN_TO_ME = "pref_enable_return_to_me";
    public static final boolean DEFAULT_RETURN_TO_ME = false;
    public boolean isReturnToMeEnabled() {
        return prefs.getBoolean(PREF_RETURN_TO_ME, DEFAULT_RETURN_TO_ME);
    }
    public void enableReturnToMe(boolean isEnabled) {
        prefs.edit().putBoolean(PREF_RETURN_TO_ME, isEnabled).apply();
        lbm.sendBroadcast(new Intent(ACTION_PREF_RETURN_TO_ME_UPDATED).putExtra(PREF_RETURN_TO_ME, isEnabled));
    }


    public static final String PREF_ALT_MAX_VALUE = "pref_alt_max_value";
    private static final double DEFAULT_MAX_ALT = 200; //meters
    /**
     * @return the max altitude in meters
     */
    public double getMaxAltitude() {
        return getAltitudePreference(PREF_ALT_MAX_VALUE, DEFAULT_MAX_ALT);
    }


    public static final String PREF_ALT_MIN_VALUE = "pref_alt_min_value";
    private static final double DEFAULT_MIN_ALT = 0; // meter
    /**
     * @return the min altitude in meters
     */
    public double getMinAltitude() {
        return getAltitudePreference(PREF_ALT_MIN_VALUE, DEFAULT_MIN_ALT);
    }


    public static final String PREF_ALT_DEFAULT_VALUE = "pref_alt_default_value";
    private static final double DEFAULT_ALT = 20; // meters
    /**
     * @return the default starting altitude in meters
     */
    public double getDefaultAltitude() {
        return getAltitudePreference(PREF_ALT_DEFAULT_VALUE, DEFAULT_ALT);
    }


    public void setAltitudePreference(String prefKey, double altitude) {
        prefs.edit().putString(prefKey, String.valueOf(altitude)).apply();
    }

    private double getAltitudePreference(String prefKey, double defaultValue) {
        final String maxAltValue = prefs.getString(prefKey, null);
        if (TextUtils.isEmpty(maxAltValue))
            return defaultValue;

        try {
            final double maxAlt = Double.parseDouble(maxAltValue);
            return maxAlt;
        } catch (Exception e) {
            return defaultValue;
        }
    }


    public static final String PREF_MAX_ALT_WARNING = "pref_max_alt_warning";
    public static final boolean DEFAULT_MAX_ALT_WARNING = false;
    public boolean hasExceededMaxAltitude(double currentAltInMeters) {
        final boolean isWarningEnabled = prefs.getBoolean(PREF_MAX_ALT_WARNING, DEFAULT_MAX_ALT_WARNING);
        if (!isWarningEnabled)
            return false;

        final double maxAltitude = getMaxAltitude();
        return currentAltInMeters > maxAltitude;
    }

    public static final String PREF_AUTO_INSERT_MISSION_TAKEOFF_RTL_LAND = "pref_auto_insert_mission_takeoff_rtl_land";
}
