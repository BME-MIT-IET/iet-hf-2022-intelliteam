# Statikus elemzés, manuális átvizsgálás

## Statikus elemzés

A statikus elemzést a már meglévő linter szigorúbbra állításával kezdtem, emellett aktualizáltam a beállításokat. Úgy döntöttem az ES6 funkciók fontosabbak mint az közvetlen IE kompatibilitás (ezt a csapattagokkal meg is beszéltük), így minden var át lett írva const vagy let használatával kevesebb hibalehetőséggel rendelkező kódra. Emellett sok apró hiba, elírás lett javítva, és a formázás is néhol fejlesztve lett az olvashatóság javítására. Néhány helyen elavult függvények is használva voltak, és szintaktikailag hibás kód is volt, ezek természetesen javítva lettek. Időközben sikerült olyan elemeket is "leegyszerűsítenünk", amit nem kellett volna, de szerencsére a teszteknek köszönhetően ezeket a hibákat megtaláltuk és kijavítottuk.

<p align="center">
<img src="images/jshint%20settings.png" alt="New JSHint settings" width="222"/></p>

## SonarCloud vizsgálat

A SonarCloud beállítása és első futtatása után jelzett néhány hibát, azokat is megvizsgáltam, és többségüket javítottam is. Egy volt ami bug forrás lehetett, a többi inkább apró hiányosság. Néhány code-smell is javításra került.

![](images/sonar%20analysis%20merge%20report.png)

## Manuális átvizsgálás

Végeztem egy manuális kód átnézést is, aminek eredményeképpen egyrészt jobban megértettem a program működését, másrészt érdemben tudtam fejleszteni a kód átláthatóságát. Eltávolításra került többek között az azonnal meghívott névtelen függvény ami az egész programot tartalmazta. A változók deklarációja több helyen át lett helyezve, hogy közelebb legyen ahhoz a blokkhoz, ahol használva van, így segítve a megértést. Néhány vezérlési struktúrát is átalakítottam, mivel fölöslegesen komplexnek éreztem őket. Emellett kommentben szereplő elírásokat és formázást is javítottam.

A vizsgálatok során vettem észre, hogy a minify szkript nem működik, és hogy a tesztek viszont a program minified változatát használták. Ezt módosítottam, hogy ne kelljen folyton összecsomagolni a programot, és könnyen lehessen gyakrabban tesztelni. Emellett újraírtam egy másik csomag használatával a minify szkriptet, mivel a régi nem futott.