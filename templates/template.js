function templateExample (userName) { 
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Email</title>
      </head>
      <body>
      <body class="bg-light">
      <div class="container">
      Hello ${userName}!

      You have been signed up correctly!

      Your TrackMate team :)
        </div
    </body>
      </body>
      </html>
  `;
    }
    
  module.exports = {
      templateExample,
    }
    