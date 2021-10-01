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

export const getActorInfo = async (name: string): Promise<any> => {
  const res = await axios({
    method: "GET",
    url: `https://api.themoviedb.org/4/list/1`,
    headers: {
      "Content-Type": "application/json",
      headers: {
        Authorization: `Bearer 30db1237b9167f8afaf9e065b90d16b8`,
      },
    },
  });
  console.log(res.data.actorName);
  return res.data.actorName;
};

const App = () => {
  const [file, setFile] = React.useState(null);
  const [nombreActor, setNombreActor] = React.useState(null);
  //const [actorName, setActorName] = React.useState(null);

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

    return setNombreActor(res.data.actorName);
  };

  if (!nombreActor) {
    return (
      <>
        <h1>No hay actor</h1>;
        <input type="file" onChange={onChange} />
        <button onClick={() => imageUp(file)}>Search</button>
      </>
    );
  } else {
    return <h1>{nombreActor}</h1>;
  }

  // return (
  //   <div
  //     className="App"
  //     style={{
  //       display: "flex",
  //       flexDirection: "column",
  //       justifyContent: "center",
  //       padding: 300,
  //     }}
  //   >
  //     <h1>Analyze your Actor!!!</h1>
  //     {`${nombreActor} <===============`}
  //     <span>Or if you dont know him</span>
  //     <span>drop a photo!</span>
  //     <input type="file" onChange={onChange} />
  //     <button onClick={() => imageUp(file)}>Search</button>
  //   </div>
  // );
};

export default App;
