import style from './Abouts.module.css'
import rickAbout from '../Images/rickAbout.mp4'
import gitIcon from '../Images/gitIcon.png'
import emailIcon from '../Images/emailIcon.png'
import linkedIcon from '../Images/linkedIcon.png'
import MenuBurger from '../MenuBurger/MenuBurger'

const About = ({ menuBurger, handleMenuBurger }) => {
    return (
        <div className={style.container}>
            <video className={style.video} autoPlay loop>
                <source src={rickAbout} type="video/mp4" />
            </video>
            {!menuBurger ? <div className={style.about}>
                <h4>About Me</h4>
                <p>👋 Hi, I'm Lucas, a 24-year-old web developer passionate about coding.</p>
                <p>💻 I specialize in JavaScript, HTML, CSS, React, Redux, and more. Always eager to learn and stay on the cutting edge of web development.</p>
                <p>🌆 When I'm not coding, you'll find me exploring the city or savoring a cup of coffee.</p>
                <p>🚀 Let's build the future together!</p>

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
            </div> : null}
            {menuBurger ? <MenuBurger menuBurger={menuBurger} handleMenuBurger={handleMenuBurger} /> : null}
        </div>
    )
}

export default About;