#Egységtesztek készítése / kiegészítése
##Feladat

Én a technológiai fókuszon belül az egységtesztekkel foglalkoztam. Feladatom része volt a már meglévő Unit tesztek kiegészítése valamint még nem létező, de igényelt tesztek készítése. 

##Megvalósítás

A tesztelés során Node.js-t használtam, Mocha tesztelési keretrendszerrel (dependency: "^7.1.1"), eleinte Visual Studio Code-ban, majd IntelliJ IDEA környezetben. A verziókezelést GitHub segítségével oldottam meg.

##Unit tesztek
A test/url.js-ben található tesztek mind lefutottak.
##Speciális karakterekhez és rossz kódolás kezeléshez
![](images/unit_specialcharacters.png)

##Url.query.toString() kiegészítése
![](images/unit_tostring.png)

##Url props interface kiegészítése
![](images/unit_urlprops.png)

##Url.urlConfig() teszt készítése
![](images/unit_urlconfig.png)

##Kód lefedettség eredménye
A tesztek kód lefedettségét folytonos méréssel feljavítottam amennyire lehetett, a jelen tudásomat felhasználva.
- Branches coverage: 69% → 85%
- Lines Coverage: 80% → 95%
- Functions: 100%

Wang Tingli Alexandra WY8KKY