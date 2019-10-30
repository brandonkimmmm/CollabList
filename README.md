## CollabList

![Gif](https://i.imgur.com/muIbTjH.gif)

Collablist is a real-time collborative web-application where multiple users can create, read, update, and delete items on a list. The list will be updated for every member of a list the moment one of them perform CRUD actions. The app is a great way for teams to efficiently and effectively collaborate on shopping lists, to-do lists, or any other forms of lists.

## Links

* [Github](https://github.com/brandonkimmmm/grocery-list)
* [Deployed App](https://brandonkimmmm-grocery-list.herokuapp.com/)
* [Trello](https://trello.com/b/f6ryUiwP/grocery-list)

## Built With

* **Client**
	* React
	* Socket.io-client
	* React-router
	* Material-ui
	* React-alert
	* React-scripts
	* Prop-types
* **Server**
	* Node
	* Express
	* Express-session
	* Postgresql
	* Sequelize
	* Passport
	* Socket.io
	* Sequelize-cli
	* Dotenv
	* Bcryptjs

## Screenshots

### Landing
![Landing](https://i.imgur.com/hbbycQJ.png)

### Sign In
![Sign In](https://i.imgur.com/W4ywI52.png)

### Sign Up
![Sign Up](https://i.imgur.com/xeYauea.png)

### User Landing
![User Landing](https://i.imgur.com/X1Z7A5r.png)

### Create List
![Create List](https://i.imgur.com/bBr9qsO.png)

### List
![List](https://i.imgur.com/4VRKkSs.png)

### Create Item
![Create Item](https://i.imgur.com/XFPrO8J.png)

## Background

Before starting the app, I had made more Node.js apps than React apps. I also hadn't worked with React for a few months so I wanted to brush up on it while still working with Node.js which I was more comfortable with. These reasons coupled with the fact that I desired to gain some experience building full-stack web applications using both React and Node (something I had never done) was why I decided to user React for the front-end of this app with Node serving as the back-end. 

## Problems along the way (and what I did)

___Getting started___
I initially had a difficult time with building the framework for a full-stack app using React and Node. I had no experience with it and wasn't really sure what I had to do at all. I spent the first day reading online guides and watching YouTube tutorials on how to set up full-stack apps. The source I found most helpful was a Medium article titled [How to get create-react-app to work with a Node.js back-end APi](https://medium.freecodecamp.org/how-to-make-create-react-app-work-with-a-node-backend-api-7c5c48acb1b0). It outlined the proper folder structure to follow and taught me how to call server routes from react using a proxy and an async function fetching the json responses from the server. 

___Styling___
I wanted to style the front-end with something other than Bootstrap. I used Bootstrap for my last three projects and have become pretty familiar with it. To gain some expereince with another front-end framework, I decided to use Material-ui for this app. However, I found Material-ui to be a bit confusing to understand at first which slowed down my progress with the app. I didn't want to take too long with the app so I decided to only use the simple Material-ui elements like Button and Navbar. I plan on fixing the front-end as soon as possible. 

___Websocket___
I needed a way to update the items in real-time so the app could truly be collaborative. Having no experience with implementing such actions, I googled ways to do so and found out about websockets. I ended up using Socket.io as the websocket and was able to implement it into my app after a few hours of learning about the technology. I setup Socket.io with my Node server and had it listening for any calls from the front-end via Socket.io-client.

___Time___
I had spent too much time in the beginning figuring how to setup and deploy a full-stack web app using Node as the back-end and React as the front-end. Furthermore, I had to refamiliarize myself with React as well as learn how to use Socket.io and Material-ui along the way. These tasks took about 2 days and I ended up going over about three days past the allotted week. To finish fast, I skipped certain aspects of styling (which is painfully obvious). Like I said above, I plan on fixing the styling as soon as possible. 

## Things I still want to complete

***List Admins***
I would like to make an admin model that belongs to a list and has many users. I can them make it so only admins of a list can perform crud actions on both items and members of the list.

***Styling***
I want to familiarize myself more with Material-ui and make the app more pleasing to look at. Currently, it's using basic HTML and CSS save for a few Material-ui buttons and modals.

***Membership list index real-time update***
I want to call socket.io when a user is removed as a member of a list and have it return a new array of lists the user is a member of.

***validation, authorization helper file for server***
By making a validation file to check and see if data fields are valid for post calls to the server, I can greatly reduce the number of lines in the code. An authorization file would do the same thing. 

***List update and delete***
I want to make it possible to update and delete lists.

***List member tiers***
Members would be given the authorization to edit, update, create, and delete items in the list by making their canEdit attribute true.

***Create and Update item buttons***
The button to create and edit items is shown to any signed in user. I would like to make it so only admins, owners, and authorized members can see the buttons.

***React testing***
I would make a test file for the client side of the app using jest.

## Takeaways

***Write problems and solutions down while building***
While writing this README, I found myself wishing that I had written down all the problems I ran into while developing the app. It would make writing this a lot easier. Writing down the trade-offs I made would also have been beneficial for writing this. 

***Wrtie better user stories***
My user stories were a little vauge. I wrote down the main ideas of the app but didn't write down all the necessary steps I would have to take in order to do so. I think it would have been more beneficial if I broke down the user stories to allow them to be completed within a single git branch. 

***Full-stack development using React and Node***
I learned a lot about building a full-stack web app using React and Node. I feel I gained valuable expereince and am planning on developing another full-stack app after I'm done with this one. It really shows me the power of both technologies.

***Websockets***
I learned the value of websockets, specifcally Socket.io, while building the app. I will use it the next time I need to develop a real-time app, like a messaging app.

***Test before coding***
I felt both the value of writing tests before coding as well as the pain of not doing so. I wrote tests for the server side which made coding a breeze. If I had wrote tests for the client side, it would have shrunk my development time by a large margin. 