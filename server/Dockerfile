FROM node:10.12.0-alpine
LABEL Author="Rodrigo Cipriani da Rosa"

ARG HOME=/home/app

# RUN useradd --user-group --create-home --shell /bin/false app

RUN mkdir -p ${HOME}
COPY ./server ${HOME}

WORKDIR ${HOME}

# VOLUME [ ${HOME} ]
# RUN chown -R app:app ${HOME}/*

# USER app
RUN ls -la
RUN npm install
# RUN npm install && npm cache clean --force
RUN ls -la node_modules

# WORKDIR ${SERVER}
# RUN npm install && npm cache clean --force

# WORKDIR ${CLIENT}
# RUN npm install && npm cache clean --force && npm run build

EXPOSE 4000

# WORKDIR ${HOME}
CMD [ "npm", "run", "dev" ]
# CMD [ "npm", "start" ]
