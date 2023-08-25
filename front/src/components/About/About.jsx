import style from './Abouts.module.css'
import rickAbout from '../Images/rickAbout.mp4'
import gitIcon from '../Images/gitIcon.png'
import emailIcon from '../Images/emailIcon.png'
import linkedIcon from '../Images/linkedIcon.png'

const About = () => {
    return (
        <div>
            <video className={style.video} autoPlay loop>
        <source src={rickAbout} type="video/mp4" />
      </video>
            <div className={style.about}>
            <h4>About me</h4>
            <p>Hello everyone! I'm Lucas, I'm 24 years old and very enthusiastic about coding and web development! I love to create new content and I'm always looking up new techniques, theories or approaches to learn. When I'm not in front of my computer, you're likely to find me exploring the city or enjoying a relaxing cup of coffee.</p>
            <p>Come, let's explore the exciting world of coding and learning together!</p>
            <div className={style.containerButton}>
            <a className={style.button} href="https://github.com/JCutisaca" target='_blank'>
            <button className={style.button}><img className={style.icon} src={gitIcon} alt="github" /></button>
            </a>
            <a className={style.button} href="mailto:lucas.soldierty@gmail.com" target="_blank">
            <button className={style.button}><img className={style.iconEmail} src={emailIcon} alt="email" /></button>
            </a>
            <a className={style.button} href="https://www.linkedin.com/in/jhonathan-cutisaca-b63423229/" target='_blank'>
            <button className={style.button}><img className={style.iconLinked} src={linkedIcon} alt="email" /></button>
            </a>
            </div>
            </div>
        </div>
    )
}

export default About;