import React from "react";
 const MemoizedComponent = React.memo(({ data }: { data:any[] }) => {
      console.log("MemoizedComponent rendered");
   console.log(data);
   return (
    <div className="bg-indigo-100">
      {data.map((item: any) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
)
 });

export default MemoizedComponent;
