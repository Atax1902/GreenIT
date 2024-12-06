<?php
// Charger les questions depuis le fichier JSON
$questions = json_decode(file_get_contents('questions.json'), true);

// Vérifier si le fichier JSON a été correctement chargé
if (!$questions) {
    die("Erreur lors du chargement des questions.");
}

// Si le formulaire a été soumis, récupérer les réponses
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $responses = $_POST['responses'];  // Récupérer les réponses envoyées
    $score = 0;

    // Vérifier les réponses
    foreach ($questions as $question) {
        if (isset($responses[$question['id']]) && $responses[$question['id']] == $question['answer']) {
            $score++;
        }
    }

    // Afficher le score
    echo "<h2>Votre score : $score / " . count($questions) . "</h2>";
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="index.css">
</head>

<body>
    <?php include 'header.php'; ?>
    
    <main>
        <h1>Questionnaire à Choix Multiples</h1>
        
        <form method="POST">
            <?php foreach ($questions as $question): ?>
                <section class="question">
                    <p><strong><?php echo htmlspecialchars($question['question']); ?></strong></p>
                    <?php if ($question['type'] === 'qcm'): ?>
                        <!-- QCM (choix multiples) : Boutons radio pour sélectionner une seule option -->
                        <?php foreach ($question['options'] as $option): ?>
                            <label>
                                <input type="radio" name="responses[<?php echo $question['id']; ?>]" value="<?php echo htmlspecialchars($option); ?>" required>
                                <?php echo htmlspecialchars($option); ?>
                            </label><br>
                        <?php endforeach; ?>

                    <?php elseif ($question['type'] === 'y/n'): ?>
                        <!-- Y/N : Choix entre Oui et Non -->
                        <label for="<?php echo $question['id']; ?>">Choisissez une réponse :</label><br>
                        <label>
                            <input type="radio" name="responses[<?php echo $question['id']; ?>]" value="Oui" required> Oui
                        </label>
                        <label>
                            <input type="radio" name="responses[<?php echo $question['id']; ?>]" value="Non" required> Non
                        </label>

                    <?php elseif ($question['type'] === 'uni'): ?>
                        <!-- UNU : Une seule réponse possible parmi les options -->
                        <label for="<?php echo $question['id']; ?>">Choisissez une réponse :</label>
                        <select name="responses[<?php echo $question['id']; ?>]" id="<?php echo $question['id']; ?>" required>
                            <?php foreach ($question['options'] as $option): ?>
                                <option value="<?php echo htmlspecialchars($option); ?>"><?php echo htmlspecialchars($option); ?></option>
                            <?php endforeach; ?>
                        </select>

                    <?php endif; ?>
                </section>
            <?php endforeach; ?>
            
            <button type="submit">Soumettre</button>
        </form>

        <!-- Interface ajoutée -->
        <div class="container">
            <header>8,2 tonnes de CO₂ par an</header>

            <nav class="categories">
                <button class="active">Transport</button>
                <button>Alimentation</button>
                <button>Logement</button>
                <button>Divers</button>
                <button>Services sociétaux</button>
            </nav>

            <article class="question">
                <label>Quelle distance parcourez-vous à l'année en voiture ?</label>
                <div class="options">
                    <button>Zéro</button>
                    <button>Vacances</button>
                    <button class="active">10km / jour</button>
                    <button>1000km / mois</button>
                    <button>20 000km / an</button>
                </div>

                <div class="input-group">
                    <input type="number" value="3600" />
                    <span>km</span>
                </div>

                <div class="details">Détailler mes trajets</div>
            </article>
        </div>
        <!-- Fin interface ajoutée -->
    </main>

    <script src="app.js"></script>
    
    <footer></footer
</body>

</html>
