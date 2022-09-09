<?php
/**
 * Theme functions and definitions
 *
 * @package HelloElementorChild
 */

/**
 * Load child theme css and optional scripts
 *
 * @return void
 */
require_once 'inc/slider.php';
require_once 'inc/connect-wallet.php';
require_once 'inc/account-item.php';
require_once 'inc/new-home.php';
function hello_elementor_child_enqueue_scripts() {
	wp_enqueue_style(
		'hello-elementor-child-style',
		get_stylesheet_directory_uri() . '/style.css?v=1.6',
		[
			'hello-elementor-theme-style',
		]
	);
}
add_action( 'wp_enqueue_scripts', 'hello_elementor_child_enqueue_scripts', 20 );


add_shortcode("register_form", "VikingRegister");
function VikingRegister() {
	ob_start();
	echo do_shortcode('[elementor-template id="268"]');
	?>
	<div class="viking__message"></div>
	<script
  src="https://code.jquery.com/jquery-3.6.0.min.js"
  integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
  crossorigin="anonymous"></script>
  <script src="<?= site_url() ?>/wp-content/themes/hello-theme-child-master/assets/js/saveMyForm.jquery.js"></script>
	<script>
		jQuery(document).ready(function($){
			$(function () {
			  $("form").saveMyForm();
			});			
			$("#register").click(function(){
				var ajaxurl = "<?php echo admin_url('admin-ajax.php');?>";
			    /* show firt merchaint */
			    var username = $("#form-field-username").val();
			    var email = $("#form-field-email").val();
			    var password = $("#form-field-password").val();
			    var confirm_password = $("#form-field-confirm_pass").val();
			    var ref = $("#form-field-ref").val();
			    var wallet = $("#form-field-wallet").val();
			    var dataReg = {
					'username': username,
					'email': email,
					'password': password,
					'ref': ref,
					'walletAddress': wallet
			    }
			    if (password != confirm_password) {
			    	alert("Password and Confirm password does not match!");
			    	return false;
			    }
			    var data = {
		            'action': 'viking_register_ajax',          
		            'dataReg': JSON.stringify(dataReg)
			    };
			    $.post(ajaxurl, data, function(response) {
			        
			        if(response != 1)
			        {
			            
			            $(".viking__message").text(response);
			            $(".viking__message").addClass("message__active");
			        }
			        else
			        {
			        	$(".viking__message").text("Register successfully, you will redirect to login after 2s.");
			            $(".viking__message").addClass("message__active");
			            setTimeout(function(){ window.location.href = "<?php echo site_url()?>/login"; }, 2000);
			            
			        }
			    });

			});
		})
	</script>
	<?php

	$out = ob_get_clean();
	echo $out;
}

add_shortcode("login__form", "loginForm");
function loginForm() {
	ob_start();

	if($_SESSION['user']!= '') {
		echo '<h4 style="color:#fff">You are logged in</h4>';
		?>
		<script>
			jQuery(document).ready(function($){
				window.location.href = "<?php echo site_url()?>/viking-app";
			})
		</script>
		<?php
	}
	else {
	echo do_shortcode('[elementor-template id="280"]');
	?>
	<div class="viking__message"></div>
	<script
  src="https://code.jquery.com/jquery-3.6.0.min.js"
  integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
  crossorigin="anonymous"></script>
	<script>
		jQuery(document).ready(function($){

			$("#login").click(function(){
				var ajaxurl = "<?php echo admin_url('admin-ajax.php');?>";
			    /* show firt merchaint */
			    var username = $("#form-field-username").val();
			    var password = $("#form-field-password").val();			   
			    var dataLogin = {
					'username': username,					
					'password': password					
			    }
			    var data = {
		            'action': 'viking_login_ajax',          
		            'dataLogin': JSON.stringify(dataLogin)
			    };
			    $.post(ajaxurl, data, function(response) {
			       
			        if(response.length < 200)
			        {
			         	
			            $(".viking__message").text(response);
			            $(".viking__message").addClass("message__active");
			        }
			        else
			        {

			        	userInfor = jQuery.parseJSON(response);
			        	user = userInfor.user;	
			        	localStorage.setItem('token', userInfor.token);
			        	localStorage.setItem('email', user.email);
			        	localStorage.setItem('userid', user.id);
			        	localStorage.setItem('username', user.username);
			        	localStorage.setItem('vike', user.vik);
			        	//localStorage.setItem('adventureVike', vikes.adventureVike);
			        	//localStorage.setItem('journeyVike', vikes.journeyVike);

			        	$.ajax({
					        url: viking_ajax_obj.ajaxurl,
					        data: {
					        	'userId': user.id,
					            'action': 'viking_ajax_request_wallet_login',			            
					            'nonce' : viking_ajax_obj.nonce
					        },
					        success:function(data) {
					            // This outputs the result of the ajax request
					            console.log(data);
					            if(window.location.href.indexOf("private") > -1 ) {
					            	window.location.href = "<?php echo site_url()?>/private";
					            }
					            else {
					            	window.location.href = "<?php echo site_url()?>/viking-app";
					            }
					            
					        },
					        error: function(errorThrown){
					            console.log(errorThrown);
					        }
					    }); 


			            
			        }
			    });

			});
		})
	</script>
	<?php

	$out = ob_get_clean();
	echo $out;
	} //end if;
}

/*
Ajax Register
*/
add_action( 'wp_ajax_viking_register_ajax', 'viking_register_ajax' );
add_action( 'wp_ajax_nopriv_viking_register_ajax', 'viking_register_ajax' );
function viking_register_ajax() {

	$api = API_CENTER.'/api/v1/auth/register';
	if($_REQUEST['dataReg'] != '' && isset($_REQUEST['dataReg']) ) {
		$dataReg = $_REQUEST['dataReg'];
		$_dataReg = str_replace('\\', '', $dataReg);
		$args = array(
			'method'    => 'POST',
			'timeout'     => 45,
			'headers'	=> array(			
				//'Authorization' => 'Bearer ' . $token,
				'Content-Type' => 'application/json'
			),
			'body'	=> $_dataReg
		); 
		$response = wp_remote_post($api, $args);	
		
		if ( is_array( $response ) && ! is_wp_error( $response ) ) {
			$headers = $response['headers']; // array of http header lines
			$body    = $response['body']; // use the content
						
			$rs = json_decode($body);
			
			if($rs->status == true) {
				echo 1;
			}
			else {
				echo  $rs->message;	
			}
			

			//echo json_
		}
		else {
			echo 'Something error, please try again!';
		}
	}
	die();
}

/*
Ajax Login
*/
add_action( 'wp_ajax_viking_login_ajax', 'viking_login_ajax' );
add_action( 'wp_ajax_nopriv_viking_login_ajax', 'viking_login_ajax' );
function viking_login_ajax() {
	$api = API_GAME.'/api/v1/auth/login';

	if($_REQUEST['dataLogin'] != '' && isset($_REQUEST['dataLogin']) ) {
		$dataLogin = $_REQUEST['dataLogin'];
		$_dataLogin = str_replace('\\', '', $dataLogin);		

		$args = array(
			'method'    => 'POST',
			'headers'	=> array(			
				//'Authorization' => 'Bearer ' . $token,
				'Content-Type' => 'application/json'
			),
			'body'	=> $_dataLogin
		); 
		$response = wp_remote_post($api, $args);	
	
		if ( is_array( $response ) && ! is_wp_error( $response ) ) {
			$headers = $response['headers']; // array of http header lines
			$body    = $response['body']; // use the content
						
			$rs = json_decode($body);

			if($rs->status == true) {
				echo json_encode($rs->data);
			}
			else {
				echo $rs->message;	
			}

			//echo json_
		}
		else {
			echo 'Something error, please try again!!';
		}
	}
	die();
}

/*
Ajax update transaction
*/
add_action( 'wp_ajax_viking_ajax_update_transaction', 'viking_ajax_update_transaction' );
add_action( 'wp_ajax_nopriv_viking_ajax_update_transaction', 'viking_ajax_update_transaction' );
function viking_ajax_update_transaction() {
	$api = API_CENTER.'/api/v1/user/add-trans';

	if($_REQUEST['token'] != '' && isset($_REQUEST['token']) ) {
		$token = $_REQUEST['token'];
		$transaction = $_REQUEST['transaction'];
		$data = '{"transHash": "'.$transaction.'"}';		
		$args = array(
			'method'    => 'POST',
			'headers'	=> array(			
				'Authorization' => 'Bearer ' . $token,
				'Content-Type' => 'application/json'
			),
			'body'	=> $data
		); 
		$response = wp_remote_post($api, $args);	
	
		if ( is_array( $response ) && ! is_wp_error( $response ) ) {
			$headers = $response['headers']; // array of http header lines
			$body    = $response['body']; // use the content
						
			$rs = json_decode($body);

			if($rs->status == true) {
				echo json_encode($rs->message);
			}
			else {
				echo $rs->message;	
			}

			//echo json_
		}
		else {
			echo 'Something error, please try again!!';
			
		}
	}
	die();
}

/*
Ajax Get Infor User
*/
add_action( 'wp_ajax_viking_get_user_infor_ajax', 'viking_get_user_infor_ajax' );
add_action( 'wp_ajax_nopriv_viking_get_user_infor_ajax', 'viking_get_user_infor_ajax' );
function viking_get_user_infor_ajax() {
	$api = API_GAME.'/api/v1/user/';

	if($_REQUEST['token'] != '') {
		$token = $_REQUEST['token'];
		
		$args = array(
			'method'    => 'GET',
			'headers'	=> array(			
				'Authorization' => 'Bearer ' . $token,
				'Content-Type' => 'application/json',
				'Authorization' =>'Vi-Game'
			),
			'body'	=> ''
		); 
		$response = wp_remote_post($api, $args);	
		

		
		if ( is_array( $response ) && ! is_wp_error( $response ) ) {
			$headers = $response['headers']; // array of http header lines
			$body    = $response['body']; // use the content
						
			$rs = json_decode($body);



			if($rs->status == true) {				
				echo json_encode($rs->data);
			}
			else {
				echo $rs->message;	
			}

			//echo json_
		}
		else {
			echo 'Something error, please try again!!';
		}
	}
	die();
}


/*
Ajax available vike
*/
add_action( 'wp_ajax_viking_get_available_ajax', 'viking_get_available_ajax' );
add_action( 'wp_ajax_nopriv_viking_get_available_ajax', 'viking_get_available_ajax' );
function viking_get_available_ajax() {
	$api = API_CENTER.'/api/v1/master/available-vik';

	if($_REQUEST['token'] != '') {
		$token = $_REQUEST['token'];
		
		$args = array(
			'method'    => 'GET',
			'headers'	=> array(			
				'Authorization' => 'Bearer ' . $token,
				'Content-Type' => 'application/json'
			),
			'body'	=> ''
		); 
		$response = wp_remote_post($api, $args);	
		
		
		if ( is_array( $response ) && ! is_wp_error( $response ) ) {
			$headers = $response['headers']; // array of http header lines
			$body    = $response['body']; // use the content
						
			$rs = json_decode($body);

			if($rs->status == true) {
				echo json_encode($rs->data);
			}
			else {
				echo $rs->message;	
			}

			//echo json_
		}
		else {
			echo 'Something error, please try again!!';
		}
	}
	die();
}

/*
Ajax check wallet exits
*/
add_action( 'wp_ajax_viking_ajax_request_check_wallet', 'viking_ajax_request_check_wallet' );
add_action( 'wp_ajax_nopriv_viking_ajax_request_check_wallet', 'viking_ajax_request_check_wallet' );
function viking_ajax_request_check_wallet() {
		
	if($_REQUEST['wallet'] != '') {
		$api = API_CENTER.'/api/v1/auth/exists-user?username='.$_REQUEST['wallet'];
		$args = array(
			'method'    => 'GET',
			'headers'	=> array(			
				// 'Authorization' => 'Bearer ' . $token,
				'Content-Type' => 'application/json'
			),
			'body'	=> ''
		); 
		$response = wp_remote_post($api, $args);	
		
		
		if ( is_array( $response ) && ! is_wp_error( $response ) ) {
			$headers = $response['headers']; // array of http header lines
			$body    = $response['body']; // use the content
						
			$rs = json_decode($body);	
			

			if($rs->status == true) {
				echo json_encode($rs->data);
			}
			else {
				echo 0;	
			}

			//echo json_
		}
		else {
			echo 'Something error, please try again!!';
		}
	}
	die();
}

add_shortcode("private_form", "privateForm");
function privateForm() {
	ob_start();
	if($_SESSION['user'] = '') {
		echo '<h5 style="color:#fff">You must login before buy Vike!</h5>';
		echo do_shortcode('[login__form]');
		?>
		<div class="create--account-wallet-block">
			<h5 style="color:#fff">Or register with your wallet address:</h5>
			<div id="info">       
		        <h3 style="font-size: 14px;color:#fff; text-align: left; padding-left: 20px;"></h3>
		    </div>
		    <a id="create-account-wallet" href="">
		    	<button type="button" class="elementor-button elementor-size-md">
					<span class=" elementor-button-icon">
						<span class="elementor-button-text">Create new account</span>
					</span>
				</button>
		    </a>
		    <div class="loading_wallet_block"></div>
		</div>
		<script type="text/javascript">
			jQuery(document).ready(function(){
				setTimeout(function() {
					wallet = $("#info h3").text();
					$.ajax({
					        url: viking_ajax_obj.ajaxurl,
					        data: {		
					        	'wallet': wallet,      	
					            'action': 'viking_ajax_request_check_wallet',			            
					            'nonce' : viking_ajax_obj.nonce
					        },
					        success:function(data) {
					        	if(data == 0) {
					        		alert("Account not exits");
					        		$(".loading_wallet_block").hide();
					        	}
					        },
					        error: function(errorThrown){
					            console.log(errorThrown);
					        }
				    });  

				}, 500);				
				
			})
		</script>
		<?php
	}
	else {
		echo do_shortcode('[elementor-template id="535"]');		
		?>
	 	<div id="info">       
	        <h3 style="font-size: 14px;color:#fff; text-align: left; padding-left: 20px;"></h3>
	    </div>
			
			<script>
				jQuery(document).ready(function(){
				
					var ajaxurl = "<?php echo admin_url('admin-ajax.php');?>";
					token = localStorage.getItem('token');					
					if(token != '' && token != null) {
						
						var data = {
						            'action': 'viking_get_user_infor_ajax',          
						            'token': token
							    };


					    $.post(ajaxurl, data, function(response) {
					    	
					       resData = jQuery.parseJSON(response);		
					       $("#locked_vike").text(resData.vik);
					    });
					

					    var data_check_vike = {
						            'action': 'viking_get_available_ajax',          
						            'token': token
							    };

					    $.post(ajaxurl, data_check_vike, function(response) {
					    	
					       resData = jQuery.parseJSON(response);					       
					       $("#available_vike").text(currencyFormat(resData.availableVik) )
					    });
					}
					jQuery("#form-field-busd").on("change", function() {
						
						var busd = jQuery(this).val();
						var vike = parseFloat(busd) * 50;
						jQuery("#form-field-vike").val(vike);
					});
				
					function currencyFormat(num) {
					  return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
					}
				})
			</script>
			<a href="javascript:void(0)" id="show_popup_reg"></a>

		<?php
	} // end else user session
	$out = ob_get_clean();
	return $out;
}

function my_custom_scripts() {
    wp_enqueue_script( 'custom-js', get_stylesheet_directory_uri() . '/assets/js/saveMyForm.jquery.js', array( 'jquery' ),'',true );
}
//add_action( 'wp_enqueue_scripts', 'my_custom_scripts' );

add_shortcode("account", "accountInfor");
function accountInfor() {
	ob_start();

	?>
    <script
            src="https://code.jquery.com/jquery-3.6.0.min.js"
            integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
            crossorigin="anonymous"></script>
    <script src="<?= site_url() ?>/wp-content/themes/hello-theme-child-master/assets/web3.js-browser/build/web3.js"></script>
    <script src="<?= site_url() ?>/wp-content/themes/hello-theme-child-master/assets/js/process.js?v=1.3.5"></script>
    <script type="text/javascript">
        jQuery(document).ready(function(){
        })
    </script>
    <div class="card-header">
        <i class="fa fa-user"> Welcome <strong style="color:#C49A46" id="username"></strong></i>
    </div>
    <!-- <div class="list-group list-group-flush small">
        <a class="list-group-item list-group-item-action" href="#">
            <div class="media">
              
            </div>
        </a>
    </div> -->
	
	<div class="media">
	<div class="media-body">
                    <div class="account_infor_block">
                        <p>Email: <strong id="email"></strong></p>
                        <p>Ref link: <strong id="reflink"></strong></p>
                        <p>Wallet address: <strong  id="wallet"></strong></p>
                        <p>Your rose: <strong id="vike"></strong></p>
                    </div>
                </div>
	</div>
	<script>
		jQuery(document).ready(function($){

            token = localStorage.getItem('token');
            $.ajax({
                url: viking_ajax_obj.ajaxurl,
                data: {
                    'action': 'viking_ajax_request_vike_item',
                    'nonce' : viking_ajax_obj.nonce,
                    'token': token
                },
                success:function(data) {
                    // This outputs the result of the ajax request
                    var dataItem=JSON.parse(data);
                    console.log("🚀 ~ file: functions.php ~ line 622 ~ jQuery ~ dataItem", dataItem)
					
			jQuery("#username").text(dataItem.data.username);
			jQuery("#email").text(dataItem.data.email);
			jQuery("#wallet").text(dataItem.data.walletAddress);
			jQuery("#vike").text(dataItem.data.rose);
			jQuery("#reflink").text('<?php echo site_url()?>/' + localStorage.getItem("userid"));
			localStorage.setItem('walletAddress', dataItem.data.walletAddress);
			
                },
                error: function(errorThrown){
                    console.log(errorThrown);
                }
            });

			$("#user__logout, #head_user__logout").click(function(){
		     	logout = confirm("Are you sure to logout?");
		     	if(logout) {
		     		localStorage.removeItem('token');
		        	localStorage.removeItem('email');
		        	localStorage.removeItem('userid');
		        	localStorage.removeItem('username');
		        	localStorage.removeItem('walletAddress');
		        	localStorage.removeItem('vikes');

		        	$.ajax({
				        url: viking_ajax_obj.ajaxurl,
				        data: {
				            'action': 'viking_ajax_request_logout',			            
				            'nonce' : viking_ajax_obj.nonce
				        },
				        success:function(data) {
				            // This outputs the result of the ajax request
				            window.location.href = "<?php echo site_url()?>";				            
				        },
				        error: function(errorThrown){
				            console.log(errorThrown);
				        }
				    });  
		     	}
		     	
		    })

		})
	</script>
	<?php
	$out = ob_get_clean();
	echo $out;
}
add_shortcode("vike_item", "vike_item");
function vike_item() {
    ob_start();

    ?>
    <script
            src="https://code.jquery.com/jquery-3.6.0.min.js"
            integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
            crossorigin="anonymous"></script>
    <script src="<?= site_url() ?>/wp-content/themes/hello-theme-child-master/assets/web3.js-browser/build/web3.js"></script>
    <script src="<?= site_url() ?>/wp-content/themes/hello-theme-child-master/assets/js/process.js?v=1.3.5"></script>
    <script type="text/javascript">
        jQuery(document).ready(function(){
        })
    </script>
    <div class="card-header">
        <i class="fa fa-google-wallet"></i> Wallet:
    </div>
    <div class="vike">
        Vike: <strong id="vike_total"></strong>
    </div>
    <button class="btn-claim color-a top"> Claim</button>
    <script>
        jQuery(document).ready(function($){

            token = localStorage.getItem('token');
            $.ajax({
                url: viking_ajax_obj.ajaxurl,
                data: {
                    'action': 'viking_ajax_request_vike_item',
                    'nonce' : viking_ajax_obj.nonce,
                    'token': token
                },
                success:function(data) {
                    // This outputs the result of the ajax request
                    var dataItem=JSON.parse(data);
                    console.log("🚀 ~ file: functions.php ~ line 706 ~ jQuery ~ dataItem", data)
                    jQuery("#vike_total").text(dataItem.data.vik);
                },
                error: function(errorThrown){
                    console.log(errorThrown);
                }
            });
        })
    </script>
    <?php
    $out = ob_get_clean();
    echo $out;
}
//add_action( 'wp_enqueue_scripts', 'my_custom_scripts' );

add_shortcode("re-pwd", "re_pwd");
function re_pwd() {
	ob_start();

	?>
    <script
            src="https://code.jquery.com/jquery-3.6.0.min.js"
            integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
            crossorigin="anonymous"></script>
    <script src="<?= site_url() ?>/wp-content/themes/hello-theme-child-master/assets/web3.js-browser/build/web3.js"></script>
    <script src="<?= site_url() ?>/wp-content/themes/hello-theme-child-master/assets/js/process.js?v=1.3.5"></script>
    <script type="text/javascript">
        jQuery(document).ready(function(){
        })
    </script>
 <div class="card-header">
                    </div>
                    <form method="post" id="form-get-otp">
                        <div class="form-group">
                        <div class="p-3 mb-2 bg-danger text-white msg-bug" style="display:none"></div>
                            <label >Email <span class="text-danger">*</span></label>
                            
                            <input type="email" class="form-control" id="form-field-email" placeholder="Email get OTP">
                
                        </div>
                        <button type="submit" class="btn btn-submit color-a top get_otp"><i class="fa fa-spinner fa-spin " id="load" style="display:none"></i> Get OTP</button>
                       
                    </form>
                    <form method="post" id="form-update-pwd" style="display:none">
                        <div class="form-group">
                        <div class="p-3 mb-2 bg-success text-white msg-sucess" style="display:none">.bg-success</div>
                        <div class="p-3 mb-2 bg-danger text-white msg-bug" style="display:none">.bg-success</div>
                            <label >Email<span class="text-danger">*</span></label>
                            <input type="email" class="form-control " id="email-update-pwd">
                            <label >OTP<span class="text-danger">*</span></label>
                            <input type="text" class="form-control " id="otp">
                            <label >New Password<span class="text-danger">*</span></label>
                            <input type="password" class="form-control" id="form-field-pwd">
                            <label >Confirm Pasword<span class="text-danger">*</span></label>
                            <input type="password" class="form-control" id="form-field-confirm-pwd">
                        </div>
                        <button type="submit" class="btn btn-submit color-a top update-pwd">Update password</button>
                    </form>
                </div>
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
                       $(".get_otp").html("Reset password");
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
			        
			        if(response !=1)
			        {
                        //  alert("Confirm new password !")
                         setTimeout(function(){ window.location.href = "<?php echo site_url()?>/"; }, 200);
			        }
                    else
			        {
						$(".msg-bug").text(response)
			            $(".msg-bug").show()
			        }
			    });
			}); 
            
		})
	</script>
	<?php
	$out = ob_get_clean();
	echo $out;
}

add_action("wp_head", 'customHeadScript');
function customHeadScript() {
	?>
	<script
	src="https://code.jquery.com/jquery-3.6.0.min.js"
	integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
	crossorigin="anonymous"></script>
	<script src="<?php echo get_stylesheet_directory_uri()?>/assets/web3.js-browser/build/web3.js"></script>
	<script src="<?php echo get_stylesheet_directory_uri()?>/assets/js/process.js?v=1.3.5"></script>
	<script type="text/javascript">
		jQuery(document).ready(function(){

		})
	</script>
	<?php
}

add_shortcode("header_account", "headerAccount");
function headerAccount() {

	if(isset($_SESSION['user']) && $_SESSION['user']!= '') {	
		echo do_shortcode('[elementor-template id="953"]');
	?>				
		<style>
			.menu-item-923 {display: block!important}
		</style>
		<script>
			jQuery(document).ready(function(){
				var walletAddress = localStorage.getItem("walletAddress");
				var shortWallet = walletAddress.replace(/(.{7})..+/, "$1…");
				jQuery("#wallet__address .elementor-button-text").text(shortWallet);
			})
		</script>
	<?php } else {
		echo do_shortcode('[elementor-template id="804"]');
	}
	?>
	
	<script type="text/javascript">
		jQuery(document).ready(function($) {

		     $("#connect_wallet_metamask").click(function(){		     		
			    $.ajax({
			        url: viking_ajax_obj.ajaxurl,
			        data: {
			            'action': 'viking_ajax_request_wallet_login',			            
			            'nonce' : viking_ajax_obj.nonce
			        },
			        success:function(data) {
			            // This outputs the result of the ajax request
			            console.log(data);
			        },
			        error: function(errorThrown){
			            console.log(errorThrown);
			        }
			    });  
		     })

		     $("#user__logout, #head_user__logout").click(function(){

		     	logout = confirm("Are you sure to logout?");
		     	if(logout) {
		     		localStorage.removeItem('token');
		        	localStorage.removeItem('email');
		        	localStorage.removeItem('userid');
		        	localStorage.removeItem('username');
		        	localStorage.removeItem('walletAddress');
		        	localStorage.removeItem('vikes');

		        	$.ajax({
				        url: viking_ajax_obj.ajaxurl,
				        data: {
				            'action': 'viking_ajax_request_logout',			            
				            'nonce' : viking_ajax_obj.nonce
				        },
				        success:function(data) {
				            // This outputs the result of the ajax request
				            window.location.href = "<?php echo site_url()?>";				            
				        },
				        error: function(errorThrown){
				            console.log(errorThrown);
				        }
				    });  
		     	}
		     	else {
		     		return false;
		     	}
		     	
		    })
		    
		              
		});
	</script>
	<?php
}
add_shortcode("headerVike", "headerVike");
function headerVike() {
        ob_start();
        ?>
        <script
                src="https://code.jquery.com/jquery-3.6.0.min.js"
                integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
                crossorigin="anonymous"></script>
        <script src="<?= site_url() ?>/wp-content/themes/hello-theme-child-master/assets/web3.js-browser/build/web3.js"></script>
        <script src="<?= site_url() ?>/wp-content/themes/hello-theme-child-master/assets/js/process.js?v=1.3.5"></script>
        <script type="text/javascript">
            jQuery(document).ready(function(){
            })
        </script>
    <li class="nav-item" id="claim_journey">
        <form class="form-inline my-2 my-lg-0 mr-lg-2">
            <div class="input-group ">
                <input class="form-control claim_journey" type="text" readonly >
                <span class="input-group-append">
                <button class="btn btn-claimnav" type="button">
                   <a class="nav-link" data-toggle="modal" data-target="#exampleModal">
                    <i class="fa fa-fw fa-money"></i> Claim</a>
                </button>
              </span>
            </div>
        </form>
    </li>
        <script>
            jQuery(document).ready(function($){

                token = localStorage.getItem('token');
                $.ajax({
                    url: viking_ajax_obj.ajaxurl,
                    data: {
                        'action': 'viking_ajax_request_vike_game',
                        'nonce' : viking_ajax_obj.nonce,
                        'token': token
                    },
                    success:function(data) {
                        // This outputs the result of the ajax request
                        var dataItem=JSON.parse(data);
                        var journeyVik=dataItem.data.journeyVik;
                        jQuery(".claim_journey").val(journeyVik);


                    },
                    error: function(errorThrown){
                        console.log(errorThrown);
                    }
                });
            })
        </script>
        <?php
        $out = ob_get_clean();
        echo $out;
}
add_shortcode("headerVike2", "headerVike2");
function headerVike2() {
    ob_start();
    ?>
    <script
            src="https://code.jquery.com/jquery-3.6.0.min.js"
            integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
            crossorigin="anonymous"></script>
    <script src="<?= site_url() ?>/wp-content/themes/hello-theme-child-master/assets/web3.js-browser/build/web3.js"></script>
    <script src="<?= site_url() ?>/wp-content/themes/hello-theme-child-master/assets/js/process.js?v=1.3.5"></script>
    <script type="text/javascript">
        jQuery(document).ready(function(){
        })
    </script>
    <li class="nav-item" id="claim_adventure">
        <form class="form-inline my-2 my-lg-0 mr-lg-2">
            <div class="input-group ">
                <input class="form-control claim_adventure" type="text" readonly >
                <span class="input-group-append">
                <button class="btn btn-claimnav" type="button">
                   <a class="nav-link" data-toggle="modal" data-target="#exampleModal">
                    <i class="fa fa-fw fa-money"></i> Claim</a>
                </button>
              </span>
            </div>
        </form>
    </li>
    <script>
        jQuery(document).ready(function($){

            token = localStorage.getItem('token');
            $.ajax({
                url: viking_ajax_obj.ajaxurl,
                data: {
                    'action': 'viking_ajax_request_vike_game',
                    'nonce' : viking_ajax_obj.nonce,
                    'token': token
                },
                success:function(data) {
                    // This outputs the result of the ajax request
                    var dataItem=JSON.parse(data);
                    var adventure=dataItem.data.adventureVik;
                    jQuery(".claim_adventure").val(adventure);


                },
                error: function(errorThrown){
                    console.log(errorThrown);
                }
            });
        })
    </script>
    <?php
    $out = ob_get_clean();
    echo $out;
}
function example_ajax_enqueue() {

	// Enqueue javascript on the frontend.
	wp_enqueue_script(
		'example-ajax-script',
		get_template_directory_uri() . '/js/simple-ajax-example.js',
		array('jquery')
	);

	// The wp_localize_script allows us to output the ajax_url path for our script to use.
	wp_localize_script(
		'example-ajax-script',
		'viking_ajax_obj',
		array(
			'ajaxurl' => admin_url( 'admin-ajax.php' ),
			'nonce' => wp_create_nonce('ajax-nonce')
		)
	);

}
add_action( 'wp_enqueue_scripts', 'example_ajax_enqueue' );

/*
* Login wallet
*/

function viking_ajax_request_wallet_login() {
 
 
    // The $_REQUEST contains all the data sent via ajax
    if ( isset($_REQUEST) ) {
     	$userId = $_REQUEST['userId'];
        session_start();
        $_SESSION['user'] = $userId;
        // Now we'll return it to the javascript function
        // Anything outputted will be returned in the response
        echo $_SESSION['user'];
     
    }
     
    // Always die in functions echoing ajax content
   die();
}
 
add_action( 'wp_ajax_viking_ajax_request_wallet_login', 'viking_ajax_request_wallet_login' );
// If you wanted to also use the function for non-logged in users (in a theme for example)
add_action( 'wp_ajax_nopriv_viking_ajax_request_wallet_login', 'viking_ajax_request_wallet_login' );

/*
* Logout
*/

function viking_ajax_request_logout() {
 
 
    // The $_REQUEST contains all the data sent via ajax        
    session_start();
    unset($_SESSION['user']);
    // Now we'll return it to the javascript function
    // Anything outputted will be returned in the response        
 	echo 1;
     
    // Always die in functions echoing ajax content
   die();
}
 
add_action( 'wp_ajax_viking_ajax_request_logout', 'viking_ajax_request_logout' );
// If you wanted to also use the function for non-logged in users (in a theme for example)
add_action( 'wp_ajax_nopriv_viking_ajax_request_logout', 'viking_ajax_request_logout' );


function register_my_session(){
    if( ! session_id() ) {
        session_start();
    }
}

add_action('init', 'register_my_session');

function viking_update_vike_user_ajax_request() {

}
add_action( 'wp_ajax_viking_update_vike_user_ajax_request', 'viking_update_vike_user_ajax_request' );
add_action( 'wp_ajax_nopriv_viking_update_vike_user_ajax_request', 'viking_update_vike_user_ajax_request' );

add_shortcode("download_block", "downloadBlock");
function downloadBlock() {
	ob_start();
	?>
	<style>
		@import url("https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css");
		ul.download_block {
		  width: 100%;
		  text-align: center;
		  margin: 0;
		  padding: 0;
		 /* position: absolute;
		  top: 50%;
		  transform: translateY(-50%);*/
		}

		.download_block li {
		  display: inline-block;
		  margin: 10px;
		}

		.download {
		  width: 200px;
		  height: 75px;
		  background: black;
		  float: left;
		  border-radius: 5px;
		  position: relative;
		  color: #fff;
		  cursor: pointer;
		  border: 1px solid #fff;
		}

		.download > .fa {
		  color: #fff;
		  position: absolute;
		  top: 50%;
		  left: 15px;
		  transform: translateY(-50%);
		}

		.df,
		.dfn {
		  position: absolute;
		  left: 70px;
		}

		.df {
		  top: 20px;
		  font-size: .68em;
		}

		.dfn {
		  top: 33px;
		  font-size: 1.08em;
		}

		.download:hover {
		/*  -webkit-filter: invert(100%);
		  filter: invert(100%);*/
		  background: #eeb609;
		}
		i.fa-android {
			font-size: 40px;
		}
	</style>
	<ul class="download_block">
	  <li>
	    
	    <a target="_blank" class="download android" href="<?= site_url() ?>/download/Game.apk">
	      <i class="fa fa fa-android fa-3x"></i>
	      <span class="df">Download from</span>
	      <span class="dfn">Google Play</span>
	  	</a>
	    
	  </lI>
	  <li>
	    <a target="_blank" class="download apple" href="">
	      <i class="fa fa fa-apple fa-3x"></i>
	      <span class="df">Download from</span>
	      <span class="dfn">App Store</span>
	    </a>
	  </li>
	  <li>
	 
	    <a target="_blank" class="download windows hide__mobile" href="<?= site_url() ?>/download/BuildPC.rar">
	      <i class="fa fa fa-windows fa-3x"></i>
	      <span class="df">Download from</span>
	      <span class="dfn">Windows Store</span>
	    </a>
	    </a>
	  </li>
	</ul>
	<?php

	$out = ob_get_clean();
	echo $out;
}
/* function by Binh IT */
/*
Ajax Get Adventure User
*/
add_action( 'wp_ajax_viking_get_adventure_ajax', 'viking_get_adventure_ajax' );
add_action( 'wp_ajax_nopriv_viking_get_adventure_ajax', 'viking_get_adventure_ajax' );
function viking_get_adventure_ajax() {
    $api = API_GAME.'/api/v1/game/chr?gameKey=G1&order=asc';
    if($_REQUEST['token'] != '') {
        $token = $_REQUEST['token'];
        $args = array(
            'method'    => 'GET',
            'headers'	=> array(
                'Authorization' => 'Bearer ' . $token,
                'Content-Type' => 'application/json'
            ),
            'body'	=> ''
        );
        $response = wp_remote_post($api, $args);
        if ( is_array( $response ) && ! is_wp_error( $response ) ) {
            $headers = $response['headers']; // array of http header lines
            $body    = $response['body']; // use the content
            echo ($body);
        }
        else {
            echo 'Something error, please try again!!';
        }
    }
    die();
}
/*
Ajax Get JOURNEY SECTION
*/
add_action( 'wp_ajax_viking_get_journey_ajax', 'viking_get_journey_ajax' );
add_action( 'wp_ajax_nopriv_viking_get_journey_ajax', 'viking_get_journey_ajax' );
function viking_get_journey_ajax() {
    $api = API_GAME.'/api/v1/game/chr?gameKey=G2&order=asc';
    if($_REQUEST['token'] != '') {
        $token = $_REQUEST['token'];
        $args = array(
            'method'    => 'GET',
            'headers'	=> array(
                'Authorization' => 'Bearer ' . $token,
                'Content-Type' => 'application/json'
            ),
            'body'	=> ''
        );
        $response = wp_remote_post($api, $args);
        if ( is_array( $response ) && ! is_wp_error( $response ) ) {
            $headers = $response['headers']; // array of http header lines
            $body    = $response['body']; // use the content
            echo ($body);
        }
        else {
            echo '0';
        }
    }
    die();
}
/*
*Request Vike
*/

function viking_ajax_request_vike_item() {
    $api = API_CENTER.'/api/v1/user/';
    if($_REQUEST['token'] != '') {
        $token = $_REQUEST['token'];
        $args = array(
            'method'    => 'GET',
            'headers'	=> array(
                'Authorization' => 'Bearer ' . $token,
                'Authorization-Type' => 'Vi-Game',
                
            ),
            'body'	=> ''
        );
        $response = wp_remote_post($api, $args);
        if ( is_array( $response ) && ! is_wp_error( $response ) ) {
            $headers = $response['headers']; // array of http header lines
            $body    = $response['body']; // use the content
            echo ($body);
        }
        else {
            echo 'error>function.php line 1188';
        }
    }
    die();
}

add_action( 'wp_ajax_viking_ajax_request_vike_item', 'viking_ajax_request_vike_item' );
// If you wanted to also use the function for non-logged in users (in a theme for example)
add_action( 'wp_ajax_nopriv_viking_ajax_request_vike_item', 'viking_ajax_request_vike_item' );
/*
*Request Vike Game
*/

function viking_ajax_request_vike_game() {
    $api = API_GAME.'/api/v1/user/';
    if($_REQUEST['token'] != '') {
        $token = $_REQUEST['token'];
        $args = array(
            'method'    => 'GET',
            'headers'	=> array(
                'Authorization' => 'Bearer ' . $token,
                'Content-Type' => 'application/json',
                'Authorization-Type' => 'Vi-Game',
            ),
            'body'	=> ''
        );
        $response = wp_remote_post($api, $args);
        if ( is_array( $response ) && ! is_wp_error( $response ) ) {
            $headers = $response['headers']; // array of http header lines
            $body    = $response['body']; // use the content
            echo ($body);
        }
        else {
            echo '"🚀 ~ file: functions.php ~ line 1223 ~ viking_ajax_request_vike_game';
        }
    }
    die();
}

add_action( 'wp_ajax_viking_ajax_request_vike_game', 'viking_ajax_request_vike_game' );
// If you wanted to also use the function for non-logged in users (in a theme for example)
add_action( 'wp_ajax_nopriv_viking_ajax_request_vike_game', 'viking_ajax_request_vike_game' );
/*
Ajax get otp
*/
add_action( 'wp_ajax_viking_ajax_get_otp', 'viking_ajax_get_otp' );
add_action( 'wp_ajax_nopriv_viking_ajax_get_otp', 'viking_ajax_get_otp' );
function viking_ajax_get_otp() {
		
	if($_REQUEST['email'] != '') {
		$api = API_CENTER.'/api/v1/auth/get-otp?email='.$_REQUEST['email'];
		$args = array(
			'method'    => 'GET',
			'headers'	=> array(			
				// 'Authorization' => 'Bearer ' . $token,
				'Content-Type' => 'application/json'
			),
			'body'	=> ''
		); 
		$response = wp_remote_post($api, $args);	
		
		if ( is_array( $response ) && ! is_wp_error( $response ) ) {
			echo 1;
		}
		else {
			echo 'Something error, please try again!!';
		}
	}
	die();
}
/*
Ajax Check update 
*/
add_action( 'wp_ajax_viking_ajax_update_pass', 'viking_ajax_update_pass' );
add_action( 'wp_ajax_nopriv_viking_ajax_update_pass', 'viking_ajax_update_pass' );
function viking_ajax_update_pass() {
	$api = API_CENTER.'/api/v1/auth/reset-password';
	if($_REQUEST['datarepwd'] != '' && isset($_REQUEST['datarepwd']) ) {
		$datanew = $_REQUEST['datarepwd'];
		$_datanew = str_replace('\\', '', $datanew);		
       
		$args = array(
			'method'    => 'PUT',
			'headers'	=> array(			
				//'Authorization' => 'Bearer ' . $token,
				'Content-Type' => 'application/json'
			),
			'body'	=> $_datanew,
		); 
		$response = wp_remote_post($api, $args);	
		if ( is_array( $response ) && ! is_wp_error( $response ) ) {
			$headers = $response['headers']; // array of http header lines
			$body    = $response['body']; // use the content
						
			$rs = json_decode($body);	
			if($rs->status == true) {
				echo $rs->message;
			}
			else {
				echo $rs->message;
			}

			//echo json_
		}
		else {
			echo 'Something error, please try again!!';
		}
	}
	die();
}
