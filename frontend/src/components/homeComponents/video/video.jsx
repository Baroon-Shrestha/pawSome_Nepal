import "./video.scss";
export default function Video() {
  return (
    <>
      <section className="section-7">
        <div className="section-7-container">
          <div className="video-container">
            <video controls className="video video-one">
              <source src="../happy.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            <video controls className="video video-two">
              <source src="../happy.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          <div className="cards_container">
            <div className="cards">
              <div className="card">
                <img src="../cat1.jpg"></img>
              </div>

              <div className="card">
                <img src="../cat1.jpg"></img>
              </div>

              <div className="card">
                <img src="../cober.jpg"></img>
              </div>

              <div className="card">
                <img src="../cat1.jpg"></img>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
