export default `<?php

/**
 * Generated by the WordPress Meta Box Generator By John Tendik
 * https://johntendik.com/tools/wordpress-meta-box-generator/
 * 
 * Retrieving the values:
 * test = get_post_meta( get_the_ID(), 'name_of_field', true )
 */

class JT_Metabox_Generator {
  public function __construct() {
		add_action( 'add_meta_boxes', array( $this, 'add_meta_boxes' ) );
		add_action( 'save_post', array( $this, 'save_post' ), 10, 2 );
	}

  public function add_meta_boxes() {
    add_meta_box(
      '@@metabox-id@@',
      __('@@metabox-title@@', '@@text-domain@@'),
      array( $this, 'add_meta_box_callback' ),
      array(@@screens@@),
      '@@context@@',
      '@@priority@@'
    );
	}

  public function save_post($post_id, $post) {
    /* Verify the nonce before proceeding. */
    if ( !isset( $_POST['jt_metabox_nonce'] ) || !wp_verify_nonce( $_POST['jt_metabox_nonce'], basename( __FILE__ ) ) )
      return $post_id;

    /* Get the post type object. */
    $post_type = get_post_type_object( $post->post_type );
  
    /* Check if the current user has permission to edit the post. */
    if ( !current_user_can( $post_type->cap->edit_post, $post_id ) )
      return $post_id;

    /* Get the meta key. */
    $meta_key_prefix = 'jt_mbg_';


    /* DO NOT FORGET TO DO YOUR OWN SANITIZATION HERE!! */

    @@save_post@@
  }

  public function add_meta_box_callback() {
    echo "<style>div.jt-meta-box-flex{display:flex;align-items:flex-start;margin: 14px 0;}div.jt-meta-box-flex label{width: 190px;margin: 0}</style>";

    wp_nonce_field( basename( __FILE__ ), 'jt_metabox_nonce' );
    @@fields@@
  }

  private function get_value($id) {
    global $post;
    $meta_key_prefix = 'jt_mbg_';
		if ( metadata_exists( 'post', $post->ID, $meta_key_prefix . $id ) ) {
			$value = get_post_meta( $post->ID, $meta_key_prefix . $id, true );
		} else {
			return '';
		}
		return $value;
  }
}

new JT_Metabox_Generator;

?>`;