import React, { useCallback, useEffect, useRef, useState } from 'react'

const Pvcomputer = () => {
  const [turn,setTurn] =useState(1)
  const [matrix,setMatrix] = useState([[0,0,0],[0,0,0],[0,0,0]])
  const [state,setState] = useState('start')
  const rembox = useRef(['00','01','02','10','11','12','20','21','22'])
  const [comp,setComp] = useState(false)
  const winner = useRef(false)

  const totalTurns = useRef(0)

  const resetFunc=()=>{
    setTurn(1)
    setMatrix([[0,0,0],[0,0,0],[0,0,0]])
    setState('start')
    setComp(false)
    rembox.current=['00','01','02','10','11','12','20','21','22']
    totalTurns.current=0
    winner.current=false

  }

  const handleClick=(e)=>{
    // Updating matrix
    if(state==='finish'){
      return
    }

    setState('runing')

    if(matrix[Number(e.target.value[0])][Number(e.target.value[1])]===0 && turn ==1){

      const index = rembox.current.indexOf(e.target.value);
  
      if (index > -1) {
        rembox.current.splice(index, 1);
      }
      // console.log(rembox.current)

      // console.log(rembox.pop(e.target.value))
      setMatrix(
        (prevArray) => {
          const newArray = [...prevArray];
          newArray[Number(e.target.value[0])][Number(e.target.value[1])] = turn;
          return newArray;
        }
      )
      totalTurns.current+=1
      turn==1?setTurn(2):setTurn(1)
    }
  }

  useEffect(()=>{
    if(turn == 2 && state!='finish'){
      // console.log('in if useEffect')
      const randomInd = Math.ceil(Math.random()*rembox.current.length)-1
      // console.log(rembox)
      const value=rembox.current[randomInd]
      if (randomInd > -1) {
        rembox.current.splice(randomInd, 1);
      }
      // console.log(value)
      setMatrix(
        (prevArray) => {
          const newArray = [...prevArray];
          newArray[Number(value[0])][Number(value[1])] = turn;
          return newArray;
        }
      )
      totalTurns.current+=1
      turn==1?setTurn(2):setTurn(1)
      // console.log(matrix)
    }
    setComp(false)
  },[comp])

  const findSol=()=>{
    for(let i=0;i<3;i++){
      const a=matrix[i][0]
      const b=matrix[i][1]
      const c=matrix[i][2]
      
      if (a===b && b===c && a!=0){
        setState('finish')
        // console.log('row winner',a,b,c)
        winner.current=true
        return
      }
    }

    // checking every column
    for(let i=0;i<3;i++){
      // console.log('col checking')
      const a=matrix[0][i]
      const b=matrix[1][i]
      const c=matrix[2][i]
      // console.log(a,b,c)
      if (a===b && b===c && a!=0){
        setState('finish')
        // console.log('col winner',a,b,c)
        winner.current=true
        return
      }
    }
    // checking diagonally
    let aa=matrix[0][0]
    let bb=matrix[1][1]
    let cc=matrix[2][2]
    if (aa===bb && bb===cc && aa!=0){
      // setState('finish')
      setState('finish')
      // console.log('diagonal winner',aa,bb,cc)
      winner.current=true
      return
    }
    aa=matrix[0][2]
    bb=matrix[1][1]
    cc=matrix[2][0]
    if (aa===bb && bb===cc && aa!=0){
      // setState('finish')
      setState('finish')
      // console.log('diagonal winner',aa,bb,cc)
      winner.current=true
      return
    }
    
    // checking if game is drawn
    if(totalTurns.current===9){
      // console.log('turns full')      
      // setState('finish')
      setState('finish')
    }
    setComp(true)
  }
  useEffect(()=>{
    findSol()
  },[matrix,state])
  return (
    <div className="">
      {/* 1row */}
      {/* <h1 className="text-3xl ">Human {turn} turn</h1> */}
      {state !== "finish" ? (
        <h1 className="text-3xl  mb-4">{turn == 1 ? <span>1st</span> : <span>2nd</span>} Person turn</h1>
      ) : (
          // console.log(winner.current,'--')
          winner.current?<h1 className="text-3xl ">
            Winner: {turn == 1 ?(<span>2nd Person</span>):<span>1st Person</span>} 
          </h1>:
          <h1 className="text-3xl ">
            Draw 
          </h1>
      )}
      <div className="flex flex-col sm:items-center sm:w-screen">
        <div className="flex sm:w-11/12">
          <button
            type="button"
            value={"00"}
            defaultValue={"00"}
            className="min-h-14 inline-block w-48 text-3xl font-bold border-r-8 border-b-8"
            onClick={handleClick}
          >
            {matrix[0][0] == 1 && <span className="text-orange-600">O</span>}
            {matrix[0][0] == 2 && <span className="text-red-500">X</span>}
          </button>
          <button
            type="button"
            value={"01"}
            defaultValue={"01"}
            className="min-h-14 inline-block w-48 text-3xl font-bold border-x-8 border-b-8"
            onClick={handleClick}
          >
            {matrix[0][1] == 1 && <span className="text-orange-600">O</span>}
            {matrix[0][1] == 2 && <span className="text-red-500">X</span>}
          </button>
          <button
            type="button"
            value={"02"}
            defaultValue={"02"}
            className="min-h-14 inline-block w-48 text-3xl font-bold  border-l-8 border-b-8"
            onClick={handleClick}
          >
            {matrix[0][2] == 1 && <span className="text-orange-600">O</span>}
            {matrix[0][2] == 2 && <span className="text-red-500">X</span>}
          </button>
        </div>
        {/* 2nd row */}
        <div className="flex sm:w-11/12">
          <button
            type="button"
            value={"10"}
            defaultValue={"10"}
            className="min-h-14 inline-block w-48 text-3xl font-bold  border-r-8 border-b-8"
            onClick={handleClick}
          >
            {matrix[1][0] == 1 && <span className="text-orange-600">O</span>}
            {matrix[1][0] == 2 && <span className="text-red-500">X</span>}
          </button>
          <button
            type="button"
            value={"11"}
            defaultValue={"11"}
            className="min-h-14 inline-block w-48 text-3xl font-bold border-x-8 border-b-8"
            onClick={handleClick}
          >
            {matrix[1][1] == 1 && <span className="text-orange-600">O</span>}
            {matrix[1][1] == 2 && <span className="text-red-500">X</span>}
          </button>
          <button
            type="button"
            value={"12"}
            defaultValue={"12"}
            className="min-h-14 inline-block w-48 text-3xl font-bold  border-l-8 border-b-8"
            onClick={handleClick}
          >
            {matrix[1][2] == 1 && <span className="text-orange-600">O</span>}
            {matrix[1][2] == 2 && <span className="text-red-500">X</span>}
          </button>
        </div>
        {/* 3rd row */}
        <div className="flex sm:w-11/12">
          <button
            type="button"
            value={"20"}
            defaultValue={"20"}
            className="min-h-14 inline-block w-48 text-3xl font-bold border-r-8"
            onClick={handleClick}
          >
            {matrix[2][0] == 1 && <span className="text-orange-600">O</span>}
            {matrix[2][0] == 2 && <span className="text-red-500">X</span>}
          </button>
          <button
            type="button"
            value={"21"}
            defaultValue={"21"}
            className="min-h-14 inline-block w-48 text-3xl font-bold border-x-8"
            onClick={handleClick}
          >
            {matrix[2][1] == 1 && <span className="text-orange-600">O</span>}
            {matrix[2][1] == 2 && <span className="text-red-500">X</span>}
          </button>
          <button
            type="button"
            value={"22"}
            defaultValue={"22"}
            className="min-h-14 inline-block w-48 text-3xl font-bold  border-l-8"
            onClick={handleClick}
          >
            {matrix[2][2] == 1 && <span className="text-orange-600">O</span>}
            {matrix[2][2] == 2 && <span className="text-red-500">X</span>}
          </button>
        </div>
      </div>
      <div className="btn">
          <button type="button" className=" w-fit mt-12 px-4 py-2 text-white rounded-md  bg-blue-800 hover:bg-blue-800/50" onClick={resetFunc}>Reset</button>
      </div>
    </div>
  )
}

export default Pvcomputer