// ��Ϸ������
var Game = {

	// ��Ϸ����
	gamePanel : null,
	
	// ����
	score : 0,
	
	// ʱ��
	time : 0,
	
	// ͼƬӳ���
	pieceMap : null,
	
	// ͼƬ�б�
	pieceList : [],
	
	// ͼƬ�б�����ͼƬ
	pieceImgList : [],
	
	// ͼƬ������б�
	randomList : [],
	
	// �켣�б�
	trackList : [],

	// ��Ϸ�Ƿ�ʼ
	isGameBigin : false,
	
	// ��Ϸ�Ƿ����
	isGameOver : false,
	
	
	// ��Ϸ�Ƿ�����
	isGameReset : false,
	
	// ͼƬԪ���Ƿ��һ�ε��
	isFirstClick : true,
	
	// ��ʼ��Ϸ
	start : function() {
	
		document.getElementById("start").disabled = true;
		document.getElementById("reset").disabled = false;
	
		if (this.isGameReset) {
			
			this.isGameOver = false;
			this.startTime();
			
			return;
		
		} else if (this.isGameBegin) {
		
			return;
			
		} else {
		
			this.init();
			
			return;
			
		}
	
	},
	
	reset : function() {
		
		document.getElementById("start").disabled = false;
		document.getElementById("reset").disabled = true;
		
		this.clear();
		this.initPieces();
		this.initImgPieces();
		this.time = 0;
		document.getElementById("time").innerHTML = 0;
		
		this.score = 0;
		document.getElementById("score").innerHTML = 0;
		
		this.isGameReset = true;
		this.isGameBegin = true;

	},
	
	// ��ʼ��
	init : function() {

		if (this.isGameBegin) {
		
			return;
		
		}
		
		this.pieceMap = new Map();
		
		var _this = this;
		
		this.time = 0;
		this.startTime();
		
		this.gamePanel = document.getElementById("pieces");

		this.initPieces();
		this.initImgPieces();

		this.isGameBegin = true;

	},
	
	// ��������ɵ�80��ͼƬ��ӽ�����
	initPieces : function() {
	
		var _this = this;
	
		this.initRandomList();
		
		// ��������б�����
		this.messRandomList();
			
		for (var i = 0; i <120; i ++) {
		
			var piece = new Piece(this);
			this.pieceList.push(piece);
			
			var x = (i%12);
			var y = Math.floor(i/12);
			
			this.pieceMap.put(x+","+y, piece);
			
			piece.setPosition(x, y);
			this.gamePanel.appendChild(piece.dom);
			
			if (x == 0 || x == 11 || y == 0 || y == 9) {
				
				piece.track = document.createElement("div");
				piece.track.className = "track";
				piece.dom.appendChild(piece.track);
				piece.isTracked = true;
				
				continue;
			
			} else {
			
				if (x == 1 || x == 10 || y == 1 || y == 8) {
				
					piece.setAtEdge(true);
				
				}
				
				this.pieceImgList.push(piece);
								
			}
									
		}
	
	},
	
	// ��ʼ��ͼƬ
	initImgPieces : function() {

		for (var i = 0; i < this.pieceImgList.length; i ++) {
		
			this.pieceImgList[i].initImg();
			this.pieceImgList[i].img.src = "img/pieces/"+this.randomList[i]+".png"
			this.pieceImgList[i].setImgSrc(this.pieceImgList[i].img.src);			
							
			// ִ��ͼƬ����¼�
			this.pieceImgList[i].onClick();

		}
		
	},
		
	// ��ʼ�������
	initRandomList : function() {

		// ��ȡ������У���˫����
		for (var i = 0; i < 40; i ++) {
		
			var random = parseInt(Math.random()*22*10000, 10);
			var number = random%20;
			this.randomList.push(number);
			this.randomList.push(number);
		
		}	
	
	},
	
	// ���������
	messRandomList : function() {
	
		for (var i = 0; i < this.randomList.length; i ++) {
		
			var random = parseInt(Math.random()*8*10000, 10);
			var number = random%80;

			var temp;
			temp = this.randomList[i];
			this.randomList[i] = this.randomList[number];
			this.randomList[number] = temp;
		
		}		
	
	},
	
	// ��ʼ��ʱ
	startTime : function() {
	
		var _this = this;
	
		if (this.isGameOver) {
		
			return;
		
		} else {
			
			this.time ++;
			if(this.time>300){
		     alert("GameOver!");
				return Game.reset();
			}
			document.getElementById("time").innerHTML = this.time;
			this.isGameBegin = true;
			setTimeout(function() {_this.startTime();}, 1000);
	
		
		}
	
	},
	
	// ���
	clear : function() {
	
		for (var i = 0; i < this.pieceList.length; i ++) {

			this.gamePanel.removeChild(this.pieceList[i].dom);		
		
		}
		
		this.pieceList = [];
		this.randomList = [];
		this.pieceImgList = [];
		
		this.isGameOver = true;
		this.isGameBegin = false;
		
	}

}

window.onload = function() {
	
	document.getElementById("start").disabled = false;
	document.getElementById("reset").disabled = true;

}

// ��Ϸ��ʼ���
function Start() {
	
	Game.start();

}

// ��Ϸ�������
function Reset() {

	Game.reset();
	
}