### ADR: Kubernetes som Container Orkestrering

#### Titel: 002 Kubernetes som container orkestrering

#### Dato: 2024-06-03

---

## Status

Forslag

## Kontekst

Udfordringer ved infrastruktur på DUT:

- Ineffektiv brug af infrastruktur grundet manglende fælles retningslinjer
- DevOps mentalitet fører til ansvar for infrastruktur uden nødvendige kompetencer
- Varierende deployment og administration på tværs af produkter
- Legacy infrastruktur forsinker innovation
- Manglende overblik og sikkerhedsstyring

Mulige platforme:

- Kubernetes (AWS EKS, Google GKE, Azure AKS, etc.)
- AWS ECS
- Docker Swarm
- CloudFoundry
- Hashicorp Nomad
- Apache Mesos

Kubernetes foretrækkes grundet:

- Stor adoption og industristandard
- Understøttet af alle store cloud providere
- Velfungerende økosystem
- Udbredt kompetence blandt udviklere
- Præcedens internt i DUT

## Beslutning

Brug Kubernetes som containeradministration og udviklingsplatform med fokus på:

1. Fleksibilitet og portabilitet
2. Avancerede skaleringsmuligheder
3. Stort økosystem
4. Moden arkitektur
5. CI/CD integration
6. Multi-cluster management

Kubernetes understøtter hurtig onboarding og fokuserer på udvikleroplevelse.

## Konsekvenser

1. Tekniske udfordringer i multi-tenant struktur (logging, overvågning, etc.)
2. Stejl læringskurve grundet mangel på erfaring
3. Krav om identitetsbroker til Kubernetes
4. Øgede omkostninger ved EKS cluster (500 DKK/måned)

## Alternativer

Ingen nævnt
