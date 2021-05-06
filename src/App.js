import React, { useState } from "react";
import { AppleOutlined } from "@ant-design/icons";
import { create } from "apisauce";
import "./styles.css";

function App() {
  const language = navigator.language.split(/[-_]/)[1];
  const [songs, setSongs] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      fetchData();
    }
  };
  const fetchData = async () => {
    const api = create({
      baseURL: "https://itunes.apple.com/search",
      timeout: 30000,
    });
    api
      .any({
        method: "GET",
        params: { term: searchQuery, limit: 20, country: language },
      })
      .then((response) => {
        if (response.data) {
          if (response.data.results.length > 0) {
            setSongs(response.data.results);
          } else {
            alert("No songs Found for the Entered keywords");
          }
        } else {
          alert("No songs Found for the Entered keywords");
        }
      });
  };

  return (
    <div>
      <div className="App">
        <h1>
          <AppleOutlined className="main-heading" />
          iTunes
        </h1>

        <h2>Search songs and podcast by typing name below</h2>

        <input
          style={{
            width: "30%",
            height: "30px",
            marginBottom: "20px",
            fontSize: "larger",
            fontFamily: "cursive",
            border: "2px solid grey",
          }}
          placeholder="Search..."
          spellCheck="false"
          type="text"
          onKeyDown={handleKeyDown}
          onChange={(e) => {
            setSearchQuery(e.currentTarget.value);
          }}
          value={searchQuery}
        />

        <div>
          <button className="fetch-button" onClick={fetchData}>
            Search
          </button>
          <br />
        </div>

        <div className="songs">
          {songs &&
            songs.map((song, index) => {
              const releasedDate = new Date(song.releaseDate).toDateString();
              const artist = song.artistName;

              return (
                <div className="song" key={index}>
                  <a
                    href={song.trackViewUrl}
                    style={{
                      textDecoration: "none",
                      color: "currentColor",
                    }}
                  >
                    <div>
                      <img src={song.artworkUrl100} />
                      <h3>{song.collectionName} </h3>
                    </div>
                    <div className="details">
                      <p>Artists: {artist}</p>
                      <p>⏰ {releasedDate}</p>
                      {song.trackId && (
                        <p>
                          Track Id:
                          <a
                            href={song.trackViewUrl}
                            style={{
                              textDecoration: "none",
                              color: "black",
                            }}
                          >
                            {song.trackId}
                          </a>
                        </p>
                      )}
                    </div>
                  </a>

                  <a
                    href={song.trackViewUrl}
                    style={{ textDecoration: "none" }}
                  >
                    Listen
                  </a>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default App;
