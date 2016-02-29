package com.kkroegeraraustech.Hawkeye_Android.Utils.unit.systems;

import com.kkroegeraraustech.Hawkeye_Android.Utils.unit.providers.area.AreaUnitProvider;
import com.kkroegeraraustech.Hawkeye_Android.Utils.unit.providers.length.LengthUnitProvider;
import com.kkroegeraraustech.Hawkeye_Android.Utils.unit.providers.speed.SpeedUnitProvider;

/**
 * Created by Fredia Huya-Kouadio on 1/20/15.
 */
public interface UnitSystem {

    int AUTO = 0;
    int METRIC = 1;
    int IMPERIAL = 2;

    LengthUnitProvider getLengthUnitProvider();

    AreaUnitProvider getAreaUnitProvider();

    SpeedUnitProvider getSpeedUnitProvider();

}
