# Tara

 A place where talent meets opportunity.


# Abstract 

Indian cinema is the largest national film industry in terms of the number of films produced and the number of tickets sold, with 3.5 billion tickets sold worldwide annually.Having said that, If you are the person who has this passion for pursuing your career in Cinema. Either it may be on-screen like a Lead actor, actress, junior artist or off-screen Direction of Photography, Director, Playback Singer, Dance Choreographer, etc.. You might be located in many rural parts of India but we heard you. On the other hand, dear passionate Indian Movie Makers are you looking for some passionate, young, new talent and dedicated artists to showcase in your upcoming dream project? Yes, we heard you too.

TARA is here .. Come build your dream future with us. This is the place where real talent meets the right opportunity.

Who are we?

Tara is a real-time entertainment-industry brand aimed at connecting local performing talent, with a special focus on casting, job opportunities, and much more.

# Persona/Target Users:

1)Artists looking for work in film, television, theater, commercials, voiceover, radio and more mediums and needing help to tailor and manage their careers, 
2)Casting directors and talent recruiters looking to hire the perfect cast and crew for their projects are our target audience.

# Hill Statement
Bringing together Talent and Opportunity in the arts and music industry through a commonn platform TARA and connect each other on real-time.

# Technology

### Architecture
![Architecture](tara-system-architecture.png)

### Optional Serverless Architecture
![Serverless Architecture](tara-serverless-system-architecture.png)

### Cloud Native Architecture
The application is designed using cloud native technologies, specifically AWS. The frontend will be served as a static website from an S3 bucket. The authentication and authorization will be via third party social identity providers using AWS Cognito. The stateless NodeJS servers will be running as Docker containers in an AWS ECS cluster. To provide global latency-free access to the application, the website will be served via a CloudFront CDN

### Backend Services
We will be using NodeJs APIs to fetch the values from the DynamoDB database. Since our application will render information on run-time, the non-blocking asynchronous nature of NodeJS will help us get good performance.

### Data Layer
The data will be stored and accessed from a serverless NoSQL database DynamoDB. DynamoDB provides document and key-value oriented storage structure which will assist in storing and querying unstructured data.

### Client Side
On the client side, we will make a ReactJS application. We are using ReactJS for the frontend as ReactJS is a light-weight library built over JavaScript, which doesn't re-render the entire DOM on change of components on the browser, rather it just re-renders the changed components. Hence ReactJS would improve application performance.

The frontend website is available at the following URL:
https://dgnchyrkhqge4.cloudfront.net/

# Team

1. Akshay Elavia
2. Purvi Misal
3. Shivani Jain
4. Sai Chaitanya Dasari
