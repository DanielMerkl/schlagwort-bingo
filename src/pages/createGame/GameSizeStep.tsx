import React, { Dispatch, FC, SetStateAction } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import styled from "styled-components";

interface Props {
  gameSize: number;
  setGameSize: Dispatch<SetStateAction<number>>;
}

export const GameSizeStep: FC<Props> = ({ gameSize, setGameSize }) => (
  <Wrapper>
    <FormControl variant="outlined">
      <InputLabel>Spielfeldgröße</InputLabel>
      <Select
        autoFocus
        value={gameSize}
        onChange={(event) => setGameSize(Number(event.target.value))}
        label="Spielfeldgröße"
      >
        <MenuItem value={9}>9 Schlagwörter (3x3)</MenuItem>
        <MenuItem value={16}>16 Schlagwörter (4x4)</MenuItem>
        <MenuItem value={25}>25 Schlagwörter (5x5)</MenuItem>
      </Select>
    </FormControl>
  </Wrapper>
);

const Wrapper = styled.div`
  max-width: 500px;
  padding: 2rem 1rem;
  display: grid;
  gap: 1rem;
  justify-self: center;
  width: 100%;
`;
