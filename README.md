# ProjectGroup-18

### IDEA A

1. Project Title: Uplifting News

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
This application can be utilized by anyone who wants to cut out the noise of the usual news cycles and instead focus on positive 
and uplifting stories. Since the application will be served as a set of APIs, it can be consumed easily and clients can be 
developed for any platform like web or mobile applications.

4. Technology stack: <br />
We'll use Kafka Streams to ingest RSS feeds from major international publications and apply sentiment analysis on the incoming stream
of news stories to classify them as positive or negative. For performing sentiment analysis, we'll use either public NLP APIs or develop
a custom model using NLTK. The news feed will be displayed on a web portal which can be refreshed to publish the incoming stories. 
In order to adhere to the best practices, we'll design the application with a microservice oriented architecture in mind. 
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
https://aws.amazon.com/comprehend/ <br />
https://cloud.google.com/natural-language/docs/ <br />

NLTK: <br />
https://www.nltk.org/ <br />

Kubernetes Custom Resource: <br />
https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/

### IDEA B <br />
### IDEA C <br />
