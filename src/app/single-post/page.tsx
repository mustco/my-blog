"use client"
import { useEffect, useState } from "react"
import { useContext, createContext } from "react"


const ThemeContext = createContext({theme: "light", toggleTheme: () => {}});

export default function SinglePost() 
{
    const [theme, setTheme] = useState("light");
    const toggleTheme =()=>{
        setTheme((prevTheme)=>(prevTheme==="light"?"dark":"light"))
    }
    return (
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <ThemeSwitcher />
      </ThemeContext.Provider>
    );
}

const ThemeSwitcher = () => {
  // Mengakses theme dan toggleTheme dari ThemeContext
  const {theme, toggleTheme} = useContext(ThemeContext);
  console.log(theme)
  console.log(toggleTheme)

  return (
    <div
      style={{
        background: theme === "light" ? "white" : "black",
        color: theme === "light" ? "black" : "white",
      }}
    >
    <p>Theme: {theme}</p>

    <button onClick={toggleTheme}>Change Theme</button>
    </div>
  );
};


// const Timer=()=>{
//     const [seccond, setSeccond]=useState(0)
//     useEffect(()=>{
//         const interval = setInterval(()=>{
//             setSeccond((prev) => prev+1)
//         },1000)

//         return ()=>clearInterval(interval)
//     })
    
//     return(
//         <p>Seccond:{seccond}</p>
//     )
// }


// const LoginForm=()=>{
//     const [username, setUsername] = useState("")
//     const [password, setPassword] = useState("")

//     const handleSubmit=(e:any)=>{
//        e.preventDefault();
//         console.log(username)
//         console.log(password)

//     }
//     const handleChange=(e:any)=>{
//         setUsername(e.target.value)
//     }
//     return(
//         <div>
//             <form onSubmit={handleSubmit}>
//                 <input name="username" type="text" placeholder="username" onChange={(e)=>setUsername(e.target.value)} value={username}/>
//                 <input name="password" type="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)} value={password}/>
//               <button>Submit</button>
//             </form>
//         </div>
//     )
    
// }


// type Todo ={
//     id:number,
//     task:string,
//     progress:string
// }
// const TodoList = ({todos}:{todos:Todo[]}) => {
//         return (
//           <ul>
//             {todos.map((todo) => (
//               <li key={todo.id}>{todo.task} | {todo.progress}</li>
//             ))}
//           </ul>
//         );
// }

// const UserStatus=({isLoggedIn}:{isLoggedIn:boolean})=>{
//     const [isLoggedInn, setIsLoggedd] =useState(false);
//     return(
//         <>
//         {isLoggedIn?(
//             <p>Welcome Back!</p>
//         ):(
//             <p>Please LogIn!</p>
//         )}
//         </>
//     )
// }

// function ToggleButton() {
//     const [isOn, setIsOn] = useState(false);

//     return(
//         <button onClick={()=>setIsOn(!isOn)}>{isOn?"ON":"FALSE"}</button>
//     )
// }


// const Counter=()=> {
//     const [count, setCount] = useState(0);
//     return(
//         <div>
//             <p>Count:{count}</p>
//             <button onClick={()=>setCount(count+1)}>+</button>
//             <button onClick={()=>setCount(count-1)}>-</button>
//         </div>
//     )
// }


// const Greeting =({name}:{name:string})=> {
//     return(
//         <h1>Helo {name}, Saya Programmer Senior Fullstack</h1>
//     )
// }   

// function Card({title,children}:{title:string,children:React.ReactNode}) {
//     return(
//         <div>
//             <h2>{title}</h2>
//             <div>
//                 {children}
//             </div>
//         </div>
//     )
// }