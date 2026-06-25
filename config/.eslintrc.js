// ESLint Konfiguration - OOP & Vanilla JS Game
// Format: CommonJS (.eslintrc.js) weil JSON keine Kommentare erlaubt
module.exports = {
  env: {
    browser: true,   // kennt window, document, setTimeout etc.
    es2021: true,    // kennt moderne JS-Features (class, Promise, ...)
  },
  parserOptions: {
    ecmaVersion: 2021,
    // "script"  → klassische <script>-Tags ohne import/export
    // "module"  → wenn du <script type="module"> + import/export verwendest
    sourceType: "script",
  },

  // WICHTIG: Wenn ESLint "no-undef" auf deine eigenen globalen Klassen feuert,
  // trag sie hier ein (passiert wenn du mehrere <script>-Tags ohne Module hast)
  // Beispiel:
  // globals: {
  //   Player: "readonly",
  //   Enemy: "readonly",
  //   GameEngine: "readonly",
  // },

  rules: {

    // ===== OOP & KLASSEN =====

    // Doppelte Methoden/Properties in einer Klasse → Fehler
    // class A { move() {} move() {} }  ← fliegt auf
    "no-dupe-class-members": "error",

    // return-Wert in constructor verboten
    // constructor() { return { x: 1 } }  ← fliegt auf
    "no-constructor-return": "error",

    // Klasse muss vor Verwendung definiert sein
    // new Player()  ← wenn Player erst 10 Zeilen später steht
    "no-use-before-define": ["error", {
      classes: true,
      functions: false,  // Funktionen sind gehoisted, das ist ok
      variables: true,
    }],

    // Naming: Klassen groß schreiben, Funktionen klein
    // new player()  ← Fehler (player muss Player sein)
    // Player()      ← Fehler (ohne new aufgerufen)
    "new-cap": ["error", {
      newIsCap: true,   // new X() → X muss großgeschrieben sein
      capIsNew: true,   // X()     → X muss mit new aufgerufen werden
    }],

    // Warnung wenn eine Methode this gar nicht verwendet
    // → Kandidat für static method
    "class-methods-use-this": "warn",


    // ===== VARIABLEN & SCOPE =====

    // Unbekannte/undefinierte Variablen
    "no-undef": "error",

    // Unbenutzte Variablen und Parameter
    "no-unused-vars": ["warn", {
      vars: "all",        // alle ungenutzten Variablen
      args: "after-used", // nur unbenutzte Parameter AM ENDE der Liste
    }],

    // Variable in innerem Scope versteckt äußere Variable gleichen Namens
    // let x = 1; function f() { let x = 2; }  ← Warnung
    "no-shadow": "warn",


    // ===== BENENNUNG =====

    // Properties und Methoden: camelCase erzwingen
    // this.player_speed ← Fehler, muss playerSpeed sein
    "camelcase": ["error", { properties: "always" }],


    // ===== PERFORMANCE-ANTIPATTERNS =====

    // Funktion in Loop definieren → Memory-Leak und Closure-Bugs
    // for (let i = 0; i < 10; i++) { arr.push(function() { return i; }); }
    "no-loop-func": "error",

    // eval() ist langsam, unsicher und verhindert JS-Optimierungen
    "no-eval": "error",

    // Implizites eval: setTimeout("someCode()", 1000)
    "no-implied-eval": "error",


    // ===== CODE-QUALITÄT =====

    // Code nach return/throw/break der nie erreicht wird
    "no-unreachable": "error",

    // Ausdrücke die nichts tun: a + b; ohne Zuweisung
    "no-unused-expressions": "warn",

    // Manche Pfade geben return-Wert zurück, andere nicht
    // function f() { if (x) return 1; }  ← Warnung
    "consistent-return": "warn",
  },
};
