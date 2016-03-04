

    // Global layers object:
    var g_layersObj = [];
    //TODO: This was added to handle the stripped index value
    var g_layersArray = [];
    $(document).ready(function() {

        // TODO: Pass the array in (from KEN):
        //var layerArray = ['LayerName1/Date1/Time1', 'LayerName1/Date2/Time2', 'Layername2/Date1/Time1', 'Layername2/Date2/Time2', 'Layername2/Date3/Time3', 'Layername3/Date1/Time1'];
        var layerArray = getAvailableLayers();
        g_layersArray = layerArray;
        // Create the layers object to be used later:
        var layersObj = [];
        var layersIndex = 0;
        for (index = 0; index < layerArray.length; index++) {
            tmpArr = layerArray[index].split("/");
            var tmplayer = tmpArr[0];
            var tmpdate = tmpArr[1];
            var tmptime = tmpArr[2];
            var tmpObj;

            if (index === 0) {
                tmpObj = {
                    layerName: tmplayer,
                    dates: [tmpdate],
                    times: [tmptime]
                };

                layersObj[layersIndex] = tmpObj;

                // Increment layersIndex:
                layersIndex++;
            } else {
                var elementPos = layersObj.map(function(x) {
                    return x.layerName;
                }).indexOf(tmplayer);
                var objectFound = layersObj[elementPos];

                if (elementPos != -1) {
                    layersObj[elementPos].dates.push(tmpdate);
                    layersObj[elementPos].times.push(tmptime);
                } else {
                    tmpObj = {
                        layerName: tmplayer,
                        dates: [tmpdate],
                        times: [tmptime]
                    };
                    layersObj[layersIndex] = tmpObj;

                    // Increment layersIndex:
                    layersIndex++;
                }
            }
        }

        // Set the global layers object:
        g_layersObj = layersObj;

        // Dynamically create the Layers cards for opacity setting:
        var html = '';
        for (cardIndex = 0; cardIndex < layersObj.length; cardIndex++) {
            html += '<div class="mdl-card mdl-shadow--2dp">';
            html +=         '<div class="mdl-card__title">';
            html +=             '<h2 class="mdl-card__title-text">' + layersObj[cardIndex].layerName + '</h2>';
            html +=         '</div>';

            html +=         '<div class="mdl-card__menu">';
            html +=             '<label class="mdl-switch mdl-js-switch mdl-js-ripple-effect layer-toggle" for="field-toggle-' + cardIndex + '">';
            html +=                 '<input type="checkbox" id="field-toggle-' + cardIndex + '" class="mdl-switch__input">';
            html +=                 '<span class="mdl-switch__label"></span>';
            html +=             '</label>';
            html +=         '</div>';

            html +=         '<div class="custom-collapse">';
            html +=             '<div class="measuringWrapper">';
            html +=                 '<div class="mdl-grid">';
            html +=                     '<div class="mdl-cell mdl-cell--2-col">';
            html +=                         '<p>' + layersObj[cardIndex].dates[0] + '</p>';
            html +=                     '</div>';
            html +=                     '<div class="mdl-cell mdl-cell--10-col">';
            var latestIdStr = layersObj[cardIndex].layerName + '/' + layersObj[cardIndex].dates[0] + '/' + layersObj[cardIndex].times[0];
            html +=                         '<input id="' + latestIdStr + '" class="mdl-slider mdl-js-slider opacity-slider latest-layer-slider" type="range" min="0" max="100" value="0" tabindex="0">';
            html +=                     '</div>';
            html +=                 '</div>';
            html +=             '</div>';
            html +=         '</div>';


            if(layersObj[cardIndex].dates.length > 1) {
                html +=         '<button class="mdl-button mdl-js-button mdl-js-ripple-effect more-layers" disabled="true">';
                html +=             '<i class="material-icons custom-collapse-icon">keyboard_arrow_down</i>';
                html +=         '</button>';
            }

            html +=         '<div class="custom-collapse">';
            html +=             '<div class="measuringWrapper">';

            for (layerIndex = 1; layerIndex < layersObj[cardIndex].dates.length; layerIndex++) {
                html +=                 '<div class="mdl-grid">';
                html +=                     '<div class="mdl-cell mdl-cell--2-col">';
                html +=                         '<p>' + layersObj[cardIndex].dates[layerIndex] + '</p>';
                html +=                     '</div>';
                html +=                     '<div class="mdl-cell mdl-cell--10-col">';
                var idStr = layersObj[cardIndex].layerName + '/' + layersObj[cardIndex].dates[layerIndex] + '/' + layersObj[cardIndex].times[layerIndex];
                html +=                         '<input id="' + idStr + '" class="mdl-slider mdl-js-slider opacity-slider" type="range" min="0" max="100" value="0" tabindex="0">';
                html +=                     '</div>';
                html +=                 '</div>';
            }

            html +=             '</div>';
            html +=         '</div>';
            html +=     '</div>';
        }


        // Add the html:
        $('.map-layers-cards').html(html);

    });



    function openMapLayers() {
        $("#map").css("width", "75%");
        $("#map").css("position", "absolute");
        $("#map").css("top", "0");
        $("#map").css("right", "0");

        $(".maplayers-outer-container").css("display", "");
        $(".preferences-outer-container").css("display", "none");

        $(".mdl-layout__drawer-button").click();
    }

    function openPreferences() {
        $("#map").css("width", "75%");
        $("#map").css("position", "absolute");
        $("#map").css("top", "0");
        $("#map").css("right", "0");

        $(".maplayers-outer-container").css("display", "none");
        $(".preferences-outer-container").css("display", "");

        $(".mdl-layout__drawer-button").click();
    }

    window.onload = function() {
        $(function() {
            $('.mdl-collapse__content').each(function() {
                var content = $(this);
                content.css('margin-top', -content.height());
            });

            $(document.body).on('click', '.mdl-collapse__button', function() {
                $(this).parent('.mdl-collapse').toggleClass('mdl-collapse--opened');
            });
        });


        $(".more-layers").click(function() {

            $(this).find('.custom-collapse-icon').toggleClass('custom-collapse-open');

            var expandDiv = $(this).next('.custom-collapse');

            if (expandDiv.height() > 0) {
                expandDiv.height(0);
            } else {
                var wrapper = expandDiv.children('.measuringWrapper');
                expandDiv.height(wrapper.height());
            }

        });


        $(".layer-toggle").on("change", function() {
            var button = $(this).parent().parent().children('.more-layers');
            button.prop('disabled', function() {
                return !$(this).prop('disabled');
            });

            var latestExpandDiv = $(this).parent().next('.custom-collapse');
            if (latestExpandDiv.height() > 0) {
                latestExpandDiv.height(0);
            } else {
                var wrapper = latestExpandDiv.children('.measuringWrapper');
                latestExpandDiv.height(wrapper.height());

                // Set latest layer value to 100:
                var latestLayerSlider = latestExpandDiv.children().find('.latest-layer-slider');
                latestLayerSlider.get(0).MaterialSlider.change(100);
            }

            var expandDiv = button.next('.custom-collapse');
            if (expandDiv.height() > 0 && button.prop('disabled') === true) {
                expandDiv.height(0);
            }
            //TODO: We need a better from getting layer from checkbox change event....would like to be more dynamic rather than hardcoding field-toggle talk to Ben
            var forid = $(this).attr('for');
            var checkbox = $('#'+$(this).attr('for'));
            var sliderVal = checkbox.prop('checked');
            var sliderID = checkbox.attr('id').replace('field-toggle-','');
            updateLayerOnOff(g_layersArray[sliderID],sliderVal);
        });

        $('.opacity-slider').change(function() {
            var sliderVal = $(this).val();
            var sliderID = $(this).attr('id');
            updateLayerOpacity(sliderID,sliderVal/100);
            //var changedObj = {layer: sliderID, opacity: sliderVal/100};
            //console.log(changedObj);
        });



        $(".back-button").click(function() {
            $("#map").css("width", "100%");

            $(".maplayers-outer-container").css("display", "none");
            $(".preferences-outer-container").css("display", "none");

            $(".mdl-layout__drawer-button").click();
        });

        $(".check-button").click(function() {
            $("#map").css("width", "100%");

            $(".maplayers-outer-container").css("display", "none");
            $(".preferences-outer-container").css("display", "none");
        });

    };
