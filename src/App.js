import MUIDataTable from "mui-datatables";
import './App.css';
import {createTheme,ThemeProvider} from '@mui/material/styles'
import { useEffect, useState } from "react";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
//import { alignProperty } from "@mui/material/styles/cssUtils";


const App = () => {
  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const [users,setUsers]=useState([]);
  const columns = [
    {
     "name": "id",
     label:"S.No",
    }, 
    {
      name:"name",
      label:"Name"
    },
    {
      name:"age",
      label:"Age"
    },

    {
      name:"gender",
      label:"Gender",
      
    
    
    options:{
      customBodyRender:
      (value)=> 
        <p className={`text-capitalize px-3 py-1 d-inline-block rounded-pill ${value === "male" ? "bg-primary" : "bg-danger"}`}>
      {value}
    </p>

      
    },
  },
  {
    align:"right",
    name:"email",
    label:"Email",
    
    
  
  
  options:{
    customBodyRender:
    (value)=> (
      <p className="text-capitalize px-2 py-1 d-inline-block rounded-pill ">
    {value}
  </p>
  

    ), 
    filter:false,
  },
},
{
  name: "bloodGroup",
  label: "Blood Group",
  
  
  options: {
    customBodyRender: (value, tableMeta, updateValue) => (
      <Select
        value={value || ""}
        onChange={(e) => {
          const newValue = e.target.value;
          updateValue(newValue); // Update the value in the table
          setUsers((prevUsers) =>
            prevUsers.map((user, index) =>
              index === tableMeta.rowIndex
                ? { ...user, bloodGroup: newValue }
                : user
            )
          );
        }}
        className="bg-gray-800 text-white rounded-md me-5"
      >
        {bloodGroups.map((group) => (
          <MenuItem key={group} value={group}>
            {group}
          </MenuItem>
        ))}
      </Select>
      
    ),
    filter:false,
    
  },
}
];

    
    
    
  // const data = [
  //   ["Joe James", "Test Corp", "Yonkers", "NY"],
  //   ["John Walsh", "Test Corp", "Hartford", "CT"],
  //   ["Bob Herm", "Test Corp", "Tampa", "FL"],
  //   ["James Houston", "Test Corp", "Dallas", "TX"],
  // ];

  useEffect(()=>{
    fetch("https://dummyjson.com/users")
    .then((res)=> res.json())
    .then((data) => {
      let local= data?.users.map((user)=>({
        ...user,
        name: `${user?.firstName} ${user?.lastName}`,
      }));
      setUsers(local);

      });
  },[]);
    
  

  const options = {
    selecableRows:false,
    elevation:0,
    rowperpage:5,
    rowsPerPageOptions:[5,10,20,30],

  };

  const getMuiTheme=()=>   createTheme({
    typogrphy:{
      fontFamily:"poppins",
    },
    palette:{
      background:{
        paper:"#1e293b",
        default:"#0f172a",
      },
      mode:"dark",
    },
    components:{
      MuiTableCell:{
        styleOverrides:{
          head:{
           padding:"10px 4px",

          },
        
        body:{
       padding:"7px 15px",
       color:"#e2e8f0",
        },
      },
      },
    },
    
    });
  

  return (
    <div className="bg-slate-700 py-24 min-h-screen grid place-items-center">
      <div className='w-10/12 max-w-4xl'>
      <ThemeProvider theme={getMuiTheme()}>
        {/* {users?.length} */}
      <MUIDataTable
          title={"Users List"}
          data={users}
          columns={columns}
          options={options}
        />

      </ThemeProvider>
        
      </div>
    </div>
  );
};

export default App;



