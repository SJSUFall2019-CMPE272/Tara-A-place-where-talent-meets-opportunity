FROM itselavia/tara_base_image:latest

COPY package*.json ./

RUN npm install

COPY src/ src/
COPY index.js index.js

CMD ["node", "index.js"]