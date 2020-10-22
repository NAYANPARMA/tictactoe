import React from 'react'
import Square from '../Button/Square'
import './Board.css'


const Board = (props) => {
    

    return (
        <div className='board'>
        {  props.squares.map((square,i) => {
           return <Square key={i} id={i} value={square} clicked={() => props.clicked(i)}/>
        })

        }
            
        </div>
    )
}

export default Board
