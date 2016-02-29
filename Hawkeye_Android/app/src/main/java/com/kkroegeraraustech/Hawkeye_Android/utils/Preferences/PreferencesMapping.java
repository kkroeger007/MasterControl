package com.kkroegeraraustech.Hawkeye_Android.Utils.Preferences;

/**
 * Created by Ken Heron Systems on 2/20/2016.
 */

import android.content.Context;
import android.content.SharedPreferences;
import android.preference.PreferenceManager;
import android.support.v4.content.LocalBroadcastManager;

import com.kkroegeraraustech.Hawkeye_Android.Utils.CameraPanMode;

/**
 * Provides structured access to Droidplanner preferences
 * <p/>
 * Over time it might be good to move the various places that are doing
 * prefs.getFoo(blah, default) here - to collect prefs in one place and avoid
 * duplicating string constants (which tend to become stale as code evolves).
 * This is called the DRY (don't repeat yourself) principle of software
 * development.
 */
public class PreferencesMapping {
    /*
  * Default preference value
  */
    public static final String PREF_USAGE_STATISTICS = "pref_usage_statistics";
    public static final boolean DEFAULT_USAGE_STATISTICS = true;

    public static final String PREF_MAX_ZOOM_LEVEL = "pref_max_zoom_level";
    public int getMaxZoomLevel(){
        return prefs.getInt(PREF_MAX_ZOOM_LEVEL, 22);
    }
    public void setMaxZoomLevel(int maxZoom){
        prefs.edit().putString(PREF_MAX_ZOOM_LEVEL, String.valueOf(maxZoom)).apply();
    }


    public static final String PREF_MIN_ZOOM_LEVEL = "pref_min_zoom_level";
    public int getMinZoomLevel(){
        return prefs.getInt(PREF_MAX_ZOOM_LEVEL, 0);
    }
    public void setMinZoomLevel(int minZoom){
        prefs.edit().putString(PREF_MIN_ZOOM_LEVEL, String.valueOf(minZoom)).apply();
    }

    public static final String PREF_LIMIT_ZOOM_IMAGERY_BASED = "pref_zoom_image_level_based";
    public boolean isZoomRestrictedToImageLevel(){
        return prefs.getBoolean(PREF_LIMIT_ZOOM_IMAGERY_BASED, false);
    }
    public void setZoomRestrictionToImageLevel(boolean restrictZoom){
        prefs.edit().putString(PREF_LIMIT_ZOOM_IMAGERY_BASED, String.valueOf(restrictZoom)).apply();
    }


    public static final String PREF_MAPS_PROVIDERS = "pref_maps_providers_key";
    //private static final String DEFAULT_MAPS_PROVIDER = DPMapProvider.DEFAULT_MAP_PROVIDER.name();
    public static final String PREF_MAPS_PROVIDER_SETTINGS = "pref_map_provider_settings";

    private static final CameraPanMode DEFAULT_AUTO_PAN_MODE = CameraPanMode.DISABLED;
    /**
     * Updates the map auto panning target.
     *
     * @param target
     */
    public void setAutoPanMode(CameraPanMode target) {
        prefs.edit().putString(CameraPanMode.PREF_KEY, target.name()).apply();
    }


    public static final String PREF_ENABLE_MAP_ROTATION = "pref_map_enable_rotation";
    private static final boolean DEFAULT_ENABLE_MAP_ROTATION = true;
    public boolean isMapRotationEnabled() {
        return prefs.getBoolean(PREF_ENABLE_MAP_ROTATION, DEFAULT_ENABLE_MAP_ROTATION);
    }

    public static final String PREF_SHOW_GPS_HDOP = "pref_ui_gps_hdop";
    public static final boolean DEFAULT_SHOW_GPS_HDOP = false;

    private static final String PREF_UI_REALTIME_FOOTPRINTS = "pref_ui_realtime_footprints_key";
    private static final boolean DEFAULT_UI_REALTIME_FOOTPRINTS = false;


    // Public for legacy usage
    public final SharedPreferences prefs;
    private final LocalBroadcastManager lbm;

    public PreferencesMapping(Context context) {
        prefs = PreferenceManager.getDefaultSharedPreferences(context);
        lbm = LocalBroadcastManager.getInstance(context);
    }

    public boolean isLiveUploadEnabled() {
        // FIXME: Disabling live upload as it often causes the app to freeze on
        // disconnect.
        // return
        // prefs.getBoolean(PREF_LIVE_UPLOAD_ENABLED, DEFAULT_LIVE_UPLOAD_ENABLED);
        return false;
    }


    /**
     * How many times has this application been started? (will increment for
     * each call)
     */
    public int getNumberOfRuns() {
        int r = prefs.getInt("num_runs", 0) + 1;

        prefs.edit().putInt("num_runs", r).apply();

        return r;
    }

    /**
     * @return true if google analytics reporting is enabled.
     */
    public boolean isUsageStatisticsEnabled() {
        return prefs.getBoolean(PREF_USAGE_STATISTICS, DEFAULT_USAGE_STATISTICS);
    }







    /**
     * @return the target for the map auto panning.
     */
    public CameraPanMode getAutoPanMode() {
        final String defaultAutoPanModeName = DEFAULT_AUTO_PAN_MODE.name();
        final String autoPanTypeString = prefs.getString(CameraPanMode.PREF_KEY,
                defaultAutoPanModeName);
        try {
            return CameraPanMode.valueOf(autoPanTypeString);
        } catch (IllegalArgumentException e) {
            return DEFAULT_AUTO_PAN_MODE;
        }
    }

    /**
     * Use HDOP instead of satellite count on infobar
     */
    public boolean shouldGpsHdopBeDisplayed() {
        return prefs.getBoolean(PREF_SHOW_GPS_HDOP, DEFAULT_SHOW_GPS_HDOP);
    }

    public boolean isRealtimeFootprintsEnabled() {
        return prefs.getBoolean(PREF_UI_REALTIME_FOOTPRINTS, DEFAULT_UI_REALTIME_FOOTPRINTS);
    }

    public String getMapProviderName() {
        return("BAD");
        //return prefs.getString(PREF_MAPS_PROVIDERS, DEFAULT_MAPS_PROVIDER);
    }

    /**
     * Returns the map provider selected by the user.
     *
     * @return selected map provider
     */
//    public DPMapProvider getMapProvider() {
//        final String mapProviderName = getMapProviderName();
//
//        return mapProviderName == null ? DPMapProvider.DEFAULT_MAP_PROVIDER : DPMapProvider.getMapProvider
//                (mapProviderName);
//    }



}
