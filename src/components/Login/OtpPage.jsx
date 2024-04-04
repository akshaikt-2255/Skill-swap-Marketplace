import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TextField, Button, Grid, Typography, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { sendOtp } from "../../data/reducer/api/userThunk";


export default function OtpPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { email, otp } = location.state || { email: "", otp: "" };
  const [timerCount, setTimer] = useState(60);
  const [OTPinput, setOTPinput] = useState(["", "", "", ""]);
  const [disable, setDisable] = useState(true);
  const [otpError, setOtpError] = useState("");
  const [isError,setIsError] = useState(false);

  const verifyOTP = () => {
    if (parseInt(OTPinput.join("")) === parseInt(otp)) {
      navigate("/reset",{ state: { email: email} });
      setOtpError("");
    } else {
      setOtpError(
        "The code you have entered is not correct. Please try again."
      );
    }
  };

  const resendOtp = async () => {
    console.log('Sending OTP to:', email);
    
    try {
      const result = await dispatch(sendOtp(email));
      if (result?.error) {
        const errorMessage = result?.payload || "Error sending OTP.";
        console.log("Error", errorMessage);
      } else {
        navigate('/otp', { state: { email: email, otp: result?.payload?.otp } });

      }
    } catch (error) {
      console.error('Error in handleSendOTP:', error);
    }
  };

  useEffect(() => {
    let interval = setInterval(() => {
      setTimer((lastTimerCount) => {
        lastTimerCount <= 1 && clearInterval(interval);
        return lastTimerCount <= 1 ? 0 : lastTimerCount - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timerCount === 0) setDisable(false);
  }, [timerCount]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <Box
        sx={{ maxWidth: 500, width: 500, p: 3, boxShadow: 3, borderRadius: 2 }}
      >
        <Typography variant="h4" textAlign="center" gutterBottom>
          Email Verification
        </Typography>
        <Typography variant="subtitle1" textAlign="center">
          We have sent a code to your email: {email}
        </Typography>
        <form onSubmit={(e) => e.preventDefault()}>
          <Grid container spacing={2} justifyContent="center" marginTop={2}>
            {OTPinput.map((_, index) => (
              <Grid item xs={3} key={index}>
                <TextField
                  type="tel"
                  inputProps={{
                    maxLength: 1,
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                  }}
                  variant="outlined"
                  value={OTPinput[index]}
                  onChange={(e) => {
                    if (
                      e.target.value === "" ||
                      /^[0-9]$/.test(e.target.value)
                    ) {
                      setOTPinput(
                        OTPinput.map((digit, idx) =>
                          idx === index ? e.target.value : digit
                        )
                      );
                    }
                  }}
                  sx={{ width: "4rem" }}
                />
              </Grid>
            ))}
          </Grid>
          {otpError && (
            <Typography color="error" textAlign="center" marginTop={2}>
              {otpError}
            </Typography>
          )}
          <Button
            style={{backgroundColor: '#23B0BE', color: '#FFF'}}
            fullWidth
            onClick={verifyOTP}
            sx={{ mt: 2 }}
          >
            Verify Account
          </Button>
          <Typography variant="body2" textAlign="center" marginTop={2}>
            Didn't receive code?{" "}
            <Button disabled={disable} onClick={resendOtp} color="secondary">
              {disable ? `Resend OTP in ${timerCount}s` : "Resend OTP"}
            </Button>
          </Typography>
        </form>
      </Box>
    </Box>
  );
}
