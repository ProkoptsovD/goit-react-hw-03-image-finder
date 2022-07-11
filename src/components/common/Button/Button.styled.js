import styled from 'styled-components';

export const Btn = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 120px;
    height: 30px;
    margin: 0 auto;
    font: inherit;
    border: none;
    border-radius: 10px;
    background-color: skyblue;
    color: #ffffff;

    cursor: pointer;

    &:active {
        box-shadow: inset 0px 0px 4px 0px #fafafa;
    }
    &:disabled {
        background-color: #cacaca;
        cursor: not-allowed;
    }
`;