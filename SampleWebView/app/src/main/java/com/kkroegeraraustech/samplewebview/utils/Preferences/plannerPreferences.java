package com.kkroegeraraustech.samplewebview.utils.Preferences;

import android.content.Context;
import android.content.SharedPreferences;
import android.preference.PreferenceManager;
import android.support.v4.content.LocalBroadcastManager;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by Ken Heron Systems on 2/20/2016.
 * This class handles all of the preferences of the planner itself. These are more generic that
 * cannot fit within any of the other preference classes currently configured.
 */
public class plannerPreferences {

    private final SharedPreferences prefs;
    private final LocalBroadcastManager lbm;

    public plannerPreferences(Context context) {
        prefs = PreferenceManager.getDefaultSharedPreferences(context);
        lbm = LocalBroadcastManager.getInstance(context);
    }


    private static final String PREF_KEEP_SCREEN_ON = "pref_keep_screen_bright";
    private static final boolean DEFAULT_KEEP_SCREEN_ON = true;
    /**
     * @return true if the device screen should stay on.
     */
    public boolean keepScreenOn() {
        return prefs.getBoolean(PREF_KEEP_SCREEN_ON, DEFAULT_KEEP_SCREEN_ON);
    }

    private static final String PREF_UI_LANGUAGE = "pref_ui_language_english";
    public static final boolean DEFAULT_PREF_UI_LANGUAGE = false;

    private static final String PREF_SPEECH_PERIOD = "tts_periodic_status_period";
    public static final String DEFAULT_SPEECH_PERIOD = "0";
    public int getSpokenStatusInterval() {
        return Integer.parseInt(prefs.getString(PREF_SPEECH_PERIOD, DEFAULT_SPEECH_PERIOD));
    }

    public static final String PREF_TTS_LOST_SIGNAL = "tts_lost_signal";
    public static final boolean DEFAULT_TTS_WARNING_LOST_SIGNAL = true;
    public boolean getWarningOnLostOrRestoredSignal() {
        return prefs.getBoolean(PREF_TTS_LOST_SIGNAL, DEFAULT_TTS_WARNING_LOST_SIGNAL);
    }

    public static final String PREF_TTS_LOW_SIGNAL = "tts_low_signal";
    public static final boolean DEFAULT_TTS_WARNING_LOW_SIGNAL = false;
    public boolean getWarningOnLowSignalStrength() {
        return prefs.getBoolean(PREF_TTS_LOW_SIGNAL, DEFAULT_TTS_WARNING_LOW_SIGNAL);
    }

    public static final String PREF_TTS_AUTOPILOT_WARNING = "tts_autopilot_warning";
    public static final boolean DEFAULT_TTS_WARNING_AUTOPILOT_WARNING = true;
    public boolean getWarningOnAutopilotWarning() {
        return prefs.getBoolean(PREF_TTS_AUTOPILOT_WARNING, DEFAULT_TTS_WARNING_AUTOPILOT_WARNING);
    }

    public static final String PREF_ENABLE_KILL_SWITCH = "pref_enable_kill_switch";
    private static final boolean DEFAULT_ENABLE_KILL_SWITCH = false;
    public boolean isKillSwitchEnabled() {
        return prefs.getBoolean(PREF_ENABLE_KILL_SWITCH, DEFAULT_ENABLE_KILL_SWITCH);
    }


    public static final String PREF_WARNING_GROUND_COLLISION = "pref_ground_collision_warning";
    private static final boolean DEFAULT_WARNING_GROUND_COLLISION = false;
    public boolean getImminentGroundCollisionWarning() {
        return prefs.getBoolean(PREF_WARNING_GROUND_COLLISION, DEFAULT_WARNING_GROUND_COLLISION);
    }

    public static final String PREF_UNIT_SYSTEM = "pref_unit_system";
    private static final int DEFAULT_UNIT_SYSTEM = UnitSystem.AUTO;
    public int getUnitSystemType() {
        String unitSystem = prefs.getString(PREF_UNIT_SYSTEM, null);
        if (unitSystem == null)
            return DEFAULT_UNIT_SYSTEM;

        return Integer.parseInt(unitSystem);
    }




}
