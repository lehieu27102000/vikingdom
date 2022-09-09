<?php
/*
Plugin Name: JOURNEY Section
Author: Binh IT
*/
add_shortcode('journey-section', 'JourneySection');
function JourneySection()
{
    ob_start();
    ?>
    <link rel="stylesheet" type="text/css"
          href="<?= site_url() ?>/wp-content/themes/hello-theme-child-master/new-home/assets/libs/flickity/flickity.min.css"/>
    <link href="<?php echo site_url() ?>/wp-content/plugins/ui-binhit/assets/css/adventure.css" rel="stylesheet">
    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css">
    <section class="adventure-characters -bg-fix">
        <div class="el__box">
            <div class="container">
                <div class="wow ">
                    <div class="character__slider flickity ">
                    </div>
    </section>
    <script src="<?= site_url() ?>/wp-content/themes/hello-theme-child-master/new-home/assets/libs/bootstrap/js/bootstrap.bundle.min.js"></script>
    <script type="text/javascript"
            src="<?= site_url() ?>/wp-content/themes/hello-theme-child-master/new-home/assets/libs/flickity/flickity.pkgd.min.js"></script>
    <script type="text/javascript"
            src="<?= site_url() ?>/wp-content/themes/hello-theme-child-master/new-home/assets/js/wow.min.js"></script>
    <script src="<?= site_url() ?>/wp-content/themes/hello-theme-child-master/new-home/assets/js/main.js"></script>
    <script>
        $(document).ready(function () {
            LoadData();
        });
        function LoadData() {
            var ajaxurl = "<?php echo admin_url('admin-ajax.php');?>";
            token = localStorage.getItem('token');
            if (token != '' && token != null) {
                var data_get_game_item = {
                    'action': 'viking_get_journey_ajax',
                    'token': token
                };
                $.post(ajaxurl, data_get_game_item, function (response) {
                    if (response != 1) {
                        console.log("line 43")
                        var dataItem=JSON.parse(response);
                        console.log(dataItem);
                        var showSlider = "";
                        $.each(dataItem.data, function (i, item) {
                            if(item.info.endAt== null ||  item.info.endAt== '' ){
                                var exdate= 0
                            }else{
                                var exdate= item.info.endAt
                            }
                            showSlider += " <div class='carousel-cell'> ";
                            showSlider += "<div id='info-adventure'>";
                            showSlider += "<div id='game'>";
                            showSlider += "<div class='container'>";
                            showSlider += "<div class='row'>";
                            showSlider += " <div class='col-sm-12 text-lg-end power-content'>";
                            showSlider += " <div id='rainbow'>";
                            showSlider += " <div class='game_id ' ><span id='title'>Name: </span>" + item.character.name + "</div>";
                            showSlider += " <div class='game_id'><span id='title'>ID: </span>" + item.character.game.id + "</div>";
                            showSlider += " <div class='game_id'><span id='title'>Turn: </span>" + item.info.turn + "</div>";
                            showSlider += "<div class='game_id'><span id='title'>Rate:</span>" + item.character.game.name + "</div>";
                            showSlider += " <div class='game_id'><span id='title'>Expiry Date :</span>" + exdate + "</div>";
                            showSlider += "<div class='game_id'><span id='title'>Create At :</span>" + item.info.createAt + "</div> </div> </div> </div> </div> </div></div>"
                            showSlider += "<div class='slider__item__wrap col-md-20'> <div class='el__item'>  <div class='el__item__thumb'> <div class='dnfix__thumb -contain'> <img src='<?php echo site_url() ?>/wp-content/plugins/ui-binhit/assets/img/adventure/" + item.character.name + ".png'> ";
                            showSlider += "</div> </div> </div> </div> </div>"
                        });
                        $('.character__slider').html(showSlider);
                        $('.character__slider').flickity({
                            // options
                            pageDots: false,
                            contain: true,
                            wrapAround: true
                        });
                    } else {
                          console.log("errorr 77")
                    }

                });
            }
        }
    </script>
    <?php
    $out = ob_get_clean();
    echo $out;
}