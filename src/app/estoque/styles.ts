import styled, { css } from "styled-components";

export const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`



export const NavBtns = styled.div`
    margin-bottom: 10px;
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-evenly;

    button {
        background-color: #0070f3;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
        margin-left: 10px; /* Ajusta a margem esquerda do botão */
        &:hover {
            background-color: #005bb5;
        }
    }

    input {
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        &:hover {
          color: black;
        }
    }
    
    
`

export const Content = styled.div`
    width: 100%;
    border-top: solid gray 1px;
    border-radius: 1%;
    align-content: center;
    justify-content: center;
    align-items: center;
    text-align: center;
    
`

export const FormWraper = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(30%, auto));
    max-width: 100%;
    column-gap: 30px;
    align-items: center;
    flex-direction: column;
`
export const ModalBody = styled.div`
    align-items: center;
    height: 100%;
    width: 100%;
    input {
        margin-bottom: 30px;
        width: 222px;
        height: 35px;
    }
    select {
      margin-bottom: 30px;
      
        width: 100%;
        height: 35px;
    }
    button {
      margin-top: 25px;
    }
    label {
      color: black;
    }
`
export const BtnWrapper = styled.div`

    button {
        padding: 2px;
    }
    button:hover {
        cursor: pointer;
    }
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  
  min-height: 100vh;
`;

export const ClientCardContainerWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 1200px;
`;

export const ClientCardContent = styled.div`
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  transition: transform 0.2s;
  
  &:hover {
    cursor: pointer;
    transform: translateY(-5px);
  }

  h2 {
    margin: 0;
    font-size: 1rem;
    color: #333;
  }

  h3 {
    margin: 0;
    font-size: 1.2rem;
    color: #555;
    margin-bottom: 15px;
  }

  div {
    margin-bottom: 15px;
  }
`;