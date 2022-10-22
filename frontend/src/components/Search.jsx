import React, { useState } from 'react'

export const Search = () => {

    const [query, setQuery] = useState("");
    const [result, setResult] = useState([]);

    async function getResults(){
            try{
         
            const response = await fetch(`http://localhost:8000/search?term=${query}`,{
                    method:'GET',
            });
        
            const data = await response.json();
            console.log(data.Result);
            setResult(data.Result);
            
            console.log(data.Result, typeof data.Result);
        }
        catch(error){
            console.log(error);
        }
    }

  return (

    <>
    <h1>Search</h1>
    <input type="text" className='shadow mt-2' onChange={(e)=>{ setQuery(e.target.value)}}/> 
    <button type='button' onClick={getResults} className='btn mx-2 btn-secondary'>Search🔍</button>
    <h4 className='mt-5'>Result</h4>

    <div className="container text-center m-5">
        <div className="row row-cols-auto">
        { 
        
        result?.map((item)=>{
                return(
                    
                <div className="col" key={item._id}>
                <div className="card text-bg-info mb-3" style={{width: "18rem"}}>
                <img src={item.imageUrl} alt="image" class="imgFluid" /> 
                    <div className="card-body">
                        <h4 className="card-title text-light">{item.companyId.name}</h4>
                        <h6 className="card-title">{item.headline}</h6>
                        <p className="card-text">{item.description}</p>
                        <p className="card-text">{item.primaryText}</p>
                        <button href="#" className="btn btn-primary">{item.CTA}</button>
                        <a href={item.companyId.url} className="btn ml-2 btn-success">Visit</a>
                    </div>
                </div>
                </div>

                )
            })

        }
        </div>
    </div>
    </>
  )
}
