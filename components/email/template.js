import getConfig from "next/config";

const {
  publicRuntimeConfig: { serverAddress },
} = getConfig();

export const callToActionHref = ({ fromName, toName }) =>
  encodeURI(`${serverAddress}/receiver?fromName=${fromName}&toName=${toName}`);

export const mailToHref = ({
  fromName,
  fromEmail,
  toEmail,
  toName,
  toMessage,
  blockUrl,
}) =>
  `mailto:${toEmail}?subject=${subject(fromName)}&body=${encodeURI(
    textMessageBody({
      fromName,
      fromEmail,
      toName,
      toMessage,
      blockUrl,
    })
  )}`;

export const subject = (fromName) =>
  `${fromName} wants to slip a song into your playlist.`;

export const textMessageBody = ({
  fromName,
  fromEmail,
  toName,
  toMessage,
  blockUrl,
}) => {
  return `Hey ${toName},
${fromName} wants to slip a song into your playlist.
  
Personal Message:
${toMessage}

********
CLICK THE LINK HERE  --> ${callToActionHref({ fromName, toName })} <--
********

PlaylistTune allows a song to be slipped into someone's playlist.
It's a way of sending them a song message. You have total control over what playlist the song is added to, and you can remove it at any time through your music player.
  
----------------------------------------------------------------------
This message was sent by ${fromName} [${fromEmail}] via PlaylistTune.com
If you would like to stop receiving these messages you can block your email address here ${blockUrl}
----------------------------------------------------------------------

`;
};

export const htmlMessageBody = ({
  fromName,
  fromEmail,
  toName,
  toMessage,
  blockUrl,
}) => {
  return `
<!DOCTYPE html>
<html>
<head>
<style>
html,
body {
font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
line-height: 1.6;
font-size: 18px;
text-align: center;
}
.content-container {
font-size: 14px;
max-width: 500px;
margin: auto;
text-align: center;
}
.explaination {
background-color: #333333;
color: #FFFFFF;
padding: 20px;
margin: 40px;
}
.explaination a {
color: white;
}
</style>
</head>
<body>
<div class="content-container">
<h1>Hey ${toName},</h1>
<h2>${fromName} wants to slip a song into your playlist.</h2>
<p>Personal Message:</p>
</div>
<pre style="max-width: 300px;margin: auto;background-color: #FEF3A1;min-height: 200px;text-align: left;padding: 10px;">${toMessage}</pre>
<a style="display: block;max-width: 300px;color: #fff;background-color: #3A863D;border-radius: 40px;font-weight: 600;letter-spacing: 1px;padding: 20px 40px;box-sizing: border-box;text-decoration: none;margin: 40px auto;text-align: center;" href="${callToActionHref(
    { fromName, toName }
  )}">I Want To Hear It!</a>
<div class="content-container">
<p>PlaylistTune allows a song to be slipped into someone's playlist.<br/>It's a way of sending them a song message. You have total control over what playlist the song is added to, and you can remove it at any time through your music player.
</p>
</div>
<div class="explaination">
<div class="content-container">
<p>
This message was sent by ${fromName} [${fromEmail}] via PlaylistTune.com</p>
</div>
</div>
<div class="content-container">
<p>If you would like to stop receiving these messages you can block your email address <a href="${blockUrl}">here</a> </p></div>
</body>
</html>`;
};
