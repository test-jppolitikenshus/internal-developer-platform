### Architecture Decision Record (ADR)

#### Title: 001 Valg af Identity Provider

#### Date: 2024-08-03

---

## Status

Forslag

## Kontekst

Microsoft Entra benyttes allerede som IdP i AWS vha. AD-grupper, der relaterer til AWS permission sets.  
Der skal etableres en struktur, der gør tildeling af brugeres rettigheder nemt og gennemskueligt, samt etableres audit trails og notifikationer, når medlemskaber ændres. Dette gælder både som en del af on/off boarding, løbende tilpasning af rettigheder og ved etablering eller ændring af services i self-service cloud kataloger.  
Disse ændringer bør som udgangspunkt initieres fra vores git-struktur fremfor via servicedesk-tickets.  
I de tilfælde, hvor ændringen forespørges via en ticket hos servicedesk, bør servicedesk bruge GitOps til at gennemføre disse ændringer fremfor manuelle ændringer i Entra, AD og/eller AWS. 

ServiceNow- eller Jira-integration kan alternativt bruges i servicedesk, hvis GitOps er for meget.

Adgang til AWS-miljø bør beskyttes med VPN, med undtagelse af GitHub Actions OIDC.

## Beslutning

- Microsoft Entra fastholdes som IdP for AWS, da det allerede er integreret i vores systemer og understøtter vores nuværende AD-groups struktur.
- Implementering af GitOps framework for at sikre, at ændringer i bruger adgang og rettigheder initieres gennem git. Dette sikrer en klar audit trail og konsistens i ændringer.
- Integrere notifikationssystemer, som informerer om ændringer i medlemskaber, både som en del af on/off boarding og ved løbende tilpasninger. 
- Adgang til AWS-miljøer skal gennemføres via VPN for at sikre yderligere sikkerhedslag. GitHub Actions OIDC undtages, da det allerede har de nødvendige sikkerhedsforanstaltninger.

## Konsekvenser

- Implementeringen af GitOps vil kræve en vis grad af oplæring og ændring af nuværende arbejdsprocedurer for servicedesk og udviklingsteams.
- Øget sikkerhed og gennemsigtighed i administration af brugeradgang rettigheder.
- Forbedring af auditering og sporing af ændringer i adgangsrettigheder.
- Kan kræve investering i yderligere integrationer mellem ServiceNow/Jira og GitHub.

## Alternativer

- **Manuel administration i Entra og AWS**: Vil fastholde nuværende tilgang med manuelle processer, hvilket kan medføre øget risiko for fejl og mindre gennemsigtighed i ændringer.
- **Automatiseret script-baseret system uden GitOps**: Kan reducere nogle af de manuelle processer, men vil mangle den fulde sporbarhed og konsistens, som GitOps tilbyder.
- **Brug af en tredjeparts-IdP**: Kan overvejes, men vil kræve betydelig investering i integration og mulig overførsel af data og politikker fra Microsoft Entra.
