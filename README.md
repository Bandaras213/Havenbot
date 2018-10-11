<p align="center">
  <img src="https://puu.sh/AXVSD.png" alt="Haven Discord Bot"/>
</p>

# Haven Bot
**Firstly I would like to mention that this my first programming project!**
**Lots of things are hard coded, some of the code is messy but I'm sure that as I learn these things all of it will improve!**

## Config.json file
| Setting | Default | Description |
| ---------------- | ------------ | ------------ |
| token | "DISCORD_TOKEN | Discord Bot Token. |
| ownerID | "OWNER_ID" | Discord ID of the owner. |
| prefix | "." | Prefix used for commands. |
| ffxivapikey | "API_KEY" | xivapi.com API Key. |

## Index.js
**This is the file where everything gets called etc.**

## Data, Functions, Events, and Commands
* ## Data
  - **data**
	+ Some Local stored data including Grand Companys, Jobs, Race/Tribes and Total number of Mounts/Minions
  - **img**
	+ Some Local stored images Images for .lookup like the Background, Grand Companys and their ranks, Guaridan Deitys and Images for the Join/Leave embed.

* ## Functions
  - **Log**
	+ Formats messages for console logging. Errors still look a bit wonky but it works.

- ## Events
	+ **Ready**
	  * Logs when the Bot is ready and sets a random Gold Saucer game as playing activity every 5 minutes.
	+ **Message**
		* Picks up messages to filter out the prefix and commands to execute and executes them.
	+ **GuildmemberAdd**
		* Sends an embed with some Discord information of the user that joined to #memberlog.
	+ **GuildmemberRemove**
		* Sends an embed with some Discord information of the user that left to #memberlog.
	+ **Error**
		* This logs erros such as disconnects and lets it auto reconnect.

 + ## Commands

 	* ### Admin Roles Only
		- **say**
			+ Lets the bot say anything and deletes the original message.
		- **del**
			+ Uses bulkDelete to delete 1-99 messages at once.
		- **checkmember**
			+ Checks the mentioned user and sends an embed with some of their Discord information.
		- **checkrole**
			+ Checks a role and sends an embed with all users in the specified role.
		- **mute**
			+ Assigns a "Mute" role (and if in a voicechannel, server mutes them) which will make them unable to write/talk for a defined period of time.
		- **fa (iamforce.js)**
			+ Adds a member to the Recruit role without checking lodestone. (needed for characters that are too fresh and not on lodestone)

	* ### Verification
		- **iam**
			+ Fetches XIVAPI data of a given Character to see if it exists and what Rank they are inside the Free Company. Changes their Nickname and assigns them their Rank Role, then welcomes them with an embed of their Lodestone  and Discord information in #main.

	* ### Info
		- **help**
			+ Sends an embed with all available commands with short explanations. (still manually added)
		- **fcinfo**
			+ Sends an embed with Free Company information from the lodestone. (not fetching api data, hard coded)
	    - **lookup**
			+ Fetches XIVAPI data of a given Character and returns an image with their Lodestone stats. (Character Picture, Name, Race/Tribe/Gender, Title, Grand Company + Rank, Nameday, Job Levels)

	* ### Fun
		- **checkself**
			+ Checks the user and sends an embed with some of their Discord information.
		- **poll**
        	+ Creates a poll with a question given by the user using 👍 / 👎 reactions. (no evaluation)
		- **rate**
        	+ Rates something / someone (if nothing is specified rates the user that triggered the command) a number out of 10.
		- **ship**
			+ Ships two people. (0-100% compatibility)
		- **8ball**
			+  Magic 8-Ball for fortune-telling or advice seeking with sassy answers.
		- **d6 / d20**
			+ Dice rolling with 6 and 20 sided dice.

	* ### Debug
		- **ping**
			+ Gets Bot and API Latency.
		- **updatedata**
		    + This is just a command to update the Minion and Mount total until I make it update itself once a month or so.

## Credits

* **Libraries Used**
  - Discord.js: [Website](https://discord.js.org/#/), [Github](https://github.com/discordjs/discord.js)
  - Moment.js: [Website](http://momentjs.com/), [Github](https://github.com/moment/moment/)
  - Sneckfetch.js: [Website](https://snekfetch.js.org/), [Github](https://github.com/devsnek/snekfetch)
  - ms.js: [Website](https://npmjs.com/ms), [Github](https://github.com/zeit/ms)
  - node-canvas.js: [Website](https://www.npmjs.com/package/canvas), [Github](https://github.com/Automattic/node-canvas)

- **API's Used**
	+ XIVAPI: [Website](https://xivapi.com), [Github](https://github.com/xivapi)

* **Programming**
  - xTobiShotz (A'rata Kokonoe)
  - Bandaras213
