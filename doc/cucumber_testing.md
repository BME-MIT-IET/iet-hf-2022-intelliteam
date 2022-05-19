Cucumber kalandok

Én a BDD (Behavior Driven Development) tesztekkel foglalkoztam, azon belül cucumbert használtam. Az volt a célom ezzel, hogy a domurl könyvtár keretein belül megvalósított URLek manipulálására való függvényeket és propertiket érthetőbbé tegyem széles körű közönség számára.

A tesztelés Visual Studio Code-ban történt node-jst használva, a cucumber haszálatához a cucumber/cucumber": "^8.2.1" dependencyt telepítettem. A verziókezeléshez gitet használtam.

A tesztek logikáját a features mappában lehet megtalálni az f1.feature és f1_steps.js fileokban. A feature file tartalmazza a cucumber scenario leírásokat, a steps ennek konkrét kódbeli hátterét biztosítja. A konfigurációs file a cucumber-js. A teszteket a node-js installálása után az npx cucumber-js parancs terminálbeli kiadásával lehet futtatni. A jelenlegi verzióban 10 scenárió és a hozzájuk tartozó 31 step lett letesztelve.

A BDD tervezési alapelveit, azon belül a cucumber szintaktikáját követve az alábbi teszteket írtam:

  1,   -Egy teszt az összes query paraméter eltávoítására
  ![image](https://user-images.githubusercontent.com/79190128/169308105-57d82f22-7dc6-4551-bb25-d97e379fc185.png)

  2,   -Egy minta URLben vizsgáltam a string query paraméterek számát
  ![image](https://user-images.githubusercontent.com/79190128/169308150-f86a18fa-f8f9-4447-b681-bcb65ae4f4ae.png)

  3,   -Különböző query típusok esetvizsgálata, például szám, string, null érték vagy undefined kezelését ellenőrzöm
  ![image](https://user-images.githubusercontent.com/79190128/169308198-cb849544-5ff2-4a9a-88c1-cc8ccda410ff.png)

  4,   -Szintén egy minta URLről el tudom dönteni, hogy tartalmaz-e query paramétert, ezt teszteli ez a teszt
  ![image](https://user-images.githubusercontent.com/79190128/169308254-29fe9f9f-77de-4c8a-a583-e69edcc1edad.png)

  5,   -A path részt kétféleképpen tudom visszakapni, az első hogy karakterenként végig megyek a megkapott tömbön, az ide kapcsolódó teszt ezt nézi meg működés közben
  ![image](https://user-images.githubusercontent.com/79190128/169308509-5d3a041b-83be-4836-aa6a-f890b41c8786.png)

  6,   -illetve vissza tudunk kapni egy másik tömböt is, a '/' közötti részek tartalmával, ezt nézem meg ebben a tesztben
  ![image](https://user-images.githubusercontent.com/79190128/169308593-eddf153b-53e7-468f-a779-751ca6efafcb.png)

  7,   -A domurl képes megállapítani a használt protokolt, egy minta alapján ezt tesztelem itt
  ![image](https://user-images.githubusercontent.com/79190128/169308646-d3798007-77bf-4dd8-8dea-00fb373e33a3.png)

  8,   -Továbbá visszakapható a host is, ezt szemléletesíti ez a teszt egy minta URLen
  ![image](https://user-images.githubusercontent.com/79190128/169308681-3c994aeb-7531-4edb-a5aa-addd1dfb6aa7.png)

  9,   -Az előzőköz hasonlatosan meg tudom nézni az URLben található hash value értékét, erre vonatkozik a következő teszt
  ![image](https://user-images.githubusercontent.com/79190128/169308798-a5cb3458-4cfb-475b-8502-baee8ed436b3.png)

  10,  -Végül, de nem utolsó sorban az esetleges portokat is lehet vizsgálni, itt szintén egy példán keresztül tesztelem ezt
  ![image](https://user-images.githubusercontent.com/79190128/169308767-d1551cd6-4359-45f4-a8d5-39676c02f206.png)

  
Összeségében hasznosnak találtam a cucumber megismerését, és a BDD tesztelési módszerek megértését. Szerintem ez egy letisztult, átlátható módja a kódunk tesztelésének, amit akár hozzá nem értő is tud értelmezn. De sokkal fontosabb, hogy más tesztelők számára is nagyon könnyen átlátható, akik esetleg először találkoznak az általunk megírt kóddal

Csörgő Péter
RSVCLR
