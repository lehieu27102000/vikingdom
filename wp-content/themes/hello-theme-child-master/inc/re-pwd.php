<?php
/*
Template Name: rwb pass 
Author: Binh IT
 */
ob_start();
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <title>Vikingdom App</title>
    <?php wp_head(); ?>
    <!-- Bootstrap core CSS-->
    <link rel="icon" type="image/png" href="<?php echo site_url() ?>/wp-content/uploads/2021/11/cropped-viking-png-min.png"/>
    <link href="<?php echo site_url() ?>/wp-content/themes/hello-theme-child-master/viking-app/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <!-- Custom fonts for this template-->
    <link href="<?php echo site_url() ?>/wp-content/themes/hello-theme-child-master/viking-app/vendor/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <!-- Page level plugin CSS-->
    <link href="<?php echo site_url() ?>/wp-content/themes/hello-theme-child-master/viking-app/vendor/datatables/dataTables.bootstrap4.css" rel="stylesheet">
    <!-- Custom styles for this template-->
    <link href="<?php echo site_url() ?>/wp-content/themes/hello-theme-child-master/viking-app/css/sb-admin.css" rel="stylesheet">
    <!-- CSS -->
    <link rel="stylesheet" type="text/css"
          href="<?= site_url() ?>/wp-content/themes/hello-theme-child-master/new-home/assets/libs/flickity/flickity.min.css"/>
        
</head>
<body class="re-pwd-wraper" >
    <div class="row">
<div class="col-6 mx-auto text-xl-center">
<?= do_shortcode('[elementor-template id="2455"]'); ?>
</div>
</div>
<div class="row">
<div class="card mb-3 col-6 mx-auto">
    
    <?= do_shortcode('[re-pwd]'); ?>
    </div>
</div>
</body>
</html>
