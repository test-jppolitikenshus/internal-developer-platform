### Architecture Decision Record (ADR)

#### Title: 006 Valg af Kommunikationsværktøj - Slack vs Teams

#### Date: 2024-07-03

---

## Status

Forslag

## Kontekst

Vi står overfor at vælge det mest hensigtsmæssige kommunikationsværktøj til vores organisation. Slack er anslået til at koste ca. 40.000 kr. pr. måned i DUT regi. Vi skal evaluere fordele og ulemper ved både Slack og Teams inden vi træffer en beslutning.

## Teams (Kanaler)

### Positiv
- Kan modtage mails fra eksterne og interne brugere.

### Negativ
- Kan ikke acceptere eksterne chat-brugere uden for JPPOL, med undtagelse af "General" kanalen.
- Visning er fast bredde - det hjælper ikke at gøre vinduet bredere.
- Tråde er forvirrende - når man svarer i en tråd, flytter hele beskeden i tidslinjen, men personen der svarer i en tråd, ser den i tid indtil vedkomne reloader, så er tidslinjen forskudt.
- Hvis man tilføjer personer til en kanal, får de ikke historik med.

## Teams (Chats)

### Positiv
- Man kan åbne chats i nye vinduer.

### Negativ
- Der findes kun shortcut til at redigere den seneste besked (pil op).
- Der er ingen trådfunktion: [Feedback](https://feedbackportal.microsoft.com/feedback/idea/328070b5-7dcd-ed11-a81b-002248519701)
- Ingen custom status - fx ferie - den tages altid fra kalenderen.

## Teams (Begge, både Kanaler og Chats)

### Positiv
- Kan acceptere AD distribution lists og security lists.

### Negativ
- Problemer med at paste kode ind (Linux).
- Notifikationer er ikke så customizable som i Slack, fx i desktop/mobil app.
- Man kan ikke søge kanaler/chats frem, selv om de er åbne, så man kan ikke joine fx incident kanal uden at være inviteret. (kan muligvis fixes med SharePoint sikkerhedsindstillinger, men det er allerede sådan, at alle udefrakommende kan maile alle åbne grupper, sikkert derfor de ikke kan søges).


## Slack

### Positiv
- Føles lækker at bruge.
- De fleste udviklere i JP/Pol foretrækker Slack.
- Slack købes allerede af fx Politiken og EB.
- Mange producenter stiller Slack-kanal til rådighed, hvorfor kendskab og udbredelse er stor.

## Beslutning

(Detaljer om den endelige beslutning, når denne er truffet)

## Alternativer

(Listning af mulige alternativer, som kan overvejes)
