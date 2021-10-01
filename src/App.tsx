import React from "react";
import "./App.css";

import axios from "axios";

const App = () => {
  const [file, setFile] = React.useState(null);
  const [info2, setInfo2] = React.useState(null)

  const onChange = (e: React.SyntheticEvent<EventTarget>): void => {
    const fileRef = (e.target as any).files[0];
    setFile(fileRef);
  };

  const imageUp = async (file: any): Promise<any> => {
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

    const data = res.data.actorName;
    return infoActor(data)

  };

  const infoActor = async (nombre: string): Promise<any> => {
    const res = await axios({
      method: "GET",
      url: `https://api.themoviedb.org/3/search/person?api_key=30db1237b9167f8afaf9e065b90d16b8&language=en-US&query=${nombre}&page=1&include_adult=false`,
    });

    return setInfo2(res as any);
  };

  if (!info2) {
    return (
      <>
        <h1>No hay actor</h1>;
        <input type="file" onChange={onChange} />
        <button onClick={() => imageUp(file)}>Search</button>
      </>
    );
  } else {
    return <h1>{JSON.stringify(info2)}</h1>
  }
};

export default App;
