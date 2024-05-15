import React from "react";
import { useEffect, useRef, useState } from "react";
import useSocket from "../hooks/useSocket";

export const INIT_GAME = "init_game";
export const MOVE = "move";
export const FINISH = "finish";
export const DRAW = "draw";

const Realtime = () => {
  const [turn, setTurn] = useState(false);
  const [matrix, setMatrix] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);
  const [state, setState] = useState("start");
  const [ponts, setPonts] = useState("");

  const winner = useRef(false);
  const [winnerColor, setWinnerColor] = useState(null);

  const socket = useSocket();

  const handleclicked = () => {
    console.log("pointer event working");
  };

  useEffect(() => {
    // console.log('useEffect ponts-',ponts)
  }, [ponts]);

  useEffect(() => {
    if (!socket) return;
    socket.onmessage = (event) => {
      // console.log('event.data',event.data)
      const { type, payload } = JSON.parse(event.data);
      // console.log('payload type-',type)
      if (type === INIT_GAME) {
        // console.log('init_game ponts',payload.color)
        if (payload.color === "X") {
          setPonts("Opponent");
          setTurn(false);
        } else {
          setPonts("You");
          setTurn(true);
        }
        setState("running");
        winner.current = false;
      }
      if (type === MOVE) {
        // console.log('move',payload)
        // console.log('ponts-',ponts)
        setMatrix(payload.board);
        setState("running");
        winner.current = false;
        setPonts(payload.turn);
        // console.log('move turn',payload.turn)
        // if(payload.moves%2===0 && ponts==='X'){
        //   setTurn(true)
        // }else{
        //   setTurn(false)
        // }
      }
      if (type === FINISH) {
        // console.log('finish',payload)
        setMatrix(payload.board);
        setState("finish");
        setWinnerColor(payload.winner);
        setPonts("Opponent");
      }
      if (type === DRAW) {
        // console.log('Draw',payload)
        setMatrix(payload.board);
        setState("finish");
        setPonts("Opponent");
        setWinnerColor(null);
      }
    };
  }, [socket]);

  if (!socket) {
    return (
      <>
        <h1>loading....</h1>
        <button
          className="w-fit mt-4 px-4 py-2 rounded-md text-white  bg-blue-800 hover:bg-blue-800/50"
          onClick={() => {
            window.location.reload();
          }}
        >
          reconnect
        </button>
      </>
    );
  }

  return (
    <div className={``}>
      {state == "start" ? (
        <h1 className="text-3xl  mb-4">click play to start</h1>
      ) : state !== "finish" ? (
        // <h1 className="text-3xl  mb-4">{turn == 1 ? <span>1st</span> : <span>2nd</span>} Person turn</h1>
        <h1 className="text-3xl  mb-4">
          {ponts == "You" ? <span>Your</span> : <span>Opponent</span>} turn
        </h1>
      ) : // console.log(winner.current,'--')
      winnerColor ? (
        <h1 className="text-3xl ">Winner: {winnerColor}</h1>
      ) : (
        <h1 className="text-3xl ">Draw</h1>
      )}
      <div
        className={`flex flex-col sm:items-center sm:w-screen  ${
          ponts == "You"
            ? `pointer-events-auto`
            : `pointer-events-none opacity-50`
        }`}
        onClick={handleclicked}
      >
        <div className={`flex  sm:w-11/12 `}>
          <button
            type="button"
            value={"00"}
            defaultValue={"00"}
            className="min-h-14 inline-block w-48 text-3xl font-bold border-r-8 border-b-8"
            onClick={() => {
              socket.send(
                JSON.stringify({
                  type: MOVE,
                  move: {
                    row: 0,
                    col: 0,
                  },
                })
              );
            }}
          >
            {matrix[0][0] == 1 && <span className="text-orange-600">O</span>}
            {matrix[0][0] == 2 && <span className="text-red-500">X</span>}
          </button>
          <button
            type="button"
            value={"01"}
            defaultValue={"01"}
            className="min-h-14 inline-block w-48 text-3xl font-bold border-x-8 border-b-8"
            onClick={() => {
              socket.send(
                JSON.stringify({
                  type: MOVE,
                  move: {
                    row: 0,
                    col: 1,
                  },
                })
              );
            }}
          >
            {matrix[0][1] == 1 && <span className="text-orange-600">O</span>}
            {matrix[0][1] == 2 && <span className="text-red-500">X</span>}
          </button>
          <button
            type="button"
            value={"02"}
            defaultValue={"02"}
            className="min-h-14 inline-block w-48 text-3xl font-bold  border-l-8 border-b-8"
            // onClick={handleClick}
            onClick={() => {
              // updateBoard(0,2)
              socket.send(
                JSON.stringify({
                  type: MOVE,
                  move: {
                    row: 0,
                    col: 2,
                  },
                })
              );
            }}
          >
            {matrix[0][2] == 1 && <span className="text-orange-600">O</span>}
            {matrix[0][2] == 2 && <span className="text-red-500">X</span>}
          </button>
        </div>
        {/* 2nd row */}
        <div className="flex  sm:w-11/12">
          <button
            type="button"
            value={"10"}
            defaultValue={"10"}
            className="min-h-14 inline-block w-1/3 text-3xl font-bold  border-r-8 border-b-8"
            // onClick={handleClick}
            onClick={() => {
              // updateBoard(1,0)
              socket.send(
                JSON.stringify({
                  type: MOVE,
                  move: {
                    row: 1,
                    col: 0,
                  },
                })
              );
            }}
          >
            {matrix[1][0] == 1 && <span className="text-orange-600">O</span>}
            {matrix[1][0] == 2 && <span className="text-red-500">X</span>}
          </button>
          <button
            type="button"
            value={"11"}
            defaultValue={"11"}
            className="min-h-14 inline-block w-1/3 text-3xl font-bold border-x-8 border-b-8"
            // onClick={handleClick}
            onClick={() => {
              // updateBoard(1,1)
              socket.send(
                JSON.stringify({
                  type: MOVE,
                  move: {
                    row: 1,
                    col: 1,
                  },
                })
              );
              setTurn(turn == 1 ? 2 : 1);
            }}
          >
            {matrix[1][1] == 1 && <span className="text-orange-600">O</span>}
            {matrix[1][1] == 2 && <span className="text-red-500">X</span>}
          </button>
          <button
            type="button"
            value={"12"}
            defaultValue={"12"}
            className="min-h-14 inline-block w-1/3 text-3xl font-bold  border-l-8 border-b-8"
            // onClick={handleClick}
            onClick={() => {
              // updateBoard(1,2)
              socket.send(
                JSON.stringify({
                  type: MOVE,
                  move: {
                    row: 1,
                    col: 2,
                  },
                })
              );
              setTurn(turn == 1 ? 2 : 1);
            }}
          >
            {matrix[1][2] == 1 && <span className="text-orange-600">O</span>}
            {matrix[1][2] == 2 && <span className="text-red-500">X</span>}
          </button>
        </div>
        {/* 3rd row */}
        <div className="flex  sm:w-11/12">
          <button
            type="button"
            value={"20"}
            defaultValue={"20"}
            className="min-h-14 inline-block w-48 text-3xl font-bold border-r-8"
            // onClick={handleClick}
            onClick={() => {
              // updateBoard(2,0)
              socket.send(
                JSON.stringify({
                  type: MOVE,
                  move: {
                    row: 2,
                    col: 0,
                  },
                })
              );
              setTurn(turn == 1 ? 2 : 1);
            }}
          >
            {matrix[2][0] == 1 && <span className="text-orange-600">O</span>}
            {matrix[2][0] == 2 && <span className="text-red-500">X</span>}
          </button>
          <button
            type="button"
            value={"21"}
            defaultValue={"21"}
            className="min-h-14 inline-block w-48  text-3xl font-bold border-x-8"
            // onClick={handleClick}
            onClick={() => {
              // updateBoard(2,1)
              socket.send(
                JSON.stringify({
                  type: MOVE,
                  move: {
                    row: 2,
                    col: 1,
                  },
                })
              );
              setTurn(turn == 1 ? 2 : 1);
            }}
          >
            {matrix[2][1] == 1 && <span className="text-orange-600">O</span>}
            {matrix[2][1] == 2 && <span className="text-red-500">X</span>}
          </button>
          <button
            type="button"
            value={"22"}
            defaultValue={"22"}
            className="min-h-14 inline-block w-48  text-3xl font-bold  border-l-8"
            // onClick={handleClick}
            onClick={() => {
              // updateBoard(2,2)
              socket.send(
                JSON.stringify({
                  type: MOVE,
                  move: {
                    row: 2,
                    col: 2,
                  },
                })
              );
              setTurn(turn == 1 ? 2 : 1);
            }}
          >
            {matrix[2][2] == 1 && <span className="text-orange-600">O</span>}
            {matrix[2][2] == 2 && <span className="text-red-500">X</span>}
          </button>
        </div>
        {/* 4th row */}
        {/* <div className="btn">
          <button
            type="button"
            className=" w-fit mt-12 px-4 py-2 rounded-md text-white  bg-blue-800 hover:bg-blue-800/50"
            // onClick={resetFunc}
            onClick={() => {
              socket.close();
            }}
          >
            Resign
          </button>
        </div> */}
      </div>
      {state == "finish" && <button className="w-fit mt-4 px-4 py-2 rounded-md text-white  bg-blue-800 hover:bg-blue-800/50">Play Again</button>}
      {state == "start" && (
        <button
          className="w-fit mt-4 px-4 py-2 rounded-md text-white  bg-blue-800 hover:bg-blue-800/50"
          onClick={() => {
            socket.send(
              JSON.stringify({
                type: INIT_GAME,
              })
            );
          }}
        >
          Play
        </button>
      )}
    </div>
  );
};

export default Realtime;
