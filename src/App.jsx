import React, { useRef, useState } from "react"
import Countdown from "./components/Countdown.jsx"
import RSVPForm from "./components/RSVPForm.jsx"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { FaInstagram, FaFacebook, FaPlay, FaPause } from "react-icons/fa"
import "./index.css"

const WEDDING_DATE = "2025-09-13T14:00:00+08:00"

const photos = [
  `${import.meta.env.BASE_URL}gallery/photo1.jpg`,
  `${import.meta.env.BASE_URL}gallery/photo2.jpg`,
  `${import.meta.env.BASE_URL}gallery/photo3.jpg`,
  `${import.meta.env.BASE_URL}gallery/photo4.jpg`,
]

function Section({ id, title, children }) {
  return (
    <section id={id} className="section">
      <div className="container">
        {title && <h2 className="section-title">{title}</h2>}
        {children}
      </div>
    </section>
  )
}

export default function App() {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  const toggleMusic = () => {
    if (!audioRef.current) return
    if (playing) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setPlaying(!playing)
  }

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: false,
  }

  return (
    <>
      {/* Background Overlay */}
      <div className="background-overlay"></div>

      {/* Navigation */}
      <nav className="nav">
        <div className="container nav-inner">
          <div className="brand">Romwen & Jenena</div>
          <div className="menu">
            <button className="btn" onClick={() => scrollTo("entourage")}>Entourage</button>
            <button className="btn" onClick={() => scrollTo("gallery")}>Gallery</button>
            <button className="btn" onClick={() => scrollTo("venue")}>Venue</button>
            <button className="btn" onClick={() => scrollTo("attire")}>Attire</button>
            <button className="btn" onClick={() => scrollTo("notes")}>Notes</button>
            <button className="btn primary" onClick={() => scrollTo("rsvp")}>RSVP</button>
          </div>
        </div>
      </nav>

      {/* Hero / Cover */}
      <header className="hero">
        <div className="container">
          <img src={`${import.meta.env.BASE_URL}cover.jpg`} alt="Wedding Cover" className="wedding-photo" />
          <div className="card countdown-card">
            <h3 className="h3">Countdown to our Wedding Day</h3>
            <Countdown to={WEDDING_DATE} />
          </div>

          {/* Background Music */}
          <audio ref={audioRef} loop>
            <source src={`${import.meta.env.BASE_URL}music.mp3`} type="audio/mpeg" />
          </audio>
        </div>
      </header>

      {/* 🎵 Spotify-like Music Player */}
<div className="music-player">
  <audio ref={audioRef} loop>
    <source src={`${import.meta.env.BASE_URL}music.mp3`} type="audio/mpeg" />
  </audio>

  <div className="music-player-inner">
    {/* Left side: Cover thumbnail */}
    <img
      src={`${import.meta.env.BASE_URL}cover.jpg`}
      alt="Album Art"
      className="music-cover"
    />

    {/* Middle: Song Info + Bars */}
    <div className="music-info">
      <div className="music-title">Mr. & Mrs. Dela Cruz</div>
      <div className="music-artist">Romwen & Jenena</div>
      {playing && (
        <div className="music-bars">
          <span className="bar"></span>
          <span className="bar delay-100"></span>
          <span className="bar delay-200"></span>
        </div>
      )}
    </div>

    {/* Right side: Controls */}
    <button
      onClick={toggleMusic}
      className="music-btn"
    >
      {playing ? <FaPause size={18} /> : <FaPlay size={18} />}
    </button>
  </div>
</div>

      {/* Love Story */}
      <Section id="love-story">
        <div className="card">
          <img src={`${import.meta.env.BASE_URL}lovestory.jpg`} alt="Our Love Story" className="portrait-photo" />
        </div>
      </Section>

      {/* Entourage */}
      <Section id="entourage" title="ENTOURAGE">
        <div className="card entourage-grid">
          <img src={`${import.meta.env.BASE_URL}entourage1.jpg`} alt="Entourage 1" className="portrait-photo" />
          <img src={`${import.meta.env.BASE_URL}entourage2.jpg`} alt="Entourage 2" className="portrait-photo" />
        </div>
      </Section>

      {/* Gallery */}
      <Section id="gallery" title="PHOTO GALLERY">
        <div className="gallery-wrapper">
          <Slider {...sliderSettings}>
            {photos.map((src, idx) => (
              <div key={idx} className="gallery-slide">
                <img src={src} alt={`Wedding photo ${idx + 1}`} className="gallery-photo" />
              </div>
            ))}
          </Slider>
        </div>
      </Section>

      {/* Venue */}
      <Section id="venue" title="DETAILS">
        <div className="card" style={{ textAlign: "center" }}>
          <img src={`${import.meta.env.BASE_URL}detailstop.jpg`} alt="Details Top Photo" className="portrait-photo" />
        </div>
        <div className="grid grid-2">
          <div className="card">
            <a href="https://maps.app.goo.gl/MR4vQmo22zGNLED98" target="_blank" rel="noopener noreferrer">
              <img src={`${import.meta.env.BASE_URL}ceremony.jpg`} alt="Ceremony Venue" className="detail-photo" />
            </a>
          </div>
          <div className="card">
            <a href="https://maps.app.goo.gl/7ffoXkKtSs7Qb4HQA" target="_blank" rel="noopener noreferrer">
              <img src={`${import.meta.env.BASE_URL}reception.jpg`} alt="Reception Venue" className="detail-photo" />
            </a>
          </div>
        </div>
      </Section>

      {/* Attire */}
      <Section id="attire" title="ATTIRE">
        <div className="card">
          <img src={`${import.meta.env.BASE_URL}dresscode.jpg`} alt="Dress Code" className="portrait-photo" />
        </div>
      </Section>

      {/* Extra Photo */}
      <Section id="extra-photo">
        <div className="card" style={{ textAlign: "center" }}>
          <img src={`${import.meta.env.BASE_URL}attire-extra.jpg`} alt="Extra Portrait" className="portrait-photo" />
        </div>
      </Section>

      {/* Notes */}
      <Section id="notes">
        <div className="card" style={{ textAlign: "center" }}>
          <img src={`${import.meta.env.BASE_URL}giftphoto.jpg`} alt="Gift Photo" className="portrait-photo" />
        </div>
      </Section>

      {/* RSVP */}
      <Section id="rsvp" title="BE OUR GUEST">
        <div className="card">
          <p className="muted">Please respond on or before September 06, 2025.</p>
          <RSVPForm />
        </div>
      </Section>

      {/* Footer */}
<footer className="footer">
  <div className="container text-center">
    <div className="copyright">© 2025 Mr. & Mrs. Dela Cruz</div>
    <div className="hashtag">
      <a 
        href="https://www.instagram.com/explore/tags/oriJENENAllymeantforROMWEN/"
        target="_blank" 
        rel="noopener noreferrer"
      >
        #oriJENENAllymeantforROMWEN
      </a>
    </div>
    <div className="social-icons">
      <a href="https://instagram.com/YOUR_INSTAGRAM" target="_blank" rel="noopener noreferrer" className="instagram">
        <FaInstagram />
      </a>
      <a href="https://facebook.com/YOUR_FACEBOOK" target="_blank" rel="noopener noreferrer" className="facebook">
        <FaFacebook />
            </a>
          </div>
        </div>
      </footer>
    </>
  )
}
