import React, { Dispatch, FC, SetStateAction, useState } from "react";
import {
  Button,
  Checkbox,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { ChevronLeft } from "@material-ui/icons";
import styled from "styled-components";

import { useTypicalBuzzwords } from "./useTypicalBuzzwords";

interface Props {
  open: boolean;
  onClose: () => void;
  buzzwords: Array<string>;
  setBuzzwords: Dispatch<SetStateAction<Array<string>>>;
  gameSize: number;
}

export const TypicalBuzzwordsDialog: FC<Props> = ({
  open,
  onClose,
  buzzwords,
  setBuzzwords,
  gameSize,
}) => {
  const theme = useTheme();
  const fullScreenDialog: boolean = useMediaQuery(theme.breakpoints.down("xs"));
  const [filter, setFilter] = useState<string | null>(null);

  const { categories, filteredBuzzwords } = useTypicalBuzzwords(filter);

  const handleListItemClick = (selectedBuzzword: string) => {
    setBuzzwords((prevBuzzwords) => {
      if (prevBuzzwords.includes(selectedBuzzword)) {
        return prevBuzzwords.filter((b) => b !== selectedBuzzword);
      } else {
        return [...prevBuzzwords, selectedBuzzword];
      }
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      fullScreen={fullScreenDialog}
    >
      <DialogTitle>
        {fullScreenDialog && (
          <BackButton onClick={onClose}>
            <ChevronLeft fontSize="large" />
          </BackButton>
        )}
        Typische Schlagwörter
      </DialogTitle>
      <StyledDialogContent>
        <Typography>Nach Kategorien filtern</Typography>
        <div
          style={{
            display: "flex",
            flexWrap: fullScreenDialog ? "nowrap" : "wrap",
            overflowX: "auto",
            paddingBottom: "0.5rem",
          }}
        >
          {categories.map((category) => (
            <StyledChip
              key={category}
              color={filter === category ? "primary" : "default"}
              label={category}
              onClick={() => {
                if (filter === category) {
                  setFilter(null);
                } else {
                  setFilter(category);
                }
              }}
            />
          ))}
        </div>
        <Divider />
        <BuzzwordList>
          {filteredBuzzwords.map((buzzword) => (
            <ListItem
              key={buzzword}
              role={undefined}
              dense
              button
              onClick={() => handleListItemClick(buzzword)}
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  color="primary"
                  checked={buzzwords.includes(buzzword)}
                  disableRipple
                />
              </ListItemIcon>
              <ListItemText primary={buzzword} />
            </ListItem>
          ))}
        </BuzzwordList>
      </StyledDialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={onClose}>
          Fertig ({buzzwords.length}/{gameSize})
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const BackButton = styled(IconButton)`
  margin-right: 1rem;
  margin-left: -1rem;
`;

const StyledDialogContent = styled(DialogContent)`
  height: 400px;
  display: grid;
  gap: 0.5rem;
  grid-template-rows: auto auto auto 1fr;
`;

const StyledChip = styled(Chip)`
  margin: 0.25rem;
`;

const BuzzwordList = styled(List)`
  overflow-y: auto;
`;
