### Architecture Decision Record (ADR)

#### Title: 007 GitOps og Infrastruktur som kode

#### Date: 2024-07-03

---

## Status

Forslag

## Kontekst

For at opnå bedst mulig administration af vores platform, ønsker vi at benytte [gitops](https://www.gitops.tech) i kombination med Infrastruktur som kode (IaC). 

## Beslutning

Crossplane understøtter via kubernetes gitops workflow til at orkestrere applikationer og infrastruktur hvor som helst.

## Konsekvens

Vores eksisterende værktøjer, Terraform og CDK, fravælges fremadrettet, men kan fortsat bruges ved cold-start eller som [crossplane providers](https://marketplace.upbound.io/providers/upbound/provider-terraform/v0.3.0) 

---

### Uddybning

Vi skal vælge, om vi ønsker at implementere Infrastructure as Code (IaC) ved brug af Kubernetes-native løsninger eller tradionelle værktøjer. Dette valg vil påvirke vores deployment-strategi, automation, og administration af drift. Følgende produkter/teknologier er relevante i denne kontekst:

- **Crossplane**: Kubernetes-native IAC.
- **AWS Controllers for Kubernetes (ACK)**: Kubernetes-native tilgang til at administrere AWS-ressourcer.
- **Kubernetes Operators**: Skræddersyede controllers til at automatisere styring af applikations-specifikke ressourcer.
- **Terraform**: Populært, agnostisk IAC-værktøj, der også understøtter Kubernetes.
- **AWS Cloud Development Kit (CDK)**: IAC framework for at definere cloud resources vha. programmerings-sprog.
- **Pulumi**: IAC-værktøj, der bruger almindelige programmeringssprog og kan understøtte Kubernetes.

Vendor agnostiske produkter er Crossplane, Terraform og Pulumi - Pulumi er der så vidt vides ingen erfaring med i huset.

#### Alternativer

1. **Crossplane** 
Dette valg understøtter vores målsætning om at implementere et GitOps baseret workflow. Fordelene ved denne tilgang inkluderer:

   **Automatisk deployment**:
   - Automatisere deployment-processer ved at synkronisere Git repositories med vores Kubernetes clusters. Dette sikrer, at enhver ændring i vores Git repository automatisk afspejles i vores Cluster.

   **Audit og versioning**:
   - Bevare revisionshistorik og versionering af vores infrastrukturkode, hvilket øger sporbarhed og ansvarlighed. Hver ændring kan spores tilbage til et bestemt commit, og tidligere versioner kan nemt gendannes.

   **Samarbejde**:
   - Understøtte samarbejde blandt udviklere og operations teams ved at bruge GitHub som en central hub for code reviews og issue tracking. Dette fremmer en fælles forståelse og ansvar for infrastrukturændringer.

2. **ACK og Operators**:
   - Brugen af AWS Controllers for Kubernetes (ACK) og Kubernetes Operators som alternative tilgange for IAC med tæt integration til Kubernetes.

   Fordele:
   - Tæt integration med AWS-økosystemet.
   - Skræddersyet til specifikke applikationer og underliggende infrastruktur.

   Ulemper:
   - Mindre fleksibilitet på tværs af forskellige cloududbydere og platforme.
   - Højere kompleksitet ved opsætning og vedligeholdelse.

3. **CDK og Pulumi**:
   - Brug af AWS Cloud Development Kit (CDK) og Pulumi som mere programmeringsvenlige IAC-muligheder.

   Fordele:
   - Programmeringsvenlig, understøtter flere almindelige sprog.
   - Understøtter bredere sæt af ressourcer og integrerer også godt med CI/CD pipelines.

   Ulemper:
   - Mindre standardiseret approach sammenlignet med deklarative løsninger.
   - Potentielt højere læringskurve for udviklerne.


### Crossplane vs Terraform

#### Fordele ved Crossplane
0. **Automatic syncing**:
   - Automatisk synkronisering af ønsket og aktuelt state. Ved driftsafvigelse, kan systemet automatisk anvende ændringer for at genoprette tilstanden.

0. **Self-healing capabilities**:
   - Indbyggede selvhelbredende mekanismer i Kubernetes, der kan detektere og rette fejl ved at genstarte container, replanlægge workloads eller skalere ressourcer.

0. **Declarative configuration**:
   - Infrastruktur defineres deklarativt. Integreres problemfrit med Kubernetes ressourcer og tjenester.

0. **Skalérbarhed**:
   - Nem skalering af ressourcer baseret på efterspørgsel. Kubernetes automationsplan distribuerer og planlægger workloads optimeret.

0. **Multi-cloud og hybrid-cloud support**:
   - Designet til at køre på tværs af on-premises, offentlige clouds og hybrid clouds. Konsistent ressourcehåndtering uanset lokation.

### Fordele ved Terraform
0. **Modenhed**:
   - Velafprøvet teknologi med mange anvendelsesmuligheder og best practices.

0. **Templates**:
   - Et bredt udvalg af skabeloner og moduler for hurtig opsætning.
