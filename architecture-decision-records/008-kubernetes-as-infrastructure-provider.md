### Architecture Decision Record (ADR)

#### Title: 008 Kubernetes som infrastruktur provider

#### Date: 2024-07-03

---

## Status

Forslag

## Kontekst

Vi skal vælge, om vi ønsker at standardisere vores infrastruktur ved at køre alle vores services i Kubernetes eller ved at anvende cloud-leverandørernes indbyggede tjenester. Dette valg påvirker vores driftsstrategi, administration og udviklingscyklus. Vi ønsker at vurdere fordelene og ulemperne ved begge tilgange og overveje, hvordan en hybrid løsning effektivt kan realiseres.

## Overvejelser

### Fordele ved at bruge Kubernetes som infrastruktur provider

1. **Konsistent driftsmiljø**:
   - Kubernetes sikrer ensartede miljøer på tværs af udviklings-, test- og produktionsmiljøer, hvilket reducerer konfigurationsafvigelser og øger stabiliteten.
*Er det ikke iac, der sikrer ensartede miljøer?*

2. **Nem opsætning af udviklingsmiljøer**:
   - Med Kubernetes kan vi nemt replikere produktionsmiljøer for udviklings- og testformål, hvilket fremmer hurtigere fejlfinding og produktudvikling.

3. **Automatisering**:
   - Integration med CI/CD pipelines er ligetil med Kubernetes, hvilket fremmer automatiseret deployment og øger hastigheden på udviklingslivscyklusser.

### Fordele ved at bruge Cloud Services

1. **Specialiserede tjenester**:
   - Cloud-leverandørernes tjenester som RDS (Managed Databases), EBS (Elastic Block Store), EFS (Elastic File System), S3 (Object Storage), SQS (Simple Queue Service), SNS (Simple Notification Service) og Secret Manager tilbyder specialiseret funktionalitet, ydeevneoptimering og management.

2. **Operational overhead**:
   - Anvendelse af managed services reducerer den operational overhead ved at vedligeholde og opdatere systemerne, hvilket frigør ressourcer og reducerer risiciene.

3. **Indbyggede sikkerheds- og compliance-funktioner**:
   - Mange cloud-leverandører tilbyder certificerede sikkerheds- og compliance-funktioner, hvilket kan være mere tidseffektivt end at skabe disse fra bunden i Kubernetes.

4. **Optimeret ydeevne**:
   - Cloud-tjenester er optimeret og skaleret til høj ydeevne og belastning, hvilket kan være svært at matche med selv-administrerede systemer.

## Hybrid Løsning

En hybrid løsning kan måske realiseres ved at kombinere de bedste elementer fra begge verdener:

1. **Udviklings- og testmiljøer i Kubernetes**:
   - Brug Kubernetes til at opsætte og drifte udviklings- og testmiljøer, hvilket sikrer nem opsætning, konsistens og hurtig fejlfinding.

2. **Produktion med både Kubernetes og Cloud Services**:
   - Drift af applikationer i Kubernetes i produktion for portabilitet og skalérbarhed.
   - Brugen af cloud-leverandørernes specialiserede tjenester.
     
3. **Centrale automationspipelines**:
   - Integrer Kubernetes og cloud services i centrale CI/CD pipelines for at automatisere deployment-processer og opretholde en høj udviklingshastighed. Dette hjælper med at holde en nem og konsistent deployment-struktur på tværs af både udviklings- og produktionsmiljøer.

## Opsummering

mjaeh...


*Dette her synes jeg er den mest centrale beslutning lige nu. Jeg hører det som om vi er enige om Kubernetes osv. Men også at vi i temmelig høj grad kommer til at have en hybridløsning, for at få mest muligt ud af AWS.*


