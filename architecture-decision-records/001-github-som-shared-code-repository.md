### Architecture Decision Record (ADR)

#### Title: 001 Valg af GitHub som Repository Platform

#### Date: 2024-06-03

---

## Status

Forslag

## Kontekst

Vi har brug for en pålidelig Git-platform til at hoste, versionere og samarbejde om vores softwareprojekter. Flere muligheder bliver overvejet, herunder GitHub, GitLab, AWS CodeCommit, Bitbucket og Azure Repos.

## Beslutning

Vi foretrækker github.com enterprise cloud model, hvor:

- SSO via Entra
- Eksisterende organisationer og teams kan flyttes til enterprise konto med eksisterende konfiguration/rettigheder
- Eksisterende enterprise server kan blive, eller migreres til cloud med Enterprise Importer uden ekstra kost
- Decentral administration kan ske på organisations niveau (eller repos niveau)
- Commit name er personlig github konto
- Github EMEA flytter hosting til sverige i efteråret
- 50.000 CI/CD minutes/mdr + brugerens egne 2000 min, hvorfor vi sansynligvis ikke behøver self-hosted runners.
- Adgang til Advanced Security Scanning, som kan forhindre at sensitive data bliver commitet, samt kode scanning

Yderligere fordele ved Github vs:

- 95% af vores repositories ligger allerede i github
- Den største og mest kendte platform, betragtet som industri-standard
- Den største platform for open source, som vores udviklere får mulighed for at bidrage til.
- Vi benytter allerede github actions CI/CD
- Flest integrationer tilgængelig
- Indeholder wiki, issue tracking, projekt styring

## Konsekvenser

Vi vil få samlet alle vores repositories under en licens, og dermed potentielt spare licenser der i dag bruges på tværs af vores github organisationer.
Sikkerheds validering i forbindelse med brugerhåndtering og repos konfiguration gøres tilgængelig, samt evt. brug af Infrastructure as code til konfiguration/validering.
De identificerede organisationer der ikke bruger github idag bør flytte til github ved lejlighed.

## Alternativer

Alternativ til enterprise cloud brugerstyring som beskrevet ovenfor, er enterprise management users (dette ønsker vi at undgå):

- Brugere synkroniseres fra AD til Github med SCIM
- ingen personlige github konti
- public repos er ikke mulig
- migrering fra eksisterende organisations/teams er svær
- der skal skiftes bruger, hvis der skal tilgås github ressourcer med personlig konto
- Er typisk kun nødvendigt i banker eller andre hårdt regulerede butikker
- Vi mener enterprise management giver en usmidig oplevelse for de brugere, der allerede har en aktiv github handle - hvilket vil sige de fleste af vores udviklere. Samtidig udelukker det os fra samarbejder uden for koncernen, hvilket kan fungere usmidigt i forhold til eksterne samarbejdspartnere.

Alternativer til Github:

**AWS codecommit**

- Integrerer med AWS services, primært IAM og S3, men platformen mangler det samme niveau af brugerfællesskab og tredjepartsintegrationer som GitHub.
- Man får ikke noget foræret ved at bruge codecommit frem for github i AWS
- Vores AWS solution architects foretrækker github, og kalder det crem de la creme of repositories
- Bold bruger codecommit som de eneste i DUT. (4 brugere)

**Gitlab**

- Selvom GitLab tilbyder omfattende CI/CD og DevOps værktøjer, er det mere komplekst og kan være overvældende at konfigurere – dette er ikke undersøgt nærmere.

**Bitbucket**

- Holdet.dk bruger bitbucket som de eneste i DUT (3 brugere)
- God integration med Atlassian-værktøjer som Jira, men har en mindre brugervenlig grænseflade og et mindre aktivt samfund sammenlignet med GitHub.

**Azure Repos**

- Vi bruger det ikke i dag
- Bedre egnet til teams der allerede bruger Azure
