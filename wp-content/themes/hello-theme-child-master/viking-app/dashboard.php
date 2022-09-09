<?php
/*
 Template Name: Vk App
Author: Binh IT
 */
ob_start();
?>

<?php   require ("header.php") ?>
<body class="fixed-nav sticky-footer bg-dark" id="page-top">
<!-- Navigation-->
<?php  require ("nav.php") ?>
<div class="content-wrapper wrapper-profile">
    <div class="container-fluid" id="content">
        <!-- Profile Cards-->
        <div class="row container-profile" id="profile_card">
        <div class="col-lg-3">
           
        </div>
            <div class="col-lg-6">
                 <!-- Example Notifications Card-->
                 <div class="card mb-3">
                    <?php echo do_shortcode("[account]"); ?>
                </div>
                <!-- Vike -->
                <div class="card mb-3">
                    <?php echo do_shortcode("[vike_item]"); ?>
                </div>
               
                <div class="card mb-3">
                <?php echo do_shortcode("[re-pwd]"); ?>
            </div>
            </div>
         
        </div>
        </div>
    </div>
    <!-- /.container-fluid-->
    <!-- /.content-wrapper-->
    <?php  require ("footer.php") ?>
    <!-- script update pass-->
    <script>
		jQuery(document).ready(function($){
			$(".get_otp").click(function(e){
				e.preventDefault()
                $("#load").show();
                // $( "#load" ).fadeOut( "slow");
				var ajaxurl = "<?php echo admin_url('admin-ajax.php');?>";
			    /* show firt merchaint */
			    var email = $("#form-field-email").val();
                $( "#email-update-pwd" ).val(email);
			    var data = {
		            'action': 'viking_ajax_get_otp',          
		            'email': email,
			    };
			    $.post(ajaxurl, data, function(response) {
			        
			        if(response = 1)
			        {
                       $(".get_otp").html("Update password");
                       $(".get_otp").addClass("Update-password");
			           $("#form-get-otp").hide();
			           $("#form-update-pwd").show();
			           $("#form-update-pwd").show();
                       $(".msg-sucess").text("OTP has been sent, please check your email get otp")
			           $(".msg-sucess").show()
                       $( "#load" ).fadeOut( "slow");
			        }
                    else
			        {
                        $(".msg-bug").text("An error occurred ! Please try again in a few minutes")
			            $(".msg-bug").show()
			        }
			    });

			}); 
            $(".update-pwd").click(function(e){
                e.preventDefault();
                var email = $("#email-update-pwd").val();
                var otp = $("#otp").val();
                var pwd = $("#form-field-pwd").val();
                console.log("🚀 ~ file: dashboard.php ~ line 109 ~ $ ~ pwd", pwd)
                var new_pwd = $("#form-field-confirm-pwd").val();
                var ajaxurl = "<?php echo admin_url('admin-ajax.php');?>";
                if (new_pwd != pwd) {
			    	alert("Password and Confirm password does not match!");
			    	return false;
			    }
                var data_pwd = {      
		            'email': email,
                    'otp': otp,
                    'newPassword':new_pwd,
			    };
                var data = {
		            'action': 'viking_ajax_update_pass',          
		            'datarepwd': JSON.stringify(data_pwd)
			    };
                $.post(ajaxurl, data, function(response) {
			        
			        if(response = Success)
			        {
                         alert("Confirm new password !")
                         setTimeout(function(){ window.location.href = "<?php echo site_url()?>/"; }, 2000);
			        }
                    else
			        {
                       
			        }
			    });
			}); 
            
		})
	</script>
</div>
</body>
</html>
