Cucumber kalandok

Én a BDD (Behavior Driven Development) tesztekkel foglalkoztam, azon belül cucumbert használtam. Az volt a célom ezzel, hogy a domurl könyvtár keretein belül megvalósított URLek manipulálására való függvényeket és propertiket érthetőbbé tegyem széles körű közönség számára.

A tesztelés Visual Studio Code-ban történt node-jst használva, a cucumber haszálatához a cucumber/cucumber": "^8.2.1" dependencyt telepítettem. A verziókezeléshez gitet használtam.

A tesztek logikáját a features mappában lehet megtalálni az f1.feature és f1_steps.js fileokban. A feature file tartalmazza a cucumber scenario leírásokat, a steps ennek konkrét kódbeli hátterét biztosítja. A konfigurációs file a cucumber-js. A teszteket a node-js installálása után az npx cucumber-js parancs terminálbeli kiadásával lehet futtatni. A jelenlegi verzióban 10 scenárió és a hozzájuk tartozó 31 step lett letesztelve.

A BDD tervezési alapelveit, azon belül a cucumber szintaktikáját követve az alábbi teszteket írtam:

  1,   -Egy teszt az összes query paraméter eltávoítására
  2,   -Egy minta URLben vizsgáltam a string query paraméterek számát
  3,   -Különböző query típusok esetvizsgálata, például szám, string, null érték vagy undefined kezelését ellenőrzöm
  4,   -Szintén egy minta URLről el tudom dönteni, hogy tartalmaz-e query paramétert, ezt teszteli ez a teszt
  5,   -A path részt kétféleképpen tudom visszakapni, az első hogy karakterenként végig megyek a megkapott tömbön, az ide kapcsolódó teszt ezt nézi meg működés közben
  6,   -illetve vissza tudunk kapni egy másik tömböt is, a '/' közötti részek tartalmával, ezt nézem meg ebben a tesztben
  7,   -A domurl képes megállapítani a használt protokolt, egy minta alapján ezt tesztelem itt
  8,   -Továbbá visszakapható a host is, ezt szemléletesíti ez a teszt
  9,   -Az előzőköz hasonlatosan meg tudom nézni az URLben található hash value értékét, erre vonatkozik a következő teszt
  10,  -Végül, de nem utolsó sorban az esetleges portokat is lehet vizsgálni, itt szintén egy példán keresztül tesztelem ezt
  
Összeségében hasznosnak találtam a cucumber megismerését, és a BDD tesztelési módszerek megértését. Szerintem ez egy letisztult, átlátható módja a kódunk tesztelésének, amit akár hozzá nem értő is tud értelmezn. De sokkal fontosabb, hogy más tesztelők számára is nagyon könnyen átlátható, akik esetleg először találkoznak az általunk megírt kóddal

Csörgő Péter
RSVCLR
