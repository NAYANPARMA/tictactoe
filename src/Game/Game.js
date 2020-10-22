import React , {useState, useEffect}from 'react'
import Board from '../Board/Board';
import { calculateWinner , bestMove} from '../helper';
import '../App.css'

const Game = (props) => {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setXisNext] = useState(true);
    const [countx, setCountx] = useState(0);
     const [counto, setCounto] = useState(0);

    const [aiplay , setAiplay]  = useState(false)
    const winner = calculateWinner(history[stepNumber]);
    let xO = (stepNumber < 9 && ! winner) ? xIsNext ? "X" : "O" : 'tie'
    
    useEffect(() => {
        const setcount = () => {
            if(winner == 'X'){  
                let count = countx;
                count = count + 1;
                setCountx(count)
            }
             if(winner == 'O'){  
                let count = counto;
                count = count + 1;
                setCounto(count)
            }
            if(props.x){
                setXisNext(true)
            } 
            if(props.o){
                setXisNext(false)
            }

            if(props.mode == 'AI'){
                setAiplay(true)
            }
        }
        return setcount()
    }, [winner, props.x, props.o, props.mode])


    useEffect(() => {
        const setValue  = async() => {
            if(!xIsNext && stepNumber < 9){
                const index =  await bestMove(history[stepNumber], 'O', 'X')
                console.log(index);
                document.getElementById('button'+index).click();
            }
        }
        if(aiplay){
            setValue()
        } else {
            return 
        }
    },[aiplay, history[stepNumber]])

    const handleClick = (i) => {
        if(!xIsNext){
            //console.log(i);
        }
        const historyPoint = history.slice(0, stepNumber + 1);
        const current = historyPoint[stepNumber];
        const squares = [...current];
        if (winner || squares[i]) {
            return;
        }
        squares[i] = xO;
        setHistory([...historyPoint, squares]);
        setStepNumber(historyPoint.length);
        setXisNext(!xIsNext);
    };

    const jumpTo = () => {
        setStepNumber(0);
        if(props.x){
            setXisNext(true)
        } 
        if(props.o){
            setXisNext(false)
        }    
    }

    const renderMoves = () =>
        history.map((_step, move) => {
        const destination = move ? `Go to move #${move}` : "Play Again";
        return (
            <li key={move}>
            <button onClick={() => jumpTo(move,destination)}>{destination}</button>
            </li>
        );
        });

    return (
        <>
        <h1>Tic Tac Toe</h1>
        <div className='game__players'>
            <div className='game__left'>
                <h2>Player X</h2>
            </div>
             <div className='game__middle'>
                <div className='left__point'>
                    <h2>{countx}</h2>
                </div>
                <div className='right__point'>
                    <h2>{counto}</h2>
                </div>
            </div>
             <div className='game__right'>
                <h2>Player O</h2>
            </div>
        </div>
        <Board squares={history[stepNumber]} clicked={handleClick} />
        <div className="info-wrapper">
            <div>
            <button onClick={() => jumpTo()}>Play Again</button>
            </div>
            <h3>{

                    (stepNumber == 9 && !winner) ? 'tie' :  
                 winner ? "Winner: " + winner : "Next Player: " + xO}</h3>
        </div>
        </>
    );
}

export default Game
