# ProjectGroup-18

### Project Title 1: Helping Hand

#  Project Idea description

In Developing Countries like India, there are many financial constraints for the young generation to achieve their dreams. Most of the times they get inhibited and drop the ideas(like higher education(in India or abroad), startup ideas, etc..,). This problem exists in many parts of India.

Few reasons are
A. Banks are not ready to finance them
B. Rural people can't approach big financial firms for a loan.

On the other side of it. There are many people who want to fund the people for their ideas or for their Education based on their caliber and assessing them whether they can repay the amount that they are offering. If they feel it is a very good investment the one in need gets his funding to chase his dream.


# Goal of the project

We want to give a solution to this problem through our HelpingHand.

So what is this HELPING HAND?
Helping Hand is an application that fills the gap between need and surplus.

How are we doing it?
In our case, it's gonna be Student who registers on the website and fills the details and explains his portfolio and then we run the sentiment analysis with machine learning and combine his other metrics through  Information retrieval techniques with ranking algorithms and summarize his whole need.

On the other hand, we will match this particular need person with one of the sponsors who want to contribute (idea is to find nearby contributors through location coordinates). If the contributor approves this case they can connect and discuss the next steps to proceed further.

Note: The donor's are not donating money they are giving it as a loan with their mutual terms where we are not involved.


# Technology stack: 
Frontend - html,css,react,Express,Machine learning libraries(pandas,numpy,scikit) ,Information retrieval techniques with ranking algorithms(Vector Space Model),NLP,NodeJs,Mongodb deploy with Docker.

References:<br />

https://en.wikipedia.org/wiki/Vector_space_model <br />
https://www.nltk.org/ <br />


### Project Title 2: Uplifting News

2. Project idea description <br />
Whenever we open any news app, it's filled with pessimist stories about global warming, democracy in turmoil, human suffering, 
and many other unsavory happenings. Since these stories are sensational and eye-grabbing, they occupy most of the top headlines.
Browsing through this feed, not only we feel demoralized and anxious about the state of the world we live in, but also we remain unaware 
about positive developements and major breakthroughs occuring around us which aren't as newsworthy. <br />
To tackle this issue, we intend to develop a system that ingests in real time an assortment of news stories from major publications 
around the world, and apply basic sentiment analysis to select positive stories. 
This will result in a news feed which is populated with uplifting stories which makes us cognizant of all the progress and optimistic
developments happening in the world.

3. Goal of the project: <br />
This application is targeted towards news consumers who want to cut out the noise of the usual news cycles and instead focus on positive 
and uplifting stories. It can also be used by editors of news organizations to create category-wise listicles for their consumers.

4. Technology stack: <br />
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


