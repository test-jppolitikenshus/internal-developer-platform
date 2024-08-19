### Architecture Decision Record (ADR)

#### Title: 008 Azure Entra som Identity Provider

#### Date: 2024-08-03

---

## Status

Forslag

## Kontekst

Entra benyttes allerede som IdP I AWS vha AD grupper der relaterer til AWS permission sets. Der skal etableres en struktur der gør tildeling af bruger rettigheder nemt og gennemskueligt, der skal etableres audit trails, og notifkationer når medlemskaber ændres, både som en del af on/off boarding og løbende tilpasning af rettigheder og ved etablering eller ændring af services I self-service cloud kataloger. Disse ændringer bør som udgangspunkt initieres fra vores git struktur, fremfor via servicedesk tickets. I de tilfælde hvor ændringen forespørges via ticket hos service desk, bør servicedesk bruge gitops til at gennemføre disse ændringer, fremfor manuelle ændringer I Entra, AD og/eller AWS. 

Servicenow eller Jira integration kan alternativt bruges I servicedesk, hvis git er for meget.

Adgang til AWS miljø bør beskyttes med VPN, med undtagelse af Github Actions OIDC (se 005)

## Beslutning


## Konsekvenser


## Alternativer


