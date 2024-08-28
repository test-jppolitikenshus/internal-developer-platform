# Hvad tilbyder den...

Parvise clustre - test og prod

Udviklerne bygger koden. 

Overleveringen sker via et docker registry. 
- Vedligeholder cluster via github repository. 
- Test/prod er uafhængige mht kørende services, men benytter samme repos. (Håndtering af trunk-based, branch-based)
    - Det kan være nødvendigt at have flere repos mod ArgoCD i hvert cluster. (Afgrænset via services.)
    - Polling af repos. Eller webhooks fra git? (Anbefaler webhooks??)
    - Har hvert cluster har en enkelt ArgoCD.


Cluster bestilles i produkt/platform-enheder.


Domænenavne? 
- Er det altid afhængigt af et cluster? 
- Kan hvert cluster reservere subdomæner på et fælles domæne..

Udgangspunkt i standardrepo
- Standardtemplates for 
  - disk 
  - lb
  - helmcharts

Loadbalancer 
- Skal udstilles af idp som del af clusteret
  - Som cubernetesabstraktion
- ingrescontroller
  - Definerer hvordan trafik kommunikeres til de forskellige pods
  - Skabeloner i cluster repositoriet
- Pod definerer
  - at den skal have indgående trafik
  - 

Udvikerportal 
- Se logs 
- Se metrikker 
- På sigt finops.
- Deploymentstatus via Argo
- Notifikationer

- cicd (deployer repositories, men bygger ikke koden.)
  - hvis jeg skal teste en microservice
  - 
- github (er en forudsætning, men ikke leveret af platformen.)

Backstage hjælper med 
- Templates til diverse servicetyper, LB osv

