import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
`;

export const CoordsContainer = styled.div`
  width: 30%;
`;

export const MapContainer = styled.div`
  width: 60%;
  height: 500px;
`;

export const FormContainer = styled.div`
  width: 100%;
  margin-bottom: 2em;
  text-align: right;
`;

export const ButtonAdd = styled.button`
  color: #33ba88;
  background: transparent;
  border: 0.125em solid;
  border-radius: 2em;
  padding: 0.5em;
  width: 15em;
  font-size: 1.1em;
  :hover {
    background: #33ba88;
    color: white;
  }
`;

export const InputBox = styled.input`
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  outline: none;
  width: 100%;
  padding: 7px;
  border: none;
  border-bottom: 1px solid #ddd;
  background: transparent;
  margin-bottom: 10px;
  margin-right: 10px;
  height: 45px;
  padding-right: 50px;
`;
