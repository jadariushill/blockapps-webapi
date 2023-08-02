import "./App.css";
import { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";
import AnalogClock from "analog-clock-react";

let options = {
  width: "300px",
  border: true,
  borderColor: "#ffffff",
  baseColor: "#17a2b8",
  centerColor: "#459cff",
  centerBorderColor: "#ffffff",
  handColors: {
    second: "#d81c7a",
    minute: "#ffffff",
    hour: "#ffffff",
  },
};

function App() {
  const [tagName, setTagName] = useState("");
  const [buttonIsActive, setButtonIsActive] = useState(true);
  const [releaseDateInfo, setReleaseDateInfo] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const handleInput = (e) => {
    setError(null);
    setTagName(e.target.value);
    if (e.target.value == null || !e.target.value.trim()) {
      setButtonIsActive(false);
    } else {
      setButtonIsActive(true);
    }
  };

  const handleClick = () => {
    setLoading(true);
    getReleaseDate(tagName)
      .then(({ creationDate, errorMsg }) => {
        setError(errorMsg);
        if (!errorMsg && creationDate) {
          setReleaseDateInfo(
            `The release tagged with ${tagName} was created ${creationDate}`
          );
        }
      })
      .catch(setError);
    setLoading(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>BlockApps Release WebAPI</h1>
        <AnalogClock {...options} />
        <div className="Input-holder">
          <TextField
            placeholder="Enter a tag name"
            id="outlined-error"
            variant="filled"
            sx={{ input: { color: "white" } }}
            style={{ width: "45vh" }}
            helperText={error}
            error={error != null}
            onInput={handleInput}
            value={tagName}
          ></TextField>
          <LoadingButton
            disabled={!buttonIsActive}
            onClick={handleClick}
            loading={isLoading}
            variant="contained"
          >
            Submit
          </LoadingButton>
        </div>
        <p>{releaseDateInfo}</p>
      </header>
    </div>
  );
}

const getReleaseDate = (tagName) => {
  let url = "http://localhost:3000/release";
  return new Promise((resolve, reject) => {
    fetch(url.concat(`/?tagName=${tagName}`))
      .then((resp) => resp.json().then(resolve))
      .catch((err) => {
        reject("Something went wrong. Please try again later. :(");
      });
  });
};

export default App;
