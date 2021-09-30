import React from "react";
import "./App.css";

import axios from "axios";


export const imageUp = async (file: any): Promise<any> => {
  const datas = new FormData();
  datas.append("file", file);
  const res = await axios({
    method: "POST",
    url: `https://whois.nomada.cloud/upload`,
    data: datas,
    headers: {
      "Content-Type": "application/json",
      nomada: "ZWEzMjU1ZmItMDM2MS00YmI4LWJkNzQtMzEwNTk5OGFkZTc1",
    },
  });
  console.log(res.data.actorName);
  return res.data.actorName;
};

const App = () => {
  const [file, setFile] = React.useState(null);
  const [actorName, setActorName] = React.useState(null);

  const onChange = (e: React.SyntheticEvent<EventTarget>): void => {
    const fileRef = (e.target as any).files[0];
    setFile(fileRef);
  };

  const onChange2 = (e: any): void => {
    setActorName(e);
  };

  return (
    <div
      className="App"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 300,
      }}
    >
      <h1>Analyze your Actor!!!</h1>
      <input type="text" placeholder="type the name" onChange={onChange2} />
      {`${actorName}`}
      <span>Or if you dont know him</span>
      <span>drop a photo!</span>
      <input type="file" onChange={onChange} />
      <button onClick={() => imageUp(file)}>Search</button>
    </div>
  );
};

export default App;
