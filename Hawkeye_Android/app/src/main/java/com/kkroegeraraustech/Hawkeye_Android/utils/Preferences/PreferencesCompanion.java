package com.kkroegeraraustech.Hawkeye_Android.Utils.Preferences;

import android.content.Context;
import android.content.SharedPreferences;
import android.preference.PreferenceManager;
import android.support.v4.content.LocalBroadcastManager;

/**
 * Created by Ken Heron Systems on 2/21/2016.
 * This class would hold any perferences of the companion devices
 */
public class PreferencesCompanion {

    private final SharedPreferences prefs;
    private final LocalBroadcastManager lbm;

    public  PreferencesCompanion(Context context) {
        prefs = PreferenceManager.getDefaultSharedPreferences(context);
        lbm = LocalBroadcastManager.getInstance(context);
    }
}
