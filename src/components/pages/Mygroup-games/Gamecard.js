import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../../../utils/API";
import Button from "react-bootstrap/Button";

function Gamecard(props) {
  const params = useParams();
  //Vote of a game
  const [vote, setVote] = useState(0);
  const [usergamevote, setUsergamevote] = useState(false);
  const [usergroupvote, setUsergroupvote] = useState(false);
  const [winner, setWinner] = useState();

  // const platformList = props.platform.map((element, index)=> {
  //     return <li className="list-group-item" key={index}>{element}</li>
  // });

  //find how many votes has this user voted for this game, Maxiam 1

  const findWinner = () => {
    const winnerIdArray = props.countVote()
    if (winnerIdArray.includes(props.id)) {
      setWinner(true);
      // console.log("game:" + props.id);
      // console.log(winner);
    }else{
      setWinner(false)
    }
  };

  const fetchGameVoteofaUser = () => {
    API.countVotesofaUserofaGame(
      params.id,
      props.userId,
      props.id,
      props.token
    ).then((data) => {
      if (data.count == 1) {
        // console.log("---------------------")
        setUsergamevote(false);
      } else {
        setUsergamevote(true);
      }
    });
  };

  //find how many votes has this user voted in this group, Maxiam 2
  const fetchGameVoteofaUserinGroup = () => {
    API.countVotesofaUserinaGroup(params.id, props.id, props.token).then(
      (data) => {
        // console.log(data)
        if (data.count == 2) {
          setUsergroupvote(false);
        } else {
          setUsergroupvote(true);
        }
      }
    );
  };

  const createVote = () => {
    const voteObj = { GameId: props.id };
    API.createVoteInaGroup(params.id, voteObj, props.token).then((data) => {
      // console.log(data);
      if (!data.msg) {
        setVote(vote + 1);
      }
    });
  };
  const deleteVote = () => {
    const voteObj = { GameId: props.id };
    API.deteleaGroup(params.id, voteObj, props.token).then((data) => {
      if(data.msg == "the vote has been deleted"){
        setVote(vote - 1);
      }
    });
  };

  const fetchGameVote = () => {
    API.countVotesofaGame(params.id,props.id,  props.token).then((data) => {
      console.log(data)
      setVote(data.length)
    });
  };

  useEffect(() => {
    fetchGameVote();
  }, []);

  useEffect(() => {
    fetchGameVoteofaUserinGroup();
    fetchGameVoteofaUser();
  }, [vote]);

  // useEffect(() => {
  //   winnerMachine();
  // }, [checkvote]);

  return (
    <div className="box">
      <div className="card">
        <img src={props.img} className="card-img-top" alt="Game Art" />
        <div className="card-body d-flex flex-column justify-content-between align-items-center">
          <h5 className="card-title">{props.name}</h5>
          <p className="card-text">Available On:</p>
          <ul className="list-group">{props.platforms}</ul>
          <p className="card-text">Overall Rating: {props.rating}</p>
          {usergamevote ? (
            <button
              type="button"
              onClick={() => createVote()}
              className="btn btn-primary"
            >
              👆🏼 Vote
            </button>
          ) : (
            //call fakevote
            <Button onClick={() => deleteVote()} variant="danger">
              👇🏼 Cancle
            </Button>
          )}
          <br></br>
          <p>⛳️ Current: {vote}</p>
        </div>
      </div>
    </div>
  );
}

export default Gamecard;
