"use client";
import React from 'react'
import styles from './page.module.css';
import { useState } from 'react';
import { useRouter } from "next/navigation";

export default function TodoApp() {
    const router=useRouter();
    const [todos,setTodo]=useState([{name:"",isCheck:false}]);
    const [tempText,setTempText]=useState<string>();

    const [isCheck,setCheck]=useState([false]);
    
      const addTodo = (text:string|undefined,refresh: { (): void; (): void; }) => {
        let check=0;
        if(typeof text==='string')
        {  
            if(text==="")
            {  
                alert("Plz enter todos");
            }else if(todos.length>1) 
            { 
                for(let key in todos)
                {
                    if(todos[key].name===text)
                    {
                        check++;
                    }
                } 
                    if(check===0)
                    {
                    setTodo([...todos,{name:text,isCheck:false}]);
                    }else{
                        alert("Todo Already Exist");
                    }
            }else{
                setTodo([...todos,{name:text,isCheck:false}]);
            } 
            
            }
        refresh();
       };
    

       const deleteTodo = (index:number,refresh: { (): void; (): void; }) => {
        if(typeof index==='number'){
            todos.map((todo,id)=>{
                if(id===index){   
                    if(todo.isCheck){
                        todos.splice(id,1);
                    }else{
                        alert("Checkbox is unchecked, For delete first check it.")
                    }
                }
            });
        }
        refresh();
       };
        const updateTodo = (id:number,name:string,isCheckStatus:boolean,refresh: { (): void; (): void; }) => { 
        if(typeof isCheckStatus==='boolean'){
        let updateDate=[...todos];
        updateDate[id].isCheck=isCheckStatus;
        setTodo(updateDate);
        }
        refresh();
       };
       const deleteAllTodos=(refresh: { (): void; (): void; })=>{
        for(let key in todos){
            todos.splice(Number(key)+1);
        }
        refresh();
       };
       const modifyTodo=(name:string|undefined)=>{
            alert(name);
       };
    return (
    <div>
        <main>
        <h1 className='text-2xl bold'>To-Dodos</h1>
        <div style={{display:'flex'}}>
        <input className='round-lg  border' placeholder='Add Todo...' type="text" name="name"  onChange={(e)=>setTempText(e.target.value)} value={tempText}/> 
        <button className='w-1/6 round-lg border bg-indigo-300' onClick={()=>{
            addTodo(tempText,router.refresh);
            setTempText('');
        }}>Add</button>
        </div>
        <div>
        <ul>

            {todos.map((todo,index)=>{
                    return (
                        <li key={index}>
                          {index>0 ? <input type="checkbox" checked={todo.isCheck} onChange={(e)=>{
                            updateTodo(index,todo.name,e.target.checked,router.refresh);
                          } } /> : ""}
                          {index>0 ? <span>{todo.name}</span> : ""}
                          {index>0 ? <button className="className='w-1/5 round-lg border bg-indigo-300" onClick={()=> deleteTodo(index,router.refresh)}>Delete</button> : ""}          
                        </li> 
                    )
            })}
        </ul>
        <ul>
            <br />
        {todos.length>1 ? <button className="className='w-1/5 round-lg border bg-indigo-300" onClick={()=>deleteAllTodos(router.refresh)}>Delele All Todos</button> : ""}
        </ul>
        </div>
        </main>
        <div></div> 
    </div>
    
  )
}



