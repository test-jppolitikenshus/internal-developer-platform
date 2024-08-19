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
1. **Platform agnostic**:
   - Understøtter flere cloud-udbydere og ressourcetyper, ikke blot Kubernetes-specifik.

2. **Modenhed**:
   - Velafprøvet teknologi med mange anvendelsestilfælde og best practices.

3. **State management**:
   - Centraliseret state management, hvilket gør det lettere at håndtere komplekse infrastructures.

4. **Skabeloner**:
   - Et bredt udvalg af skabeloner og moduler for hurtig opsætning.

## Beslutning

(Detaljer om den endelige beslutning, når denne er truffet)

## Alternativer

1. **ACK og Operators**:
   - Brugen af AWS Controllers for Kubernetes (ACK) og Kubernetes Operators som alternative tilgange for IAC med tæt integration til Kubernetes.

2. **CDK og Pulumi**:
   - Brug af AWS Cloud Development Kit (CDK) og Pulumi som mere programmeringsvenlige IAC-muligheder.
