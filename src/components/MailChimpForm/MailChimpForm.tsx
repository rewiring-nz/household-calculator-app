import { Button, FormControl, styled, TextField, Typography } from '@mui/material';
import MailchimpSubscribe from 'react-mailchimp-subscribe';



// URL to your Mailchimp subscription form
// const url = "https://YOUR_MAILCHIMP_URL";
const url = "https://rewiring.us17.list-manage.com/subscribe/post?u=1a7e35f66dab6e6bdb3f3e5bf&amp;id=8f847003a3&amp;f_id=00d1e7e3f0";



const EmailForm = styled('form')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    '& .MuiInputBase-root': {
        color: theme.palette.text.disabled,
        backgroundColor: theme.palette.background.paper
    },
    [theme.breakpoints.up('sm')]: {
        flexDirection: 'row',
        gap: '1rem'
    },
    '& .MuiFormControl-root': {
        flexBasis: '100%',
        [theme.breakpoints.up('sm')]: {
            flexBasis: '66%'
        }
    },
    '& .MuiButtonBase-root': {
        flexBasis: '100%',
        fontFamily: theme.typography,
        [theme.breakpoints.up('sm')]: {
            flexBasis: '33%',
            margin: '0 auto'
        }
    }
}));


const MailchimpForm = ({ theme }: { theme: any }) => (
    
    <MailchimpSubscribe
    url={url}
    render={({ subscribe, status, message }) => (
        <div className="MailchimpForm">
            <EmailForm 
                onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.target as HTMLFormElement;
                    const email = form.elements.namedItem('email') as HTMLInputElement;
                    subscribe({ EMAIL: email.value });
                }}
            >
                <FormControl>
                    <TextField 
                        id="email" 
                        name="email"
                        placeholder="name@example.com"
                        variant="outlined" 
                    />
                </FormControl>
                
                <Button variant="outlined" type="submit"
                    sx={{
                        textTransform: 'initial',
                        margin: '.7rem 0',
                        color: "info"
                    }}
                >
                    <Typography 
                        variant="h3" 
                        sx={{ 
                            color: theme.palette.secondary.contrastText,
                            borderWidth: '0.1rem'
                        }}
                    >
                        Submit
                    </Typography>                        
                </Button>
            </EmailForm>
            {status === "sending" && <div>Sending...</div>}
            {status === "error" && <div dangerouslySetInnerHTML={{ __html: message }} />}
            {status === "success" && <div>Subscribed!</div>}
        </div>
    )}
/>
);

export default MailchimpForm;

