import "./video.scss";
export default function Video() {
  return (
    <>
      <section className="section-7">
        <div className="section-7-container">
          <h1>
            <span className="black">Don't Shop ❌, &nbsp;</span>
            <span className="orange">Adopt</span>
          </h1>

          <div className="video-container">
            <video
              src="vid.mp4"
              autoPlay
              loop
              muted
              className="centered-video"
            ></video>
          </div>
        </div>
      </section>
    </>
  );
}
