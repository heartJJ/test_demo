FROM node

ENV APP_HOME /usr/src/app

COPY http1.js ${APP_HOME}/index.js

EXPOSE 3000

WORKDIR ${APP_HOME}

CMD ["node","index"]

# RUN cd $APP_HOME && node http.js
