# Colordle 

Let me introduce you to a game called <a href="https://colordle.ryantanen.com/">Colordle</a>. Colordle is a simple game where you have to guess the name of a colour. The only clue you get is a percentage score of how close you were with your last guess (where 100% means you're spot on, and 0% means you're completely off).

This game is very painful and I hate playing it, but I still play it every day. Then I got my collegues playing it and they hate it just as much. They hate it so much that we now have a dedicated channel just for sharing our daily scores.

## That's where I come in.

This javascript bookmarklet will automatically solve colordle for you when you're struggling, or alternatively if you want to say that you got it in 4 guesses rather than the 200 it'd normally take you.

## How to install it:

1. Open the Javascript file in the repo
2. Copy out the entire contents into your clipboard
3. Right-click your bookmarks bar and press "Add site"
4. Name your bookmark "Colordle Solver" or something like that
5. For the URL, paste in the entire 200 line Javascript content

## How to run it:

1. Open up <a href="https://colordle.ryantanen.com/">Colordle</a>
2. Insert the colours "Once in a Blue Moon", "Lucky Grey", and "Red Dit".
3. Click to run the bookmarklet.
4. After ~40 seconds, a solved HEX code will appear in the insert bar of the web-page
5. Take that hex code and find what colour name it maps to in Colordle's linked Database to get the answer

If it's not working or hasn't done anything after 40 seconds or so, check the console (Ctrl + Shift + I on windows) to see if any errors are reported (and if so raise an issue on this repo and I'll try to fix).

The resultant hex code may sometimes be off by ~1 point. If so, you may need to do a bit of searching in the DB to find what it could be, but either way this is a much better start.
