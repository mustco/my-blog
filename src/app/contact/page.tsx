"use client"
import React, { useState } from "react";
import MemoizedComponent from "./ChildrenComponent";

const data = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
];

const App = () => { 
  const [count, setCount] = useState(0);

  console.log("App component rendered");

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <MemoizedComponent data={data} />
    </div>
  );
};

export default App;
