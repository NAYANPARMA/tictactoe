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
    const [firstturn , setAiturn] = useState(true)
    const [aiplay , setAiplay]  = useState(false)
    const winner = calculateWinner(history[stepNumber]);
    let xO 
    if(props.x){
        if(stepNumber%2 == 0){
            xO = 'X'
        } else {
            xO = 'O'
        }
    }
    if(props.o){
        if(stepNumber%2 == 0){
            xO = 'O'
        } else {
            xO = 'X'
        }
    }
    
    useEffect(() => {
        const setInitial = () => {
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
        return setInitial()
    }, [winner, props.x, props.o, props.mode])

    

    useEffect(() => {
        const setValue  = async() => {
            if(stepNumber%2 == 1 && stepNumber < 9){
                const human = props.x ? 'X' : 'O'
                const AI = human == 'X' ? 'O' : 'X'
                const index =  await bestMove(history[stepNumber], AI, human)
               // console.log(index);
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

    const jumpTo = async() => {
        await setStepNumber(0);
        if(props.x){
            setXisNext(true)
        } 
        if(props.o){
            // if(props.mode == 'AI' && stepNumber == 0){
            //    // console.log(stepNumber);
            //     setXisNext(true)
            // } else {
            //     setXisNext(false)
            // }
            setXisNext(false)
        }    
    }

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

                    (stepNumber == 9 && !winner) ? 'Tie' :  
                 winner ? "Winner: " + winner : "Next Player: " + xO}</h3>
        </div>
        </>
    );
}

export default Game
