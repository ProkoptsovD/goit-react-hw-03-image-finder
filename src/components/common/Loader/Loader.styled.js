import styled, { css } from 'styled-components';

const LoaderTypes = {
    'dual-rings': css`
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 80px;
                    height: 80px;

                    transform: translate(-50%, -50%);

                    &:after {
                        content: " ";
                        display: block;
                        width: 64px;
                        height: 64px;
                        margin: 8px;
                        border-radius: 50%;
                        border: 6px solid skyblue;
                        border-color: skyblue transparent skyblue transparent;
                        animation: lds-dual-ring 1.2s linear infinite;
                    }

                    @keyframes lds-dual-ring {
                0% {
                    transform: rotate(0deg);
                }
                100% {
                    transform: rotate(360deg);
                }
            }`,
    'spinner': css`
                    position: relative;
                    display: inline-block;
                    width: 20px;
                    height: 20px;
                    margin-left: 6px;
                    margin-top: 9px;
                    color: #ffffff;

                & div {
                    transform-origin: 5px 5px;
                    animation: lds-spinner 1.2s linear infinite;
                }
                & div:after {
                    content: " ";
                    display: block;
                    position: absolute;
                    top: 4px;
                    left: 10px;
                    width: 4px;
                    height: 2px;
                    border-radius: 20%;
                    background: #fff;
                }
                & div:nth-child(1) {
                    transform: rotate(0deg);
                    animation-delay: -1.1s;
                }
                & div:nth-child(2) {
                    transform: rotate(30deg);
                    animation-delay: -1s;
                }
                & div:nth-child(3) {
                    transform: rotate(60deg);
                    animation-delay: -0.9s;
                }
                & div:nth-child(4) {
                    transform: rotate(90deg);
                    animation-delay: -0.8s;
                }
                & div:nth-child(5) {
                    transform: rotate(120deg);
                    animation-delay: -0.7s;
                }
                & div:nth-child(6) {
                    transform: rotate(150deg);
                    animation-delay: -0.6s;
                }
                & div:nth-child(7) {
                    transform: rotate(180deg);
                    animation-delay: -0.5s;
                }
                & div:nth-child(8) {
                    transform: rotate(210deg);
                    animation-delay: -0.4s;
                }
                & div:nth-child(9) {
                    transform: rotate(240deg);
                    animation-delay: -0.3s;
                }
                & div:nth-child(10) {
                    transform: rotate(270deg);
                    animation-delay: -0.2s;
                }
                & div:nth-child(11) {
                    transform: rotate(300deg);
                    animation-delay: -0.1s;
                }
                & div:nth-child(12) {
                    transform: rotate(330deg);
                    animation-delay: 0s;
                }
                @keyframes lds-spinner {
                    0% {
                        opacity: 1;
                    }
                    100% {
                        opacity: 0;
                    }
                }
            `,
}


export const CSSLoader = styled.div`
    ${({ type }) => LoaderTypes[type]}
`;