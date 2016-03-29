

    // Global layers object:
    var g_layersObj = [];
    $(document).ready(function() {

        // TODO: Pass the array in (from KEN):
        //var layerArray = ['LayerName1/Date1/Time1', 'LayerName1/Date2/Time2', 'Layername2/Date1/Time1', 'Layername2/Date2/Time2', 'Layername2/Date3/Time3', 'Layername3/Date1/Time1'];
        var layerArray = getAvailableLayers();

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
            html +=             '<h5 class="mdl-card__title-text">' + layersObj[cardIndex].layerName + '</h5>';
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
            html +=                     '<div class="mdl-cell mdl-cell--6-col">';
            html +=                         '<p>' + layersObj[cardIndex].dates[0] + '</p>';
            html +=                     '</div>';
            html +=                     '<div class="mdl-cell mdl-cell--6-col">';
            var latestIdStr = layersObj[cardIndex].layerName + '/' + layersObj[cardIndex].dates[0] + '/' + layersObj[cardIndex].times[0];
            html +=                         '<input id="' + latestIdStr + '" class="mdl-slider mdl-js-slider opacity-slider latest-layer-slider" type="range" min="0" max="100" value="100" tabindex="0">';
            html +=                     '</div>';
            html +=                 '</div>';

            html +=             '</div>';
            html +=         '</div>';


            if(layersObj[cardIndex].dates.length > 1) {
                html +=         '<button class="mdl-button mdl-js-button mdl-js-ripple-effect more-layers" style="display: none;">';
                html +=             '<i class="material-icons custom-collapse-icon">keyboard_arrow_down</i>';
                html +=         '</button>';
            }

            html +=         '<div class="custom-collapse">';
            html +=             '<div class="measuringWrapper">';

            for (layerIndex = 1; layerIndex < layersObj[cardIndex].dates.length; layerIndex++) {
                html +=                 '<div class="mdl-grid">';
                html +=                     '<div class="mdl-cell mdl-cell--6-col">';
                html +=                         '<p>' + layersObj[cardIndex].dates[layerIndex] + '</p>';
                html +=                     '</div>';
                html +=                     '<div class="mdl-cell mdl-cell--6-col">';
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
        $('.pushmenu-push').toggleClass('pushmenu-push-toright');
        $('.pushmenu-left').toggleClass('pushmenu-open');
    }


    function openWaypoints() {
        $('.pushmenu-push').toggleClass('pushmenu-push-totop');
        $('.pushmenu-up').toggleClass('pushmenu-open');
    }

    function openPreferences() {
        $("#map").css("width", "75%");
        $("#map").css("position", "absolute");
        $("#map").css("top", "0");
        $("#map").css("right", "0");

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

            // Get sliders in card and all their values:
            var sliders = $(this).parent().parent().find('.opacity-slider');
            var layersArray = [];
            var sliderTrueFalse = false;
            for (sliderIndex = 0; sliderIndex < sliders.length; sliderIndex++) {
                layersArray.push([sliders[sliderIndex].id, sliders[sliderIndex].value]);

                if(sliderTrueFalse === false && sliderIndex > 0 && sliders[sliderIndex].value > 0) {
                    sliderTrueFalse = true;
                }
            }

            var forid = $(this).attr('for');
            var checkbox = $('#'+$(this).attr('for'));
            var sliderOnOff = checkbox.prop('checked');
            var sliderID = checkbox.attr('id').replace('field-toggle-','');


            if(g_layersObj[sliderID].dates.length > 1) {
                var showButton = $(this).parent().next().next();
                if(showButton.css('display') === 'none') {
                    showButton.css('display', '');
                } else {
                    showButton.css('display', 'none');
                }
            }



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

            var button = $(this).parent().parent().children('.more-layers');
            var expandDiv = button.next('.custom-collapse');
            if (expandDiv.height() > 0 && sliderOnOff === false) {
                expandDiv.height(0);

                if(button.find('.custom-collapse-icon').hasClass('custom-collapse-open')) {
                    button.find('.custom-collapse-icon').toggleClass('custom-collapse-open');
                }
            }

            if (sliderTrueFalse === true && sliderOnOff === true) {
                button.click();
            }

            updateLayersOnOff(layersArray,sliderOnOff);
        });



        $('.opacity-slider').change(function() {
            var sliderVal = $(this).val();
            var sliderID = $(this).attr('id');
            updateLayerOpacity(sliderID, sliderVal/100);
        });


        $(".back-button").click(function() {
            $("#map").css("width", "100%");

            $(".preferences-outer-container").css("display", "none");
            $(".mdl-layout__drawer-button").click();
        });

        $(".check-button").click(function() {
            $("#map").css("width", "100%");
            $(".preferences-outer-container").css("display", "none");
        });

        $(".map-layers-check").click(function() {
            $('.pushmenu-push').toggleClass('pushmenu-push-toright');
            $('.pushmenu-left').toggleClass('pushmenu-open');
        });


        $(".marker-type-list li").click(function() {
            var clickedItem = $(this).text();
            var buttonText = clickedItem + '<i class="material-icons">keyboard_arrow_down</i>';
            $(".marker-type-button").html(buttonText);


            // TODO-KEN: This is the string that was clicked from the dropdown:
            console.log(clickedItem);
        });

    };
