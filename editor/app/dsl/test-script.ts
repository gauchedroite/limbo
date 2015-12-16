
export var script = `
//.id 1234
//.chapter_id 33

//
//  main:
//
//  location:
//  when:
.location 0:SCENE LOCATION DETAIL/PART 2
.when a, b

//
//  extra:
//
//  then:
//  remember:
//  timeout:
.then 0:JACK concept
.remember some_key = value
.timeout 4sec

//
// body:
//

//[0]
//  when: []
//  action:
//      text:
//      style:
.when A.LT.90
Description d'une scène si a et b. Le joueur va voir cette description affiché dans une boite.
    .style inverse
//[1]
//  action:
//      text:
Suite du texte, PAS affecté par 'when' et 'style'
//[2]
//  action:
//      text:
Texte affiché dans une boite aussi.

//[3]
//  dialog:
//      character:
//      line:
.character 0:JACK/jack-o-jack
Il était une fois dans l'ouest. Une ou plusieurs phrases. Un seul paragraphe.

//[4]
//  random:
//      character:
//      lines: []
//          line: odds:
//          line:
//          line: then: remember:
//          line:
.random
.character 0:JACK
Il était une fois dans l'ouest.
    .odds 80%
Il était une fois dans l'est.
La fois où il faisait froid.
    .then 0:JACK concept
    .remember some_key = value
C'était peut-être le nord au fond...

//[5]
//  question:
//      character:
//      ask:
//      choices: []
//          line: def: then:
//          line: remember:
//          line:
.question
.character 0:JACK
.parenthetical pensif
Est-ce que je devrais voir s'il y a d'autres blessés?
Faire ceci
    .default
    .then 0:JACK concept
Faire cela
    .remember some_key = value
Ne rien faire du tout
`;
