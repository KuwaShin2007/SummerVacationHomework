//先手の時間表示
let zikan1DOM;
let startTime1;
window.onload = function(){
    zikan1DOM = document.getElementById('zikan1');
    zikan1DOM.innerHTML = '00:00'
};
function msecToSecString(time){
    time = Math.floor(time / 1000);

    const seconds = time % 60;
    
    const minutes = Math.floor(time / 60);

    const secondStr = (seconds < 10 ? '0' : '') + String(seconds);
    const minuteStr = (minutes < 10 ? '0' : '') + String(minutes);
    return minuteStr + ":" + secondStr;
}
function UpdateTimer1(){
    const nowTime = new Date().getTime();
    zikan1DOM.innerHTML = msecToSecString(nowTime - startTime1);
}
function StartButton(){
    startTime1 = new Date().getTime();
    setInterval(UpdateTimer1,1000);
}
function resetbutton(){
    for(let i = 0; i < 9; i++){
        for(let j = 0; j < 9; j++){
            let id = String(i) + String(j);
            let movement = syokikoma[i][j];
            document.getElementById(id).innerHTML = movement;
        }
    }
}

//駒の配置記憶場所
//初期配置
const syokikoma = [["香","桂","銀","金","王","金","銀","桂","香"],
                   ["　","飛","　","　","　","　","　","角","　"],
                   ["歩","歩","歩","歩","歩","歩","歩","歩","歩"],
                   ["　","　","　","　","　","　","　","　","　"],
                   ["　","　","　","　","　","　","　","　","　"],
                   ["　","　","　","　","　","　","　","　","　"],
                   ["歩","歩","歩","歩","歩","歩","歩","歩","歩"],
                   ["　","角","　","　","　","　","　","飛","　"],
                   ["香","桂","銀","金","王","金","銀","桂","香"]];
//現在の配置
let movementkoma = [["香","桂","銀","金","王","金","銀","桂","香"],
                    ["　","飛","　","　","　","　","　","角","　"],
                    ["歩","歩","歩","歩","歩","歩","歩","歩","歩"],
                    ["　","　","　","　","　","　","　","　","　"],
                    ["　","　","　","　","　","　","　","　","　"],
                    ["　","　","　","　","　","　","　","　","　"],
                    ["歩","歩","歩","歩","歩","歩","歩","歩","歩"],
                    ["　","角","　","　","　","　","　","飛","　"],
                    ["香","桂","銀","金","王","金","銀","桂","香"]];
//先手の駒
let senntekoma = [["香","桂","銀","金","王","金","銀","桂","香"],
                  ["　","飛","　","　","　","　","　","角","　"],
                  ["歩","歩","歩","歩","歩","歩","歩","歩","歩"],
                  ["　","　","　","　","　","　","　","　","　"],
                  ["　","　","　","　","　","　","　","　","　"],
                  ["　","　","　","　","　","　","　","　","　"],
                  ["　","　","　","　","　","　","　","　","　"],
                  ["　","　","　","　","　","　","　","　","　"],
                  ["　","　","　","　","　","　","　","　","　"]];
//後手の駒
let gotekoma = [["　","　","　","　","　","　","　","　","　"],
                ["　","　","　","　","　","　","　","　","　"],
                ["　","　","　","　","　","　","　","　","　"],
                ["　","　","　","　","　","　","　","　","　"],
                ["　","　","　","　","　","　","　","　","　"],
                ["　","　","　","　","　","　","　","　","　"],
                ["歩","歩","歩","歩","歩","歩","歩","歩","歩"],
                ["　","角","　","　","　","　","　","飛","　"],
                ["香","桂","銀","金","王","金","銀","桂","香"]];

//ターンを定義
let sente = true;
let gote = false;

//移動できるか定義
let senteidou = false;
let senteidouHu = false;
let senteidouKyou = false;//数字を代入
let senteidouKei = false;
let senteidouGin = false;
let senteidouKin = false;
let senteidouKaku = false;//数字を代入
let senteidouHisya = false;//数字を代入
let senteidouOu = false;

let goteidou = false;
let goteidouHu = false;
let goteidouKyou = false;//数字を代入
let goteidouKei = false;
let goteidouGin = false;
let goteidouKin = false;
let goteidouKaku = false;//数字を代入
let goteidouHisya = false;//数字を代入
let goteidouOu = false;

//駒を取れるか定義
let sentemotigoma = false;
let gotemotigoma = false;

//マーク
let marker = '<div style="width:30px; height:30px; background:red; border-radius:50%; margin:auto;"></div>'

let frag = false;

//駒が押された時
function onclickkoma(){
    setTimeout(() => {
        //ボタンの位置を取得する
        let buttons = document.querySelectorAll("button");//全てのbutton要素を取得→buttonsに格納
        buttons.forEach(function(button) {//全てのbutton要素に対して同じ処理(クリックされた時の処理)を順番にやっていく。buttonはbuttonsから取り出した今のボタン
            button.addEventListener("click", function() {//クリックされた時の処理を追加
                //クリックされた場所の行をC、列をLとする。
                let C = button.getAttribute("data-C");//data-Cの値を取得し、Cに代入
                let L = button.getAttribute("data-L");//data-Lの値を取得し、Lに代入
                //駒があるかどうか判定
                nest : if(movementkoma[C][L] == "歩" || movementkoma[C][L] == "香" || movementkoma[C][L] == "桂" || movementkoma[C][L] == "銀" || movementkoma[C][L] == "金" || movementkoma[C][L] == "角" || movementkoma[C][L] == "飛" || movementkoma[C][L] == "王"){
                    //先手の駒を確認
                    if(senntekoma[C][L] == "歩" || senntekoma[C][L] == "香" || senntekoma[C][L] == "桂" || senntekoma[C][L] == "銀" || senntekoma[C][L] == "金" || senntekoma[C][L] == "角" || senntekoma[C][L] == "飛" || senntekoma[C][L] == "王"){
                        //ターンを確認
                        if(sente){
                            //駒の種類を確認
                            if(senntekoma[C][L] == "歩"){//歩確認
                                //移動可能マスを確認
                                if(movementkoma[parseInt(C) + 1][L] == "　"){
                                    //移動可能マスを表示
                                    let id = String(parseInt(C) + 1) + String(L);
                                    document.getElementById(id).innerHTML = marker;
                                    //移動可能にする
                                    senteidou = true;
                                    senteidouHu = true;
                                    break nest;
                                }
                            }//歩
                            else if(senntekoma[C][L] == "香"){//香確認
                                if(movementkoma[parseInt(C) + 1][L] == "　"){//移動可能マスがあるか確認（１マス目が移動可能か確認）
                                    if(movementkoma[parseInt(C) + 2][L] == "　"){//２マス目が移動可能か確認
                                        if(movementkoma[parseInt(C) + 3][L] == "　"){//３マス目が移動可能か確認
                                            if(movementkoma[parseInt(C) + 4][L] == "　"){//４マス目が移動可能か確認
                                                if(movementkoma[parseInt(C) + 5][L] == "　"){//５マス目が移動可能か確認
                                                    if(movementkoma[parseInt(C) + 6][L] == "　"){//６マス目が移動可能か確認
                                                        if(movementkoma[parseInt(C) + 7][L] == "　"){//７マス目が移動可能か確認
                                                            if(movementkoma[parseInt(C) + 8][L] == "　"){//８マス目が移動可能か確認
                                                                //移動可能マスを表示
                                                                for(let i = 1; i < 9; i++){
                                                                    let id = String(parseInt(C) + i) + String(L);
                                                                    document.getElementById(id).innerHTML = marker;
                                                                }
                                                                //移動可能にする
                                                                senteidou = true;
                                                                senteidouKyou = 8;
                                                            }//8
                                                            else if(gotekoma[parseInt(C) + 8][L] == "歩" || gotekoma[parseInt(C) + 8][L] == "香" || gotekoma[parseInt(C) + 8][L] == "桂" || gotekoma[parseInt(C) + 8][L] == "銀" || gotekoma[parseInt(C) + 8][L] == "金" || gotekoma[parseInt(C) + 8][L] == "角" || gotekoma[parseInt(C) + 8][L] == "飛" || gotekoma[parseInt(C) + 8][L] == "王"){
                                                                //移動可能マスを表示
                                                                for(let i = 1; i < 9; i++){
                                                                    let id = String(parseInt(C) + i) + String(L);
                                                                    document.getElementById(id).innerHTML = marker;
                                                                }
                                                                //移動可能にする
                                                                senteidou = true;
                                                                senteidouKyou = 8;
                                                            }//8
                                                            else{
                                                                //移動可能マスを表示
                                                                for(let i = 1; i < 8; i++){
                                                                    let id = String(parseInt(C) + i) + String(L);
                                                                    document.getElementById(id).innerHTML = marker;
                                                                }
                                                                //移動可能にする
                                                                senteidou = true;
                                                                senteidouKyou = 7;
                                                            }//8
                                                        }//7
                                                        else if(gotekoma[parseInt(C) + 7][L] == "歩" || gotekoma[parseInt(C) + 7][L] == "香" || gotekoma[parseInt(C) + 7][L] == "桂" || gotekoma[parseInt(C) + 7][L] == "銀" || gotekoma[parseInt(C) + 7][L] == "金" || gotekoma[parseInt(C) + 7][L] == "角" || gotekoma[parseInt(C) + 7][L] == "飛" || gotekoma[parseInt(C) + 7][L] == "王"){
                                                            //移動可能マスを表示
                                                            for(let i = 1; i < 8; i++){
                                                                let id = String(parseInt(C) + i) + String(L);
                                                                document.getElementById(id).innerHTML = marker;
                                                            }
                                                            //移動可能にする
                                                            senteidou = true;
                                                            senteidouKyou = 7;
                                                        }//7
                                                        else{
                                                            //移動可能マスを表示
                                                            for(let i = 1; i < 7; i++){
                                                                let id = String(parseInt(C) + i) + String(L);
                                                                document.getElementById(id).innerHTML = marker;
                                                            }
                                                            //移動可能にする
                                                            senteidou = true;
                                                            senteidouKyou = 6;
                                                        }//7
                                                    }//6
                                                    else if(gotekoma[parseInt(C) + 6][L] == "歩" || gotekoma[parseInt(C) + 6][L] == "香" || gotekoma[parseInt(C) + 6][L] == "桂" || gotekoma[parseInt(C) + 6][L] == "銀" || gotekoma[parseInt(C) + 6][L] == "金" || gotekoma[parseInt(C) + 6][L] == "角" || gotekoma[parseInt(C) + 6][L] == "飛" || gotekoma[parseInt(C) + 6][L] == "王"){
                                                        //移動可能マスを表示
                                                        for(let i = 1; i < 7; i++){
                                                            let id = String(parseInt(C) + i) + String(L);
                                                            document.getElementById(id).innerHTML = marker;
                                                        }
                                                        //移動可能にする
                                                        senteidou = true;
                                                        senteidouKyou = 6;
                                                    }//6
                                                    else{
                                                        //移動可能マスを表示
                                                        for(let i = 1; i < 6; i++){
                                                            let id = String(parseInt(C) + i) + String(L);
                                                            document.getElementById(id).innerHTML = marker;
                                                        }
                                                        //移動可能にする
                                                        senteidou = true;
                                                        senteidouKyou = 5;
                                                    }//6
                                                }//5
                                                else if(gotekoma[parseInt(C) + 5][L] == "歩" || gotekoma[parseInt(C) + 5][L] == "香" || gotekoma[parseInt(C) + 5][L] == "桂" || gotekoma[parseInt(C) + 5][L] == "銀" || gotekoma[parseInt(C) + 5][L] == "金" || gotekoma[parseInt(C) + 5][L] == "角" || gotekoma[parseInt(C) + 5][L] == "飛" || gotekoma[parseInt(C) + 5][L] == "王"){
                                                    //移動可能マスを表示
                                                    for(let i = 1; i < 6; i++){
                                                        let id = String(parseInt(C) + i) + String(L);
                                                        document.getElementById(id).innerHTML = marker;
                                                    }
                                                    //移動可能にする
                                                    senteidou = true;
                                                    senteidouKyou = 5;
                                                }//5
                                                else{
                                                    //移動可能マスを表示
                                                    for(let i = 1; i < 5; i++){
                                                        let id = String(parseInt(C) + i) + String(L);
                                                        document.getElementById(id).innerHTML = marker;
                                                    }
                                                    //移動可能にする
                                                    senteidou = true;
                                                    senteidouKyou = 4;
                                                }//5
                                            }//4
                                            else if(gotekoma[parseInt(C) + 4][L] == "歩" || gotekoma[parseInt(C) + 4][L] == "香" || gotekoma[parseInt(C) + 4][L] == "桂" || gotekoma[parseInt(C) + 4][L] == "銀" || gotekoma[parseInt(C) + 4][L] == "金" || gotekoma[parseInt(C) + 4][L] == "角" || gotekoma[parseInt(C) + 4][L] == "飛" || gotekoma[parseInt(C) + 4][L] == "王"){
                                                //移動可能マスを表示
                                                for(let i = 1; i < 5; i++){
                                                    let id = String(parseInt(C) + i) + String(L);
                                                    document.getElementById(id).innerHTML = marker;
                                                }
                                                //移動可能にする
                                                senteidou = true;
                                                senteidouKyou = 4;
                                            }//4
                                            else{
                                                //移動可能マスを表示
                                                for(let i = 1; i < 4; i++){
                                                    let id = String(parseInt(C) + i) + String(L);
                                                    document.getElementById(id).innerHTML = marker;
                                                }
                                                //移動可能にする
                                                senteidou = true;
                                                senteidouKyou = 3;
                                            }//4
                                        }//3
                                        else if(gotekoma[parseInt(C) + 3][L] == "歩" || gotekoma[parseInt(C) + 3][L] == "香" || gotekoma[parseInt(C) + 3][L] == "桂" || gotekoma[parseInt(C) + 3][L] == "銀" || gotekoma[parseInt(C) + 3][L] == "金" || gotekoma[parseInt(C) + 3][L] == "角" || gotekoma[parseInt(C) + 3][L] == "飛" || gotekoma[parseInt(C) + 3][L] == "王"){
                                            //移動可能マスを表示
                                            for(let i = 1; i < 4; i++){
                                                let id = String(parseInt(C) + i) + String(L);
                                                document.getElementById(id).innerHTML = marker;
                                            }
                                            //移動可能にする
                                            senteidou = true;
                                            senteidouKyou = 3;
                                        }//3
                                        else{
                                            //移動可能マスを表示
                                            for(let i = 1; i < 3; i++){
                                                let id = String(parseInt(C) + i) + String(L);
                                                document.getElementById(id).innerHTML = marker;
                                            }
                                            //移動可能にする
                                            senteidou = true;
                                            senteidouKyou = 2;
                                        }//3
                                    }//2
                                    else if(gotekoma[parseInt(C) + 2][L] == "歩" || gotekoma[parseInt(C) + 2][L] == "香" || gotekoma[parseInt(C) + 2][L] == "桂" || gotekoma[parseInt(C) + 2][L] == "銀" || gotekoma[parseInt(C) + 2][L] == "金" || gotekoma[parseInt(C) + 2][L] == "角" || gotekoma[parseInt(C) + 2][L] == "飛" || gotekoma[parseInt(C) + 2][L] == "王"){
                                        //移動可能マスを表示
                                        for(let i = 1; i < 3; i++){
                                            let id = String(parseInt(C) + i) + String(L);
                                            document.getElementById(id).innerHTML = marker;
                                        }
                                        //移動可能にする
                                        senteidou = true;
                                        senteidouKyou = 2;
                                    }//2
                                    else{
                                        //移動可能マスを表示
                                            let id = String(parseInt(C) + 1) + String(L);
                                            document.getElementById(id).innerHTML = marker;
                                        //移動可能にする
                                        senteidou = true;
                                        senteidouKyou = 1;
                                    }//2
                                }//1
                            }//香
                            else if(senntekoma[C][L] == "桂"){
                                if(senntekoma[parseInt(C) + 2][parseInt(L) - 1] == "　" || senntekoma[parseInt(C) + 2][parseInt(L) + 1] == "　"){
                                    if(movementkoma[parseInt(C) + 2][parseInt(L) - 1] == "　" || movementkoma[parseInt(C) + 2][parseInt(L) + 1] == "　"){
                                        if(movementkoma[parseInt(C) + 2][parseInt(L) - 1] == "　"){
                                            //移動可能マスを表示
                                            let id = String(parseInt(C) + 2) + String(parseInt(L) - 1);
                                            document.getElementById(id).innerHTML = marker;
                                            //移動可能にする
                                            senteidou = true;
                                            senteidouKei = true;
                                        }
                                        if(movementkoma[parseInt(C) + 2][parseInt(L) + 1] == "　"){
                                            //移動可能マスを表示
                                            let id = String(parseInt(C) + 2) + String(parseInt(L) + 1);
                                            document.getElementById(id).innerHTML = marker;
                                            //移動可能にする
                                            senteidou = true;
                                            senteidouKei = true;
                                        }
                                    }
                                    else {
                                        
                                        //移動可能マスを表示
                                        
                                        //移動可能にする
                                        senteidou = true;
                                    }
                                }
                            }//桂
                            else if(senntekoma[C][L] == "銀"){
                                if(senntekoma[parseInt(C) + 1][parseInt(L) - 1] == "　" || senntekoma[parseInt(C) + 1][L] == "　" || senntekoma[parseInt(C) + 1][parseInt(L) + 1] == "　" || senntekoma[parseInt(C) - 1][parseInt(L) - 1] == "　" || senntekoma[parseInt(C) + 1][parseInt(L) + 1] == "　"){
                                    if(movementkoma[parseInt(C) + 1][parseInt(L) - 1] == "　" || movementkoma[parseInt(C) + 1][L] == "　" || movementkoma[parseInt(C) + 1][parseInt(L) + 1] == "　" || movementkoma[parseInt(C) - 1][parseInt(L) - 1] == "　" || movementkoma[parseInt(C) + 1][parseInt(L) + 1] == "　"){
                                        //移動可能マスを表示
                                        
                                        //移動可能にする
                                        senteidou = true;
                                    }
                                    else {
                                        //移動可能マスを表示
                                    
                                        //移動可能にする
                                        senteidou = true;
                                    }
                                }
                            }//銀
                            else if(senntekoma[C][L] == "金"){
                                if(senntekoma[parseInt(C) + 1][parseInt(L) - 1] == "　" || senntekoma[parseInt(C) + 1][L] == "　" || senntekoma[parseInt(C) + 1][parseInt(L) + 1] == "　" || senntekoma[C][parseInt(L) - 1] == "　" || senntekoma[C][parseInt(L) + 1] == "　" || senntekoma[parseInt(C) - 1][L] == "　"){
                                    if(movementkoma[parseInt(C) + 1][parseInt(L) - 1] == "　" || movementkoma[parseInt(C) + 1][L] == "　" || movementkoma[parseInt(C) + 1][parseInt(L) + 1] == "　" || movementkoma[C][parseInt(L) - 1] == "　" || movementkoma[C][parseInt(L) + 1] == "　" || movementkoma[parseInt(C) - 1][L] == "　"){
                                        //移動可能マスを表示
                                        
                                        //移動可能にする
                                        senteidou = true;
                                    }
                                    else{
                                        //移動可能マスを表示
                                    
                                        //移動可能にする
                                        senteidou = true;
                                    }
                                }
                            }//金
                            else if(senntekoma[C][L] == "角"){
                                if(senntekoma[parseInt(C) + 1][parseInt(L) + 1] == "　"){
                                    if(senntekoma[parseInt(C) + 2][parseInt(L) + 2] == "　"){
                                        if(senntekoma[parseInt(C) + 3][parseInt(L) + 3] == "　"){
                                            if(senntekoma[parseInt(C) + 4][parseInt(L) + 4] == "　"){
                                                if(senntekoma[parseInt(C) + 5][parseInt(L) + 5] == "　"){
                                                    if(senntekoma[parseInt(C) + 6][parseInt(L) + 6] == "　"){
                                                        if(senntekoma[parseInt(C) + 7][parseInt(L) + 7] == "　"){
                                                            if(senntekoma[parseInt(C) + 8][parseInt(L) + 8] == "　"){
                                                                //移動可能マスを表示
                                                            
                                                                //移動可能にする
                                                                senteidou = true;
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                if(senntekoma[parseInt(C) + 1][parseInt(L) - 1] == "　"){
                                    if(senntekoma[parseInt(C) + 2][parseInt(L) - 2] == "　"){
                                        if(senntekoma[parseInt(C) + 3][parseInt(L) - 3] == "　"){
                                            if(senntekoma[parseInt(C) + 4][parseInt(L) - 4] == "　"){
                                                if(senntekoma[parseInt(C) + 5][parseInt(L) - 5] == "　"){
                                                    if(senntekoma[parseInt(C) + 6][parseInt(L) - 6] == "　"){
                                                        if(senntekoma[parseInt(C) + 7][parseInt(L) - 7] == "　"){
                                                            if(senntekoma[parseInt(C) + 8][parseInt(L) - 8] == "　"){
                                                                //移動可能マスを表示
                                                            
                                                                //移動可能にする
                                                                senteidou = true;
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                if(senntekoma[parseInt(C) - 1][parseInt(L) + 1] == "　"){
                                    if(senntekoma[parseInt(C) - 2][parseInt(L) + 2] == "　"){
                                        if(senntekoma[parseInt(C) - 3][parseInt(L) + 3] == "　"){
                                            if(senntekoma[parseInt(C) - 4][parseInt(L) + 4] == "　"){
                                                if(senntekoma[parseInt(C) - 5][parseInt(L) + 5] == "　"){
                                                    if(senntekoma[parseInt(C) - 6][parseInt(L) + 6] == "　"){
                                                        if(senntekoma[parseInt(C) - 7][parseInt(L) + 7] == "　"){
                                                            if(senntekoma[parseInt(C) - 8][parseInt(L) + 8] == "　"){
                                                                //移動可能マスを表示
                                                            
                                                                //移動可能にする
                                                                senteidou = true;
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                if(senntekoma[parseInt(C) - 1][parseInt(L) - 1] == "　"){
                                    if(senntekoma[parseInt(C) - 2][parseInt(L) - 2] == "　"){
                                        if(senntekoma[parseInt(C) - 3][parseInt(L) - 3] == "　"){
                                            if(senntekoma[parseInt(C) - 4][parseInt(L) - 4] == "　"){
                                                if(senntekoma[parseInt(C) - 5][parseInt(L) - 5] == "　"){
                                                    if(senntekoma[parseInt(C) - 6][parseInt(L) - 6] == "　"){
                                                        if(senntekoma[parseInt(C) - 7][parseInt(L) - 7] == "　"){
                                                            if(senntekoma[parseInt(C) - 8][parseInt(L) - 8] == "　"){
                                                                //移動可能マスを表示
                                                            
                                                                //移動可能にする
                                                                senteidou = true;
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }//角
                            else if(senntekoma[C][L] == "飛"){
                                if(senntekoma[parseInt(C) + 1][L] == "　"){
                                    if(senntekoma[parseInt(C) + 2][L] == "　"){
                                        if(senntekoma[parseInt(C) + 3][L] == "　"){
                                            if(senntekoma[parseInt(C) + 4][L] == "　"){
                                                if(senntekoma[parseInt(C) + 5][L] == "　"){
                                                    if(senntekoma[parseInt(C) + 6][L] == "　"){
                                                        if(senntekoma[parseInt(C) + 7][L] == "　"){
                                                            if(senntekoma[parseInt(C) + 8][L] == "　"){
                                                                //移動可能マスを表示
                                    
                                                                //移動可能にする
                                                                senteidou = true;
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                if(senntekoma[parseInt(C) - 1][L] == "　"){
                                    if(senntekoma[parseInt(C) - 2][L] == "　"){
                                        if(senntekoma[parseInt(C) - 3][L] == "　"){
                                            if(senntekoma[parseInt(C) - 4][L] == "　"){
                                                if(senntekoma[parseInt(C) - 5][L] == "　"){
                                                    if(senntekoma[parseInt(C) - 6][L] == "　"){
                                                        if(senntekoma[parseInt(C) - 7][L] == "　"){
                                                            if(senntekoma[parseInt(C) - 8][L] == "　"){
                                                                //移動可能マスを表示
                                    
                                                                //移動可能にする
                                                                senteidou = true;
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                if(senntekoma[C][parseInt(L) + 1] == "　"){
                                    if(senntekoma[C][parseInt(L) + 2] == "　"){
                                        if(senntekoma[C][parseInt(L) + 3] == "　"){
                                            if(senntekoma[C][parseInt(L) + 4] == "　"){
                                                if(senntekoma[C][parseInt(L) + 5] == "　"){
                                                    if(senntekoma[C][parseInt(L) + 6] == "　"){
                                                        if(senntekoma[C][parseInt(L) + 7] == "　"){
                                                            if(senntekoma[C][parseInt(L) + 8] == "　"){
                                                                //移動可能マスを表示
                                    
                                                                //移動可能にする
                                                                senteidou = true;
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                if(senntekoma[C][parseInt(L) - 1] == "　"){
                                    if(senntekoma[C][parseInt(L) - 2] == "　"){
                                        if(senntekoma[C][parseInt(L) - 3] == "　"){
                                            if(senntekoma[C][parseInt(L) - 4] == "　"){
                                                if(senntekoma[C][parseInt(L) - 5] == "　"){
                                                    if(senntekoma[C][parseInt(L) - 6] == "　"){
                                                        if(senntekoma[C][parseInt(L) - 7] == "　"){
                                                            if(senntekoma[C][parseInt(L) - 8] == "　"){
                                                                //移動可能マスを表示
                                    
                                                                //移動可能にする
                                                                senteidou = true;
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }//飛
                            else{
                                if(senntekoma[parseInt(C) + 1][parseInt(L) - 1] == "　" || senntekoma[parseInt(C) + 1][L] == "　" || senntekoma[parseInt(C) + 1][parseInt(L) + 1] == "　" || senntekoma[C][parseInt(L) - 1] == "　" || senntekoma[C][parseInt(L) + 1] == "　" || senntekoma[parseInt(C) - 1][parseInt(L) - 1] == "　" || senntekoma[parseInt(C) - 1][L] == "　" || senntekoma[parseInt(C) - 1][parseInt(L) + 1] == "　"){
                                    if(movementkoma[parseInt(C) + 1][parseInt(L) - 1] == "　" || movementkoma[parseInt(C) + 1][L] == "　" || movementkoma[parseInt(C) + 1][parseInt(L) + 1] == "　" || movementkoma[C][parseInt(L) - 1] == "　" || movementkoma[C][parseInt(L) + 1] == "　" || movementkoma[parseInt(C) - 1][parseInt(L) - 1] == "　" || movementkoma[parseInt(C) - 1][L] == "　" || movementkoma[parseInt(C) - 1][parseInt(L) + 1] == "　"){
                                        //移動可能マスを表示
                                        
                                        //移動可能にする
                                        senteidou = true;
                                    }
                                    else{
                                        //移動可能マスを表示
                                    
                                        //移動可能にする
                                        senteidou = true;
                                    }
                                }
                            }//王
                        }
                    }    
                    //後手の駒を確認
                    if(gotekoma[C][L] == "歩" || gotekoma[C][L] == "香" || gotekoma[C][L] == "桂" || gotekoma[C][L] == "銀" || gotekoma[C][L] == "金" || gotekoma[C][L] == "角" || gotekoma[C][L] == "飛" || gotekoma[C][L] == "王"){
                        //ターンを確認
                        if(gote){
                            if(gotekoma[C][L] == "歩"){//歩確認
                                //移動可能マスを確認
                                if(gotekoma[parseInt(C) - 1][L] == "　"){
                                    //移動可能マスを表示
                                    let id = String(parseInt(C) - 1) + String(L);
                                    document.getElementById(id).innerHTML = marker;
                                    //移動可能にする
                                    goteidou = true;
                                    goteidouHu = true;
                                }
                            }//歩
                            else if(gotekoma[C][L] == "香"){
                                if(movementkoma[parseInt(C) - 1][L] == "　"){//移動可能マスがあるか確認（１マス目が移動可能か確認）
                                    if(movementkoma[parseInt(C) - 2][L] == "　"){//２マス目が移動可能か確認
                                        if(movementkoma[parseInt(C) - 3][L] == "　"){//３マス目が移動可能か確認
                                            if(movementkoma[parseInt(C) - 4][L] == "　"){//４マス目が移動可能か確認
                                                if(movementkoma[parseInt(C) - 5][L] == "　"){//５マス目が移動可能か確認
                                                    if(movementkoma[parseInt(C) - 6][L] == "　"){//６マス目が移動可能か確認
                                                        if(movementkoma[parseInt(C) - 7][L] == "　"){//７マス目が移動可能か確認
                                                            if(movementkoma[parseInt(C) - 8][L] == "　"){//８マス目が移動可能か確認
                                                                //移動可能マスを表示
                                                                console.log("８マス移動可能");
                                                                //移動可能にする
                                                                senteidou = true;
                                                            }//8
                                                            else if(senntekoma[parseInt(C) - 8][L] == "歩" || senntekoma[parseInt(C) - 8][L] == "香" || senntekoma[parseInt(C) - 8][L] == "桂" || senntekoma[parseInt(C) - 8][L] == "銀" || senntekoma[parseInt(C) - 8][L] == "金" || senntekoma[parseInt(C) - 8][L] == "角" || senntekoma[parseInt(C) - 8][L] == "飛" || senntekoma[parseInt(C) - 8][L] == "王"){
                                                                //移動可能マスを表示
                                                                console.log("8マス移動可能");
                                                                //移動可能にする
                                                                senteidou = true;
                                                            }//8
                                                            else{
                                                                //移動可能マスを表示
                                                                console.log("7マス移動可能");
                                                                //移動可能にする
                                                                senteidou = true;
                                                            }//8
                                                        }//7
                                                        else if(senntekoma[parseInt(C) - 7][L] == "歩" || senntekoma[parseInt(C) - 7][L] == "香" || senntekoma[parseInt(C) - 7][L] == "桂" || senntekoma[parseInt(C) - 7][L] == "銀" || senntekoma[parseInt(C) - 7][L] == "金" || senntekoma[parseInt(C) - 7][L] == "角" || senntekoma[parseInt(C) - 7][L] == "飛" || senntekoma[parseInt(C) - 7][L] == "王"){
                                                            //移動可能マスを表示
                                                            console.log("7マス移動可能");
                                                            //移動可能にする
                                                            senteidou = true;
                                                        }//7
                                                        else{
                                                            //移動可能マスを表示
                                                            console.log("6マス移動可能");
                                                            //移動可能にする
                                                            senteidou = true;
                                                        }//7
                                                    }//6
                                                    else if(senntekoma[parseInt(C) - 6][L] == "歩" || senntekoma[parseInt(C) - 6][L] == "香" || senntekoma[parseInt(C) - 6][L] == "桂" || senntekoma[parseInt(C) - 6][L] == "銀" || senntekoma[parseInt(C) - 6][L] == "金" || senntekoma[parseInt(C) - 6][L] == "角" || senntekoma[parseInt(C) - 6][L] == "飛" || senntekoma[parseInt(C) - 6][L] == "王"){
                                                        //移動可能マスを表示
                                                        console.log("6マス移動可能");
                                                        //移動可能にする
                                                        senteidou = true;
                                                    }//6
                                                    else{
                                                        //移動可能マスを表示
                                                        console.log("5マス移動可能");
                                                        //移動可能にする
                                                        senteidou = true;
                                                    }//6
                                                }//5
                                                else if(senntekoma[parseInt(C) - 5][L] == "歩" || senntekoma[parseInt(C) - 5][L] == "香" || senntekoma[parseInt(C) - 5][L] == "桂" || senntekoma[parseInt(C) - 5][L] == "銀" || senntekoma[parseInt(C) - 5][L] == "金" || senntekoma[parseInt(C) - 5][L] == "角" || senntekoma[parseInt(C) - 5][L] == "飛" || senntekoma[parseInt(C) - 5][L] == "王"){
                                                    //移動可能マスを表示
                                                    console.log("5マス移動可能");
                                                    //移動可能にする
                                                    senteidou = true;
                                                }//5
                                                else{
                                                    //移動可能マスを表示
                                                    console.log("4マス移動可能");
                                                    //移動可能にする
                                                    senteidou = true;
                                                }//5
                                            }//4
                                            else if(senntekoma[parseInt(C) - 4][L] == "歩" || senntekoma[parseInt(C) - 4][L] == "香" || senntekoma[parseInt(C) - 4][L] == "桂" || senntekoma[parseInt(C) - 4][L] == "銀" || senntekoma[parseInt(C) - 4][L] == "金" || senntekoma[parseInt(C) - 4][L] == "角" || senntekoma[parseInt(C) - 4][L] == "飛" || senntekoma[parseInt(C) - 4][L] == "王"){
                                                //移動可能マスを表示
                                                console.log("4マス移動可能");
                                                //移動可能にする
                                                senteidou = true;
                                            }//4
                                            else{
                                                //移動可能マスを表示
                                                console.log("3マス移動可能");
                                                //移動可能にする
                                                senteidou = true;
                                            }//4
                                        }//3
                                        else if(senntekoma[parseInt(C) - 3][L] == "歩" || senntekoma[parseInt(C) - 3][L] == "香" || senntekoma[parseInt(C) - 3][L] == "桂" || senntekoma[parseInt(C) - 3][L] == "銀" || senntekoma[parseInt(C) - 3][L] == "金" || senntekoma[parseInt(C) - 3][L] == "角" || senntekoma[parseInt(C) - 3][L] == "飛" || senntekoma[parseInt(C) - 3][L] == "王"){
                                            //移動可能マスを表示
                                            console.log("3マス移動可能");
                                            //移動可能にする
                                            senteidou = true;
                                        }//3
                                        else{
                                            //移動可能マスを表示
                                            console.log("2マス移動可能");
                                            //移動可能にする
                                            senteidou = true;
                                        }//3
                                    }//2
                                    else if(senntekoma[parseInt(C) - 2][L] == "歩" || senntekoma[parseInt(C) - 2][L] == "香" || senntekoma[parseInt(C) - 2][L] == "桂" || senntekoma[parseInt(C) - 2][L] == "銀" || senntekoma[parseInt(C) - 2][L] == "金" || senntekoma[parseInt(C) - 2][L] == "角" || senntekoma[parseInt(C) - 2][L] == "飛" || senntekoma[parseInt(C) - 2][L] == "王"){
                                        //移動可能マスを表示
                                        console.log("２マス移動可能");
                                        //移動可能にする
                                        senteidou = true;
                                    }//2
                                    else{
                                        //移動可能マスを表示
                                        console.log("1マス移動可能");
                                        //移動可能にする
                                        senteidou = true;
                                    }//2
                                }//1
                            }
                            else if(gotekoma[C][L] == "桂"){
                                if(senntekoma[parseInt(C) - 2][parseInt(L) - 1] == "　" || senntekoma[parseInt(C) - 2][parseInt(L) + 1] == "　"){
                                    if(movementkoma[parseInt(C) - 2][parseInt(L) - 1] == "　" || movementkoma[parseInt(C) - 2][parseInt(L) + 1] == "　"){
                                        //移動可能マスを表示
                                        
                                        //移動可能にする
                                        senteidou = true;
                                    }
                                    else {
                                        //移動可能マスを表示
                                        
                                        //移動可能にする
                                        senteidou = true;
                                    }
                                }
                            }//桂
                            else if(gotekoma[C][L] == "銀"){
                                if(senntekoma[parseInt(C) - 1][parseInt(L) - 1] == "　" || senntekoma[parseInt(C) - 1][L] == "　" || senntekoma[parseInt(C) - 1][parseInt(L) + 1] == "　" || senntekoma[parseInt(C) + 1][parseInt(L) - 1] == "　" || senntekoma[parseInt(C) + 1][parseInt(L) + 1] == "　"){
                                    if(movementkoma[parseInt(C) - 1][parseInt(L) - 1] == "　" || movementkoma[parseInt(C) - 1][L] == "　" || movementkoma[parseInt(C) - 1][parseInt(L) + 1] == "　" || movementkoma[parseInt(C) + 1][parseInt(L) - 1] == "　" || movementkoma[parseInt(C) + 1][parseInt(L) + 1] == "　"){
                                        //移動可能マスを表示
                                        
                                        //移動可能にする
                                        senteidou = true;
                                    }
                                    else {
                                        //移動可能マスを表示
                                    
                                        //移動可能にする
                                        senteidou = true;
                                    }
                                }
                            }
                            else if(gotekoma[C][L] == "金"){
                                if(senntekoma[parseInt(C) - 1][parseInt(L) - 1] == "　" || senntekoma[parseInt(C) - 1][L] == "　" || senntekoma[parseInt(C) - 1][parseInt(L) + 1] == "　" || senntekoma[C][parseInt(L) - 1] == "　" || senntekoma[C][parseInt(L) + 1] == "　" || senntekoma[parseInt(C) + 1][L] == "　"){
                                    if(movementkoma[parseInt(C) - 1][parseInt(L) - 1] == "　" || movementkoma[parseInt(C) - 1][L] == "　" || movementkoma[parseInt(C) - 1][parseInt(L) + 1] == "　" || movementkoma[C][parseInt(L) - 1] == "　" || movementkoma[C][parseInt(L) + 1] == "　" || movementkoma[parseInt(C) + 1][L] == "　"){
                                        //移動可能マスを表示
                                        
                                        //移動可能にする
                                        senteidou = true;
                                    }
                                    else{
                                        //移動可能マスを表示
                                    
                                        //移動可能にする
                                        senteidou = true;
                                    }
                                }
                            }//金
                            else if(gotekoma[C][L] == "角"){
                                if(senntekoma[parseInt(C) + 1][parseInt(L) + 1] == "　"){
                                    if(senntekoma[parseInt(C) + 2][parseInt(L) + 2] == "　"){
                                        if(senntekoma[parseInt(C) + 3][parseInt(L) + 3] == "　"){
                                            if(senntekoma[parseInt(C) + 4][parseInt(L) + 4] == "　"){
                                                if(senntekoma[parseInt(C) + 5][parseInt(L) + 5] == "　"){
                                                    if(senntekoma[parseInt(C) + 6][parseInt(L) + 6] == "　"){
                                                        if(senntekoma[parseInt(C) + 7][parseInt(L) + 7] == "　"){
                                                            if(senntekoma[parseInt(C) + 8][parseInt(L) + 8] == "　"){
                                                                //移動可能マスを表示
                                                            
                                                                //移動可能にする
                                                                senteidou = true;
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                if(senntekoma[parseInt(C) + 1][parseInt(L) - 1] == "　"){
                                    if(senntekoma[parseInt(C) + 2][parseInt(L) - 2] == "　"){
                                        if(senntekoma[parseInt(C) + 3][parseInt(L) - 3] == "　"){
                                            if(senntekoma[parseInt(C) + 4][parseInt(L) - 4] == "　"){
                                                if(senntekoma[parseInt(C) + 5][parseInt(L) - 5] == "　"){
                                                    if(senntekoma[parseInt(C) + 6][parseInt(L) - 6] == "　"){
                                                        if(senntekoma[parseInt(C) + 7][parseInt(L) - 7] == "　"){
                                                            if(senntekoma[parseInt(C) + 8][parseInt(L) - 8] == "　"){
                                                                //移動可能マスを表示
                                                            
                                                                //移動可能にする
                                                                senteidou = true;
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                if(senntekoma[parseInt(C) - 1][parseInt(L) + 1] == "　"){
                                    if(senntekoma[parseInt(C) - 2][parseInt(L) + 2] == "　"){
                                        if(senntekoma[parseInt(C) - 3][parseInt(L) + 3] == "　"){
                                            if(senntekoma[parseInt(C) - 4][parseInt(L) + 4] == "　"){
                                                if(senntekoma[parseInt(C) - 5][parseInt(L) + 5] == "　"){
                                                    if(senntekoma[parseInt(C) - 6][parseInt(L) + 6] == "　"){
                                                        if(senntekoma[parseInt(C) - 7][parseInt(L) + 7] == "　"){
                                                            if(senntekoma[parseInt(C) - 8][parseInt(L) + 8] == "　"){
                                                                //移動可能マスを表示
                                                            
                                                                //移動可能にする
                                                                senteidou = true;
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                if(senntekoma[parseInt(C) - 1][parseInt(L) - 1] == "　"){
                                    if(senntekoma[parseInt(C) - 2][parseInt(L) - 2] == "　"){
                                        if(senntekoma[parseInt(C) - 3][parseInt(L) - 3] == "　"){
                                            if(senntekoma[parseInt(C) - 4][parseInt(L) - 4] == "　"){
                                                if(senntekoma[parseInt(C) - 5][parseInt(L) - 5] == "　"){
                                                    if(senntekoma[parseInt(C) - 6][parseInt(L) - 6] == "　"){
                                                        if(senntekoma[parseInt(C) - 7][parseInt(L) - 7] == "　"){
                                                            if(senntekoma[parseInt(C) - 8][parseInt(L) - 8] == "　"){
                                                                //移動可能マスを表示
                                                            
                                                                //移動可能にする
                                                                senteidou = true;
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }//角
                            else if(gotekoma[C][L] == "飛"){
                                if(senntekoma[parseInt(C) + 1][L] == "　"){
                                    if(senntekoma[parseInt(C) + 2][L] == "　"){
                                        if(senntekoma[parseInt(C) + 3][L] == "　"){
                                            if(senntekoma[parseInt(C) + 4][L] == "　"){
                                                if(senntekoma[parseInt(C) + 5][L] == "　"){
                                                    if(senntekoma[parseInt(C) + 6][L] == "　"){
                                                        if(senntekoma[parseInt(C) + 7][L] == "　"){
                                                            if(senntekoma[parseInt(C) + 8][L] == "　"){
                                                                //移動可能マスを表示
                                    
                                                                //移動可能にする
                                                                senteidou = true;
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                if(senntekoma[parseInt(C) - 1][L] == "　"){
                                    if(senntekoma[parseInt(C) - 2][L] == "　"){
                                        if(senntekoma[parseInt(C) - 3][L] == "　"){
                                            if(senntekoma[parseInt(C) - 4][L] == "　"){
                                                if(senntekoma[parseInt(C) - 5][L] == "　"){
                                                    if(senntekoma[parseInt(C) - 6][L] == "　"){
                                                        if(senntekoma[parseInt(C) - 7][L] == "　"){
                                                            if(senntekoma[parseInt(C) - 8][L] == "　"){
                                                                //移動可能マスを表示
                                    
                                                                //移動可能にする
                                                                senteidou = true;
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                if(senntekoma[C][parseInt(L) + 1] == "　"){
                                    if(senntekoma[C][parseInt(L) + 2] == "　"){
                                        if(senntekoma[C][parseInt(L) + 3] == "　"){
                                            if(senntekoma[C][parseInt(L) + 4] == "　"){
                                                if(senntekoma[C][parseInt(L) + 5] == "　"){
                                                    if(senntekoma[C][parseInt(L) + 6] == "　"){
                                                        if(senntekoma[C][parseInt(L) + 7] == "　"){
                                                            if(senntekoma[C][parseInt(L) + 8] == "　"){
                                                                //移動可能マスを表示
                                    
                                                                //移動可能にする
                                                                senteidou = true;
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                if(senntekoma[C][parseInt(L) - 1] == "　"){
                                    if(senntekoma[C][parseInt(L) - 2] == "　"){
                                        if(senntekoma[C][parseInt(L) - 3] == "　"){
                                            if(senntekoma[C][parseInt(L) - 4] == "　"){
                                                if(senntekoma[C][parseInt(L) - 5] == "　"){
                                                    if(senntekoma[C][parseInt(L) - 6] == "　"){
                                                        if(senntekoma[C][parseInt(L) - 7] == "　"){
                                                            if(senntekoma[C][parseInt(L) - 8] == "　"){
                                                                //移動可能マスを表示
                                    
                                                                //移動可能にする
                                                                senteidou = true;
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            else{
                                if(senntekoma[parseInt(C) + 1][parseInt(L) - 1] == "　" || senntekoma[parseInt(C) + 1][L] == "　" || senntekoma[parseInt(C) + 1][parseInt(L) + 1] == "　" || senntekoma[C][parseInt(L) - 1] == "　" || senntekoma[C][parseInt(L) + 1] == "　" || senntekoma[parseInt(C) - 1][parseInt(L) - 1] == "　" || senntekoma[parseInt(C) - 1][L] == "　" || senntekoma[parseInt(C) - 1][parseInt(L) + 1] == "　"){
                                    if(movementkoma[parseInt(C) + 1][parseInt(L) - 1] == "　" || movementkoma[parseInt(C) + 1][L] == "　" || movementkoma[parseInt(C) + 1][parseInt(L) + 1] == "　" || movementkoma[C][parseInt(L) - 1] == "　" || movementkoma[C][parseInt(L) + 1] == "　" || movementkoma[parseInt(C) - 1][parseInt(L) - 1] == "　" || movementkoma[parseInt(C) - 1][L] == "　" || movementkoma[parseInt(C) - 1][parseInt(L) + 1] == "　"){
                                        //移動可能マスを表示
                                        
                                        //移動可能にする
                                        senteidou = true;
                                    }
                                    else{
                                        //移動可能マスを表示
                                    
                                        //移動可能にする
                                        senteidou = true;
                                    }
                                }
                            }
                        }
                    }
                }
                else{//駒を押さなかった時
                    //移動不可にする
                    senteidou = false;
                    senteidouHu = false;
                    senteidouKyou = false;
                    senteidouKei = false;
                    senteidouGin = false;
                    senteidouKin = false;
                    senteidouKaku = false;
                    senteidouHisya = false;
                    senteidouOu = false;

                    goteidou = false;
                    goteidouHu = false;
                    goteidouKyou = false;
                    goteidouKei = false;
                    goteidouGin = false;
                    goteidouKin = false;
                    goteidouKaku = false;
                    goteidouHisya = false;
                    goteidouOu = false;
                    //マーカーを消すために再描画
                    for(let i = 0; i < 9; i++){
                        for(let j = 0; j < 9; j++){
                            let id = String(i) + String(j);
                            let movement = movementkoma[i][j];
                            document.getElementById(id).innerHTML = movement;
                        }
                    }
                }
            });
        });
    }, 1);
}

//移動可能マスが押された時
function idoukoma(){
    //ボタンの位置を取得する
    let buttons = document.querySelectorAll("button");
    buttons.forEach(function(button) {
        button.addEventListener("click", function() {
            //クリックされた場所の行をC、列をLとする。
            let C = button.getAttribute("data-C");
            let L = button.getAttribute("data-L");
            //移動可能か判定
            if(senteidou){
                if(senteidouHu){
                    if(senntekoma[C][L] == "　" && senntekoma[parseInt(C) - 1][L] == "歩"){
                        //移動
                        movementkoma[parseInt(C) - 1][L] = "　";
                        movementkoma[C][L] = "歩";
                        senntekoma[parseInt(C) - 1][L] = "　";
                        senntekoma[C][L] = "歩";
                        //移動不可に設定
                        senteidou = false;
                        senteidouHu = false;
                        //ターンを移す
                        sente = false;
                        gote = true;
                        //再描画
                        for(let i = 0; i < 9; i++){
                            for(let j = 0; j < 9; j++){
                                let id = String(i) + String(j);
                                let movement = movementkoma[i][j];
                                document.getElementById(id).innerHTML = movement;
                            }
                        }
                    }
                }
                else if(movementkoma[parseInt(C) - 1][L] == "香" || movementkoma[parseInt(C) - 2][L] == "香" || movementkoma[parseInt(C) - 3][L] == "香" || movementkoma[parseInt(C) - 4][L] == "香" || movementkoma[parseInt(C) - 5][L] == "香" || movementkoma[parseInt(C) - 6][L] == "香" || movementkoma[parseInt(C) - 7][L] == "香" || movementkoma[parseInt(C) - 8][L] == "香"){
                    if(senteidouKyou){
                        for(let k = 1; k < 9; k++){
                            if(senntekoma[C][L] == "　" && senntekoma[parseInt(C) - k][L] == "香"){
                                //移動
                                movementkoma[parseInt(C) - k][L] = "　";
                                movementkoma[C][L] = "香";
                                senntekoma[parseInt(C) - k][L] = "　";
                                senntekoma[C][L] = "香";
                                //移動不可に設定
                                senteidou = false;
                                senteidouKyou = false;
                                //ターンを移す
                                sente = false;
                                gote = true;
                                //再描画
                                for(let i = 0; i < 9; i++){
                                    for(let j = 0; j < 9; j++){
                                        let id = String(i) + String(j);
                                        let movement = movementkoma[i][j];
                                        document.getElementById(id).innerHTML = movement;
                                    }
                                }
                                break;
                            }
                        }
                    }
                    
                }
                else if(movementkoma[parseInt(C) - 2][parseInt(L) - 1] == "桂" || movementkoma[parseInt(C) - 2][parseInt(L) + 1]){
                    if(senteidouKei){
                        if(senntekoma[C][L] == "　" && senntekoma[parseInt(C) - 2][parseInt(L) - 1] == "桂"){
                            //移動
                            movementkoma[parseInt(C) - 2][parseInt(L) - 1] = "　";
                            movementkoma[C][L] = "桂";
                            senntekoma[parseInt(C) - 2][parseInt(L) - 1] = "　";
                            senntekoma[C][L] = "桂";
                            //移動不可に設定
                            senteidou = false;
                            senteidouKei = false;
                            //ターンを移す
                            sente = false;
                            gote = true;
                            //再描画
                            for(let i = 0; i < 9; i++){
                                for(let j = 0; j < 9; j++){
                                    let id = String(i) + String(j);
                                    let movement = movementkoma[i][j];
                                    document.getElementById(id).innerHTML = movement;
                                }
                            }
                        }
                        if(senntekoma[C][L] == "　" && senntekoma[parseInt(C) - 2][parseInt(L) + 1] == "桂"){
                            //移動
                            movementkoma[parseInt(C) - 2][parseInt(L) + 1] = "　";
                            movementkoma[C][L] = "桂";
                            senntekoma[parseInt(C) - 2][parseInt(L) + 1] = "　";
                            senntekoma[C][L] = "桂";
                            //移動不可に設定
                            senteidou = false;
                            senteidouKei = false;
                            //ターンを移す
                            sente = false;
                            gote = true;
                            //再描画
                            for(let i = 0; i < 9; i++){
                                for(let j = 0; j < 9; j++){
                                    let id = String(i) + String(j);
                                    let movement = movementkoma[i][j];
                                    document.getElementById(id).innerHTML = movement;
                                }
                            }
                        }
                    } 
                }
                else if(movementkoma[C][L] == "銀"){
                    if(senteidouGin){
                        if(senntekoma[C][L] == "　" && senntekoma[parseInt(C) - 1][parseInt(L) - 1]){

                        }
                    }
                }
                else if(movementkoma[C][L] == "金"){
                    
                }
                else if(movementkoma[C][L] == "角"){
                    
                }
                else if(movementkoma[C][L] == "飛"){
                    
                }
                else{
                    
                }
            }
            //移動可能か判定
            if(goteidou){
                if(goteidouHu){
                    if(gotekoma[C][L] == "　" && gotekoma[parseInt(C) + 1][L] == "歩"){
                        //移動
                        movementkoma[parseInt(C) + 1][L] = "　";
                        movementkoma[C][L] = "歩";
                        gotekoma[parseInt(C) + 1][L] = "　";
                        gotekoma[C][L] = "歩";
                        //移動不可に設定
                        senteidou = false;
                        senteidouHu = false;
                        //ターンを移す
                        sente = true;
                        gote = false;
                        //再描画
                        for(let i = 0; i < 9; i++){
                            for(let j = 0; j < 9; j++){
                                let id = String(i) + String(j);
                                let movement = movementkoma[i][j];
                                document.getElementById(id).innerHTML = movement;
                            }
                        }
                    }
                }
                
                else if(movementkoma[C][L] == "香"){
                    
                }
                else if(movementkoma[C][L] == "桂"){
                    
                }
                else if(movementkoma[C][L] == "銀"){
                    
                }
                else if(movementkoma[C][L] == "金"){
                    
                }
                else if(movementkoma[C][L] == "角"){
                    
                }
                else if(movementkoma[C][L] == "飛"){
                    
                }
                else{
                    
                }
            }
        });
    });
}

//駒の描画
for(let i = 0; i < 9; i++){
    for(let j = 0; j < 9; j++){
        let id = String(i) + String(j);
        let movement = syokikoma[i][j];
        document.getElementById(id).innerHTML = movement;
    }
}

//駒の再描画
    for(let i = 0; i < 9; i++){
        for(let j = 0; j < 9; j++){
            let id = String(i) + String(j);
            let movement = movementkoma[i][j];
            document.getElementById(id).innerHTML = movement;
        }
    }

//マーカーの表示
let id = String(parseInt(C) + 1) + String(L);
document.getElementById(id).innerHTML = marker;