# proto-two
So this one isn't a game. More of a personal journaling web app combined with some of that CryptoSauce. Mainly just building this to play around with authentication and JWT as well as some front end crypto libs. 

The basic idea is:
  - User logs in (obvi)
  - Creates "post"
  - Defines key to encrypt post with
  - Post is encrypted and then sent to server
  - Post is then displayed in users 'journal' as ciphertext
  - User must enter key in order to decrypt 
  
Post could theoretically be any form of media I suppose. Pretty much no plintext stored on server except maybe usernames. Key is not stored. If user forgets key, they lose media
