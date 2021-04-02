import React from 'react'
import HubytskyiLogo from "../img/hubytskyi.svg"

const Footer = () => {

    const currentYear = new Date().getFullYear();

    return (
        <footer>
            <div className="container">
                <div className="row">
                    <div className="footer__inner">
                        <span>Copyright ©{currentYear} All rights reserved.</span>
                        <span><a href="https://hubytskyi.github.io/hm/" target="_blank" rel="noreferrer"><img
                            src={HubytskyiLogo} alt="hubytskyi"/></a></span>
                    </div>
                </div>
            </div>
        </footer>
    )
};

export default Footer
