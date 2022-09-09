<?php
add_shortcode("account_item", "accountItem");
function accountItem() {
	?>
	<script type="text/javascript">
		jQuery(document).ready(function(){
			var ajaxurl = "<?php echo admin_url('admin-ajax.php');?>";
					token = localStorage.getItem('token');					
					if(token != '' && token != null) {
					

					    var data_get_game_item = {
						            'action': 'viking_get_game_item_ajax',          
						            'token': token
							    };

					    $.post(ajaxurl, data_get_game_item, function(response) {
					    	
					       //resData = jQuery.parseJSON(response);					       
					       console.log(response);
					       
					    });
					}
		})
	</script>
	<?php
}


/*
Ajax Get Game Item
*/
add_action( 'wp_ajax_viking_get_game_item_ajax', 'viking_get_game_item_ajax' );
add_action( 'wp_ajax_nopriv_viking_get_game_item_ajax', 'viking_get_game_item_ajax' );
function viking_get_game_item_ajax() {

	$api = API_GAME.'/api/v1/master/game/chr';

	if($_REQUEST['token'] != '') {

		$token = $_REQUEST['token'];
	//	var_dump($token);die();
		$args = array(
			'method'    => 'GET',
			'headers'	=> array(	
				"Authorization-Type" => 'Vi-Game',		
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

			var_dump($rs);die();



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