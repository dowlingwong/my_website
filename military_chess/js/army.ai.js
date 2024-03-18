Army.AI = {
    /* AIæ£‹ç›˜
     * æ¯ä¸ªå…ƒç´ å¯¹åº”æ£‹ç›˜ç›¸åº”ä½ç½® ä¾‹å¦‚board[0]å¯¹åº”ä½ç½®ä¸º0çš„æ£‹ç›˜ä½ç½®
     * index: 0: role è§’è‰²å·ç 
     *        1: group ç»„åˆ«
     *        2: status æ˜¯å¦å·²ç»ç¿»å¼€
     *        3: value è§’è‰²ä»·å€¼
     * */
    board: [],
    //æœ€ä½³èµ°æ³•
    bestMove: [],
    //éåŽ†æ·±åº¦
    depth: 10,
    //è¿˜æœªæŽ€å¼€çš„æ£‹å­ä½ç½®
    close: [],
    roleValue: [20,60,45,35,30,26,20,16,10,27,40,1000],
    initAIBoard: function() {
        for (var i = 0; i < 60; i++) {
            var $p = Army.game.board[i],
                role = $p? $p.data("role"): null,
                group = $p? $p.data("group"): null,
                status = $p? $p.data("status"): null,
                val = Army.AI.getValueByRole(role, group, i);
                
            Army.AI.board[i] = [role, group, status, val];
        }
    },
    getValueByRole: function(role, group, pos) {
        /*
        * è§’è‰²å·ç   0-ç‚¸å¼¹ 1-å¸ä»¤ 2-å†›é•¿ 3-å¸ˆé•¿ 4-æ—…é•¿ 5-å›¢é•¿ 6-è¥é•¿ 7-è¿žé•¿ 8-æŽ’é•¿ 9-å·¥å…µ 10-åœ°é›· 11-å†›æ——
        * è§’è‰²ä»·å€¼  6-ç‚¸å¼¹ 10-å¸ä»¤ 9-å†›é•¿ 8-å¸ˆé•¿ 7-æ—…é•¿ 6-å›¢é•¿ 5-è¥é•¿ 4-è¿žé•¿ 3-æŽ’é•¿ 5-å·¥å…µ 8-åœ°é›· 0-å†›æ——
        */
/*
        var val = 0;
        if (role >= 1 || role <= 8) {
            val = 11 - role;
        } else {
            switch (role) {
                case 0:
                    val = 6;
                    break;
                case 9:
                    val = 5;
                    break;
                case 10:
                    val = 8;
                    break;
                case 11:
                    val = 0;
                    break;
            }
        }
        */
        var val = Army.AI.roleValue[role];
        //if ($.inArray(pos, Army.cfg.protect) > -1) val += 10;
        val = group == Army.game.group? -val: val;
        return val;
    },

    go: function() {
        Army.AI.close = [];
        var walkable = [],
            close = Army.AI.close,
            boardItem = null;
        
        for (var i = 0; i < 60; i++) {
            boardItem = Army.AI.board[i];
            if (boardItem) {
                if (Army.AI.checkWalkable(boardItem)) {
                    walkable.push([Army.AI.board[i],i]);
                }
                if (boardItem[2] == 0) {
                    close.push(i);
                }
            }
        }
        //console.info(Army.AI.boardValue());
        if (!walkable.length) {
            Army.action.openPieces(close[Math.floor(Math.random()*close.length)], true);
        } else {
            var move = Army.AI.minimax(Army.AI.depth, Army.AI.board, Army.game.group?0:1);
            //console.info(move, Army.AI.bestMove);
            if (Army.AI.bestMove[0] == 0) {
                Army.action.movePieces(Army.AI.bestMove[1], Army.AI.bestMove[2], true);
            } else if (Army.AI.bestMove[0] == 1){
                Army.action.killPieces(Army.AI.bestMove[1], Army.AI.bestMove[2], Army.AI.bestMove[3], true);
            } else if (Army.AI.bestMove[0] == 2){
                Army.action.openPieces(close[Math.floor(Math.random()*close.length)], true);
            }
        }

    },
    minimax: function(depth, board, turn) {
        var point, 
            scores = [], 
            action = [], 
            walkable = [],
            step = Army.cfg.step,
            AI = Army.AI,
            close = Army.AI.close;
        
        if (depth == 0) {
            return AI.boardScore(board);
        } else {
            depth -= 1;
            walkable = AI.getWalkable(board, turn);
            
            if (!walkable.length) {
                return AI.boardScore(board);
            } else {
                var walkFlag = false, actionBoard, type, i, j, killIndex;
                //éåŽ†æ¯ä¸€ä¸ªå¯èµ°çš„æ£‹å­çš„æ¯ä¸€æ­¥èµ°æ³•
                for (var i = 0, len = walkable.length; i < len; i++) {
                    for (var j = 0, slen = step[walkable[i]].length; j < slen; j++) {

                        var currPos = walkable[i],
                            aimPos = step[walkable[i]][j];
                        
                        //ç›®æ ‡ä½ç½®æœ‰æ£‹å­
                        if (board[aimPos][0] != null) {
                            //status == 0 æœªç¿»å¼€
                            if (board[aimPos][2] == 0) continue;
                            //ç›®æ ‡æ£‹å­ä¸ºå·±æ–¹æ£‹å­
                            if (board[aimPos][1] == turn) continue;

                            var type = AI.isKillable(currPos, aimPos, board);
                            if (type) {
                                walkFlag = true;
                                actionBoard = AI.killPieces(type, currPos, aimPos, board);
                                point = AI.minimax(depth, actionBoard, turn?0:1);
                                scores.push(point);
                                action.push([1, type, currPos, aimPos]);

                                //è®°å½•ç¬¬ä¸€å±‚æ€æ£‹å­çš„ä½ç½®
                                if (depth == Army.AI.depth - 1) killIndex = scores.length-1
                            }
                        //ç›®æ ‡ä½ç½®æ— æ£‹å­
                        } else if ( AI.passable(currPos, aimPos, board) ) {
                            walkFlag = true;
                            actionBoard = AI.movePieces(currPos, aimPos, board);
                            point = AI.minimax(depth, actionBoard, turn?0:1);
                            scores.push(point);
                            action.push([0, currPos, aimPos]);
                        }

                    }
                }
                //æ— æ£‹å¯ä¸‹ï¼Œè¿”å›žå½“å‰æ£‹å±€åˆ†æ•°
                if (!walkFlag) {
                    if (depth == Army.AI.depth-1) AI.bestMove = [2];
                    return AI.boardScore(board);
                }

                //è½®åˆ°çŽ©å®¶ï¼Œå–æœ€å°å€¼
                if (turn == Army.game.group) {  
                    var l = scores.length, i, min = scores[0];
                    for (i = 1; i < l; i++) {
                        if (min > scores[i]) {
                            min = scores[i];
                        }
                    }
                    return min;

                //è½®åˆ°ç”µè„‘ï¼Œå–æœ€å¤§å€¼
                } else {
                    var l = scores.length, i, max = scores[0], maxIndex = 0, min = scores[0];
                    for (i = 1; i < l; i++) {
                        if (max < scores[i]) {
                            max = scores[i];
                            //å¦‚æžœæ˜¯æœ€ä¸Šä¸€å±‚ï¼Œè®°å½•æœ€å¤§å€¼çš„ä½ç½®index
                            if (depth == Army.AI.depth-1) maxIndex = i;
                        }

                        //å¦‚æžœæ˜¯æœ€é¡¶å±‚ï¼Œè®°å½•æœ€å·®èµ°æ³•
                        if (depth == Army.AI.depth-1 && min > scores[i]) min = scores[i] 
                    }

                    //å¦‚æžœæ˜¯æœ€é¡¶å±‚
                    if (depth == Army.AI.depth - 1) {
                        //console.info(max, AI.boardScore(AI.board), killIndex);
                        //è®°å½•æœ€ä½³èµ°æ³•
                        AI.bestMove = action[maxIndex];
                        //å¦‚æžœå­˜åœ¨æ€æ£‹å­çš„æ­¥æ³•ï¼Œä»¥åŠæœ€ä½³èµ°æ³•çš„åˆ†æ•°ä¸Žæ€æ£‹å­çš„åˆ†æ•°ä¸€è‡´ï¼Œä¼˜å…ˆé€‰æ‹©æ€æ£‹å­
                        if (killIndex >= 0 && scores[maxIndex] == scores[killIndex]) AI.bestMove = action[killIndex];
                        //å¦‚æžœæœ€ä½³èµ°æ³•å’Œæœ€å·®èµ°æ³•åˆ†æ•°ç›¸åŒï¼Œåˆ™åŠ¨ä½œä¸ºopen
                        if (max == min /*&& max == Army.AI.boardScore(Army.AI.board)*/) AI.bestMove = [2];
                    }
                    return max;
                }
                

            } //end if (!walkable.length)
        } //end if (depth == 0)
    },
    getWalkable: function(board, turn) {
        var walkable = []; 
        for (var i = 0; i < 60; i++) {
            if (board[i][2] == 1 &&    //status==1 ç¿»å¼€çŠ¶æ€
                board[i][1] == turn &&    //
                board[i][0] != 11 &&   //ä¸ä¸ºå†›æ——
                board[i][0] != 10){    //ä¸ä¸ºåœ°é›·
                walkable.push(i);
            }
        }
        return walkable;
    },
    killPieces: function(type, currPos, aimPos, AIBoard) {
        var board = AIBoard.slice();
        if (type == 2 || type == 3) {
            board[currPos] = [null, null, null, null];
            board[aimPos] = [null, null, null, null];
        } else {
            board[aimPos] = board[currPos].slice();
            board[currPos] = [null, null, null, null];
        }
        return board;
    },
    
    movePieces: function(currPos, aimPos, AIBoard) {
        var board = AIBoard.slice();
        board[aimPos] = board[currPos].slice();
        board[currPos] = [null, null, null, null];
        return board;
    },

    boardScore: function(board) {
        var val = 0, b;
        for (var i = 0; i < 60; i++) {
            b = board[i];
            if (b && b[2]) {
                val += b[3];
                /*
                if ($.inArray(i, Army.cfg.protect) > -1) {
                    b[1] == Army.game.group? val -= 10: val += 10;
                }
                */
            }
        }
        return val;
    },

    passable: function(piecesPos, aimPos, board) {
		var ret = false, cfg = Army.cfg;
		for (var i=0; i<cfg.step[piecesPos].length; i++) {
			if (cfg.step[piecesPos][i] == aimPos) ret = true;
		}

		//é™åˆ¶åž‚ç›´çº¿ä¸Šçš„è¡Œèµ°ï¼Œå¦‚æžœè·¯çº¿ä¸­é—´æœ‰æ£‹å­åˆ™æ— æ³•ç§»åŠ¨
		$.each(["leftVer","rightVer"], function(o,v){
		   if ($.inArray(piecesPos, cfg[v]) > -1 && $.inArray(aimPos, cfg[v]) > -1) {
				if (piecesPos < aimPos) {
					var t = piecesPos;
					piecesPos = aimPos;
					aimPos = t;
				}
				for (var i = $.inArray(aimPos, cfg[v])+1; i < $.inArray(piecesPos, cfg[v]); i++) {
                    //role != null å­˜åœ¨æ£‹å­
					if (board[cfg[v][i]][0] != null) {
						ret = false;
					}
				}
			}
		});

		//é™åˆ¶æ°´å¹³çº¿ä¸Šçš„è¡Œèµ°ï¼Œå¦‚æžœè·¯çº¿ä¸­é—´æœ‰æ£‹å­åˆ™æ— æ³•ç§»åŠ¨
		$.each(["hori1", "hori2", "hori3", "hori4"], function(o,v){
		   if ($.inArray(piecesPos, cfg[v]) > -1 && $.inArray(aimPos, cfg[v]) > -1) {
				if (piecesPos < aimPos) {
					var t = piecesPos;
					piecesPos = aimPos;
					aimPos = t;
				}
				for (var i = $.inArray(aimPos, cfg[v])+1; i < $.inArray(piecesPos, cfg[v]); i++) {
                    //role != null å­˜åœ¨æ£‹å­
					if (board[cfg[v][i]][0] != null) {
						ret = false;
					}
				}
			}
		});

		return ret;
	},
    /*
     * åˆ¤æ–­ä¸¤ä¸ªæ£‹å­æ˜¯å¦å¯æ€
     * param: currPos: å½“å‰æ£‹å­ä½ç½®
     *        aimPos: ç›®æ ‡æ£‹å­ä½ç½®
     *        board: æ£‹å±€
     * return: 
     * */
	isKillable: function(currPos, aimPos, board) {
		if (Army.AI.passable(currPos, aimPos, board)) {
			var type = Army.game.killType(board[currPos][0], board[aimPos][0]);
			//å¯æ€ä»¥åŠç›®æ ‡ä¸åœ¨è¡Œè¥é‡Œé¢
			if (type && board[aimPos][1] != board[currPos][1]  && $.inArray(aimPos, Army.cfg.protect) == -1) {
                return type;
			}
		}
        return false;
	},
    checkWalkable: function(boardItem) {
        var group = Army.game.group? 0:1;
        if (boardItem[2] == 1 &&    //status==1 ç¿»å¼€çŠ¶æ€
            boardItem[1] == group &&    //groupä¸ºç”µè„‘
            boardItem[0] != 11 &&   //ä¸ä¸ºå†›æ——
            boardItem[0] != 10){    //ä¸ä¸ºåœ°é›·
            return true;
        }
        return false;
    }
}