import React, { Dispatch, FC, SetStateAction, useRef, useState } from "react";
import { Button, Chip, TextField } from "@material-ui/core";
import { PlaylistAdd } from "@material-ui/icons";

import styled from "styled-components";

import { TypicalBuzzwordsDialog } from "./TypicalBuzzwordsDialog";

interface Props {
  buzzwords: Array<string>;
  setBuzzwords: Dispatch<SetStateAction<Array<string>>>;
  gameSize: number;
}

export const AddBuzzwordsStep: FC<Props> = ({
  buzzwords,
  setBuzzwords,
  gameSize,
}) => {
  const [customBuzzword, setCustomBuzzword] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const customBuzzwordInputRef = useRef<HTMLInputElement>();

  const customBuzzwordAlreadyAdded = buzzwords
    .map((buzzword) => buzzword.toLowerCase())
    .includes(customBuzzword.toLowerCase());

  const isValidCustomBuzzword =
    customBuzzword.trim() !== "" && !customBuzzwordAlreadyAdded;

  const addCurrentCustomBuzzword = () => {
    if (isValidCustomBuzzword) {
      setBuzzwords((prevBuzzwords) => [...prevBuzzwords, customBuzzword]);
      setCustomBuzzword("");
    }

    customBuzzwordInputRef.current?.focus();
  };

  const handleDeleteClick = (buzzwordToBeDeleted: string) => {
    setBuzzwords((prevBuzzwords) =>
      prevBuzzwords.filter((buzzword) => buzzword !== buzzwordToBeDeleted)
    );
  };

  return (
    <Wrapper>
      <CustomBuzzwordInputWrapper>
        <TextField
          inputRef={customBuzzwordInputRef}
          variant="outlined"
          label="eigenes Schlagwort"
          value={customBuzzword}
          onChange={(event) => setCustomBuzzword(event.target.value)}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              addCurrentCustomBuzzword();
            }
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={addCurrentCustomBuzzword}
          disabled={!isValidCustomBuzzword}
        >
          Hinzufügen
        </Button>
      </CustomBuzzwordInputWrapper>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setIsDialogOpen(true)}
        startIcon={<PlaylistAdd />}
      >
        Typische Schlagwörter
      </Button>
      <BuzzwordChipsWrapper>
        {buzzwords.map((buzzword) => (
          <BuzzwordChip
            variant="outlined"
            color="primary"
            key={buzzword}
            label={buzzword}
            onDelete={() => handleDeleteClick(buzzword)}
          />
        ))}
      </BuzzwordChipsWrapper>
      <TypicalBuzzwordsDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        buzzwords={buzzwords}
        setBuzzwords={setBuzzwords}
        gameSize={gameSize}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  max-width: 500px;
  padding: 1rem;
  display: grid;
  grid-template-rows: auto auto 1fr;
  gap: 1rem;
  justify-self: center;
  width: 100%;
  overflow-y: auto;
`;

const CustomBuzzwordInputWrapper = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr auto;
`;

const BuzzwordChipsWrapper = styled.div`
  overflow-y: auto;
`;

const BuzzwordChip = styled(Chip)`
  margin: 0.25rem;
`;
