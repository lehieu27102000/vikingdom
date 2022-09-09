<?php
/*
 Template Name: Vk App Open Viking
Author: Binh IT
 */
ob_start();
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <title>Vikingdom App</title>
    <?php wp_head(); ?>
    <!-- Bootstrap core CSS-->
    <link rel="icon" type="image/png"
          href="<?php echo site_url() ?>/wp-content/uploads/2021/11/cropped-viking-png-min.png"/>
    <link href="<?php echo site_url() ?>/wp-content/themes/hello-theme-child-master/viking-app/vendor/bootstrap/css/bootstrap.min.css"
          rel="stylesheet">
    <!-- Custom fonts for this template-->
    <link href="<?php echo site_url() ?>/wp-content/themes/hello-theme-child-master/viking-app/vendor/font-awesome/css/font-awesome.min.css"
          rel="stylesheet" type="text/css">
    <!-- Page level plugin CSS-->
    <link href="<?php echo site_url() ?>/wp-content/themes/hello-theme-child-master/viking-app/vendor/datatables/dataTables.bootstrap4.css"
          rel="stylesheet">
    <!-- Custom styles for this template-->
    <link href="<?php echo site_url() ?>/wp-content/themes/hello-theme-child-master/viking-app/css/sb-admin.css"
          rel="stylesheet">
</head>

<body class="fixed-nav sticky-footer bg-dark" id="page-top">
<!-- Navigation-->
<nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
    <a class="navbar-brand" href="<?php echo site_url() ?>"> <img
                src="<?php echo site_url() ?>/wp-content/uploads/2021/11/viking-png-1.png"></a>
    <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse"
            data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false"
            aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarResponsive">
        <ul class="navbar-nav navbar-sidenav" id="exampleAccordion">
            <li class="nav-item" data-toggle="tooltip" data-placement="right" title="Dashboard" id="profile_link">
                <a class="nav-link" href="<?php echo site_url() ?>/vikingdom-web/viking-app/">
                    <i class="fa fa-user"></i>
                    <span class="nav-link-text">Profile</span>
                </a>
            </li>
            <li class="nav-item" data-toggle="tooltip" data-placement="right" title="Menu Levels">
                <a class="nav-link nav-link-collapse collapsed" data-toggle="collapse" href="#collapseMulti" data-parent="#exampleAccordion">
                    <i class="fa fa-gamepad" aria-hidden="true"></i>
                    <span class="nav-link-text">Play game</span>
                </a>
                <ul class="sidenav-second-level collapse" id="collapseMulti">
                    <li id="game_1">
                        <a href="<?php echo site_url() ?>/play-game/journey-to-jotunheim/">JOURNEY TO JOTUNHEIM</a>
                    </li>
                    <li id="game_2">
                        <a href="<?php echo site_url() ?>/play-game/adventure-to-niflheim/">ADVENTURE TO NIFLHEIM</a>
                    </li>
                    <li id="game_3">
                        <a href="#">MUSPELHEIM ARENA</a>
                    </li>
                    <li id="game_4">
                        <a href="#">MIDGARD’s LEAGUES</a>
                    </li>
                    <li id="game_4">
                        <a href="#">CLASH OF ASGARDIANS</a>
                    </li>

                </ul>
            </li>
            <li class="nav-item" data-toggle="tooltip" data-placement="right" title="Dashboard" id="ntf_market">
                <a class="nav-link" href="#">
                    <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                    <span class="nav-link-text">NTF Market</span>
                </a>
            </li>
            <li class="nav-item" data-toggle="tooltip" data-placement="right" title="Dashboard" id="pool_token">
                <a class="nav-link" href="#">
                    <i class="fa fa-pie-chart" aria-hidden="true"></i>
                    <span class="nav-link-text">Pool Token</span>
                </a>
            </li>
            <li class="nav-item" data-toggle="tooltip" data-placement="right" title="Dashboard" id="claim_token">
                <a class="nav-link" href="#">
                    <i class="fa fa-id-card" aria-hidden="true"></i>
                    <span class="nav-link-text">Claim Token</span>
                </a>
            </li>
            <li class="nav-item" data-toggle="tooltip" data-placement="right" title="Menu Levels">
                <a class="nav-link nav-link-collapse collapsed" data-toggle="collapse" href="#collapseVikingbox" data-parent="#exampleAccordion">
                    <i class="fa " aria-hidden="true"></i>
                    <span class="nav-link-text">Viking Box</span>
                </a>
                <ul class="sidenav-second-level collapse" id="collapseVikingbox">
                    <li id="open-jotunheim">
                        <a href="<?php echo site_url() ?>/open-egg">Open Egg</a>
                    </li>
                    <li id="open-adventure">
                        <a href="<?php echo site_url() ?>/open-viking-box">Open Box</a>
                    </li>
                </ul>
            </li>
            <li class="nav-item" data-toggle="tooltip" data-placement="right" title="Dashboard" id="rose">
                <a class="nav-link" href="#">
                    <i class="fa fa-handshake-o" aria-hidden="true"></i>
                    <span class="nav-link-text">Rose Affiliate</span>
                </a>
            </li>
            <li class="nav-item" data-toggle="tooltip" data-placement="right" title="Menu Levels">
                <a class="nav-link nav-link-collapse collapsed" data-toggle="collapse" href="#collapseBountry" data-parent="#exampleAccordion">
                    <i class="fa fa-gift" aria-hidden="true"></i>
                    <span class="nav-link-text">Bountry</span>
                </a>
                <ul class="sidenav-second-level collapse" id="collapseBountry">
                    <li id="airdrop_token">
                        <a href="#"><a href="#" class="elementor-sub-item elementor-item-anchor">Airdrop token</a></a>
                    </li>
                    <li id="airdrop_ntf">
                        <a href="#">Airdrop NTF</a>
                    </li>
                    <li id="guest">
                        <a href="#">Guest</a>
                    </li>

                </ul>
            </li>
            <li class="nav-item" data-toggle="tooltip" data-placement="right" title="Dashboard" id="back_home">
                <a class="nav-link" href="<?php echo site_url() ?>">
                    <i class="fa fa-undo" aria-hidden="true"></i>
                    <span class="nav-link-text">Back to home</span>
                </a>
            </li>
        </ul>
        <ul class="navbar-nav sidenav-toggler">
            <li class="nav-item">
                <a class="nav-link text-center" id="sidenavToggler">
                    <i class="fa fa-fw fa-angle-left"></i>
                </a>
            </li>
        </ul>
        <ul class="navbar-nav ml-auto">
            <li class="nav-item btn btn-logout" id="user__logout">
                <a class="nav-link" data-toggle="modal" data-target="#exampleModal">
                    <i class="fa fa-times"></i> Logout</a>
            </li>
        </ul>
    </div>
</nav>

<div class="content-wrapper wrapper-viking-box">
    <div class="container-fluid " id="content">
        <div id="loading" style="display:none" id="video-box">
            <button id="close-unbox">Close</button>
            <video muted id="myVideo" width="500" height="300">
                <source src="<?php echo site_url() ?>\wp-content\themes\hello-theme-child-master\viking-app\egg-img\viking.mp4" type="video/mp4">
            </video>
        </div>
        <div class="row align-items-start box-egg mt-3 ml-5">
            <div class="col egg-item">
                <div class="img-item-viking">
                    <img src="<?php echo site_url() ?>/wp-content/themes/hello-theme-child-master/viking-app/egg-img/viking_1.png">
                </div>
            </div>
            <div class="col egg-item">
                <div class="img-item-viking">
                    <img src="<?php echo site_url() ?>/wp-content/themes/hello-theme-child-master/viking-app/egg-img/viking_2.png">
                </div>
            </div>
            <div class="col egg-item">
                <div class="img-item-viking">
                    <img src="<?php echo site_url() ?>/wp-content/themes/hello-theme-child-master/viking-app/egg-img/viking_3.png">
                </div>
            </div>
        </div>
        <div class="row align-items-start box-egg mt-3 ml-5">
            <div class="col egg-item">
                <div class="img-item-viking">
                    <img src="<?php echo site_url() ?>/wp-content/themes/hello-theme-child-master/viking-app/egg-img/viking_4.png">
                </div>
            </div>
            <div class="col egg-item">
                <div class="img-item-viking">
                    <img src="<?php echo site_url() ?>/wp-content/themes/hello-theme-child-master/viking-app/egg-img/viking_5.png">
                </div>
            </div>
            <div class="col egg-item">
                <div class="img-item-viking">
                    <img src="<?php echo site_url() ?>/wp-content/themes/hello-theme-child-master/viking-app/egg-img/viking_6.png">
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
