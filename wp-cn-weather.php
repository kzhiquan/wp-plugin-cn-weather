<?php
/*
Plugin Name: WP-CN-Weather
Plugin URI: 
Description: china weather plugin
Version: 0.1
Author: kzhiquan
Author URI: www.eyeseenull.me
*/
?>

<?php
function weatherfoot(){
?>
	<script src="<?php echo plugins_url('', __FILE__)?>/weather.js" type="text/javascript"></script>
    <script type="text/javascript">
    	$('#weather').weather({
            el:'.Widget_CN_Weather #weather',
            weatherurl:'http://5.175.133.112:3000/weather',
            imgurl:'<?php echo plugins_url('', __FILE__)?>'
        });
    </script>
<?php
}





// widgets for weather.
class Widget_CN_Weather extends WP_Widget{
	
	//override the parent WP_Widget method, output for client the html content to UI.
	function widget($args, $instance) {		
		/* $args array, you can give the arguments throught register_sidebar(),
		 * if you don't like the the default style wraper below.
		[name] => 边栏 1
    	[id] => sidebar-1
    	[description] => 
    	[class] => 
    	[before_widget] => <li id="weather-2" class="widget Widget_CN_Weather">
    	[after_widget] => </li>

    	[before_title] => <h2 class="widgettitle">
    	[after_title] => </h2>

    	[widget_id] => weather-2
    	[widget_name] => Weather Widget*/
    	
    	/* $instance of the this widget
    	[title] => kzhiquan*/
		
		extract($args);
		echo $before_widget.$before_title.$instance['title'].$after_title."<div id='weather'></div>".$after_widget;
		
	}
	
	// override the parent WP_Widget method, output for admin the left html,set widget opt.
	function form($instance) {
		$title = esc_attr($instance['title']);
		/*<p>
			<label>
				标题：
				<input id="widget-weather-3-title" 
					class="widefat" 
					type="text" 
					value="" 
	 				name="widget-weather[3][title]">
			</label>
		</p>*/
        ?>
            <p>
            	<label for="<?php echo $this->get_field_id('title'); ?>">
            			<?php _e('Title:'); ?> 
            			<input class="widefat" id="<?php echo $this->get_field_id('title'); ?>" 
            					name="<?php echo $this->get_field_name('title'); ?>" 
            					type="text" value="<?php echo $title; ?>" />
            	</label>
            </p>
        <?php
	}
	
	//override the paretn WP_Widget method, if you set the title on the admin panel, the widget
	//will update, the title you set will inside.
	function update($new_instance, $old_instance) {
		return $new_instance;
	}
	
	// override the parent WP_Widget method, output for admin the right html,widget info.
	function __construct(){
		$widget_opts = array(
			'classname'=>"Widget_CN_Weather",
			'description'=>'an widget get weather infomation of china city.'
		);
		parent::WP_Widget('weather', 'Weather Widget', $widget_opts);
	}
}


/* widget init */
function wp_cn_weather_init(){
	register_widget('Widget_CN_Weather');
}

add_action('widgets_init', 'wp_cn_weather_init');


/* output the weather div container */
function wp_cn_weather(){
	echo "<div id='weather'></div>";
}

add_action('wp_footer',weatherfoot);





?>