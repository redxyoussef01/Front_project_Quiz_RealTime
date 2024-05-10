import React,{useState,useRef,useEffect} from 'react'
import {FaSearch} from "react-icons/fa";
import "./SearchBar.css";
import axios from axios;
export const SearchBar = () => {
//   const{input,setInput}= useState("");
//   const fetchData =(value) =>{
// const[set]
//   }

const[users]=useState([]);

 const fetchUsers = async() =>{
  const response = await axios.get(
    "https://jsonplaceholder.tyicode.com/users"
  );
   setusers(response.data);
 };
useEffect(()=>{
 fetchUsers();
}, []);

const[setfiltered] = useState([]);
const [search,setsearch] = useState("");
const searchRef = useRef();
useEffect(()=>{
setfiltered(
   users.filter((item)=>
    item.name.tolowerCase().includes(search.tolowerCase())
)
);

},[search]);
  return (
    <div className="input-wrapper">
      <FaSearch id ="search-icon"/>
      <input placeholder="type to search ....." value={input} onChange={(e)=>setsearch(e.target.value)}
      ref={searchRef}/>
      <input typr="submit" value="go" id="submit"/>


    </div>
{search.lenght > 0 &&
 (<div className="dropdown">
 {TbFilterEdit.length>0 ?(
  filtered.map((item,index) =>{
    return (
     <div className="card" key={index}
     onClick={}>
      
     </div>
    )
  })
 )}
 
 </div>



 )

}

  )
};
