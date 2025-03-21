# SearchBar - Docker

## Prérequis

- Avoir Docker d'installé sur sa machine, pour la gestion des conteneurs
- Avoir Docker Compose (installé avec Docker Desktop)
- Avoir Git pour le clone du projet

## Installation

1. Cloner le repository dans un espace de travail  
    **Lien :** https://github.com/maelgllt/evaluation-docker.git
2. Se placer dans le projet  
```bash
cd .\evaluation-docker\
```
3. Insérer le fichier ***.env*** à la racine du projet, au même niveau que le fichier ***compose.yaml***
4. Lancer la commande suivante pour lancer les conteneurs : 
```bash
docker-compose up
```
5. Ouvrir un navigateur et entrer : **localhost:80**
