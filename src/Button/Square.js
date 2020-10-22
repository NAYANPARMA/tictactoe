import React from 'react'
import './Square.css'

const Square = (props) => {
    const style = props.value ? `squares ${props.value}` : `squares`;
    const id = 'button'+props.id
    return (
        <button className={style} onClick={props.clicked} id={id}>
            {props.value}
        </button>
    )
}

export default Square
