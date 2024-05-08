// import "./slider.scss"
// export default function Slider(){
//     return(
//         <>
//         <section className="section-6">
//         <div className="section-6-container">
//             <div className="section-6-heading">
//                 <h1 className="heading">Title</h1>
//                 <h1 className="heading">Title</h1>
//             </div>

//             <div className="card-slider-container">

//                 <div className="slider-card left">
//                     <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates molestias ipsum ducimus
//                         accusantium dolor velit dolore odit, voluptatibus rem ad ipsam molestiae expedita. Ipsum, sequi
//                         voluptatibus sint sapiente ea enim. Nostrum commodi tempore provident officia dolorum deserunt
//                         neque obcaecati excepturi.
//                     </p>


//                     <div className="person-info">
//                         <img className="image-small-device" src="./images/toy-small.jpg"/>
//                         <div>
//                             <h1>1. Toy Story</h1>
//                             <p className="slider-card-label">LABEL</p>


//                         </div>

//                     </div>
//                 </div>

//                 <div className="slider-card active">
//                     <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates molestias ipsum ducimus
//                         accusantium dolor velit dolore odit, voluptatibus rem ad ipsam molestiae expedita. Ipsum, sequi
//                         voluptatibus sint sapiente ea enim. Nostrum commodi tempore provident officia dolorum deserunt
//                         neque obcaecati excepturi.
//                     </p>
//                     <div className="person-info">
//                         <img className="image-small-device" src="./images//mecha-small.jpg"/>
//                         <div>
//                             <h1>2. MechaMaru</h1>
//                             <p className="slider-card-label">LABEL</p>

//                         </div>

//                     </div>

//                 </div>



//                 <div className="slider-card right">
//                     <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates molestias ipsum ducimus
//                         accusantium dolor velit dolore odit, voluptatibus rem ad ipsam molestiae expedita. Ipsum, sequi
//                         voluptatibus sint sapiente ea enim. Nostrum commodi tempore provident officia dolorum deserunt
//                         neque obcaecati excepturi.
//                     </p>

//                     <div className="person-info">
//                         <img className="image-small-device" src="./images/yoda-small.jpg"/>
//                         <div>
//                             <h1>3. Baby Yoda</h1>
//                             <p className="slider-card-label">LABEL</p>

//                         </div>

//                     </div>
//                 </div>

//                 <div className="image-buttons">

//                     <img className="image-button" src="./images/toy-small.jpg"/>
//                     <img className="image-button active" src="./images//mecha-small.jpg"/>
//                     <img className="image-button" src="./images/yoda-small.jpg"/>


//                 </div>


//             </div>
//         </div>
//     </section>

//         </>
//     )
// }

import React, { useEffect } from 'react';
import "./slider.scss";

function Slider() {
    useEffect(() => {
        const imageButtons = document.querySelectorAll('.image-button');
        const sliderCards = document.querySelectorAll('.slider-card');

        imageButtons.forEach((button, index) => {
            button.addEventListener('click', () => {
                imageButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                sliderCards.forEach(card => card.classList.remove('active', 'left', 'right'));

                sliderCards[index].classList.add('active');
                sliderCards[(index - 1 + sliderCards.length) % sliderCards.length].classList.add('left');
                sliderCards[(index + 1) % sliderCards.length].classList.add('right');
            });
        });
    }, []); // Empty dependency array ensures this effect runs only once, similar to componentDidMount

    return (
        <section className="section-6">
            <div className="section-6-container">
                <div className="section-6-heading">
                    <h1 className="heading">What our Adopters Say?</h1>
                  
                </div>
                <div className="card-slider-container">
                    <div className="slider-card left">
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates molestias ipsum ducimus
                            accusantium dolor velit dolore odit, voluptatibus rem ad ipsam molestiae expedita. Ipsum, sequi
                            voluptatibus sint sapiente ea enim. Nostrum commodi tempore provident officia dolorum deserunt
                            neque obcaecati excepturi.
                        </p>


                        <div className="person-info">
                            <img className="image-small-device" src="https://lh4.googleusercontent.com/proxy/SYiZj04ZhL7Itm1TcbL3RiRuP1FNPPb2RN3lQqF2hAGmkKNMZN8M19sv1D6DJvYSOIykrXrHXYoj53rCWMkzSVRv9tOt6Mmz2D5TgO1APx2x0oCGRXKV039N6ejXm78AIw" />
                            <div>
                                <h1>Barun Pahari</h1>
                                <p className="slider-card-label">LABEL</p>


                            </div>

                        </div>
                    </div>

                    <div className="slider-card active">
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates molestias ipsum ducimus
                            accusantium dolor velit dolore odit, voluptatibus rem ad ipsam molestiae expedita. Ipsum, sequi
                            voluptatibus sint sapiente ea enim. Nostrum commodi tempore provident officia dolorum deserunt
                            neque obcaecati excepturi.
                        </p>
                        <div className="person-info">
                            <img className="image-small-device" src="./images//mecha-small.jpg" />
                            <div>
                                <h1>Sandhya Gole</h1>
                                <p className="slider-card-label">LABEL</p>

                            </div>
                        </div>

                    </div>



                    <div className="slider-card right">
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates molestias ipsum ducimus
                            accusantium dolor velit dolore odit, voluptatibus rem ad ipsam molestiae expedita. Ipsum, sequi
                            voluptatibus sint sapiente ea enim. Nostrum commodi tempore provident officia dolorum deserunt
                            neque obcaecati excepturi.
                        </p>

                        <div className="person-info">
                            <img className="image-small-device" src="./images/yoda-small.jpg" />
                            <div>
                                <h1>Snehya Shakya</h1>
                                <p className="slider-card-label">LABEL</p>

                            </div>

                        </div>
                    </div>

                    <div className="image-buttons">

                        <img className="image-button" src="https://lh4.googleusercontent.com/proxy/SYiZj04ZhL7Itm1TcbL3RiRuP1FNPPb2RN3lQqF2hAGmkKNMZN8M19sv1D6DJvYSOIykrXrHXYoj53rCWMkzSVRv9tOt6Mmz2D5TgO1APx2x0oCGRXKV039N6ejXm78AIw" />
                        <img className="image-button active" src="https://static.vecteezy.com/system/resources/thumbnails/033/662/051/small_2x/cartoon-lofi-young-manga-style-girl-while-listening-to-music-in-the-rain-ai-generative-photo.jpg" />
                        <img className="image-button" src="https://img.freepik.com/premium-vector/young-girl-anime-style-character-vector-illustration-design-manga-anime-girl-hair-faces-cartoon_147933-1139.jpg?w=360" />


                    </div>


                </div>
            </div>
        </section>
    );
}

export default Slider;
