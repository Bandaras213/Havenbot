<p align="center">
  <img src="https://puu.sh/AXVSD.png" alt="Haven Discord Bot"/>
</p>

# Haven Bot by xTobiShotz
**Firstly I would like to mention that this my first programming project!**
**Lots of things are hard coded, some of the code is messy and theres a big chance the bot will just crash when an error occurs.**
**But I'm sure that as I learn these things all of it will improve!**

## Config.json file
| Setting | Default | Description |
| ---------------- | ------------ | ------------ |
| token | "DISCORD_TOKEN | Discord Bot Token. |
| ownerID | "OWNER_ID" | Discord ID of the owner. |
| prefix | "." | Prefix used for commands. |

## Index.js
**This is the file where everything gets called etc.**

## Functions, Events and Commands

* ## Functions
  - **Log**
	+ Neatly formats messages for console logging.

- ## Events
	+ **Ready**
	  * Logs when the bot is ready and sets a random Gold Saucer game as playing activity every 5 minutes.
	+ **Message**
		* Picks up messages to filter out the prefix and commands to execute and execute them.
	+ **GuildmemberAdd**
		* Welcomes the user that joined in the #main channel, assigns the "Visitor" role and sends an embed with some of their Discord information to #memberlog.
	+ **GuildmemberRemove**
		* Just sends an embed with some of Discord information of the user that left #memberlog.
	+ **Error**
		* This should hopefully log erros such as disconnects and let it auto reconnect. (?)
 + ## Commands 
 
 	* ### Admin Roles Only
		- **say**
			+ Lets the bot say anything and deletes the original message.
		- **del**
			+ Uses bulkDelete to delete 1-100 messages at once. 
		- **checkmember**
			+ Checks the mentioned user and sends an embed with some of their Discord information.
		- **checkrole**
			+ Checks a role and sends an embed with all users in the specified role.
			
	* ### Verification
		- **iam**
			+ Fetches XIVSync data of the given Charactername to see if it exits. If it does, switches the "Visitor" role with the base member role "Recruit" and sends an embed with their Lodestone information and Discord tag. (Server is hard coded to Ragnarok)

	* ### Info
		- help
			+ Sends an embed with all available commands with short explanations. (still manually added)
		- fcinfo
			+ Sends an embed with Free Company information from the lodestone. (not fetching, hard coded)

	* ### Fun
		- **checkself**
			+ Checks the user and sends an embed with some of their Discord information.
		- **poll**
        	+ Creates a poll with a question given by the user using ?? / ?? / ?? reactions. (no evaluation)
		- **rate**
        	+ Rates something / someone (if specified, if not rates the user that triggered the command) a number out of 10.
		- **8ball**
			+  Magic 8-Ball for fortune-telling or advice seeking with sassy answers.
		- **d6 / d20**
			+ Dice rolling with 6 and 20 sided dice.
	* ### Debug
		- **ping**
			+ Gets Bot and API Latency.
		- **test**
		    + Usually its just "Hello, World!". But I sometimes use this command to test code.

## Credits

* **Libraries Used**
  - Discord.js: [Website](https://discord.js.org/#/), [Github](https://github.com/discordjs/discord.js)
  - Moment.js: [Website](http://momentjs.com/), [Github](https://github.com/moment/moment/)
  - Sneckfetch.js: [Website](https://snekfetch.js.org/), [Github](https://github.com/devsnek/snekfetch)

- **API's Used**
	+ XIVSync: [Website](https://xivsync.com)

* **Programming**
  - xTobiShotz (A'rata Kokonoe)

+ **Ideas**
  * Fetching Lodestone Info on **iam**
    + Jessika James
  * Fun Commands (8ball, d6/20, rate, checkself)
	- Emilia Rosenthal
	- Ari Anna
	- Momo Wistera
