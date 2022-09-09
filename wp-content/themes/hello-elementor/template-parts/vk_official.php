<?php
/*
 Template Name: Vk Oficcial
Author: Binh IT
 */
?>
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="description" content="">
        <meta name="author" content="">
        <title>Vikingdom Official</title>
        <!-- Bootstrap core CSS-->
        <link rel="icon" type="image/png" href="<?php echo site_url() ?>/wp-content/uploads/2021/11/cropped-viking-png-min.png"/>
        <link href="<?php echo site_url() ?>/wp-content/themes/hello-elementor/template-parts/vk_official/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
        <!-- Custom fonts for this template-->
        <link href="<?php echo site_url() ?>/wp-content/themes/hello-elementor/template-parts/vk_official/vendor/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
        <!-- Page level plugin CSS-->
        <link href="<?php echo site_url() ?>/wp-content/themes/hello-elementor/template-parts/vk_official/vendor/datatables/dataTables.bootstrap4.css" rel="stylesheet">
        <!-- Custom styles for this template-->
        <link href="<?php echo site_url() ?>/wp-content/themes/hello-elementor/template-parts/vk_official/css/sb-admin.css" rel="stylesheet">
        <link rel="stylesheet" type="text/css" href="<?= site_url() ?>/wp-content/themes/hello-theme-child-master/new-home/assets/libs/flickity/flickity.min.css"/>
        <link href="<?php echo site_url() ?>/wp-content/themes/hello-elementor/template-parts/vk_official/css/style.css" rel="stylesheet">
<!--        <link href="--><?php //echo site_url() ?><!--/wp-content/themes/hello-theme-child-master/new-home/assets/css/main.css" rel="stylesheet">-->
    </head>
    <body class="fixed-nav sticky-footer bg-dark" id="page-top">
    <!-- Navigation-->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
        <a class="navbar-brand" href="index.html"> <img src="<?php echo site_url() ?>/wp-content/uploads/2021/11/viking-png-1.png"></a>
        <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav navbar-sidenav" id="exampleAccordion">
                <li class="nav-item" data-toggle="tooltip" data-placement="right" title="Dashboard" id="white-paper">
                    <a class="nav-link" href="<?php echo site_url() ?>/wp-content/plugins/ui-binhit/assets/img/Whitepaper.pdf">
                        <i class="fa fa-fw fa-address-book"></i>
                        <span class="nav-link-text">Whitepaper</span>
                    </a>
                </li>
                <li class="nav-item" data-toggle="tooltip" data-placement="right" title="Dashboard" id="terms-of-use">
                    <a class="nav-link" href="#">
                        <i class="fa fa-fw fa-book"></i>
                        <span class="nav-link-text">Terms Of Use</span>
                    </a>
                </li>
                <li class="nav-item" data-toggle="tooltip" data-placement="right" title="Charts" id="privacy-policy">
                    <a class="nav-link" href="#">
                        <i class="fa fa-fw fa-bookmark"></i>
                        <span class="nav-link-text">Privacy Policy</span>
                    </a>
                </li>
                <li class="nav-item" data-toggle="tooltip" data-placement="right" title="Tables" id="tokenomic">
                    <a class="nav-link" href="#">
                        <i class="fa fa-fw fa-pie-chart"></i>
                        <span class="nav-link-text">Tokenomics</span>
                    </a>
                </li>
                <li class="nav-item" data-toggle="tooltip" data-placement="right" title="Tables" id="roadmap_menu">
                    <a class="nav-link" href="#">
                        <i class="fa fa-fw fa-clock-o"></i>
                        <span class="nav-link-text">Roadmap</span>
                    </a>
                </li>
                <li class="nav-item" data-toggle="tooltip" data-placement="right" title="Tables" id="team">
                    <a class="nav-link" href="#">
                        <i class="fa fa-fw fa-clock-o"></i>
                        <span class="nav-link-text">Team</span>
                    </a>
                </li>
<!--                <li class="nav-item" data-toggle="tooltip" data-placement="right" title="Tables" id="our-partners">-->
<!--                    <a class="nav-link" href="#">-->
<!--                        <i class="fa fa-fw fa-paper-plane"></i>-->
<!--                        <span class="nav-link-text">Our Partners</span>-->
<!--                    </a>-->
<!--                </li>-->
            </ul>
            <ul class="navbar-nav sidenav-toggler">
                <li class="nav-item">
                    <a class="nav-link text-center" id="sidenavToggler">
                        <i class="fa fa-fw fa-angle-left"></i>
                    </a>
                </li>
            </ul>
            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <form class="form-inline my-2 my-lg-0 mr-lg-2">
                        <div class="input-group">
                            <input class="form-control" type="text" placeholder="Search for...">
                            <span class="input-group-append">
                <button class="btn btn-primary" type="button">
                  <i class="fa fa-search"></i>
                </button>
              </span>
                        </div>
                    </form>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="<?php echo site_url() ?>">
                        <i class="fa fa-fw fa-sign-out"></i>Home</a>
                </li>
            </ul>
        </div>
    </nav>
    <div class="content-wrapper">
        <!-- /.container-fluid-->
        <!-- /.content-wrapper-->
        <div class="col-md-12" id="content">

        </div>

        <!-- Scroll to Top Button-->
        <a class="scroll-to-top rounded" href="#page-top">
            <i class="fa fa-angle-up"></i>
        </a>
        <!-- Bootstrap core JavaScript-->
        <script src="<?php echo site_url() ?>/wp-content/themes/hello-elementor/template-parts/vk_official/vendor/jquery/jquery.min.js"></script>
        <script src="<?php echo site_url() ?>/wp-content/themes/hello-elementor/template-parts/vk_official/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
        <!-- Core plugin JavaScript-->
        <script src="<?php echo site_url() ?>/wp-content/themes/hello-elementor/template-parts/vk_official/vendor/jquery-easing/jquery.easing.min.js"></script>
        <!-- Page level plugin JavaScript-->
        <script src="<?php echo site_url() ?>/wp-content/themes/hello-elementor/template-parts/vk_official/vendor/chart.js/Chart.min.js"></script>
        <script src="<?php echo site_url() ?>/wp-content/themes/hello-elementor/template-parts/vk_official/vendor/datatables/jquery.dataTables.js"></script>
        <script src="<?php echo site_url() ?>/wp-content/themes/hello-elementor/template-parts/vk_official/vendor/datatables/dataTables.bootstrap4.js"></script>
        <!-- Custom scripts for all pages-->
        <script src="<?php echo site_url() ?>/wp-content/themes/hello-elementor/template-parts/vk_official/js/sb-admin.min.js"></script>
        <!-- Custom scripts for this page-->
        <script src="<?= site_url() ?>/wp-content/themes/hello-theme-child-master/new-home/assets/libs/bootstrap/js/bootstrap.bundle.min.js"></script>
        <script type="text/javascript" src="<?= site_url() ?>/wp-content/themes/hello-theme-child-master/new-home/assets/libs/flickity/flickity.pkgd.min.js"></script>
        <script type="text/javascript" src="<?= site_url() ?>/wp-content/themes/hello-theme-child-master/new-home/assets/js/wow.min.js"></script>
        <script src="assets/js/main.js"></script>
        <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
        <script>
            jQuery(document).ready(function(){
                jQuery("#content").load("<?php echo site_url() ?>/wp-content/themes/hello-elementor/template-parts/about_us/tern-of-use.php");
                jQuery("#terms-of-use").click(function(){
                    jQuery("#content").load("<?php echo site_url() ?>/wp-content/themes/hello-elementor/template-parts/about_us/tern-of-use.php");
                });
                jQuery("#privacy-policy").click(function(){
                    jQuery("#content").load("<?php echo site_url() ?>/wp-content/themes/hello-elementor/template-parts/about_us/privacy-policy.php");
                });
                jQuery("#tokenomic").click(function(){
                    jQuery("#content").load("<?php echo site_url() ?>/wp-content/themes/hello-elementor/template-parts/about_us/tokenomic.php");
                });
                jQuery("#roadmap_menu").click(function(){
                    jQuery("#content").load("<?php echo site_url() ?>/wp-content/themes/hello-elementor/template-parts/about_us/roadmap.php");
                    jQuery("#vk-official,#tokenomic,#team,#our-partner,#whitepaper").removeClass("active");
                });
                jQuery("#team").click(function(){
                    jQuery("#content").load("<?php echo site_url() ?>/wp-content/themes/hello-elementor/template-parts/about_us/team.php");
                    jQuery("#vk-official,#tokenomic,#our-partner,#whitepape,#roadmap_menu").removeClass("active");
                });
            });
        </script>
    </div>
    </body>
    </html>