import React, {useEffect, useState} from 'react'
import {Helmet} from 'react-helmet'
import Footer from '../../templates/Footer'
import Header from '../../templates/Header'
import '../../../assets/styles/style.scss'
import useSiteMetadata from '../../SiteMetadata'
import {withPrefix} from 'gatsby'

const MainLayout = ({children}) => {

    const loading = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        backgroundColor: '#cdcdcd',
        zIndex: '10000',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    }

    const loaded = {
        display: 'none'
    }


    const [load, setLoad] = useState(false)

    useEffect(() => {
        setLoad(prevState => !prevState)
    }, [])

    if (load) {
        document.body.style = 'overflow-y: auto'
    }


    const {title, description} = useSiteMetadata()
    return (
        <div className="wrapper">
            <Helmet>
                <html lang="en"/>
                <title>{title}</title>
                <meta name="description" content={description}/>

                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href={`${withPrefix('/')}img/apple-touch-icon.png`}
                />
                <link
                    rel="icon"
                    type="image/png"
                    href={`${withPrefix('/')}img/favicon-32x32.png`}
                    sizes="32x32"
                />
                <link
                    rel="icon"
                    type="image/png"
                    href={`${withPrefix('/')}img/favicon-16x16.png`}
                    sizes="16x16"
                />

                <link
                    rel="mask-icon"
                    href={`${withPrefix('/')}img/safari-pinned-tab.svg`}
                    color="#ff4400"
                />
                <meta name="theme-color" content="#fff"/>

                <meta property="og:type" content="business.business"/>
                <meta property="og:title" content={title}/>
                <meta property="og:url" content="/"/>
                <meta
                    property="og:image"
                    content={`${withPrefix('/')}img/og-image.jpg`}
                />
            </Helmet>
            <div id="loader" style={!load ? loading : loaded}>
                <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M61.56 68L61.512 47.84L51.624 64.448H48.12L38.28 48.272V68H30.984V34.4H37.416L49.992 55.28L62.376 34.4H68.76L68.856 68H61.56Z"
                        fill="#252B31"/>
                    <circle cx="50" cy="50" r="48.5" stroke="#252B31" stroke-width="3"/>
                </svg>
            </div>
            <Header/>
            <div id="content">{children}</div>
            <Footer/>
        </div>
    )
}

export default MainLayout
