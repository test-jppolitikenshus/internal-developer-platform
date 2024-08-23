### Architecture Decision Record (ADR)

#### Title: 002 Valg af Primær Cloud Leverandør

#### Date: 2024-08-03

---

## Status

Forslag

## Kontekst

Vi ønsker èn primær cloud leverandør. Samtidig ønsker vi at være uafhængige af cloud leverandører, som beskrevet i vores [IDP Manifest](https://github.com/test-jppolitikenshus/internal-developer-platform/wiki/Manifest)

## Beslutning

AWS fastholdes som vores primære cloud leverandør på grund af vores omfattende eksisterende infrastruktur, know-how og erfaring med deres brede udbud af tjenester. 

## Konsekvenser

Ved at fastholde AWS som primær cloud leverandør optimerer vi brugen af vores eksisterende know-how og infrastruktur.

## Alternativer

Alternativet er at vælge en anden primær cloud leverandør, at satse på on-premise eller at fokusere på multicloud - vi vil løbende evaulerer udviklingen inden for cloud teknolgi og vores behov.

## Uddybning

Vi har i øjeblikket 95% af vores cloud-infrastruktur placeret i AWS, og vores eksisterende know-how afspejler dette med en tilsvarende vægtning på AWS-teknologier. Til specifikke formål som OpenAI og Active Directory anvender vi også minimalt andre cloud-platforme.

AWS har vist sig at være førende inden for markedet med det bredeste udvalg af tjenester og den højeste tilgængelighed. Vores præference er derfor at anvende AWS som vores primære cloud leverandør. Samtidig ønsker vi at opretholde en agnostisk tilgang for at minimere risikoen for vendor lock-in, men vi anerkender, at det aldrig helt kan undgås. Derfor vil vi også overveje muligheden for at anvende andre cloud-udbydere, hvor det er relevant og fordelagtigt.

