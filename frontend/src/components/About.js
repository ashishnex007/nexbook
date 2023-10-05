import React from 'react'
import "../components_css/About.css"
import logo from "./nex.jpg"
import { Tilt } from 'react-tilt'

const defaultOptions = {
  reverse:                false,  // reverse the tilt direction
  max:                    10,     // max tilt rotation (degrees)
  startX:                 0,      // the starting tilt on the X axis, in degrees.
  startY:                 0,      // the starting tilt on the Y axis, in degrees.
  perspective:            1000,   // Transform perspective, the lower the more extreme the tilt gets.
  scale:                  1,      // 2 = 200%, 1.5 = 150%, etc..
  speed:                  30000,    // Speed of the enter/exit transition
  transition:             true,   // Set a transition on enter/exit.
  axis:                   null,   // What axis should be enabled. Can be "x" or "y"
  reset:                  true,   // If the tilt effect has to be reset on exit.
  "reset-to-start":       true,   // Whether the exit reset will go to [0,0] (default) or [startX, startY]
  easing:                 "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
  glare:                  false,  // if it should have a "glare" effect
  "max-glare":            1,      // the maximum "glare" opacity (1 = 100%, 0.5 = 50%)
  "glare-prerender":      false,  // false = VanillaTilt creates the glare elements for you, otherwise
                                  // you need to add .js-tilt-glare>.js-tilt-glare-inner by yourself
  "mouse-event-element":  null,   // css-selector or link to HTML-element what will be listen mouse events
  gyroscope:              true,   // Boolean to enable/disable device orientation detection,
  gyroscopeMinAngleX:     -45,    // This is the bottom limit of the device angle on X axis, meaning that a device rotated at this angle would tilt the element as if the mouse was on the left border of the element;
  gyroscopeMaxAngleX:     45,     // This is the top limit of the device angle on X axis, meaning that a device rotated at this angle would tilt the element as if the mouse was on the right border of the element;
  gyroscopeMinAngleY:     -45,    // This is the bottom limit of the device angle on Y axis, meaning that a device rotated at this angle would tilt the element as if the mouse was on the top border of the element;
  gyroscopeMaxAngleY:     45,     // This is the top limit of the device angle on Y axis, meaning that a device rotated at this angle would tilt the element as if the mouse was on the bottom border of the element;
}

const socialMediaLinks = {
  linkedin: "https://www.linkedin.com/in/ashishnex007/",
  twitter: "https://twitter.com/ashishnex007",
  github: "https://github.com/ashishnex007",
  youtube: "https://www.youtube.com/channel/UCAL_XXInL47ZSAkGth_crCw",
  instagram: "https://www.instagram.com/ashishnex007",
};

const About = () => {
  return (
    <div>
      <Tilt options={defaultOptions} ><img src={logo} className='image' /></Tilt>
      <h1 className='about'>ASHISH NEX</h1>
      <h1 className='texto'>Created by</h1>
      <div class="containerx">
      <div className="box">
      <a href={socialMediaLinks.linkedin} target="_blank" rel="noopener noreferrer">
        <i className="fab fa-linkedin"></i>
      </a>
    </div>
    <div className="box">
      <a href={socialMediaLinks.twitter} target="_blank" rel="noopener noreferrer">
        <i className="fab fa-twitter"></i>
      </a>
    </div>
    <div className="box">
      <a href={socialMediaLinks.github} target="_blank" rel="noopener noreferrer">
        <i className="fab fa-github"></i>
      </a>
    </div>
    <div className="box">
      <a href={socialMediaLinks.youtube} target="_blank" rel="noopener noreferrer">
        <i className="fab fa-youtube"></i>
      </a>
    </div>
    <div className="box">
      <a href={socialMediaLinks.instagram} target="_blank" rel="noopener noreferrer">
        <i className="fab fa-instagram"></i>
      </a>
    </div>
    </div>
    </div>
  )
}

export default About
