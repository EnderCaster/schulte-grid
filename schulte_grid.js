// Consts
var WIDTH = 5;
var HEIGHT = 5;
//Page Load Complete
$().ready(function () {
    $("#game-field").hide();
    $('#counter-wrapper').hide();
    // setWapperArea();
});
//Game Variables
var start_time = 0;
var end_time = 0;
var number_this_time = 1;


//Game Functions
function init(){
    // init 
    var content = '<table class="game_table">';
    var total = 1;
    for (row_no = 0; row_no < HEIGHT; row_no++) {
        content += "<tr>";
        for (col_no = 0; col_no < WIDTH; col_no++) {
            content += ("<td id=\"gfd_" + total + "\" onclick='cellClick(this)'>" + Math.random() * 25 + "</td>");
            total++;
        }
        content += "</tr>"
    }
    content += "</table>";
    $("#game-field").html(content);
}
function reset() {
    WIDTH=$('#width').val()?$('#width').val():WIDTH;
    HEIGHT=$('#height').val()?$('#height').val():HEIGHT;
    init();
    number_this_time = 1;
    $("#counter").html(number_this_time);
    start_time = (new Date).getTime();
    var game_value = getNewRandomField();
    for (i in game_value) {
        $('#gfd_' + (~~i + 1)).html(game_value[i]);
    }
    $("#game-field").show();
    $('#counter-wrapper').show();
    $("#not-game").hide();
}

function getNewRandomField() {
    var game_value = {};
    var game_keys = [];
    var exchange = [];
    var total = WIDTH * HEIGHT;
    for (index = 0; index < total; index++) {
        game_keys[index] = Math.random() * 25;
        if (game_value[game_keys[index]]) {
            exchange.push(game_value[game_keys[index]]);
        }
        game_value[game_keys[index]] = index + 1;
    }
    game_keys = game_keys.sort();
    var game_value_return = [];
    for (i in game_keys) {
        game_value_return[i] = game_value[game_keys[i]];
    }
    for (i in exchange) {
        game_value_return.push(exchange[i]);
    }
    return game_value_return;
}

function cellClick(_self) {
    var number = $('#' + _self.id).html();
    number = ~~number;
    console.log(number);
    if (number == number_this_time) {
        number_this_time++;
        $(_self).css('background-color',"black")
    }
    judge();
}
// function tips() {
//     layer.open({
//         type: 1,
//         skin: 'layui-layer-demo', //样式类名
//         closeBtn: 0, //不显示关闭按钮
//         anim: 2,
//         shadeClose: true, //开启遮罩关闭
//         content: '按顺序点击1-25'
//     });
// }
function judge() {
    if (number_this_time > WIDTH * HEIGHT) {
        end_time = (new Date).getTime();
        var show_time = Number((end_time - start_time) / 1000).toFixed(3) + "s"
        $("#message").html('<h2>Time: ' + show_time + '</h2>');
        $("#game-field").hide();
        $('#counter-wrapper').hide();
        $("#not-game").show();
    } else {
        $("#counter").html(number_this_time);
    }
}

//System Control Functions
function setWapperArea() {
    $("#wapper").css("height", (HEIGHT * 1.2) + "cm");
    $("#wapper").css("width", (WIDTH * 1.5) + "cm");
}