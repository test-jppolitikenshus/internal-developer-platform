### Architecture Decision Record (ADR)

#### Title: 006 Valg af container orkestrering

#### Date: 2024-08-19

---

## Status

Forslag

## Kontekst

Vores cloud-infrastruktur har trods manglende fælles retningslinjer centreret sig om containere - derfor er det oplagt at IDP som noget af det første fokuserer på container drift.

## Beslutning

EKS er managed kubernetes i vores fortruktne cloud provider AWS. Kubernetes er markedsleder, leverandør uafhængig, understøtter vores målsætning om Gitops i forbindelse med provisionering og vedligehold af IDP'ens infrastruktur.

## Konsekvenser

1. Flere tekniske udfordringer med kubernetes selv og tilhørende komponenter i en multi-tenant struktur, herunder logging, overvågning, deployment, omkostningsstyring, namespace isolering.

2. Vi har ikke pt folk nok med med erfaring i Kubernetes og IDP, og der vil være en stejl læringskurve for at opbygge og drifte platformen.

3. Krav om at bruge en identitetsbroker til Kubernetes, OIDC direkte i EKS eller via identity center givet beslutningen om at bruge Azure Entra om identitetsudbyder.

4. ECS control planes koster ikke noget, EKS koster 500 DKK / mdr pr cluster.

5. Prioritering af container teknologi frem for serverless: Vi har, og fortsat får, meget udvikling i containere, men mangler ensretning/stordriftsfordele. Vi afviser ikke serverless, men ser containere som et passende aktuelt fokuspunkt.

## Mere kontekst

Vores tilgang til administration og ejerskab af infrastruktur i DUT, herunder EB, JP, Politiken, Bold, Holdet samt Koncernens fællesfunktioner, har udviklet sig over tid og ført til følgende:

- Ineffektiv brug af infrastruktur pga. historisk uenighed om teknologivalg og manglende fælles retningslinjer (trods en vis standardisering på Docker-containere)
- Betydelig variation i deployment, overvågning og administration af lifecycle på tværs af produkter
- Legacy infrastruktur og teknisk gæld tynger eksisterende teams, forhindrer innovation og hurtigere time-to-market

Givet det nuværende teknologilandskab inden for DUT, ønsker vi en containeradministrationsplatform, der på sigt kan understøtte en bred vifte af applikationer, fra "moderne" cloud-native [12-faktor applikationer](https://12factor.net) til "legacy" stateful monolitiske applikationer, potentielt omfattende både Linux- og Windows-baserede applikationer.

Fra ovenstående liste af produkter er Kubernetes den klare markedsleder og understøtter både applikationer og infrastrukturbehov. Kubernetes har følgende fordele:

- Stor adoption - allerede siden 2017 etableredes Kubernetes som facto industristandard
- Der findes managed Kubernetes-tjenester fra alle større cloud providere
- Bredt økosystem af understøttende værktøjer og teknologier
- Øget støtte til Kubernetes som implementeringsmål for kommercielle og open-source softwareprojekter
- Kubernetes er en populær teknologi, mange udviklere har erfaring med det, hvilket er vigtigt ifbm ekruttering og fastholdelse

Der er præcedens for brug af Kubernetes inden for DUT, da AI og EB teams har bygget deres platforme på Kubernetes.   
Der er også præcedens for brug af ECS inden for DUT, da JP og koncernen har bygget deres platforme på ECS.

## Alternativer

Der eksisterer flere produkter, der specifikt fokuserer på at køre og administrere containere i produktion:

- Cloud Managed Kubernetes Providers
  - AWS EKS
  - Google GKE
  - Azure AKS
  - Digital Ocean Kubernetes
  - Redhat OpenShift
  - GitLab Kubernetes
- AWS ECS (native AWS container orchestrator)
- AWS Fargate (native AWS serverless container orchestrator, runs on eks and ecs)
- Docker Swarm (simple, built-in to Docker, but less feature-rich than Kubernetes)
- CloudFoundry (PaaS, now runs on top of kubernetes)
- Hashicorp Nomad (apparently dead)
- Apache Mesos (mere kompleks end Kubernetes, og ikke så populær)


### AWS EKS (Valgt)

Brug Kubernetes som containeradministration og samtidig fundament for vores udviklings platform. Læg særligt vægt på at:

1. Fleksibilitet og Portabilitet: Kubernetes kan køre på enhver cloud eller lokal infrastruktur og undgår leverandørbinding.

2. Avancerede skaleringsmuligheder: Kubernetes kan skalere automatisk baseret på ressourceudnyttelse og håndterer høje trafikbelastninger effektivt.

3. Stærkt Økosystem: Kubernetes har et meget stort community og et rigt udvalg af værktøjer og services, og forventes at kunne tiltrække kandidater i højere grad.

4. Moden Arkitektur: Kubernetes tilbyder self-healing, automatiserede deployments og rollbacks samt dynamisk konfigurationsstyring.

5. CI/CD Integration: Kubernetes integreres problemfrit med CI/CD pipelines for mere effektive udviklingsforløb.

6. Multi-Cluster Management: Kubernetes understøtter multi-cluster management for høj tilgængelighed og katastrofeberedskab.

7. IAC-platform: Mulighed for at bruge kubernetes som infrastructure as code platform, og dermed opnå mulighed for cloud agnostisk gitops infrastruktur.

Kubernetes er således en mere omfattende og fleksibel løsning til vores projekt.

Kubernetes understøtter samtidig voers ideal beskrevet i vores [Manifest](https://github.com/test-jppolitikenshus/internal-developer-platform/wiki/Manifest) hvor hurtig onboarding og fokus på developer experience er central, ved at stille et så komplet som muligt udviklingsmiljø til rådighed for udviklerne.

### AWS ECS (Elastic Container Service)

- **Fordele**:
  - Kan nemt integreres med andre AWS-tjenester såsom ALB, API Gateway, Security Groups, NACLs osv.
  - Ingen separate control plane omkostninger som ved EKS.
  - Lettere at administrere for rene applikationscontainer-skaleringer.

- **Ulemper**:
  - Mindre støttet i det bredere økosystem af værktøjer og teknologier sammenlignet med Kubernetes.
  - Begrænset til AWS, hvilket reducerer platformens agnostiske karakter.
  - Mangler avancerede funktioner, som Kubernetes-operatører og multi-cluster management.
  - Utilstrækkelig for drift af mere eksotisk software via operators.

### Docker Swarm

- **Fordele**:
  - Indbygget i Docker, nem at sætte op og administrere.
  - God for simple container-koordineringsbehov.

- **Ulemper**:
  - Mangler mange af de avancerede funktioner og skaleringsmuligheder, som Kubernetes tilbyder.
  - Mindre community og økosystem sammenlignet med Kubernetes.
  - Ikke velegnet for komplekse og skalerbare produktionsmiljøer.

### On-Premises Løsning

- **Fordele**:
  - Fuldstændig kontrol over hardwaren og softwaremiljøet.
  - Kan være økonomisk fordelagtigt ved meget store workloads.

- **Ulemper**:
  - Højere kapitalomkostninger og driftsomkostninger.
  - Reduceret skalerbarhed og fleksibilitet sammenlignet med cloud-løsninger.
  - Kræver dedikerede ressourcer til vedligeholdelse og administration.

### CloudFoundry PaaS

- **Fordele**:
  - Kører på toppen af Kubernetes og bringer PaaS funktionaliteter.
  - God til udviklerproduktivitet og hurtig applikationsudrulning.

- **Ulemper**:
  - Komplekst at administrere i store skalaer.
  - Mindre fleksibilitet i forhold til Kubernetes for specifikke tilpassede behov.

