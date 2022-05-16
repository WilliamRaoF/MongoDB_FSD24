# MongoDB avec Docker

Ce guide explique comment installer MongoDB dans un conteneur Docker.

Vous devez donc au préalable installer Docker sur votre système avant de continuer : https://docs.docker.com/get-docker/

Si vous possédez **Windows**, il est plutôt conseillé d'installer MongoDB manuellement (c.f. guide `Install manuelle.md`) car Docker prend du temps à installer et à paramétrer si vous ne l'avez pas déjà.
Si vous possédez **macOS** ou **Linux**, vous pouvez en revanche continuer la lecture ici.

## Initialisation 

Tout au long de cette semaine, vous allez utiliser MongoDB dans un **conteneur Docker**, lequel a déjà été préparé pour vous.

Commencez d'abord par créer l'image Docker ainsi que votre conteneur avec le fichier `stack.yml` fourni :

```bash
docker-compose -f stack.yml up

# À noter que si vous changez qqch dans le fichier `stack.yml`, vous devrez reconstruire l'image :
# docker-compose -f stack.yml up --build
```

Une fois le conteneur lancé, vous pouvez vous connecter à un terminal bash à l'intérieur : 

```bash
docker exec -it docker_mongo bash
```

## Se connecter à MongoDB

Tout en restant dans le conteneur, connectez-vous à MongoDB grâce au programme `mongosh`

*Le login est "root" et le mot de passe est "example" (voir le fichier stack.yml)*

```bash
mongosh -u root -p example
```