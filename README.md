## LORDOS

### A faire
- [ ] Changer le parametre alias des commandes, faire en sorte qu'il prenne une array d'alias.
- [ ] Ajouter le paramtre "category" dans le constructeur des commandes, pour pouvoir mieux les classés.
- [ ] Diviser les commandes dans plusieurs dossier nommé par type de catégorie et faire un auto loader effiace pour ce systeme.
- [ ] Changer le constructeur des commandes : (nom de la commande, description, categorie), et ajouter les methodes setUsage(), setAliases() et setPermission()

### Commandes
#### Configuration :
- [ ] prefix -> changer le prefix des commandes pour ce serveur

#### Utils :
- [ ] translate (lang) (phrase) -> traduit une phrase
- [ ] hash (sha256, md5) (phrase) -> hash une phrase
- [ ] invite -> ???? (invite manager)
- [ ] heure (zone géographique) -> obtenir l'heure
- [ ] giveaway -> ????

#### Modérations :
- [ ] clear (nombre, par default : 10) -> permet de clear les messages du salon
- [ ] mute
- [ ] warn
- [ ] ban
- [ ] kick 
- [ ] unban
- [ ] rename (user mention) (new name)

#### Musique :
- [ ] play (titre, lien youtube ou spotify) -> permert de jouer une musique dans le salon vocal
- [ ] stop -> stop la musique dans votre salon
- [ ] nowplaying -> voir le titre, le lien et le temps restant de la musique en cours
- [ ] skip -> passé à la musique suivante
- [ ] queue -> voir la liste des musique qui vont être joué

#### Fun :
- [ ] foodporn -> envoie des images de bouffe qui donne envie

#### Information :
- [ ] lordos/bot -> obtenir des informations sur le bot, ses développeurs ainsi que les liens utiles
- [ ] covidinfo -> obtenir des informations sur le covid via cette API : https://blog.shevarezo.fr/post/2020/03/25/recuperer-statistiques-coronavirus-covid-19-ligne-de-commande-cli

#### Jeux :
- [ ] shifumi (pierre, feuille ou ciseaux) -> lancé une partie de shifumi contre le bot
- [ ] pendu (play) -> faire le jeu du pendu avec un ascii-art

#### Générateur de meme :
- [ ] bon toutou (pseudo) (couleurs) -> un meme bon toutou avec le pseudo de la personne
- [ ] compability (mention) (mention, par default : vous) -> créé une image avec les photos de profil des deux personnes séparé par un pourcentage d'amour et une image selon ce pourcentage
- [ ] trigerred (mention, par default : vous) -> envoie votre photo de profil en mode trigerred

#### Classement :
- [ ] level -> voir son level (il évolue quand on envoie un message)
- [ ] toplevel -> voir le classement des levels

> help : ranger les commandes via leur catégories
> url : adapté aux multi serveur
> eval : ne pas définir de permission mais donner la possibilité de l'utilisé que aux développeurs du bot
> calul : trouver des failles, amélioré le systeme
> countdown : ne fonctionne pas
> choicenumber : l'adapter au multi serveur
> dice : ajouter le total de tout les dès lancé
> minecraftquery : ajouter le support des serveurs Java
> parsecheatcode : changer le nom de la commande
> votemute : unmute la personne automatiquement après 5 minutes
> taquin : finir les regles du jeu
> help : deplacer les informations précise d'une commande dans une autre commande puis mettre des pages avec les catégories
> wikirandom : fixer pour les personnes sur téléphone
> votemute : réadapter la commande pour qu'elle soit fonctionnelle sur tout les serveurs
> emojiannonce : lance une boucle infini