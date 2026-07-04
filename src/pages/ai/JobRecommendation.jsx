import { useEffect, useState } from "react";
import api from "../../services/api";
import NavBar from "../../components/navBar";

function JobRecommendation(){

const [jobs,setJobs]=useState([]);

const [loading,setLoading]=useState(true);

useEffect(()=>{

loadRecommendations();

},[]);

const loadRecommendations=async()=>{

try{

const res=await api.get("/ai/recommendations");

setJobs(res.data.recommendations);

}

catch(err){

console.log(err);

}

finally{

setLoading(false);

}

};

return(

<>

<NavBar/>

<div className="max-w-6xl mx-auto mt-10">

<h1 className="text-4xl font-bold mb-8">

AI Job Recommendations

</h1>

{

loading?

<p>Loading...</p>

:

jobs.map((job,index)=>(

<div
key={index}
className="border rounded-lg shadow-md p-6 mb-6"
>

<h2 className="text-2xl font-bold">

{job.title}

</h2>

<p>

<b>Company:</b> {job.company}

</p>

<p>

<b>Match:</b>

<span className="text-green-600 font-bold">

 {job.matchScore}%

</span>

</p>

<p className="mt-3">

{job.reason}

</p>

</div>

))

}

</div>

</>

);

}

export default JobRecommendation;