# Game Solvers

Here I will compile a collection of solvers I have produced for online games. These are not necessarily optimal solutions, and there are probably more efficient ways of solving these games, but they are functional (mostly).

## Colordle Bookmarklet

The colordle bookmarklet is a chrome bookmarklet which brute forces all colordle colours to obtain a hex code prediction based on three initial guesses.

The effectiveness of this bookmarklet is limited, since it returns a hex code to guess, rather than a colour, but it's able to guess the correct hex code around 80% of the time.

To make this 100% accurate, a 4th initial colour should be added (probably black or white to determine the lightness / darkness.

## Linxicon Mapper

The linxicon mapper first analyses every combination of valid words in linxicon (incomplete list for initial demo, due to processing demand), creates a graph mapping of all matches, and then performs breadth-first search to identify the shortest route between the two starting words.

Processing of the partial list (containing only the valid starting words) was slow to complete, so expect a full list of all valid words would require a substantial amount of processing power.

Current method is able to identify paths accurately, efficiently, and with a low number of steps, though until complete processing is completed, it would be difficult to call this the "best" route.
