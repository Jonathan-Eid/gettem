import React, { Component, FC } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import $ from "jquery"; 


import Button from 'react-bootstrap/Button'
import './Navbar.scss'

interface Props {
    // any props that come into the component
}
 
const NavBar: FC<Props> = ({children, ...rest}) => {

    function test(){
        var tabsNewAnim = $('#navbarSupportedContent');
        var selectorNewAnim = $('#navbarSupportedContent').find('li').length;
        var activeItemNewAnim = tabsNewAnim.find('.active');
        var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
        var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
        var itemPosNewAnimTop = activeItemNewAnim.position();
        var itemPosNewAnimLeft = activeItemNewAnim.position();
        $(".hori-selector").css({
          "top":itemPosNewAnimTop.top + "px", 
          "left":itemPosNewAnimLeft.left + "px",
          "height": activeWidthNewAnimHeight + "px",
          "width": activeWidthNewAnimWidth + "px"
        });
        $("#navbarSupportedContent").on("click","li",function(e){
          $('#navbarSupportedContent ul li').removeClass("active");
          $(this).addClass('active');
          var activeWidthNewAnimHeight = $(this).innerHeight();
          var activeWidthNewAnimWidth = $(this).innerWidth();
          var itemPosNewAnimTop = $(this).position();
          var itemPosNewAnimLeft = $(this).position();
          $(".hori-selector").css({
            "top":itemPosNewAnimTop.top + "px", 
            "left":itemPosNewAnimLeft.left + "px",
            "height": activeWidthNewAnimHeight + "px",
            "width": activeWidthNewAnimWidth + "px"
          });
        });
      }

    React.useEffect(() => {
        setTimeout(function(){ test(); });
        $(window).on('resize', function(){
            setTimeout(function(){ test(); }, 500);
          });
        $(".navbar-toggler").on("click",function(){
            setTimeout(function(){ test(); }, 350);
          });
    },[])
    

    return <Navbar expand="lg" className="navbar-default navbar-mainbg">
    <Navbar.Brand className="navbar-logo" href="#">
      <img
        src="./imgs/logo.png"
        width="300"
        height="auto"
        className="d-inline-block align-top"
        alt="React Bootstrap logo"
      />
    </Navbar.Brand>
    <Navbar.Toggle data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"/>
    <Navbar.Collapse className="collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
            <div className="hori-selector"><div className="left"></div><div className="right"></div></div>
            <li className="nav-item active"> 
                <a className="nav-link" href="javascript:void(0);"><i className="fas fa-tachometer-alt"></i>Summary Swipe</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="javascript:void(0);"><i className="far fa-address-book"></i>Gallery</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="javascript:void(0);"><i className="far fa-clone"></i>Resume</a>
            </li> 
            <li className="nav-item">
                <a className="nav-link" href="javascript:void(0);"><i className="far fa-clone"></i>Github</a>
            </li> 
        </ul>
    </Navbar.Collapse>
</Navbar>
          
} 

export default NavBar  

 
