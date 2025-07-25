import emailjs from 'emailjs-com';
import { toast } from 'react-toastify';

 export const sendEmailNotification = ({userName,userEmail,name,platform,date,time,link}) => {

  if (!userEmail) {
    toast.error("User email is missing. Please log in to send notifications.");
    console.error("User email is missing.");
    return;
  }
  emailjs.send(
    'upnextcodes',
    'reminder1234',
    {
      name: userName,
      to_email: userEmail,
      contest_name: name,
      contest_platform: platform,
      contest_date: date,
      contest_time: time,
      contest_link: link,
    },
    'ZfIkH5wCSLiF7nY0y'
  )
  .then(() => {
    toast.success(`Email sent!`);
  })
  .catch((error) => {
    console.error('EmailJS Error:', error);
    toast.error('Failed to send notification email.');
  });
};
