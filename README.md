# App Template

#### App template description

This is a monorepo with NestJs api on the backend, and NextJs app serving React on the web. Most of shared configs are stored in root folder.

## Backend

Backend is a REST API built with NestJS, using TypeORM for db interaction. It's using MariaDB, but we will switch to Postgres when Directus reach version 9. User have access to Directus CMS control panel, that allows him/her to CRUD data, change access... It's using S3 bucket for storing photos and files.

## Frontend

Frontend is a NextJS app that serves React. It uses Material UI for components, Redux for state.

## Requirements

It's easiest to use this app with docker-compose that contains db, redis, proxy.

#### MariaDB (Will be switched to Postgres in the future)

Currently Directus support only MySQL, in future switch to Postgres

#### Redis

It uses Redis for chaching

### Traefik

Used as a web server. It provides Let's Encrypt support out of the box. It is better suited for this kind of app than Nginx.

## DNS

All public trafic is HTTPS.

api.example.com => REST API
cms.example.com => CMS
www.example.com => Web App

Storage is accessed directly. There is not storage.example.com. Use directly S3 bucket path.
