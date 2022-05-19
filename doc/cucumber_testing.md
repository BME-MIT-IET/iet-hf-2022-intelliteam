Cucumber kalandok

Én a BDD (Behavior Driven Development) tesztekkel foglalkoztam, azon belül cucumbert használtam. Az volt a célom ezzel, hogy a domurl könyvtár keretein belül megvalósított URLek manipulálására való függvényeket és propertiket érthetőbbé tegyem széles körű közönség számára.
A BDD tervezési alapelveit, azon belül a cucumber szintaktikáját követve az alábbi teszteket írtam:
  -Egy teszt az összes query paraméter eltávoítására
  -Egy minta URLben vizsgáltam a string query paraméterek számát
  -Különböző query típusok esetvizsgálata, például szám, string, null érték vagy undefined kezelését ellenőrzöm
  -Szintén egy minta URLről el tudom dönteni, hogy tartalmaz-e query paramétert, ezt teszteli ez a teszt
  -A path részt kétféleképpen tudom visszakapni, az első hogy karakterenként végig megyek a megkapott tömbön, az ide kapcsolódó teszt ezt nézi meg működés közben
  -illetve vissza tudunk kapni egy másik tömböt is, a '/' közötti részek tartalmával, ezt nézem meg ebben a tesztben
  -A domurl képes megállapítani a használt protokolt, egy minta alapján ezt tesztelem itt
  -Továbbá visszakapható a host is, ezt szemléletesíti ez a teszt
  -Az előzőköz hasonlatosan meg tudom nézni az URLben található hash value értékét, erre vonatkozik a következő teszt
  -Végül, de nem utolsó sorban az esetleges portokat is lehet vizsgálni, itt szintén egy példán keresztül tesztelem ezt
Összeségében hasznosnak találtam a cucumber megismerését, és a BDD tesztelési módszerek megértését. Szerintem ez egy letisztult, átlátható módja a kódunk tesztelésének, amit akár hozzá nem értő is tud értelmezn. De sokkal fontosabb, hogy más tesztelők számára is nagyon könnyen átlátható, akik esetleg először találkoznak az általunk megírt kóddal

Csörgő Péter
RSVCLR
