// import React, { useEffect, useState } from 'react';
// import api from '../api';
// import { useParams } from 'react-router-dom';

// export default function Recipe(){
//   const { id } = useParams();
//   const [r,setR] = useState(null);

//   useEffect(()=>{ api.get(`/api/recipes/${id}`).then(res=>setR(res.data)).catch(console.error); },[id]);

//   if(!r) return <div>Loading...</div>;

//   return (
//     <div className="max-w-3xl">
//       <h1 className="text-3xl font-bold mb-3">{r.title}</h1>
//       {r.image && <img src={r.image} alt="" className="w-full rounded mb-4 object-cover max-h-96" />}
//       <h3 className="font-semibold">Ingredients</h3>
//       <ul className="list-disc ml-6 mb-4">{(r.ingredients||[]).map((it,i)=><li key={i}>{it}</li>)}</ul>
//       <h3 className="font-semibold">Instructions</h3>
//       <p className="whitespace-pre-line">{r.instructions}</p>
//     </div>
//   );
// }
