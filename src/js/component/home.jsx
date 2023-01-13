//a

import React, { useState, useEffect, useRef } from "react";

const Home = () => {
  const [music, setMusic] = useState([]);
  const [sel, setSel] = useState(null);
  const [playing, setPlaying] = useState(null);
  const player = useRef(null);
  const [songName, setSongName] = useState("");

	const playStop = () => {
		if (playing) {
			player.current.pause();
			setPlaying(false);
		} else {
      setTimeout(() => {
        player.current.play();
        setPlaying(true);
      }, 100);
		}
	};

  const play = () => {
    setTimeout(() => {
      player.current.play();
      setPlaying(true);
    }, 100);
  }

const next = () => {
  for (let index = 0; index < music.length; index++) {
    if (
      "https://assets.breatheco.de/apis/sound/" + music[index].url ==
      sel
    ) {
      setSel(
        "https://assets.breatheco.de/apis/sound/" +
          music[index + 1].url
      );
      setSongName(music[index + 1].name)
      play();
    }
  }
};

const prev = () => {
  for (let index = 0; index < music.length; index++) {
    if (
      "https://assets.breatheco.de/apis/sound/" + music[index].url ==
      sel
    ) {
      setSel(
        "https://assets.breatheco.de/apis/sound/" +
          music[index - 1].url
      );
      setSongName(music[index - 1].name)
      play();
    }
  }
};

  useEffect(() => {
    fetch("https://assets.breatheco.de/apis/sound/songs") //1.ir a buscar info en la url
      .then((response) => response.json()) //2.Convierte la respuesta en un json
      .then((data) => setMusic(data)); //3. GUarda el json en un objeto data
  }, []); //cuando el array está vacio el va a cargar el codigo a ejecutar UNA vez cargada la pagina
  console.log(music);

  return (
    <>
      <div className="card mx-auto mt-4" style={{ width: 500, height:"fit-content"}}>
        <div className="card-header"><i className="fab fa-spotify"></i> Musictify</div>
        <div className="card-body">
		<div id="playIndex">
            <p className="mb-2 border-bottom border-secondary"><i class="fas fa-compact-disc"></i><strong> My Playlist</strong></p>
          </div>
          <div>
            <ol>
              {music.map((item) => (
                <li className="aSong border-bottom border-secondary" key={item.url} onClick={() => {setSel("https://assets.breatheco.de/apis/sound/" + item.url); play(); setSongName(item.name)}}>{item.name}</li>
              ))}
            </ol>
          </div>
          <div id="songCounter">
            <p className="m-0">Songs on playlist: {music.length}</p>
          </div>
        </div>
        <div className="card-footer">
        <div id="nowPlaying">
          <p className="mb-2 border-bottom border-secondary">Now playing: {songName}</p>
          </div>
          <div className="d-flex text-center justify-content-center">
          <audio ref={player} src={sel} />
          <i className="fas fa-chevron-circle-left" id="prev" onClick={prev}></i>
          {playing ? (
					<i className="fas fa-pause-circle mx-2" id="pause" onClick={playStop} />
				) : (
					<i className="fas fa-play-circle mx-2" id="play" onClick={playStop} />
				)}
          <i className="fas fa-chevron-circle-right" id="next" onClick={next}></i>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;