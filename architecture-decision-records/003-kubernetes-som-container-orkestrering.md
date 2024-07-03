### Architecture Decision Record (ADR)

#### Title: 002 kubernetes som container orkestrering

#### Date: 2024-06-03

---

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

Brug Kubernetes som containeradministration og samtidig fundament for vores udviklings platform.

## Konsekvenser

1. Flere tekniske udfordringer med kubernetes selv og tilhørende komponenter i en multi-tenant struktur, herunder logging, overvågning, deployment, omkostningsstyring, namespace isolering.
2. Vi har ikke pt folk nok med med erfaring i Kubernetes og IDP, og der vil være en stejl læringskurve for at opbygge og drifte platformen.
3. Krav om at bruge en identitetsbroker til Kubernetes, OIDC direkte i EKS eller via identity center givet beslutningen om at bruge Azure Entra om identitetsudbyder.

## Status

Forslag

Det understøtter voers ideal beskrevet i (roadmap[https://blabla.asdf]) har vi en målsæt

## Alternativer

ECS control planes koster ikke noget.
EKS er opensource (portable)
Både ECS og EKS har fargate (server & clusterless)
EKS er har mere avanceret skalerings muligheder
EKS may be preferred for complex ML pipelines, benefiting from the Kubernetes ecosystem and tools like Kubeflow for enhanced orchestration, scalability, and community support.

When selecting a container orchestration platform for our project, we recommend using Kubernetes over Amazon Elastic Container Service (ECS) due to several key advantages:

1. **Flexibility and Portability**: Kubernetes is an open-source platform that can run on any cloud provider or on-premises infrastructure. This offers greater flexibility and avoids vendor lock-in compared to ECS, which is tightly integrated with AWS.

2. **Advanced Scheduling and Scalability**: Kubernetes provides advanced scheduling capabilities and can automatically scale applications based on resource utilization and other metrics. This ensures efficient resource usage and can handle high traffic loads effectively.

3. **Extensive Ecosystem and Community Support**: Kubernetes has a large and active community, which continuously contributes to its development and provides extensive support and resources. This results in a rich ecosystem of tools, plugins, and services that can enhance our deployment and management capabilities.

4. **Robust and Mature Architecture**: Kubernetes has a mature architecture with many built-in features for managing complex application deployments. It includes features like self-healing, automated rollouts and rollbacks, and dynamic configuration management, which are essential for maintaining high availability and reliability.

5. **Integration with CI/CD Pipelines**: Kubernetes integrates seamlessly with Continuous Integration and Continuous Delivery (CI/CD) pipelines, facilitating more efficient development workflows and faster deployment cycles.

6. **Multi-Cluster Management**: Kubernetes supports multi-cluster management, which is beneficial for running applications across multiple environments and regions. It helps in achieving high availability and disaster recovery goals.

In conclusion, Kubernetes offers a comprehensive and flexible solution for container orchestration, making it a more suitable choice for our project compared to ECS.
