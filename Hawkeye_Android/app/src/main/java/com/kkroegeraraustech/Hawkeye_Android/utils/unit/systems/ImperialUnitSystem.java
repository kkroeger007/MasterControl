package com.kkroegeraraustech.Hawkeye_Android.Utils.unit.systems;

import com.kkroegeraraustech.Hawkeye_Android.Utils.unit.providers.area.AreaUnitProvider;
import com.kkroegeraraustech.Hawkeye_Android.Utils.unit.providers.area.ImperialAreaUnitProvider;
import com.kkroegeraraustech.Hawkeye_Android.Utils.unit.providers.length.ImperialLengthUnitProvider;
import com.kkroegeraraustech.Hawkeye_Android.Utils.unit.providers.length.LengthUnitProvider;
import com.kkroegeraraustech.Hawkeye_Android.Utils.unit.providers.speed.ImperialSpeedUnitProvider;
import com.kkroegeraraustech.Hawkeye_Android.Utils.unit.providers.speed.SpeedUnitProvider;

/**
 * Created by Fredia Huya-Kouadio on 1/20/15.
 */
public class ImperialUnitSystem implements UnitSystem{

    private static final LengthUnitProvider lengthUnitProvider = new ImperialLengthUnitProvider();
    private static final AreaUnitProvider areaUnitProvider = new ImperialAreaUnitProvider();
    private static final SpeedUnitProvider speedUnitProvider = new ImperialSpeedUnitProvider();

    @Override
    public LengthUnitProvider getLengthUnitProvider() {
        return lengthUnitProvider;
    }

    @Override
    public AreaUnitProvider getAreaUnitProvider() {
        return areaUnitProvider;
    }

    @Override
    public SpeedUnitProvider getSpeedUnitProvider() {
        return speedUnitProvider;
    }
}
