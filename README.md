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
https://www.ibm.com/watson/natural-language-processing <br />
https://aws.amazon.com/comprehend/ <br />
https://cloud.google.com/natural-language/docs/ <br />

NLTK: <br />
https://www.nltk.org/ <br />

Kubernetes Custom Resource: <br />
https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/

### IDEA B 

1. Project Title: Real time plagiarism check and AutoCitation

2. Project Idea description <br />
Plagiarism is considered a critical issue in the world of academia and innovation. Plagiarism is not just copying content or somebody else's work but to steal or use sources without crediting the source. It is equivalent to committing literary theft. Although this is of major concern, a lot of students tend to not spend as much effort on proper citations and bibliography as it turns out to be time consuming for them in the midst of doing the actual work of writing papers. 

3. Goal of the project <br />
We will develop an application that provides you with a text editor where one can directly start writing their thoughts and content, your content will, in real time, be searched/compared in the large corpus of papers and documents on the web and will prompt you if your content is matching word-to-word to somebody else's. This app will also auto cite your references without you having to dedicate time for citations. 
Tags: autocitation, academia

4. Technology stack: <br />
Kafka streams to search for statements as they're being typed, Information retrieval techniques with ranking algorithms(Vector Space Model), NLP using NLTK and CoreNLP,  Remaining TBD

References:<br />

https://en.wikipedia.org/wiki/Vector_space_model <br />
https://www.nltk.org/ <br />
https://stanfordnlp.github.io/CoreNLP/ <br />
https://kafka.apache.org/documentation/streams/ <br />


### IDEA C <br />
