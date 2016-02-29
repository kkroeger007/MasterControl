package com.kkroegeraraustech.Hawkeye_Android.Utils.Preferences;

import android.content.Context;
import android.content.SharedPreferences;
import android.preference.PreferenceManager;
import android.support.v4.content.LocalBroadcastManager;

/**
 * Created by Ken Heron Systems on 2/21/2016.
 * This class handles the bluetooth connection preferences to a paired device.
 * The thought is that the bluetooth connection would be to manage peripheral devices
 * on the aircraft or to enable communications between the pilot and suboperators
 */
public class PreferencesBluetooth {

    private final SharedPreferences prefs;
    private final LocalBroadcastManager lbm;

    public  PreferencesBluetooth(Context context) {
        prefs = PreferenceManager.getDefaultSharedPreferences(context);
        lbm = LocalBroadcastManager.getInstance(context);
    }

    private static final String PREF_BT_DEVICE_NAME = "pref_bluetooth_device_name";
    public static final String PREF_BT_DEVICE_ADDRESS = "pref_bluetooth_device_address";

    public String getBluetoothDeviceName() {
        return prefs.getString(PREF_BT_DEVICE_NAME, null);
    }

    public void setBluetoothDeviceName(String deviceName) {
        prefs.edit().putString(PREF_BT_DEVICE_NAME, deviceName).apply();
    }

    public String getBluetoothDeviceAddress() {
        return prefs.getString(PREF_BT_DEVICE_ADDRESS, null);
    }

    public void setBluetoothDeviceAddress(String newAddress) {
        final SharedPreferences.Editor editor = prefs.edit();
        editor.putString(PREF_BT_DEVICE_ADDRESS, newAddress)
                .apply();
    }
}
