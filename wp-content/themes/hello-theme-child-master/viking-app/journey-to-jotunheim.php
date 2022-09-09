<?php
/*
 Template Name: Vk App JOURNEY TO JOTUNHEIM
Author: Binh IT
 */
ob_start();
?>
<?php echo  require("header.php") ?>

<body class="fixed-nav sticky-footer bg-dark" id="page-top">
    <!-- Navigation-->
    <?php echo require("nav.php"); ?>
    <!-- /.container-fluid-->
    <div class="content-wrapper wrapper-play_game">
        <div class="container-fluid" id="content">
            <div class="col-lg-4">
                <div class="nav-carousel">
                </div>
            </div>
            <div class="col-lg-8" id="slider_lischrt">
                <div class="main-carousel">
                </div>
            </div>
        </div>
    </div>
    <!-- /.container-fluid-->
    <!-- /.content-wrapper-->
    <?php echo  require("footer.php") ?>
    <script>
        $(document).ready(function() {
            var ajaxurl = "<?php echo admin_url('admin-ajax.php'); ?>";
            token = localStorage.getItem('token');
            if (token != '' && token != null) {
                var data_get_game_item = {
                    'action': 'viking_get_journey_ajax',
                    'token': token
                };
                $.post(ajaxurl, data_get_game_item, function(response) {
                    if (response != 1) {
                        var dataItem = JSON.parse(response);
                        var showSlider = "";
                        var showinfo = "";
                        $.each(dataItem.data, function(i, item) {
                            if (item.info.endAt == null || item.info.endAt == '') {
                                var exdate = 0
                            } else {
                                var exdate = item.info.endAt
                            }
                            showSlider += " <div class='carousel-cell'> <img src='<?php echo site_url() ?>/wp-content/themes/hello-theme-child-master/viking-app/adventure/" + item.character.name + ".png'/></div>";
                            showinfo += "<div class='flex-container-info'>"
                            showinfo += "<div><p><strong>Name: <strong>" + item.character.name + "</p>" +
                                "<p><strong>ID: <strong>" + item.character.id + "</p>" +
                                "<p><strong>Turn: <strong>" + item.info.turn + "</p>" +
                                "<p><strong>Rate: <strong>" + item.character.game.name + "</p>" +
                                "<p><strong>Expiry Date: <strong>" + item.info.endAt + "</p>" +
                                "<p><strong>Create At: <strong>" + item.info.createAt + "</p>" +
                                "</div>";
                            // showinfo+="<div>2</div>";
                            showinfo += "</div>";
                        });
                        $('.main-carousel').html(showSlider);
                        $('.nav-carousel').html(showinfo);
                        $('.main-carousel').flickity({
                            // options
                            cellAlign: 'left',
                            fullscreen: true,
                            lazyLoad: 1,
                            pageDots: false,
                        });
                        $('.nav-carousel').flickity({
                            asNavFor: '.main-carousel',
                            cellAlign: 'left',
                            fullscreen: true,
                            lazyLoad: 1,
                            pageDots: false,
                            prevNextButtons: false,

                        });
                    } else {
                        alert(xhr.status);
                    }

                });
            }
        });
    </script>
    </div>
</body>

</html>