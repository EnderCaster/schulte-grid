//Vue
var settings = new Vue({
    el: '#schulte-app',
    data: {
        warp_width: 5,
        warp_height: 5,
        adjust: 1,
        difficulty: "normal"
    },
    methods: {
        back: function () {
            history.back();
        }
    }
})

// Consts
var WIDTH = settings.warp_width;
var HEIGHT = settings.warp_height;
//Page Load Complete
$().ready(function () {
    $("#game-field").hide();
    $('#counter-wrapper').hide();

});
//Game Variables
var start_time = 0;
var end_time = 0;
var number_this_time = 1;


//Game Functions
function init() {
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
    WIDTH = settings.warp_width;
    HEIGHT = settings.warp_height;
    init();
    number_this_time = 1;
    $("#counter").html(number_this_time);
    start_time = (new Date).getTime();
    var game_value = getNewRandomField();
    for (i in game_value) {
        $('#gfd_' + (~~i + 1)).html(game_value[i]);
    }
    setWapperArea();
    $("#game-field").show();
    $('#counter-wrapper').show();
    $("#not-game").hide();
    if (settings.difficulty == "hard") {
        setTimeout("hardLevelAdditional()", 5000)
    }
}

function hardLevelAdditional() {
    console.log('did');
    $(".game_table tr td").css('color', $(".game_table").css('background-color'))
    start_time = (new Date).getTime();
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
    if (number == number_this_time) {
        var hard_not_click = ($(".game_table tr td").css('color') != $(".game_table").css('background-color') && settings.difficulty == "hard");
        if (!hard_not_click) {
            number_this_time++;
        }
    }
    if (settings.difficulty == "easy") {
        $(_self).css('background-color', "black")
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
        $("#message").html('<h2>Time: ' + show_time + 'Difficulty: ' + settings.difficulty + '</h2>');
        $("#game-field").hide();
        $('#counter-wrapper').hide();
        $("#not-game").show();
    } else {
        $("#counter").html(number_this_time);
    }
}

//System Control Functions
function setWapperArea() {
    $(".game_table tr td").css('height', 1 * settings.adjust + "cm")
    $(".game_table tr td").css('width', 1 * settings.adjust + "cm")
    $(".game_table tr td").css('font-size', 0.5 * settings.adjust + "cm")
}