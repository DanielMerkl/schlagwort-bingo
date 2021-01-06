import React, { FC, useState } from "react";
import { Button, Divider, Typography } from "@material-ui/core";
import { Done, Link, Share } from "@material-ui/icons";
import styled from "styled-components";

import { useSnackbar } from "../../context/SnackbarContext";

interface Props {
  invitationCode: number | null;
}

export const ShareInvitationCodeStep: FC<Props> = ({ invitationCode }) => {
  const { showSuccess } = useSnackbar();

  const [copiedSuccessfully, setCopiedSuccessfully] = useState(false);

  const canUseShareAPI = navigator.share !== undefined;
  const shareLink = window.origin + "/game/" + invitationCode;

  const handleShareClick = () => {
    if (canUseShareAPI) {
      navigator.share({
        title: "Schlagwort Bingo",
        url: shareLink,
      });
    }
  };

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      setCopiedSuccessfully(true);
      showSuccess("Link kopiert");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Wrapper>
      <Typography variant="h6">
        Das Spiel wurde erfolgreich erstellt!
      </Typography>
      <Typography>
        Teile deinen Mitspielern noch den vierstelligen Einladungscode mit oder
        schicke ihnen den Link, um automatisch dem Spiel beizutreten.
      </Typography>
      <Divider />
      <Typography gutterBottom>
        Der Einladungscode lautet: <b>{invitationCode}</b>
      </Typography>
      {canUseShareAPI ? (
        <Button
          variant="contained"
          color="primary"
          onClick={handleShareClick}
          startIcon={<Share />}
        >
          Teilen
        </Button>
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={handleCopyClick}
          startIcon={copiedSuccessfully ? <Done /> : <Link />}
        >
          Link zum Beitreten kopieren
        </Button>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  max-width: 500px;
  padding: 1rem;
  display: grid;
  gap: 1rem;
  align-content: start;
  justify-self: center;
  width: 100%;
`;
