### Architecture Decision Record (ADR)

#### Title: 010 Valg af Fælles Artifact Repository

#### Date: 2024-07-03

---

## Status

Forslag

## Kontekst

Vi overvejer valg af et fælles artifact repository til håndtering af Docker images og andre artefakter. Dette valg vil påvirke vores build-, deployment- og release-processer. Fire primære muligheder er relevante: Docker Hub, Amazon Elastic Container Registry (ECR), GitHub Package Registry, Google Container Registry (GCR), Azure Container Registry (ACR), og selv-hostede løsninger som Harbor.

## Overvejelser

### Docker Hub

**Fordele**:
1. **Bred adoption og popularitet**:
   - Udviklerfællesskabets førstevalg, hvilket betyder brede integrationsmuligheder med mange CI/CD-værktøjer.
2. **Offentlige og private repositories**:
   - Tilbyder både offentlige og private repositories, hvilket giver fleksibilitet afhængigt af brugsscenariet.
3. **Global tilgængelighed**:
   - God tilgængelighed og ydeevne på tværs af geografier på grund af global CDN.

**Ulemper**:
1. **Rate limits**:
   - Begrænsninger på antallet af push/pull-kommandoer for gratis brugere, hvilket kan påvirke CI/CD pipelines.
2. **Sikkerhed**:
   - Selvom sikkerheden er forbedret, er der stadig bekymringer omkring sikkerhed og mulige brud.
3. **Omkostninger**:
   - Private repositories kræver betalte planer, som kan være dyre ved storskala brug.

### Amazon Elastic Container Registry (ECR)

**Fordele**:
1. **Integreret med AWS**:
   - Tæt integration med AWS tjenester som ECS, EKS, og IAM, hvilket forenkler det samlede setup.
2. **Sikkerhed**:
   - Understøtter IAM roller og politikker for adgangskontrol, hvilket giver stærke sikkerhedsfunktioner.
3. **Skalérbarhed**:
   - Håndterer autoskalering og lagerplads, så du ikke skal bekymre dig om kapacitetsgrænser.
4. **Kosteffektivitet**:
   - Betal for brugt lagerplads og datatransport, hvilket kan være omkostningseffektivt ved stor skala.

**Ulemper**:
1. **Vendor lock-in**:
   - Er tæt bundet til AWS, hvilket kan begrænse fleksibilitet ved multi-cloud eller hybrid-cloud strategier.
2. **Kompleksitet ved opsætning**:
   - Kan kræve mere konfiguration og opsætning sammenlignet med Docker Hub.

### GitHub Package Registry

**Fordele**:
1. **Tæt integration med GitHub**:
   - Nem integration med GitHub repositories og GitHub Actions, hvilket forenkler CI/CD workflows.
2. **Multi-format support**:
   - Understøtter flere package formater herunder Docker images, npm, Maven, nuget, og RubyGems.
3. **Sikkerhed**:
   - GitHub's sikkerhedsfunktioner og adgangskontrol kan anvendes til repositories.
4. **Fleksibilitet**:
   - Tilbyder både offentlige og private repositories, hvilket gør det nemt at dele artifacts internt og eksternt.

**Ulemper**:
1. **Omkostninger**:
   - Private repositories kræver GitHub's betalte planer, hvilket kan være en omkostningsfaktor ved omfattende brug.
2. **Rate limits**:
   - Begrænsninger på API-anmodninger som kan påvirke pipelines ved intensiv brug.
3. **Afhængighed**:
   - Tæt bundet til GitHub økosystemet, hvilket kan være en ulempe hvis der på sigt skal bruges andre VCS providers.

### Andre Alternativer

#### Google Container Registry (GCR)
**Fordele**:
1. **GCP Integration**:
   - Integrerer tæt med Google Cloud Platform, hvilket forenkler brugen med GKE og andre GCP-tjenester.
2. **Omkostninger**:
   - Konkurrencedygtige priser og betalingsmodel baseret på lagerplads og dataoverførsel.

**Ulemper**:
1. **Vendor lock-in**:
   - Kan føre til binding til GCP's økosystem.

#### Azure Container Registry (ACR)
**Fordele**:
1. **Azure Integration**:
   - Optimeret til brugere af Azure tjenester, integreres godt med AKS, Azure DevOps osv.
2. **Sikkerhed og Compliance**:
   - Stærke sikkerhedsfunktioner og compliance muligheder.

**Ulemper**:
1. **Vendor lock-in**:
   - Tæt afhængig af Azure platformen.

#### Selv-hostede løsninger (som Harbor)
**Fordele**:
1. **Kontrol og tilpasning**:
   - Giver fuld kontrol over data og konfiguration af repositories.
2. **Sikkerhed**:
   - Mulighed for høj sikkerhed og compliance tilpasset virksomhedens behov.

**Ulemper**:
1. **Vedligeholdelse**:
   - Kræver dedikerede ressourcer til opsætning, vedligeholdelse og drift.

### Beslutning

Efter vurdering af de nævnte muligheder anbefaler vi at benytte **Amazon Elastic Container Registry (ECR)** som vores primære artifact repository. Dette valg er baseret på følgende årsager:

1. **Tæt integration med AWS**:
   - Giver en problemfri integration med vores eksisterende AWS-infrastruktur, såsom ECS, EKS, og IAM.
2. **Sikkerhed**:
   - Understøttelse af IAM roller og politikker giver granular adgangskontrol.
3. **Skalérbarhed og pålidelighed**:
   - ECR håndterer automatisk skalering og kapacitet, hvilket sikrer, at vi ikke møder kapacitetsbegrænsninger.
4. **Kosteffektivitet**:
   - Betalingsmodellen baseret på brugt lagerplads og datatransport er økonomisk fordelagtig for vores anvendelsestilfælde.

## Hybrid Løsning

Selvom ECR bliver vores primære repository, er der muligvis noget at hente ved at bruge github, hvis vi lægger os fast på github enterprice cloud som fælles code repository.

