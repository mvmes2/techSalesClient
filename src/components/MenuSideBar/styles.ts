import styled, { css } from "styled-components";

interface MenuContainerProps {
  $isOpen: boolean;
}

export const MenuContainer = styled.div<MenuContainerProps>`
grid-row: span 2 / span 2 !important;
background-color:rgba(176, 174, 181, 0.7);
  ${(props) =>
    props.$isOpen ? css`
      width: 100%;

      > svg {
        align-self: flex-end;
      }
    ` : css`

      max-width: max-content;
      > svg {
        align-self: center;
      }
  `}

  /* top: 0;
  bottom: 0;
  left: 0; */
  padding: 2rem 1rem;
  box-shadow: 5px 0px 5px 0px rgb(248, 249, 250);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  > svg {
    font-size: 1.25rem;
    cursor: pointer;
    
    &:hover {
      color: #d3d3eb4b;
      transition: color 0.4s;
    }
  }

  > img {
    width: 120px;
    margin: 0 auto;
    color: red;
  }

  nav {
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    
    a {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 1rem;
      text-decoration: none;
      

      &:hover {
        transform: translateX(6px);
        transition: all 0.4s;
        color:rgba(245, 236, 236, 0.29);
      }
    }
  }
`;


export const BoxUserAdmin = styled.section`

  width: 100%;
  position: absolute;
  left: 35%;
  top: 2%;
  > button {
    margin: 0 auto;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: none;
    border: 0;

    &:hover {

      transform: translateX(6px);
        transition: all 0.4s;
        color: gray;
        cursor: pointer;
      
    }
  }
`