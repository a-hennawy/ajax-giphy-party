const $gifArea = $("#gif-area");
const $searchInput = $("#search");

/* use ajax result to add a gif */

function addGif(res) {
  let numResults = res.data.length; //returns 50 possible gifs
  if (numResults) {
    let randomIdx = Math.floor(Math.random() * numResults); //
    let $newCol = $("<div>", { class: "col-md-4 col-12 mb-4" });
    let $newGif = $("<img>", {
      src: res.data[randomIdx].images.original.url,
      class: "new-gif",
    });
    $newCol.append($newGif);
    $gifArea.append($newCol);
  }
}

/* handle form submission: clear search box & make ajax call */

$("form").on("submit", async function (evt) {
  evt.preventDefault();

  let searchTerm = $searchInput.val(); //to retrieve search bar content
  $searchInput.val(""); // to empty search bar

  const response = await axios.get("http://api.giphy.com/v1/gifs/search", {
    params: {
      q: searchTerm,
      api_key: "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym",
    },
  });
  addGif(response.data);
});

/* remove gif */

$("#remove").on("click", function () {
  $gifArea.empty();
});
