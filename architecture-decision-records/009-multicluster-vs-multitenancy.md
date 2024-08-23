### Architecture Decision Record (ADR)

#### Title: 004 Kubernetes Multicluster vs Multitenancy

#### Date: 2024-07-03

---

## Status

Forslag

## Kontekst

Vi står overfor beslutningen om, hvorvidt vi skal implementere Kubernetes med multicluster eller multitenancy strategi. Dette valg vil påvirke vores cloud-arkitektur, risici, omkostninger og driftsprocesser. Følgende produkter tilbyder Kubernetes multi-tenancy eller multi-cluster management:

- **Suse Rancher**: Multi Kubernetes cloud management.
- **Portainer**: Alternativ til Rancher.
- **KubeSphere**: Alternativ til Rancher, både multitenant og multicloud Kubernetes management.
- **Cloudify**: Orchestrator of orchestrators for hybrid cloud.
- **vCluster**: Kubernetes multi-tenancy.

### Relevante Ressourcer
- [Kubernetes: One Cluster or Many?](https://tanzu.vmware.com/content/blog/kubernetes-one-cluster-or-many)
- [Calculating SaaS Cost Per Tenant in AWS Kubernetes Environment](https://aws.amazon.com/blogs/apn/calculating-saas-cost-per-tenant-a-poc-implementation-in-an-aws-kubernetes-environment/)
- [Why Kubernetes is the Best Platform for Building Multi-Tenant SaaS Applications](https://www.cncf.io/blog/2021/06/10/why-kubernetes-is-the-best-platform-for-building-multi-tenant-saas-applications/)
- [Multi-Tenant Design Considerations for Amazon EKS Clusters](https://aws.amazon.com/blogs/containers/multi-tenant-design-considerations-for-amazon-eks-clusters/)

## Fordele og ulemper ved Kubernetes Multicluster

### Fordele
1. **Isolering**:
   - Bedre isolation mellem miljøer, hvilket reducerer risikoen for "noisy neighbor" problemer.
   - Højere sikkerhed og enklere overholdelse af compliance.

2. **Skalérbarhed**:
   - Evne til at skalere individuelt per cluster efter behov uden at påvirke andre miljøer.

3. **Uafhængighed**:
   - Frihed til at tilpasse og opgradere individuelle clusters separat.

4. **Blast Radius**:
   - Reduceret blast radius ved fejl, da problemer i ét cluster ikke påvirker andre clusters.

### Ulemper
1. **Kompleksitet**:
   - Øget operational kompleksitet med flere clusters at administrere.
   - Men måske simplere opsætning af rettighedsstyring inden for de enkelte clustre.

2. **Ressourceforbrug**:
   - Højere ressourcekrav og omkostninger for at opretholde flere clusters.

3. **Netværks Overhead**:
   - Øget netværks overhead på tværs af clusters, hvilket kan påvirke kommunikation og performance.

## Fordele og ulemper ved Kubernetes Multitenancy

### Fordele
1. **Omkostningseffektivitet**:
   - Deling af ressourcer mellem flere tenants, hvilket reducerer overall omkostninger.

2. **Centraliseret administration**:
   - Enkel administration af flere tenants fra en enkelt cluster. (Og hvad betyder "enkel" - siger alle ikke at det er komplekst?)

3. **Ressourceudnyttelse**:
   - Bedre udnyttelse af ressourcer ved at lade flere tenants dele de samme ressourcepuljer.

### Ulemper
1. **Sikkerhed**:
   - Øgede sikkerhedsrisici på grund af deling af ressourcer mellem flere tenants.

2. **Støj og performance**:
   - Risiko for "noisy neighbor" problemer, hvor én tenant kan påvirke andre tenants ydeevne.

3. **Kompleksitet i isolation**:
   - Sværere at opnå fuldstændig isolation mellem tenants.

4. **Omkostningsproblem**:
   - Udfordrende at allokere ressourcer og omkostninger præcist mellem forskellige tenants, hvilket kan føre til ineffektiv omkostningsstyring.

## Beslutning

(Detaljer om den endelige beslutning, når denne er truffet)

## Alternativer

(Listning af mulige alternativer, som kan overvejes)
