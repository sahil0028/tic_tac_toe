const { FINISH, DRAW, MOVE, INIT_GAME } = require("./messages");

module.exports = class Game{
    constructor(player1,player2){
        this.player1 = player1;
        this.player2 = player2;
        this.board = [[0,0,0],[0,0,0],[0,0,0]];
        this.moves = [];
        this.startTime = new Date();
        this.winner = null;
        this.player1.send(JSON.stringify({type:INIT_GAME,payload:{color:'O'}}));
        this.player2.send(JSON.stringify({type:INIT_GAME,payload:{color:'X'}}));
    }

    makeMove(socket, move){

        // validate if this the person move.
        // move is valid.
        // update the board.
        // update the moves.
        // check if the game is finished.
        // if the game is finished, send the winner.
        // if the game is not finished, send the next player.
        // if the game is not finished, send the board. to both players.
        console.log('in gamejs',move)

        if(socket!== this.player1 && socket!== this.player2){
            console.log("sockets don't match")
            return
        }
        
        if(this.moves.length === 9){
            console.log("max moves reached")
            return
        }

        if(this.moves.length % 2 === 0 && socket!== this.player1){
            return
        }
        if(this.moves.length % 2 != 0 && socket!== this.player2){
            return
        }
        console.log('validation suceed')

        
        
        if(socket === this.player1 && this.board[move.row][move.col] === 0){
            this.board[move.row][move.col] = 1;
            // this.moves.push(`${move.row}${move.col}`);
        }
        if(socket === this.player2 && this.board[move.row][move.col] === 0){
            this.board[move.row][move.col] = 2;
            // this.moves.push(`${move.row}${move.col}`);
        }
        console.log('move update on board')
        this.moves.push([move.row,move.col]);
        console.log('move update on moves',this.moves)

        if(this.isFinished() && this.winner === null){
            // this.sendWinner(socket)
            console.log('Finish him')
            this.player1.send(JSON.stringify({type:FINISH,
                payload:{
                    winner:this.moves.length % 2 === 0?'Opponent':'You',
                    board:this.board
                }
            }))
            this.player2.send(JSON.stringify({type:FINISH,
                payload:{
                    winner:this.moves.length % 2 === 0?'You':'Opponent',
                    board:this.board
                }
            }))
            this.winner = this.moves.length % 2 === 0?'X':'O'
            return
        }
        // check draw
        if(this.moves.length === 9 && this.winner === null){
            console.log('draw')
            // this.sendWinner(socket)
            this.player1.send(JSON.stringify({type:DRAW,
                payload:{
                    winner:'none',
                    board:this.board
                }
            }))
            this.player2.send(JSON.stringify({type:DRAW,
                payload:{
                    winner:'none',
                    board:this.board
                }
            }))
            this.winner = 'draw';
            return
        }

        
        
        // console.log('sending back move')
        // sending back move
        if(this.moves.length % 2 === 0  && this.winner === null){
            console.log('if sending back move')

            this.player1.send(JSON.stringify({type:MOVE,
                payload:{
                    move:move,
                    board:this.board,
                    turn:'You',
                    moves:this.moves.length,
                }
            }))
            console.log('else sending back move')
            this.player2.send(JSON.stringify({type:MOVE,
                payload:{
                    move:move,
                    board:this.board,
                    turn:'Opponent',
                    moves:this.moves.length,
                }
            }))
        }
        else{
            console.log('else sending back move')
            this.player2.send(JSON.stringify({type:MOVE,
                payload:{
                    move:move,
                    board:this.board,
                    turn:'You',
                    moves:this.moves.length,
                }
            }))
            console.log('if sending back move')

            this.player1.send(JSON.stringify({type:MOVE,
                payload:{
                    move:move,
                    board:this.board,
                    turn:'Opponent',
                    moves:this.moves.length,
                }
            }))
        }
        
    }

    isFinished(){
        // checking rows
        for(let i=0;i<3;i++){
            const a=this.board[i][0]
            const b=this.board[i][1]
            const c=this.board[i][2]
            if (a===b && b===c && a!=0){
                console.log('game finished rows a-',a,'b-',b,'c-',c)
                return true
            }
        }
        // checking colums
        for(let i=0;i<3;i++){
            const a=this.board[0][i]
            const b=this.board[1][i]
            const c=this.board[2][i]
            if (a===b && b===c && a!=0){
                console.log('game finished colums a-',a,'b-',b,'c-',c)
                console.log('game finished')
                return  true
            }
        }
        // checking diagonally
        let aa=this.board[0][0]
        let bb=this.board[1][1]
        let cc=this.board[2][2]
        
        if (aa===bb && bb===cc && aa!=0){
            console.log('game finished')
            return  true
        }
        
        aa=this.board[0][2]
        bb=this.board[1][1]
        cc=this.board[2][0]
        
        if (aa===bb && bb===cc && aa!=0){
            console.log('game finished')
            return  true
        }
        return false

    }

}