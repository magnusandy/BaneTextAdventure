

story.xml
-  The syntax here might not be super intuitive, but the idea here is that the 
 story/game for every character is made up of a list of named tags, so the story line for 'driver'
 is comprised of all the driver tags. when this file read, it simply makes an array of all the named tags
 and starting at the first one, whenever a player types in a command that has "crit": "true" it moves on to
 the next tag in the line. So the story is linear in that you cannot go back or have different branches, it only
 moves on to the next name tag.
 - It is important to note, that all commands should be written in all lowercase, as the user input is scrubbed and converted to all lowercase
	before the xml commands are searched.