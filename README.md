#Finance Tracker

A finance tracker web app built using MERN stack and styled with Tailwind CSS, allows users to manage and track their expenses efficiently. The application provides an intuitive interface for users to add, view, and manage their financial records.

#Features

-User authentication (signup,login,logout)
-Add and view with amount and date
-Redux for state management, including user, expense and revenue data
-Responsive design using tailwind css and vanilla css
-Total expense and revenue displayed

#Technologies used

##Frontend

-Reactjs
-Redux for state management
-Tailwind css
-Vanilla css

##Backend

-Node.js
-Express.js
-Mongodb with mongoose

##tools

-Postman for api testing
-Vite for project setup
-JWT for authenticaiton

#API Endpoints

##Authentication

-POST /api/auth/signup - Create a new user account
-POST /api/auth/login - Log in an existing user
##User

-GET /api/user - Get the logged-in user data

##Expenses

-POST /api/expenses - Add a new expense
-GET /api/expenses - Get all expenses for the logged-in user
-DELETE /api/expenses/:id - Delete a specific expense

##Revenues

-POST /api/revenues - Add a new revenue
-GET /api/revenues - Get all revenues for the logged-in user
-DELETE /api/revenues/:id - Delete a specific revenue

#Acknowledgements

-MERN Stack Community : for providing valuable tutorials and resources on full-stack development.
-MongoDB Documentation : for its comprehensive guide on database management.
-React and Redux teams : for creating powerful tools that simplify frontend development.
-Tailwind CSS : for making it easy to design responsive user interfaces with utility-first CSS.
-Open-source contributors : for their continuous work on improving the developer ecosystem.
-Postman : for simplifying the process of testing APIs.
-GitHub : for providing a platform to share and collaborate on projects.

#Contributing

Feel free to open issues or submit pull requests. Contributions are welcome!
