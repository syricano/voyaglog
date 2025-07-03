import {Link} from 'react-router'
import VoyagStyle from '../style/voyagStyle'
import voyagStyle from '../style/voyagStyle'

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content py-6 mt-16">
      <div className={voyagStyle.footerContainer}>
        <p className={voyagStyle.footerText}>&copy; {new Date().getFullYear()} Voyaglog. All rights reserved.</p>
        <div className={voyagStyle.footerLinks}>
          <a
            href="https://facebook.com/syriacano" 
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition"
          >
            Facebook
          </a>
          <a
            href="https://github.com/syricano"
            target="_blank"
            rel="noopener noreferrer"
            className={voyagStyle.footerLink}
          >
            GitHub
          </a>
          
          <Link to="/contact" className={voyagStyle.footerLink}>Contact</Link>
          
        </div>
      </div>
    </footer>
  )
}

export default Footer
