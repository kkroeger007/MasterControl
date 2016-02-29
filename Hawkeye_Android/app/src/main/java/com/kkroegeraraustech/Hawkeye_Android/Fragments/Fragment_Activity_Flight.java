package com.kkroegeraraustech.Hawkeye_Android.Fragments;

import android.support.v4.app.Fragment;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.kkroegeraraustech.Hawkeye_Android.R;

/**
 * A placeholder fragment containing a simple view.
 */
public class Fragment_Activity_Flight extends Fragment {

    public Fragment_Activity_Flight() {
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        return inflater.inflate(R.layout.layout_fragment_flight, container, false);
    }
}
