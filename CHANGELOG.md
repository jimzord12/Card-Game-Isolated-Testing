# Changes: from Initial Version -> Latest Version

This log apart from the changes to the Genera Social Platform, it also contains brief remainders of what each component purpose/role is

## Visual Changes

- **Graphics**, probably the most noticable change from the users prespective. We created an enormous amount of high quality images utilizing the power of Mid Journey, a popular AI tool for generating copyright free images.
- **Layouts**, we changed the layout of many existing features to make them more user-friendly and intuitive. For instance, the TownHall window, the Buildings and Regs windows, etc.

## New Features

### Blockchain Related

- **Local Wallet**, greatly enhances the user experience (UX), especially for people not well-versed with Blockchain and Web3 Apps (Dapps). With this feature, we eliminated the need for an external crypto wallet, allowing a seamless interaction with the Web App from all devices.

- **Metamask Wallet Installation Guide**, for the blockchain enthusiasts we created a dynamic guide that helps them Install and Connect the wallet with the app. It also automatically performs some configuration to make Metamask point to our Custom Blockchain Network.

### Community

- **Rating Component**, taking advantage of the Apps Script service provided by Google, we connected the questionnaire with our web server, thus allowing us to have access to that data. Using this data, we constructed a Ratings Component that shows the Average Rating that users have posted for the game.
- **Google Forms Questionnaire**, we created a questionnaire to allow users to sends us feedback. Additionally, we integrated a system that will reward the users upon their 1st form submission with the platform's custom ERC-20 crypto token, MGS (MyGreenScore).
- **Discord Server**, currently this is the most modern and popular way of managing a community. Through Discord, users can provide more detailed feedback about the application and also ask questions, post their achievement, etc.
- **Youtube**, a playlist consisting of short videos is created to provide guidance and showcase the application. This is also a place for the community as people can post comments and receive replies.

### In-Game

The intial Game only had 1 default building (Town Hall) and 3 Cards.

In the current version, there are 2 default buildings (Town Hall + Factory) and 11 Cards (4x Buildings, 4x REGs and 3x SPs).

#### New Default Building

Default building are present at the start of the game and can not be deactivated, only leveled up. They play a core part in the game's gameplay.

- **Factory**, this feature was introduced, along side with the Diesel Barrel Resource, to make the player feel the transition from fossil fuels energy to renewable energy. Using the Factory decreases the citizens' happiness and requires the players to spend human resources on gathering Diesel Barrels. This way, the player can understand the benefits of utilizing REGs, whose benefits lay on not requiring human resources and not affecting the town's happiness. Their downsides are that they are expensive to craft and require maintaince (gold /h).

- **Town Hall**, even though is not an new consept , while updating the rest of the game's visual and logical elements we basically had to recreate it almost from scratch.

#### New Building Cards

Building Cards require gatherable resources in order to be crafted (as all Cards do). After successfully created, they can be activated, this means removing the from the Inventory and Adding them to the Town Map.

However, there are some caveats. The Town's Power Grid must be able to supply them with the enough power and also of course, there must be enough space. The Energy part can be fixed by utilizing the Factory or activating REG Cards. As for the space, the player can upgrade the Town Hall default building which traslates into expanding his/her town. By doing so, the Town can facilitate more Buildings, REGs and Citizens.

- **Tool Store**, makes resource gathering more efficient by increasing the gathering rates per hour.
- **Amusement Park**, this is considered a passive building, once activated it will increase the Town's Happiness by specific amount. This amount can be increased by leveling the Card up.
- **Hospital**, is the active version of Amusement Park, it the player to convert citizens into doctors in order to increase the Town's Happiness. By leveling it up, it can facilitate more doctors.
- **Radio Station**, is similar to Tool Store, but this one amplifies the effects produced by the SP Cards.

#### New REG (Renewable Energy Generator) Cards

All REG Cards are passive Cards, once activated they offer Green Energy and require Gold /h. If the player is not careful, at some point their Gold reserve will become insufficient to maintain the REGs. In that case, all REGs will be deactived which will probably cause the building to get deactivated as well (unless the Factory supplies energy to the Town).

There 2 main types of REGs, Wind Turbines and Solar Panels. For the purposes of gamifying Renewable Energy, we decided to make the Solar Panels more powerful than the Wind Turbines. For example, a Simple Solar Panel (lvl. 1, Rarity: Common) produces 500 Energy, whereas Simple Wind Turbine (lvl. 1, Rarity: Common) produces 400 Energy.

When leveling up a REG Card, its energy output is increase but so does its maintaince costs.

- **Simple Wind Turbine**
- **Super Wind Turbine**
- **Simple Solar Panel**
- **Super Solar Panel**

#### New SP (Special) Cards

SP Cards have no material form in the game. They simply provide a Effect that lasts for a day, which boosts specific rates based on the Card.

- **Wall Street**, boosts the Gold Income, meaning that the idle citizens will produce more Gold /h when the effect is active.
- **Love App**, increases the Population Growth.
- **Super Strong**, enhances the quarry workers, making them gather more resources.

#### Mini Quiz Game

A brand new addition is the Mini Quiz Game, this feature is a modal window that pops up whenever the user crafts or upgrades a Card/ Default Builing. It offers the chance of getting a resource refund based on how many correct answers they correctly answer. There is a total of 5 Enviromental Question from many different sectors. If the player maanges to answer 3 of them correctly they get maximum refund of 50%, 2/5 is 25%, 1/5 is 10% and 0/5 is 0%.

This feature was introduce as a way to offer more environmetal knowledge to the end-user while keeping the process fun and entertaining. It was also adviced by many scientific paper that descirbed guides for developing Serious Games.

#### Quarries

Quarries were introduced to the game to add a bit of depth and make it feel more realistic. Each gatherable resource on the Game has its own Quarry. Therefore, each Town has 4 Quarries (Concrete, Metals, Crystals, Diesel Barrels). Players can upgrade their Quarries by spending Gold, this allows them to increase the maximum number of worker a Quarry can support, thus increasing the production of the particular resource.

#### MGS Tokens

Now, when a user performs any of the following actions, he/she will be awarded with some MGS Tokens.

- Account Creation.
- Completing the Survey.
- Leveling Up Cards or Default Buildings.
- Buying a Card from the Marketplace.
- Reaching the Top 10 at the Leaderboard by end of the Month.

These tokens are ERC-20 crypto tokens and play the role of the platform's currency. Players can use them in the Rewarding Tool Web3 Application, to purchase In-game assets, upgrade Cards or re-enable SP Cards.

#### Leaderboard

This page's functionality was extended by adding the following features:

- A counter that will notifies players when the next MGS Give away is scheduled to happen
- A section was added to some previous month's Top 10 Players.

#### Marketplace

Regarding the core functionality there weren't note worthy changes. Plenty of bugs where fixed and some quality of life features were introduced to enchace the User Experience (UX).

For instance, when the user navigates to Card that picked their interest they can see their current balance and their new balance if they decide to go through with the purchase. Additionally, the button's attributes as text, state and color change depending on the user ability to buy the Card.

## Rewarding Tool

Due to some major changes taking place conserning the desired functionalities of this tool, 60-70% of the code was re-written from scratch.

- We integrated the Local Wallet feature to this Application as well (and it was not as simple as you may guess). This is because unlike Metamask when using the Local Wallet feature is not easy to pass data from the Game's Local Wallet to the Rewarding Tool's Local Wallet. The solution for this is not very user friendly but is at least simple (and there is a video explaining it). The user must copy their local wallet key from the Game and then use it at the Rewarding Tool's App to re-create it.
- Three new features regarding the Game were created:

  1. Convertion of MGS into In-Game Resources
  2. Upgrading a Card's Rarity using MGS
  3. Re-activation of SP Cards using MGS

- The Carousel Component was updated to display accurate and up-to-date information about the Genera Platform.

## Social Forum

The social forum received improvements regarding the its User Interface.

2 main categories were created: Social Game and Rewarding Tool, to better seperate the 2 Applications.

Content mentioning the updates, announcement and/or general information about these applications was inserted.

## Performance Improvements

- **Code Splitting**, this is famous technique to improve performance as the final bundled code is not a single large file but many smaller ones which get fetched from the server when needed and not that the initial render.
- **Image Preloading**, we are preloading the images in memory and by using a context provider the rest of the application can use them without the need to load them repeatedly. This also boosts UX quite a lot, as in the case that the user has a slow internet connection, he/she will only have to wait only once (in the start) for the images to load, where we have also added a simple yet beatiful loading page to keep them occupied.
- **Use of Modern Technologies**, the application has been built with state of the art web technologies. React, TypeScript, Vite, Eslint, TailwindCSS, MaterialUI, etc.

## Backend - Web Server

### Security

#### Authentication

The JWT (JSON Web Token) technique was implemented to identify users. For the ID we are using the accounts wallet address. We send both a Access and a Refresh Token initially, the access token has a short life spawn of 2h whereas the refresh token of 1 week.

#### Blockchain Transactions

All interactions with a Blockchain Network are in the form or transactions. Reading from a Blockchain does not require spending of crypto tokens, whereas writing does. When a player creates an Account or a Card, these changes need to be stored in the Blockchain, especially for the Card creation as we have to generate a NFT representation of that Card.

The problem here was that the player did not had any crypto, therefore he/she will not be able to use the app to its full capacity. To solve this, we provided the Web Server with a crypto wallet of its own. Afterwards, we created a tremendous number of crypto tokens and give a generous amount to the Server's Wallet. This way, whenever a new account is created the Server will check their crypto balance and if its below 0.2 ETH, it shall send them 0.5 ETH (just in case you are now familiar, this is enough to pay for thousands of transations).

However, another issue arised. Now, users could create multiple new accounts and sends these 0.5 ETH to their main account. Practically, this security issue is of small matter as the Network's native crytpo currency does not and will probably never have montery value. Even so, we desiced to take care of it by removing the transferability of the ERC-20 Contract.

Additionally, we also added a timestamp to know when was the last time that we sended ETH to a particular wallet address. This way we took care of the case when a user found a way to discard their 0.5 ETH and try to login in, the server would send them another 0.5.

### Auto MGS Rewards

Using the Web Server we have successfully automated the process of rewarding users with MGS upon:

- Survey Submission
- Game's Monthly MGS Give Aways

### Scalability (Docker)

Using Docker, we created an containerized version of the Express server application. This provides the following benefits:

- Ease of Deployment, we can the application to almost any cloud based environment, or any environmental that runs Docker.
- Scalability, as the app is now containerized it can be added to container orchistretion system that can automatically manage it.
- Sharability, it is very easy for other developers to run the application on their machines.
