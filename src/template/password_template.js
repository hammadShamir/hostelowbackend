module.exports = {
    generatePasswordResetEmail: (newPassword) => {
        return `
          We received a request to reset the password for the HostelBazaar account associated with this e-mail address.
          Click the link below to reset your password using our secure link:
      
          https://www.hostelow.com/forget-password/${newPassword}
         
          If clicking the link doesn't work, you can copy and paste the link into your web browser's address bar. 
          You will be able to create a new password for your HostelBazaar account after clicking the link above.
      
          If you did not request to have your password reset, you can safely ignore this email.
      
          Thank you for using HostelBazaar.
      
          Sincerely,
          The HostelBazaar Team
        `;
    }



}