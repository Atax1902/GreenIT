let answers={};const quizBox=document.getElementById("quiz-main"),resultNode=document.getElementById("resultat"),scoreNode=document.getElementById("score");function selectAnswer(e,t,a){let s=+e.target.attributes.getNamedItem("valeur").value;if(e.target.classList.contains("card-activated"))e.target.classList.remove("card-activated"),answers[t]-=s;else if(e.target.classList.add("card-activated"),answers[t]=(answers[t]??0)+s,"Y/N"===a||"UNI"===a){let n=document.getElementById(`q-${t}`);for(let r=0;r<n.children.length;r++){let i=n.children[r];if(!i.isEqualNode(e.target)&&i.classList.contains("card-activated")){let l=+i.attributes.getNamedItem("valeur").value;answers[t]-=l,i.classList.remove("card-activated")}}}}function showResults(e){console.log("yyo"),quizBox.classList.add("hidden"),resultNode.classList.remove("hidden"),scoreNode.innerHTML=Object.keys(answers).map(e=>answers[e]).reduce((e,t)=>e+t)}function getUsername(){return localStorage.getItem("username")}function generateStatsFile(){let e=getUsername(),t,a=`
    ==============================
         Bilan du Quiz GreenIT
    ==============================
    
    Nom du joueur : ${e}
    Date du quiz : ${new Date().toLocaleDateString()}
    
    ------------------------------
        R\xe9sultats du quiz
    ------------------------------
    Impact carbone : ${document.getElementById("score").innerText}/19
    Unit\xe9 : Empreinte carbone (arbitraire)
    
    ------------------------------
        Conseils pour r\xe9duire l'impact carbone
    ------------------------------
    1. 🚲 Privil\xe9giez le v\xe9lo ou la marche pour les trajets courts.
    2. 🍽️ R\xe9duisez le gaspillage alimentaire.
    3. 🔋 Gardez vos appareils \xe9lectroniques plus longtemps.
    4. 🍏 Optez pour des produits locaux et de saison.
    5. ♻️ Recyclez les appareils \xe9lectroniques obsol\xe8tes.
    
    Merci de votre participation ! 
    Nous vous encourageons \xe0 adopter des habitudes plus durables.
    `,s=new Blob([a],{type:"text/plain"}),n=document.createElement("a");n.href=URL.createObjectURL(s),n.download="bilan_impact_carbone.txt",n.click()}function restartQuiz(){quizBox.classList.remove("hidden"),answers={},resultNode.classList.add("hidden")}document.getElementById("startQuizBtn").addEventListener("click",function(){let e=document.getElementById("username").value;e?(document.getElementById("nameInputSection").style.display="none",document.getElementById("quizSection").style.display="block",localStorage.setItem("username",e)):alert("Veuillez entrer votre nom pour commencer le quiz.")}),document.getElementById("downloadStatsBtn").addEventListener("click",generateStatsFile);