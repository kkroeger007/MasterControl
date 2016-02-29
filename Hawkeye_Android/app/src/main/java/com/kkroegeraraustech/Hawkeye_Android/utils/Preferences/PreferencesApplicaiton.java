package com.kkroegeraraustech.Hawkeye_Android.Utils.Preferences;

import android.content.Context;
import android.content.SharedPreferences;
import android.preference.PreferenceManager;
import android.support.v4.content.LocalBroadcastManager;

/**
 * Created by Ken Heron Systems on 2/24/2016.
 * This class manages all of the subclass instances of preferences. Since JAVA does not allow
 * extending of multiple classes this is the only way I can think of doing it.
 */
public class PreferencesApplicaiton {

    private final Context mContext;
    private final SharedPreferences prefs;
    private final LocalBroadcastManager lbm;

    public PreferencesBluetooth preferencesBluetooth;
    public PreferencesCommunication preferencesCommunication;
    public PreferencesCompanion preferencesCompanion;
    public PreferencesMapping preferencesMapping;
    public PreferencesPlanner preferencesPlanner;
    public PreferencesSpeech preferencesSpeech;
    public PreferencesVehicle preferencesVehicle;

    public PreferencesApplicaiton(Context context) {
        mContext = context;
        prefs = PreferenceManager.getDefaultSharedPreferences(context);
        lbm = LocalBroadcastManager.getInstance(context);

        updateContext(context);
    }

    private void updateContext(Context context){
        preferencesBluetooth = new PreferencesBluetooth(context);
        preferencesCommunication = new PreferencesCommunication(context);
        preferencesCompanion = new PreferencesCompanion(context);
        preferencesMapping = new PreferencesMapping(context);
        preferencesPlanner = new PreferencesPlanner(context);
        preferencesSpeech = new PreferencesSpeech(context) ;
        preferencesVehicle = new PreferencesVehicle(context);
    }
}
