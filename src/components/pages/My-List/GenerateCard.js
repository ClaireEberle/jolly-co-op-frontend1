import React from 'react';
import API from "../../../utils/API";

const styleCard = {
    width: "18rem",
    margin: "10px"
}

function GenerateCard(props) {
    const platformArray = props.platform.split(',');
    const platformList = platformArray.map((element, index)=> {
        return <li className="list-group-item" key={index}>{element}</li>
    });

    const handleClick = (e) => {
        const gameID = e.target.getAttribute("data-game-id");
        API.deleteGame(gameID, localStorage.getItem("token")).then(data => console.log(data));
    }


    return (
        <div className="card" style={styleCard}>
            <img src={props.img} className="card-img-top" alt="Game Art"/>
            <div className="card-body d-flex flex-column justify-content-between align-items-center">
                <h5 className="card-title">{props.name}</h5>
                <p className="card-text">Available On</p>
                <ul className="list-group">
                    {platformList}
                </ul>
                <p className="card-text">Overall Rating: {props.rating}</p>
                <button type="button" className="btn btn-primary" data-game-id={props.id} onClick={handleClick}>Delete</button>
            </div>
        </div>
    );
  }
  
  export default GenerateCard;