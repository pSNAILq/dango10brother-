// This is a JavaScript file
var DANGO_SIZE = 30;
var BOARD_HEIGHT = 15;
var BOARD_WIDTH = 10;
var WALL_MARJIN = 2;
var MINO_AREA = 4;
var currentX = 5;
var currentY = 10;

var time = 60;
var ptime = 0;
var dango_num = 0;

/*タイマー関係*/
var rap = 0;
var dango_timer = 0;

/*みの関係 */
var topMino = 0;
var botMino = 0;
var rightMino = 0;
var leftMino = 0;

var nextMinoType = 0;

var board = new Array(BOARD_HEIGHT);

var nextBoard = new Array(MINO_AREA);


var debug1 = "";
var debug2 = "";
var debug3 = "";
var debug4 = 0;
var debug6 = 0;

var OperationType = {
  None: 0,
  Hold: 1,
  HardDrop: 2,
  Right: 3,
  Left: 4,
  Rotate: 5,
};


var MinoType = {
  Imino: 0,
  Omino: 1,
  Smino: 2,
  Zmino: 3,
  Jmino: 4,
  Lmino: 5,
  Tmino: 6
};

var MinoShapes = {

};

var DangoType = {
  Mitarashi: 1,
  Sakura: 2,
  Yomogi: 3,
  Shiro: 4,
  Kosian: 5,
  Kibi: 6,
  Kinako: 7,
  Goma: 8
};

var BoardType = {
  Wall: 99,
  Free: 0,
  Dango: 1
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  init();
}

function draw() {
  background(255);

  if(0<time){
    playGame();

  }else{
    gameOver();
  }
  dango_timer = millis() - rap;
  if (dango_timer > 100) {
    debug4++;
    time--;
    rap = millis();
  }

  // debug1 = Math.floor((mouseX-5)/DANGO_SIZE);

  // board[currentY][currentX]=BoardType.Dango;

}

function gameOver(){
  overUI();


}

function playGame(){
  
  field();
  playUI();
  // operation();
  viewNextMino();
  moveMino();
  setMino();

}

function setMino(){
    //設置
  if (mouseIsPressed && canLanding()) {
    landing();
    shipping();
    nextMino();
  }
}
function debug() {
  text(debug1, 10, 50);
  text(debug2, 30, 20);
  // text(mouseX, 120, 20);
  text(debug3, 170, 20);
  text('y' + currentY, 170, 50);
  text('x' + currentX, 170, 60);
  text('a' + debug6, 250, 60);

}

//ボードの初期化
function init() {
  // ボードの初期化
  for (y = 0; y < BOARD_HEIGHT + WALL_MARJIN; y++) {
    board[y] = [
      BoardType.Wall, BoardType.Free, BoardType.Free, BoardType.Free, BoardType.Free, BoardType.Free, BoardType.Free, BoardType.Free, BoardType.Free, BoardType.Free, BoardType.Free, BoardType.Wall
    ];
    if (y == 0 || y == BOARD_HEIGHT + WALL_MARJIN - 1) {
      board[y] = [
        BoardType.Wall, BoardType.Wall, BoardType.Wall, BoardType.Wall, BoardType.Wall, BoardType.Wall, BoardType.Wall, BoardType.Wall, BoardType.Wall, BoardType.Wall, BoardType.Wall, BoardType.Wall
      ];
    }
  }
  currentX = 6;
  currentY = 1;
  nextMino();

}

function nextMino() {
  for (y = 0; y < MINO_AREA; y++) {
    nextBoard[y] = new Array(MINO_AREA).fill(0);
  }
  debug2 = Math.round(random() * 10) % 7;
  nextMinoType = Math.round(random() * 10) % 7;
  switch (nextMinoType) {
    case 0:
      nextBoard =
        [
          [0, 1, 0, 0],
          [0, 1, 0, 0],
          [0, 1, 0, 0],
          [0, 1, 0, 0]
        ];
      break;
    case 1:
      nextBoard =
        [
          [0, 0, 0, 0],
          [0, 1, 1, 0],
          [0, 1, 1, 0],
          [0, 0, 0, 0]
        ];

      break;
    case 2:
      nextBoard =
        [
          [0, 0, 0, 0],
          [0, 1, 0, 0],
          [0, 1, 1, 0],
          [0, 0, 1, 0]
        ];
      break;
    case 3:
      nextBoard =
        [
          [0, 0, 0, 0],
          [0, 0, 1, 0],
          [0, 1, 1, 0],
          [0, 1, 0, 0]
        ];
      break;
    case 4:
      nextBoard =
        [
          [0, 0, 0, 0],
          [0, 1, 1, 0],
          [0, 1, 0, 0],
          [0, 1, 0, 0]
        ];
      break;
    case 5:
      nextBoard =
        [
          [0, 0, 0, 0],
          [0, 1, 1, 0],
          [0, 0, 1, 0],
          [0, 0, 1, 0]
        ];
      break;
    case 6:
      nextBoard =
        [
          [0, 0, 0, 0],
          [0, 1, 0, 0],
          [0, 1, 1, 0],
          [0, 1, 0, 0]
        ];
      break;

  }

}
function touchMoved() {

  //ドラッグかスワイプ
  if (touchY - ptouchY < -50) {
    log("aa");
  }

}

//ミノが動く
function moveMino() {

  tempY = Math.floor((mouseY - 65) / DANGO_SIZE);
  tempX = Math.floor((mouseX - 5) / DANGO_SIZE);
  if (0 <= tempX && tempX <= BOARD_WIDTH) {
    currentX = tempX;
  }
  if (0 <= tempY && tempY <= BOARD_HEIGHT) {
    currentY = tempY;
  }

}

//右端を取得
function getRight() {
  var x, y;
  for (x = MINO_AREA - 1; 0 < x; x--) {
    for (y = 0; y < MINO_AREA; y++) {
      if (nextBoard[y][x] == 1) {
        rightMino = x;
      }
    }

  }
}


// //入力受付
//  function operation() {
//   /* 操作 */
//   if (mouseIsPressed && 65 < mouseY && mouseY < 720) {
//     if (mouseY - pmouseX > 400) {
//       debug2 = "hard";
//       //ハードドロップ
//       return OperationType.HardDrop;

//     } else if (mouseY - pmouseY < -100) {
//       //ホールド
//       debug2 = "hold";
//       return OperationType.Hold;

//     } else if (mouseX - pmouseX > 40) {
//       //右
//       debug2 = "migi";
//       moveRight();
//       return OperationType.Right;

//     } else if (mouseX - pmouseX < -40) {
//       //左
//       debug2 = "hidari";
//       moveLeft();
//       return OperationType.Left;
//     }
//   } else if (mouseIsPressed && 740 < mouseY && mouseY < 800) {
//     debug2 = "rotate";
//     return OperationType.Rotate;
//   }
//   return OperationType.None;
// }


// function hardDrop() {

//   if (mouseIsPressed) {
//     debug1 = mouseX - pmouseX;
//   }
// }

// function moveRight() {
//   currentX ++;

// }

// function moveLeft() {
//   currentX --;
// }

// function hold() {

// }


/* UI の表示*/
function playUI() {
  fill('rgba(0,255,0, 0.25)');
  textAlign(CENTER);
  textSize(40);
  text(time+"秒", (windowWidth / 2), 45);
  textSize(30);
  textAlign(CENTER, RIGHT);
  text(dango_num, 50, 45);
  textAlign(LEFT);
  textSize(24);
  text("串", 100, 45);



}

function overUI(){
  fill(0);
  textAlign(CENTER,CENTER);
  
  textSize(30);
  text("今回の団子出荷量は…",width/2,height/2-200);
  textSize(50);
  text(dango_num+"\t本",width/2,height/2);
}

//団子を出荷する
function shipping() {
  var xflag = new Array(BOARD_HEIGHT).fill(1);
  var yflag = new Array(BOARD_WIDTH).fill(1);
  var x, y;
  for (y = 1; y < BOARD_HEIGHT + WALL_MARJIN - 1; y++) {
    for (x = 1; x < BOARD_WIDTH + WALL_MARJIN - 1; x++) {
      if (board[y][x] == BoardType.Dango) {
        xflag[y] *= 1;
        yflag[x] *= 1;
      } else {
        xflag[y] *= 0;
        yflag[x] *= 0;
      }
    }
  }
  for (y = 1; y < BOARD_HEIGHT + WALL_MARJIN - 1; y++) {
    if (xflag[y] == 1) {
      for (x = 1; x < BOARD_WIDTH + WALL_MARJIN - 1; x++) {
        board[y][x] = BoardType.Free;
        dango_num++;
      }
    }

  }
  for (x = 1; x < BOARD_WIDTH + WALL_MARJIN - 1; x++) {
    if (yflag[x] == 1) {
      for (y = 1; y < BOARD_HEIGHT + WALL_MARJIN - 1; y++) {
        board[y][x] = BoardType.Free;
        dango_num++;
      }
    }
  }
}

//次のミノを表示する
function viewNextMino() {
  var y_, x_;
  for (y = 0; y < MINO_AREA; y++) {
    for (x = 0; x < MINO_AREA; x++) {
      if (nextBoard[y][x] == 1) {
        rect(x * DANGO_SIZE + 20 + (currentX * DANGO_SIZE), y * DANGO_SIZE + 80 + (currentY * DANGO_SIZE), DANGO_SIZE, DANGO_SIZE);
      }

    }
  }

}

/*ミノの着地 */
function landing() {
  var y__, x__;
  for (y__ = 0; y__ < MINO_AREA; y__++) {
    for (x__ = 0; x__ < MINO_AREA; x__++) {
      if (nextBoard[y__][x__] == 1) {
        board[y__ + currentY][x__ + currentX] = BoardType.Dango;
      }
    }
  }
}
function canLanding() {
  var y, x;
  for (y = 0; y < MINO_AREA; y++) {
    for (x = 0; x < MINO_AREA; x++) {
      if (nextBoard[y][x] == 1) {
        if (board[y + currentY][x + currentX] != BoardType.Free) {
          return 0;
        }
      }
    }
  }
  return 1;

}



function calcMino() {
  for (y = 0; y < MINO_AREA; y++) {
    for (x = 0; x < MINO_AREA; x++) {
      if (nextBoard[y][x] == 1) {
        rect(x * DANGO_SIZE + 20 + (currentX * DANGO_SIZE), y * DANGO_SIZE + 80 + (currentY * DANGO_SIZE), DANGO_SIZE, DANGO_SIZE);
      }

    }
  }

}

/*フィールドの描画 */
function field() {
  /* フィールドの描画 */
  for (y = 0; y < BOARD_HEIGHT + WALL_MARJIN; y++) {
    for (x = 0; x < BOARD_WIDTH + WALL_MARJIN; x++) {
      if (board[y][x] == BoardType.Free) {
        stroke(230, 230, 230);
        noFill();
        rect(DANGO_SIZE * x + 20, DANGO_SIZE * y + 80, DANGO_SIZE, DANGO_SIZE);
      } else if (board[y][x] == BoardType.Wall) {
        stroke(0);
        fill(0, 255, 255);
        rect(DANGO_SIZE * x + 20, DANGO_SIZE * y + 80, DANGO_SIZE, DANGO_SIZE);
      } else if (board[y][x] == BoardType.Dango) { /*もし団子なら*/
        stroke(0);
        getDangoColor(DangoType.Shiro);
        ellipse(DANGO_SIZE * x + 20, DANGO_SIZE * y + 80, DANGO_SIZE, DANGO_SIZE);
      } else {
        stroke(230, 0, 0);
        getDangoColor(board[y][x]);
        console.log(board[y][x]);
        ellipse(DANGO_SIZE * x, DANGO_SIZE * y, DANGO_SIZE);
      }
    }
  }
}

/* 団子の色を取得 */
function getDangoColor(type_dango) {
  switch (type_dango) {
    case DangoType.Sakura:
      fill(254, 186, 255);
      break;
    case DangoType.Goma:
      fill(191, 191, 191);
      break;
    case DangoType.Mitarashi:
      fill(168, 118, 61);
      break;
    case DangoType.Kibi:
      fill(255, 248, 150);
      break;
    case DangoType.Kosian:
      fill(107, 36, 64);
      break;
    case DangoType.Kinako:
      fill(217, 193, 134);
      break;
    case DangoType.Shiro:
      fill(255);
      break;
    case DangoType.Yomogi:
      fill(7, 133, 23);
      break;
  }
}
