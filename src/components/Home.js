import React from "react";
import { Carousel } from 'react-responsive-carousel';
import { useHistory } from "react-router";
import '../index.css';





export default function Home(){

    const history = useHistory();
    const handleRouter = () =>{
        history.push("/Doctor")
    }


    return(
    <div class='bg' style={{backgroundImage:`url(https://t3.ftcdn.net/jpg/03/10/61/34/360_F_310613409_bBe2DBeScgbycqwWqPStJK1PREze0u9S.jpg)`, backgroundRepeat:"no-repeat", backgroundSize:"contain", width:"2000px", height:"700px"}}>
           <h2>Welcome to the </h2>
           
           <b>Check Room Uasge here </b><button onClick={handleRouter}> Click Here  </button>
    </div>)




}