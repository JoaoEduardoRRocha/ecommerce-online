import React, { useState, useEffect } from "react"
import "./hero-section.scss"
import Fornite from "../../assets/fornite.png"
import Arena from "../../assets/arena-lol.png"
import WildRift from "../../assets/wildrift.png"

function HeroSection() {
  const images = [
    {
      src: Fornite,
      name: "Fornite",
      description:
      "Explore um mundo épico! Lute em uma ilha, onde você será desafiado a encontrar recursos e confrontar seus inimigos para obtê-los!"
    },
    {
      src: Arena,
      name: "LOL: nova arena!",
      description:
        "Prepare-se para a nova arena de LOL! Atualizações épicas, equipes poderosas e desafios incríveis esperam por você. Domine cada confronto!"
    },
    {
      src: WildRift,
      name: "LOL: novo modo de jogo!",
      description:
        "Descubra o novo modo de jogo no Wild Rift! Estratégia, ação e glórias épicas esperam por você em batalhas inesquecíveis. Seja uma lenda!"
    }
  ]
  
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    resetInterval()
  }

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    )
    resetInterval()
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [isPaused])

  const resetInterval = () => {
    setIsPaused(true)
    setTimeout(() => setIsPaused(false), 100)
  }

  return (
    <div className="hero-section-container">
      <div className="hero-section-slider">
        <div>
          <img
            className="hero-section-slider__hero-img"
            src={images[currentIndex].src}
            alt={`Imagem de ${images[currentIndex].name}`}
          />
        </div>

        <div className="hero-section-slider__details">
          <h1 className="hero-section-slider__name">
            {images[currentIndex].name}
          </h1>
          <p className="hero-section-slider__description">
            {images[currentIndex].description}
          </p>

          <div className="hero-section-slider__know-more">
            <button className="hero-section-slider__know-more-btn">
              Saiba mais
            </button>

            <div className="hero-section-slider__next-prev-container">
              <button className="hero-section-slider__prev" onClick={prevSlide}>
                Anterior
              </button>
              <button className="hero-section-slider__next" onClick={nextSlide}>
                Próximo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
