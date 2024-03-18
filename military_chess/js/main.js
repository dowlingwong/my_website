function start() {
	var board = $("#board");
	Army.init.startInit();
	Army.init.createSpace(board);
	Army.init.createPieces(board);
}

$(function(){
	$("#restartBtn").click(start)

    $("#descBtn").click(function(){
       $("#desc").toggle("normal"); 
    })
    $("#descCloseBtn").click(function(){
       $("#desc").fadeOut("normal"); 
    })
    start();
});
