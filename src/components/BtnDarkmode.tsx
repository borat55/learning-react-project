import { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { isDarkAtom } from "../atoms";

const DarkmodeToggle = styled.div`
  font-size: 40px;
  padding: 20px;
  cursor: pointer;
  display: inline-block;
  position: absolute;
  top: -10px;
  right: -10px;
`;

function BtnDarkmode() {
  const [darkMode, setDarkMode] = useRecoilState(isDarkAtom);
  const toggleDarkAtom = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div onClick={toggleDarkAtom}>
      {darkMode ? (
        <DarkmodeToggle style={{ color: "yellow" }}>☀︎</DarkmodeToggle>
      ) : (
        <DarkmodeToggle style={{ color: "grey" }}>☽</DarkmodeToggle>
      )}
    </div>
  );
}

export default BtnDarkmode;
