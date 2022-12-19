import React from "react";
import { Link } from "react-router-dom";
import './main.css';

const Home = () => {
    return (
        <>
            <a href='https://github.com/Jaal97' className="logo">
                <img src="./25231.png" ></img>
            </a>
            <Link to="/agendas" className="container-title">
                <h3 className="title-home">
                    Rental Cars
                </h3>
            </Link>
            <Link to={'/autos'}>
                <figure className="container-img">
                    <img src="./banner-car-renatl.png"></img>
                </figure>
            </Link>

        </>
    );
}

export default Home;