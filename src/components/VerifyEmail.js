import React, { useEffect, useState } from "react";
import { Alert, AlertTitle } from "@mui/material";
import { useParams } from "react-router-dom";
import { verifyEmail } from "../utils/Server";
import { Container, LinearProgress } from "@mui/material";

function VerifyEmail() {
  const [hasError, setHasError] = useState(false);

  let { token } = useParams();

  let { user } = useParams();

  const confirmEmail = async () => {
    try {
      await verifyEmail({ id: user, confirmationToken: token });
      window.location.replace("/login");
    } catch (e) {
      setHasError(true);
    }
  };

  useEffect(() => {
    confirmEmail();
  }, []);

  return (
    <Container>
      {hasError ? (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Something went wrong
        </Alert>
      ) : (
        <LinearProgress />
      )}
    </Container>
  );
}

export default VerifyEmail;
