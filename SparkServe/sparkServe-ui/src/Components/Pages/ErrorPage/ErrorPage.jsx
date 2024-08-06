import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './ErrorPage.css';

const ErrorPage = () => {
    const ghostEyesRef = useRef(null);
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    useEffect(() => {
        const handleMouseMove = (event) => {
            const pageX = document.documentElement.scrollWidth;
            const pageY = document.documentElement.scrollHeight;
            const mouseY = event.pageY;
            const mouseX = event.pageX;

            // Vertical axis
            const yAxis = ((pageY / 2 - mouseY) / pageY) * 300;

            // Horizontal axis
            const xAxisRatio = mouseX / -pageX;
            const xAxis = -xAxisRatio * 100 - 100;

            if (ghostEyesRef.current) {
                ghostEyesRef.current.style.transform = `translate(${xAxis}%, ${-yAxis}%)`;
            }
        };

        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div className="error-page-container">
            <div className="ghosty">
                <div className="box">
            <div className="box__ghost">
                <div className="symbol"></div>
                <div className="symbol"></div>
                <div className="symbol"></div>
                <div className="symbol"></div>
                <div className="symbol"></div>
                <div className="symbol"></div>
                
                <div className="box__ghost-container">
                <div className="box__ghost-eyes" ref={ghostEyesRef}>
                    <div className="box__eye-left"></div>
                    <div className="box__eye-right"></div>
                </div>
                    <div className="box__ghost-bottom">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    </div>
                    <div className="box__ghost-shadow"></div>
                </div>
                
                <div className="box__description">
                    <div className="box__description-container">
                    <div className="box__description-title">Whoops!</div>
                    <div className="box__description-text">It seems like we couldn't find the page you were looking for</div>
                    </div>
                    
                    <a onClick={handleGoBack} className="box__button">Go back</a>
                </div>
                </div>
            </div>
            </div>
        );
    };

export default ErrorPage;