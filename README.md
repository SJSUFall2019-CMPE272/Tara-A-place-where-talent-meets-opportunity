# ProjectGroup-18

New Ideas:


### Project Title 1: MyBuddy

a.  Project Idea description <br />

As programming engineers, we need to utilize various innovations at the work environment to complete work. Sometimes we are
lazy to go and check the status of the deployment task in docker etc.. The innovation stack different significantly from
instruments like GitHub, other repositories to form source code, item fabricate frameworks like Jenkins, Bamboo. These tools
are normally worked in with API's to connect with. A platform to  collaborate with every one of these tools and recover
essential data would be helpful to improve the engineer involvement.

b.Goal of the project <br />

We have a solution. We are coming up with a chat bot that communicates with your item by structure drawing in voice and
content based conversational interfaces controlled by Artificial Intelligence.

It's basically one buddy at your workplace to get information related to things that you are working or owning.

c.Technology stack <br />
    Google's AI , Dialogflow  and on similar lines with Siri and TBD.



### Project Title 2: Helping Hand

a.  Project Idea description <br />

In Developing Countries like India, there are many financial constraints for the young generation to achieve their dreams. Most of the times they get inhibited and drop the ideas(like higher education(in India or abroad), startup ideas, etc..,). This problem exists in many parts of India.

Few reasons are
A. Banks are not ready to finance them
B. Rural people can't approach big financial firms for a loan.

On the other side of it. There are many people who want to fund the people for their ideas or for their Education based on
their caliber and assessing them whether they can repay the amount that they are offering. If they feel it is a very good
investment the one in need gets his funding to chase his dream.


 b.Goal of the project <br />

We want to give a solution to this problem through our HelpingHand.

So what is this HELPING HAND?
Helping Hand is an application that fills the gap between need and surplus.

How are we doing it?
In our case, it's gonna be Student who registers on the website and fills the details and explains his portfolio and then we
run the sentiment analysis with machine learning and combine his other metrics through  Information retrieval techniques with
ranking algorithms and summarize his whole need.

On the other hand, we will match this particular need person with one of the sponsors who want to contribute (idea is to find 
nearby contributors through location coordinates). If the contributor approves this case they can connect and discuss the next
steps to proceed further.

Note: The donor's are not donating money they are giving it as a loan with their mutual terms where we are not involved.

c.Technology stack <br />
Frontend - html,css,react,Express,Machine learning libraries(pandas,numpy,scikit) ,Information retrieval techniques with ranking algorithms(Vector Space Model),NLP,NodeJs,Mongodb deploy with Docker.

References:<br />

https://en.wikipedia.org/wiki/Vector_space_model <br />
https://www.nltk.org/ <br />


### Project Title 3: Uplifting News

a. Project idea description <br />
Whenever we open any news app, it's filled with pessimist stories about global warming, democracy in turmoil, human suffering, 
and many other unsavory happenings. Since these stories are sensational and eye-grabbing, they occupy most of the top headlines.
Browsing through this feed, not only we feel demoralized and anxious about the state of the world we live in, but also we remain unaware 
about positive developements and major breakthroughs occuring around us which aren't as newsworthy. <br />
To tackle this issue, we intend to develop a system that ingests in real time an assortment of news stories from major publications 
around the world, and apply basic sentiment analysis to select positive stories. 
This will result in a news feed which is populated with uplifting stories which makes us cognizant of all the progress and optimistic
developments happening in the world.

b. Goal of the project: <br />
This application is targeted towards news consumers who want to cut out the noise of the usual news cycles and instead focus on positive 
and uplifting stories. It can also be used by editors of news organizations to create category-wise listicles for their consumers.

c. Technology stack: <br />
We'll use Kafka Streams to ingest RSS feeds from major international publications and apply sentiment analysis on the incoming stream
of news stories to classify them as positive or negative. For performing sentiment analysis, we'll use either public NLP APIs or develop
a custom model using BERT NLP pre-trained models. The news feed will be displayed on a web portal which can be refreshed to publish the incoming stories. 
In order to adhere to the best practices, we'll design the application with a microservice oriented architecture in mind packaged as containers. Since the application will be served as a set of APIs, it can be consumed easily and clients can be developed for any platform like web or mobile applications.
If possible, we'll also develop a custom Kubernetes Operator and a Custom Resource to automate and seamlessly update and deploy our
application.

##### References: <br />
Kafka Streams: <br />
https://kafka.apache.org/documentation/streams/

Sample News RSS Feeds: <br />
https://news.google.com/rss <br />
https://www.nytimes.com/svc/collections/v1/publish/https://www.nytimes.com/section/world/rss.xml <br />
http://feeds.bbci.co.uk/news/world/rss.xml <br />

Public NLP APIs: <br />
https://www.ibm.com/watson/natural-language-processing <br />
https://aws.amazon.com/comprehend/ <br />
https://cloud.google.com/natural-language/docs/ <br />

Custom NLP Frameworks: <br />
BERT: https://github.com/google-research/bert <br />
NLTK: https://www.nltk.org/ <br />

Kubernetes Custom Resource: <br />
https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/

### Project Title 4: AMI : friend

a.  Project Idea description <br />
To analyse and understand the user's mental health by asking normal day to day questions through a chatbot.

b.Goal of the project <br />
The project aims to identify if the user is suffering from any such mental disorder. 
The chatbot interacts with the user by initiating normal conversations like "how did the day go?", "what went good" ; provinding therapy and posting therapy center contacts for further help.

c.Technology stack <br />
    TBD



### Project Title 5: StepItUp

a.  Project Idea description <br />
A way for fundraising and encouraging physical exercise. Just take 10,000 steps a day whenever you like, wherever you like, and log your steps online to raise money for the cause you feel most passionately about. You can start your own fundraiser to save someone or the world, one step at a time. Anybody with this app can then contribute to the cause. 

b. Goal of the project: <br />
Raise awareness of certain issues and encourage good health. 

c. Technology stack: <br />
Python, pydometer package, Rest TBD

##### References: <br />
Inspired from the following:   <br />
https://www.steptember.org.au/about-us/  <br />
https://www.steptember.us  <br />
https://www.change.org  <br />


### Project Title 6: Loglytics
a. Project Idea description <br/>
Production enterprise application deployments are deployed on cluster of machines running varied software stacks serving hundreds of applications. Each application has different format and contain critical data which is invaluable for system diagnostics and debugging. However, since these logs are created and managed by each application in their own custom manner, it becomes very difficult to get a single system-wide operational view of the system. It also becomes cumbersome to predict any outages or reasons for occured disruptions. These logs (infrastructure logs, application logs, trace logs, etc) contain a wealth of information which, if collated and analysed intelligently, can not only help in finding the root cause of a system failure, but also help predict any future outages and suggest preventive measures. We intend to implement real time machine learning on the log events occuring in the application. Another feature of this model will be to classify the service interruption root cause and automatically create tickets in the Issue Tracking System based on the logs generated.

b. Goal of the project: <br />
This application is targetted towards SysAdmins and Site Reliability Engineering teams who want to leverage analytics to gain better observability of their systems.

c. Technology stack: <br />
We'll use opensource lightweight data shippers (like fluentd) to transfer the log contents to a Kafka cluster, and Kafka Streams to process the incoming stream of data. We'll use the historic log data to train our predictive machine learning model. We'll try to find correlations between log events across applications in order to understand, diagnose and predict future outages.
