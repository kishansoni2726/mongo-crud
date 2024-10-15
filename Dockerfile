FROM node:22-slim
WORKDIR /var/crud/
COPY package.json .
RUN npm install --only=production
COPY . .
EXPOSE 3000
CMD ["node", "app.js"]


