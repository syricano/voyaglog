import about from "../assets/about.jpg"
import voyagStyle from "../style/voyagStyle"

const About = () => {
  return (
    <div className={voyagStyle.aboutWrapper}>
      <h1 className={voyagStyle.aboutTitle}>About Voyaglog</h1>

      <p className={voyagStyle.aboutParagraph}>
        Welcome to Voyaglog — your go-to travel blog where we share amazing journeys, tips, and stories from around the world.
      </p>
      <p className={voyagStyle.aboutParagraph}>
        Our mission is to inspire adventure and provide practical advice for travelers of all kinds. Whether you’re a backpacker, a luxury traveler, or planning your first trip, Voyaglog is here to guide you every step of the way.
      </p>
      <p className={voyagStyle.aboutParagraph}>
        Founded by Anass Muhammad Ali, an avid traveler and storyteller, we bring you authentic experiences and useful insights to make your trips unforgettable.
      </p>
      <p className={voyagStyle.aboutParagraph}>
        Thank you for joining us on this journey — happy travels!
      </p>

      <img src={about} alt="About us" className={voyagStyle.img} />
    </div>
  )
}

export default About
