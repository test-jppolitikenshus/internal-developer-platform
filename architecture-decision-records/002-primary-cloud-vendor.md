### Architecture Decision Record (ADR)

#### Title: 002 Valg af Primær Cloud Leverandør

#### Date: 2024-08-03

---

## Status

Forslag

## Kontekst

Vi har i øjeblikket 95% af vores cloud-infrastruktur placeret i AWS, og vores eksisterende know-how afspejler dette med en tilsvarende vægtning på AWS-teknologier. Til specifikke formål som OpenAI og Active Directory anvender vi også minimalt andre cloud-platforme.

AWS har vist sig at være førende inden for markedet med det bredeste udvalg af tjenester og den højeste tilgængelighed. Vores præference er derfor at anvende AWS som vores primære cloud leverandør. Samtidig ønsker vi at opretholde en agnostisk tilgang for at minimere risikoen for vendor lock-in, men vi anerkender, at det aldrig helt kan undgås. Derfor vil vi også overveje muligheden for at anvende andre cloud-udbydere, hvor det er relevant og fordelagtigt.

## Beslutning

- **Primær Cloud Leverandør**: AWS fastholdes som vores primære cloud leverandør på grund af vores omfattende eksisterende infrastruktur, know-how og erfaring med deres brede udbud af tjenester.
- **Agnostisk Arkitektur**: Vi vil designe vores systemer med en agnostisk arkitektur, hvor det er muligt. Dette indebærer brug af containerisering, mikroservices og platform-agnostiske teknologier som Kubernetes og Terraform.
- **Evaluering af Alternativer**: Vi skal løbende evaluere andre cloud-udbydere for specifikke use cases, hvor disse platforme kan tilbyde unikke fordele. Dette kan inkludere tjenester som OpenAI-integrationer på Azure og data analytics på GCP.
- **Uafhængighed**: Implementere strategier til at minimere vendor lock-in, såsom multi-cloud backup strategier, og undersøge muligheden for at afvikle vores infrastruktur på Kubernetes fremfor direkte i AWS.

## Konsekvenser

- **Fordele**:
    - Ved at fastholde AWS som primær cloud leverandør optimerer vi brugen af vores eksisterende know-how og infrastruktur.
    - Bevarer højt niveau af tilgængelighed og serviceudbud.
    - Fleksibilitet til at anvende andre cloud-leverandører, hvor det giver mening.
    - Øget fleksibilitet og uafhængighed gennem muligheden for afvikling af infrastruktur på Kubernetes.

- **Ulemper**:
    - Potentiel risiko for vendor lock-in, selvom vi forsøger at minimere det. Komplet undgåelse er ikke mulig.
    - Øget kompleksitet i systemdesign og vedligeholdelse for at sikre agnosticitet.

## Alternativer

- **Anden Cloud Leverandør som Primær**: Flytning af større dele af vores infrastruktur til en anden cloud leverandør for at udnytte deres styrker inden for specifikke områder. Dette vil kræve en betydelig omlæring og migration af eksisterende infrastruktur, hvilket kan være både tidskrævende og omkostningstungt.
- **On-Premises Løsning**: Flytning af infrastrukturen tilbage til lokale datacentre for fuldstændig kontrol over hardwaren og softwaremiljøet. Dette kan dog medføre højere kapitalomkostninger og driftsomkostninger samt en reduktion i skalerbarhed, fleksibilitet og know-how.
- **Multi-Cloud Strategi**: En afbalanceret tilgang, hvor vi fordeler infrastrukturen mellem flere cloud-leverandører for at reducere risikoen for vendor lock-in. Dette vil dog øge kompleksiteten betydeligt og kræve flere organisatoriske ressourcer til styring og vedligeholdelse.
