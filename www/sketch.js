// This is a JavaScript file
DANGO_SIZE = 30
BOARD_HEIGHT = 20
BOARD_WIDTH = 10
WALL_MARJIN = 2
currentX = 5
currentY = 10

rotateButtonX = 0
rotateButtonY = 0
rightButtonX = 0
rightButtonY = 0
leftButtonX = 0
leftButtonY = 0

board = new Array(BOARD_HEIGHT);


debug1 = "";
debug2 = "";

var MinoType = {
  Imino: 1,
  Omino: 2,
  Smino: 3,
  Zmino: 4,
  Jmino: 5,
  Lmino: 6,
  Tmino: 7
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
  Free: 0
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  init();
}

function debug() {
  text(debug1, 10, 20);
  text(debug2, 30, 20);
  board[5][5] = DangoType.Sakura;

}

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

}

function touchMoved() {

  //ドラッグかスワイプ
  if (touchY - ptouchY < -50) {
    log("aa");
  }

}


function draw() {
  background(255);

  push();
  translate((windowWidth - 360) * 1.5, 80);
  field();
  pop();
  UI();
  debug();
  operation();

  /*

    if (mouseIsPressed) {
      fill(0);
    } else {
      fill(255,100,100);
    }
    ellipse(mouseX, mouseY, 80, 80);
    */
}

function operation() {
  /* 操作 */
  if (mouseIsPressed && mouseY - pmouseX > 400) {
    debug2 = "hard";
    //ハードドロップ

  }else if(mouseIsPressed && mouseY - pmouseY < -100){
    //ホールド
    debug2 = "hold";

  }else if(mouseIsPressed && mouseX - pmouseX > 40){
    //右
    debug2 = "migi";

  }else if(mouseIsPressed && mouseX - pmouseX < -40){
    //左
    debug2 = "hidari";

  }
}

function hardDrop() {
  
  if (mouseIsPressed) {
    debug1 = mouseX - pmouseX;
  }
}

function moveRight() {

}

function moveLeft() {

}

function hold() {

}



function UI() {
  textAlign(CENTER);
  textSize(40);
  text(80, (windowWidth / 2), 0);
  textAlign(RIGHT);
  text(1111, 0, 0);
  textAlign(LEFT);
  textSize(24);
  text("串", -(windowWidth / 2) + 80, 0);


}
function field() {
  /* フィールドの描画 */
  for (y = 0; y < BOARD_HEIGHT + WALL_MARJIN; y++) {
    for (x = 0; x < BOARD_WIDTH + WALL_MARJIN; x++) {
      if (board[y][x] == BoardType.Free) {
        stroke(230, 230, 230);
        noFill();
        rect(DANGO_SIZE * x, DANGO_SIZE * y, DANGO_SIZE, DANGO_SIZE);
      } else if (board[y][x] == BoardType.Wall) {
        stroke(0);
        fill(0, 255, 255);
        rect(DANGO_SIZE * x, DANGO_SIZE * y, DANGO_SIZE, DANGO_SIZE);
      } else {
        stroke(230, 0, 0);
        getDangoColor(board[y][x]);
        console.log(board[y][x]);
        ellipse(DANGO_SIZE * x, DANGO_SIZE * y, DANGO_SIZE);
      }
    }
  }
}

function getDangoColor(type_dango) {
  /* 団子の色を取得 */
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

class Mino {
  constructor(mino_type) {
    this.mino_type = mino_type;
  }


}
