import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';

const EmailModal = ({ open, handleClose, handleSendOTP }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    handleSendOTP(email);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Enter Email for OTP</DialogTitle>
      <DialogContent style={{width: '300px'}}>
        <TextField
          autoFocus
          margin="dense"
          id="email"
          label="Email Address"
          type="email"
          fullWidth
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Send OTP</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EmailModal;
