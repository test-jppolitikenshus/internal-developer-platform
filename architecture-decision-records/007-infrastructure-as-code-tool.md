### Architecture Decision Record (ADR)

#### Title: 005 Kubernetes som IAC

#### Date: 2024-07-03

---

## Status

Forslag

## Kontekst

Vi skal vælge, om vi ønsker at implementere Infrastructure as Code (IaC) ved brug af Kubernetes-native løsninger eller tradionelle værktøjer. Dette valg vil påvirke vores deployment-strategi, automation, og driftseffektivitet. Følgende produkter/teknologier er relevante i denne kontekst:

- **Crossplane**: Kubernetes-native IAC.
- **AWS Controllers for Kubernetes (ACK)**: Kubernetes-native tilgang til at administrere AWS-ressourcer.
- **Kubernetes Operators**: Skræddersyede controllers til at automatisere styring af applikations-specifikke ressourcer.
- **Terraform**: Populært, agnostisk IAC-værktøj, der også understøtter Kubernetes.
- **AWS Cloud Development Kit (CDK)**: IAC framework for at definere cloud resources vha. programmerings-sprog.
- **Pulumi**: IAC-værktøj, der bruger almindelige programmeringssprog og kan understøtte Kubernetes.

Vendor agnostiske produkter er Crossplane, Terraform og Pulumi - Pulumi er der så vidt vides ingen erfaring med i huset.

## Konklusion af Crossplane vs Terraform

### Fordele ved Crossplane
1. **Automatic syncing**:
   - Automatisk synkronisering af ønsket og aktuelt state. Ved driftsafvigelse, kan systemet automatisk anvende ændringer for at genoprette tilstanden.

2. **Self-healing capabilities**:
   - Indbyggede selvhelbredende mekanismer i Kubernetes, der kan detektere og rette fejl ved at genstarte container, replanlægge workloads eller skalere ressourcer.

3. **Declarative configuration**:
   - Infrastruktur defineres deklarativt. Integreres problemfrit med Kubernetes ressourcer og tjenester.

4. **Skalérbarhed**:
   - Nem skalering af ressourcer baseret på efterspørgsel. Kubernetes automationsplan distribuerer og planlægger workloads optimeret.

5. **Community and ecosystem**:
   - Stort og aktiv community. Talrige plugins, værktøjer og udvidelser.

6. **Sikkerhedsfunktioner**:
   - Rollebaseret adgangskontrol (RBAC), netværkspolitikker og Secret management understøttelse.

7. **Multi-cloud og hybrid-cloud support**:
   - Designet til at køre på tværs af on-premises, offentlige clouds og hybrid clouds. Konsistent ressourcehåndtering uanset lokation.

### Fordele ved Terraform
1. **Modenhed**:
   - Velafprøvet teknologi med mange anvendelsesmuligheder og best practices.

2. **State management**:
   - Centraliseret state management, hvilket gør det lettere at håndtere komplekse infrastructures.

4. **Templates**:
   - Et bredt udvalg af skabeloner og moduler for hurtig opsætning.

## Beslutning

Efter at have vurderet fordele og ulemper ved Crossplane og Terraform, anbefaler vi at gå videre med **Crossplane** som vores primære IaC værktøj. Denne anbefaling er baseret på følgende årsager:

1. **Kubernetes-integration**: Crossplane er dybt integreret med Kubernetes-økosystemet, hvilket muliggør seamless infra management.
2. **Selvhelbredende egenskaber**: Giver os mulighed for at opretholde driftstiden og sikkerheden gennem selvhelbredende mekanismer.
3. **Deklarativ konfiguration**: Muliggør en mere konsistent og forståelig konfigurationsstyring.

Dette valg understøtter vores målsætning om at implementere et GitOps baseret workflow, der er let tilgængeligt via GitHub. Fordelene ved denne tilgang inkluderer:

1. **Automatisk deployment**:
   - Automatisere deployment-processer ved at synkronisere Git repositories med vores Kubernetes clusters. Dette sikrer, at enhver ændring i vores Git repository automatisk afspejles i vores Cluster.

2. **Audit og versioning**:
   - Bevare revisionshistorik og versionering af vores infrastrukturkode, hvilket øger sporbarhed og ansvarlighed. Hver ændring kan spores tilbage til et bestemt commit, og tidligere versioner kan nemt gendannes.

3. **Samarbejde**:
   - Understøtte samarbejde blandt udviklere og operations teams ved at bruge GitHub som en central hub for code reviews og issue tracking. Dette fremmer en fælles forståelse og ansvar for infrastrukturændringer.

## Alternativer

1. **ACK og Operators**:
   - Brugen af AWS Controllers for Kubernetes (ACK) og Kubernetes Operators som alternative tilgange for IAC med tæt integration til Kubernetes.

   Fordele:
   - Tæt integration med AWS-økosystemet.
   - Skræddersyet til specifikke applikationer og underliggende infrastruktur.

   Ulemper:
   - Mindre fleksibilitet på tværs af forskellige cloududbydere og platforme.
   - Højere kompleksitet ved opsætning og vedligeholdelse.

2. **CDK og Pulumi**:
   - Brug af AWS Cloud Development Kit (CDK) og Pulumi som mere programmeringsvenlige IAC-muligheder.

   Fordele:
   - Programmeringsvenlig, understøtter flere almindelige sprog.
   - Understøtter bredere sæt af ressourcer og integrerer også godt med CI/CD pipelines.

   Ulemper:
   - Mindre standardiseret approach sammenlignet med deklarative løsninger.
   - Potentielt højere læringskurve for udviklerne.
