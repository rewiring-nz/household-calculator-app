import React from 'react';
import { Button, FormControl, styled, TextField, Typography } from '@mui/material';
import MailchimpSubscribe from 'react-mailchimp-subscribe';
// import { EmailFormFields } from '../../shared/interfaces/EmailFormFields';


// URL to your Mailchimp subscription form
// const url = "https://YOUR_MAILCHIMP_URL";
// const url = "https://rewiring.us17.list-manage.com/subscribe/post?u=1a7e35f66dab6e6bdb3f3e5bf&amp;id=8f847003a3&amp;f_id=00d1e7e3f0";
const url = "https://rewiring.us17.list-manage.com/subscribe/post?u=1a7e35f66dab6e6bdb3f3e5bf&amp;id=8f847003a3&amp;f_id=00d1e7e3f0&TAG=household-calculator";

// Attempt to add tag to Mailchimp form
// This one uses JSONP
// const url = "https://rewiring.us17.list-manage.com/subscribe/post-json?u=1a7e35f66dab6e6bdb3f3e5bf&id=8f847003a3&c=?";
// const baseUrl = "https://rewiring.us17.list-manage.com/subscribe/post-json";
// const u = '1a7e35f66dab6e6bdb3f3e5bf';
// const id = '8f847003a3';
// const tag = "household-calculator";








const EmailForm = styled('form')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    '& .MuiInputBase-root': {
        maxHeight: '3.44rem',
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
        maxHeight: '3.44rem',
        flexBasis: '100%',
        fontFamily: theme.typography,
        [theme.breakpoints.up('sm')]: {
            flexBasis: '33%',
            margin: '0 auto'
        }
    }
}));

// to do add tag

const MailchimpForm = ({ theme }: { theme: any }) => (
    
    <MailchimpSubscribe
    url={url}
    // url={baseUrl}
    render={({ subscribe, status, message }) => (
        <div className="MailchimpForm">
            <EmailForm 
                onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.target as HTMLFormElement;
                    const email = form.elements.namedItem('email') as HTMLInputElement;
                    subscribe({ EMAIL: email.value });
                    // subscribe({ 
                    //     EMAIL: email.value,
                    //     TAG: tag
                    //  } as EmailFormFields);
                    // const url = `${baseUrl}?u=${u}&id=${id}&EMAIL=${encodeURIComponent(email.value)}&TAG=${tag}&c=?`;
                        // subscribe({ 
                        //     EMAIL: email.value,
                        //     TAG: tag,
                        //     u: u,
                        //     id: id
                        // } as EmailFormFields);
                }}
            >

                <FormControl>
                    <TextField 
                        id="email" 
                        name="email"
                        placeholder="name@example.com"
                        variant="outlined"
                        InputProps={{
                            sx: {
                                maxHeight: '3.438rem'
                            }
                        }}
                    />
                </FormControl>

                {/* <input type="hidden" name="u" value={u} />
                <input type="hidden" name="id" value={id} />
                <input type="hidden" name="TAG" value={tag} /> */}
                
                <Button variant="outlined" type="submit"
                    sx={{
                        textTransform: 'initial',
                        margin: '.7rem 0',
                        color: "info",                        
                        maxHeight: '3.4375rem',
                    }}
                >
                    <Typography 
                        variant="h5" 
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

