## Gettem

---

The portfolio website source code for [https://joneid.dev](https://joneid.dev)

  


### Prerequisities

- Docker

  


### Get Started

1. #### Clone Repo and Navigate to root dir

```
git clone https://github.com/Jonathan-Eid/gettem.git
cd gettem
```

1. #### Initiate .env variables

```
cat << EOF >> .env

export ADMIN_JWT_SECRET=YehBmC8QPFQ13SCjGyKd ## these are not really what I have in prod, I'm security minded ;)
export API_TOKEN_SALT=pYpQ60YQD3GbQKQdzi5iEd
export APP_KEYS=[bZtVyR443Vo8BhHcKViHgBsVWCcIbYw0FPGYOB]
export STRAPI_URL=http://localhost:1337
export URL=http://localhost:1337

EOF
```

```
source .env
```

1. #### Start Strapi

```
./install-deps.sh
docker compose up -d strapi
```

1. #### Create API Token for the Frontend

- Navigate to your strapi instance @ localhost:1337 
- Create your admin account
- Navigate to Settings > API Tokens as shown below:

alt text

- Click on "Create new API Token"
- Give your token a name
- Set "Token Type" to "Custom"
- In the "Permissions" section
  - Click on the "Card","Github", "Resume", "Upload" Tabs and select "find" & "findOne"
  - Click on "Content-type-builder" Tab and select "getContentTypes" & "getContentType"
- Save your token and copy the token id
- `echo export STRAPI_AUTH_TOKEN=REPLACE_WITH_TOKEN_ID >> .env`
- `source .env`

1. #### Start React Frontend

```
docker compose up -d gettem
```

- Navigate to the React app @ localhost:3000

