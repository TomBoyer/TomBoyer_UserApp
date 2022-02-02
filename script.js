//on va chercher sur une base de donnée de 24 user les infos. On fait une requête pour les afficher sur notre page

//1 tester notre link vers l'API
// https://randomuser.me/api/?results=24 (on prends 24 users car bon exo pour le placement des cards sur la page)

//4 déclarer une variable pour stocker les infos traduites des users
//4.1 aller chercher les infos au bon endroit
let userData = [];

//3 englober la recherche fetch dans une function (prévoir de l'asynchrone pour récupérer les infos et seulement ensuite les afficher)
const fetchUser = async () => {
  //2 Fetch les infos de l'API
  await fetch("https://randomuser.me/api/?results=24")
    .then((res) => res.json())
    .then((data) => (userData = data.results));

  console.log(userData[0]);
  //.then(()=>console.log(userData));//attention de bien log quand l'info a été récup et pas avant (mettre un then par exp pour retarder le log ou utiliser async/await)
};
fetchUser();

//5 afficher les users : important d'attendre de recevoir les données des users traduites pour commencer à les afficher donc utiliser des async/await
const userDisplay = async () => {
  await fetchUser();
  //6 traiter les dates de naissance en gérant l'affiche (changer le type et le renvoyer dans les balises plus bas)
  const dateParser = (date) => {
    let newDate = new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    return newDate;
  };

  //7 traiter les dates (membre depuis)
  const dayCalc = (date) => {
    let today = new Date();
    let todayTimestamp = Date.parse(today);
    let timestamp = Date.parse(date);

    return Math.ceil((todayTimestamp - timestamp) /8.64e7);
  };

  document.body.innerHTML = userData //j'envoie des balises dans le HTML en fonction des resultats récupérés dans le fetch
    .map(
      (user) =>
        //je vais écrire dans mon HTML en créant des balises, à chaque user je vais chercher le prenom dans la rubrique nom dans les données user traduites
        `
    <div class="card">
        <img src=${user.picture.large} alt="Pic of ${user.name.last}">
        <h3>${user.name.first} ${user.name.last}</h3>
        <p>${user.location.city}, ${dateParser(user.dob.date)}</p>
        <em>Membre depuis : ${dayCalc(user.registered.date)} jours</em>
    </div>
    `
    )
    .join("");
};
userDisplay();
