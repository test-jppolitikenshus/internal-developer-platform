### Architecture Decision Record (ADR)

#### Title: 002 Valg af Primær Cloud Leverandør

#### Date: 2024-08-03

---

## Status

Forslag

## Kontekst

Vi har i øjeblikket 95% af vores cloud-infrastruktur placeret i AWS, og vores eksisterende know-how afspejler dette med en tilsvarende vægtning på AWS-teknologier. Vi anvender også mindre installationer i Azure til specifikke formål som OpenAI og Active Directory, samt nogle få tjenester i Google Cloud Platform (GCP).

AWS har vist sig at være førende inden for markedet med det bredeste udvalg af tjenester og den højeste tilgængelighed. Vores præference er derfor at anvende AWS som vores primære cloud leverandør. Samtidig ønsker vi at opretholde en agnostisk tilgang for at minimere risikoen for vendor lock-in, men vi anerkender, at det aldrig helt kan undgås. Derfor vil vi også overveje muligheden for at anvende andre cloud-udbydere, såsom Azure, GCP, Oracle Cloud og DigitalOcean, hvor det er relevant og fordelagtigt.

## Beslutning

- **Primær Cloud Leverandør**: AWS fastholdes som vores primære cloud leverandør på grund af vores omfattende eksisterende infrastruktur, know-how og erfaring med deres brede udbud af tjenester.
- **Agnostisk Arkitektur**: Vi vil designe vores systemer med en agnostisk arkitektur, hvor det er muligt. Dette indebærer brug af containerisering, mikroservices og platform-agnostiske teknologier som Kubernetes og Terraform.
- **Evaluering af Alternativer**: Vi skal løbende evaluere Azure, Google Cloud Platform (GCP), Oracle Cloud og DigitalOcean for specifikke use cases, hvor disse platforme kan tilbyde unikke fordele. Dette kan inkludere tjenester som OpenAI-integrationer på Azure, data analytics på GCP, databaser på Oracle Cloud og simple, omkostningseffektive løsninger på DigitalOcean.
- **Uafhængighed**: Implementere strategier til at minimere vendor lock-in, såsom multi-cloud backup strategier, og overveje brug af open-source værktøjer.

## Konsekvenser

- **Fordele**:
    - Ved at fastholde AWS som primær cloud leverandør optimerer vi brugen af vores eksisterende know-how og infrastruktur.
    - Bevarer højt niveau af tilgængelighed og serviceudbud.
    - Fleksibilitet til at anvende andre cloud-leverandører, hvor det giver mening.

- **Ulemper**:
    - Potentiel risiko for vendor lock-in, selvom vi forsøger at minimere det. Komplet undgåelse er ikke mulig.
    - Øget kompleksitet i systemdesign og vedligeholdelse for at sikre agnosticitet.

## Alternativer

- **Azure som Primær Cloud Leverandør**: Flytning af større dele af vores infrastruktur til Azure for at udnytte deres styrker inden for AI og Active Directory. Dette vil kræve en betydelig omlæring og migration af eksisterende infrastruktur, hvilket kan være både tidskrævende og omkostningstungt.
- **Google Cloud Platform som Primær Cloud Leverandør**: Fokusering på GCP’s styrker inden for data analytics og maskinlæring. Dette vil også kræve signifikant migration og en ændring i vores operationelle know-how.
- **Oracle Cloud**: Anvendelse af Oracle Cloud's styrker inden for enterprise databaser og ERP-systemer. Dette kan være fordelagtigt for specifikke use cases, men vil kræve integration og migrationsindsats.
- **DigitalOcean**: Brug af DigitalOcean til simple og omkostningseffektive løsninger. Denne platform er velegnet til små projekter og udviklingsmiljøer, men mangler det brede servicespektrum, som de store udbydere tilbyder.
- **Multi-Cloud Strategi**: En afbalanceret tilgang, hvor vi fordeler infrastrukturen mellem AWS, Azure, GCP, Oracle Cloud og DigitalOcean for at reducere risikoen for vendor lock-in. Dette vil dog øge kompleksiteten betydeligt og kræve flere organisatoriske ressourcer til styring og vedligeholdelse.
