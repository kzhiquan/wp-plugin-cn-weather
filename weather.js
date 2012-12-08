/**
 * Created with JetBrains WebStorm.
 * User: sony
 * Date: 12-12-1
 * Time: 下午12:58
 * To change this template use File | Settings | File Templates.
 */


//closure for weather.
(function($){

    $.fn.weather = function(opts){
        var opts = opts || {};

        if ( opts.el == undefined ){
            return;
        }

        this.getWeather(opts, function(weather){
            $(document).ready(function(){
                var imgnum = '13';
                var description = weather.weather1;
                if(description.indexOf("多云")!==-1||description.indexOf("晴")!==-1){imgnum='1';}
                else if(description.indexOf("多云")!==-1&&description.indexOf("阴")!==-1){imgnum='2';}
                else if(description.indexOf("阴")!==-1&&description.indexOf("雨")!==-1){imgnum='3';}
                else if(description.indexOf("晴")!==-1&&description.indexOf("雨")!==-1){imgnum='12';}
                else if(description.indexOf("晴")!==-1&&description.indexOf("雾")!==-1){imgnum='12';}
                else if(description.indexOf("晴")!==-1){imgnum='13';}
                else if(description.indexOf("多云")!==-1){imgnum='2';}
                else if(description.indexOf("阵雨")!==-1){imgnum='3';}
                else if(description.indexOf("小雨")!==-1){imgnum='3';}
                else if(description.indexOf("中雨")!==-1){imgnum='4';}
                else if(description.indexOf("大雨")!==-1){imgnum='5';}
                else if(description.indexOf("暴雨")!==-1){imgnum='5';}
                else if(description.indexOf("冰雹")!==-1){imgnum='6';}
                else if(description.indexOf("雷阵雨")!==-1){imgnum='7';}
                else if(description.indexOf("小雪")!==-1){imgnum='8';}
                else if(description.indexOf("中雪")!==-1){imgnum='9';}
                else if(description.indexOf("大雪")!==-1){imgnum='10';}
                else if(description.indexOf("暴雪")!==-1){imgnum='10';}
                else if(description.indexOf("扬沙")!==-1){imgnum='11';}
                else if(description.indexOf("沙尘")!==-1){imgnum='11';}
                else if(description.indexOf("雾")!==-1){imgnum='12';}
                else{imgnum='2';}

                var imgsrc = opts.imgurl+'/img/s_' + imgnum + '.png';

                var weatherhtml = '<div style="font-size:12px">';
                weatherhtml += '<img style="vertical-align:middle" class="weatherimg" alt="weather_img" src='+imgsrc+'>';
                weatherhtml += '<div style="display: inline;line-height: 48px">';
                weatherhtml += '<span class="weathercity" style="padding-left:8px">'+weather.city+'</span>';
                weatherhtml += '<span class="weathertitle" style="padding-left:8px">'+ weather.weather1+'</span>';
                weatherhtml += '<span class="weathertemp" style="padding-left:8px">'+weather.temp1+'</span>';
                weatherhtml += '<span class="weatherwind" style="padding-left:8px">'+weather.wind1+'</span></div></div>';

                $(weatherhtml).appendTo(opts.el);

                //console.log(weatherhtml);
            });
        });
    };

    // an jQuery static function, callback parameter:ther weathear.
    $.fn.getWeather = function(opts, callback){
        $.getScript('http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js',function(){
            $.ajax({
                type : "get",
                url : opts.weatherurl+'?city=' + remote_ip_info.city,
                dataType : "jsonp",
                jsonpCallback: "setWeather",
                success : function(json){
                    //window.weather = json.weatherinfo;
                    callback(json.weatherinfo);
                },
                error:function(){
                    alert('get weather fail, sorry!');
                }
            });
        });
    };


})(jQuery);


