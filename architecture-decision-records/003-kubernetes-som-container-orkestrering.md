### Architecture Decision Record (ADR)

#### Title: 002 kubernetes som container orkestrering

#### Date: 2024-06-03

---

## Status

Forslag

## Kontekst

Vores tilgang til administration og ejerskab af infrastruktur i DUT, herunder EB, JP, Politiken, Bold, Holdet samt Koncernens fællesfunktioner, har udviklet sig over tid og ført til følgende:

- Ineffektiv brug af infrastruktur pga. historisk uenighed om teknologivalg og manglende fælles retningslinjer (trods en vis standardisering på Docker-containere)
- "You build it, You run it" og devops mentalitet har ført til at teams har skullet tage ansvar for infrastruktur de ikke ønsker, eller har kompetencer til, at håndtere
- Betydelig variation i deployment, overvågning og administration af lifecycle på tværs af produkter
- Legacy infrastruktur og teknisk gæld tynger eksisterende teams, forhindrer innovation og hurtigere time-to-market
- Fri adgang til Cloud har medført manglende overblik og styring af sikkerhed

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

Givet teknologilandskabet inden for DUT, ønsker vi en containeradministrationsplatform, der på sigt kan understøtte en bred vifte af applikationer, fra "moderne" cloud-native [12-faktor applikationer](https://12factor.net) til "legacy" stateful monolitiske applikationer, potentielt omfattende både Linux- og Windows-baserede applikationer.

Fra ovenstående liste af produkter er Kubernetes den klare markedsleder og understøtter både applikationer og infrastrukturbehov. Kubernetes har følgende fordele:

- Stor adoption - allerede siden 2017 etableredes Kubernetes som facto industristandard
- Der findes managed Kubernetes-tjenester fra alle større cloud providere
- Bredt økosystem af understøttende værktøjer og teknologier
- Øget støtte til Kubernetes som implementeringsmål for kommercielle og open-source softwareprojekter
- Kubernetes er en populær teknologi, mange udviklere har erfaring med det, hvilket er vigtigt ifbm ekruttering og fastholdelse

Der er præcedens for brug af Kubernetes inden for DUT, da AI og EB teams har bygget deres platforme på Kubernetes
Der er også præcedens for brug af ECS inden for DUT, da JP og koncernen har bygget deres platforme på ECS.

## Beslutning

Brug Kubernetes som containeradministration og samtidig fundament for vores udviklings platform. Læg særligt vægt på at:

1. Fleksibilitet og Portabilitet: Kubernetes kan køre på enhver cloud eller lokal infrastruktur og undgår leverandørbinding.

2.Avancerede skaleringsmuligheder: Kubernetes kan skalere automatisk baseret på ressourceudnyttelse og håndterer høje trafikbelastninger effektivt.

3. Stærkt Økosystem: Kubernetes har et meget stort community og et rigt udvalg af værktøjer og services, og forventes at kunne tiltrække kandidater i højere grad.

4. Moden Arkitektur: Kubernetes tilbyder self-healing, automatiserede deployments og rollbacks samt dynamisk konfigurationsstyring.

5. CI/CD Integration: Kubernetes integreres problemfrit med CI/CD pipelines for mere effektive udviklingsforløb.

6. Multi-Cluster Management: Kubernetes understøtter multi-cluster management for høj tilgængelighed og katastrofeberedskab.

Kubernetes er således en mere omfattende og fleksibel løsning til vores projekt.

Kubernetes understøtter samtidig voers ideal beskrevet i (roadmap[https://test-jppolitikenshus.github.com/internal-developer-platform/roadmap]) hvor hurtig onboarding og fokus på developer experience er central, ved at stille et så komplet som muligt udviklingsmiljø til rådighed for udviklerne.

## Konsekvenser

1. Flere tekniske udfordringer med kubernetes selv og tilhørende komponenter i en multi-tenant struktur, herunder logging, overvågning, deployment, omkostningsstyring, namespace isolering.

2. Vi har ikke pt folk nok med med erfaring i Kubernetes og IDP, og der vil være en stejl læringskurve for at opbygge og drifte platformen.

3. Krav om at bruge en identitetsbroker til Kubernetes, OIDC direkte i EKS eller via identity center givet beslutningen om at bruge Azure Entra om identitetsudbyder.

4. ECS control planes koster ikke noget, EKS koster 500 DKK / mdr pr cluster.

## Alternativer

Ingen nævnt
