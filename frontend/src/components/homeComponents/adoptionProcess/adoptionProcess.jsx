import "./adoptionProcess.scss"
export default function AdoptionProcess(){
    return(
        <>
         <section className="adoption_process_section">
        <div className="section_container">
            <div className="heading">
                <h1>Adoption <span>Process</span></h1>
                </div>

        
            
            <div className="card card_left">
                <div className="img_container">
                    <div className="dashed_circle"></div>
                    <img src="https://i.natgeofe.com/n/5ddbcc2d-efb4-4f23-99bf-fb9b57fdf34f/0000015e-58ca-d7de-a77f-7aff41080000_square.jpg"/>
                </div>
               
                <div className="card_description">
                    <h1>01</h1>
                   <h2>Choose Pet</h2>
                    <p>Choose the pet you want to adopt and check the details such as age, health,status and ask all
                        those questions you have so that this experiece is sucessful and wonderful.</p>
                </div>
            </div>

            <div className="card card_right">
                <div className="img_container">
                    <div className="dashed_circle"></div>
                    <img src="https://www.helpguide.org/wp-content/uploads/2023/02/Benefits-of-Pets.jpeg"/>
                </div>
               
                <div className="card_description">
                    <h1>02</h1>
                    <h2>Adoption Form</h2>
                    <p>Fill the information for the adoption process. </p>
                </div>
            </div>

            <div className="card card_left">
                <div className="img_container">
                    <div className="dashed_circle"></div>
                    <img src="https://static.foxbusiness.com/foxbusiness.com/content/uploads/2022/04/iStock-1324099927.jpg"/>
                </div>
              
                <div className="card_description">
                    <h1>03</h1>
                    <h2>Take your Pet Home</h2>
                    <p>After filling the information take your friendly companion to your home who will always acompany you in your journey.</p>
                </div>
            </div>
        </div>
    </section>

        </>
    )
}