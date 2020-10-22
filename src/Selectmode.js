import React from 'react'
import './Selectmode.css'

const Selectmode = (props) => {


    return (
        <div className='selectmode'>
            <div className='select__header'>
                <h1>Tic Tac Toe</h1>

            </div>
            <div className = 'select'>
                <div>
                    Choose your play mode
                </div>
                <button className='select__ai' onClick={() => props.select('AI')}>Play with AI</button>
                <button className='select__friend' onClick={() => props.select('FRIEND')}>Play with FRIEND</button>
            </div>
        </div>
    )
}

export default Selectmode
