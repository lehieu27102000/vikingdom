<?php
/*
 Template Name: Vk App OPEN EGG
Author: Binh IT
 */
ob_start();
?>
<!DOCTYPE html>
<html lang="en">

<?php   require ("header.php") ?>

<body class="fixed-nav sticky-footer bg-dark" id="page-top">
<!-- Navigation-->
<?php   require ("nav.php") ?>

<div class="content-wrapper wrapper-box">
    <div class="container-fluid " id="content">
      <div class="row">
      <div id="loading" style="display:none" id="video-box">
      <button id="close-unbox">Close</button>
            <video muted id="myVideo" width="500" height="300">
                <source src="<?php echo site_url() ?>\wp-content\themes\hello-theme-child-master\viking-app\egg-img\viking_egg.mp4" type="video/mp4">
            </video>
        </div>
      </div>
        <div class="row align-items-start box-egg mt-3 ml-5">

            <div class="col  egg-item">
                <div class="img-item">
                    <img src="<?php echo site_url() ?>/wp-content/themes/hello-theme-child-master/viking-app/egg-img/egg_1.png">
                </div>
            </div>
            <div class="col  egg-item">
                <div class="img-item">
                    <img src="<?php echo site_url() ?>/wp-content/themes/hello-theme-child-master/viking-app/egg-img/egg_2.png">
                </div>
            </div>
            <div class="col egg-item">
                <div class="img-item">
                    <img src="<?php echo site_url() ?>/wp-content/themes/hello-theme-child-master/viking-app/egg-img/egg_3.png">
                </div>
            </div>
        </div>
        <div class="row align-items-start box-egg mt-3 ml-5">
            <div class="col  egg-item">
                <div class="img-item">
                    <img src="<?php echo site_url() ?>/wp-content/themes/hello-theme-child-master/viking-app/egg-img/egg_4.png">
                </div>
            </div>
            <div class="col  egg-item">
                <div class="img-item">
                    <img src="<?php echo site_url() ?>/wp-content/themes/hello-theme-child-master/viking-app/egg-img/egg_5.png">
                </div>
            </div>
            <div class="col  egg-item">
                <div class="img-item">
                    <img src="<?php echo site_url() ?>/wp-content/themes/hello-theme-child-master/viking-app/egg-img/egg_6.png">
                </div>
            </div>
        </div>
    </div>
    <!-- /.container-fluid-->
    <!-- /.content-wrapper-->
    <footer class="sticky-footer">
        <div class="container">
            <div class="text-center">
                <small>Copyright © Vikingdom</small>
            </div>
        </div>
    </footer>
    <!-- Scroll to Top Button-->
    <a class="scroll-to-top rounded" href="#page-top">
        <i class="fa fa-angle-up"></i>
    </a>
    <script src="<?php echo site_url() ?>/wp-content/themes/hello-theme-child-master/viking-app/vendor/jquery/jquery.min.js"></script>
    <script src="<?php echo site_url() ?>/wp-content/themes/hello-theme-child-master/viking-app/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
    <!-- Custom scripts for all pages-->
    <script src="<?php echo site_url() ?>/wp-content/themes/hello-theme-child-master/viking-app/js/sb-admin.min.js"></script>
    <script>
        // var vid = document.getElementById("myVideo");
        // function playVid() {
        //     vid.play();
        // }
        //
        // function pauseVid() {
        //     vid.pause();
        // }
        // function checkMute() {
        //     alert(vid.muted);
        // }
         $( ".egg-item" ).click(function() {
                $("#loading").show();
                $('video').trigger('play');
         });
         $("#close-unbox").click(function () {
             $("#loading").hide();
             $('video').trigger('pause');
         })
    </script>
</div>
</body>
</html>
