
import { useEffect, useState } from 'react';
import './App.css';
import {MdClose,MdEdit} from 'react-icons/md'
import {AiFillDelete} from 'react-icons/ai'
import axios from 'axios'

axios.defaults.baseURL="http://localhost:8080/"
function App() {
const [edit,setEdit]=useState(false) 
const handleOnchange = (e) => {
  const { value, name } = e.target;
  setAddData((prev) => ({ ...prev, [name]: value }));
};


const handleSubmit = async (e) => {
  e.preventDefault();
  const datas = await axios.post("/create", addData);

  if (datas.data.success) {
    setSecAdd(false);
    alert(datas.data.message);
    getFetchData();
    setAddData({
      name: "",
      desc: "",
    });
  }
};
  const [addData, setAddData] = useState({
    name: "",
    desc: "",
  });
  
  const [editData, setEditData] = useState({
    name: "",
    desc: "",
    _id: "",
  });
  

const [dataList,setList]=useState([])
  const getFetchData=async()=>{
    const datas=await axios.get("/")
    // console.log(datas)
    if(datas.data.success){
     setList(datas.data.data)
     
    }
  }
useEffect(()=>{
  getFetchData()
},[])
  const [secAdd,setSecAdd]=useState(false)

  const handleDelete=async(id)=>{
    const datas=await axios.delete("/delete/"+id)

if(datas.data.message){
  getFetchData()
  alert(datas.data.message)
}
  }
 

const handleEditchange = async (e) => {
  const { value, name } = e.target;
  setEditData((prev) => ({ ...prev, [name]: value }));
};


const handleUpdate = async (e) => {
  e.preventDefault();
  const data = await axios.put("/update", editData);

  if (data.data.success) {
    getFetchData();
    alert(data.data.message);
  }
};


const handleEdit=(key)=>{
  
    setEdit(true)
    setEditData(key)
  }


 return (
    <div>
    <div class="bg-gradient-to-r from-sky-400 to-indigo-950 w-full h-48 flex justify-center items-center">
      <div class="text-center">
      <h1 class="text-xl font-bold text-white mb-3 bg-opacity-70  px-3 inline-block">Welcome to</h1>
    <h2 class="text-3xl font-extrabold text-white tracking-wide">TechHive Nest</h2>
    <p class="mt-1 text-xl text-white">Explore the world of Bibilophile</p>
      </div>
    </div>
    <div class="flex justify-center mt-10"> {/* Add mt-10 class for margin-top */}
      <button
        className="block mt-12 mx-auto mb-8 md:inline-block md:mx-4 my-5 px-6 py-3 bg-gradient-to-r from-sky-400 to-indigo-950 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition duration-300 mt-[-50px] md:mt-0 cursor-pointer"
        onClick={() => setSecAdd(true)}
      >
        Add
      </button>
    </div>
  {
  secAdd && (
    <div className='fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50 bg-black bg-opacity-50'>
      <form  className="w-[420px] bg-white flex flex-col p-[45px] shadow-sm rounded-md" onSubmit={handleSubmit}>
        <div  className="ml-auto text-lg w-[20px] h-[20px] flex justify-center align-middle rounded-2xl border border-1 border-solid border-slate-950" onClick={() => setSecAdd(false)}>
          <MdClose />
        </div>
        <label className=' text-lg' htmlFor="name">name:</label>
        <input className='text-lg p-[5px] border-[2px] rounded-lg bg-white shadow-md resize-none'
          type="text"
          id="name"
          name="name"
          onChange={handleOnchange}
          value={addData.name}
        />
        <label className=' text-lg' htmlFor="desc">Description</label>
        <textarea
          className="text-lg p-[5px] border-[2px] rounded-lg bg-white shadow-md resize-none"
          type="text"
          id="desc"
          name="desc"
          onChange={handleOnchange}
          value={addData.desc}
        />
        <button className="bg-gradient-to-r from-sky-400 to-indigo-950 h-12 rounded text-slate-50 font-medium mt-5">submit</button>
      </form>
    </div>
  )
}

{
  edit && (
    <div className='fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50 bg-black bg-opacity-50'>
      <form className="w-[420px] bg-white flex flex-col p-[45px] shadow-sm rounded-md" onSubmit={handleUpdate}>
        <div className="ml-auto text-lg w-[20px] h-[20px] flex justify-center align-middle rounded-2xl border border-1 border-solid border-slate-950" onClick={() => setEdit(false)}>
          <MdClose />
        </div>
        <label className=' text-lg' htmlFor="name">name:</label>
        <input className='text-lg p-[5px] border-[2px] rounded-lg bg-white shadow-md resize-none'
          type="text"
          id="name"
          name="name"
          onChange={handleEditchange}
          value={editData.name}
        />
        <label className=' text-lg' htmlFor="desc">Description</label>
        <textarea
          className="text-lg p-[5px] border-[2px] rounded-lg bg-white shadow-md resize-none"
          id="desc"
          name="desc"
          onChange={handleEditchange}
          value={editData.desc}
        />
        <button className="bg-gradient-to-r from-sky-400 to-indigo-950 h-12 rounded text-slate-50 font-medium mt-5">submit</button>
      </form>
    </div>
  )
}

 <div className="w-full md:w-[800px] p- bg-black bg-opacity-10 border-double hover:text-black border-black border-l-[1px] border-r-[1px] border-b-[1px] border-opacity-20 border-t-[1px] rounded-[10px] z-10 backdrop-blur-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 mt-8"></h2>
      {dataList.length > 0 ? (
        dataList.map((key) => (
          <div
            key={key._id}
            className="p-4 rounded-md mb-8 mx-4 bg-indigo-950  transition-[0.5s]"
          >
           <p className="text-2xl text-white font-semibold">{key.name}</p>

            <p className="text-white text-lg ">{key.desc}</p>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mt-4">
              <button
                onClick={() => handleEdit(key)}
                className="flex items-center justify-center bg-sky-600 text-white px-4 py-2 rounded hover:bg-slate-500 transition-colors text-sm md:text-base w-full md:w-auto"
              >
                <MdEdit className="mr-2" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => handleDelete(key._id)}
                className="flex items-center justify-center bg-red-500 text-white px-4 py-2 rounded hover:bg-slate-500 transition-colors text-sm md:text-base w-full md:w-auto"
              >
                <AiFillDelete className="mr-2" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-lg pb-6 text-center font-bold">No data available</p>

      )}
    </div>
    
     
    </div>
    
  );
}

export default App;
