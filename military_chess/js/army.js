/* æ£‹ç›˜position:
0  1  2  3  4
5  6  7  8  9
10 11 12 13 14
15 16 17 18 19 
20 21 22 23 24 
25 26 27 28 29 

30 31 32 33 34
35 36 37 38 39
40 41 42 43 44
45 46 47 48 49
50 51 52 53 54
55 56 57 58 59
*/
var Army = {};
Army.cfg = {
    //è¡Œè¥ä½ç½®
    protect: [11,13,17,21,23,36,38,42,46,48],

    //æ£‹å­åœ¨æ£‹ç›˜ä¸Šçš„cssä½ç½®ï¼ŒcssPosHoriä¸ºleft, cssPosVerä¸ºtop
    cssPosHori: [10,104,198,293,386],
    cssPosVer:  [12,59,107,155,202,250,350,398,445,493,541,588],
	
    /* å­˜åœ¨æ£‹å­çš„data
    * pos: åœ¨æ£‹ç›˜ä¸Šçš„ä½ç½®ï¼Œä¸Žæ£‹ç›˜çŸ©é˜µå¯¹åº”
    * role: è§’è‰²å·ç 
    *       0-ç‚¸å¼¹ 1-å¸ä»¤ 2-å†›é•¿ 3-å¸ˆé•¿ 4-æ—…é•¿ 5-å›¢é•¿ 6-è¥é•¿ 7-è¿žé•¿ 8-æŽ’é•¿ 9-å·¥å…µ 10-åœ°é›· 11-å†›æ——
    * group: 0-é»‘æ–¹ 1-çº¢æ–¹
    * status: æ˜¯å¦å·²æ­å¼€ 0-æœªæ­ 1-æ­å¼€
    * */
    pieces_role_arr: [0,0,1,2,3,3,4,4,5,5,6,6,7,7,7,8,8,8,9,9,9,10,10,10,11],
    
    //æ£‹ç›˜ä¸Šçš„å…­æ¡å¿«é€Ÿé€šé“
    leftVer: [5,10,15,20,25,30,35,40,45,50],
    rightVer: [9,14,19,24,29,34,39,44,49,54],
    hori1: [5,6,7,8,9],
    hori2: [25,26,27,28,29],
    hori3: [30,31,32,33,34],
    hori4: [50,51,52,53,54]
}
//æ£‹ç›˜ä¸Šæ¯ä¸€ä¸ªä½ç½®å¯ä»¥èµ°åˆ°çš„æ­¥æ³•
Army.cfg.step = {
    "5": Army.cfg.leftVer.concat(Army.cfg.hori1, [0,11]),
    "25": Army.cfg.leftVer.concat(Army.cfg.hori2, 21),
    "9": Army.cfg.rightVer.concat(Army.cfg.hori1, [4,13]),
    "29": Army.cfg.rightVer.concat(Army.cfg.hori2, 23),
    "30": Army.cfg.leftVer.concat(Army.cfg.hori3, 36),
    "50": Army.cfg.leftVer.concat(Army.cfg.hori4, [46,55]),
    "34": Army.cfg.rightVer.concat(Army.cfg.hori3, 38),
    "54": Army.cfg.rightVer.concat(Army.cfg.hori4, [48,59]),

    "10": Army.cfg.leftVer.concat(11),
    "15": Army.cfg.leftVer.concat([11,16,21]),
    "20": Army.cfg.leftVer.concat(21),
    "35": Army.cfg.leftVer.concat(36),
    "40": Army.cfg.leftVer.concat([36,41,46]),
    "45": Army.cfg.leftVer.concat(46),
    "14": Army.cfg.rightVer.concat(13),
    "19": Army.cfg.rightVer.concat([13,18,23]),
    "24": Army.cfg.rightVer.concat(23),
    "39": Army.cfg.rightVer.concat(38),
    "44": Army.cfg.rightVer.concat(38,43,48),
    "49": Army.cfg.rightVer.concat(48),

    "6": Army.cfg.hori1.concat([1,11]),
    "7": Army.cfg.hori1.concat([2,11,12,13]),
    "8": Army.cfg.hori1.concat([3,13]),
    "26": Army.cfg.hori2.concat(21),
    "27": Army.cfg.hori2.concat([32,22,21,23]),
    "28": Army.cfg.hori2.concat(23),
    "31": Army.cfg.hori3.concat(36),
    "32": Army.cfg.hori3.concat([27,36,37,38]),
    "33": Army.cfg.hori3.concat(38),
    "51": Army.cfg.hori4.concat([56,46]),
    "52": Army.cfg.hori4.concat([57,46,47,48]),
    "53": Army.cfg.hori4.concat([58,48]),

    "0": [1,5],
    "1": [0,2,6],
    "2": [1,3,7],
    "3": [2,4,8],
    "4": [3,9],
    "11": [5,6,7,10,12,15,16,17],
    "12": [7,11,13,17],
    "13": [7,8,9,12,14,17,18,19],
    "16": [11,15,17,21],
    "17": [11,12,13,16,18,21,22,23],
    "18": [13,17,19,23],
    "21": [15,16,17,20,22,25,26,27],
    "22": [17,21,23,27],
    "23": [17,18,19,22,24,27,28,29],
    "36": [30,31,32,35,37,40,41,42],
    "37": [32,36,38,42],
    "38": [32,33,34,37,39,42,43,44],
    "41": [36,40,42,46],
    "42": [36,37,38,41,43,46,47,48],
    "43": [38,42,44,48],
    "46": [40,41,42,45,47,50,51,52],
    "47": [42,46,48,52],
    "48": [42,43,44,47,49,52,53,54],
    "55": [50,56],
    "56": [51,55,57],
    "57": [52,56,58],
    "58": [53,57,59],
    "59": [54,58]
}

Army.init = {
    //åˆå§‹åŒ–ï¼Œé‡ç½®æ‰€æœ‰å‚æ•°
    startInit: function(){
        var g = Army.game,
            a = Army.AI;
		g.currPieces0 = Army.cfg.pieces_role_arr.slice();
		g.currPieces1 = Army.cfg.pieces_role_arr.slice();
		g.killedPieces0 = [];
		g.killedPieces1 = [];
		g.killedMine0 = 0;
		g.killedMine1 = 0;
		g.initPieces = [];
		g.group = 0;
		g.turns = 0;
		g.firstStep = true;
		g.board = [];
        g.gameOver = false;

		a.board = [];
		a.bestMove = [];
		a.depth = 3;
		a.close = [];     

		$(".space").remove();
		$(".pieces").remove();
		$(".pieces_c").remove();
		$(".pieces_selected").remove();
        $("#killedPieces0 .killedPieces_item").remove();
        $("#killedPieces1 .killedPieces_item").remove();
    },
    /* 
     * åˆ›å»ºæ£‹ç›˜ä¸Šæ¯ä¸ªä½ç½®çš„æŒ‰é’®
     * */
    createSpace: function(board){
         for (var i=0; i<5; i++) {
            for (var j=0; j<12; j++){
                $("<span>", {
                    "class": "space",
                    css: {
                        top: Army.cfg.cssPosVer[j],
                        left: Army.cfg.cssPosHori[i]
                    }
                })
                .data("pos", j*5+i)
                .appendTo(board)
                .click(Army.init._spaceClick);
            }
        }
    },
    
    /*
     * ç‚¹å‡»ç©ºç™½å¤„æ‰§è¡Œçš„å‡½æ•°
     * */
    _spaceClick: function() {
        //turns==groupæ—¶è½®åˆ°å½“å‰çŽ©å®¶ä¸‹æ£‹
        if (Army.game.turns == Army.game.group) {
            var aimPos = $(this).data("pos"),
                piecesPos = $(".pieces_selected").data("pos"),
                currPieces = $(".pieces_selected");
            if (piecesPos != null && Army.game.passable(piecesPos, aimPos)) {
                Army.action.movePieces(piecesPos, aimPos);
            }
        }
    },
    /*
     * æ‘†æ”¾æ£‹å­
     * */
    createPieces: function(board, initPieces) {
        //çº¢/é»‘åŒæ–¹æ£‹å­
        var pieces_role1 = Army.cfg.pieces_role_arr.slice(),
            pieces_role2 = Army.cfg.pieces_role_arr.slice();

        //æ‘†æ”¾60ä¸ªæ£‹å­
        for (var i = 0; i < 60; i++) {
            //è¡Œè¥å¤„ä¸æ”¾æ£‹å­
            if ($.inArray(i, Army.cfg.protect) > -1) {
                Army.game.board.push(null);
                continue;
            }
            
            //æ£‹å­ä½ç½®
            var cssPos = Army.game.getCssPosByPos(i);
            
            //æ£‹å­è§’è‰²
            //éšæœºåˆ›å»ºæ£‹å­
            if (!initPieces) {
                var cfg = Army.init._getPiecesConfig(pieces_role1, pieces_role2);
                Army.game.initPieces.push([cfg.role, cfg.group]);
            
            //é€šè¿‡å‚æ•°ä¼ é€’æ£‹å­æ‘†æ”¾
            } else {
				var pieces = initPieces.shift();
                var cfg = {role:pieces[0], group:pieces[1]};
            }
			
            var pieces = $("<span>", {
                "class": "pieces_c",
                css:{
                    top: cssPos.top,
                    left: cssPos.left,
                    "z-index": 1
                }
            })
            .addClass("pieces")
            .appendTo(board)
            .data("pos", i).data("role", cfg.role).data("group", cfg.group).data("status", 0)
            .click(Army.init._piecesClick);

            Army.game.board.push(pieces);
        }
        Army.AI.initAIBoard();
    },
    
    /*
     * ç‚¹å‡»æ£‹å­æ‰§è¡Œçš„å‡½æ•°
     * */
    _piecesClick: function() {
        //turns==groupæ—¶è½®åˆ°å½“å‰çŽ©å®¶ä¸‹æ£‹ Army.game.gameOver==trueæ—¶æ¸¸æˆç»“æŸ
        if (Army.game.turns == Army.game.group && !Army.game.gameOver) {
            var self = $(this);

            //å¤„äºŽæœªç¿»å¼€çŠ¶æ€
            if (self.data("status") == 0) {
                Army.action.openPieces(self.data("pos"));

            //å¤„äºŽç¿»å¼€çŠ¶æ€ï¼Œå¹¶ä¸”æœªè¢«é€‰æ‹©
            } else if (!self.hasClass("pieces_selected")) {
                //æ€å¯¹æ–¹æ£‹å­
                if ($(".pieces_selected").length > 0 && $(".pieces_selected").data("group") != self.data("group")) {
                    Army.game.piecesHit($(".pieces_selected"), self);
                
                //æ­£å¸¸é€‰ä¸­ï¼Œå†›æ——/åœ°é›·é™¤å¤–ï¼Œæ•Œäººçš„æ£‹å­é™¤å¤–
                } else {
                    if (self.data("role") != 10 && self.data("role") != 11 && self.data("group") == Army.game.group) {
                        $(".pieces_selected").removeClass("pieces_selected");
                        self.addClass("pieces_selected");
                    }
                }
            
            //å¤„äºŽç¿»å¼€çŠ¶æ€ï¼Œå·²è¢«é€‰æ‹©ï¼Œç‚¹å‡»å–æ¶ˆé€‰æ‹©
            } else {
                self.removeClass("pieces_selected");
            }
        }
    },
    /*
     * æ‘†æ”¾æ£‹å­æ—¶éšæœºæŠ½å–å‡ºæ£‹å­
     * param: role1:é»‘æ–¹æ£‹å­æ•°ç»„
     *        role2:çº¢æ–¹æ£‹å­æ•°ç»„
     * return: å¯¹è±¡obj, obj.roleä¸ºæ­¤æ£‹å­è§’è‰²ï¼Œobj.groupä¸ºæ­¤æ£‹å­åˆ†ç»„
     * */
    _getPiecesConfig: function(role1, role2) {
        var group = Math.floor(Math.random()*2), role, index;
        if (role1.length == 0) {
            group = 1;
        } else if (role2.length == 0) {
            group = 0;
        }
        if (group == 0) {
            index = Math.floor(Math.random()*role1.length);
            role = role1[index];
            role1.splice(index, 1);
        } else {
            index = Math.floor(Math.random()*role2.length);
            role = role2[index];
            role2.splice(index, 1);     
        }
        return {
             role: role,
             group: group
        }
    }
}

Army.action = {
    /*
     * ç¿»å¼€æ£‹å­
     * @param pos æ£‹å­çš„ä½ç½®
     * @param isRemote æ˜¯å¦å¯¹æ–¹å‘å‡ºçš„åŠ¨ä½œ
     * */
    openPieces: function(pos, isRemote) {
        var pieces = Army.game.getPiecesByPos(pos),
            bg_position = -pieces.data("group")*60 + "px " + (-pieces.data("role")*30) + "px";
        
		/* 
        //ç¬¬ä¸€æ¬¡æ­å¼€æ£‹å­ï¼Œåˆ¤å®šåŒæ–¹è§’è‰² for comet
        if (Army.game.firstStep) {
            Army.game.firstStep = false;
            var group = Army.game.getPiecesByPos(pos).data("group");
            if (isRemote) {
                Army.game.group = group? 0:1;
                Army.game.turns = Army.game.group;
            } else {
                Army.game.group = group;
                Army.game.turns = Army.game.group? 0:1;
            }
        }
		*/

        //ç¬¬ä¸€æ¬¡æ­å¼€æ£‹å­ï¼Œåˆ¤å®šè§’è‰²
        if (Army.game.firstStep) {
            Army.game.firstStep = false;
            Army.game.group = Army.game.getPiecesByPos(pos).data("group");
            Army.game.turns = Army.game.group;
            
            //é»˜è®¤groupä¸º0ï¼Œå¦‚æžœæ­¤æ—¶groupä¸º1ï¼Œéœ€è¦ä¿®æ”¹AIé‡Œçš„boardè¡¨
            if (Army.game.group == 1) Army.AI.initAIBoard();
        }

        pieces.removeClass("pieces_c")
            .css("background-position", bg_position)
            .data("status", 1);
        $(".pieces_selected").removeClass("pieces_selected");

        Army.action.go("open", isRemote, {
            pos: pos
        })
    },

    /*
     * æ€æ­»æ£‹å­
     * @param type æ€æ­»æ£‹å­çš„ç±»åž‹  
     *             1: æ™®é€šå¤§åƒå°
	 *             2: ä¿©æ£‹å­åœ°ä½ç›¸ç­‰
	 *             3: æœ‰ä¸€æ–¹æ˜¯ç‚¸å¼¹,ä¸”ç›®æ ‡ä¸ä¸ºå†›æ——
	 *             4: å·¥å…µæŒ–åœ°é›·
     * @param currPos å½“å‰æ£‹å­ä½ç½®
     * @param aimPos ç›®çš„æ£‹å­ä½ç½®
     * @param isRemote æ˜¯å¦å¯¹æ–¹å‘å‡ºçš„åŠ¨ä½œ
     * */
    killPieces: function(type, currPos, aimPos, isRemote) {
		var currPieces = Army.game.getPiecesByPos(currPos),
			aimPieces  = Army.game.getPiecesByPos(aimPos),
            cssPos     = Army.game.getCssPosByPos(aimPos),
            aimRole    = aimPieces.data("role"),
            aimGroup   = aimPieces.data("group"),
            g          = Army.game;

        currPieces
        //ç½®äºŽæœ€ä¸Šå±‚
        .css("z-index", 2)
        .animate({
            top: cssPos.top,
            left: cssPos.left
        },"linear", function(){
            Army.action._removePieces(aimPieces);
            if (type == 2 || type == 3) {
                Army.action._removePieces(currPieces);
            }
            //æ¢å¤åŽŸæœ‰å±‚çº§
            $(this).css("z-index", 1);

            //æŒ–åœ°é›·
            if (aimRole == 10) {
                aimGroup == 0? g.killedMine0+=1: g.killedMine1+=1;
            }

            //åˆ¤æ–­æ¸¸æˆç»“æŸ
            if (aimRole == 11) {
                if (aimGroup == g.group) g.gameOverFunc("lose");
                else g.gameOverFunc("win");
                g.gameOver = true;
            }
            if (g.killedPieces0.length - g.killedMine0 >= 21) {
                Army.game.group == 0? g.gameOverFunc("lose"): g.gameOverFunc("win");
                g.gameOver = true;
            }
            if (g.killedPieces1.length - g.killedMine1 >= 21) {
                Army.game.group == 1? g.gameOverFunc("lose"): g.gameOverFunc("win");
                g.gameOver = true;
            }

        })
        .data("pos", aimPos);

        $(".pieces_selected").removeClass("pieces_selected");
        
        //gameOveräº†å°±ä¸ç”¨ç»§ç»­äº†
        if (!g.gameOver) {
            Army.action.go("kill", isRemote, {
                currPos: currPos,
                aimPos: aimPos,
                killType: type,
                currPieces: currPieces
            })
        }
    },
    
    /*
     * ç§»åŠ¨æ£‹å­
     * @param currPos å½“å‰æ£‹å­ä½ç½®
     * @param aimPos ç›®çš„ä½ç½®
     * @param isRemote æ˜¯å¦å¯¹æ–¹å‘å‡ºçš„åŠ¨ä½œ
     * */
    movePieces: function(currPos, aimPos, isRemote) {
        var cssPos = Army.game.getCssPosByPos(aimPos),
            currPieces = Army.game.getPiecesByPos(currPos);
        currPieces.animate({
            top: cssPos.top,
            left: cssPos.left
        }).data("pos", aimPos).removeClass("pieces_selected");

        $(".pieces_selected").removeClass("pieces_selected")
        Army.action.go("move", isRemote, {
            currPos: currPos,
            aimPos: aimPos,
			currPieces: currPieces
        });
    },
    /*
     * ç§»é™¤æ£‹å­ï¼Œå­˜å…¥æ•°ç»„ï¼Œå¹¶åˆ é™¤æ£‹å­å…ƒç´ 
     * param: pieces: è¢«æ€æ­»çš„æ£‹å­
     * */
    _removePieces: function(pieces) {
		var role = pieces.data("role"),
			g = Army.game;
		if (pieces.data("group") == 0) {
			g.currPieces0.splice($.inArray(role, g.currPieces0), 1);
			g.killedPieces0.push(role);
		} else {
			g.currPieces1.splice($.inArray(role, g.currPieces1), 1);
			g.killedPieces1.push(role);
		}
        Army.action._updateKilledPieces(pieces.data("group"), pieces.data("role"));
		pieces.remove();
	},

    /*
     * æ›´æ–°è¢«æ€æ£‹å­çš„æ˜¾ç¤º
     * @param group è¢«æ€æ£‹å­çš„ç»„åˆ«
     * @param role  è¢«æ€æ£‹å­çš„è§’è‰²
     * */
    _updateKilledPieces: function(group, role) {
        var $killedPieces = group? $("#killedPieces0"): $("#killedPieces1"),
            found = false;

        $killedPieces.find(".killedPieces_item").each(function(){
            var $this = $(this);
            if ($this.data("role") == role) {
                found = true;
                if ($this.find("b").length > 0) {
                    $this.find("b").text("*" + (parseInt($this.find("b").text().substr(1)) + 1) );
                } else {
                    $this.html("<b>*2</b>");
                }
            }
        });

        if (!found) {
            var bg_position = -group*60 + "px " + (-role*30) + "px";
            $("<span>", {
                "class": "killedPieces_item",
                css: {
                    "background-position": bg_position
                }
            })
            .appendTo($killedPieces)
            .data("role", role)
        }
    },

    /* 
     * æ¯èµ°ä¸€æ­¥æ‰§è¡Œçš„å‡½æ•°
     * */
    go: function(type, isRemote, obj) {
		/*  
        //for comet
        if (!isRemote) {
            switch (type) {
                case "open":
                    Army.Comet.publishOpen(obj.pos);
                    break;
                case "move":
                Army.Comet.publishMove(obj.currPos, obj.aimPos);
                    break;
                case "kill":
                    Army.Comet.publishKill(obj.currPos, obj.aimPos, obj.killType);
                    break;
            }
            Army.game.turns = Army.game.group? 0:1;
        } else {
            Army.game.turns = Army.game.group;
        }*/
        switch (type) {
            case "open":
                //statusä¸º1
                Army.AI.board[obj.pos][2] = 1;
                break;

            case "move":
                Army.game.board[obj.currPos] = null
                Army.game.board[obj.aimPos] = obj.currPieces;
                
                var role = obj.currPieces.data("role"),
                    group = obj.currPieces.data("group"),
                    status = obj.currPieces.data("status"),
                    val = Army.AI.getValueByRole(role, group, obj.aimPos);
                Army.AI.board[obj.currPos] = [null, null, null, null];
                Army.AI.board[obj.aimPos] = [role, group, status, val];
                break;

            case "kill":
                Army.game.board[obj.currPos] = null;
                Army.AI.board[obj.currPos] = [null, null, null, null];

                if (obj.killType == 2 || obj.killType == 3) {
                    Army.game.board[obj.aimPos] = null;
                    Army.AI.board[obj.aimPos] = [null, null, null, null];
                } else {
                    Army.game.board[obj.aimPos] = obj.currPieces;

                    var role = obj.currPieces.data("role"),
                        group = obj.currPieces.data("group"),
                        status = obj.currPieces.data("status"),
                        val = Army.AI.getValueByRole(role, group, obj.aimPos);
                    Army.AI.board[obj.aimPos] = [role, group, status, val];
                }

                break;
        }

        if (!isRemote) {

            //è®©firefox3.5ä»¥ä¸Šç‰ˆæœ¬ä½¿ç”¨web workers
            if(Army.game.useWorker == undefined) {
                var ua = window.navigator.userAgent,
                    firefox = ua.indexOf("Firefox")>0,
                    version;

                if(firefox) {
                    var re = /Firefox(\s|\/)(\d+(\.\d+)?)/;
                    if(re.test(ua))
                        version = parseFloat(RegExp.$2);
                    if (version >= 3.5) Army.game.useWorker = true;
                    else Army.game.useWorker = false;
                } else {
                    Army.game.useWorker = false;
                }
                
            }
            //Army.game.useWorker = false;
            if (Army.game.useWorker) {
                var worker = new Worker("js/AIWorkers.js");
                worker.onmessage = function(event){
                    switch (event.data.type) {
                        case "open":
                            Army.action.openPieces(event.data.piecesPos, true);
                            break;
                        case "move":
                            Army.action.movePieces(event.data.currPos, event.data.aimPos, true);
                            break;
                        case "kill":
                            Army.action.killPieces(event.data.killType, event.data.currPos, event.data.aimPos, true);
                            break;
                    }
                };

                worker.postMessage({
                    AIBoard: Army.AI.board,
                    group: Army.game.group
                });

            } else {
                setTimeout(Army.AI.go, 50);
            }

        }

        Army.game.turns = Army.game.turns? 0:1;
        //Army.game.group = Army.game.group? 0:1;
    }
}

Army.game = {
    //åŒæ–¹å‰©ä½™æ£‹å­æ•°ç»„
    currPieces0: Army.cfg.pieces_role_arr.slice(),
    currPieces1: Army.cfg.pieces_role_arr.slice(),
    //åŒæ–¹è¢«æ€æ£‹å­æ•°ç»„
    killedPieces0: [],
    killedPieces1: [],
    //åŒæ–¹è¢«æ€çš„åœ°é›·æ•°ï¼Œç”¨äºŽåˆ¤æ–­æ˜¯å¦å¯æŠ¢å†›æ——
    killedMine0: 0,
    killedMine1: 0,
    //åˆå§‹åŒ–æ£‹ç›˜çš„æ£‹ä½ç½®
    initPieces: [],
    //å½“å‰çŽ©å®¶è§’è‰²
    group: 0,
    //è½®åˆ°å“ªä¸€æ–¹çŽ©å®¶ä¸‹
    turns: 0,
    //æ˜¯å¦ä¸ºç¬¬ä¸€æ­¥
    firstStep: true,
	board: [],
	gameOver: false,
    /*
     * å¤„ç†ä¸¤ä¸ªæ£‹å­ç›¸ç¢°æ’ž
     * param: currPieces: å½“å‰æ£‹å­
     *        aimPieces: ç›®æ ‡æ£‹å­
     * */
	piecesHit: function(currPieces, aimPieces) {
		var currPos   = currPieces.data("pos"),
			aimPos    = aimPieces.data("pos"),
			currRole  = currPieces.data("role"),
            aimRole   = aimPieces.data("role");

		if (Army.game.passable(currPos, aimPos)) {
			var type = Army.game.killType(currRole, aimRole, Army.game.group)
			//å¯æ€ä»¥åŠç›®æ ‡ä¸åœ¨è¡Œè¥é‡Œé¢
			if (type && $.inArray(aimPos, Army.cfg.protect) == -1) {
                Army.action.killPieces(type, currPos, aimPos);
                return true;
			}
		}

        return false;
	},
	

	/*
	 * ä¸¤æ£‹å­ç›¸ç¢°å‡ºçŽ°çš„æƒ…å†µ
	 * param: currRole: ç§»åŠ¨çš„æ£‹å­çš„è§’è‰²
	 *        aimRole:  ç›®æ ‡æ£‹å­çš„è§’è‰²
     *        group: å½“å‰çŽ©å®¶
	 * return: 1: æ™®é€šå¤§åƒå°
	 *         2: ä¿©æ£‹å­åœ°ä½ç›¸ç­‰
	 *         3: æœ‰ä¸€æ–¹æ˜¯ç‚¸å¼¹,ä¸”ç›®æ ‡ä¸ä¸ºå†›æ——
	 *         4: å·¥å…µæŒ–åœ°é›·
	 *         null: æ— ç¬¦åˆæ¡ä»¶çš„è§„åˆ™
	 * */
	killType: function(currRole, aimRole, group) {
		
		//æ™®é€šå¤§åƒå°
		if (currRole > 0 && currRole < 10 && aimRole > 0 && aimRole < 10 && currRole < aimRole)
			return 1;
		//ä¿©æ£‹å­åœ°ä½ç›¸ç­‰
		if (currRole == aimRole) 
			return 2;
		//åŒæ–¹æœ‰ä¸€æ–¹æ˜¯ç‚¸å¼¹ï¼Œä¸”ç›®æ ‡ä¸ä¸ºå†›æ——
		if ((currRole == 0 || aimRole == 0) && aimRole != 11) 
			return 3;
		//å·¥å…µæŒ–åœ°é›·
		if (currRole == 9 && aimRole == 10)
			return 4;
        //æŠ¢å†›æ——
        if (aimRole == 11) {
            if (Army.game.killedMine1 == 3 && group == 0) return 5;
            if (Army.game.killedMine0 == 3 && group == 1) return 5;
        }

		return null;
	},
    

	/*
	 * èŽ·å¾—æŸä½ç½®ä¸Šçš„æ£‹å­
	 * param pos: æ£‹ç›˜ä¸Šçš„ä½ç½®
	 * return: å¦‚æžœæ­¤ä½ç½®æœ‰æ£‹å­ï¼Œè¿”å›žæ­¤æ£‹å­å°è£…åŽçš„jqueryå¯¹è±¡
	 *         å¦‚æžœæ­¤ä½ç½®æ— æ£‹å­ï¼Œè¿”å›žnull
	*/
	getPiecesByPos: function(pos) {
        /*
		var ret = null;
		$(".pieces").each(function(){
			if ($(this).data("pos") == pos) ret = $(this);
		})
		return ret;
        */
        return Army.game.board[pos];
	},
	
    /* 
     * åˆ¤æ–­æ£‹å­æ˜¯å¦å¯ä»¥ç§»åŠ¨åˆ°ç›®æ ‡ä½ç½®
     * param: piecesPos: å½“å‰æ£‹å­ä½ç½®
     *        aimPos: ç›®æ ‡ä½ç½®
     * return: true: å¯ä»¥ç§»åŠ¨
     *         false: ä¸å¯ç§»åŠ¨
     * */
	passable: function(piecesPos, aimPos) {
		var ret = false;
		for (var i=0; i<Army.cfg.step[piecesPos].length; i++) {
			if (Army.cfg.step[piecesPos][i] == aimPos) ret = true;
		}

		//é™åˆ¶åž‚ç›´çº¿ä¸Šçš„è¡Œèµ°ï¼Œå¦‚æžœè·¯çº¿ä¸­é—´æœ‰æ£‹å­åˆ™æ— æ³•ç§»åŠ¨
		$.each(["leftVer","rightVer"], function(o,v){
		   if ($.inArray(piecesPos, Army.cfg[v]) > -1 && $.inArray(aimPos, Army.cfg[v]) > -1) {
				if (piecesPos < aimPos) {
					var t = piecesPos;
					piecesPos = aimPos;
					aimPos = t;
				}
				for (var i = $.inArray(aimPos, Army.cfg[v])+1; i < $.inArray(piecesPos, Army.cfg[v]); i++) {
					if (Army.game.getPiecesByPos(Army.cfg[v][i])) {
						ret = false;
					}
				}
			}
		});

		//é™åˆ¶æ°´å¹³çº¿ä¸Šçš„è¡Œèµ°ï¼Œå¦‚æžœè·¯çº¿ä¸­é—´æœ‰æ£‹å­åˆ™æ— æ³•ç§»åŠ¨
		$.each(["hori1", "hori2", "hori3", "hori4"], function(o,v){
		   if ($.inArray(piecesPos, Army.cfg[v]) > -1 && $.inArray(aimPos, Army.cfg[v]) > -1) {
				if (piecesPos < aimPos) {
					var t = piecesPos;
					piecesPos = aimPos;
					aimPos = t;
				}
				for (var i = $.inArray(aimPos, Army.cfg[v])+1; i < $.inArray(piecesPos, Army.cfg[v]); i++) {
					if (Army.game.getPiecesByPos(Army.cfg[v][i])) {
						ret = false;
					}
				}
			}
		});

		return ret;
	},

    /*
     * é€šè¿‡æ£‹ç›˜ä¸Šçš„ä½ç½®èŽ·å–æ­¤ä½ç½®ä¸Šçš„cssä½ç½®å±žæ€§
     * param: pos:æ£‹ç›˜ä¸Šçš„ä½ç½®
     * return: obj.top & obj.left
     * */
	getCssPosByPos: function(pos){
		var t = pos % 5;
		return {
			top: Army.cfg.cssPosVer[parseInt((pos)/5)],
			left: Army.cfg.cssPosHori[t]
		}
	},
    gameOverFunc: function(type) {
        if (type == "win") alert("ä½ èµ¢äº†");
        else alert("ä½ è¾“äº†");
    }

}