package com.kkroegeraraustech.Hawkeye_Android.Utils.Mapping;

import android.content.res.Resources;
import android.graphics.Bitmap;

import com.o3dr.services.android.lib.coordinate.LatLong;
import com.o3dr.services.android.lib.drone.mission.MissionItemType;
/**
 * Created by Ken Heron Systems on 3/1/2016.
 */
public interface VehicleMarkerInfo {

    /**
     * @return marker's ID value.
     */
    int getID();
    /**
     * @param IDValue set the marker ID value
     */
    void setID(int IDValue);


    MissionItemType getType();
    void setMissionType(MissionItemType missionType);

    /**
     * @return marker's alpha (opacity) value.
     */
    float getAlpha();
    /**
     * @param alphaValue set the marker alpha value
     */
    void setAlpha(float alphaValue);


    /**
     * @return marker's horizontal distance normalized to [0,1], of the anchor
     *         from the left edge.
     */
    float getAnchorU();
    /**
     * @param anchorU
     */
    void setAnchorU(float anchorU);


    /**
     * @return marker's vertical distance normalized to [0, 1], of the anchor
     *         from the top edge.
     */
    float getAnchorV();
    /**
     * @param anchorV
     */
    void setAnchorV(float anchorV);

    /**
     * @return marker's icon resource id.
     */
    Bitmap getIcon(Resources res);

    /**
     * @param res
     */
    void setIcon(Resources res);

    /**
     * @return horizontal distance normalized to [0, 1] of the info window
     *         anchor from the left edge.
     */
    float getInfoWindowAnchorU();
    /**
     * @param windowAnchorU
     */
    void setInfoWindowU(float windowAnchorU);

    /**
     * @return vertical distance normalized to [0,1] of the info window anchor
     *         from the top edge.
     */
    float getInfoWindowAnchorV();
    /**
     * @param windowAnchorV
     */
    void setInfoWindowAnchorV(float windowAnchorV);

    /**
     * @return marker's map coordinate.
     */
    LatLong getPosition();

    /**
     * Updates the marker info's position.
     *
     * @param coord
     *            position update.
     */
    void setPosition(LatLong coord);

    /**
     * @return marker's rotation.
     */
    float getRotation();

    void setRotation(float rotationValue);

    /**
     * @return string containing the marker's snippet.
     */
    String getSnippet();

    void setSnippet(String snippetValue);

    /**
     * @return the marker's title.
     */
    String getTitle();

    void setTitle(String titleValue);

    /**
     * @return true if the marker's draggable.
     */
    boolean isDraggable();

    void setDraggable(boolean draggableValue);

    /**
     * @return true if the marker's flat.
     */
    boolean isFlat();
    void setFlat(boolean flatValute);
    /**
     * @return true if the marker's visible.
     */
    boolean isVisible();
    void setVisible(boolean visibleValue);

    /**
     * Default implementation of the MarkerInfo interface.
     */
    class VehicleMarkerClass implements VehicleMarkerInfo {

        //Default Constructor
        public void SimpleMarkerInfo(){
            mID = 0;
            mMissionItemType = MissionItemType.WAYPOINT;
            mAlpha = 1;
            mAnchorU = 0;
            mAnchorV = 0;
            mWindowAnchorU = 0;
            mWindowAnchorV = 0;
            mRotation = 0;

            mSnippet = "";
            mTitle = "";

            mDraggable = false;
            mFlat = false;
            mVisible = false;

        }

        private int mID;
        @Override
        public int getID() {
            return (mID);
        }

        @Override
        public void setID(int IDValue) {
            mID = IDValue;
        }

        MissionItemType mMissionItemType;
        @Override
        public MissionItemType getType() {
            return mMissionItemType;
        }

        @Override
        public void setMissionType(MissionItemType missionType) {
            mMissionItemType = missionType;
        }


        private float mAlpha;

        @Override
        public float getAlpha() {
            return (mAlpha);
        }

        @Override
        public void setAlpha(float alphaValue) {

        }

        private float mAnchorU;
        @Override
        public float getAnchorU() {
            return (mAnchorU);
        }

        @Override
        public void setAnchorU(float anchorU) {

        }

        private float mAnchorV;
        @Override
        public float getAnchorV() {
            return (mAnchorV);
        }

        @Override
        public void setAnchorV(float anchorV) {

        }

        @Override
        public Bitmap getIcon(Resources res) {
            return null;
        }

        @Override
        public void setIcon(Resources res) {

        }

        private float mWindowAnchorU;
        @Override
        public float getInfoWindowAnchorU() {
            return (mWindowAnchorU);
        }

        @Override
        public void setInfoWindowU(float windowAnchorU) {

        }

        private float mWindowAnchorV;
        @Override
        public float getInfoWindowAnchorV() {
            return (mWindowAnchorV);
        }

        @Override
        public void setInfoWindowAnchorV(float windowAnchorV) {

        }

        private com.o3dr.services.android.lib.coordinate.LatLong mPosition;
        @Override
        public LatLong getPosition() {
            return (mPosition);
        }

        @Override
        public void setPosition(LatLong coord) {
        }

        private float mRotation;
        @Override
        public float getRotation() {
            return (mRotation);
        }

        @Override
        public void setRotation(float rotationValue) {

        }

        private String mSnippet;
        @Override
        public String getSnippet() {
            return (mSnippet);
        }

        @Override
        public void setSnippet(String snippetValue) {

        }

        private String mTitle;
        @Override
        public String getTitle() {
            return (mTitle);
        }

        @Override
        public void setTitle(String titleValue) {

        }

        private boolean mDraggable;
        @Override
        public boolean isDraggable() {
            return (mDraggable);
        }

        @Override
        public void setDraggable(boolean draggableValue) {

        }

        private boolean mFlat;
        @Override
        public boolean isFlat() {
            return (mFlat);
        }

        @Override
        public void setFlat(boolean flatValute) {

        }

        private boolean mVisible;
        @Override
        public boolean isVisible() {
            return (mVisible);
        }

        @Override
        public void setVisible(boolean visibleValue) {

        }
    }
}
