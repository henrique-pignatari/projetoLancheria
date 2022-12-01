#FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base

#LABEL versiom="1.0" mainteiner="HENRIQUE"

#WORKDIR /app

#COPY ./dist/back .

#ENTRYPOINT [ "dotnet", "projetoLancheriaBackend.dll" ]

FROM node:16

WORKDIR /app

COPY ./dist/front .

RUN npm install
#RUN npm start
# ADD ./dist/back/init.sh .
ENTRYPOINT [ "npm", "start" ]