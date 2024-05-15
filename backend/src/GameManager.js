const { json } = require("express")
const { INIT_GAME,MOVE ,FINISH} = require("./messages")
const Game = require("./Game")

module.exports = class GameManager {
    // private games:Game[];

    constructor(){
        this.games = []
        this.pendingUser = null
        this.users = []
    }

    addUser(socket){
        this.users.push(socket)
        this.addHandler(socket)
    }

    removeUser(socket){
        // this.games.splice(this.games.indexOf(socket),1)
        this.users = this.users.filter(user=> user!==socket)
    }

    addHandler(socket){
        // console.log(message)

        socket.on('message',(data)=>{
            const message = JSON.parse(data.toString());
            console.log(message);

            if(message.type === INIT_GAME){
                if(this.pendingUser){
                    // this.games.push(new Game(pendingUsers))
                    console.log("New game created between", this.pendingUser.id, "and", socket.id);
                    const game = new Game(this.pendingUser,socket);
                    this.games.push(game)  
                    this.pendingUser = null
                }
                else{
                    console.log("Pending user set to", socket.id);
                    this.pendingUser = socket
                }
            }
            if(message.type === MOVE){
                console.log('in game manager',message.move)
                const game = this.games.find(g => g.player1 === socket || g.player2 === socket);
                if(game){
                  game.makeMove(socket,message.move);
                }
            }
            // if(message.type === FINISH){
            //     const game = this.games.find(g => g.player1 === socket || g.player2 === socket);
            //     if(game){
            //       game.isFinished()
            //     }

            // }

        })

    }
}