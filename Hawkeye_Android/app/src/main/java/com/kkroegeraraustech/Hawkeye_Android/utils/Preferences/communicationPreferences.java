package com.kkroegeraraustech.Hawkeye_Android.utils.Preferences;

import android.content.Context;
import android.content.SharedPreferences;
import android.preference.PreferenceManager;
import android.support.v4.content.LocalBroadcastManager;

import com.o3dr.services.android.lib.drone.connection.ConnectionType;

/**
 * Created by Ken Heron Systems on 2/21/2016.
 * This class handles the general communication preferences required for communication with the
 * external radios or network based devices.
 */
public class communicationPreferences {

    private final SharedPreferences prefs;
    private final LocalBroadcastManager lbm;

    public communicationPreferences(Context context) {
        prefs = PreferenceManager.getDefaultSharedPreferences(context);
        lbm = LocalBroadcastManager.getInstance(context);
    }

    public static final String PREF_CONNECTION_TYPE = "pref_connection_param_type";
    public static final String DEFAULT_CONNECTION_TYPE = String.valueOf(ConnectionType.TYPE_USB);

    public static final String PREF_USB_BAUD_RATE = "pref_baud_type";
    private static final String DEFAULT_USB_BAUD_RATE = "57600";

    public static final String PREF_TCP_SERVER_IP = "pref_server_ip";
    private static final String DEFAULT_TCP_SERVER_IP = "192.168.40.100";

    public static final String PREF_TCP_SERVER_PORT = "pref_server_port";
    private static final String DEFAULT_TCP_SERVER_PORT = "5763";

    public static final String PREF_UDP_PING_RECEIVER_IP = "pref_udp_ping_receiver_ip";
    public static final String PREF_UDP_PING_RECEIVER_PORT = "pref_udp_ping_receiver_port";

    public static final String PREF_UDP_SERVER_PORT = "pref_udp_server_port";
    private static final String DEFAULT_UDP_SERVER_PORT = "14550";

    public static final String PREF_ENABLE_UDP_PING = "pref_enable_udp_server_ping";
    private static final boolean DEFAULT_ENABLE_UDP_PING = false;

    public void setUsbBaudRate(int baudRate) {
        prefs.edit().putString(PREF_USB_BAUD_RATE, String.valueOf(baudRate)).apply();
    }

    public int getUsbBaudRate() {
        return Integer.parseInt(prefs.getString(PREF_USB_BAUD_RATE, DEFAULT_USB_BAUD_RATE));
    }

    public void setTcpServerIp(String serverIp) {
        prefs.edit().putString(PREF_TCP_SERVER_IP, serverIp).apply();
    }

    public String getTcpServerIp() {
        return prefs.getString(PREF_TCP_SERVER_IP, DEFAULT_TCP_SERVER_IP);
    }

    public void setTcpServerPort(int serverPort) {
        prefs.edit().putString(PREF_TCP_SERVER_PORT, String.valueOf(serverPort)).apply();
    }

    public int getTcpServerPort() {
        return Integer.parseInt(prefs.getString(PREF_TCP_SERVER_PORT, DEFAULT_TCP_SERVER_PORT));
    }

    public void setUdpServerPort(int serverPort) {
        prefs.edit().putString(PREF_UDP_SERVER_PORT, String.valueOf(serverPort)).apply();
    }

    public int getUdpServerPort() {
        return Integer.parseInt(prefs.getString(PREF_UDP_SERVER_PORT, DEFAULT_UDP_SERVER_PORT));
    }

    public boolean isUdpPingEnabled() {
        return prefs.getBoolean(PREF_ENABLE_UDP_PING, DEFAULT_ENABLE_UDP_PING);
    }

    public String getUdpPingReceiverIp() {
        return prefs.getString(PREF_UDP_PING_RECEIVER_IP, null);
    }

    public int getUdpPingReceiverPort() {
        return Integer.parseInt(prefs.getString(PREF_UDP_PING_RECEIVER_PORT, DEFAULT_UDP_SERVER_PORT));
    }

    public void setConnectionParameterType(int connectionType) {
        prefs.edit().putString(PREF_CONNECTION_TYPE, String.valueOf(connectionType)).apply();
    }

    public static final String DEFAULT_COMPANION_CONNECTION_TYPE = String.valueOf(ConnectionType.TYPE_USB);
    /**
     * @return the selected mavlink connection type.
     */
    public int getConnectionParameterType() {
        return Integer.parseInt(prefs.getString(PREF_CONNECTION_TYPE, DEFAULT_CONNECTION_TYPE));
    }
}
