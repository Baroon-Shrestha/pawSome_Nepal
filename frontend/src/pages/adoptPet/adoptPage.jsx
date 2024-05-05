import "./adoptPage.scss"

import Nav from "../../components/nav/nav"
import { useParams } from "react-router-dom"
import useFetchPetById from "../../hooks/useFetchPetById"
import { useCookies } from "react-cookie"
import { useState } from "react"
import axios from "axios"
import { ToastContainer, toast } from "react-toastify";
export default function AdoptPage(){

   const {id} = useParams()
   const petInfo = useFetchPetById(id)
   const [cookies, __] = useCookies("token");
   const [loading,setIsLoading] = useState(false)
   const [reason,setReason] = useState("")


   async function adoptPet(e) {
    e.preventDefault();
    try {
        setIsLoading(true);
        const response = await axios.post(
            `http://localhost:3000/petfinder/adopt/adoptpet/${id}`,
            { reason: reason }, // Send reason as part of an object
            {
                headers: {
                    authorization: cookies.token,
                },
            }
        );

        console.log(response);
        if (response.data.success === true) {
            toast.success('Pet details updated successfully');
            setIsLoading(false);
        }
    } catch (error) {
        
        toast.error(error?.response?.data?.message);
        setIsLoading(false);
    }
}


   
    return(
        <>
        <Nav/>
        <ToastContainer/>
        <div className="adopt_page_section">
            <div className="adopt_page_section_container">
                <h1>Adopt Pet</h1>
                <div className="img_container">
           { 
          petInfo?.image?.map((imgs)=>{
            return <img src = {imgs.url}></img>
          })
           }
                </div>
                <h2>{petInfo?.name}</h2>
                <textarea placeholder="Why do u want to adopt this pet?" onChange={(e)=>setReason(e.target.value)} value={reason}></textarea>
                <button className="btn" onClick={adoptPet}>Adopt</button>
            </div>
        </div>
        </>
    )
}