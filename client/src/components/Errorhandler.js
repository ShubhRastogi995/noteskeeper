import Alert from "@mui/material/Alert";

export default function Errorhandler({severity, children}) {
  return (
      <Alert severity={severity}>{children}</Alert>
  );
}