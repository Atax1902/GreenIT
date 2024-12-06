let answers = {}
const quizBox = document.getElementById('quiz-main')
const resultNode = document.getElementById('resultat')
const scoreNode = document.getElementById('score')

function selectAnswer(event, qIndex, qType) {
    const valeur = +event.target.attributes.getNamedItem('valeur').value    
    
    if (event.target.classList.contains('card-activated')) {
        event.target.classList.remove('card-activated')
        answers[qIndex] -= valeur
    } else {
        event.target.classList.add('card-activated')
        answers[qIndex] = (answers[qIndex] ?? 0) + valeur
        if (qType === 'Y/N' || qType === 'UNI') {
            const qBox = document.getElementById(`q-${qIndex}`)
            for (let i = 0; i < qBox.children.length; i++) {
                const child = qBox.children[i];

                if (!child.isEqualNode(event.target) && child.classList.contains('card-activated')) {
                    const childValue = +child.attributes.getNamedItem('valeur').value
                    answers[qIndex] -= childValue
                    child.classList.remove('card-activated')
                }
            }
        }
    }    
}

function showResults(event) {
    console.log('yyo');
    
    quizBox.classList.add('hidden')
    resultNode.classList.remove('hidden')

    scoreNode.innerHTML = Object.keys(answers).map(x => answers[x]).reduce((a, b) => a+b)

}

// Attendre que l'utilisateur saisisse son nom
document.getElementById("startQuizBtn").addEventListener("click", function() {
    // Récupérer le nom de l'utilisateur
    let username = document.getElementById("username").value;

    if (username) {
        // Masquer la section de saisie du nom et afficher le quiz
        document.getElementById("nameInputSection").style.display = "none";
        document.getElementById("quizSection").style.display = "block"; // Assurez-vous que la section du quiz a l'ID 'quizSection'

        // Stocker le nom de l'utilisateur pour l'utiliser plus tard
        localStorage.setItem("username", username);
    } else {
        alert("Veuillez entrer votre nom pour commencer le quiz.");
    }
});

// Fonction pour récupérer le nom de l'utilisateur
function getUsername() {
    return localStorage.getItem("username");
}

// Fonction pour générer et télécharger le fichier avec les résultats
function generateStatsFile() {
    let username = getUsername(); // Récupérer le nom de l'utilisateur
    let score = document.getElementById("score").innerText; // Récupère le score de l'utilisateur
    let impactMax = 100; // Vous pouvez aussi rendre cette valeur dynamique si nécessaire
    let date = new Date().toLocaleDateString();

    // Contenu du fichier
    let content = `
==============================
     Bilan du Quiz GreenIT
==============================

Nom du joueur : ${username}
Date du quiz : ${date}

------------------------------
    Résultats du quiz
------------------------------
Impact carbone : ${score}/19
Unité : Empreinte carbone (arbitraire)

------------------------------
    Conseils pour réduire l'impact carbone
------------------------------
1. 🚲 Privilégiez le vélo ou la marche pour les trajets courts.
2. 🍽️ Réduisez le gaspillage alimentaire.
3. 🔋 Gardez vos appareils électroniques plus longtemps.
4. 🍏 Optez pour des produits locaux et de saison.
5. ♻️ Recyclez les appareils électroniques obsolètes.

Merci de votre participation ! 
Nous vous encourageons à adopter des habitudes plus durables.
`;

    // Créer un Blob avec le contenu
    let blob = new Blob([content], { type: "text/plain" });

    // Créer un lien de téléchargement
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "bilan_impact_carbone.txt"; // Nom du fichier à télécharger
    link.click();
}

// Ajouter un bouton pour déclencher le téléchargement
document.getElementById("downloadStatsBtn").addEventListener("click", generateStatsFile);


function restartQuiz() { 
    quizBox.classList.remove('hidden')
    answers= {}
    resultNode.classList.add('hidden')
}