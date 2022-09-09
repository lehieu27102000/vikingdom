<?php
add_shortcode("connect_wallet", "connectWallet");
function connectWallet() {
	ob_start();

	if($_SESSION['user'] == '') {
		echo '<div id="info"><span style="color:#fff">Your wallet:</span> <h3 style="color:#fff"></h3></div>';
		echo '<div class="connect--wallet-form signup--block">' . do_shortcode('[elementor-template id="268"]') . '</div>';
		echo '<div class="connect--wallet-form login--block">' . do_shortcode('[login__form]') . '</div>';
		?>
		<!--div class="create--account-wallet-block">
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
		</div-->
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
					        		$(".login--block").remove();
					        		$(".loading_wallet_block").hide();
					        		alert("Account not exits, please create new account with your wallet address");
					        		$("#form-field-wallet").val(wallet);
					        		$(".signup--block").addClass("active-connect-form");
					        		$("#form__login").hide();
					        	}
					        	else {
					        		$(".signup--block").remove();
					        		$("#form-field-username").hide();
					        		$("label[for='form-field-username']").hide();
					        		$(".login--block").addClass("active-connect-form");
					        		$("#form-field-username").val(wallet);
					        	}
					        },
					        error: function(errorThrown){
					            console.log(errorThrown);
					        }
				    });  

				}, 500);
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
			        	//vikes = user.vikes;	 
			        	  	
			        	localStorage.setItem('token', userInfor.token);
			        	localStorage.setItem('email', user.email);
			        	localStorage.setItem('userid', user.id);
			        	localStorage.setItem('username', user.username);
			        	localStorage.setItem('walletAddress', user.walletAddress);
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
	}
	else {

		echo "You're loged in!";
	} // end else user session
	$out = ob_get_clean();
	return $out;
}